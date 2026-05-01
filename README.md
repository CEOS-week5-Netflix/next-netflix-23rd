# 6주차 과제: Next Netflix 🎬🍿

## 서론

안녕하세요, 프론트엔드 운영진 **원채영**입니다! 😎

이번 주는 지난 주에 이어 Netflix 프로젝트를 마무리해보는 과제입니다.

이번 과제의 목표는 **Figma 디자인을 기반으로 한 스타일링 방식에 익숙해지고**, **Next.js의 SSR(Server Side Rendering)에 대한 이해도를 높이는 것**입니다.

추가적으로, **성능 최적화 방법**에 대해서도 함께 고민해보시면 좋겠습니다. 🔥

그럼, 이번 주차도 파이팅입니다! 💪🏻

## 과제

### **⭐ 과제 목표**

- Next.js 사용법을 익힙니다.
- Figma 기반 스타일링 방식에 익숙해집니다.
- Git을 활용한 협업 방식에 익숙해집니다.
- 프론트엔드와 백엔드 간 데이터 흐름을 이해합니다.

### 📅 기한

> 2026년 5월 9일 토요일 (기한 엄수)
> 

### **✅ 필수 요건**

- [결과화면](https://next-netflix-21th-suyoungswim.vercel.app/)의 **상세 페이지**와 **검색 페이지**를 구현합니다.
    - 상세 페이지는 동적 라우팅을 이용해 구현합니다.
    - 검색 페이지는 실시간 키워드 검색으로 구현합니다.
    - 검색 결과에 **무한 스크롤**을 적용합니다.
    - 검색 로딩 상태를 위한 **스켈레톤 컴포넌트**를 구현합니다.
- [Figma](https://www.figma.com/design/t9UWQMvti88h5oXkXYkc1r/Netflix-Figma?node-id=0-1&m=dev&t=RMIJ6HupyivB6i21-1) 디자인을 기반으로 UI를 구현합니다.
- Open API를 활용하여 데이터 패칭을 진행합니다. (ex. [themoviedb API](https://developers.themoviedb.org/3/getting-started/introduction))

### 👍🏻 선택 요건

- **성능 최적화 기법**을 적용해봅니다.

### 🔑 Research Question

- 5주차 → 6주차 과제를 진행하면서 **중점적으로 고려한 사항과 그 이유**를 작성해주세요.

---

### **🔗 링크 및 참고자료**

- [useCallback과 React.Memo를 이용한 렌더링 최적화](https://velog.io/@yejinh/useCallback%EA%B3%BC-React.Memo%EC%9D%84-%ED%86%B5%ED%95%9C-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94)
- [성능 최적화](https://ui.toast.com/fe-guide/ko_PERFORMANCE)
- [더 나은 UX를 위한 스켈레톤 UI 만들기](https://ui.toast.com/weekly-pick/ko_20201110)
- [intersection Observer API 알아보기](https://www.youtube.com/watch?v=iZhq7I42uaI)
- [intersection Observer API 블로그 포스팅](https://www.heropy.dev/p/ydKoQO)
- [Tanstack Query를 활용한 무한 스크롤 적용](https://oliveyoung.tech/2023-10-04/useInfiniteQuery-scroll/)
- [해외 숙소 리스트 성능 개선기-반쪽짜리 ssr에서 완벽한 인피니트 스크롤까지](https://techblog.gccompany.co.kr/%ED%95%B4%EC%99%B8-%EC%88%99%EC%86%8C-%EB%A6%AC%EC%8A%A4%ED%8A%B8-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0%EA%B8%B0-%EB%B0%98%EC%AA%BD%EC%A7%9C%EB%A6%AC-ssr%EC%97%90%EC%84%9C-%EC%99%84%EB%B2%BD%ED%95%9C-%EC%9D%B8%ED%94%BC%EB%8B%88%ED%8A%B8-%EC%8A%A4%ED%81%AC%EB%A1%A4%EA%B9%8C%EC%A7%80-1ef7c7962dae)
- [react-intersection-observer 라이브러리](https://react-intersection-observer.vercel.app/?path=/docs/intro--docs)
