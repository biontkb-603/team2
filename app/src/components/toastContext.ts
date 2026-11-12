import { createContext, useContext } from 'react'

export type ToastApi = {
  show: (message: string) => void
  /** 이번 범위에서 만들지 않는 기능을 눌렀을 때 쓰는 안내 */
  comingSoon: () => void
}

export const ToastContext = createContext<ToastApi | null>(null)

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast는 ToastProvider 안에서만 쓸 수 있습니다.')
  return ctx
}
