/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import clsx from 'clsx'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            {currentUser?.data_pegawai?.foto && currentUser?.data_pegawai?.foto !== '' ? (
              <div className='symbol-label'>
                <img src={currentUser?.data_pegawai?.foto} alt={currentUser?.data_user?.email} className='w-100' />
              </div>
            ) : (
              <div className={clsx('symbol-label fs-1', `bg-light-secondary`, `text-secondary`)}>
                {currentUser?.data_pegawai?.nama && currentUser?.data_pegawai?.nama !== '' ? currentUser?.data_pegawai?.nama.charAt(0) : '?'}
              </div>
            )}
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.data_pegawai?.nama}
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.data_user?.email}
            </a>
          </div>
        </div>
      </div>
      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/crafted/pages/profile'} className='menu-link px-5'>
          Profil Saya
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
