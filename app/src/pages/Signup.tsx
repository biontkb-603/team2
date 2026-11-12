import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import SignupShell from '../components/SignupShell'

// 화면 2·3 (같은 폼의 빈 상태/입력한 상태). 지금은 입력과 이동만 되고,
// 인증번호 발송·카운트다운·검증은 F-05에서 만든다. 타이머는 03:00 고정 표시.
export default function Signup() {
  const navigate = useNavigate()
  const genderRef = useRef<HTMLInputElement>(null)

  return (
    <SignupShell back="/login" submitLabel="다음" onSubmit={() => navigate('/signup/account')}>
      <Input label="이름" size="lg" autoComplete="name" />

      <div className="flex items-end gap-2.5">
        <Input label="전화번호" size="lg" type="tel" inputMode="numeric" autoComplete="tel" className="min-w-0 flex-1" />
        <Button size="md" className="mb-0.5 w-[120px] px-0">
          인증번호 받기
        </Button>
      </div>

      <div>
        <label htmlFor="birth" className="mb-2 block text-[14px] font-medium text-ink-muted">
          생년월일
        </label>
        <div className="flex h-14 items-center rounded-xl border border-line bg-white pl-6 pr-4 focus-within:border-primary">
          <input
            id="birth"
            inputMode="numeric"
            maxLength={6}
            aria-label="생년월일 6자리"
            onChange={(e) => e.target.value.length === 6 && genderRef.current?.focus()}
            className="h-full w-[100px] min-w-0 bg-transparent text-[20px] outline-none"
          />
          <span className="w-4 text-center text-ink-nav" aria-hidden="true">
            -
          </span>
          <input
            ref={genderRef}
            inputMode="numeric"
            maxLength={1}
            aria-label="주민번호 뒷자리 첫 자리"
            className="ml-[13px] h-full w-5 bg-transparent text-[20px] outline-none"
          />
          <span className="ml-[5px] text-[14px] tracking-[0.4em] text-placeholder" aria-hidden="true">
            ******
          </span>
        </div>
      </div>

      <div className="flex items-end gap-2.5">
        <Input label="인증번호" size="lg" inputMode="numeric" maxLength={6} trailing="03:00" className="min-w-0 flex-1" />
        <Button size="md" variant="tint" className="mb-0.5 w-[70px] px-0">
          확인
        </Button>
      </div>
    </SignupShell>
  )
}
