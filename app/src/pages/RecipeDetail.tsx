import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import { BowlIcon, CheckCircleIcon, HeartIcon, WarningIcon } from '../components/Icons'
import { useToast } from '../components/toastContext'
import { favoriteRecipeIds, recipes } from '../data/mock'

type Tab = 'recipe' | 'info'

// 화면 13: 레시피 상세. 오픈 이슈(기획서 F7-06, F7-07)는 가정으로 처리했다:
//  - "재료 정보" 탭: 필요한 재료와 분량을 목록으로 보여 준다(시안에 없음).
//  - [요리 시작하기]: 조리 진행 모드는 이번 범위 밖이라 "곧 지원 예정"을 띄운다.
//  - 재료가 부족하면 배너를 주황색 "재료가 N개 부족해요"로 바꾼다(시안에는 "만들 수 있어요"만 있음).
// 하트는 화면 안에서만 바뀐다(찜 저장은 F-12).
export default function RecipeDetail() {
  const { id } = useParams()
  const toast = useToast()
  const recipe = recipes.find((r) => r.id === id)
  const [fav, setFav] = useState(() => favoriteRecipeIds.includes(id ?? ''))
  const [tab, setTab] = useState<Tab>('recipe')

  if (!recipe) return <Navigate to="/recommend" replace />

  return (
    <div className="flex min-h-full flex-col">
      <div className="relative flex h-[240px] shrink-0 items-center justify-center bg-primary-tint text-primary">
        <BackButton fallback="/recommend" className="absolute left-[15px] top-[15px] h-[46px]! w-[46px]! rounded-full bg-white shadow-sm" />
        <button
          type="button"
          onClick={() => setFav((v) => !v)}
          aria-label={fav ? '찜 해제' : '찜하기'}
          aria-pressed={fav}
          className="absolute right-[15px] top-[15px] flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white shadow-sm"
        >
          <HeartIcon width={22} height={22} fill={fav ? 'currentColor' : 'none'} />
        </button>
        <BowlIcon width={62} height={62} strokeWidth={1.4} />
      </div>

      <div className="px-[21px]">
        <h1 className="mt-[22px] text-[25px] font-bold leading-9">{recipe.name}</h1>
        <ul className="mt-3 flex gap-[9px]">
          {[`${recipe.minutes}분`, recipe.level, `${recipe.servings}인분`].map((t) => (
            <li key={t} className="flex h-7 items-center rounded-full bg-primary-tint px-2.5 text-[13px] font-bold text-primary-dark">
              {t}
            </li>
          ))}
        </ul>

        {recipe.missing === 0 ? (
          <p className="mt-[19px] flex h-[54px] items-center gap-2.5 rounded-xl bg-primary-tint px-4 text-[15px] font-bold text-primary-dark">
            <CheckCircleIcon width={26} height={26} className="text-primary" />
            지금 보유한 재료로 만들 수 있어요
          </p>
        ) : (
          <p className="mt-[19px] flex h-[54px] items-center gap-2.5 rounded-xl bg-warn-tint px-4 text-[15px] font-bold text-warn">
            <WarningIcon width={24} height={24} />
            재료가 {recipe.missing}개 부족해요
          </p>
        )}

        <h2 className="mt-[22px] text-[20px] font-bold leading-7">필요한 재료</h2>
        <ul className="-mx-[3px] mt-3 grid grid-cols-5 gap-y-4">
          {recipe.ingredients.map((i) => (
            <li key={i.name} className="flex min-w-0 flex-col items-center">
              <span className="flex h-[55px] w-[55px] items-center justify-center rounded-2xl bg-primary-tint text-[22px] font-bold text-primary-dark">
                {i.name.charAt(0)}
              </span>
              <span className="mt-[4.5px] text-[14px] leading-[21px]">{i.name}</span>
              <span className="mt-[4.5px] text-[12px] leading-[18px] text-ink-muted">{i.amount}</span>
            </li>
          ))}
        </ul>

        <div role="tablist" className="mt-5 grid grid-cols-2 border-b border-line">
          {(
            [
              ['recipe', '레시피'],
              ['info', '재료 정보'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`h-[52px] text-[17px] ${tab === key ? '-mb-px border-b-2 border-primary font-bold text-primary' : 'font-medium text-ink-muted'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'recipe' ? (
          <ol className="mt-5 space-y-[15.5px] pb-6">
            {recipe.steps.map((step, n) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-primary text-[15px] font-bold text-white">{n + 1}</span>
                <span className="pt-[3px] text-[16px] leading-6">{step}</span>
              </li>
            ))}
          </ol>
        ) : (
          <ul className="mt-5 divide-y divide-line pb-6">
            {recipe.ingredients.map((i) => (
              <li key={i.name} className="flex justify-between py-3.5 text-[16px]">
                <span>{i.name}</span>
                <span className="text-ink-muted">{i.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 스크롤해도 하단에 고정. 본문 끝에서는 마지막 단계 아래에 놓여 가리지 않는다. */}
      <div className="sticky bottom-0 mt-auto border-t border-line/60 bg-white px-[21px] pb-[25px] pt-[13px]">
        <Button full onClick={toast.comingSoon}>
          요리 시작하기
        </Button>
      </div>
    </div>
  )
}
