// 브라우저 점검 실행기: 빌드 → 미리보기 서버 시작 → 점검 스크립트를 차례로 실행 → 서버 종료.
//   npm run e2e                 전체 (빌드 포함)
//   npm run e2e -- --no-build   이미 빌드되어 있으면 빌드 생략
//   npm run e2e -- home list    이름이 맞는 스크립트만 (e2e/<이름>.mjs)
// 하나라도 실패하면 종료 코드 1. 화면 캡처는 e2e/.out/ 에 저장된다.
import { spawn, spawnSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BASE, PORT } from './lib.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const appDir = join(here, '..')
const args = process.argv.slice(2)
const skipBuild = args.includes('--no-build')
const only = args.filter((a) => !a.startsWith('--'))

const all = readdirSync(here)
  .filter((f) => f.endsWith('.mjs') && !['lib.mjs', 'run.mjs'].includes(f))
  .map((f) => f.replace('.mjs', ''))
  .sort()
const names = only.length ? all.filter((n) => only.includes(n)) : all
if (only.length && names.length !== only.length) {
  console.error(`없는 점검: ${only.filter((n) => !all.includes(n)).join(', ')} (있는 것: ${all.join(', ')})`)
  process.exit(2)
}

if (!skipBuild) {
  console.log('> npm run build')
  const build = spawnSync('npm', ['run', 'build'], { cwd: appDir, stdio: 'inherit', shell: process.platform === 'win32' })
  if (build.status !== 0) process.exit(build.status ?? 1)
}

const server = spawn('npx', ['vite', 'preview', '--port', PORT, '--strictPort'], { cwd: appDir, stdio: 'ignore', shell: process.platform === 'win32' })
const stop = () => server.kill()
process.on('exit', stop)
process.on('SIGINT', () => process.exit(130))

async function waitForServer() {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(BASE)).ok) return
    } catch {
      // 아직 서버가 뜨는 중
    }
    await new Promise((r) => setTimeout(r, 200))
  }
  throw new Error(`미리보기 서버가 ${BASE} 에서 응답하지 않습니다(포트가 이미 쓰이는 중일 수 있음. E2E_PORT로 바꿀 수 있습니다).`)
}

let failed = 0
try {
  await waitForServer()
  for (const name of names) {
    const r = spawnSync(process.execPath, [join(here, `${name}.mjs`)], { cwd: appDir, encoding: 'utf8' })
    const out = `${r.stdout ?? ''}${r.stderr ?? ''}`.trim()
    if (r.status === 0) {
      console.log(`PASS ${name}`)
    } else {
      failed++
      console.log(`FAIL ${name}\n${out.split('\n').map((l) => '     ' + l).join('\n')}`)
    }
  }
} finally {
  stop()
}
console.log(failed ? `\n${failed}/${names.length} 실패` : `\n전체 ${names.length}개 통과`)
process.exit(failed ? 1 : 0)
