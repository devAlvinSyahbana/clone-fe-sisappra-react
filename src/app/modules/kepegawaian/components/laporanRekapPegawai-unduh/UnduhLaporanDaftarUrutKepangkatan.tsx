import axios from 'axios'
import {useState, useEffect} from 'react'
import ReactToPrint from 'react-to-print'
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

export function UnduhLaporanDaftarUrutKepangkatanPDF() {
  let componentRef: any
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [valStatPegawai, setValStatPegawai] = useState({val: ''})
  const [perPage, setPerPage] = useState(10)
  const [qParamFind, setUriFind] = useState({strparam: ''})

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
    async function fetchDT(page: number) {
      setLoading(true)
      const response = await axios.get(
        `${KEPEGAWAIAN_URL}/duk-pegawai/filter?limit=${perPage}&offset=${page}${qParamFind.strparam}`
      )
      setData(response.data.data)
      setLoading(false)
    }
    fetchDT(1)
  }, [qParamFind, perPage])

  let no = 1

  const columns = [
    {
      name: 'No',
      sortable: true,
      sortField: 'No',
      cell: (record: any) => {
        return <div className='mt-2 mb-2'>{no++}</div>
      },
    },
    {
      name: 'Nama',
      selector: (row: any) => row.nama,
      sortable: true,
      sortField: 'nama',
      wrap: true,
    },
    {
      name: 'NIP',
      selector: (row: any) => row.nip,
      sortable: true,
      sortField: 'nip',
      wrap: true,
      center: true,
    },
    {
      name:
        valStatPegawai.val !== ''
          ? valStatPegawai.val === 'PTT'
            ? 'NPTT'
            : valStatPegawai.val === 'PJLP'
            ? 'NPJLP'
            : 'NRK'
          : 'NRK',
      selector: (row: any) => row.nrk_nptt_npjlp,
      sortable: true,
      sortField: 'nrk_nptt_npjlp',
      wrap: true,
      center: true,
    },
    {
      name: 'Jabatan',
      selector: (row: any) => row.jabatan,
      sortable: true,
      sortField: 'jabatan',
      wrap: true,
      center: true,
    },
    {
      name: 'Status Kepegawaian',
      selector: (row: any) => row.status_pegawai,
      sortable: true,
      sortField: 'status_pegawai',
      width: '180px',
      wrap: true,
      center: true,
    },

    {
      name: 'Tempat Tugas',
      selector: (row: any) => row.tempat_tugas,
      sortable: true,
      sortField: 'tempat_tugas',
      wrap: true,
      center: true,
    },
    {
      name: 'Tanggal Lahir',
      selector: (row: any) => row.tanggal_lahir,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Agama',
      selector: (row: any) => row.agama,
      sortable: true,
      sortField: 'agama',
      wrap: true,
    },
    {
      name: 'Alamat',
      selector: (row: any) => row.alamat,
      sortable: true,
      sortField: 'alamat',
      wrap: true,
    },
  ]

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-6'>
              <Link
                className='text-reset text-decoration-none'
                to={`/kepegawaian/laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan`}
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
                  <button
                    type='button'
                    className='float-none btn btn-primary align-self-center m-1'
                  >
                    <i className='fa-solid fa-print'></i>
                    Cetak
                  </button>
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
                  }'
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
                          DATA DAFTAR URUT KEPANGKATAN
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
                        />
                      </div>
                      {/* END :: Table */}
                      {/* START :: Jumlah */}
                      <div className='row mt-5'></div>
                      {/* END :: Jumlah */}
                      {/* START :: Tanda Tangan */}
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
