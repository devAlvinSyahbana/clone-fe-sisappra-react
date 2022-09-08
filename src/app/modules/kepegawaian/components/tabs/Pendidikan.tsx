import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {HeaderDetailWrapper} from './HeaderDetail'


export function Pendidikan() {
  const location = useLocation()

  const columns = [
    {
      name: 'Jenis Pendidikan',
      selector: (row: { pendidikan: any }) => row.pendidikan,
      sortable: true,
    },
    {
      name: 'Nama Sekolah',
      selector: (row: { namaSekolah: any }) => row.namaSekolah,
      sortable: true,
    },
    {
      name: 'Nomor Ijazah',
      selector: (row: { nomorIjazah: any }) => row.nomorIjazah,
      sortable: true,
    },
    {
      name: 'Tanggal Ijazah',
      selector: (row: { tglIjazah: any }) => row.tglIjazah,
      sortable: true,
    },
    {
      name: 'Jurusan',
      selector: (row: { jurusan: any }) => row.jurusan,
      sortable: true,
    },
    {
      name: 'Fakultas',
      selector: (row: { fakultas: any }) => row.fakultas,
      sortable: true,
    },
    {
      name: 'File Ijazah',
      sortable: false,
      text: "Action",
      className: "action",
      align: "left",
      cell: (record: any) => {
        return (
          <Fragment>
            <Link to="/#">Lihat</Link>
          </Fragment>
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      pendidikan: '	SMA',
      namaSekolah: 'SMA Tegar Beriman',
      nomorIjazah: '090909090909',
      tglIjazah: '18-09-1999',
      jurusan: 'RPL',
      fakultas: 'Rekayasa Perangkat Lunak',
    },
  ];

  return (

    <div>
      {/* Header */}
      <HeaderDetailWrapper />
      {/* Second Card */}
      <div className='card mb-5 mb-xl-10'>
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bold m-0">Pendidikan</h3>
          </div>
        </div>
        <div className="card-body p-9">
          <DataTable
            columns={columns}
            data={data}
            defaultSortFieldId={1}
          />
          <div className="p-0 mt-6">
            <div className="text-center">
              <Link
                className="text-reset text-decoration-none"
                to="/kepegawaian/InformasiDataPegawai"
              >
                <button className="float-none btn btn-secondary align-self-center m-1">
                  <i className="fa fa-close"></i>
                  Batal
                </button>
              </Link>
              <Link
                className="text-reset text-decoration-none"
                to="/kepegawaian/DataKeluarga"
              >
                <button className="float-none btn btn-success align-self-center m-1">
                  <i className="fa-solid fa-arrow-left"></i>
                  Kembali
                </button>
              </Link>
              <Link
                className="text-reset text-decoration-none"
                to="/kepegawaian/DataKepegawaian"
              >
                <button className="float-none btn btn-primary align-self-center m-1">
                  <i className="fa-solid fa-arrow-right"></i>
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
