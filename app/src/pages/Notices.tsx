import { useState } from 'react'
import { ChevronDownIcon } from '../components/Icons'
import TopBar from '../components/TopBar'
import { notices } from '../data/mock'

// 화면 23: 공지사항. 행을 누르면 본문이 펼쳐지고(펼친 모습은 시안에 없어 단순하게 구성), 다시 누르면 접힌다.
export default function Notices() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="pb-6">
      <TopBar title="공지사항" back="/mypage" />

      {notices.length === 0 ? (
        <p className="py-20 text-center text-[15px] text-ink-muted">등록된 공지사항이 없어요.</p>
      ) : (
        <ul className="space-y-3 px-[21px]">
          {notices.map((n) => {
            const open = openId === n.id
            return (
              <li key={n.id} className="rounded-2xl border border-line bg-white">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : n.id)}
                  className="flex w-full items-center justify-between gap-3 px-[17px] py-[17px] text-left"
                >
                  <span className="min-w-0">
                    {n.isNew && <span className="flex h-[22px] w-fit items-center rounded-full bg-primary-tint px-2.5 text-[11.5px] font-bold text-primary-dark">NEW</span>}
                    <span className="mt-[3px] block text-[18px] font-bold leading-[27px]">{n.title}</span>
                    <span className="mt-[3px] block text-[14px] leading-[21px] text-ink-muted">{n.date}</span>
                  </span>
                  <ChevronDownIcon width={22} height={22} className={`shrink-0 text-ink-nav transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && <p className="border-t border-line/70 px-[17px] py-4 text-[15px] leading-6 text-ink-muted">{n.body}</p>}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
