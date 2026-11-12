import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Dialog from '../components/Dialog'
import { ChevronRightIcon, GearIcon, UserIcon } from '../components/Icons'
import { useToast } from '../components/toastContext'
import TopBar from '../components/TopBar'
import { user } from '../data/mock'

const TASTE_CHIPS = ['나이대', '좋아하는 음식', '싫어하는 음식', '매운 정도']

// 화면 17(+25 로그아웃 팝업): 마이페이지. 내 정보 수정(18)·취향(19)·냉장고 연동(21)·커뮤니티(24)는
// 이번 범위 밖이라 진입점만 두고 "곧 지원 예정"을 띄운다. 설정(톱니) 아이콘의 이동 화면은 기획서 오픈 이슈라 같은 안내를 쓴다.
export default function MyPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const [logout, setLogout] = useState(false)

  const menu: { label: string; to?: string }[] = [
    { label: '찜한 레시피', to: '/mypage/favorites' },
    { label: '냉장고 연동 관리' },
    { label: '알림 설정', to: '/mypage/notifications' },
    { label: '공지사항', to: '/mypage/notices' },
    { label: '커뮤니티' },
  ]
  const rowCls = 'flex h-[58.4px] w-full items-center justify-between px-[18px] text-left text-[17px] font-medium'

  return (
    <div className="pb-8">
      <TopBar
        title="마이페이지"
        right={
          <button type="button" onClick={toast.comingSoon} aria-label="설정" className="p-2">
            <GearIcon width={26} height={26} />
          </button>
        }
      />

      <div className="px-[21px]">
        <button type="button" onClick={toast.comingSoon} className="mt-2 flex w-full items-center gap-4 px-1 text-left">
          <span className="flex h-[63px] w-[63px] shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
            <UserIcon width={30} height={30} />
          </span>
          <span className="flex-1">
            <span className="block text-[20px] font-bold leading-7">{user.name}님</span>
            <span className="block text-[14px] leading-5 text-ink-muted">오늘도 맛있는 하루 보내세요</span>
          </span>
          <ChevronRightIcon width={20} height={20} className="text-ink-nav" />
        </button>

        <button type="button" onClick={toast.comingSoon} className="mt-[22px] block w-full rounded-2xl bg-primary-tint px-[19px] pb-[17px] pt-[19px] text-left">
          <span className="flex items-center justify-between">
            <span className="text-[18px] font-bold leading-[27px] text-primary-dark">내 취향 알려주기</span>
            <ChevronRightIcon width={20} height={20} className="text-primary-dark" />
          </span>
          <span className="mt-3.5 block text-[14.5px] leading-5 text-ink-muted">
            좋아하는 음식, 싫어하는 음식, 나이대를 알려 주시면
            <br className="hidden min-[400px]:inline" /> AI가 나에게 맞는 요리를 추천해 드려요
          </span>
          <span className="mt-[13px] flex flex-wrap gap-x-[5px] gap-y-[3px]">
            {TASTE_CHIPS.map((c) => (
              <span key={c} className="flex h-[30px] items-center rounded-full bg-white px-2.5 text-[13.5px] font-medium text-ink-muted">
                {c}
              </span>
            ))}
          </span>
        </button>

        <ul className="mt-5 divide-y divide-line/70 rounded-2xl border border-line">
          {menu.map((m) => (
            <li key={m.label}>
              {m.to ? (
                <Link to={m.to} className={rowCls}>
                  {m.label}
                  <ChevronRightIcon width={20} height={20} className="text-ink-nav" />
                </Link>
              ) : (
                <button type="button" onClick={toast.comingSoon} className={rowCls}>
                  {m.label}
                  <ChevronRightIcon width={20} height={20} className="text-ink-nav" />
                </button>
              )}
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => setLogout(true)} className="mx-auto mt-[43px] block text-[15px] text-ink-muted">
          로그아웃
        </button>
      </div>

      {logout && (
        <Dialog
          compact
          title="로그아웃을 진행할까요?"
          cancelLabel="취소"
          confirmLabel="예"
          onCancel={() => setLogout(false)}
          onConfirm={() => navigate('/login', { replace: true })}
        />
      )}
    </div>
  )
}
