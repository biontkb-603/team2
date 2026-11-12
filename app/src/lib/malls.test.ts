import { describe, expect, test } from 'vitest'
import { malls } from '../data/mock'
import { mallUrl } from './malls'

describe('mallUrl', () => {
  test('검색어는 주소에 맞게 인코딩해 붙인다', () => {
    expect(mallUrl('coupang', '김가루')).toBe('https://www.coupang.com/np/search?q=%EA%B9%80%EA%B0%80%EB%A3%A8')
    expect(mallUrl('naver', '대파')).toContain('search.shopping.naver.com/search/all?query=')
    expect(mallUrl('kurly', '두부')).toContain('kurly.com/search?sword=')
    expect(mallUrl('emart', '우유')).toContain('emart.ssg.com/search.ssg?query=')
  })

  test('띄어쓰기·특수문자도 안전하게 인코딩, 앞뒤 공백은 무시', () => {
    expect(mallUrl('coupang', '  참치 캔&1+1 ')).toBe('https://www.coupang.com/np/search?q=%EC%B0%B8%EC%B9%98%20%EC%BA%94%261%2B1')
  })

  test('검색어가 비어 있으면 쇼핑몰 첫 화면', () => {
    expect(mallUrl('coupang', '')).toBe('https://www.coupang.com')
    expect(mallUrl('naver', '   ')).toBe('https://shopping.naver.com')
  })

  test('모르는 쇼핑몰은 null', () => {
    expect(mallUrl('nope', '김가루')).toBeNull()
  })

  test('시안의 쇼핑몰 4곳이 모두 주소를 가진다', () => {
    expect(malls.map((m) => m.name)).toEqual(['쿠팡', '네이버 스토어', '마켓컬리', '이마트몰'])
    for (const m of malls) expect(mallUrl(m.id, '김가루')).not.toBeNull()
  })
})
