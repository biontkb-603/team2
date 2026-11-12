import { Outlet, useMatches } from 'react-router-dom'
import TabBar from './TabBar'

// 모바일 프레임: 폭 360~430px, 데스크톱에서는 가운데에 세로로 꽉 찬 프레임으로 보인다.
// 본문만 스크롤된다. 하단 탭은 라우트의 handle.tab이 true인 화면에서만 보인다(screens.ts).
export default function Layout() {
  const showTab = useMatches().some((m) => (m.handle as { tab?: boolean } | undefined)?.tab)

  return (
    <div className="mx-auto flex h-dvh w-full min-w-[360px] max-w-[430px] flex-col bg-white shadow-sm">
      <main className="min-h-0 flex-1 overflow-y-auto">
        <Outlet />
      </main>
      {showTab && <TabBar />}
    </div>
  )
}
