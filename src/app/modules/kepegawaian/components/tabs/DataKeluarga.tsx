import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {HeaderDetailWrapper} from './HeaderDetail'
import axios from 'axios'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function DataKeluarga() {
  const {id, status} = useParams()
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
      selector: (row: any) => row.tempat_lahir,
      sortable: true,
    },
    {
      name: 'Jenis Kelamin',
      selector: (row: any) => row.jenis_kelamin,
      sortable: true,
    },
  ]

  useEffect(() => {
    async function fetchDT() {
      const response = await axios.get(
        `${KEPEGAWAIAN_URL}/find-data-keluarga/${id}/${status}`
      )
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
          <DataTable columns={columns} data={data} pagination />
          <div className='p-0 mt-6'>
            <div className='text-center'>
              <Link
                className='text-reset text-decoration-none'
                to='/kepegawaian/InformasiDataPegawai'
              >
                <button className='float-none btn btn-secondary align-self-center m-1'>
                  <i className='fa fa-close'></i>
                  Batal
                </button>
              </Link>
              <Link className='text-reset text-decoration-none' to='/kepegawaian/DataPribadi'>
                <button className='float-none btn btn-success align-self-center m-1'>
                  <i className='fa-solid fa-arrow-left'></i>
                  Kembali
                </button>
              </Link>
              <Link className='text-reset text-decoration-none' to='/kepegawaian/Pendidikan'>
                <button className='float-none btn btn-primary align-self-center m-1'>
                  <i className='fa-solid fa-arrow-right'></i>
                  Lanjut
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
