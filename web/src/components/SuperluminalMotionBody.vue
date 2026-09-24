<script setup>
// The Superluminal Motion description is a physics text: running prose with bra-ket
// notation inline, and one equation set apart on its own line, the weak value (a
// fraction too tall for the line). It is the one work whose description needs typeset
// maths, so it lives in its own component, authored as native MathML in the template
// (correct namespaces, no v-html, no dependency, no CSP change). WorkRow renders it in
// the description slot when a work carries `body: 'superluminal-motion'`.
//
// A paragraph that holds a display equation is a <div>, not <p>, so the block-level
// <math> is legal mid-flow. Every bracket is stretchy="false" — WebKit otherwise grows
// the kets past the line height. Inline equations take their sentence punctuation as
// following text; a display equation keeps its trailing comma inside, as <mtext>.
// Operator hats carry accent="true": without it MathML sets the ^ as a script-size
// limit above the letter instead of a full-size accent sitting on it.
</script>

<template>
  <div class="prose">
    <p class="mb-paragraph">
      Time dilation is invisible from inside one's own motion, where a clock keeps its usual rate
      and the difference appears only when compared with another trajectory through spacetime.
      Around every event, light defines a past and a future light cone (null hypersurfaces),
      bounding what can reach the event and what the event can reach in turn. Every observer agrees
      on where these cones lie. The present is different. Its hypersurface (the set of events an
      observer considers to be happening now) depends on the observer’s motion.
    </p>

    <p class="mb-paragraph">
      Quantum theory offers another way to think about time. In the Page–Wootters mechanism, an
      isolated quantum universe is divided into two parts, a clock <math><mi>C</mi></math> and
      everything else, the system <math><mi>S</mi></math
      >. The clock is itself a quantum subsystem, used as an internal reference for time. Their
      possible combined states form the joint Hilbert space
      <math
        ><msub><mi>ℋ</mi><mi>C</mi></msub
        ><mo>⊗</mo><msub><mi>ℋ</mi><mi>S</mi></msub></math
      >, the mathematical space containing every possible state of clock and system together. Clock
      and system are described by a global state
      <math><mo stretchy="false">|</mo><mi>Ω</mi><mo stretchy="false">⟩</mo></math> satisfying
      <math
        ><mover accent="true"><mi>H</mi><mo>^</mo></mover
        ><mo stretchy="false">|</mo><mi>Ω</mi><mo stretchy="false">⟩</mo><mo>=</mo><mn>0</mn></math
      >, where
      <math
        ><mover accent="true"><mi>H</mi><mo>^</mo></mover></math
      >
      is the total Hamiltonian (the operator representing the energy of the combined system, here
      simply the clock's energy plus the system's).
    </p>

    <p class="mb-paragraph">
      This global state does not evolve in an external time. Instead, change appears through the
      relation between the two parts. Taken relative to the clock's value <math><mi>t</mi></math
      >, the system's state is
      <math
        ><mo stretchy="false">|</mo><mi>ψ</mi><mo stretchy="false">(</mo><mi>t</mi
        ><mo stretchy="false">)</mo><mo stretchy="false">⟩</mo><mo>=</mo><mo stretchy="false">⟨</mo
        ><mi>t</mi><mo stretchy="false">|</mo><mi>Ω</mi><mo stretchy="false">⟩</mo></math
      >, and as <math><mi>t</mi></math> advances this state changes, reproducing the ordinary
      time-dependent evolution of quantum mechanics. Time appears internally, through correlations
      between clock and system, while the global state remains stationary.
    </p>

    <p class="mb-paragraph">
      A second formalism introduces a time-symmetric description. In the two-state vector formalism,
      a system at a given moment is described by two states,
      <math><mo stretchy="false">|</mo><mi>Ψ</mi><mo stretchy="false">⟩</mo></math> evolving forward
      from an earlier preparation and
      <math><mo stretchy="false">⟨</mo><mi>Φ</mi><mo stretchy="false">|</mo></math> evolving
      backward from a later measurement result.
    </p>

    <div class="mb-paragraph">
      For an observable <math><mi>A</mi></math> (a measurable quantity, such as position or spin),
      the weak value is:
      <math display="block"
        ><msub><mi>A</mi><mi>w</mi></msub
        ><mo>=</mo
        ><mfrac
          ><mrow
            ><mo stretchy="false">⟨</mo><mi>Φ</mi><mo stretchy="false">|</mo
            ><mover accent="true"><mi>A</mi><mo>^</mo></mover
            ><mo stretchy="false">|</mo><mi>Ψ</mi><mo stretchy="false">⟩</mo></mrow
          ><mrow
            ><mo stretchy="false">⟨</mo><mi>Φ</mi><mo stretchy="false">|</mo><mi>Ψ</mi
            ><mo stretchy="false">⟩</mo></mrow
          ></mfrac
        ><mtext>,</mtext></math
      >
      where
      <math
        ><mover accent="true"><mi>A</mi><mo>^</mo></mover></math
      >
      is the operator representing <math><mi>A</mi></math> and
      <math
        ><mo stretchy="false">⟨</mo><mi>Φ</mi><mo stretchy="false">|</mo><mi>Ψ</mi
        ><mo stretchy="false">⟩</mo></math
      >
      expresses the overlap between the two states. It can be read as the value of
      <math><mi>A</mi></math> at that moment, shaped by both the earlier preparation and the later
      result.
    </div>

    <p class="mb-paragraph">
      Distant systems can be entangled (their quantum states cannot be described independently of
      one another). As Bell showed, their measurement outcomes may show correlations stronger than
      any explanation based only on local properties fixed in advance can produce. Yet these
      correlations cannot be used to send information faster than light. Each side, considered on
      its own, reveals nothing about what was done at the other. The connection appears only when
      the two sets of results are later compared through an ordinary signal. Quantum theory
      therefore allows no signal faster than light, as relativistic causality requires.
    </p>

    <p class="mb-paragraph">
      Astronomy has its own form of motion that appears to exceed the speed of light. What is called
      <em>superluminal motion</em>, observed in the jets of quasars, is an effect of geometry and
      light-travel time. A blob of plasma in the jet moves close to the speed of light and nearly
      along our line of sight. Light emitted later therefore has less distance to travel and arrives
      only shortly after light emitted earlier. The apparent motion across the sky is compressed
      into a much shorter observed interval and can seem faster than light, although nothing in the
      jet exceeds the speed of light.
    </p>

    <p class="mb-paragraph">
      The causal order set by light remains intact even where it appears to give way. That
      appearance is where the work begins.
    </p>

    <p class="mb-paragraph">
      From these physical descriptions, <em>Superluminal Motion</em> moves into speculation.
      Existence is imagined not as a succession of isolated moments, but as a structure extending
      across all of time. The distinction between past, present and future becomes perspectival,
      while taken together they are simultaneously present within the same underlying structure.
      Perceived reality becomes a structure of entangled states spanning past, present and future
      simultaneously.
    </p>

    <p class="mb-paragraph">
      <em>Superluminal Motion</em> is that structure, every hypersurface of the present illuminated
      from both its past and its future.
    </p>

    <p>Six pieces, recorded between 2021 and 2025.</p>
  </div>
</template>

<style scoped>
/* Inline symbols sit on the baseline at prose size. */
math {
  font-size: 1em;
}
/* A display equation gets its own line, left-flush with the prose. Block MathML
   centres its content and ignores `text-align`, so shrink the box to its content and
   give it a zero start margin to pull it left. `max-width` + `overflow-x` keep an
   equation from pushing the page sideways on a very narrow phone. */
math[display='block'] {
  width: fit-content;
  max-width: 100%;
  margin: 0.5em 0;
  overflow-x: auto;
}
</style>
