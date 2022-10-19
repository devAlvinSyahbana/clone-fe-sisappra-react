import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import DataTable, {createTheme} from 'react-data-table-component'
import {HeaderDetailWrapper} from './HeaderDetail'
import axios from 'axios'
import moment from 'moment'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

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

export function DataKeluargaDUK() {
  const {id, status} = useParams()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [data, setData] = useState([])
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
        return `${record.tempat_lahir}, ${moment(record.tgl_lahir).format('D MMMM YYYY')}`
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
      const response = await axios.get(`${KEPEGAWAIAN_URL}/find-data-keluarga/${id}/${status}`)
      setData(response.data.data)
    }
    fetchDT()
  }, [id, status])

  return (
    <div>
      {/* Header */}
      <HeaderDetailWrapper />
      {/* Second Card */}
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bold m-0'>Data Keluarga</h3>
          </div>
        </div>
        <div className='card-body p-9'>
          <DataTable
            columns={columns}
            data={data}
            pagination
            theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
            noDataComponent={
              <div className='alert alert-primary d-flex align-items-center p-5 mt-10 mb-10'>
                <div className='d-flex flex-column'>
                  <h5 className='mb-1 text-center'>Data tidak ditemukan..!</h5>
                </div>
              </div>
            }
          />
          <div className='p-0 mt-6'>
            <div className='text-center'>
              <Link
                className='text-reset text-decoration-none'
                to='/kepegawaian/laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan'
              >
                <button className='float-none btn btn-light align-self-center m-1'>Keluar</button>
              </Link>
              <Link
                className='text-reset text-decoration-none'
                to={`/kepegawaian/laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan/detail-data-pribadi-duk/${id}/${status}`}
              >
                <button className='float-none btn btn-light-primary align-self-center m-1'>
                  <i className='fa-solid fa-arrow-left'></i>
                  Kembali
                </button>
              </Link>
              <Link
                className='text-reset text-decoration-none'
                to={`/kepegawaian/laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan/detail-pendidikan-duk/${id}/${status}`}
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
