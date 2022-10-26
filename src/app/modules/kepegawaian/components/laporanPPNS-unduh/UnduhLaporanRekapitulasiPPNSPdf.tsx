import axios from 'axios'
import {useState, useEffect} from 'react'
import ReactToPrint from 'react-to-print'
import {JumlahPPNS, JumlahUnitSKPD} from '../LaporanRekapPegawaiInterface'
import DataTable, {createTheme} from 'react-data-table-component'
import {Link} from 'react-router-dom'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

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

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function UnduhLaporanRekapitulasiPPNSPdf() {
  let componentRef: any
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [jumlah_unit_skpd, setJUnitSKPD] = useState<JumlahUnitSKPD>()
  const [jumlah_PPNS, setJumlahPPNS] = useState<JumlahPPNS>()

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

  useEffect(() => {
    const fetchData = async () => {
      const jumlah_PPNS = await axios.get(`${KEPEGAWAIAN_URL}/PPNS-rekapitulasi-jumlah`)

      setJumlahPPNS(jumlah_PPNS.data.data)
    }
    fetchData()
    fetchDT(1)
  }, [])

  async function fetchDT(datarekap: any) {
    setLoading(true)
    const jumlah_unit_skpd = await axios.get(`${KEPEGAWAIAN_URL}/PPNS-rekapitulasi`)
    setData(jumlah_unit_skpd.data.data)
    setLoading(false)
  }

  var num = 1

  const columns = [
    {
      name: 'No',
      width: '8%',
      wrap: true,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.skpd !== 'Jumlah Keseluruhan' ? num++ : ''}</div>
      },
    },
    {
      name: 'Unit SKPD',
      cell: (row: any) => {
        return (
          <div className='mb-2 mt-2'>
            {row.skpd !== 'Jumlah Keseluruhan' ? row.skpd : <b>Jumlah Keseluruhan</b>}
          </div>
        )
      },
      width: '75%',
      wrap: true,
    },
    {
      name: 'Jumlah',
      cell: (row: any) => {
        return (
          <div className='mb-2 mt-2'>
            {row.skpd === 'Jumlah Keseluruhan' ? <b>{row.jumlah}</b> : row.jumlah}
          </div>
        )
      },
      wrap: true,
      width: '17%',
    },
  ]

  const conditionalRowStyles = [
    {
      when: (row: any) => row.skpd === 'Jumlah Keseluruhan',
      style: {
        backgroundColor: 'green',
        color: 'white',
      },
    },
    // {
    //     when: (row: any) => row.head,
    //     style: {
    //         backgroundColor: 'blue',
    //     },
    // },
  ]

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-6'>
              <Link
                className='text-reset text-decoration-none'
                to={`/kepegawaian/PenyidikPegawaiNegeriSipil/TabRekapitulasiPPNS`}
              >
                <button className='float-none btn btn-secondary align-self-center m-1'>
                  <i className='fa-solid fa-arrow-left'></i>
                  Kembali
                </button>
              </Link>
            </div>
            <div className='col-6 d-flex justify-content-end'>
              <ReactToPrint
                trigger={() => (
                  <a className='float-none btn btn-primary align-self-center m-1' href='#'>
                    Unduh Pdf
                  </a>
                )}
                pageStyle='
                            @page { 
                                size: auto; 
                                margin: 0mm; 
                                } 
                                @media 
                                print { 
                                
                                .header, .header-space,
                    .footer, .footer-space {
                    height: 100px;
                    }
                    .header {
                    position: fixed;
                    top: 0;
                    }
                    .footer {
                    position: fixed;
                    bottom: 0;
                    }
                                }

            
            
                                @media all {
                                .pagebreak {
                                    display: inline;
                                }
                                }
                            '
                content={() => componentRef}
              />
            </div>
          </div>
          {/* START :: Isi Konten Download */}
          <div ref={(el) => (componentRef = el)}>
            <table style={{width: '100%'}}>
              <thead>
                <tr>
                  <td
                    style={{
                      border: '0px',
                    }}
                  >
                    <div className='header-space'></div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      border: '0px',
                    }}
                  >
                    <div className='content'>
                      <div className='col-12'>
                        <h1 className='text-dark fw-bold fs-3 text-center'>
                          LAPORAN REKAPITULASI DATA PPNS
                        </h1>
                        <h1 className='text-dark fw-bold fs-3 text-center'>
                          PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA
                        </h1>
                      </div>
                      <div className='p-4'></div>
                      {/* START :: Table */}
                      <div className='row g-5 g-xxl-8 ms-15 me-15'>
                        <DataTable
                          columns={columns}
                          data={data}
                          progressPending={loading}
                          progressComponent={<LoadingAnimation />}
                          highlightOnHover
                          theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                          // conditionalRowStyles={conditionalRowStyles}
                        />
                      </div>
                      {/* END :: Table */}
                      {/* START :: Jumlah */}
                      <div className='row mt-5'></div>
                      {/* <div className="row ms-20 me-10">
                            <div className="col-sm-8 ml-5 d-flex bd-highlight">
                                <label className="fw-bold">SATPOL PP PROVINSI DKI JAKARTA</label>
                            </div>
                            <div className="col-sm-4 flex-fill bd-highlight">
                                <span className="fs-6 fw-normal ">
                                    {jumlah_PPNS?.satpol_pp !== 0 ? jumlah_PPNS?.satpol_pp : '-'} Orang
                                </span>
                            </div>
                        </div> */}
                      {/* <div className="page2"></div> */}
                      <div className='row g-5 g-xxl-8 ms-15 me-15 d-flex justify-content-center'>
                        <label className='col-8 col-sm-8 col-lg-8 offset-md-1 fw-bold'>
                          SATPOL PP PROVINSI DKI JAKARTA
                        </label>
                        <div className='col-2 col-sm-2 col-lg-2 d-flex justify-content-center'>
                          <span className='fs-6 fw-normal'>
                            {jumlah_PPNS?.satpol_pp !== 0 ? jumlah_PPNS?.satpol_pp : '-'} Orang
                          </span>
                        </div>
                      </div>
                      <div className='row g-5 g-xxl-8 ms-15 me-15 d-flex justify-content-center'>
                        <label className='col-8 col-sm-8 col-lg-8 offset-md-1 fw-bold'>
                          SKPD LAIN
                        </label>
                        <div className='col-2 col-sm-2 col-lg-2 d-flex justify-content-center'>
                          <span className='fs-6 fw-normal'>
                            {jumlah_PPNS?.skpd_lain !== 0 ? jumlah_PPNS?.skpd_lain : '-'} Orang
                          </span>
                        </div>
                      </div>
                      <div className='row g-5 g-xxl-8 ms-15 me-15 d-flex justify-content-center'>
                        <label className='col-8 col-sm-8 col-lg-8 offset-md-1 fw-bold'>
                          JUMLAH
                        </label>
                        <div className='col-2 col-sm-2 col-lg-2 d-flex justify-content-center'>
                          <span className='fs-6 fw-normal'>
                            {jumlah_PPNS?.jumlah_ppns !== 0 ? jumlah_PPNS?.jumlah_ppns : '-'} Orang
                          </span>
                        </div>
                      </div>
                      {/* END :: Jumlah */}
                      {/* START :: Buat Tanda Tangan */}
                      <div className='row'>
                        <div className='col-8'></div>
                        <div className='col-4 fs-6 mb-2 mt-20 fw-semibold text-center'>
                          <div className='col fs-6 mb-2 fw-semibold text-center'>
                            ................................................
                          </div>
                          <div className='col fs-6 fw-semibold text-center'>
                            Kepala Satpol PP................................
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-8'></div>
                        <div className='col-4 fs-6 mb-2 mt-20 fw-semibold text-center'>
                          <div className='col fs-6 mb-2 fw-semibold text-center'>
                            ................................................
                          </div>
                          <div className='col fs-6 fw-semibold text-center'>
                            NIP. .........................................
                          </div>
                        </div>
                      </div>
                      {/* END :: Buat Tanda Tangan */}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    style={{
                      border: '0px',
                    }}
                  >
                    <div className='footer-space'></div>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className='header'></div>
            <div className='footer'></div>
          </div>
          {/* END :: End Isi Konten Download */}
        </div>
      </div>
    </div>
  )
}
