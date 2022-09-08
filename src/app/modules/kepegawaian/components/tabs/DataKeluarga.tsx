import React from 'react'
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {HeaderDetailWrapper} from './HeaderDetail'

export function DataKeluarga() {
  const columns = [
    {
      name: 'Nama',
      selector: (row: {name: any}) => row.name,
      sortable: true,
    },
    {
      name: 'Hubungan Keluarga',
      selector: (row: {hubungan: any}) => row.hubungan,
      sortable: true,
    },
    {
      name: 'Tempat, Tanggal Lahir',
      selector: (row: {ttl: any}) => row.ttl,
      sortable: true,
    },
    {
      name: 'Jenis Kelamin',
      selector: (row: {jk: any}) => row.jk,
      sortable: true,
    },
  ]

  const data = [
    {
      id: 1,
      name: 'RAHMI FITRIA ASRIL',
      hubungan: 'Istri',
      ttl: 'JAKARTA, 27-05-1988',
      jk: 'PEREMPUAN',
    },
  ]

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
          <DataTable columns={columns} data={data} defaultSortFieldId={1} />
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
