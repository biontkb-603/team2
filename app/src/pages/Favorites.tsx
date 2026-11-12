import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BowlIcon, HeartIcon } from '../components/Icons'
import RecipeBadge from '../components/RecipeBadge'
import TopBar from '../components/TopBar'
import { favoriteRecipeIds, recipes } from '../data/mock'

// 화면 20: 찜한 레시피. 하트를 누르면 이 목록에서 빠지고 개수도 줄어든다(화면 안에서만. 저장은 F-12).
export default function Favorites() {
  const [ids, setIds] = useState(favoriteRecipeIds)
  const list = ids.map((id) => recipes.find((r) => r.id === id)).filter((r) => r !== undefined)

  return (
    <div className="pb-6">
      <TopBar title="찜한 레시피" back="/mypage" />
      <p className="mt-[1.5px] px-[25px] text-[14px] leading-[21px] text-ink-muted">총 {list.length}개</p>

      {list.length === 0 ? (
        <p className="py-20 text-center text-[15px] text-ink-muted">아직 찜한 레시피가 없어요.</p>
      ) : (
        <ul className="mt-[15.5px] space-y-3.5 px-[21px]">
          {list.map((r) => (
            <li key={r.id} className="relative">
              <Link to={`/recommend/${r.id}`} className="block overflow-hidden rounded-2xl border border-line bg-white">
                <span className="flex h-[156px] items-center justify-center bg-primary-tint text-primary">
                  <BowlIcon width={62} height={62} strokeWidth={1.3} />
                </span>
                <span className="block px-[17px] pb-[15px] pt-[15px]">
                  <span className="block text-[20px] font-bold leading-7">{r.name}</span>
                  <span className="mt-1.5 block text-[15px] leading-[22px] text-ink-muted">
                    {r.minutes}분 · {r.reason}
                  </span>
                  <span className="mt-1.5 block">
                    <RecipeBadge missing={r.missing} />
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIds((prev) => prev.filter((x) => x !== r.id))}
                aria-label={`${r.name} 찜 해제`}
                className="absolute right-3 top-[13px] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white text-primary shadow-sm"
              >
                <HeartIcon width={18} height={18} fill="currentColor" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
