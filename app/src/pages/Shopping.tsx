import { useState } from 'react'
import { CartIcon, SearchIcon } from '../components/Icons'
import { useToast } from '../components/toastContext'
import TopBar from '../components/TopBar'
import { malls } from '../data/mock'
import { mallUrl } from '../lib/malls'

// 화면 14: 장보기. 이번 범위에서는 가격 비교(화면 15)와 장바구니(화면 16)를 만들지 않고,
// 검색어를 넣고 쇼핑몰을 누르면 그 쇼핑몰의 검색 페이지를 새 탭으로 여는 바로가기만 제공한다(개발계획 F8).
// 안내 문구와 아래 버튼은 이 방식에 맞게 바꿨다(시안 차이 기록 참고).
export default function Shopping() {
  const toast = useToast()
  const [keyword, setKeyword] = useState('')

  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        title="장보기"
        right={
          <button type="button" onClick={toast.comingSoon} aria-label="장바구니" className="p-2">
            <CartIcon width={24} height={24} />
          </button>
        }
      />

      <h2 className="-mt-[3px] px-[25px] text-[20px] font-bold leading-7">쇼핑몰 바로가기</h2>
      <ul className="mt-[11px] grid grid-cols-4 gap-2 px-[21px]">
        {malls.map((m) => (
          <li key={m.id}>
            <a
              href={mallUrl(m.id, keyword) ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[91px] flex-col items-center rounded-2xl border border-line bg-white pt-[14px]"
            >
              <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-primary-tint text-[17px] font-bold text-primary-dark">{m.initial}</span>
              <span className="mt-2 text-[12.5px] font-bold leading-[18px]">{m.name}</span>
            </a>
          </li>
        ))}
      </ul>

      <h2 className="mt-[25px] px-[25px] text-[20px] font-bold leading-7">가격 비교</h2>
      <div className="mx-[21px] mt-3 flex h-[53px] items-center gap-3 rounded-2xl border border-line px-5 focus-within:border-primary">
        <SearchIcon width={22} height={22} className="shrink-0 text-ink-nav" />
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-label="재료 이름 검색"
          className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none"
        />
      </div>
      <p className="mt-3 px-[25px] text-[14px] leading-[21px] text-ink-muted">재료 이름을 입력하고 쇼핑몰을 누르면 검색 페이지로 이동해요.</p>

      <div className="sticky bottom-0 mt-auto border-t border-line/60 bg-white px-[21px] pb-2.5 pt-3">
        <button
          type="button"
          aria-disabled="true"
          onClick={toast.comingSoon}
          className="h-[55px] w-full rounded-full bg-disabled text-[17px] font-bold text-placeholder"
        >
          장바구니에 담기
        </button>
      </div>
    </div>
  )
}
