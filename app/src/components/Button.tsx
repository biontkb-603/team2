import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'tint' | 'outline'
type Size = 'lg' | 'md'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** primary: 주 버튼(teal) / tint: 연한 teal 보조(인증번호 확인) / outline: 흰 바탕+teal 테두리(앨범에서 선택하기) */
  variant?: Variant
  /** lg: 하단 고정 등 큰 pill(높이 58) / md: 입력창 옆 버튼(높이 54, 둥근 사각) */
  size?: Size
  full?: boolean
}

const VARIANT: Record<Variant, string> = {
  primary: 'bg-primary text-white disabled:bg-disabled disabled:text-ink-nav',
  tint: 'bg-primary-tint text-primary-dark disabled:text-ink-nav',
  outline: 'border border-primary bg-white text-primary disabled:border-line disabled:text-ink-nav',
}
const SIZE: Record<Size, string> = {
  lg: 'h-[58px] rounded-full px-8 text-[17px]',
  md: 'h-[54px] rounded-xl px-5 text-[15px]',
}

export default function Button({ variant = 'primary', size = 'lg', full, className = '', type = 'button', ...rest }: Props) {
  return (
    <button
      type={type}
      className={`inline-flex shrink-0 items-center justify-center font-bold transition-colors disabled:cursor-not-allowed ${VARIANT[variant]} ${SIZE[size]} ${full ? 'w-full' : ''} ${className}`}
      {...rest}
    />
  )
}
