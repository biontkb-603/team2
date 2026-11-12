import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Placeholder from './pages/Placeholder'

// 탭 5개의 최상위 라우트만 있다. 25개 화면 전체 라우트와 "<" 뒤로가기는 U-02에서 만든다.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Placeholder title="홈" />} />
          <Route path="fridge" element={<Placeholder title="냉장고" />} />
          <Route path="recommend" element={<Placeholder title="요리 추천" />} />
          <Route path="shopping" element={<Placeholder title="장보기" />} />
          <Route path="mypage" element={<Placeholder title="마이페이지" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
