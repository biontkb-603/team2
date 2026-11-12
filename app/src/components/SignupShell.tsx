import type { FormEventHandler, ReactNode } from 'react'
import BackButton from './BackButton'
import Button from './Button'

type Props = {
  back: string
  /** 하단 고정 버튼 문구 ("다음", "완료하기") */
  submitLabel: string
  onSubmit: () => void
  children: ReactNode
}

// 회원가입 화면(2~5) 공통 틀: "<", 큰 제목+teal 밑줄, 입력 영역, 하단 고정 버튼.
export default function SignupShell({ back, submitLabel, onSubmit, children }: Props) {
  const handle: FormEventHandler = (e) => {
    e.preventDefault()
    onSubmit()
  }
  return (
    <form onSubmit={handle} className="flex flex-1 flex-col px-6 pb-[34px] pt-6">
      <BackButton fallback={back} className="-ml-2" />
      <h1 className="mt-[27px] text-[28px] font-bold leading-9">회원가입</h1>
      <div className="mt-3.5 h-1 w-[42px] rounded-full bg-primary" aria-hidden="true" />
      <div className="mt-[27px] space-y-[23px]">{children}</div>
      <div className="mt-auto pt-10">
        <Button type="submit" full>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
