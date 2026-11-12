type Tone = 'danger' | 'ok' | 'expired'

type Props = {
  /** danger: 임박(D ≤ 3) / ok: 여유 있음 / expired: 기한 지남 */
  tone: Tone
  /** 예: "D-3", "오늘까지", "기한 지남" */
  label: string
}

const TONE: Record<Tone, string> = {
  danger: 'bg-danger-tint text-danger',
  ok: 'bg-primary-tint text-primary-dark',
  expired: 'bg-danger text-white',
}

// 표시만 담당한다. 어떤 tone/label을 쓸지는 D-day 계산 함수(F-02)가 정하고, 그 전에는 mock 값을 넘긴다.
export default function DdayBadge({ tone, label }: Props) {
  return (
    <span className={`inline-flex h-[30px] items-center justify-center rounded-full px-2.5 text-[13px] font-bold ${TONE[tone]}`}>
      {label}
    </span>
  )
}
