import Button from '../components/Button'
import DdayBadge from '../components/DdayBadge'
import Input from '../components/Input'
import ListRow from '../components/ListRow'
import { ChevronRightIcon, UserIcon } from '../components/Icons'
import { useToast } from '../components/toastContext'
import TopBar from '../components/TopBar'

// 개발용 공통 컴포넌트 모음(눈으로 확인용). 마무리(M) 단계에서 제거한다.
export default function ComponentShowcase() {
  const toast = useToast()
  return (
    <>
      <TopBar title="컴포넌트 (개발용)" back="/_screens" right={<button type="button" onClick={toast.comingSoon} className="p-2">🔔</button>} />
      <div className="space-y-6 px-6 pb-10">
        <section className="space-y-3">
          <h2 className="font-bold">버튼</h2>
          <Button full>로그인</Button>
          <Button full disabled>장바구니에 담기</Button>
          <Button full variant="outline">앨범에서 선택하기</Button>
          <div className="flex gap-2">
            <Button size="md" className="flex-1">인증번호 받기</Button>
            <Button size="md" variant="tint">확인</Button>
          </div>
          <Button variant="tint" onClick={toast.comingSoon}>토스트 띄우기</Button>
        </section>
        <section className="space-y-3">
          <h2 className="font-bold">입력창</h2>
          <Input label="이름" />
          <Input label="인증번호" defaultValue="362616" trailing="03:00" />
          <Input variant="filled" leading={<UserIcon width={22} height={22} />} placeholder="아이디를 입력해주세요" />
          <Input variant="filled" type="password" placeholder="비밀번호를 입력해주세요" />
          <Input label="아이디" disabled defaultValue="mynaengi_user" hint="아이디는 바꿀 수 없어요" />
        </section>
        <section className="space-y-3">
          <h2 className="font-bold">D-day 배지</h2>
          <div className="flex flex-wrap gap-2">
            <DdayBadge tone="danger" label="D-1" />
            <DdayBadge tone="ok" label="D-12" />
            <DdayBadge tone="danger" label="오늘까지" />
            <DdayBadge tone="expired" label="기한 지남" />
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="font-bold">목록 행</h2>
          <ListRow title="대파" subtitle="1단 · 냉장" trailing={<DdayBadge tone="danger" label="D-1" />} />
          <ListRow title="김치" subtitle="500g · 냉장" trailing={<DdayBadge tone="ok" label="D-30" />} />
          <ListRow title="찜한 레시피" leading={<span />} trailing={<ChevronRightIcon width={20} height={20} />} onClick={toast.comingSoon} />
        </section>
      </div>
    </>
  )
}
