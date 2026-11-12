import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { EyeIcon, EyeOffIcon } from './Icons'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string
  /** outline: 흰 바탕+테두리(회원가입·식재료 추가) / filled: 연한 회색 바탕(로그인) */
  variant?: 'outline' | 'filled'
  /** 입력창 왼쪽 아이콘(로그인의 사람·자물쇠) */
  leading?: ReactNode
  /** 입력창 안 오른쪽 내용(인증 타이머 03:00 등). type="password"면 눈 아이콘 토글이 대신 들어간다. */
  trailing?: ReactNode
  hint?: string
}

export default function Input({ label, variant = 'outline', leading, trailing, hint, type = 'text', className = '', disabled, ...rest }: Props) {
  const id = useId()
  const [shown, setShown] = useState(false)
  const isPassword = type === 'password'

  const box =
    variant === 'filled'
      ? 'border border-line/60 bg-field rounded-2xl'
      : `border border-line rounded-xl ${disabled ? 'bg-field' : 'bg-white'}`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-2 block text-[14px] font-medium">
          {label}
        </label>
      )}
      <div className={`flex h-14 items-center gap-3 px-4 focus-within:border-primary ${box}`}>
        {leading && <span className="text-ink-nav">{leading}</span>}
        <input
          id={id}
          type={isPassword && shown ? 'text' : type}
          disabled={disabled}
          className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-placeholder disabled:text-placeholder"
          {...rest}
        />
        {isPassword ? (
          <button type="button" onClick={() => setShown((v) => !v)} aria-label={shown ? '비밀번호 숨기기' : '비밀번호 보기'} className="text-ink-nav">
            {shown ? <EyeIcon width={22} height={22} /> : <EyeOffIcon width={22} height={22} />}
          </button>
        ) : (
          trailing && <span className="text-[14px] font-medium text-primary">{trailing}</span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-[12px] text-ink-muted">{hint}</p>}
    </div>
  )
}
