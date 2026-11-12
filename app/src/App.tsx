import type { ReactElement } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import ComponentShowcase from './pages/ComponentShowcase'
import Home from './pages/Home'
import Login from './pages/Login'
import Placeholder from './pages/Placeholder'
import Signup from './pages/Signup'
import SignupAccount from './pages/SignupAccount'
import ScreenIndex from './pages/ScreenIndex'
import { SCREENS } from './screens'

// 완성된 화면은 여기에 등록한다. 없는 화면은 임시 화면(Placeholder)이 대신한다.
const PAGES: Record<string, ReactElement> = {
  '/': <Home />,
  '/login': <Login />,
  '/signup': <Signup />,
  '/signup/account': <SignupAccount />,
}

// 시안 화면별 라우트는 screens.ts 표에서 만든다. 화면이 완성되면 element만 실제 화면으로 바꾼다.
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      ...SCREENS.map((s) => ({
        path: s.path,
        element: PAGES[s.path] ?? <Placeholder screen={s} />,
        handle: { tab: s.tab },
      })),
      { path: '/_screens', element: <ScreenIndex /> },
      { path: '/_components', element: <ComponentShowcase /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
