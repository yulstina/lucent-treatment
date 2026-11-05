# LUCENT DERM · 시술 안내 페이지 (Astro + Vue)

포트폴리오용 가상 피부과 브랜드 LUCENT DERM의 **초음파 리프팅 시술 안내 상세페이지**와,
그 페이지로 들어오는 **메인 슬라이드 배너 · 이벤트 팝업**입니다. 의료 정보는 일반 안내 수준이며 실제 진료·시술 사례가 아닙니다.
AI 이미지·영상을 사용했고, 상담 폼은 데모라 어디로도 전송하지 않습니다.

## 흐름
메인 배너 / 팝업 → 시술 안내 상세 → 상담 예약 폼 (모바일은 하단 고정 버튼)

## 구조
- **Astro**: 페이지 뼈대, 섹션 마크업, JSON-LD (`.astro`)
- **Vue**: 눌러서 바뀌는 부분 — 비교 탭, 상담 폼, 이벤트 팝업, 배너 슬라이드 (`.vue`, `client:*`로 필요할 때만 로드)
- 시술 하나 = 데이터 파일 하나: `src/data/treatments/*.json`을 추가하면 `/treatments/<slug>/` 페이지가 생깁니다.

```
src/
  data/treatments/lifting.json   시술명, 핵심 정보, 단계, 비교표, 주의사항, FAQ
  layouts/BaseLayout.astro       head(메타·OG), JSON-LD, 헤더·푸터, 스크롤 등장
  components/                    Hero · Concern · Layer(원리) · Process · Compare(Vue) · Caution · Faq · Consult(Vue) · Popup(Vue) · Banner(Vue)
  pages/index.astro              메인(배너 + 팝업)
  pages/treatments/[slug].astro  시술 상세
```

## SEO · GEO · AEO
- h1은 시술명 하나, 섹션마다 h2, 현재 위치(breadcrumb) nav
- JSON-LD: `MedicalWebPage` + `MedicalProcedure`, `FAQPage`, `BreadcrumbList`
- FAQ는 JS 없이 `details/summary`로 답변이 HTML에 그대로 들어 있음
- 가상 브랜드라 기본값은 `noindex` (`BaseLayout.astro`)

## 접근성 · 모션
- axe-core (wcag2a/2aa/21aa) 위반 0건 확인
- 탭: 좌우·Home/End 키, 팝업: `<dialog>` + 포커스 이동·복귀, 슬라이드: 일시정지 버튼
- `prefers-reduced-motion`이면 등장 효과·자동 재생 해제

## 의료광고 고려
효과 보장·최상급 표현, 가격 할인 문구, 환자 후기, 전후 사진을 넣지 않았습니다. 부작용·개인차 안내는 본문에 항상 노출합니다.

## 실행
```bash
npm install
npm run dev      # 개발
npm run build    # dist/ 생성 (Node 22.23.4 이상)
```
배포는 Vercel(프레임워크 Astro 자동 인식). 배포 주소가 정해지면 환경변수 `SITE_URL`을 넣으면 canonical·JSON-LD url이 채워집니다.
