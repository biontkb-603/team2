import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddModeTabs from '../components/AddModeTabs'
import Button from '../components/Button'
import Choice from '../components/Choice'
import { MinusIcon, PlusIcon } from '../components/Icons'
import Input from '../components/Input'
import TopBar from '../components/TopBar'
import type { StoragePlace } from '../types'

const PLACES: StoragePlace[] = ['냉장', '냉동', '실온']
const UNITS = ['개', '팩', 'g']

// 화면 10: 식재료 추가 — 직접 입력. 기본값은 냉장·수량 1·단위 개(기획서 F5-01).
// 지금은 입력과 이동만 되고, 목록에 실제로 추가하는 것은 F-08에서 만든다.
export default function AddIngredient() {
  const navigate = useNavigate()
  const [place, setPlace] = useState<StoragePlace>('냉장')
  const [amount, setAmount] = useState(1)
  const [unit, setUnit] = useState('개')

  return (
    <form
      className="flex min-h-full flex-col"
      onSubmit={(e) => {
        e.preventDefault()
        navigate('/fridge')
      }}
    >
      <TopBar title="식재료 추가" back="/fridge" />

      <div className="px-[25px]">
        <AddModeTabs current="manual" />
      </div>

      <div className="mt-[18.5px] space-y-[25px] px-[25px] pb-6">
        <Input label="식재료 이름" autoComplete="off" />

        <div>
          <p className="mb-2 text-[14px] font-medium text-ink-muted">보관 위치</p>
          <div className="grid grid-cols-3 gap-[9px]">
            {PLACES.map((p) => (
              <Choice key={p} selected={p === place} className="h-[50px]" onClick={() => setPlace(p)}>
                {p}
              </Choice>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[14px] font-medium text-ink-muted">수량</p>
          <div className="flex gap-3">
            <div className="flex h-[55px] w-[182px] items-center justify-between rounded-xl border border-line px-5">
              <button type="button" aria-label="수량 줄이기" onClick={() => setAmount((n) => Math.max(1, n - 1))} className="text-primary">
                <MinusIcon width={22} height={22} />
              </button>
              <span className="text-[20px] font-bold" aria-live="polite">
                {amount}
              </span>
              <button type="button" aria-label="수량 늘리기" onClick={() => setAmount((n) => n + 1)} className="text-primary">
                <PlusIcon width={22} height={22} />
              </button>
            </div>
            <div className="flex gap-[7px]">
              {UNITS.map((u) => (
                <Choice key={u} selected={u === unit} className="h-[55px] w-[49px] px-0 text-[14px]!" onClick={() => setUnit(u)}>
                  {u}
                </Choice>
              ))}
            </div>
          </div>
        </div>

        <Input label="유통기한" type="date" />
      </div>

      <div className="sticky bottom-0 mt-auto border-t border-line/60 bg-white px-[25px] pb-[29px] pt-[13px]">
        <Button type="submit" full>
          추가하기
        </Button>
      </div>
    </form>
  )
}
