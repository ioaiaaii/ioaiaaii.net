<template>
  <main class="stage">
    <h1 class="sr-only">Works — releases, selected works and collaborations</h1>
    <section class="content">
      <div class="works-layout">
        <!-- Left: the works sections -->
        <div class="works-main">
          <div v-for="section in sections" :key="section.label" v-reveal class="section">
            <div class="section-head"><h2 class="section-label">{{ section.label }}</h2></div>
            <div class="section-body">
              <div class="works">
                <article v-for="(item, i) in section.items" :key="i" class="work">
                  <div class="year">{{ item.year }}</div>
                  <div class="body">
                    <div class="title">{{ item.title }}</div>
                    <p v-if="item.desc" class="desc">{{ item.desc }}</p>
                  </div>
                  <div class="side">
                    <span v-if="item.meta">{{ item.meta }}</span>
                    <a
                      v-if="item.link"
                      class="listen"
                      :href="item.link"
                      target="_blank"
                      rel="noopener"
                      :aria-label="`${section.action} ${item.title}`"
                    >{{ section.action }}</a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: sticky studio photo -->
        <aside class="works-side">
          <figure class="info-photo">
            <img
              :src="studio"
              alt="Ioannis Savvaidis' studio"
              width="3453"
              height="2557"
              decoding="async"
            />
          </figure>
        </aside>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import info from '@/data/info.json';
import releasesData from '@/data/releases.json';
import studio from '@/assets/images/studio.webp';
import { buildSections } from '@/lib/works';

const sections = computed(() => buildSections(info, releasesData));
</script>
