import { expect, test } from 'vitest'

// 테스트 환경이 동작하는지만 확인한다. 실제 테스트는 F-02(D-day)와 F-11(추천)에서 추가한다.
test('테스트 환경', () => {
  expect(1 + 1).toBe(2)
})
