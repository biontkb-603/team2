import { describe, expect, test } from 'vitest'
import { ddayInfo, EXPIRING_DAYS, isExpiringSoon } from './dday'

describe('isExpiringSoon', () => {
  test('3일 이내는 임박(경계 포함)', () => {
    expect(EXPIRING_DAYS).toBe(3)
    expect(isExpiringSoon(3)).toBe(true)
    expect(isExpiringSoon(4)).toBe(false)
  })
  test('오늘과 이미 지난 것도 임박', () => {
    expect(isExpiringSoon(0)).toBe(true)
    expect(isExpiringSoon(-5)).toBe(true)
  })
})

describe('ddayInfo', () => {
  test('D-1~D-3은 빨강', () => {
    expect(ddayInfo(1)).toEqual({ tone: 'danger', label: 'D-1' })
    expect(ddayInfo(3)).toEqual({ tone: 'danger', label: 'D-3' })
  })
  test('D-4 이상은 여유', () => {
    expect(ddayInfo(4)).toEqual({ tone: 'ok', label: 'D-4' })
    expect(ddayInfo(30)).toEqual({ tone: 'ok', label: 'D-30' })
  })
  test('0일은 "오늘까지", 지나면 "기한 지남"', () => {
    expect(ddayInfo(0)).toEqual({ tone: 'danger', label: '오늘까지' })
    expect(ddayInfo(-1)).toEqual({ tone: 'expired', label: '기한 지남' })
  })
})
