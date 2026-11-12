import type { ReactNode } from 'react'
import BackButton from './BackButton'

type Props = {
  title: string
  /** 값이 있으면 좌상단 "<"가 보인다. 주소로 직접 열었을 때 돌아갈 경로. 탭 최상위 화면은 생략. */
  back?: string
  /** 우측 아이콘 등(검색, 알림, 장바구니, 설정). */
  right?: ReactNode
}

// 시안의 상단바: 하위 화면은 "<" + 제목, 탭 최상위 화면은 제목만. 우측에 아이콘 버튼을 둘 수 있다.
export default function TopBar({ title, back, right }: Props) {
  return (
    <header className="flex h-[74px] shrink-0 items-center gap-1.5 px-6">
      {back && <BackButton fallback={back} className="-ml-2" />}
      <h1 className="flex-1 truncate text-[24px] font-bold">{title}</h1>
      {right && <div className="flex items-center">{right}</div>}
    </header>
  )
}
