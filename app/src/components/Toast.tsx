import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ToastContext, type ToastApi } from './toastContext'

const COMING_SOON = '곧 지원 예정이에요'
const DURATION_MS = 2000

// 프레임(Layout) 안에서 화면 아래쪽에 잠깐 뜨는 안내. 위치는 가장 가까운 relative 부모 기준이다.
export default function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const show = useCallback((text: string) => {
    clearTimeout(timer.current)
    setMessage(text)
    timer.current = setTimeout(() => setMessage(null), DURATION_MS)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  const api = useMemo<ToastApi>(() => ({ show, comingSoon: () => show(COMING_SOON) }), [show])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div role="status" aria-live="polite" className="pointer-events-none absolute inset-x-0 bottom-24 z-50 flex justify-center px-6">
        {message && <div className="rounded-full bg-ink/90 px-5 py-3 text-[14px] font-medium text-white shadow-lg">{message}</div>}
      </div>
    </ToastContext.Provider>
  )
}
