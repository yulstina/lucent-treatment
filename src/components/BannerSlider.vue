<script setup>
// 메인 상단 슬라이드 배너(PC 1920×600 기준, 모바일은 세로형). 자동 재생 + 일시정지 버튼 + 점 탐색.
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({ slides: { type: Array, required: true } });
const cur = ref(0);
const playing = ref(true);
let timer = null;

function go(i) { cur.value = (i + props.slides.length) % props.slides.length; }
function start() { stop(); if (playing.value) timer = setInterval(() => go(cur.value + 1), 5500); }
function stop() { if (timer) clearInterval(timer); timer = null; }
function toggle() { playing.value = !playing.value; playing.value ? start() : stop(); }

onMounted(() => {
  // 모션 줄이기 설정이면 자동 재생하지 않는다.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) playing.value = false;
  start();
});
onBeforeUnmount(stop);
</script>

<template>
  <section class="slider" aria-roledescription="carousel" aria-label="이벤트 배너" @mouseenter="stop" @mouseleave="start" @focusin="stop" @focusout="start">
    <div class="track" :style="{ transform: `translateX(-${cur * 100}%)` }">
      <a
        v-for="(s, i) in slides" :key="s.title" :href="s.href" class="slide" :class="s.theme"
        role="group" aria-roledescription="slide" :aria-label="`${i + 1} / ${slides.length}`"
        :aria-hidden="cur !== i" :tabindex="cur === i ? 0 : -1"
      >
        <img :src="s.image" alt="" :width="900" :height="600" :loading="i === 0 ? 'eager' : 'lazy'" />
        <div class="copy">
          <span class="eyebrow">{{ s.eyebrow }}</span>
          <strong>{{ s.title }}</strong>
          <span class="desc">{{ s.desc }}</span>
          <span class="more">{{ s.cta }} <i aria-hidden="true">→</i></span>
          <small>{{ s.note }}</small>
        </div>
      </a>
    </div>
    <div class="ctrl">
      <button type="button" class="pp" :aria-label="playing ? '자동 재생 멈추기' : '자동 재생 시작'" @click="toggle">{{ playing ? '❚❚' : '▶' }}</button>
      <div class="dots">
        <button v-for="(s, i) in slides" :key="s.title" type="button" :aria-label="`${i + 1}번 배너로 이동`" :aria-current="cur === i" :class="{ on: cur === i }" @click="go(i)"></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slider { position: relative; overflow: hidden; background: var(--ice); }
.track { display: flex; transition: transform .8s var(--ease); }
.slide { position: relative; flex: 0 0 100%; height: clamp(440px, 31.25vw, 600px); display: block; text-decoration: none; overflow: hidden; }
.slide.a { background: linear-gradient(110deg, #E7EFF3 0%, #F5F6F5 45%, #E8E5EF 100%); }
.slide.b { background: linear-gradient(110deg, #E8E5EF 0%, #F5F6F5 50%, #E7EFF3 100%); }
.slide img { position: absolute; right: 0; top: 0; height: 100%; width: min(48%, 900px); object-fit: cover; object-position: center 20%; -webkit-mask-image: linear-gradient(90deg, transparent, #000 32%); mask-image: linear-gradient(90deg, transparent, #000 32%); }
.copy { position: relative; z-index: 1; height: 100%; width: min(100% - var(--gutter) * 2, var(--wrap)); margin: 0 auto; padding-left: clamp(0px, 4vw, 120px); display: flex; flex-direction: column; justify-content: center; gap: 12px; color: var(--ink); }
.copy strong { font-family: var(--font-serif); font-weight: 600; font-size: clamp(28px, 3.4vw, 56px); line-height: 1.3; }
.desc { color: var(--muted); max-width: 26em; }
.more { display: inline-flex; align-self: flex-start; margin-top: 14px; background: var(--ink); color: #fff; padding: 14px 30px; border-radius: 999px; font-weight: 700; font-size: 15px; transition: transform .3s var(--ease); }
.slide:hover .more { transform: translateX(6px); }
.copy small { position: absolute; bottom: 56px; font-size: 12px; color: var(--muted); }
.ctrl { position: absolute; left: 50%; bottom: 20px; translate: -50% 0; display: flex; align-items: center; gap: 14px; background: rgb(24 40 50 / .55); backdrop-filter: blur(8px); padding: 6px 14px; border-radius: 999px; }
.pp { border: 0; background: transparent; color: #fff; font-size: 11px; cursor: pointer; width: 24px; height: 24px; }
.dots { display: flex; gap: 8px; }
.dots button { width: 8px; height: 8px; padding: 0; border: 0; border-radius: 99px; background: rgb(255 255 255 / .5); cursor: pointer; transition: width .4s var(--ease), background-color .3s; }
.dots button.on { width: 26px; background: #fff; }
@media (max-width: 767px) {
  .slide { height: 520px; }
  .slide img { width: 100%; height: 55%; top: auto; bottom: 0; -webkit-mask-image: linear-gradient(0deg, #000 55%, transparent); mask-image: linear-gradient(0deg, #000 55%, transparent); object-position: center 15%; }
  .copy { justify-content: flex-start; padding-top: 44px; padding-left: 0; }
  .copy small { bottom: 64px; }
}
</style>
