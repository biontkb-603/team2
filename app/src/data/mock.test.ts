import { describe, expect, test } from 'vitest'
import { isExpiringSoon } from '../lib/dday'
import { favoriteRecipeIds, ingredients, nowRecipeIds, priceSample, recipes, todayRecipeIds } from './mock'

// 시안의 숫자와 샘플 데이터가 어긋나지 않게 지키는 테스트(시안 7, 8, 9, 12, 14, 15).
describe('식재료 mock', () => {
  const count = (place: string) => ingredients.filter((i) => i.place === place).length

  test('총 12가지, 냉장 7 · 냉동 3 · 실온 2', () => {
    expect(ingredients).toHaveLength(12)
    expect([count('냉장'), count('냉동'), count('실온')]).toEqual([7, 3, 2])
  })

  test('3일 이내 임박 3개, 여유 있음 9개', () => {
    expect(ingredients.filter((i) => isExpiringSoon(i.daysLeft))).toHaveLength(3)
    expect(ingredients.filter((i) => !isExpiringSoon(i.daysLeft))).toHaveLength(9)
  })

  test('임박은 대파 D-1, 두부 D-2, 우유 D-3', () => {
    const soon = ingredients.filter((i) => isExpiringSoon(i.daysLeft)).map((i) => [i.name, i.daysLeft])
    expect(soon).toEqual([['대파', 1], ['두부', 2], ['우유', 3]])
  })

  test('시안 9의 앞 7행 순서와 D-day', () => {
    const rows = ingredients.slice(0, 7).map((i) => `${i.name} D-${i.daysLeft}`)
    expect(rows).toEqual(['대파 D-1', '두부 D-2', '우유 D-3', '계란 D-9', '애호박 D-6', '당근 D-12', '김치 D-30'])
  })

  test('id가 겹치지 않는다', () => {
    expect(new Set(ingredients.map((i) => i.id)).size).toBe(ingredients.length)
  })
})

describe('레시피 mock', () => {
  const byId = new Map(recipes.map((r) => [r.id, r]))

  test('목록이 가리키는 레시피가 모두 있다', () => {
    for (const id of [...todayRecipeIds, ...nowRecipeIds, ...favoriteRecipeIds]) expect(byId.has(id)).toBe(true)
  })

  test('시안 12의 목록 순서와 부족 재료', () => {
    expect(todayRecipeIds.map((id) => byId.get(id)?.name)).toEqual(['참치마요 덮밥', '두부김치'])
    expect(nowRecipeIds.map((id) => byId.get(id)?.name)).toEqual(['대파 계란볶음밥', '두부 애호박찌개', '감자 크림수프', '계란말이'])
    expect(nowRecipeIds.map((id) => byId.get(id)?.missing)).toEqual([0, 0, 1, 0])
  })

  test('참치마요 덮밥은 시안 13 그대로(15분·쉬움·1인분, 재료 5개)', () => {
    const r = byId.get('tuna-mayo')!
    expect([r.minutes, r.level, r.servings]).toEqual([15, '쉬움', 1])
    expect(r.ingredients.map((i) => `${i.name} ${i.amount}`)).toEqual(['밥 1공기', '참치캔 1개', '마요네즈 2큰술', '대파 1/2대', '계란 1개'])
  })

  test('찜한 레시피는 1개', () => {
    expect(favoriteRecipeIds).toHaveLength(1)
  })
})

describe('가격 비교 mock', () => {
  test('시안 15: 4건, 최저가 18,860원, 차액은 가격에서 계산(시안의 +140원은 오류, 실제 1,040원)', () => {
    const prices = priceSample.results.map((r) => r.price)
    expect(prices).toHaveLength(4)
    expect(Math.min(...prices)).toBe(18860)
    expect(prices.slice(1).map((p) => p - 18860)).toEqual([40, 1040, 2530])
  })
})
