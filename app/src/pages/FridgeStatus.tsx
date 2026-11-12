import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TopBar from '../components/TopBar'
import { ingredients } from '../data/mock'
import { EXPIRING_DAYS, isExpiringSoon } from '../lib/dday'
import type { StoragePlace } from '../types'

// 막대와 범례가 같은 색을 쓰도록 한 곳에 둔다(시안 8: 냉장 진한 teal, 냉동 중간, 실온 연한).
const PLACES: { place: StoragePlace; dot: string }[] = [
  { place: '냉장', dot: 'bg-primary' },
  { place: '냉동', dot: 'bg-primary-mid' },
  { place: '실온', dot: 'bg-primary-light' },
]

// 화면 8: 냉장고 현황. 홈의 "냉장고 현황" 카드에서 들어오고, 탭 바는 없다.
export default function FridgeStatus() {
  const navigate = useNavigate()
  const total = ingredients.length
  const soon = ingredients.filter((i) => isExpiringSoon(i.daysLeft)).length

  return (
    <div className="flex flex-1 flex-col">
      <TopBar title="냉장고 현황" back="/" />

      <div className="space-y-5 px-[22px]">
        <section className="mt-1 rounded-2xl bg-primary-tint px-5 pb-[23px] pt-[22px]">
          <p className="text-[14px] text-ink-muted">지금 냉장고에 있는 식재료</p>
          <p className="mt-2 text-[34px] font-bold leading-[42px] text-primary-dark">{total}가지</p>
        </section>

        <section className="rounded-2xl border border-line px-[21px] pb-[11px] pt-[19px]">
          <h2 className="text-[17px] font-bold">보관 위치별</h2>
          <div className="mt-[14px] flex h-3.5 overflow-hidden rounded-full bg-disabled" role="img" aria-label="보관 위치별 개수 비율">
            {PLACES.map(({ place, dot }) => {
              const count = ingredients.filter((i) => i.place === place).length
              return count > 0 && <span key={place} className={dot} style={{ flexGrow: count }} />
            })}
          </div>
          <ul className="mt-[11px]">
            {PLACES.map(({ place, dot }) => (
              <li key={place} className="flex items-center gap-2.5 py-[3.5px] text-[15px]">
                <span className={`h-2.5 w-2.5 rounded-full ${dot}`} aria-hidden="true" />
                <span className="flex-1">{place}</span>
                <span className="font-bold">{ingredients.filter((i) => i.place === place).length}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-line px-[21px] pb-4 pt-[19px]">
          <h2 className="text-[17px] font-bold">유통기한</h2>
          <div className="mt-[11.5px] grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-danger-tint px-4 pb-[15px] pt-[14.5px]">
              <p className="text-[13px] leading-[19px] text-danger">{EXPIRING_DAYS}일 이내 임박</p>
              <p className="mt-[1.5px] text-[26px] font-bold leading-8 text-danger">{soon}개</p>
            </div>
            <div className="rounded-xl bg-primary-tint px-4 pb-[15px] pt-[14.5px]">
              <p className="text-[13px] leading-[19px] text-ink-muted">여유 있음</p>
              <p className="mt-[1.5px] text-[26px] font-bold leading-8 text-primary-dark">{total - soon}개</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-auto px-[21px] pb-[34px] pt-8">
        <Button full onClick={() => navigate('/fridge')}>
          식재료 목록 보기
        </Button>
      </div>
    </div>
  )
}
