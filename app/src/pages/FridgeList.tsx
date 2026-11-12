import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import DdayBadge from '../components/DdayBadge'
import { PlusIcon, SearchIcon } from '../components/Icons'
import ListRow from '../components/ListRow'
import { useToast } from '../components/toastContext'
import TopBar from '../components/TopBar'
import { ingredients } from '../data/mock'
import { ddayInfo } from '../lib/dday'
import type { StoragePlace } from '../types'

type Filter = '전체' | StoragePlace
const FILTERS: Filter[] = ['전체', '냉장', '냉동', '실온']

// 화면 9: 식재료 목록(냉장고 탭). 목록 순서는 시안 그대로다(정렬 기준은 오픈 이슈).
// 이름 검색은 이번 범위 밖이라 아이콘만 두고 "곧 지원 예정"을 띄운다(개발계획: 필터는 보관 위치 탭만).
export default function FridgeList() {
  const navigate = useNavigate()
  const toast = useToast()
  const [filter, setFilter] = useState<Filter>('전체')

  const countOf = (f: Filter) => (f === '전체' ? ingredients.length : ingredients.filter((i) => i.place === f).length)
  const rows = filter === '전체' ? ingredients : ingredients.filter((i) => i.place === filter)

  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        title="냉장고"
        back="/fridge/status"
        right={
          <button type="button" onClick={toast.comingSoon} aria-label="식재료 검색" className="p-2">
            <SearchIcon width={24} height={24} />
          </button>
        }
      />

      <div className="flex gap-2 px-[21px]" role="group" aria-label="보관 위치">
        {FILTERS.map((f) => {
          const selected = f === filter
          return (
            <button
              key={f}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(f)}
              className={`h-[42px] rounded-full px-4 text-[15px] ${selected ? 'bg-primary font-bold text-white' : 'border border-line bg-white font-medium text-ink-muted'}`}
            >
              {f} {countOf(f)}
            </button>
          )
        })}
      </div>

      {rows.length === 0 ? (
        <p className="py-16 text-center text-[15px] text-ink-muted">등록된 식재료가 없어요. 아래 버튼으로 추가해 보세요.</p>
      ) : (
        <ul className="mt-[13px] space-y-[11.4px] px-[21px]">
          {rows.map((i) => {
            const d = ddayInfo(i.daysLeft)
            return (
              <li key={i.id}>
                <ListRow title={i.name} subtitle={`${i.amount}${i.unit} · ${i.place}`} trailing={<DdayBadge tone={d.tone} label={d.label} />} />
              </li>
            )
          })}
        </ul>
      )}

      {/* 스크롤해도 하단에 떠 있고, 끝까지 내리면 마지막 행 아래에 놓여 행을 가리지 않는다. */}
      <div className="sticky bottom-3 mb-3 mt-auto px-[21px] pt-4">
        <Button full className="h-[55px]! shadow-[0_4px_10px_rgba(12,123,117,0.18)]" onClick={() => navigate('/fridge/add')}>
          <PlusIcon width={20} height={20} className="mr-1.5" />
          식재료 추가
        </Button>
      </div>
    </div>
  )
}
