// 글꼴(Pretendard)이 실제로 불러와졌는지 확인한다. (CSS @import 순서 문제로 한 번 적용이 안 된 적이 있다.)
import { BASE, launch } from './lib.mjs'

const b = await launch()
const p = await b.newPage()
await p.goto(BASE + '/signup', { waitUntil: 'networkidle0' })
const loaded = await p.evaluate(async () => {
  await document.fonts.ready
  return [...document.fonts].some((f) => f.family.includes('Pretendard') && f.status === 'loaded')
})
console.log(loaded ? 'ALL PASS' : 'FAIL Pretendard가 불러와지지 않았습니다')
process.exitCode = loaded ? 0 : 1
await b.close()
