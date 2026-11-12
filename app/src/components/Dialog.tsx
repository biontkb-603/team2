import { useEffect, useId, type ReactNode } from 'react'

type Props = {
  title: string
  description?: ReactNode
  /** 제목 위 큰 아이콘(냉장고 연동하기 팝업) */
  icon?: ReactNode
  cancelLabel: string
  confirmLabel: string
  onCancel: () => void
  onConfirm: () => void
  /** 제목만 있는 좁은 팝업(로그아웃 확인). 기본은 큰 팝업. */
  compact?: boolean
}

// 가운데 팝업: 뒤 화면을 어둡게 하고, 아래에 취소(회색) / 확인(teal) 두 칸을 둔다. 바깥 영역·Esc는 취소로 처리한다.
// 프레임(Layout의 relative 영역) 안에서만 덮이도록 absolute로 그린다.
export default function Dialog({ title, description, icon, cancelLabel, confirmLabel, onCancel, onConfirm, compact }: Props) {
  const titleId = useId()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className={`absolute inset-0 z-40 flex items-center justify-center bg-black/50 ${compact ? 'px-[42px]' : 'px-[29px]'}`} onClick={onCancel}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="w-full overflow-hidden rounded-[28px] bg-white"
      >
        <div className="flex flex-col items-center px-6 pb-6 pt-[34px] text-center">
          {icon}
          <h2 id={titleId} className={`text-[20px] font-bold leading-7 ${icon ? 'mt-[15px]' : 'pb-1.5 pt-1'}`}>
            {title}
          </h2>
          {description && <p className="mt-[15px] text-[15px] leading-6 text-ink-muted">{description}</p>}
        </div>
        <div className="flex h-[59px] border-t border-line/70">
          <button type="button" onClick={onCancel} className="flex-1 text-[17px] text-ink-muted">
            {cancelLabel}
          </button>
          <span className="w-px bg-line/70" aria-hidden="true" />
          <button type="button" onClick={onConfirm} className="flex-1 text-[17px] font-bold text-primary">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
