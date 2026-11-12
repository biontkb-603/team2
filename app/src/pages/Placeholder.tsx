import BackButton from '../components/BackButton'
import type { Screen } from '../screens'

// 화면이 만들어지기 전까지 쓰는 임시 화면. 각 U 작업에서 실제 화면으로 교체한다.
export default function Placeholder({ screen }: { screen: Screen }) {
  return (
    <section className="px-4 pt-4">
      <header className="flex items-center gap-1">
        {screen.back && <BackButton fallback={screen.back} className="-ml-2" />}
        <h1 className={`text-[22px] font-bold ${screen.back ? '' : 'pl-2'}`}>{screen.title}</h1>
      </header>
      <p className="mt-3 pl-2 text-sm text-ink-muted">시안 화면 {screen.no}번 · 준비 중</p>
    </section>
  )
}
