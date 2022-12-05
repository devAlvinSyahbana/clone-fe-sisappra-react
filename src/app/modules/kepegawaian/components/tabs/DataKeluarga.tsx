import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import DataTable, {createTheme} from 'react-data-table-component'
import {HeaderDetailWrapper} from './HeaderDetail'
import axios from 'axios'
import moment from 'moment'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {KTSVG} from '../../../../../_metronic/helpers'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/informasi-data-pegawai`

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

export function DataKeluarga() {
  const {id, status} = useParams()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columns = [
    {
      name: 'Nama',
      selector: (row: any) => row.nama,
      sortable: true,
    },
    {
      name: 'Hubungan Keluarga',
      selector: (row: any) => row.hubungan,
      sortable: true,
    },
    {
      name: 'Tempat, Tanggal Lahir',
      sortable: false,
      cell: (record: any) => {
        return `${record.tempat_lahir}, ${
          record.tgl_lahir ? moment(record.tgl_lahir).format('D MMMM YYYY') : ''
        }`
      },
    },
    {
      name: 'Jenis Kelamin',
      selector: (row: any) => row.jenis_kelamin,
      sortable: true,
    },
  ]

  useEffect(() => {
    async function fetchDT() {
      setLoading(true)
      const response = await axios.get(`${KEPEGAWAIAN_URL}/find-data-keluarga/${id}/${status}`)
      setData(response.data.data)
      setLoading(false)
    }
    fetchDT()
  }, [id, status])

  const LoadingAnimation = (props: any) => {
    return (
      <>
        <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
          <span className='spinner-border spinner-border-xl align-middle me-3'></span>
          <div className='d-flex flex-column'>
            <h5 className='mb-1'>Sedang mengambil data...</h5>
          </div>
        </div>
      </>
    )
  }

  const NoDataComponent = (props: any) => {
    return (
      <>
        <div className='alert d-flex flex-center flex-column py-10 px-10 px-lg-20 mb-10'>
          <span className='svg-icon svg-icon-5tx mb-5'>
            <KTSVG path='/media/icons/duotune/files/fil024.svg' className='svg-icon-2' />
          </span>
          <div className='text-center'>
            <h5 className='fw-bolder fs-3 mb-5'>Data tidak ditemukan . . .</h5>
          </div>
        </div>
      </>
    )
  }

  return (
    <div>
      {/* Header */}
      <HeaderDetailWrapper />
      {/* Second Card */}
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bold'>Data Keluarga</h3>
          </div>
          <div className='card-toolbar'>
            <Link
              className='text-reset text-decoration-none m-0'
              to={`/kepegawaian/informasi-data-pegawai/ubah-data-keluarga/${id}/${status}`}
            >
              <button className='float-none btn btn-light-primary align-self-center'>Ubah</button>
            </Link>
          </div>
        </div>
        <div className='card-body p-9'>
          <DataTable
            columns={columns}
            data={data}
            pagination
            theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
            progressPending={loading}
            progressComponent={<LoadingAnimation />}
            noDataComponent={<NoDataComponent />}
          />
          <div className='p-0 mt-6'>
            <div className='text-center'>
              <Link
                className='text-reset text-decoration-none'
                to='/kepegawaian/informasi-data-pegawai'
              >
                <button className='float-none btn btn-light align-self-center m-1'>Keluar</button>
              </Link>
              <Link
                className='text-reset text-decoration-none'
                to={`/kepegawaian/informasi-data-pegawai/detail-data-pribadi/${id}/${status}`}
              >
                <button className='float-none btn btn-light-primary align-self-center m-1'>
                  <i className='fa-solid fa-arrow-left'></i>
                  Kembali
                </button>
              </Link>
              <Link
                className='text-reset text-decoration-none'
                to={`/kepegawaian/informasi-data-pegawai/detail-data-pendidikan/${id}/${status}`}
              >
                <button className='float-none btn btn-primary align-self-center m-1'>
                  Lanjut <i className='fa-solid fa-arrow-right'></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}
