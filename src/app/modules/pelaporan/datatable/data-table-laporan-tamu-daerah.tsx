import axios from 'axios'
import {FC, Fragment, useEffect, useState} from 'react'
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import {useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../../_metronic/helpers'
import {unparse} from 'papaparse'

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

const unduhCSV = (data: any[]) => {
  const csvData = unparse(data)
  const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'})
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'Laporan Tamu Daerah.csv')
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export const DtAdmin: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  konfirDel,
  theme,
}) => {
  const navigate = useNavigate()

  const columns2 = [
    {
      name: 'No',
      width: '80px',
      selector: (row: any) => row.serial,
      sortable: true,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      },
    },
    {
      name: 'Tanggal Kunjungan',
      width: '140px',
      sortable: true,
      selector: (row: any) => row.tanggal_kunjungan,
    },
    {
      name: 'Waktu Mulai',
      width: '140px',
      selector: (row: any) => row.waktu_mulai_kunjungan,
    },
    {
      name: 'Waktu Selesai',
      width: '140px',
      selector: (row: any) => row.waktu_selesai_kunjungan,
    },
    {
      name: 'Asal Instansi',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.asal_instansi,
    },
    {
      name: 'Jumlah Pengunjung',
      width: '160px',
      wrap: true,
      sortable: true,
      // selector: (row: any) => row.jml_pengunjung,
      selector: (row: any) => row.jumlah,
    },
    {
      name: 'Maksud Tujuan',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.maksud_dan_tujuan,
    },
    {
      name: 'Pejabat Penerima Kunjungan',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.pejabat_penerima_kunjungan,
    },
    {
      name: 'Tempat Kunjungan',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.tempat_kunjungan,
    },
    {
      name: 'Aksi',
      sortable: false,
      className: 'action',
      center: true,
      allowOverflow: true,
      fixed: true,
      cell: (record: any) => {
        return (
          <Fragment>
            <div className='d-flex mb-2 mt-2 flex-end'>
              {[DropdownButton].map((DropdownType, idx) => (
                <DropdownType
                  as={ButtonGroup}
                  key={idx}
                  id={`dropdown-button-drop-${idx}`}
                  size='sm'
                  variant='light'
                  title='Aksi'
                >
                  <Dropdown.Item
                    onClick={() => navigate('/pelaporan/DetailLaporanTamuDaerah/' + record.id)}
                  >
                    Detail
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate('/pelaporan/ubah-laporan-tamu-daerah/' + record.id)}
                  >
                    Ubah
                  </Dropdown.Item>
                  <Dropdown.Item href='#' onClick={() => konfirDel(record.id)}>
                    Hapus
                  </Dropdown.Item>
                </DropdownType>
              ))}
            </div>
          </Fragment>
        )
      },
    },
  ]

  return (
    <div>
      <button
        type='button'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
        style={{float: 'right', marginRight: '50px'}}
        className='btn btn-light-primary'
        onClick={() => unduhCSV(data)}
      >
        <>
          <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
          Unduh CSV
        </>
      </button>
      <DataTable
        columns={columns2}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        progressComponent={<LoadingAnimation />}
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        theme={theme}
      />
    </div>
  )
}

export const DtPimpinan: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  theme,
}) => {
  const columns = [
    {
      name: 'No',
      width: '80px',
      selector: (row: any) => row.serial,
      sortable: true,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      },
    },
    {
      name: 'Tanggal Kunjungan',
      width: '140px',
      selector: (row: any) => row.tanggal_kunjungan,
    },
    {
      name: 'Waktu Mulai',
      width: '140px',
      selector: (row: any) => row.waktu_mulai_kunjungan,
    },
    {
      name: 'Waktu Selesai',
      width: '140px',
      selector: (row: any) => row.waktu_selesai_kunjungan,
    },
    {
      name: 'Asal Instansi',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.asal_instansi,
    },
    {
      name: 'Jumlah Pengunjung',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.jumlah,
    },
    {
      name: 'Maksud Tujuan',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.maksud_dan_tujuan,
    },
    {
      name: 'Pejabat Penerima Kunjungan',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.pejabat_penerima_kunjungan,
    },
    {
      name: 'Tempat Kunjungan',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.tempat_kunjungan,
    },
  ]

  return (
    <div>
      <button
        type='button'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
        style={{float: 'right', marginRight: '50px'}}
        className='btn btn-light-primary'
        onClick={() => unduhCSV(data)}
      >
        <>
          <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
          Unduh CSV
        </>
      </button>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        progressComponent={<LoadingAnimation />}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        theme={theme}
      />
    </div>
  )
}