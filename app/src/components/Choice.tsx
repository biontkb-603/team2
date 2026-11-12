import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean }

// 여러 개 중 하나를 고르는 둥근 사각 버튼(보관 위치, 단위, 등록 방식 탭). 선택되면 teal 바탕에 흰 글자.
export default function Choice({ selected, className = '', type = 'button', ...rest }: Props) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={`rounded-xl text-[16px] ${selected ? 'bg-primary font-bold text-white' : 'border border-line bg-white font-medium text-ink'} ${className}`}
      {...rest}
    />
  )
}
