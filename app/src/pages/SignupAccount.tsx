import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import SignupShell from '../components/SignupShell'

// 화면 4·5 (같은 폼의 빈 상태/아이디를 입력한 상태). 완료하면 홈으로 이동만 한다.
// 비밀번호 일치 확인과 계정 생성은 F-05에서 만든다.
export default function SignupAccount() {
  const navigate = useNavigate()

  return (
    <SignupShell back="/signup" submitLabel="완료하기" onSubmit={() => navigate('/')}>
      <Input label="아이디" autoComplete="username" />
      <Input label="비밀번호" type="password" toggle={false} autoComplete="new-password" />
      <Input label="비밀번호 확인" type="password" toggle={false} autoComplete="new-password" />
    </SignupShell>
  )
}
