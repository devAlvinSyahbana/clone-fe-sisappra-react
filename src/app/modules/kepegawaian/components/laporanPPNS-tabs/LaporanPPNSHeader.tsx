import {KTSVG} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import clsx from 'clsx'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

const LaporanPPNSHeader = () => {
  const location = useLocation()

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='mb-1 hover-scroll-x'>
            <div className='d-grid'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2 border-transparent fs-5 fw-bolder flex-nowrap text-nowrap'>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('#') && 'active')
                    }
                    to={`/kepegawaian/PenyidikPegawaiNegeriSipil/TabDataPPNS/`}
                  >
                    Rekapitulasi PPNS
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('TabDataPPNS') && 'active')
                    }
                    to={`/kepegawaian/PenyidikPegawaiNegeriSipil/TabDataPPNS/`}
                  >
                    Data PPNS Pemprov DKI Jakarta
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

export {LaporanPPNSHeader}
