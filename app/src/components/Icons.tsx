import type { SVGProps } from 'react'

// 시안의 하단 탭 아이콘: 두께가 같은 선 아이콘(stroke). 색은 부모의 text 색을 따른다.
function Base(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  )
}

export const HomeIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M3.5 11 12 3.8 20.5 11" />
    <path d="M5.5 9.8V20h13V9.8" />
    <path d="M10 20v-5.5h4V20" />
  </Base>
)

export const FridgeIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="6" y="2.8" width="12" height="18.4" rx="2.4" />
    <path d="M6 10.5h12" />
    <path d="M9.5 6v1.8M9.5 13v2.6" />
  </Base>
)

export const HeartIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M12 20.2S3.6 15 3.6 9.1A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8.4 1.9C20.4 15 12 20.2 12 20.2Z" />
  </Base>
)

export const CartIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M2.8 3.8h2.6l2.1 11.2h10.2l2-8.2H6.2" />
    <circle cx="9.3" cy="19.4" r="1.2" />
    <circle cx="16.6" cy="19.4" r="1.2" />
  </Base>
)

export const UserIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c.8-4 3.7-6 7.5-6s6.7 2 7.5 6" />
  </Base>
)
