# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This is the planning stage of **마냉이 (My Fridge)**, a Korean-language mobile app. No source code, build system, or tests exist yet, and the folder is not a git repository. When code is added, update this file with build, lint, and test commands and the architecture.

The app manages fridge ingredients and expiry dates, recommends recipes based on owned ingredients, and connects missing ingredients to price comparison across 4 shopping malls.

## Source documents

- `마냉이 1차.pdf`: 25 UI screen mockups (the "마냉이 회원가입" screen set). It is the source of truth for what the screens show.
- `마냉이_기능별_기획서.pdf` (dated 2026-11-09): the feature spec built from those 25 screens. It groups them into features F1–F12, and each requirement has an ID (e.g. `F4-06`) linked to screen numbers.

- `마냉이_개발계획.md` (2026-11-10): the development plan. It sets the phased scope (MVP / phase 2 / phase 3), sprint schedule, proposed stack, and the legal and store checklist for launch. Check it before implementing a feature. For example, F6 fridge integration, F8 price comparison and F12 community are not in the MVP.

Reading the PDFs: the Read tool cannot render them on this machine (no `pdftoppm`). Extract text instead, and always pass `-enc UTF-8`, or the Korean text is lost:

```
pdftotext -enc UTF-8 -layout "마냉이_기능별_기획서.pdf" <out>.txt
```

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
- "Expiring soon" means **within 3 days**. Apply it the same way in home, fridge status, the list, and notifications.
- Sub-screens return to the previous screen with a top-left "<" button. The current bottom tab is highlighted.
- The visual theme is teal (녹청색), with uniform color rules for buttons, tabs, and badges.
