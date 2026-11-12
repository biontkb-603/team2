import type { ComponentType, SVGProps } from 'react'
import { NavLink } from 'react-router-dom'
import { CartIcon, FridgeIcon, HeartIcon, HomeIcon, UserIcon } from './Icons'

type Tab = { to: string; label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }

// 시안 순서: 홈, 냉장고, 추천, 장보기, 마이페이지
const TABS: Tab[] = [
  { to: '/', label: '홈', Icon: HomeIcon },
  { to: '/fridge', label: '냉장고', Icon: FridgeIcon },
  { to: '/recommend', label: '추천', Icon: HeartIcon },
  { to: '/shopping', label: '장보기', Icon: CartIcon },
  { to: '/mypage', label: '마이페이지', Icon: UserIcon },
]

export default function TabBar() {
  return (
    <nav
      aria-label="하단 탭"
      className="flex shrink-0 border-t border-line bg-white pb-[env(safe-area-inset-bottom)]"
    >
      {TABS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          // 하위 화면(예: /fridge/list)에서도 해당 탭이 강조되도록 접두어로 비교한다.
          end={to === '/'}
          className={({ isActive }) =>
            `flex h-[72px] flex-1 flex-col items-center justify-center gap-1 text-[11px] ${
              isActive ? 'font-bold text-primary' : 'text-ink-nav'
            }`
          }
        >
          <Icon />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
