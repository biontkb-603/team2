// UI 단계(U)용 고정 샘플 데이터. 값은 시안(design/screen-NN.png)에서 그대로 옮겼다.
// "시안에 없음" 표시가 있는 값만 시안에 없어서 채운 것이다. 기능 단계(F)에서 저장소·시드 데이터로 교체한다.
import type { CommunityPost, Ingredient, Mall, Notice, PriceResult, Recipe } from '../types'

/** 사용자(시안 3·5·17: 김땡땡, gdragonlove로 통일 — 개발계획 5장) */
export const user = { name: '김땡땡', loginId: 'gdragonlove', phone: '010-5555-5555' }

/**
 * 식재료 12가지: 냉장 7 · 냉동 3 · 실온 2 (시안 8, 9의 개수), 3일 이내 임박 3개 · 여유 9개 (시안 7, 8).
 * 앞의 7개는 시안 9의 목록 순서 그대로다(계란 D-9가 애호박 D-6보다 앞).
 * 시안 9는 보이는 7개가 모두 "냉장"인데 개수는 냉장 7이라 8번째 이후(가려져 있음)는 냉동·실온으로 정했다.
 */
export const ingredients: Ingredient[] = [
  { id: 'i1', name: '대파', amount: 1, unit: '단', place: '냉장', daysLeft: 1 },
  { id: 'i2', name: '두부', amount: 1, unit: '모', place: '냉장', daysLeft: 2 },
  { id: 'i3', name: '우유', amount: 1, unit: 'L', place: '냉장', daysLeft: 3 },
  { id: 'i4', name: '계란', amount: 10, unit: '구', place: '냉장', daysLeft: 9 },
  { id: 'i5', name: '애호박', amount: 1, unit: '개', place: '냉장', daysLeft: 6 },
  { id: 'i6', name: '당근', amount: 2, unit: '개', place: '냉장', daysLeft: 12 },
  { id: 'i7', name: '김치', amount: 500, unit: 'g', place: '냉장', daysLeft: 30 },
  // 시안에 없음: 아래 5개는 시안에서 가려진 부분이라 개수를 맞추려고 채웠다.
  { id: 'i8', name: '닭가슴살', amount: 400, unit: 'g', place: '냉동', daysLeft: 60 },
  { id: 'i9', name: '새우', amount: 300, unit: 'g', place: '냉동', daysLeft: 45 },
  { id: 'i10', name: '만두', amount: 1, unit: '팩', place: '냉동', daysLeft: 90 },
  { id: 'i11', name: '양파', amount: 3, unit: '개', place: '실온', daysLeft: 20 },
  { id: 'i12', name: '감자', amount: 4, unit: '개', place: '실온', daysLeft: 14 },
]

/** 참치마요 덮밥(시안 12·13·20)은 시안 그대로. 나머지 레시피의 재료·조리법은 시안에 없어서 채웠다. */
export const recipes: Recipe[] = [
  {
    id: 'tuna-mayo',
    name: '참치마요 덮밥',
    minutes: 15,
    level: '쉬움',
    servings: 1,
    ingredients: [
      { name: '밥', amount: '1공기' },
      { name: '참치캔', amount: '1개' },
      { name: '마요네즈', amount: '2큰술' },
      { name: '대파', amount: '1/2대' },
      { name: '계란', amount: '1개' },
    ],
    steps: [
      '참치캔의 기름을 쪽 빼고 그릇에 담아요.',
      '참치에 마요네즈 2큰술을 넣고 골고루 섞어요.',
      '대파를 송송 썰어 준비해요.',
      // 시안에 없음: 4~5단계(시안은 3단계까지 보임)
      '따뜻한 밥 위에 참치마요를 올리고 대파를 뿌려요.',
      '계란을 반숙으로 익혀 올리면 완성이에요.',
    ],
    reason: '보유 재료로 가능',
    missing: 0,
  },
  {
    id: 'tofu-kimchi',
    name: '두부김치',
    minutes: 20,
    level: '쉬움',
    servings: 2,
    ingredients: [
      { name: '두부', amount: '1모' },
      { name: '김치', amount: '1컵' },
      { name: '대파', amount: '1/2대' },
    ],
    steps: ['두부를 먹기 좋게 썰어 끓는 물에 데쳐요.', '팬에 김치와 대파를 넣고 볶아요.', '두부와 볶은 김치를 함께 담아요.'],
    reason: '두부 임박 재료 사용',
    missing: 0,
  },
  {
    id: 'pa-egg-fried-rice',
    name: '대파 계란볶음밥',
    minutes: 10,
    level: '쉬움',
    servings: 1,
    ingredients: [
      { name: '밥', amount: '1공기' },
      { name: '대파', amount: '1대' },
      { name: '계란', amount: '2개' },
    ],
    steps: ['팬에 기름을 두르고 대파를 볶아 파기름을 내요.', '계란을 풀어 스크램블을 만들어요.', '밥을 넣고 볶아 간을 맞춰요.'],
    reason: '대파 임박 재료 사용',
    missing: 0,
  },
  {
    id: 'tofu-zucchini-stew',
    name: '두부 애호박찌개',
    minutes: 25,
    level: '보통',
    servings: 2,
    ingredients: [
      { name: '두부', amount: '1/2모' },
      { name: '애호박', amount: '1/2개' },
      { name: '양파', amount: '1/2개' },
    ],
    steps: ['애호박과 양파, 두부를 한입 크기로 썰어요.', '냄비에 물을 붓고 끓으면 재료를 넣어요.', '된장을 풀고 한소끔 더 끓여요.'],
    reason: '두부 임박 재료 사용',
    missing: 0,
  },
  {
    id: 'potato-cream-soup',
    name: '감자 크림수프',
    minutes: 30,
    level: '보통',
    servings: 2,
    ingredients: [
      { name: '감자', amount: '2개' },
      { name: '우유', amount: '400ml' },
      { name: '양파', amount: '1/2개' },
      { name: '버터', amount: '10g' },
    ],
    steps: ['감자와 양파를 얇게 썰어 버터에 볶아요.', '우유를 붓고 감자가 익을 때까지 끓여요.', '곱게 갈아 소금으로 간을 맞춰요.'],
    reason: '우유 임박 재료 사용',
    missing: 1,
  },
  {
    id: 'rolled-omelet',
    name: '계란말이',
    minutes: 15,
    level: '쉬움',
    servings: 2,
    ingredients: [
      { name: '계란', amount: '4개' },
      { name: '대파', amount: '1/3대' },
      { name: '당근', amount: '1/4개' },
    ],
    steps: ['계란을 풀고 잘게 썬 대파와 당근을 섞어요.', '약불의 팬에 계란물을 얇게 부어 돌돌 말아요.', '식힌 뒤 먹기 좋게 썰어요.'],
    reason: '보유 재료로 가능',
    missing: 0,
  },
]

