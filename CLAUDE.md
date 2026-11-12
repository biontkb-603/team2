# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

**마냉이 (My Fridge)**, a Korean-language mobile-width web app. Preparation (T0) and the UI phase (U-01 to U-25, screens built from fixed mock data) are done; the feature phase (F-01 to F-18: storage, D-day calculation, recommendation, auth) has not started, so every screen still reads `app/src/data/mock.ts`. Progress and the next task are tracked in `task.md`. Git remote is `origin` (GitHub, `biontkb-603/team2`), default branch `main`.

The app manages fridge ingredients and expiry dates, recommends recipes based on owned ingredients, and connects missing ingredients to price comparison across 4 shopping malls.

## Commands

Run from `app/` (Node 24, npm 11):

```
npm install        # first time only
npm run dev        # dev server (Vite)
npm run build      # tsc -b && vite build
npm run lint       # oxlint
npm test           # vitest run (single file: npx vitest run src/lib/<name>.test.ts)
```

## Architecture

- Stack: Vite 8, React 19, TypeScript, Tailwind CSS 4 (`@tailwindcss/vite`), React Router 7, Vitest. No state library, no server; data is seed JSON plus browser storage behind one `storage` module (not written yet).
- `app/src/index.css`: Tailwind `@theme` is the only place colors and fonts are defined. Values come from `design/tokens.md`; use the token names (`bg-primary`, `text-danger`, ...), not raw hex. The Pretendard font is loaded by a `<link>` in `index.html` (a CSS `@import` placed after Tailwind's is silently ignored).
- `app/src/screens.ts`: the mockup-screen to route table (path, title, whether the bottom tab bar shows, where "<" goes when a screen is opened directly). `App.tsx` builds the router from it and maps finished screens in its `PAGES` table; screens not in `PAGES` render `Placeholder`. `components/Layout.tsx` is the mobile frame (max 430px) and shows the tab bar from each route's `handle.tab`.
- `app/src/pages` (one file per screen), `components` (shared UI: `TopBar`, `Button`, `Input`, `ListRow`, `DdayBadge`, `Dialog`, `Switch`, `Toast` with `useToast().comingSoon()`, ...), `data/mock.ts` (sample data copied from the mockups, marked "시안에 없음" where invented), `lib` (pure functions with unit tests: `dday.ts`, `malls.ts`), `types.ts`.
- "안내만" rule: features outside the minimal scope keep their entry point (button or menu row) as in the mockup and show the "곧 지원 예정" toast when tapped, but their screen is not built and has no route (mockup screens 15, 16, 18, 19, 21, 24). Screen 11 is built only because its entry is a tab inside screen 10.
- Dev-only pages `/_screens` (screen list) and `/_components` (component showcase) exist for checking the UI; remove them in the final polish step (M).
- Tests: only pure functions (D-day rules, mall URLs, mock-data consistency with the mockup numbers) are unit-tested. Screens are checked by hand against `design/screen-NN.png`; when comparing, capture at 408x880 and also check 360x640 for anything running outside the frame.

## Git workflow

- Work on a branch per task group, not on `main`: `feat/<task-id>-<short-name>` (e.g. `feat/U-05-login`), `docs/...` for documents, `fix/...` for fixes. Merge to `main` through a PR.
- One commit per finished task ID. Message format: `U-05: 로그인 화면 구현` (task ID, colon, short Korean summary).
- Commit `task.md` updates together with the work they describe.
- Do not commit or push unless asked. Do not commit `node_modules` or `dist` (covered by `app/.gitignore`).

## Source documents

- `마냉이 1차.pdf`: 25 UI screen mockups (the "마냉이 회원가입" screen set). It is the source of truth for what the screens show.
- `마냉이_기능별_기획서.pdf` (dated 2026-11-09): the feature spec built from those 25 screens. It groups them into features F1–F12, and each requirement has an ID (e.g. `F4-06`) linked to screen numbers.

- `마냉이_개발계획.md` (2026-11-10): the development plan. It sets the phased scope (MVP / phase 2 / phase 3), sprint schedule, proposed stack, and the legal and store checklist for launch. Check it before implementing a feature. The project is fictional and the plan is a minimal demo build (about 5 weeks, no taste settings, profile edit or ID/PW recovery); only the first MVP is in scope and it is delivered as a mobile-width web app only (no native iOS/Android), with no server or database (seed JSON plus browser storage): F6 fridge integration, F8 price comparison/cart (only a shortcut to mall search is in), F12 community and photo AI recognition are out, and external services (phone verification, SNS login, push) are mocked.

Mockup images: `design/screen-01.png` to `screen-25.png` (100 dpi, one per mockup screen, Read can view them) were extracted from `마냉이 1차.pdf` with `pdftoppm -png -r 100`. Per-screen notes are in the table in `task.md`, and colors/components are in `design/tokens.md`.

Reading the spec PDF: the Read tool cannot render PDFs here. Extract text instead, and always pass `-enc UTF-8`, or the Korean text is lost:

```
pdftotext -enc UTF-8 -layout "마냉이_기능별_기획서.pdf" <out>.txt
```

- `task.md`: the task list and progress log. Update it as you work (mark `[~]` when starting, `[x]` with the date when done, add a progress-log line, record any deviation from the PDF in its "시안 차이 기록" table).

UI rule: follow `마냉이 1차.pdf` as closely as possible. Features that are out of scope still keep their menu entries/buttons visible from the mockup and show a "곧 지원 예정" notice when tapped.

## Spec conventions

- Items marked **(제안)** are the spec author's proposals, not shown on any screen. Treat them as changeable, not as confirmed requirements.
- Items marked **오픈 이슈** are unresolved. Section 14 of the spec lists 13 of them (e.g. password rules, supported fridge models and integration method, the shopping-mall price data source, recipe data source). Do not invent answers to these: ask, or mark the assumption.
- Example data is inconsistent between screens (names 김땡땡/배고파, user IDs gdragonlove/mynaengi_user). This is a known open issue (#10), not a spec requirement.

## Product structure

Bottom tab bar (5 tabs, shown after login) and screen numbers:

| Tab | Screens | Features |
|---|---|---|
| Before login | 1–5 | F1 login/account (ID + SNS: Kakao, Naver, Facebook, Apple), F2 sign-up (phone verification with a 3:00 timer, then ID/password) |
| 홈 | 6–7 | F3 home (fridge summary, 3 items expiring soonest, today's recommendation, fridge-link popup) |
| 냉장고 | 8–11 | F4 fridge status/list (by storage location and expiry, D-day), F5 add ingredient (manual entry, or AI recognition from camera/album photo) |
| 추천 | 12–13 | F7 recipe recommendation and step-by-step recipe detail |
| 장보기 | 14–16 | F8 price comparison across 4 malls, cart, hand-off to payment |
| 마이페이지 | 17–25 | F9 my page/profile/taste preferences/saved recipes, F6 smart-fridge Wi-Fi integration (21), F10 notification settings (22), F11 notices (23), F12 community (24), logout (25) |

Rules that apply across features (spec section 14):
- "Expiring soon" means **within 3 days**. Apply it the same way in home, fridge status, the list, and notifications. Decided in `마냉이_개발계획.md` section 5: the UI term is "유통기한" (as in the mockups), D ≤ 3 counts as expiring (D-0 shows "오늘까지", past dates show a red "기한 지남" and count as expiring), D ≥ 4 is "여유 있음".
- Sub-screens return to the previous screen with a top-left "<" button. The current bottom tab is highlighted.
- The visual theme is teal (녹청색), with uniform color rules for buttons, tabs, and badges.
