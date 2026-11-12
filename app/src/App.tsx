import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Placeholder from './pages/Placeholder'
import ScreenIndex from './pages/ScreenIndex'
import { SCREENS } from './screens'

// 시안 화면별 라우트는 screens.ts 표에서 만든다. 화면이 완성되면 element만 실제 화면으로 바꾼다.
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      ...SCREENS.map((s) => ({
        path: s.path,
        element: <Placeholder screen={s} />,
        handle: { tab: s.tab },
      })),
      { path: '/_screens', element: <ScreenIndex /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
