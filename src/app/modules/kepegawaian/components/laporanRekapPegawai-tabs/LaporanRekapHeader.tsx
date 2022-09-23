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
                      (location.pathname.includes('TabLaporanRekapitulasiPegawai') && 'active')
                    }
                    to={`/kepegawaian/LaporanRekapitulasiPegawai/TabLaporanRekapitulasiPegawai/`}
                  >
                    Laporan Rekapitulasi Pegawai
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('TabDaftarUrutKepangkatan') && 'active')
                    }
                    to={`/kepegawaian/LaporanRekapitulasiPegawai/TabDaftarUrutKepangkatan/`}
                  >
                    Daftar Urut Kepangkatan
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('Pendidikan') && 'active')
                    }
                    to={`/kepegawaian/InformasiDataPegawai/Pendidikan/`}
                  >
                    Rekapitulasi Data Pegawai yang Pensiun
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('DataPegawaiYangNaikPangkat') && 'active')
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
                      (location.pathname.includes('TabRekapitulasiDataPegawaiPejabatStruktural') && 'active')
                    }
                    to={`/kepegawaian/LaporanRekapitulasiPegawai/TabRekapitulasiDataPegawaiPejabatStruktural/`}
                  >
                    Rekapitulasi Data Pegawai Pejabat Struktural
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('HirarkiKepegawaian') && 'active')
                    }
                    to={`/kepegawaian/InformasiDataPegawai/HirarkiKepegawaian/`}
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
