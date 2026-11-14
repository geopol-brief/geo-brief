# 지정학 브리프 / Geopolitical Brief

국제 정세를 매일 정리하고 기업 시사점을 제공하는 영/한 병기 사이트입니다.

- 정적 사이트: [Eleventy](https://www.11ty.dev/) (`npm run build` → `_site`)
- 글쓰기 화면: `/admin` (Sveltia CMS, GitHub 토큰으로 로그인)
- 데일리 브리프 작성 규격: [BRIEF_SPEC.md](BRIEF_SPEC.md)

## Cloudflare 배포 설정
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (`wrangler.jsonc`가 `_site` 폴더를 배포)
- 빌드 변수 `SITE_URL`에 실제 사이트 주소를 넣으면 RSS 링크가 올바르게 나옵니다.
