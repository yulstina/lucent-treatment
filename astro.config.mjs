// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// 페이지 뼈대는 Astro(.astro), 눌러서 바뀌는 부분(비교 탭·상담 폼·팝업·배너 슬라이드)은 Vue(.vue) 컴포넌트.
// canonical·OG·JSON-LD url에 쓰이는 사이트 주소. 다른 주소로 배포하면 SITE_URL 환경변수로 바꾼다.
export default defineConfig({
  site: process.env.SITE_URL || 'https://lucent-treatment.vercel.app',
  integrations: [vue()],
});
