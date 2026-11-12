// 브라우저 점검 스크립트의 공통 설정. 경로를 이 파일에서만 정한다.
//   E2E_PORT   미리보기 서버 포트 (기본 4173)
//   E2E_BASE   이미 떠 있는 서버를 쓰고 싶을 때 주소 (기본 http://localhost:<포트>)
//   CHROME_PATH 크롬 실행 파일 위치 (기본: 흔한 설치 위치를 차례로 찾음)
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

export const PORT = process.env.E2E_PORT ?? '4173'
export const BASE = process.env.E2E_BASE ?? `http://localhost:${PORT}`

/** 화면 캡처가 저장되는 폴더(git에서 제외됨) */
export const OUT = join(dirname(fileURLToPath(import.meta.url)), '.out')
mkdirSync(OUT, { recursive: true })

const CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
]

function chromePath() {
  const found = process.env.CHROME_PATH ?? CANDIDATES.find((p) => existsSync(p))
  if (!found) throw new Error('크롬을 찾지 못했습니다. CHROME_PATH 환경 변수에 실행 파일 경로를 지정하세요.')
  return found
}

export function launch(options = {}) {
  return puppeteer.launch({ executablePath: chromePath(), headless: true, ...options })
}
