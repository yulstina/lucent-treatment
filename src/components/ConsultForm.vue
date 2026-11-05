<script setup>
// 상담 예약 폼(데모). 입력값은 어디로도 전송하지 않는다.
import { reactive, ref } from 'vue';

const interests = ['리프팅', '색소·톤', '모공·피부결', '여드름·흔적', '홍조·보습'];
const times = ['오전 (9~12시)', '오후 (12~18시)', '저녁 (18~20시)'];

const form = reactive({ interest: '리프팅', name: '', phone: '', time: times[1], agree: false });
const errors = reactive({ name: '', phone: '', agree: '' });
const done = ref(false);
const nameEl = ref(null);
const phoneEl = ref(null);

function validate() {
  errors.name = form.name.trim() ? '' : '이름을 입력해 주세요.';
  errors.phone = /^01[016789]-?\d{3,4}-?\d{4}$/.test(form.phone.replace(/\s/g, '')) ? '' : '연락처를 010-0000-0000 형식으로 입력해 주세요.';
  errors.agree = form.agree ? '' : '개인정보 수집·이용에 동의해 주세요.';
  return !errors.name && !errors.phone && !errors.agree;
}
function submit() {
  if (validate()) { done.value = true; return; }
  (errors.name ? nameEl : phoneEl).value?.focus();
}
function reset() {
  Object.assign(form, { interest: '리프팅', name: '', phone: '', time: times[1], agree: false });
  Object.assign(errors, { name: '', phone: '', agree: '' });
  done.value = false;
}
</script>

<template>
  <div class="card">
    <div v-if="done" class="done" role="status">
      <h3>상담 신청이 접수되었어요 (데모)</h3>
      <p>{{ form.name }} 님, 선택하신 <b>{{ form.interest }}</b> 상담을 {{ form.time }}에 연락드리는 흐름입니다. 실제로 전송되는 정보는 없습니다.</p>
      <button type="button" class="ghost" @click="reset">처음으로</button>
    </div>
    <form v-else novalidate @submit.prevent="submit">
      <fieldset>
        <legend>관심 있는 고민</legend>
        <div class="pills">
          <label v-for="i in interests" :key="i" :class="{ on: form.interest === i }">
            <input v-model="form.interest" type="radio" name="interest" :value="i" /> {{ i }}
          </label>
        </div>
      </fieldset>
      <div class="field">
        <label for="c-name">이름</label>
        <input id="c-name" ref="nameEl" v-model="form.name" autocomplete="name" :aria-invalid="!!errors.name" aria-describedby="e-name" />
        <p id="e-name" class="err" role="alert">{{ errors.name }}</p>
      </div>
      <div class="field">
        <label for="c-phone">연락처</label>
        <input id="c-phone" ref="phoneEl" v-model="form.phone" inputmode="tel" autocomplete="tel" placeholder="010-0000-0000" :aria-invalid="!!errors.phone" aria-describedby="e-phone" />
        <p id="e-phone" class="err" role="alert">{{ errors.phone }}</p>
      </div>
      <div class="field">
        <label for="c-time">연락 가능한 시간</label>
        <select id="c-time" v-model="form.time"><option v-for="t in times" :key="t">{{ t }}</option></select>
      </div>
      <label class="agree">
        <input v-model="form.agree" type="checkbox" /> 개인정보 수집·이용에 동의합니다. (데모 폼이며 정보는 저장·전송되지 않습니다.)
      </label>
      <p class="err" role="alert">{{ errors.agree }}</p>
      <button type="submit" class="submit">상담 신청하기</button>
    </form>
  </div>
</template>

<style scoped>
.card { background: #fff; border: 1px solid var(--line); border-radius: 20px; padding: clamp(22px, 4vw, 40px); box-shadow: 0 16px 40px rgb(24 40 50 / .07); }
fieldset { border: 0; margin-bottom: 20px; }
legend { font-size: 14px; color: var(--muted); margin-bottom: 10px; }
.pills { display: flex; flex-wrap: wrap; gap: 8px; }
.pills label { position: relative; border: 1px solid var(--line); border-radius: 999px; padding: 8px 16px; font-size: 14px; cursor: pointer; transition: background-color .25s, color .25s; }
.pills label.on { background: var(--ink); border-color: var(--ink); color: #fff; }
.pills input { position: absolute; opacity: 0; pointer-events: none; }
.pills label:has(input:focus-visible) { outline: 2px solid var(--ink); outline-offset: 3px; }
.field { margin-bottom: 14px; }
.field label { display: block; font-size: 14px; color: var(--muted); margin-bottom: 6px; }
.field input, .field select { width: 100%; height: 52px; padding: 0 16px; border: 1px solid var(--line); border-radius: 12px; background: #fff; }
.field input[aria-invalid='true'] { border-color: #b3402a; }
.err { min-height: 1.4em; font-size: 13px; color: #b3402a; }
.agree { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--muted); margin: 6px 0 2px; }
.submit { width: 100%; min-height: 56px; margin-top: 10px; border: 0; border-radius: 999px; background: var(--ink); color: #fff; font-weight: 700; font-size: 16px; cursor: pointer; }
.done h3 { font-family: var(--font-serif); margin-bottom: 10px; }
.done p { color: var(--muted); }
.ghost { margin-top: 20px; border: 1px solid var(--ink); background: transparent; border-radius: 999px; padding: 12px 24px; cursor: pointer; }
</style>
