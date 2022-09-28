import {useEffect, useState, Fragment} from 'react'
import {Link, useParams} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {HeaderDetailWrapperDUK} from './HeaderDetailDUK'
import axios from 'axios'
import moment from 'moment'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function PendidikanDUK() {
  const {id, status} = useParams()
  const [data, setData] = useState([])
  const columns = [
    {
      name: 'Jenis Pendidikan',
      selector: (row: any) => row.jenis_pendidikan,
      sortable: true,
    },
    {
      name: 'Nama Sekolah',
      selector: (row: any) => row.nama_sekolah,
      sortable: true,
    },
    {
      name: 'Nomor Ijazah',
      selector: (row: any) => row.nomor_ijazah,
      sortable: true,
    },
    {
      name: 'Tanggal Ijazah',
      selector: (row: any) => row.tgl_ijazah,
      sortable: true,
      cell: (record: any) => {
        return `${moment(record.tgl_ijazah).format('D MMMM YYYY')}`
      },
    },
    {
      name: 'Jurusan',
      selector: (row: any) => row.jurusan,
      sortable: true,
    },
    {
      name: 'Fakultas',
      selector: (row: any) => row.fakultas,
      sortable: true,
    },
    {
      name: 'File Ijazah',
      sortable: false,
      text: 'Aksi',
      className: 'action',
      align: 'left',
      cell: (record: any) => {
        return (
          <Fragment>
            <Link to={`${record.file_ijazah}`}>Lihat</Link>
          </Fragment>
        )
      },
    },
  ]

  useEffect(() => {
    async function fetchDT() {
      const response = await axios.get(`${KEPEGAWAIAN_URL}/find-data-pendidikan/${id}/${status}`)
      setData(response.data.data)
    }
    fetchDT()
  }, [id, status])

  return (
    <div>
      {/* Header */}
      <HeaderDetailWrapperDUK />
      {/* Second Card */}
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bold m-0'>Pendidikan</h3>
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
                  Keluar
                </button>
              </Link>
              <Link
                className='text-reset text-decoration-none'
                to={`/kepegawaian/InformasiDataPegawai/DataKeluarga/${id}/${status}`}
              >
                <button className='float-none btn btn-success align-self-center m-1'>
                  <i className='fa-solid fa-arrow-left'></i>
                  Kembali
                </button>
              </Link>
              <Link
                className='text-reset text-decoration-none'
                to={`/kepegawaian/InformasiDataPegawai/DataKepegawaian/${id}/${status}`}
              >
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
