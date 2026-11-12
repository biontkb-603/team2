import { Link } from 'react-router-dom'
import { SCREENS } from '../screens'

// 개발용 화면 목록(시안 대조·이동 확인용). 마무리(M) 단계에서 제거한다.
export default function ScreenIndex() {
  return (
    <section className="px-6 py-6">
      <h1 className="text-[22px] font-bold">화면 목록 (개발용)</h1>
      <ul className="mt-4 divide-y divide-line">
        {SCREENS.map((s) => (
          <li key={s.path}>
            <Link to={s.path.replace(':id', 'tuna-mayo')} className="flex items-center gap-3 py-3 text-sm">
              <span className="w-10 font-bold text-primary">{s.no}</span>
              <span className="flex-1">{s.title}</span>
              <span className="text-xs text-ink-muted">{s.tab ? '탭 있음' : '탭 없음'}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/_components" className="mt-6 block text-sm font-bold text-primary">공통 컴포넌트 보기 →</Link>
    </section>
  )
}
