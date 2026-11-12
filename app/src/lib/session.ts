// 브라우저 세션(탭을 닫기 전까지) 동안 "이미 봤는지"를 기억한다. 저장소를 못 쓰는 환경에서는 매번 새로 본 것으로 친다.
export function hasSeen(key: string): boolean {
  try {
    return sessionStorage.getItem(key) === '1'
  } catch {
    return false
  }
}

export function markSeen(key: string): void {
  try {
    sessionStorage.setItem(key, '1')
  } catch {
    // 저장 불가 환경에서는 기억하지 못할 뿐 동작에는 문제가 없다.
  }
}
