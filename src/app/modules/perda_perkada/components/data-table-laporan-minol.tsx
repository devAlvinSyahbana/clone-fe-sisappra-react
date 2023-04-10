import { FC, Fragment } from 'react'
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { useTable, Column } from 'react-table'
import { useNavigate } from 'react-router-dom'

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
  
  const GetHakAkses = ({ row }: { row: number }) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)
    return <>{handleHakAkses?.nama_hak_akses}</>
  }

  const GetBidang = ({ row }: { row: number }) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)
    const handleBidang = wilayahBidang.find((i: any) => i.id === handleHakAkses?.wilayah_bidang)
    return <>{handleBidang?.nama}</>
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
      name: 'Pelaksana Kegiatan',
      wrap: true,
      center: true,
      width: '300px',
      sortField: 'pelaksana_kegiatan',
      selector: (row: any) => row.pelaksana_kegiatan,
    },
    {
      name: 'Jumlah Minol',
      center: true,
      width: '150px',
      sortField: 'jumlah_minol',
      selector: (row: any) => row.jumlah_minol,
    },
    {
      name: 'Wine',
      center: true,
      width: '100px',
      sortField: 'wine',
      selector: (row: any) => row.wine,
    },
    {
      name: 'Bir',
      center: true,
      width: '100px',
      sortField: 'bir',
      selector: (row: any) => row.bir,
    },
    {
      name: 'Sake',
      center: true,
      width: '100px',
      sortField: 'sake',
      selector: (row: any) => row.sake,
    },
    {
      name: 'Gin',
      center: true,
      width: '100px',
      sortField: 'gin',
      selector: (row: any) => row.gin,
    },
    {
      name: 'Tequilla',
      center: true,
      width: '100px',
      sortField: 'tequilla',
      selector: (row: any) => row.tequilla,
    },
    {
      name: 'Brandy',
      center: true,
      width: '100px',
      sortField: 'brandy',
      selector: (row: any) => row.brandy,
    },
    {
      name: 'Wiski',
      center: true,
      width: '100px',
      sortField: 'wiski',
      selector: (row: any) => row.wiski,
    },
    {
      name: 'Vodka',
      center: true,
      width: '100px',
      sortField: 'vodka',
      selector: (row: any) => row.vodka,
    },
    {
      name: 'Rum',
      center: true,
      width: '100px',
      sortField: 'rum',
      selector: (row: any) => row.rum,
    },
    {
      name: 'Soju',
      center: true,
      width: '100px',
      sortField: 'soju',
      selector: (row: any) => row.soju,
    },
    {
      name: 'Anggur',
      center: true,
      width: '100px',
      sortField: 'anggur',
      selector: (row: any) => row.anggur,
    },
    {
      name: 'Absinth',
      center: true,
      width: '100px',
      sortField: 'absinth',
      selector: (row: any) => row.absinth,
    },
    {
      name: 'Lainnya',
      center: true,
      width: '100px',
      sortField: 'lainnya',
      selector: (row: any) => row.lainnya,
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