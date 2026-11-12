// 시안 화면 ↔ 라우트 표. 라우트·탭 표시·"<" 돌아갈 곳을 한 곳에서 정한다.
// no: 시안 화면 번호(task.md의 화면 표와 같음). 같은 화면의 다른 상태(3, 5, 7)와
//     마이페이지 위 팝업(25), "안내만" 화면(15, 16)은 별도 라우트를 만들지 않는다.
// tab: true면 하단 탭이 보이는 화면(시안 기준).
// back: 값이 있으면 좌상단 "<"가 보이고, 이전 기록이 없을 때(주소로 바로 진입) 이 경로로 간다.
export type Screen = {
  no: string
  path: string
  title: string
  tab: boolean
  back?: string
}

export const SCREENS: Screen[] = [
  { no: '1', path: '/login', title: '로그인', tab: false },
  { no: '2·3', path: '/signup', title: '회원가입', tab: false, back: '/login' },
  { no: '4·5', path: '/signup/account', title: '회원가입', tab: false, back: '/signup' },
  { no: '6·7', path: '/', title: '홈', tab: true },
  { no: '8', path: '/fridge/status', title: '냉장고 현황', tab: false, back: '/' },
  { no: '9', path: '/fridge', title: '냉장고', tab: true, back: '/fridge/status' },
  { no: '10', path: '/fridge/add', title: '식재료 추가', tab: false, back: '/fridge' },
  { no: '11', path: '/fridge/add/photo', title: '사진으로 등록', tab: false, back: '/fridge' },
  { no: '12', path: '/recommend', title: '요리 추천', tab: true },
  { no: '13', path: '/recommend/:id', title: '레시피 상세', tab: false, back: '/recommend' },
  // 15(가격 결과)·16(장바구니)은 "안내만"이라 화면이 없고, 14의 장바구니 아이콘·버튼이 "곧 지원 예정"을 띄운다.
  { no: '14', path: '/shopping', title: '장보기', tab: true },
  { no: '17', path: '/mypage', title: '마이페이지', tab: true },
  { no: '18', path: '/mypage/profile', title: '내 정보 수정', tab: false, back: '/mypage' },
  { no: '19', path: '/mypage/taste', title: '내 취향', tab: false, back: '/mypage' },
  { no: '20', path: '/mypage/favorites', title: '찜한 레시피', tab: true, back: '/mypage' },
  { no: '21', path: '/mypage/fridge-link', title: '냉장고 연동하기', tab: false, back: '/mypage' },
  { no: '22', path: '/mypage/notifications', title: '알림 설정', tab: false, back: '/mypage' },
  { no: '23', path: '/mypage/notices', title: '공지사항', tab: false, back: '/mypage' },
  { no: '24', path: '/mypage/community', title: '커뮤니티', tab: false, back: '/mypage' },
]
