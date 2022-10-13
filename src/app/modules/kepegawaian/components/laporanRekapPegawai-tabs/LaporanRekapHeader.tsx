import {KTSVG} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import clsx from 'clsx'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

const LaporanRekapHeader = () => {
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
                      (location.pathname.includes('laporan-rekapitulasi-pegawai/tab-laporan-rekapitulasi-pegawai') && 'active')
                    }
                    to={`/kepegawaian/laporan-rekapitulasi-pegawai/tab-laporan-rekapitulasi-pegawai`}
                  >
                    Laporan Rekapitulasi Pegawai
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('tab-daftar-urut-kepangkatan') && 'active')
                    }
                    to={`/kepegawaian/laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan/`}
                  >
                    Daftar Urut Kepangkatan
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('TabRekapitulasiDataPegawaiPensiun') && 'active')
                    }
                    to={`/kepegawaian/laporan-rekapitulasi-pegawai/tab-rekapitulasi-data-pegawai-pensiun`}
                  >
                    Rekapitulasi Data Pegawai yang Pensiun
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('TabDataPegawaiYangNaikPangkat') && 'active')
                    }
                    to={`/kepegawaian/LaporanRekapitulasiPegawai/TabDataPegawaiYangNaikPangkat/`}
                  >
                    Rekapitulasi Data Pegawai yang Naik Pangkat
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('TabRekapitulasiPejabatStruktural') && 'active')
                    }
                    to={`/kepegawaian/LaporanRekapitulasiPegawai/TabRekapitulasiPejabatStruktural/`}
                  >
                    Rekapitulasi Data Pegawai Pejabat Struktural
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('TabRekapitulasiPejabatFungsional') && 'active')
                    }
                    to={`/kepegawaian/LaporanRekapitulasiPegawai/TabRekapitulasiPejabatFungsional/`}
                  >
                    Rekapitulasi Data Pejabat Fungsional Pol PP (JFT)
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

export {LaporanRekapHeader}
