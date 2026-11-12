import { useNavigate } from 'react-router-dom'
import Choice from './Choice'

// 식재료 추가 화면 위쪽의 등록 방식 탭(화면 10 직접 입력 / 화면 11 사진으로 등록). 탭을 바꿔도 뒤로 가기는 목록으로 가도록 replace로 이동한다.
export default function AddModeTabs({ current }: { current: 'manual' | 'photo' }) {
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-2 gap-2">
      <Choice selected={current === 'manual'} className="h-[49px]" onClick={() => navigate('/fridge/add', { replace: true })}>
        직접 입력
      </Choice>
      <Choice selected={current === 'photo'} className="h-[49px]" onClick={() => navigate('/fridge/add/photo', { replace: true })}>
        사진으로 등록
      </Choice>
    </div>
  )
}
