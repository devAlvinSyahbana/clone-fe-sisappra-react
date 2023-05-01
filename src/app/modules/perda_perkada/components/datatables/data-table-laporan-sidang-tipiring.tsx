import {FC, Fragment} from 'react'
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import {useTable, Column} from 'react-table'
import {useNavigate} from 'react-router-dom'

export const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MASTERDATA_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL
export const PELAPORAN_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL

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

export const DtSidangTipiring: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  hakAkses,
  wilayahBidang,
  konfirDel,
  theme,
}) => {
  const navigate = useNavigate()
  const GetHakAkses = ({row}: {row: number}) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)
    return <>{handleHakAkses?.nama_hak_akses}</>
  }

  var num = 1
  const columns = [
    {
      name: 'No',
      width: '80px',
      sortField: 'id',
      wrap: true,
      selector: (row: any) => row.no,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.no}</div>
      },
    },
    {
      name: 'Wilayah',
      wrap: true,
      center: false,
      width: '300px',
      sortField: 'wilayah',
      selector: (row: any) => row.wilayah,
    },
    {
      name: 'Jumlah Pelanggar',
      center: true,
      width: '300px',
      sortField: 'jumlah_pelanggar',
      selector: (row: any) => row.jumlah_pelanggar,
    },
    {
      name: 'Jumlah Pelanggar Tidak Hadir',
      center: true,
      width: '300px',
      sortField: 'jumlah_pelanggar_tidak_hadir',
      selector: (row: any) => row.jumlah_pelanggar_tidak_hadir,
    },
    {
      name: 'Verstek',
      center: true,
      width: '300px',
      sortField: 'verstek',
      selector: (row: any) => row.verstek,
    },
    {
      name: 'Denda Pengadilan',
      center: true,
      width: '300px',
      sortField: 'denda_pengadilan',
      selector: (row: any) => row.denda_pengadilan,
    },
  ]

  return (
    <div>
      <DataTable
        columns={columns}
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

export const DtSidangTipiringPerda: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  hakAkses,
  wilayahBidang,
  konfirDel,
  theme,
}) => {
  const navigate = useNavigate()
  const GetHakAkses = ({row}: {row: number}) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)
    return <>{handleHakAkses?.nama_hak_akses}</>
  }

  var num = 1
  const columns = [
    {
      name: 'No',
      width: '80px',
      sortField: 'id',
      wrap: true,
      selector: (row: any) => row.no,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.no}</div>
      },
    },
    {
      name: 'Wilayah',
      wrap: true,
      center: false,
      width: '300px',
      sortField: 'wilayah',
      selector: (row: any) => row.wilayah,
    },
    {
      name: 'Perda/Perkada Yang Dilanggar',
      center: true,
      width: '300px',
      sortField: 'perda_yang_dilanggar',
      selector: (row: any) => row.perda_yang_dilanggar,
    },
    {
      name: 'Jenis Tertib',
      center: true,
      width: '300px',
      sortField: 'jenis_tertib',
      selector: (row: any) => row.jenis_tertib,
    },
    {
      name: 'Jenis Pelanggaran',
      center: true,
      width: '300px',
      sortField: 'jenis_pelanggaran',
      selector: (row: any) => row.jenis_pelanggaran,
    },
    {
      name: 'Jenis Pasal',
      center: true,
      width: '300px',
      sortField: 'jenis_pasal',
      selector: (row: any) => row.jenis_pasal,
    },
    {
      name: 'Jenis Penertiban',
      center: true,
      width: '300px',
      sortField: 'jenis_penertiban',
      selector: (row: any) => row.jenis_penertiban,
    },
    {
      name: 'Jumlah Pelanggar',
      center: true,
      width: '300px',
      sortField: 'jumlah_pelanggar',
      selector: (row: any) => row.jumlah_pelanggar,
    },
    {
      name: 'Jumlah Pelanggar Tidak Hadir',
      center: true,
      width: '300px',
      sortField: 'jumlah_pelanggar_tidak_hadir',
      selector: (row: any) => row.jumlah_pelanggar_tidak_hadir,
    },
    {
      name: 'Verstek',
      center: true,
      width: '300px',
      sortField: 'verstek',
      selector: (row: any) => row.verstek,
    },
    {
      name: 'Hari dan Tangal Sidang',
      center: true,
      width: '300px',
      sortField: 'hari_tanggal_sidang',
      selector: (row: any) => row.hari_tanggal_sidang,
    },
  ]

  return (
    <div>
      <DataTable
        columns={columns}
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
