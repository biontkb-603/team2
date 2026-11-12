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

export const ChevronRightIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="m9 5 7 7-7 7" />
  </Base>
)

export const EyeIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Base>
)

export const EyeOffIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M2.5 12S6 5.5 12 5.5c1.6 0 3 .5 4.2 1.2M21.5 12S18 18.5 12 18.5c-1.6 0-3-.5-4.2-1.2" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    <path d="M4 4l16 16" />
  </Base>
)

export const GlobeIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.6 2.4 4 5.5 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.5-4-9s1.4-6.6 4-9Z" />
  </Base>
)

export const LockIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.2" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </Base>
)

export const BellIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15L6 16.5Z" />
    <path d="M10 21h4" />
  </Base>
)

export const WarningIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
    <path d="M12 10v4.5M12 17.4v.1" />
  </Base>
)

export const SearchIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Base>
)

export const PlusIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
)

export const MinusIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M5 12h14" />
  </Base>
)

export const CameraIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.3-2h6l1.3 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9Z" />
    <circle cx="12" cy="13" r="3.4" />
  </Base>
)

export const BowlIcon = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M3.5 12.5h17a8.5 8.5 0 0 1-8.5 8 8.5 8.5 0 0 1-8.5-8Z" />
    <path d="M8.5 4.5c-.8 1.2.8 2.2 0 3.4M12 3.5c-.8 1.2.8 2.2 0 3.4M15.5 4.5c-.8 1.2.8 2.2 0 3.4" />
  </Base>
)
