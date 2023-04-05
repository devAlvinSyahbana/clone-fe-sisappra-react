import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const LaporanPerdaPerkadaHeader = () => {
  const location = useLocation()

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-7 pb-0'>
          <div className='hover-scroll-x'>
            <div className='d-grid mb-5'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2 border-transparent fs-5 fw-bolder flex-nowrap text-nowrap'>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/perdaperkada/LaporanPerdaPerkada' &&
                        'active')
                    }
                    to={`/perdaperkada/LaporanPerdaPerkada`}
                  >
                    Laporan Perda Perkada
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('RegisterPerdaPerkada') && 'active')
                    }
                    to={`/perdaperkada/RegisterPerdaPerkada/`}
                  >
                    Register Perda Perkada
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { LaporanPerdaPerkadaHeader }
