// 앱 전체에서 쓰는 데이터 모양. 시드 데이터·저장소(F-01)·화면이 모두 이 타입을 쓴다.

export type StoragePlace = '냉장' | '냉동' | '실온'

export type Ingredient = {
  id: string
  name: string
  amount: number
  /** 단, 모, L, 구, 개, 팩, g 등 시안에 나온 단위 그대로 */
  unit: string
  place: StoragePlace
  /** 유통기한까지 남은 날수. mock에서만 쓰는 고정 값이다. 실제 데이터는 유통기한 날짜에서 계산한다(F-02). */
  daysLeft: number
}

export type RecipeIngredient = { name: string; amount: string }

export type Recipe = {
  id: string
  name: string
  minutes: number
  level: '쉬움' | '보통' | '어려움'
  servings: number
  ingredients: RecipeIngredient[]
  steps: string[]
  /** 추천 탭 목록에 쓰는 사유 문구(홈 카드에는 쓰지 않음) */
  reason: string
  /** 부족한 재료 수. 0이면 "재료 충분" */
  missing: number
}

export type Notice = { id: string; title: string; date: string; body: string; isNew: boolean }

export type Mall = { id: string; name: string; initial: string }

export type PriceResult = {
  id: string
  title: string
  mall: string
  delivery: string
  price: number
}

export type CommunityPost = {
  id: string
  category: '간단 레시피' | '요리 꿀팁'
  title: string
  summary: string
  author: string
  ago: string
  likes: number
  comments: number
}
