import { useState } from 'react'
import { ChevronRightIcon } from '../components/Icons'
import Switch from '../components/Switch'
import { useToast } from '../components/toastContext'
import TopBar from '../components/TopBar'
import { notificationDefaults } from '../data/mock'

type Key = keyof typeof notificationDefaults

const SECTIONS: { title: string; items: { key: Key; label: string; desc: string }[] }[] = [
  {
    title: '냉장고',
    items: [
      { key: 'expiring', label: '유통기한 임박', desc: '3일 이내로 남은 식재료를 알려 드려요' },
      { key: 'shortage', label: '식재료 부족', desc: '자주 쓰는 식재료가 떨어지면 알려 드려요' },
    ],
  },
  {
    title: '추천 · 장보기',
    items: [
      { key: 'todayRecipe', label: '오늘의 추천 요리', desc: '냉장고 재료로 만들 수 있는 요리를 알려 드려요' },
      { key: 'priceChange', label: '가격 변동', desc: '찜한 식재료 가격이 내리면 알려 드려요' },
    ],
  },
  {
    title: '서비스',
    items: [
      { key: 'notice', label: '공지사항', desc: '중요한 소식을 알려 드려요' },
      { key: 'event', label: '이벤트 · 혜택', desc: '할인과 이벤트 소식을 알려 드려요' },
    ],
  },
]

// 화면 22: 알림 설정. 스위치는 화면 안에서만 바뀐다(저장은 F-14). 전체 알림을 끄면 항목 스위치는 잠기고 꺼진 것처럼 보인다.
// 오픈 이슈(기획서 F10-04): 시안이 잘려 보이지 않는 "알림 시간" 영역은 제목과 한 줄 행만 두고 누르면 "곧 지원 예정"을 띄운다(가정).
export default function Notifications() {
  const toast = useToast()
  const [values, setValues] = useState(notificationDefaults)
  const set = (key: Key, next: boolean) => setValues((v) => ({ ...v, [key]: next }))
  const allOff = !values.all

  return (
    <div className="pb-8">
      <TopBar title="알림 설정" back="/mypage" />

      <div className="px-[21px]">
        <div className="-mb-0.5 flex items-center justify-between rounded-2xl bg-primary-tint px-[17px] py-[18.5px]">
          <div>
            <p className="text-[17px] font-bold leading-[25px] text-primary-dark">전체 알림</p>
            <p className="text-[13px] leading-[19px] text-ink-muted">끄면 모든 알림을 받지 않아요</p>
          </div>
          <Switch label="전체 알림" checked={values.all} onChange={(n) => set('all', n)} />
        </div>

        {SECTIONS.map((sec) => (
          <section key={sec.title} aria-label={sec.title} className="mt-6">
            <h2 className="px-1 text-[16px] font-bold leading-6">{sec.title}</h2>
            <ul className={`mt-3 divide-y divide-line/70 rounded-2xl border border-line ${allOff ? 'opacity-50' : ''}`}>
              {sec.items.map((it) => (
                <li key={it.key} className="flex items-center justify-between gap-3 px-[17px] py-[19.3px]">
                  <div className="min-w-0">
                    <p className="text-[17px] font-medium leading-[25px]">{it.label}</p>
                    <p className="text-[13px] leading-[19px] text-ink-muted">{it.desc}</p>
                  </div>
                  <Switch label={it.label} checked={values[it.key] && !allOff} disabled={allOff} onChange={(n) => set(it.key, n)} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section aria-label="알림 시간" className="mt-6">
          <h2 className="px-1 text-[16px] font-bold leading-6">알림 시간</h2>
          <button
            type="button"
            onClick={toast.comingSoon}
            className={`mt-3 flex w-full items-center justify-between rounded-2xl border border-line px-[17px] py-[19.3px] text-left ${allOff ? 'opacity-50' : ''}`}
          >
            <span className="text-[17px] font-medium">알림 받을 시간</span>
            <span className="flex items-center gap-1 text-[15px] text-ink-muted">
              오전 9:00
              <ChevronRightIcon width={18} height={18} />
            </span>
          </button>
        </section>
      </div>
    </div>
  )
}
