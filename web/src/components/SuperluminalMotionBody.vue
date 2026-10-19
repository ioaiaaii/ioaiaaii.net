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
// following text; a display equation keeps its trailing punctuation inside, as <mtext>.
// Operator hats carry accent="true": without it MathML sets the ^ as a script-size
// limit above the letter instead of a full-size accent sitting on it.
</script>

<template>
  <div class="prose">
    <p class="mb-paragraph">
      Time dilation can't be felt from inside one's own motion. A clock keeps its usual rate, and
      the difference shows only when it is compared with a clock that took another path through
      spacetime. Around every event, light draws a past and a future cone, marking what could have
      reached it and what it can reach in turn. Every observer agrees on these. The present is
      different. Simultaneity is relative, and the hypersurface of events an observer counts as
      happening now depends on the observer's motion.
    </p>

    <p class="mb-paragraph">
      In the Page–Wootters mechanism, time exists only between the parts of a universe that, as a
      whole, never changes.
    </p>

    <div class="mb-paragraph">
      The two-state vector formalism describes a system between two measurements by two states, one
      coming forward from the first,
      <math><mo stretchy="false">|</mo><mi>Ψ</mi><mo stretchy="false">⟩</mo></math
      >, and one backward from the last,
      <math><mo stretchy="false">⟨</mo><mi>Φ</mi><mo stretchy="false">|</mo></math
      >. A weak measurement of a quantity <math><mi>A</mi></math> in between, too light to disturb
      the system, finds on average a value shaped by both,
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
        ><mtext>.</mtext></math
      >
    </div>

    <p class="mb-paragraph">
      Entangled systems, as Bell showed and experiments have confirmed, are correlated more strongly
      than any local explanation allows, yet neither side can use this to send a signal faster than
      light.
    </p>

    <p class="mb-paragraph">
      In the jets of quasars, plasma moving close to the speed of light, almost toward us, appears
      to cross the sky faster than light, which astronomers call <em>superluminal motion</em>. Its
      later light has less distance to travel, so the motion looks compressed in time. Nothing in
      the jet exceeds the speed of light.
    </p>

    <p class="mb-paragraph">
      The causal order set by light remains intact even where it appears to give way. That
      appearance is where the work begins.
    </p>

    <p class="mb-paragraph">
      From these physical descriptions, <em>Superluminal Motion</em> moves into speculation.
      Existence is imagined as one whole that never changes, holding past, present and future at
      once, with the line between them drawn only from inside, by each observer. Perceived reality
      becomes a structure of entangled states.
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