/** 홈 "오늘의 추천"(시안 6·7)과 추천 탭 "오늘의 추천"(시안 12)에 나오는 레시피 */
export const todayRecipeIds = ['tuna-mayo', 'tofu-kimchi']
/** 추천 탭 "지금 만들기 좋은 요리"(시안 12) 순서 */
export const nowRecipeIds = ['pa-egg-fried-rice', 'tofu-zucchini-stew', 'potato-cream-soup', 'rolled-omelet']
/** 찜한 레시피(시안 12·13·20: 참치마요 덮밥 하나, "총 1개") */
export const favoriteRecipeIds = ['tuna-mayo']

/** 장보기 바로가기 4곳(시안 14) */
export const malls: Mall[] = [
  { id: 'coupang', name: '쿠팡', initial: '쿠' },
  { id: 'naver', name: '네이버 스토어', initial: '네' },
  { id: 'kurly', name: '마켓컬리', initial: '컬' },
  { id: 'emart', name: '이마트몰', initial: '이' },
]

/**
 * 장보기 가격 비교 예시(시안 14의 "예시: 김가루", 15의 검색 결과). 이번 범위에서는 안내만 한다.
 * 최저가와의 차액은 값으로 저장하지 않고 가격에서 계산한다(시안 15는 광천김에 "+140원"이라 적었지만
 * 19,900 − 18,860 = 1,040이라 시안의 오류로 보고 계산값을 쓴다).
 */
export const priceSample = {
  keyword: '김가루',
  results: [
    { id: 'p1', title: '프레시원 조미 김가루 1kg', mall: '네이버 스토어', delivery: '2~3일 도착', price: 18860 },
    { id: 'p2', title: '새우표 만능 맛난 김가루 1kg', mall: '쿠팡', delivery: '내일 도착', price: 18900 },
    { id: 'p3', title: '광천김 소문난 김가루 1kg', mall: '이마트몰', delivery: '당일 배송', price: 19900 },
    { id: 'p4', title: '대지푸드 참맛 김가루 1kg', mall: '마켓컬리', delivery: '새벽 배송', price: 21390 },
  ] satisfies PriceResult[],
}

/** 장바구니(시안 16) */
export const cartSample = {
  mall: '네이버 스토어',
  delivery: '2~3일 도착',
  items: [{ id: 'c1', name: '동원 조미 김가루 50g', price: 3200, quantity: 1 }],
}

/** 공지사항(시안 23). 본문은 시안에 없음(펼친 모습이 시안에 없다). */
export const notices: Notice[] = [
  {
    id: 'n1',
    title: '커뮤니티 기능이 새로 생겼어요!',
    date: '26년 10월 16일',
    body: '마냉이에 커뮤니티가 생겼어요. 간단 레시피와 요리 꿀팁을 함께 나눠 보세요.',
    isNew: true,
  },
]

/** 커뮤니티(시안 24). 이번 범위에서는 안내만 한다. */
export const communityPosts: CommunityPost[] = [
  { id: 'cp1', category: '간단 레시피', title: '전자레인지로 3분 계란찜', summary: '계란 2개, 물 반 컵, 소금 약간. 랩 씌워 1분이면 몽글몽글해요.', author: '자취요리사', ago: '2시간 전', likes: 128, comments: 14 },
  { id: 'cp2', category: '요리 꿀팁', title: '대파는 썰어서 냉동하세요', summary: '송송 썰어 지퍼백에 평평하게 얼리면 한 달 넘게 써요.', author: '대파러버', ago: '5시간 전', likes: 96, comments: 9 },
]

/** 알림 설정 스위치 초기값(시안 22) */
export const notificationDefaults = {
  all: true,
  expiring: true,
  shortage: true,
  todayRecipe: true,
  priceChange: false,
  notice: true,
  event: false,
}

/** 취향 선택지(시안 19) */
export const tasteOptions = {
  ages: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
  likes: ['한식', '양식', '중식', '일식', '분식', '샐러드', '국·찌개', '면 요리', '볶음밥', '디저트'],
  dislikes: ['오이', '고수', '가지', '버섯', '해산물', '내장류', '날 것', '견과류'],
}

/** 연결 가능한 냉장고(시안 21). 이번 범위에서는 안내만 한다. */
export const connectableFridges = ['우리집 냉장고', '주방 냉장고']
