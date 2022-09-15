/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sisappra/bg_login.jpg')})`,
        backgroundSize: 'cover',
      }}
    >
      <div 
        className='d-flex align-items-center justify-content-center vh-100'
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          position: 'absolute',
          margin: '0',
          padding: '0',
          width: '100%',
          height: '100%',
        }}
      >
        {/* begin::Content */}
        <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
          {/* begin::Logo */}
          <a href='#' className='mb-1'>
            <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo2.png')} className='h-75px' />
          </a>
          {/* end::Logo */}
          {/* begin::Title */}
          <h2 className="text-white fw-normal mx-auto">
            Sistem Informasi Satuan Polisi Pamong Praja
          </h2>
          {/* end::Title */}
          {/* begin::Wrapper */}
          <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Content */}
      </div>
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
