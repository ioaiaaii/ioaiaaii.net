<template>
  <div
    ref="ctnDom"
    :class="cn('block size-full', props?.class)"
  ></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, type HTMLAttributes } from "vue";
import { Renderer, Program, Mesh, Color, Triangle, type OGLRenderingContext } from "ogl";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();

const ctnDom = ref<HTMLDivElement | null>(null);

let animateId: number;
let renderer: Renderer;
let gl: OGLRenderingContext;
let mesh: Mesh;

// Vertex Shader
const vert = `
  attribute vec2 uv;
  attribute vec2 position;
  
  varying vec2 vUv;
  
  void main() {
      vUv = uv;
      gl_Position = vec4(position, 0, 1);
  }
  `;

// Fragment Shader
const frag = `
  precision highp float;
  
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uResolution;
  
  varying vec2 vUv;
  
  void main() {
      float mr = min(uResolution.x, uResolution.y);
      vec2 uv = (vUv.xy * 3.0) * uResolution.xy / mr;
  
      float d = -uTime * 0.1;
      float a = 0.10;
      for (float i = 0.0; i < 29.0; ++i) {
          a += cos(i - d - a * uv.x);
          d += sin(uv.y * i + a);
      }
      d += uTime * 0.1;

      // Use this to drive the blue→white interpolation
      float t = 0.5 + 0.5 * sin(uv.x * 3.0 + uv.y * 2.0 + a + d * 0.2);
      t = clamp(t, 0.0, 1.0);

      // vec3 col = vec3(
      //   0.85 + 0.1 * cos(uv.x * d + a),   // Red → near white
      //   0.90 + 0.1 * cos(uv.y * d + a),   // Green → pale blue tint
      //   1.00 + 0.0 * sin(a + d)           // Blue → full white-blue
      // );
      // col = cos(col * cos(vec3(d, a, 3)) * 0.2 + 0.2);

      vec3 blue = vec3(0.9, 0.94, 1.0); // soft ice blue (matches screenshot)
      vec3 white = vec3(1.0);
      vec3 col = mix(blue, white, t);   // animated interpolation      

      gl_FragColor = vec4(col, 2.0);
  }
  `;

function resize() {
  if (!ctnDom.value) return;
  const scale = 1;
  renderer.setSize(ctnDom.value.offsetWidth * scale, ctnDom.value.offsetHeight * scale);
  if (mesh) {
    mesh.program.uniforms.uResolution.value = [
      gl.canvas.width,
      gl.canvas.height,
      gl.canvas.width / gl.canvas.height,
    ];
  }
}

function update(t: number) {
  animateId = requestAnimationFrame(update);
  if (mesh) {
    mesh.program.uniforms.uTime.value = t * 0.001;
    renderer.render({ scene: mesh });
  }
}

onMounted(() => {
  if (!ctnDom.value) return;

  renderer = new Renderer();
  gl = renderer.gl;
  gl.clearColor(1, 1, 1, 1);

  window.addEventListener("resize", resize, false);
  resize();

  const geometry = new Triangle(gl);

  const program = new Program(gl, {
    vertex: vert,
    fragment: frag,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new Color(0.3, 0.2, 0.5) },
      uResolution: {
        value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height],
      },
    },
  });

  mesh = new Mesh(gl, { geometry, program });
  animateId = requestAnimationFrame(update);

  ctnDom.value.appendChild(gl.canvas);
});

onUnmounted(() => {
  cancelAnimationFrame(animateId);
  window.removeEventListener("resize", resize);
  if (ctnDom.value && gl?.canvas) {
    ctnDom.value.removeChild(gl.canvas);
  }
  gl?.getExtension("WEBGL_lose_context")?.loseContext();
});
</script>