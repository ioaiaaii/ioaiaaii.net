<template>
  <main class="stage" id="live">
    <h1 class="sr-only">Live performances</h1>
    <section class="content">
      <div class="section">
        <div class="section-body">
          <div class="works">
            <article
              v-for="(performance, index) in performances"
              :key="index"
              v-reveal
              class="work"
            >
              <div class="year">{{ year(performance.date) }}</div>
              <div class="body">
                <div class="title">{{ performance.title }}</div>
              </div>
              <div class="side">
                <span>{{ dayMonth(performance.date) }}</span>
                <span
                  v-if="performance.event_link || performance.listen_link"
                  class="side-links"
                >
                  <a
                    v-if="performance.event_link"
                    class="listen"
                    :href="performance.event_link"
                    target="_blank"
                    rel="noopener"
                  >Info</a>
                  <a
                    v-if="performance.listen_link"
                    class="listen"
                    :href="performance.listen_link"
                    target="_blank"
                    rel="noopener"
                  >Listen</a>
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import live from '@/data/live.json';
import { year, dayMonth } from '@/lib/date';

const performances = live.performances || [];
</script>
