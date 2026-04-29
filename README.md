# 5주차 과제: Next Netflix 🎬🍿

## 서론

안녕하세요, 프론트엔드 운영진 **원채영**입니다! 🔥🤍 <br/><br/>
이번 주부터는 새 프로젝트인 **Netflix 클론코딩**을 진행합니다! <br/>
이번 과제에서는 **Next.js**를 활용해 **SSR(Server Side Rendering)** 을 직접 경험해보고, <br/>
주어진 **Figma 디자인**을 활용해 스타일링 하는 방법을 이해하는 것을 목표로 합니다. <br/><br/>
또한 이번 주부터는 프론트 페어와 함께하는 첫 과제인 만큼, 팀별로 미리 **호흡**을 맞춰볼 수 있는 좋은 기회가 될 것 같습니다.<br/>
그럼 이번 과제도 모두 파이팅입니다!!!! 🔥🔥

---

## 과제

### ⭐ 과제 목표

- Next.js 사용법을 공부해봅니다.
- Figma로 주어지는 디자인으로 스타일링 하는 방식에 익숙해집니다.
- Git을 이용한 협업 방식에 익숙해집니다.
- 프론트엔드와 백엔드 시스템에 대한 흐름을 이해합니다.

### 📅 기한

> 2026년 5월 2일 토요일 (기한 엄수)

### ✅ 필수 요건

