// 장보기 바로가기: 쇼핑몰 4곳의 검색 페이지 주소를 만든다(개발계획 5장). 사이트 개편으로 바뀔 수 있으니 시연 전에 한 번 열어 확인한다.
type MallLink = { home: string; search: (encodedKeyword: string) => string }

const LINKS: Record<string, MallLink> = {
  coupang: { home: 'https://www.coupang.com', search: (q) => `https://www.coupang.com/np/search?q=${q}` },
  naver: { home: 'https://shopping.naver.com', search: (q) => `https://search.shopping.naver.com/search/all?query=${q}` },
  kurly: { home: 'https://www.kurly.com', search: (q) => `https://www.kurly.com/search?sword=${q}` },
  emart: { home: 'https://emart.ssg.com', search: (q) => `https://emart.ssg.com/search.ssg?query=${q}` },
}

/** 검색어가 있으면 그 쇼핑몰의 검색 결과 주소, 비어 있으면 쇼핑몰 첫 화면 주소. 모르는 쇼핑몰이면 null. */
export function mallUrl(mallId: string, keyword: string): string | null {
  const link = LINKS[mallId]
  if (!link) return null
  const q = keyword.trim()
  return q ? link.search(encodeURIComponent(q)) : link.home
}
