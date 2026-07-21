<script setup>
// The Superluminal Motion description is a physics text: running prose with bra-ket
// notation inline, and the one equation that needs vertical stacking — the weak
// value — set apart on its own line. It is the one work whose description needs
// typeset maths, so it lives in its own component, authored as native MathML in the
// template (correct namespaces, no v-html, no dependency, no CSP change). WorkRow
// renders it in the description slot when a work carries `body: 'superluminal-motion'`.
//
// Only the fraction is display; everything else is inline and flows with the text, so
// there is a single set-apart equation rather than a page of them. The paragraph that
// holds it is a <div>, not <p>, so the block-level equation is legal mid-flow. Every
// bracket is stretchy="false" — WebKit otherwise grows the kets past the line height.
// Inline equations take their sentence punctuation as following text; the display
// fraction keeps its trailing comma on its own line.
</script>

<template>
  <div class="text-ink text-body leading-prose max-w-measure text-justify font-serif hyphens-auto">
    <p class="mb-paragraph">
      Time dilation is invisible from inside its own motion, where time keeps its own
      rate, revealed only to what moves past it at a fraction of the speed of light. Light
      dictates the hypersurface of the present, dividing past from future, and nothing on
      it can be observed. Formally, existence is partitioned into a clock and a system, the
      Hilbert space
      <math><msub><mi>ℋ</mi><mi>C</mi></msub><mo>⊗</mo><msub><mi>ℋ</mi><mi>S</mi></msub></math>.
      In the Page and Wootters mechanism, time is a degree of freedom, the entanglement
      between the two, and together they form a single state
      <math><mo stretchy="false">|</mo><mi>Ω</mi><mo stretchy="false">⟩</mo></math>
      that does not evolve,
      <math><mover><mi>H</mi><mo>^</mo></mover><mo stretchy="false">|</mo><mi>Ω</mi><mo stretchy="false">⟩</mo><mo>=</mo><mn>0</mn></math>,
      with
      <math><mover><mi>H</mi><mo>^</mo></mover></math>
      the total Hamiltonian of clock and system.
      <math><mo stretchy="false">|</mo><mi>Ω</mi><mo stretchy="false">⟩</mo></math>
      is therefore timeless, spread across every reading of the clock at once. Projection
      of
      <math><mo stretchy="false">|</mo><mi>Ω</mi><mo stretchy="false">⟩</mo></math>
      onto a single clock state yields
      <math><mo stretchy="false">|</mo><mi>ψ</mi><mo stretchy="false">(</mo><mi>t</mi><mo stretchy="false">)</mo><mo stretchy="false">⟩</mo><mo>=</mo><mo stretchy="false">⟨</mo><mi>t</mi><mo stretchy="false">|</mo><mi>Ω</mi><mo stretchy="false">⟩</mo></math>,
      the ordinary state of quantum mechanics, evolving forward and defined by the past
      alone, and therefore time-asymmetric.
    </p>

    <div class="mb-paragraph">
      Symmetry returns in a second formalism, placed beside the first. In the two-state
      vector formalism, originating with Aharonov, Bergmann and Lebowitz, the complete
      description of the system at a given time is a two-state vector
      <math><mo stretchy="false">⟨</mo><mi>Φ</mi><mo stretchy="false">|</mo><mo>,</mo><mo stretchy="false">|</mo><mi>Ψ</mi><mo stretchy="false">⟩</mo></math>,
      with
      <math><mo stretchy="false">|</mo><mi>Ψ</mi><mo stretchy="false">⟩</mo></math>
      pre-selected and forward-evolving,
      <math><mo stretchy="false">⟨</mo><mi>Φ</mi><mo stretchy="false">|</mo></math>
      post-selected and backward-evolving. An observable
      <math><mi>A</mi></math>, measured weakly and averaged over the post-selected
      ensemble, has the weak value
      <math display="block"><msub><mi>A</mi><mi>w</mi></msub><mo>=</mo><mfrac><mrow><mo stretchy="false">⟨</mo><mi>Φ</mi><mo stretchy="false">|</mo><mover><mi>A</mi><mo>^</mo></mover><mo stretchy="false">|</mo><mi>Ψ</mi><mo stretchy="false">⟩</mo></mrow><mrow><mo stretchy="false">⟨</mo><mi>Φ</mi><mo stretchy="false">|</mo><mi>Ψ</mi><mo stretchy="false">⟩</mo></mrow></mfrac><mtext>,</mtext></math>
      with
      <math><mover><mi>A</mi><mo>^</mo></mover></math>
      the operator of
      <math><mi>A</mi></math>
      and
      <math><mo stretchy="false">⟨</mo><mi>Φ</mi><mo stretchy="false">|</mo><mi>Ψ</mi><mo stretchy="false">⟩</mo></math>
      the overlap of the two state vectors.
      <math><msub><mi>A</mi><mi>w</mi></msub></math>
      can lie beyond any value a measurement of
      <math><mi>A</mi></math>
      could return, running further out as the overlap shrinks.
    </div>

    <p class="mb-0">
      While distant systems can be non-locally entangled, light implies causality,
      preventing any information from propagating superluminally. What astronomy calls
      superluminal motion, in the jets of quasars, is a projection, a source approaching at
      a shallow angle and nearly keeping pace with its own light. Nothing needs to travel,
      since existence already extends along the whole of time. Perceived reality becomes a
      structure of entangled states, spanning past, present and future simultaneously.
      <em>Superluminal Motion</em> is that structure, every present lit from both its past
      and its future.
    </p>
  </div>
</template>

<style scoped>
/* Inline symbols sit on the baseline at prose size. */
math {
  font-size: 1em;
}
/* The lone display equation (the weak value) gets its own line, left-flush with the
   prose. Block MathML centres its content and ignores `text-align`, so shrink the box
   to its content and give it a zero start margin to pull it left. `max-width` +
   `overflow-x` keep the fraction from pushing the page sideways on a very narrow phone. */
math[display='block'] {
  width: fit-content;
  max-width: 100%;
  margin: 0.5em 0;
  overflow-x: auto;
}
</style>
