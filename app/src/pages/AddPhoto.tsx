import AddModeTabs from '../components/AddModeTabs'
import Button from '../components/Button'
import { CameraIcon } from '../components/Icons'
import { useToast } from '../components/toastContext'
import TopBar from '../components/TopBar'

// 화면 11: 사진으로 등록. 사진 인식은 이번 범위 밖이라 화면과 버튼만 두고 "곧 지원 예정"을 띄운다.
export default function AddPhoto() {
  const toast = useToast()

  return (
    <div className="flex min-h-full flex-col pb-[29px]">
      <TopBar title="사진으로 등록" back="/fridge" />
      <div className="px-[25px]">
        <AddModeTabs current="photo" />
      </div>

      <div className="mx-[25px] mt-6 flex min-h-[260px] flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary-mid/70 bg-primary-faint px-6 text-center">
        <CameraIcon width={60} height={60} className="text-primary" strokeWidth={1.4} />
        <p className="mt-3.5 text-[18px] font-bold leading-7">식재료를 찍어 주세요</p>
        <p className="mt-[11px] text-[15px] leading-[22px] text-ink-muted">
          AI가 사진 속 식재료를 알아보고
          <br />
          이름과 수량을 채워 드려요
        </p>
      </div>

      <div className="mt-[18px] space-y-[17px] px-[25px]">
        <Button full onClick={toast.comingSoon}>
          사진 촬영하기
        </Button>
        <Button full variant="outline" onClick={toast.comingSoon}>
          앨범에서 선택하기
        </Button>
      </div>
    </div>
  )
}
