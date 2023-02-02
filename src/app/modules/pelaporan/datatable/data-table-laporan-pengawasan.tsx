import axios from 'axios'
import {FC, Fragment, useEffect, useState} from 'react'
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {RootState} from '../../../redux/store'
import {KTSVG} from '../../../../_metronic/helpers'
import {unparse} from 'papaparse'

export const API_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL
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

const unduhCSV = (data: any[]) => {
  const csvData = unparse(data)
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'LAPORAN PENGAWASAN.csv')
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export const DtKabid: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  hakAkses,
  wilayahBidang,
  theme,
}) => {
  const dispatch = useDispatch()

  const GetHakAkses = ({row}: {row: number}) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)

    return <>{handleHakAkses?.nama_hak_akses}</>
  }
  const GetBidang = ({row}: {row: number}) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)
    const handleBidang = wilayahBidang.find((i: any) => i.id === handleHakAkses?.wilayah_bidang)

    // console.log(handleHakAkses?.wilayah_bidang, handleBidang?.nama)
    return <>{handleBidang?.nama}</>
  }

  const GetStatusReklame = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(
          `${MASTERDATA_URL}/status-reklame/?%24filter=id%20eq%20${id}`
        )
        const result: string = data.data[0].nama
        setValData(result)
      }

      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

  const columns1 = [
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
      name: 'Pelaksana',
      wrap: true,
      width: '200px',
      selector: (row: any) => row.pelaksana,
      cell: (record: any) => <GetHakAkses row={parseInt(record.pelaksana)} />,
    },
    {
      name: 'Tanggal',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.tgl_pengecekan,
    },
    {
      name: 'Waktu',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.waktu_pengawasan,
    },
    {
      name: 'Wilayah',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.pelaksana,
      cell: (record: any) => <GetBidang row={parseInt(record.pelaksana)} />,
    },
    {
      name: 'Alamat',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.alamat,
    },
    {
      name: 'Status',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.status_reklame,
      cell: (record: any) => <GetStatusReklame row={parseInt(record.status_reklame)} />,
    },
    {
      name: 'Pemilik Reklame Konten Iklan',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.pemilik_reklame,
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
        onClick={() => unduhCSV(data)}>
          <>
          <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
            Unduh CSV
          </>
      </button>
      <DataTable
        columns={columns1}
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

export const DtAdmin: FC<any> = ({
  data,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  loading,
  // jenisKegiatanList,
  hakAkses,
  wilayahBidang,
  theme,
}) => {
  const navigate = useNavigate()

  const GetHakAkses = ({row}: {row: number}) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)

    return <>{handleHakAkses?.nama_hak_akses}</>
  }
  const GetBidang = ({row}: {row: number}) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)
    const handleBidang = wilayahBidang.find((i: any) => i.id === handleHakAkses?.wilayah_bidang)

    // console.log(handleHakAkses?.wilayah_bidang, handleBidang?.nama)
    return <>{handleBidang?.nama}</>
  }

  const GetStatusReklame = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(
          `${MASTERDATA_URL}/status-reklame/?%24filter=id%20eq%20${id}`
        )
        const result: string = data.data[0].nama
        setValData(result)
      }

      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

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
      name: 'Pelaksana',
      wrap: true,
      width: '200px',
      selector: (row: any) => row.pelaksana,
      cell: (record: any) => <GetHakAkses row={parseInt(record.pelaksana)} />,
    },
    {
      name: 'Tanggal',
      width: '140px',
      selector: (row: any) => row.tgl_pengecekan,
    },
    {
      name: 'Waktu',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.waktu_pengawasan,
    },
    {
      name: 'Wilayah',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.pelaksana,
      cell: (record: any) => <GetBidang row={parseInt(record.pelaksana)} />,
    },
    {
      name: 'Alamat',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.alamat,
    },
    {
      name: 'Status',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.status_reklame,
      cell: (record: any) => <GetStatusReklame row={parseInt(record.status_reklame)} />,
    },
    {
      name: 'Pemilik Reklame Konten Iklan',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.pemilik_reklame,
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
                // <>
                <DropdownType
                  as={ButtonGroup}
                  key={idx}
                  id={`dropdown-button-drop-${idx}`}
                  size='sm'
                  variant='light'
                  title='Aksi'
                >
                  <Dropdown.Item
                    onClick={() => navigate('/pelaporan/DetailLaporanPengawasan/' + record.id)}
                  >
                    Detail
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate('/pelaporan/ubah-laporan-pengawasan/' + record.id)}
                  >
                    Ubah
                  </Dropdown.Item>
                </DropdownType>
                // </>
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
        onClick={() => unduhCSV(data)}>
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
  // jenisKegiatanList,
  hakAkses,
  wilayahBidang,
  theme,
}) => {
  const navigate = useNavigate()
  const GetHakAkses = ({row}: {row: number}) => {
    const handleHakAkses = hakAkses.find((i: any) => i.id === row)

    return <>{handleHakAkses?.nama_hak_akses}</>
  }

  const GetStatusReklame = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(
          `${MASTERDATA_URL}/status-reklame/?%24filter=id%20eq%20${id}`
        )
        const result: string = data.data[0].nama
        setValData(result)
      }

      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

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
      name: 'Pelaksana',
      width: '140px',
      selector: (row: any) => row.pelaksana,
      cell: (record: any) => <GetHakAkses row={parseInt(record.pelaksana)} />,
    },
    {
      name: 'Tanggal',
      width: '140px',
      selector: (row: any) => row.tgl_pengecekan,
    },
    {
      name: 'Share Location',
      width: '140px',
      selector: (row: any) => row.share_location,
    },
    {
      name: 'Alamat',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.alamat,
    },
    {
      name: 'Status',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.status_reklame,
      cell: (record: any) => <GetStatusReklame row={parseInt(record.status_reklame)} />,
    },
    {
      name: 'Ukuran',
      width: '140px',
      wrap: true,
      selector: (row: any) => row.ukuran,
    },
    {
      name: 'Pemilik Reklame',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.pemilik_reklame,
    },
    {
      name: 'Latitude',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.lokasi_tiang,
    },
    {
      name: 'Longtitude',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.longtitude,
    },
    {
      name: 'Konstruksi Reklame',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.konstruksi_reklame,
    },
    {
      name: 'Konten Iklan',
      width: '200px',
      wrap: true,
      selector: (row: any) => row.konten_iklan,
    },
    {
      name: 'Aksi',
      sortable: false,
      text: 'Action',
      className: 'action',
      cell: (record: any) => {
        return (
          <Fragment>
            <button
              className='btn btn-primary btn-sm me-30'
              onClick={() => navigate('/pelaporan/DetailLaporanPengawasan/' + record.id)}
            >
              Detail
            </button>
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
        onClick={() => unduhCSV(data)}>
          <>
          <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
            Unduh CSV
          </>
      </button>
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
