import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import apple from '../assets/sns-apple.png'
import facebook from '../assets/sns-facebook.png'
import kakao from '../assets/sns-kakao.png'
import naver from '../assets/sns-naver.png'
import Button from '../components/Button'
import { GlobeIcon, LockIcon, UserIcon } from '../components/Icons'
import Input from '../components/Input'
import { useToast } from '../components/toastContext'

const SNS = [
  { name: '카카오톡', src: kakao },
  { name: '네이버', src: naver },
  { name: '페이스북', src: facebook },
  { name: '애플', src: apple },
]

// 화면 1. 로그인·SNS 로그인은 지금은 홈으로 이동만 한다(실제 로그인은 F-05).
export default function Login() {
  const navigate = useNavigate()
  const toast = useToast()
  const goHome = () => navigate('/')

  return (
    <form
      className="flex flex-1 flex-col px-7 pb-8 pt-[17px]"
      onSubmit={(e) => {
        e.preventDefault()
        goHome()
      }}
    >
      <button
        type="button"
        onClick={toast.comingSoon}
        aria-label="언어 설정"
        className="-ml-[11px] flex h-[46px] w-[46px] items-center justify-center rounded-full bg-primary-tint text-ink-nav"
      >
        <GlobeIcon width={22} height={22} />
      </button>

      <img src={logo} alt="마냉이 마이 냉장고" className="mx-auto mt-[34px] h-[248px] w-auto" />

      <div className="mt-[52px] space-y-[17px]">
        <Input variant="filled" leading={<UserIcon width={22} height={22} />} placeholder="아이디를 입력해주세요" autoComplete="username" aria-label="아이디" />
        <Input variant="filled" type="password" leading={<LockIcon width={22} height={22} />} placeholder="비밀번호를 입력해주세요" autoComplete="current-password" aria-label="비밀번호" />
      </div>

      <Button type="submit" full className="mt-5">
        로그인
      </Button>

      <div className="mt-[18px] flex items-center justify-center text-[14px] text-ink-muted">
        <button type="button" onClick={toast.comingSoon} className="px-3.5">
          아이디 찾기
        </button>
        <span className="h-3.5 w-px bg-line" aria-hidden="true" />
        <button type="button" onClick={toast.comingSoon} className="px-3.5">
          비밀번호 찾기
        </button>
        <span className="h-3.5 w-px bg-line" aria-hidden="true" />
        <Link to="/signup" className="px-3.5">
          회원가입
        </Link>
      </div>

      <p className="mt-[35px] text-center text-[14px] text-placeholder">SNS 간편 로그인</p>
      <div className="mt-4 flex justify-center gap-[17px]">
        {SNS.map((s) => (
          <button key={s.name} type="button" onClick={goHome} aria-label={`${s.name}로 로그인`}>
            <img src={s.src} alt="" className="h-[58px] w-[58px]" />
          </button>
        ))}
      </div>
    </form>
  )
}