- [결과화면](https://next-netflix-21th-suyoungswim.vercel.app/)의 랜딩 페이지와 메인 페이지를 구현합니다.
- [Figma](https://www.figma.com/design/t9UWQMvti88h5oXkXYkc1r/Netflix-Figma?node-id=0-1&m=dev&t=RMIJ6HupyivB6i21-1)의 디자인을 그대로 구현합니다.
- Open api를 사용해서 데이터 패칭을 진행합니다. (ex. [themoviedb API](https://developers.themoviedb.org/3/getting-started/introduction))
- `yarn`, `yarn berry`, `npm`, `pnpm`등 패키지 매니저를 직접 선택해 Next.js를 세팅해 봅니다.

### 👍🏻 선택 요건

- SSR(Server Side Rendering)을 적용해서 구현합니다.
- 웹 폰트를 사용합니다.
- 반응형을 고려합니다.

### 👥 Research Question

- 전반적인 협업 과정에 대해 알려주세요. 👏🏻 <br/>
  (프로젝트에서 해당 패키지 매니저를 선택한 이유, 파일 구조 컨벤션을 어떻게 지켰는지, <br/>업무 분담과 소통 방식은 어떻게 진행했는지를 함께 정리해 주세요. 21기, 22기 PR을 참고하시면 좋습니다!)

### 🔑 Review Questions

- React 18 버전의 변경점에 대해 설명해주세요.
  - 서버 컴포넌트와 클라이언트 컴포넌트
  - lazy loading과 Suspense 컴포넌트
  - automatic batching, Concurrent Rendering 등 추가적으로 더 설명해주셔도 됩니다!

---

### **🔗 링크 및 참고자료**

(React)

- [useCallback과 React.Memo를 이용한 렌더링 최적화](https://velog.io/@yejinh/useCallback%EA%B3%BC-React.Memo%EC%9D%84-%ED%86%B5%ED%95%9C-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94)
- [성능 최적화](https://ui.toast.com/fe-guide/ko_PERFORMANCE)
- [React 18의 새로운 기능](https://www.youtube.com/watch?v=7mkQi0TlJQo)
- [react 서버 컴포넌트가 해결하는 문제들 in kakao 기술 블로그](https://tech.kakaopay.com/post/react-server-components/)

(Vercel)

- [vercel의 배포 방식](https://www.youtube.com/watch?v=8q-jCvLWwKc&t=11s)
- [조직 레포를 우회해 무료 배포하는 법](https://bori-note.tistory.com/73)

(랜딩페이지 Netflix 로고)

- [랜딩페이지 영상](https://lottiefiles.com/free-animation/netflix-logo-swoop-6nEmnysrGE)

(Next.js)

- [Next.js Docs](https://nextjs.org/docs)
- [Next.js 13에서 변한 것들](https://velog.io/@hang_kem_0531/Next.js-13%EC%9D%B4-%EB%82%98%EC%99%80%EB%B2%84%EB%A0%B8%EB%8B%A4)
- [Next.js 14에서 변한 것들](https://velog.io/@lee_1124/Next.js-14-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8)
- [Next.js 15, 16](https://beam307.github.io/2026/03/18/nextjs16-vs15/)
- [React & Next.js에서 발견된 취약점-(CVE-2025-55182(React2Shell)](https://news.hada.io/topic?id=24874)

(협업)

- [Git 협업 가이드](https://velog.io/@jinuku/Git-%ED%98%91%EC%97%85-%EA%B0%80%EC%9D%B4%EB%93%9C)
- [디자이너와 개발자가 협업하기 위한 피그마 기본 기능](https://chingguhl.tistory.com/entry/%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-%ED%94%BC%EA%B7%B8%EB%A7%88-10%EA%B0%80%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EB%94%94%EC%9E%90%EC%9D%B4%EB%84%88%EC%99%80-%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%ED%98%91%EC%97%85%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%9C-%ED%94%BC%EA%B7%B8%EB%A7%88-%EA%B8%B0%EB%B3%B8-%EA%B8%B0%EB%8A%A5)

---

## 프로젝트 초기 세팅

### 패키지 매니저

이 프로젝트는 `npm`을 사용합니다.

```bash
npm install
npm run dev
```

### 주요 라우트

- `/`: 랜딩 페이지
- `/main`: 메인 페이지
- `/search`: 검색 페이지
- `/detail/[id]`: 상세 페이지

### 폴더 구조

```text
public
├── icons
├── images
├── logos
└── posters

src
├── apis
├── app
│   ├── detail/[id]
│   ├── main
│   └── search
├── components
│   ├── Detail
│   ├── Landing
│   ├── Main
│   ├── Search
│   ├── common
├── constants
├── data
├── hooks
├── store
├── styles
├── types
└── utils
```

### 협업 컨벤션 메모

- 일반 폴더명은 소문자 시작 camelCase를 사용합니다.
- 컴포넌트 폴더와 컴포넌트 파일명은 PascalCase를 사용합니다.
- `.ts` 파일명, 함수명, 변수명은 소문자 시작 camelCase를 사용합니다.
- 이미지 등 asset 파일명은 소문자를 사용합니다.
- Next.js App Router의 `page.tsx`, `layout.tsx` 등 예약 파일은 프레임워크 규칙에 맞춰 소문자 파일명을 유지합니다.
- Next.js 프로젝트이므로 라우트는 `src/app`에서 관리하고, 페이지별 UI 컴포넌트는 `src/components/{Landing,Main,Search,Detail}`에 분리합니다.
- 정적 이미지, 아이콘, 로고, 폰트처럼 URL로 직접 접근하는 파일은 `public` 아래에 둡니다.
- 공통 디자인 토큰은 `src/styles/colors.css`, `src/styles/fonts.css`에 나누어 관리하고, 최종 진입점인 `src/styles/globals.css`에서 import합니다.

### 디자인 시스템 토큰

Figma 기준 색상, 타이포그래피, linear gradient 값은 `src/styles/colors.css`, `src/styles/fonts.css`에 Tailwind v4 `@theme` 토큰과 CSS 변수로 등록되어 있습니다.
Next.js App Router 구조이므로 전역 CSS는 `main.tsx`가 아니라 `src/app/layout.tsx`에서 `src/styles/globals.css`를 import합니다.

- Color: `--color-black`, `--color-white`, `--color-grey-900`, `--color-grey-800`, `--color-grey-700`, `--color-grey-600`
- Gradient: `--gradient-linear`
- Type class: `.text-heading-1`, `.text-heading-2`, `.text-body-1`, `.text-body-2`, `.text-label-1`, `.text-label-2`, `.text-caption-1`, `.text-caption-2`

Tailwind class 예시:

```tsx
<section className="bg-black font-pretendard text-white">
  <h1 className="text-heading-1 font-semibold leading-design tracking-design">
    Previews
  </h1>
  <div className="bg-[image:var(--gradient-linear)]" />
</section>
```
