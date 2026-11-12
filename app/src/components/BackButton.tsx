import { useLocation, useNavigate } from 'react-router-dom'

// 좌상단 "<". 앱 안에서 온 화면이면 이전 화면으로, 주소로 바로 연 화면이면 fallback 경로로 간다.
export default function BackButton({ fallback, className = '' }: { fallback: string; className?: string }) {
  const navigate = useNavigate()
  const { key } = useLocation()

  const goBack = () => {
    if (key === 'default') navigate(fallback, { replace: true })
    else navigate(-1)
  }

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="뒤로 가기"
      className={`flex h-10 w-10 items-center justify-center text-ink ${className}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m15 5-7 7 7 7" />
      </svg>
    </button>
  )
}
