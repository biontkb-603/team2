// 재료가 충분한지 나타내는 작은 배지. 충분하면 연한 teal, 부족하면 주황.
export default function RecipeBadge({ missing }: { missing: number }) {
  return missing === 0 ? (
    <span className="inline-flex h-[30px] shrink-0 items-center rounded-full bg-primary-tint px-3 text-[13px] font-bold text-primary-dark">재료 충분</span>
  ) : (
    <span className="inline-flex h-[30px] shrink-0 items-center rounded-full bg-warn-tint px-3 text-[13px] font-bold text-warn">재료 {missing}개 부족</span>
  )
}
