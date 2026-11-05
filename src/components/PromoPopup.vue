<script setup>
// 메인 진입 시 뜨는 이벤트 팝업. PC는 가운데 카드, 모바일은 하단 시트.
// "오늘 하루 보지 않기"는 오늘 날짜를 localStorage에 저장한다(저장이 막힌 환경에서도 동작은 유지).
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps({
  title: String, desc: String, cta: String, href: String, image: String, note: String,
});
const KEY = 'lucent-popup-hide';
const dlg = ref(null);
const ctaEl = ref(null);
let opener = null;

function today() { return new Date().toISOString().slice(0, 10); }
function hiddenToday() { try { return localStorage.getItem(KEY) === today(); } catch { return false; } }

onMounted(() => {
  if (hiddenToday()) return;
  setTimeout(async () => {
    opener = document.activeElement;
    dlg.value?.showModal();
    await nextTick();
    ctaEl.value?.focus();
  }, 900);
});
function close() { dlg.value?.close(); opener?.focus?.(); }
function hideToday() {
  try { localStorage.setItem(KEY, today()); } catch { /* 저장이 막혀도 닫기는 한다 */ }
  close();
}
</script>

<template>
  <dialog ref="dlg" class="popup" aria-labelledby="pop-title" @click.self="close">
    <img :src="image" alt="" width="500" height="320" />
    <div class="body">
      <span class="eyebrow">LUCENT EVENT</span>
      <h2 id="pop-title">{{ title }}</h2>
      <p>{{ desc }}</p>
      <a ref="ctaEl" class="button" :href="href">{{ cta }} <span aria-hidden="true">→</span></a>
      <small>{{ note }}</small>
    </div>
    <div class="bar">
      <button type="button" @click="hideToday">오늘 하루 보지 않기</button>
      <button type="button" @click="close">닫기</button>
    </div>
  </dialog>
</template>

<style scoped>
.popup { border: 0; padding: 0; width: min(500px, calc(100% - 32px)); border-radius: 20px; overflow: hidden; background: var(--pearl); color: var(--ink); box-shadow: 0 30px 80px rgb(24 40 50 / .35); margin: auto; }
.popup::backdrop { background: rgb(24 40 50 / .5); backdrop-filter: blur(2px); }
.popup[open] { animation: pop .5s var(--ease); }
img { width: 100%; height: 260px; object-fit: cover; object-position: center 22%; }
.body { padding: 26px 28px 22px; display: grid; gap: 8px; }
h2 { font-family: var(--font-serif); font-size: 24px; line-height: 1.4; font-weight: 600; }
p { color: var(--muted); font-size: 15px; }
.button { margin-top: 12px; width: 100%; }
small { font-size: 12px; color: var(--muted); }
.bar { display: flex; justify-content: space-between; padding: 0 20px; border-top: 1px solid var(--line); }
.bar button { border: 0; background: transparent; padding: 16px 8px; font-size: 14px; color: var(--muted); cursor: pointer; }
@keyframes pop { from { opacity: 0; transform: translateY(24px) scale(.97); } to { opacity: 1; transform: none; } }
@media (max-width: 767px) {
  .popup { margin: auto 0 0; width: 100%; max-width: none; border-radius: 24px 24px 0 0; }
  .popup[open] { animation: sheet .5s var(--ease); }
  img { height: 190px; }
  @keyframes sheet { from { transform: translateY(100%); } to { transform: none; } }
}
</style>
