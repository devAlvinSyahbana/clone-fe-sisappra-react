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

export const DtPerdaPerkada: FC<any> = ({
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
      name: 'Jenis Penertiban',
      wrap: true,
      center: true,
      width: '300px',
      sortField: 'jenis_penertiban',
      selector: (row: any) => row.jenis_penertiban,
    },
    {
      name: 'Jumlah Pelanggaran',
      center: true,
      width: '200px',
      sortField: 'jumlah_pelanggaran',
      selector: (row: any) => row.jumlah_pelanggaran,
    },
    {
      name: 'Peringatan',
      center: true,
      width: '150px',
      sortField: 'peringatan',
      selector: (row: any) => row.peringatan,
    },
    {
      name: 'Penutupan/Penyegelan',
      center: true,
      width: '200px',
      sortField: 'penutupan_penyegelan',
      selector: (row: any) => row.penutupan_penyegelan,
    },
    {
      name: 'Pencabutan Izin',
      center: true,
      width: '150px',
      sortField: 'pencabutan_izin',
      selector: (row: any) => row.pencabutan_izin,
    },
    {
      name: 'Yang Lain',
      center: true,
      width: '150px',
      sortField: 'yang_lain',
      selector: (row: any) => row.yang_lain,
    },
    {
      name: 'Yustisi',
      center: true,
      width: '300px',
      sortField: 'denda_pengadilan',
      selector: (row: any) => row.denda_pengadilan,
    },
    {
      name: 'Non Pengadilan',
      center: true,
      width: '300px',
      sortField: 'denda_non_pengadilan',
      selector: (row: any) => row.denda_non_pengadilan,
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

export const DtPerdaPerkadaPelaksana: FC<any> = ({
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

  var num = 1
  const columns = [
    {
      name: 'No',
      width: '80px',
      sortField: 'id',
      wrap: true,
      selector: (row: any) => row.serial,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      },
    },
    {
      name: 'Pelaksana Kegiatan',
      wrap: true,
      width: '300px',
      center: true,
      selector: (row: any) => row.pelaksana,
      cell: (record: any) => <GetHakAkses row={parseInt(record.pelaksana)} />,
    },
    {
      name: 'Jumlah Pelanggaran',
      center: true,
      width: '200px',
      sortField: 'total_item',
      selector: (row: any) => row.total_item,
    },
    {
      name: 'Peringatan',
      center: true,
      width: '150px',
      sortField: 'total_item',
      selector: (row: any) => row.total_item,
    },
    {
      name: 'Penutupan/Penyegelan',
      center: true,
      width: '200px',
      sortField: 'total_item',
      selector: (row: any) => row.total_item,
    },
    {
      name: 'Pencabutan Izin',
      center: true,
      width: '150px',
      sortField: 'total_item',
      selector: (row: any) => row.total_item,
    },
    {
      name: 'Yang Lain',
      center: true,
      width: '150px',
      sortField: 'total_item',
      selector: (row: any) => row.total_item,
    },
    {
      name: 'Yustisi',
      center: true,
      width: '300px',
      sortField: 'total_item',
      selector: (row: any) => row.total_item,
    },
    {
      name: 'Non Pengadilan',
      center: true,
      width: '300px',
      sortField: 'total_item',
      selector: (row: any) => row.total_item,
    },
    {
      name: 'Aksi',
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
                    onClick={() => navigate('/pelaporan/DetailLaporanKegiatan/' + record.id)}
                  >
                    Detail
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate('/pelaporan/UbahLaporanKegiatan/' + record.id)}
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
