import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import food from '../assets/food.jpg'
import Dialog from '../components/Dialog'
import { BellIcon, ChevronRightIcon, FridgeIcon, WarningIcon } from '../components/Icons'
import { useToast } from '../components/toastContext'
import { ingredients, recipes, todayRecipeIds } from '../data/mock'
import { isExpiringSoon, remainingLabel } from '../lib/dday'
import { hasSeen, markSeen } from '../lib/session'

const POPUP_KEY = 'mynaengi.fridgeLinkPopup'

// 화면 6·7: 홈. 6은 7 위에 "냉장고 연동하기" 팝업이 뜬 모습이다.
// 오픈 이슈(기획서 F3): 팝업을 다시 띄우는 주기 → 가정: 브라우저 세션당 한 번.
// 오픈 이슈(F3-06): 알림 종 아이콘의 이동 화면 → 가정: "곧 지원 예정" 안내.
export default function Home() {
  const navigate = useNavigate()
  const toast = useToast()
  const [popup, setPopup] = useState(() => !hasSeen(POPUP_KEY))

  const closePopup = () => {
    markSeen(POPUP_KEY)
    setPopup(false)
  }

  const expiring = ingredients.filter((i) => isExpiringSoon(i.daysLeft)).sort((a, b) => a.daysLeft - b.daysLeft)
  const today = todayRecipeIds.map((id) => recipes.find((r) => r.id === id)).filter((r) => r !== undefined)

  return (
    <div className="px-[22px] pb-10">
      <header className="flex h-[50px] items-center justify-between px-[3px] pt-6">
        <span className="text-[26px] font-extrabold text-primary">마냉이</span>
        <button type="button" onClick={toast.comingSoon} aria-label="알림" className="mr-[-1px] p-1">
          <BellIcon width={26} height={26} />
        </button>
      </header>

      <h1 className="mt-[38px] px-[3px] text-[25px] font-bold leading-8">
        안녕하세요!
        <br />
        오늘도 마냉이와 함께
        <br />
        맛있는 하루 보내세요!
      </h1>

      <Link to="/fridge/status" className="mt-6 flex items-center gap-4 rounded-2xl border border-line px-[17px] py-[17px]">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-tint text-primary">
          <FridgeIcon width={26} height={26} />
        </span>
        <span className="flex-1">
          <span className="block text-[17px] font-bold">냉장고 현황</span>
          <span className="block text-[14px] text-ink-muted">총 {ingredients.length}가지 식재료</span>
        </span>
        <ChevronRightIcon width={20} height={20} className="text-ink-nav" />
      </Link>

      <section aria-label="유통기한 임박" className="mt-[25px] overflow-hidden rounded-2xl border border-danger/15">
        <div className="flex items-center gap-3 bg-danger-tint px-[17px] py-3 text-danger">
          <WarningIcon width={24} height={24} />
          <span className="flex-1">
            <span className="block text-[17px] font-bold leading-[22px]">유통기한 임박</span>
            <span className="block text-[13px] leading-[18px]">3일 이내</span>
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-danger text-[14px] font-bold text-white">{expiring.length}</span>
        </div>
        {expiring.length === 0 ? (
          <p className="py-8 text-center text-[14px] text-ink-muted">임박한 재료가 없어요</p>
        ) : (
          <ul className="grid grid-cols-3 px-2 pb-[14px] pt-[15px]">
            {expiring.slice(0, 3).map((i) => (
              <li key={i.id} className="flex flex-col items-center">
                <span className="flex h-[55px] w-[55px] items-center justify-center rounded-2xl bg-primary-tint text-[22px] font-bold text-primary-dark">
                  {i.name.charAt(0)}
                </span>
                <span className="mt-1.5 text-[15px] leading-[22px]">{i.name}</span>
                <span className="mt-1 text-[13px] font-bold leading-5 text-danger">{remainingLabel(i.daysLeft)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-[22px] flex items-center justify-between px-[3px]">
        <h2 className="text-[20px] font-bold">오늘의 추천</h2>
        <Link to="/recommend" className="text-[14px] text-ink-muted">
          더보기 &gt;
        </Link>
      </div>
      <ul className="mt-[9px] grid grid-cols-2 gap-[13px]">
        {today.map((r) => (
          <li key={r.id}>
            <Link to={`/recommend/${r.id}`} className="block overflow-hidden rounded-2xl border border-line">
              <img src={food} alt="" className="h-[105px] w-full object-cover" />
              <span className="block px-3.5 pb-[13px] pt-[3px]">
                <span className="block truncate text-[16px] font-bold leading-5">{r.name}</span>
                {/* 홈 카드는 두 카드 모두 "보유 재료로 가능"(시안 7). 임박 사유 문구는 추천 탭에서만 쓴다. */}
                <span className="mt-px block text-[13px] leading-[18px] text-ink-muted">{r.missing === 0 ? '보유 재료로 가능' : `재료 ${r.missing}개 부족`}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {popup && (
        <Dialog
          icon={
            <span className="flex h-[117px] w-[117px] items-center justify-center rounded-full bg-primary-tint text-primary">
              <FridgeIcon width={56} height={56} strokeWidth={1.6} />
            </span>
          }
          title="냉장고 연동하기"
          description={
            <>
              연동하면 냉장고 속 식재료를
              <br />
              자동으로 관리해 드려요
            </>
          }
          cancelLabel="그만 보기"
          confirmLabel="연동하러 가기"
          onCancel={closePopup}
          onConfirm={() => {
            closePopup()
            navigate('/mypage/fridge-link')
          }}
        />
      )}
    </div>
  )
}
