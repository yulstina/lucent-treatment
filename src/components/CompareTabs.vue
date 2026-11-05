<script setup>
// 초음파 / 고주파 비교 탭. WAI-ARIA tabs 패턴: 좌우 방향키, Home/End 이동.
// Astro가 서버에서 HTML로 먼저 그려 주므로 JS 전에도 첫 탭 내용이 보인다.
import { ref } from 'vue';

const props = defineProps({
  rows: { type: Array, required: true },
  items: { type: Array, required: true },
});
const active = ref(0);
const tabs = ref([]);

function move(next) {
  active.value = (next + props.items.length) % props.items.length;
  tabs.value[active.value]?.focus();
}
function onKey(e) {
  if (e.key === 'ArrowRight') { e.preventDefault(); move(active.value + 1); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); move(active.value - 1); }
  else if (e.key === 'Home') { e.preventDefault(); move(0); }
  else if (e.key === 'End') { e.preventDefault(); move(props.items.length - 1); }
}
</script>

<template>
  <div class="compare">
    <div class="tablist" role="tablist" aria-label="리프팅 방식 비교" @keydown="onKey">
      <button
        v-for="(it, i) in items" :key="it.id"
        :ref="(el) => (tabs[i] = el)"
        role="tab" type="button"
        :id="`tab-${it.id}`" :aria-controls="`panel-${it.id}`"
        :aria-selected="active === i" :tabindex="active === i ? 0 : -1"
        :class="{ on: active === i }"
        @click="active = i"
      >{{ it.name }}</button>
    </div>
    <div
      v-for="(it, i) in items" :key="it.id"
      role="tabpanel" :id="`panel-${it.id}`" :aria-labelledby="`tab-${it.id}`"
      :hidden="active !== i" class="panel"
    >
      <dl>
        <template v-for="(row, r) in rows" :key="row">
          <dt>{{ row }}</dt><dd>{{ it.cells[r] }}</dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.tablist { display: flex; background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 4px; max-width: 420px; margin-bottom: 20px; }
.tablist button { flex: 1; border: 0; background: transparent; padding: 12px 0; border-radius: 999px; font-size: 15px; color: var(--muted); cursor: pointer; transition: background-color .3s, color .3s; }
.tablist button.on { background: var(--ink); color: #fff; font-weight: 700; }
.panel:not([hidden]) { animation: fade .5s var(--ease); }
dl { display: grid; grid-template-columns: 160px 1fr; background: #fff; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--line); }
dt, dd { padding: 18px 22px; border-top: 1px solid var(--line); }
dt { color: var(--muted); font-size: 14px; }
dt:first-of-type, dt:first-of-type + dd { border-top: 0; }
@keyframes fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@media (max-width: 575px) { dl { grid-template-columns: 1fr; } dt { padding-bottom: 0; border-top: 1px solid var(--line); } dd { border-top: 0; padding-top: 4px; } }
</style>
