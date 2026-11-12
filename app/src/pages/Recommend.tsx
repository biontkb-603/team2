import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BowlIcon, HeartIcon, SearchIcon } from '../components/Icons'
import RecipeBadge from '../components/RecipeBadge'
import { useToast } from '../components/toastContext'
import TopBar from '../components/TopBar'
import { favoriteRecipeIds, nowRecipeIds, recipes, todayRecipeIds } from '../data/mock'
import type { Recipe } from '../types'

type Filter = '전체' | '보유 재료로 가능' | '유통기한 임박 재료'
const FILTERS: Filter[] = ['전체', '보유 재료로 가능', '유통기한 임박 재료']

const pick = (ids: string[]) => ids.map((id) => recipes.find((r) => r.id === id)).filter((r) => r !== undefined)
const matches = (r: Recipe, f: Filter) => (f === '보유 재료로 가능' ? r.missing === 0 : f === '유통기한 임박 재료' ? r.usesExpiring : true)

// 화면 12: 요리 추천. 필터와 하트는 mock 데이터로 화면 안에서만 동작한다(찜 저장은 F-12, 추천 계산은 F-11).
export default function Recommend() {
  const toast = useToast()
  const [filter, setFilter] = useState<Filter>('전체')
  const [favs, setFavs] = useState(() => new Set(favoriteRecipeIds))

  const toggleFav = (id: string) =>
    setFavs((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })

  const today = pick(todayRecipeIds).filter((r) => matches(r, filter))
  const now = pick(nowRecipeIds).filter((r) => matches(r, filter))

  return (
    <div className="pb-6">
      <TopBar
        title="요리 추천"
        right={
          <button type="button" onClick={toast.comingSoon} aria-label="레시피 검색" className="p-2">
            <SearchIcon width={24} height={24} />
          </button>
        }
      />

      <div className="flex gap-2 px-[21px]" role="group" aria-label="추천 종류">
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
              {f}
            </button>
          )
        })}
      </div>

      {today.length > 0 && (
        <section aria-label="오늘의 추천">
          <h2 className="mt-4 px-[25px] text-[20px] font-bold leading-7">오늘의 추천</h2>
          <ul className="mt-3 grid grid-cols-2 gap-[13px] px-[21px]">
            {today.map((r) => {
              const fav = favs.has(r.id)
              return (
                <li key={r.id} className="relative">
                  <Link to={`/recommend/${r.id}`} className="block overflow-hidden rounded-2xl border border-line">
                    <span className="flex h-[116px] items-center justify-center bg-primary-tint text-primary">
                      <BowlIcon width={44} height={44} strokeWidth={1.4} />
                    </span>
                    <span className="block px-3.5 pb-3 pt-[9px]">
                      <span className="block truncate text-[17px] font-bold leading-6">{r.name}</span>
                      <span className="block truncate text-[14px] leading-5 text-ink-muted">{r.reason}</span>
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleFav(r.id)}
                    aria-label={fav ? `${r.name} 찜 해제` : `${r.name} 찜하기`}
                    aria-pressed={fav}
                    className="absolute right-2.5 top-3 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white text-primary shadow-sm"
                  >
                    <HeartIcon width={18} height={18} fill={fav ? 'currentColor' : 'none'} />
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {now.length > 0 && (
        <section aria-label="지금 만들기 좋은 요리">
          <h2 className="mt-[22px] px-[25px] text-[20px] font-bold leading-7">지금 만들기 좋은 요리</h2>
          <ul className="mt-3 space-y-[13.5px] px-[21px]">
            {now.map((r) => (
              <li key={r.id}>
                <Link to={`/recommend/${r.id}`} className="flex items-center gap-3.5 rounded-2xl border border-line bg-white px-[15px] py-3">
                  <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-2xl bg-primary-tint text-primary">
                    <BowlIcon width={26} height={26} strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[18px] font-bold leading-[27px]">{r.name}</span>
                    <span className="block truncate text-[14px] leading-[21px] text-ink-muted">
                      {r.minutes}분 · {r.reason}
                    </span>
                  </span>
                  <RecipeBadge missing={r.missing} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {today.length === 0 && now.length === 0 && <p className="py-16 text-center text-[15px] text-ink-muted">조건에 맞는 요리가 없어요.</p>}
    </div>
  )
}
