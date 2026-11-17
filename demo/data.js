// 고정 샘플 데이터. app/src/data/mock.ts 와 같은 값이다(시안 design/screen-NN.png 기준).
// 시안에 없어서 채운 값은 "시안에 없음"으로 표시했다.
window.DATA = {
  user: { name: '김땡땡', loginId: 'gdragonlove' },

  // 식재료 12가지: 냉장 7 · 냉동 3 · 실온 2, 3일 이내 임박 3개. daysLeft = 유통기한까지 남은 날수
  ingredients: [
    { id: 'i1', name: '대파', amount: 1, unit: '단', place: '냉장', daysLeft: 1 },
    { id: 'i2', name: '두부', amount: 1, unit: '모', place: '냉장', daysLeft: 2 },
    { id: 'i3', name: '우유', amount: 1, unit: 'L', place: '냉장', daysLeft: 3 },
    { id: 'i4', name: '계란', amount: 10, unit: '구', place: '냉장', daysLeft: 9 },
    { id: 'i5', name: '애호박', amount: 1, unit: '개', place: '냉장', daysLeft: 6 },
    { id: 'i6', name: '당근', amount: 2, unit: '개', place: '냉장', daysLeft: 12 },
    { id: 'i7', name: '김치', amount: 500, unit: 'g', place: '냉장', daysLeft: 30 },
    // 시안에 없음: 아래 5개
    { id: 'i8', name: '닭가슴살', amount: 400, unit: 'g', place: '냉동', daysLeft: 60 },
    { id: 'i9', name: '새우', amount: 300, unit: 'g', place: '냉동', daysLeft: 45 },
    { id: 'i10', name: '만두', amount: 1, unit: '팩', place: '냉동', daysLeft: 90 },
    { id: 'i11', name: '양파', amount: 3, unit: '개', place: '실온', daysLeft: 20 },
    { id: 'i12', name: '감자', amount: 4, unit: '개', place: '실온', daysLeft: 14 },
  ],

  // 참치마요 덮밥은 시안 그대로, 나머지 레시피의 재료·조리법은 시안에 없음
  recipes: [
    {
      id: 'tuna-mayo', name: '참치마요 덮밥', minutes: 15, level: '쉬움', servings: 1,
      ingredients: [['밥', '1공기'], ['참치캔', '1개'], ['마요네즈', '2큰술'], ['대파', '1/2대'], ['계란', '1개']],
      steps: ['참치캔의 기름을 쪽 빼고 그릇에 담아요.', '참치에 마요네즈 2큰술을 넣고 골고루 섞어요.', '대파를 송송 썰어 준비해요.', '따뜻한 밥 위에 참치마요를 올리고 대파를 뿌려요.', '계란을 반숙으로 익혀 올리면 완성이에요.'],
      reason: '보유 재료로 가능', missing: 0, usesExpiring: false,
    },
    {
      id: 'tofu-kimchi', name: '두부김치', minutes: 20, level: '쉬움', servings: 2,
      ingredients: [['두부', '1모'], ['김치', '1컵'], ['대파', '1/2대']],
      steps: ['두부를 먹기 좋게 썰어 끓는 물에 데쳐요.', '팬에 김치와 대파를 넣고 볶아요.', '두부와 볶은 김치를 함께 담아요.'],
      reason: '두부 임박 재료 사용', missing: 0, usesExpiring: true,
    },
    {
      id: 'pa-egg-fried-rice', name: '대파 계란볶음밥', minutes: 10, level: '쉬움', servings: 1,
      ingredients: [['밥', '1공기'], ['대파', '1대'], ['계란', '2개']],
      steps: ['팬에 기름을 두르고 대파를 볶아 파기름을 내요.', '계란을 풀어 스크램블을 만들어요.', '밥을 넣고 볶아 간을 맞춰요.'],
      reason: '대파 임박 재료 사용', missing: 0, usesExpiring: true,
    },
    {
      id: 'tofu-zucchini-stew', name: '두부 애호박찌개', minutes: 25, level: '보통', servings: 2,
      ingredients: [['두부', '1/2모'], ['애호박', '1/2개'], ['양파', '1/2개']],
      steps: ['애호박과 양파, 두부를 한입 크기로 썰어요.', '냄비에 물을 붓고 끓으면 재료를 넣어요.', '된장을 풀고 한소끔 더 끓여요.'],
      reason: '두부 임박 재료 사용', missing: 0, usesExpiring: true,
    },
    {
      id: 'potato-cream-soup', name: '감자 크림수프', minutes: 30, level: '보통', servings: 2,
      ingredients: [['감자', '2개'], ['우유', '400ml'], ['양파', '1/2개'], ['버터', '10g']],
      steps: ['감자와 양파를 얇게 썰어 버터에 볶아요.', '우유를 붓고 감자가 익을 때까지 끓여요.', '곱게 갈아 소금으로 간을 맞춰요.'],
      reason: '우유 임박 재료 사용', missing: 1, usesExpiring: true,
    },
    {
      id: 'rolled-omelet', name: '계란말이', minutes: 15, level: '쉬움', servings: 2,
      ingredients: [['계란', '4개'], ['대파', '1/3대'], ['당근', '1/4개']],
      steps: ['계란을 풀고 잘게 썬 대파와 당근을 섞어요.', '약불의 팬에 계란물을 얇게 부어 돌돌 말아요.', '식힌 뒤 먹기 좋게 썰어요.'],
      reason: '보유 재료로 가능', missing: 0, usesExpiring: false,
    },
  ],

  todayRecipeIds: ['tuna-mayo', 'tofu-kimchi'],
  nowRecipeIds: ['pa-egg-fried-rice', 'tofu-zucchini-stew', 'potato-cream-soup', 'rolled-omelet'],
  favoriteRecipeIds: ['tuna-mayo'],

  malls: [
    { id: 'coupang', name: '쿠팡', initial: '쿠' },
    { id: 'naver', name: '네이버 스토어', initial: '네' },
    { id: 'kurly', name: '마켓컬리', initial: '컬' },
    { id: 'emart', name: '이마트몰', initial: '이' },
  ],

  notices: [
    { id: 'n1', title: '커뮤니티 기능이 새로 생겼어요!', date: '26년 10월 16일', isNew: true, body: '마냉이에 커뮤니티가 생겼어요. 간단 레시피와 요리 꿀팁을 함께 나눠 보세요.' },
  ],

  notificationDefaults: { all: true, expiring: true, shortage: true, todayRecipe: true, priceChange: false, notice: true, event: false },
};
