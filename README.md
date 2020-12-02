
<p align="center">
  <a href="https://www.devhak.com">
    <img src="../blog-with-gatsby/public/static/logoIcon-37f7686732afb400dca703537498a701.svg" width="80" height="80" alt="logo">
  </a>
</p>
<h1 align="center">www.devhak.com</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/904c5db2-9246-4ff5-aa1a-f18cfbab6f9d/deploy-status)](https://app.netlify.com/sites/devhak/deploys)

꾸준히 쓰려고 만든 개인 개발 [블로그](https://www.devhak.com).  
(부제: blog-with-gatsby)


## 🔧 Skills or Tools
- Gatsby
- React
- ES2015+
- GraphQL
- Scss
- Markdown
- Git
- Netlify


## 🏗 Starter
gatsby 공식 스타터 중 하나인 [starter-hello-world](https://github.com/gatsbyjs/gatsby-starter-hello-world)로 시작


## 🎯 Features
1. 정적 웹사이트
   - Gatsby로 제작

2. 반응형 디자인
   - Scss mixin을 이용하여 미디어쿼리 작성
   - 크게 모바일과 웹으로 나누었으며, 필요한 페이지는 테블릿 사이즈도 스타일링

3. 다크모드 지원
   - 상단 헤더의 스위치를 이용하여 어느 페이지에서도 접근 가능
   - React Context를 사용하여 테마 상태 관리
   - localStorage로 재방문시에도 테마 유지 기능
   - 사용자의 시스템 환경에 맞춰 테마 설정
   - customize html.js로 깜박임이나 지연없이 자연스러운 테마 변경

4. Layout 컴포넌트를 전페이지 공통 사항 관리
   - useState로 스크롤 상태 관리로 Header는 상단에 고정
   - useContext 사용하여 테마 변경 가능한 스위치를 항상 Header에 위치
   - 페이지 SEO 적용
   - 슬라이드 형태 Footer
   - 아이콘 클릭시 클립보드로 복사 기능 구현

5. 컨텐츠 파일 비공개로 관리
   - git submodule을 사용하여 별도의 private repository로 관리

6. 마크다운으로 포스트
   - frontmatter에 필요한 정보 담아 데이터 관리
   - jpg, png, gif 등 파일 추가 가능
   - GraphQL로 포스트 데이터 불러오기
   - 코드 하이라이트(prismjs)

7. 카테고리, 태그 분류
   - 선택한 카테고리, 태그 별로 완관된 포스트만 노출
   - 모든 카테고리와 태그를 보여주는 페이지 존재

8. 간단한 포스트 검색
   - 제목에 포함되는 단어로 포스트 검색

9. 각 포스트별 댓글
   - 깃허브 이슈로 관리하는 utterances 추가
   - 테마에 따라 댓글 테마도 변화

10. SEO
    - 페이지별 title, description, image, url 정보 추가
    - 소셜 미리보기를 위해 open graph 추가
    - 구조화된 데이터 작성

<details>
<summary>Dependencies</summary>

- gatsby
- gatsby-image
- gatsby-plugin-sass
- gatsby-plugin-sharp
- gatsby-remark-copy-linked-files
- gatsby-remark-images
- gatsby-remark-prismjs
- gatsby-remark-relative-images
- gatsby-source-filesystem
- gatsby-transformer-remark
- gatsby-transformer-sharp
- lodash
- node-sass
- prismjs
- react
- react-dom
- react-helmet
- react-icons
- react-syntax-highlighter
</details>


## 📌 Thinng to Do
- [x] ~~댓글 (utterances)~~ DONE!
- [x] ~~SEO~~ DONE!

## 💫 Deploy
[![Deploy to Netlify](https://www.netlify.com/img/global/badges/netlify-color-accent.svg)](https://www.netlify.com/)
