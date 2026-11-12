import TopBar from '../components/TopBar'
import type { Screen } from '../screens'

// 화면이 만들어지기 전까지 쓰는 임시 화면. 각 U 작업에서 실제 화면으로 교체한다.
export default function Placeholder({ screen }: { screen: Screen }) {
  return (
    <>
      <TopBar title={screen.title} back={screen.back} />
      <p className="px-6 text-sm text-ink-muted">시안 화면 {screen.no}번 · 준비 중</p>
    </>
  )
}
