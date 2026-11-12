import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Placeholder from './pages/Placeholder'

// 화면 라우트는 U-02에서 25개 화면 기준으로 채운다.
export default function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto h-full max-w-[430px] bg-white shadow-sm">
        <Routes>
          <Route path="*" element={<Placeholder />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
