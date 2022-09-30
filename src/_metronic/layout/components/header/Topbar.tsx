import clsx from 'clsx'
import {FC} from 'react'
import {useAuth} from '../../../../app/modules/auth'
// import {HeaderUserMenu, ThemeModeSwitcher} from '../../../partials'
import {HeaderUserMenu} from '../../../partials'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  // toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Topbar: FC = () => {
  const {currentUser} = useAuth()
  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* begin::Theme mode */}
      {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <ThemeModeSwitcher
          toggleBtnClass={clsx('btn-active-light-primary btn-custom', toolbarButtonHeightClass)}
        />
      </div> */}
      {/* end::Theme mode */}

      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
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
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}
    </div>
  )
}

export {Topbar}
