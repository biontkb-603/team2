import { Outlet } from 'react-router-dom'
import TabBar from './TabBar'

// 모바일 프레임: 폭 360~430px, 데스크톱에서는 가운데에 세로로 꽉 찬 프레임으로 보인다.
// 하단 탭은 프레임 맨 아래에 고정되고 본문만 스크롤된다.
export default function Layout() {
  return (
    <div className="mx-auto flex h-dvh w-full min-w-[360px] max-w-[430px] flex-col bg-white shadow-sm">
      <main className="min-h-0 flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <TabBar />
    </div>
  )
}
