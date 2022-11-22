import {Route, Routes} from 'react-router-dom'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {Registrasi} from './components/Registrasi'
import {AuthLayout} from './AuthLayout'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registrasi' element={<Registrasi />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
