// 화면이 만들어지기 전까지 쓰는 임시 화면. 각 U 작업에서 실제 화면으로 교체한다.
export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="px-6 pt-6">
      <h1 className="text-[22px] font-bold">{title}</h1>
      <p className="mt-2 text-sm text-ink-muted">준비 중인 화면입니다.</p>
    </section>
  )
}
