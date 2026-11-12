import { launch, BASE } from './lib.mjs'
import { readFileSync } from 'node:fs'
const src = readFileSync(new URL('../src/screens.ts', import.meta.url), 'utf8')
const paths = [...src.matchAll(/path: '([^']+)'/g)].map(m => m[1].replace(':id', 'tuna-mayo')).concat(['/_screens', '/_components'])
const b = await launch()
let fail = 0
for (const [w, h] of [[360, 640], [408, 880]]) {
  const p = await b.newPage(); await p.setViewport({ width: w, height: h })
  for (const path of paths) {
    await p.goto(BASE + path, { waitUntil: 'networkidle0' })
    const bad = await p.evaluate(() => {
      const frame = document.querySelector('main').parentElement.getBoundingClientRect(); const out = []
      for (const e of document.querySelectorAll('main *')) {
        const r = e.getBoundingClientRect(); if (r.width === 0 || r.height === 0) continue
        if (r.right > frame.right + 0.5 || r.left < frame.left - 0.5) out.push(`${e.tagName}.${String(e.className).slice(0, 40)} L${Math.round(r.left)} R${Math.round(r.right)}`)
      }
      return out.slice(0, 3)
    })
    if (bad.length) { fail++; console.log('FAIL', w, path, bad) }
  }
  await p.close()
}
console.log(fail ? fail + ' failures' : 'ALL PASS (all routes, 2 viewport sizes)'); process.exitCode = fail ? 1 : 0; await b.close()
