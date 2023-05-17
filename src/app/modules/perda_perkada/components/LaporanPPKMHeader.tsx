import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const LaporanPPKMHeader = () => {
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
                      (location.pathname === '/perdaperkada/LaporanPPKM-Masker' &&
                        'active')
                    }
                    to={`/perdaperkada/LaporanPPKM-Masker`}
                  >
                     Penindakan Perorangan Tidak Menggunakan Masker
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('/LaporanPPKM-Bangunan') && 'active')
                    }
                    to={`/perdaperkada/LaporanPPKM-Bangunan/`}
                  >
                     Pengawasan dan Penindakan Tempat Kerja, Usaha, Industri, Penginapan
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('LaporanPPKM-RumahMakan') && 'active')
                    }
                    to={`/perdaperkada/LaporanPPKM-RumahMakan/`}
                  >
                     Pengawasan dan Penindakan Warung Makan, Restoran Atau Kafe
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('LaporanPPKM-PKL') && 'active')
                    }
                    to={`/perdaperkada/LaporanPPKM-PKL/`}
                  >
                     Pengawasan dan Penindakan Pedagang Kaki Lima
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('LaporanPPKM-Kerumunan') && 'active')
                    }
                    to={`/perdaperkada/LaporanPPKM-Kerumunan/`}
                  >
                     Pengawasan dan Penindakan Area Publik dan Kerumunan
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

export { LaporanPPKMHeader }