import type { ReactNode } from 'react'

type Props = {
  /** 이름 첫 글자를 타일에 보여 준다(식재료: 대·두·우). leading을 직접 넘기면 그것을 쓴다. */
  initial?: string
  leading?: ReactNode
  title: string
  subtitle?: string
  /** 오른쪽: D-day 배지, 화살표 등 */
  trailing?: ReactNode
  onClick?: () => void
}

// 식재료 목록 같은 카드형 행: [타일] 제목 / 보조 문구 ............ [배지]
export default function ListRow({ initial, leading, title, subtitle, trailing, onClick }: Props) {
  const body = (
    <>
      {leading ?? (
        <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl bg-primary-tint text-[20px] font-bold text-primary-dark">
          {initial ?? title.charAt(0)}
        </span>
      )}
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-[17px] font-bold">{title}</span>
        {subtitle && <span className="block truncate text-[13px] text-ink-muted">{subtitle}</span>}
      </span>
      {trailing}
    </>
  )
  const cls = 'flex w-full items-center gap-3.5 rounded-2xl border border-line bg-white px-4 py-3'

  return onClick ? (
    <button type="button" onClick={onClick} className={cls}>
      {body}
    </button>
  ) : (
    <div className={cls}>{body}</div>
  )
}
