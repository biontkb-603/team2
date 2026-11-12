type Props = {
  checked: boolean
  onChange: (next: boolean) => void
  /** 스크린 리더용 이름(항목 제목) */
  label: string
  disabled?: boolean
}

// 켜고 끄는 스위치(알림 설정). 켜짐은 teal, 꺼짐은 회색 트랙에 흰 원.
export default function Switch({ checked, onChange, label, disabled }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-[54px] shrink-0 rounded-full transition-colors disabled:cursor-not-allowed ${checked ? 'bg-primary' : 'bg-switch-off'}`}
    >
      <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-all ${checked ? 'left-[26px]' : 'left-1'}`} />
    </button>
  )
}
