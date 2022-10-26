import axios from 'axios'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {LaporanRekapHeader} from './LaporanRekapHeader'
import {
  JumlahSeluruhSatpol,
  JumlahSatpolPendidikan,
  JumlahSatpolGolongan,
} from '../LaporanRekapPegawaiInterface'
import DataTable, {createTheme} from 'react-data-table-component'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme(
  'darkMetro',
  {
    text: {
      primary: '#92929f',
      secondary: '#92929f',
    },
    background: {
      default: '#1e1e2e',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#2b2c41',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  },
  'dark'
)
const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

interface SatpolDiklat {
  list?: Array<{
    diklat?: string
    jumlah?: number
  }>
  total?: number
}

export function TabLaporanRekapitulasiPegawai() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [loading, setLoading] = useState(false)

  const [jpegawaisatpol, setJpegawaisatpol] = useState<JumlahSeluruhSatpol>()
  const [jsatpoldik, setJsatpoldik] = useState<SatpolDiklat>()
  const [jsatpolpen, setJsatpolpen] = useState<JumlahSatpolPendidikan>()
  const [jsatpolgol, setJsatpolgol] = useState<JumlahSatpolGolongan>()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const jsatpol = await axios.get(`${KEPEGAWAIAN_URL}/rekapitulasi-jumlah-pegawai-polpp`)
      const jsatpoldik = await axios.get(
        `${KEPEGAWAIAN_URL}/rekapitulasi-jumlah-pegawai-polpp-by-diklat`
      )
      const jsatpolpen = await axios.get(
        `${KEPEGAWAIAN_URL}/rekapitulasi-jumlah-pegawai-polpp-by-pendidikan`
      )
      const jsatpolgol = await axios.get(
        `${KEPEGAWAIAN_URL}/rekapitulasi-jumlah-pegawai-polpp-by-golongan`
      )

      setJsatpolgol(jsatpolgol.data.data)
      setJsatpolpen(jsatpolpen.data.data)
      setJpegawaisatpol(jsatpol.data.data)
      setJsatpoldik({
        list: [
          {
            diklat: 'DIKLAT STRUKTURAL',
            jumlah: jsatpoldik.data.data.diklat_pol_pp_strutural,
          },
          {
            diklat: 'DIKLAT FUNGSIONAL POL PP',
            jumlah: jsatpoldik?.data?.data?.diklat_fungsional_pol_pp
              ? jsatpoldik.data.data.diklat_fungsional_pol_pp
              : 0,
          },
          {
            diklat: 'DIKLAT PPNS',
            jumlah: jsatpoldik.data.data.diklat_pol_pp_ppns,
          },
          {
            diklat: 'DIKLAT TEKNIS',
            jumlah: 0,
          },
          {
            diklat: 'DIKLAT DASAR POL PP',
            jumlah: jsatpoldik.data.data.diklat_pol_pp_dasar,
          },
          {
            diklat: 'DIKLAT LAINNYA',
            jumlah: 0,
          },
        ],
        total: jsatpoldik.data.data.jmlh_keseluruhan,
      })
      setLoading(false)
    }
    fetchData()
  }, [])

  const LoadingAnimation = (props: any) => {
    return (
      <>
        <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
          {/* <span className="svg-icon svg-icon-2hx svg-icon-primary me-3">...</span> */}
          <span className='spinner-border spinner-border-xl align-middle me-3'></span>
          <div className='d-flex flex-column'>
            <h5 className='mb-1'>Sedang mengambil data...</h5>
          </div>
        </div>
      </>
    )
  }

  const columnsPendidikan = [
    {
      name: 'Pendidikan',
      selector: (row: any) => row.pendidikan,
      sortable: true,
      sortField: 'pendidikan',
      wrap: true,
    },
    {
      name: 'Jumlah',
      selector: (row: any) => row.jumlah,
      sortable: true,
      sortField: 'jumlah',
      wrap: true,
    },
  ]

  const columnsGolongan = [
    {
      name: 'Golongan',
      selector: (row: any) => row.golongan,
      sortable: true,
      sortField: 'golongan',
      wrap: true,
    },
    {
      name: 'Jumlah',
      selector: (row: any) => row.jumlah,
      sortable: true,
      sortField: 'jumlah',
      wrap: true,
    },
  ]

  const columnsJenisDiklat = [
    {
      name: 'Jenis Diklat',
      selector: (row: any) => row.diklat,
      sortable: true,
      sortField: 'diklat',
      wrap: true,
    },
    {
      name: 'Jumlah',
      selector: (row: any) => row.jumlah,
      sortable: true,
      sortField: 'jumlah',
      wrap: true,
    },
  ]

  return (
    <>
      {/* Header */}
      <LaporanRekapHeader />
      {/* Second Card */}
      <div className='card'>
        <div className='card-body'>
          <div className='row mb-5'>
            <div className='col-12'>
              <h1 className='text-dark fw-bold fs-3 text-center'>
                LAPORAN REKAPITULASI DATA PEGAWAI
              </h1>
              <h1 className='text-dark fw-bold fs-3 text-center'>SATUAN POLISI PAMONG PRAJA</h1>
            </div>
            <div className='col-12'>
              <div className='d-flex justify-content-end'>
                {/* begin::Filter Button */}
                <button
                  type='button'
                  className='btn btn-light-primary'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                  Unduh
                </button>
                {/* end::Filter Button */}
                {/* begin::SubMenu */}
                <div
                  className='menu menu-sub menu-sub-dropdown w-100px w-md-150px'
                  data-kt-menu='true'
                >
                  {/* begin::Header */}
                  <div className='px-7 py-5'>
                    <div className='fs-5 text-dark fw-bolder'>Unduh</div>
                  </div>
                  {/* end::Header */}

                  {/* begin::Separator */}
                  <div className='separator border-gray-200'></div>
                  {/* end::Separator */}

                  {/* begin::Content */}
                  <div className='px-7 py-5' data-kt-user-table-filter='form'>
                    <button
                      onClick={() =>
                        navigate(
                          `/kepegawaian/laporan-rekapitulasi-pegawai/unduh-laporan-rekapitulasi-pegawai`
                        )
                      }
                      className='btn btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger w-100'
                    >
                      Print
                    </button>
                  </div>
                  {/* end::Content */}
                </div>
                {/* end::SubMenu */}
              </div>
            </div>
          </div>

          <div className='col-xl-12 mb-xl-12'>
            <div className='card card-flush h-xl-100'>
              <div
                className='card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px'
                style={{
                  backgroundImage: 'url(' + toAbsoluteUrl('/media/svg/shapes/top-blue.jpg') + ')',
                }}
                data-theme='light'
              >
                <h3 className='card-title align-items-start flex-column text-white pt-10'>
                  <span className='fw-bold fs-1 mb-3'>
                    Jumlah Pegawai Satuan Polisi Pamong Praja
                  </span>
                  <div className='fs-4 text-white'>
                    <span className='opacity-75'>Total : </span>
                    <span className='position-relative d-inline-block'>
                      <div className='opacity-75-hover fw-bold fs-1 d-block mb-1'>
                        {jpegawaisatpol?.jmlh_seluruh_pegawai_satpol !== 0
                          ? jpegawaisatpol?.jmlh_seluruh_pegawai_satpol
                          : '-'}{' '}
                        orang
                      </div>
                    </span>
                  </div>
                </h3>
              </div>
              <div className='card-body mt-n20'>
                <div className='mt-n20 position-relative'>
                  <div className='row g-3 g-lg-6'>
                    <div className='col-6 d-flex flex-wrap'>
                      <div className='bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 w-100'>
                        <div className='m-0'>
                          <span className='text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1'>
                            {jpegawaisatpol?.jmlh_seluruh_pns !== 0
                              ? jpegawaisatpol?.jmlh_seluruh_pns
                              : '- '}{' '}
                            Orang
                          </span>
                          <span className='text-gray-500 fw-semibold fs-6'>
                            Pegawai Negeri Sipil (PNS)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-6 d-flex flex-wrap'>
                      <div className='bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 w-100'>
                        <div className='m-0'>
                          <span className='text-gray-700 fw-bolder d-block fs-2x lh-1 ls-n1 mb-1'>
                            {jpegawaisatpol?.jmlh_seluruh_cpns !== 0
                              ? jpegawaisatpol?.jmlh_seluruh_cpns
                              : '- '}{' '}
                            Orang
                          </span>
                          <span className='text-gray-500 fw-semibold fs-6'>
                            Calon Pegawai Negeri Sipil (CPNS)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-12 d-flex flex-wrap'>
                      <div className='bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 w-100'>
                        <div className='m-0 pb-1 mb-2'>
                          <span className='text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1'>
                            {jpegawaisatpol?.jmlh_seluruh_non_pns !== 0
                              ? jpegawaisatpol?.jmlh_seluruh_non_pns
                              : '- '}{' '}
                            Orang
                          </span>
                          <span className='text-gray-500 fw-semibold fs-6'>
                            Non Pegawai Negeri Sipil
                          </span>
                        </div>
                        <div className='row'>
                          <div className='col-6 pt-2'>
                            <span className='text-gray-700 fw-bolder d-block fs-3 lh-1 ls-n1 mb-1'>
                              {jpegawaisatpol?.jmlh_seluruh_non_pns_ptt !== 0
                                ? jpegawaisatpol?.jmlh_seluruh_non_pns_ptt
                                : '- '}{' '}
                              Orang
                            </span>
                            <span className='text-gray-500 fw-semibold fs-6'>
                              Anggota PolPP Non PPNS (PTT)
                            </span>
                          </div>
                          <div className='col-6 pt-2'>
                            <span className='text-gray-700 fw-bolder d-block fs-3 lh-1 ls-n1 mb-1'>
                              {jpegawaisatpol?.jmlh_seluruh_non_pns_pjlp !== 0
                                ? jpegawaisatpol?.jmlh_seluruh_non_pns_pjlp
                                : '- '}{' '}
                              Orang
                            </span>
                            <span className='text-gray-500 fw-semibold fs-6'>
                              Anggota PolPP Non PPNS (PJLP)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-6 d-flex flex-wrap'>
                      <div className='bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 w-100'>
                        <div className='m-0'>
                          <span className='text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1'>
                            {jpegawaisatpol?.jmlh_seluruh_ppns_satpolpp !== 0
                              ? jpegawaisatpol?.jmlh_seluruh_ppns_satpolpp
                              : '- '}{' '}
                            Orang
                          </span>
                          <span className='text-gray-500 fw-semibold fs-6'>
                            PPNS Satuan Polisi Pamong Praja
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-6 d-flex flex-wrap'>
                      <div className='bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 w-100'>
                        <div className='m-0'>
                          <span className='text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1'>
                            {jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain !== 0
                              ? jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain
                              : '- '}{' '}
                            Orang
                          </span>
                          <span className='text-gray-500 fw-semibold fs-6'>
                            PPNS Unit Kerja Lainnya
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-xl-12 mb-xl-12'>
            <div className='card card-flush h-xl-100'>
              <div
                className='card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px'
                style={{
                  backgroundImage: 'url(' + toAbsoluteUrl('/media/svg/shapes/top-blue.jpg') + ')',
                }}
                data-theme='light'
              >
                <h3 className='card-title align-items-start flex-column text-white pt-10'>
                  <span className='fw-bold fs-1 mb-3'>
                    Rincian Pegawai Satuan Polisi Pamong Praja
                  </span>
                </h3>
              </div>
              <div className='card-body mt-n20'>
                <div className='mt-n20 position-relative'>
                  <div className='card border card-flush h-xl-100'>
                    <div className='card-header pt-7'>
                      <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold text-gray-800'>
                          Tingkat Pendidikan{' '}
                        </span>
                      </h3>
                    </div>
                    <div className='card-body pt-2'>
                      <DataTable
                        columns={columnsPendidikan}
                        data={jsatpolpen?.list ? jsatpolpen?.list : []}
                        progressPending={loading}
                        progressComponent={<LoadingAnimation />}
                        theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                        noDataComponent={
                          <div className='alert alert-primary d-flex align-items-center p-5 mt-10 mb-10'>
                            <div className='d-flex flex-column'>
                              <h5 className='mb-1 text-center'>Data tidak ditemukan..!</h5>
                            </div>
                          </div>
                        }
                      />
                      <div className='row mt-5 fs-2'>
                        <div className='col-6 text-start'>Jumlah Keseluruhan</div>
                        <div className='col-6 text-start'>
                          {jsatpolpen?.jmlh_keseluruhan !== 0 ? jsatpolpen?.jmlh_keseluruhan : '- '}{' '}
                          Orang
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-20 position-relative'>
                  <div className='card border card-flush h-xl-100'>
                    <div className='card-header pt-7'>
                      <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold text-gray-800'>
                          Kepangkatan/Golongan
                        </span>
                      </h3>
                    </div>
                    <div className='card-body pt-2'>
                      <DataTable
                        columns={columnsGolongan}
                        data={jsatpolgol?.list ? jsatpolgol?.list : []}
                        progressPending={loading}
                        progressComponent={<LoadingAnimation />}
                        theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                        noDataComponent={
                          <div className='alert alert-primary d-flex align-items-center p-5 mt-10 mb-10'>
                            <div className='d-flex flex-column'>
                              <h5 className='mb-1 text-center'>Data tidak ditemukan..!</h5>
                            </div>
                          </div>
                        }
                      />
                      <div className='row mt-5 fs-2'>
                        <div className='col-6 text-start'>Jumlah Keseluruhan</div>
                        <div className='col-6 text-start'>
                          {jsatpolgol?.jmlh_keseluruhan !== 0 ? jsatpolgol?.jmlh_keseluruhan : '- '}{' '}
                          Orang
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-20 position-relative'>
                  <div className='card border card-flush h-xl-100'>
                    <div className='card-header pt-7'>
                      <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold text-gray-800'>Jenis Kediklatan</span>
                      </h3>
                    </div>
                    <div className='card-body pt-2'>
                      <DataTable
                        columns={columnsJenisDiklat}
                        data={jsatpoldik?.list ? jsatpoldik?.list : []}
                        progressPending={loading}
                        progressComponent={<LoadingAnimation />}
                        theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                        noDataComponent={
                          <div className='alert alert-primary d-flex align-items-center p-5 mt-10 mb-10'>
                            <div className='d-flex flex-column'>
                              <h5 className='mb-1 text-center'>Data tidak ditemukan..!</h5>
                            </div>
                          </div>
                        }
                      />
                      <div className='row mt-5 fs-2'>
                        <div className='col-6 text-start'>Jumlah Keseluruhan</div>
                        <div className='col-6 text-start'>
                          {jsatpoldik?.total !== 0 ? jsatpoldik?.total : '- '} Orang
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </>
  )
}
