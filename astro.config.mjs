// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// 페이지 뼈대는 Astro(.astro), 눌러서 바뀌는 부분(비교 탭·상담 폼·팝업·배너 슬라이드)은 Vue(.vue) 컴포넌트.
// 배포 주소가 정해지면 SITE_URL 환경변수로 넣는다(canonical·JSON-LD url에 쓰임).
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  integrations: [vue()],
});
