// D-day 표시 규칙 (개발계획 5장). 날짜에서 남은 날수를 계산하는 함수는 F-02에서 이 파일에 추가한다.

/** "곧 상함" 기준: 남은 날수가 이 값 이하면 임박. 홈·냉장고·알림이 모두 이 값을 쓴다. */
export const EXPIRING_DAYS = 3

export type DdayTone = 'danger' | 'ok' | 'expired'

/** 임박(유통기한 3일 이내)인가. 기한이 지난 것도 포함한다. */
export function isExpiringSoon(daysLeft: number): boolean {
  return daysLeft <= EXPIRING_DAYS
}

/** 배지에 쓸 색상 종류와 문구. 0일은 "오늘까지", 지난 것은 "기한 지남", 나머지는 "D-n". */
export function ddayInfo(daysLeft: number): { tone: DdayTone; label: string } {
  if (daysLeft < 0) return { tone: 'expired', label: '기한 지남' }
  if (daysLeft === 0) return { tone: 'danger', label: '오늘까지' }
  return { tone: isExpiringSoon(daysLeft) ? 'danger' : 'ok', label: `D-${daysLeft}` }
}
