# 지정학 브리프 / Geopolitical Brief

국제 정세를 매일 정리하고 기업 시사점을 제공하는 영/한 병기 사이트입니다.

- 정적 사이트: [Eleventy](https://www.11ty.dev/) (`npm run build` → `_site`)
- 글쓰기 화면: `/admin` (Sveltia CMS, GitHub 토큰으로 로그인)
- 데일리 브리프 작성 규격: [BRIEF_SPEC.md](BRIEF_SPEC.md)

## Cloudflare Pages 설정
- Build command: `npm run build`
- Build output directory: `_site`
- Environment variable: `NODE_VERSION` = `22`
