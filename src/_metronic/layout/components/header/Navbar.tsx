import clsx from 'clsx'
import {HeaderUserMenu, ThemeModeSwitcher} from '../../../partials'
import {useAuth} from '../../../../app/modules/auth'

const itemClass = 'ms-1 ms-lg-3'
const userAvatarClass = 'symbol-35px symbol-md-40px'

const Navbar = () => {
  const {currentUser} = useAuth()
  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          {currentUser?.data_pegawai?.foto && currentUser?.data_pegawai?.foto !== '' ? (
            <div className='symbol-label'>
              <img
                src={currentUser?.data_pegawai?.foto}
                alt={currentUser?.data_user?.email}
                className='w-100'
              />
            </div>
          ) : (
            <div className={clsx('symbol-label fs-1', `bg-light-secondary`, `text-secondary`)}>
              {currentUser?.data_pegawai?.nama && currentUser?.data_pegawai?.nama !== ''
                ? currentUser?.data_pegawai?.nama.charAt(0)
                : '?'}
            </div>
          )}
        </div>
        <HeaderUserMenu />
      </div>
    </div>
  )
}

export {Navbar}
