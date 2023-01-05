import axios from 'axios'
import {FC, Fragment, useEffect, useState} from 'react'
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {RootState} from '../../../redux/store'

export const API_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL
export const DtKabid: FC<any> = ({
  // data,
  // totalRows,
  // handlePerRowsChange,
  // handlePageChange,
  // loading,
  // jenisKegiatanList,
  hakAkses,
  wilayahBidang,
}) => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const dataPengawasReklame = () => {
    axios.get(`http://localhost:3002/reklame/`).then((res) => {
      const data = res.data.data.map((d: any) => ({
        id: d.id,
        no: d.id,
        pelaksana: d.pelaksana,
        waktu_pengawasan: d.waktu_pengawasan,
        kota: d.kota,
        status_reklame: d.status_reklame,
        pemilik_reklame: d.pemilik_reklame,
        alamat: d.alamat,
        tgl_pengecekan: d.tgl_pengecekan,
      }))
      setData(data)
    })
  }
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
          `http://127.0.0.1:3001/status-reklame/?%24filter=id%20eq%20${id}`
        )
        const result: string = data.data[0].nama
        setValData(result)
      }

      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

  useEffect(() => {
    dataPengawasReklame()
  }, [])

  const columns1 = [
    {
      name: 'No',
      width: '60px',
      selector: (row: any) => row.no,
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
      <DataTable columns={columns1} data={data} pagination />
    </div>
  )
}

export const DtAdmin: FC<any> = ({
  // data,
  // totalRows,
  // handlePerRowsChange,
  // handlePageChange,
  // loading,
  // jenisKegiatanList,
  hakAkses,
  wilayahBidang,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState([])

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

  const dataPengawasReklame = () => {
    axios.get(`http://localhost:3002/reklame/`).then((res) => {
      const data = res.data.data.map((d: any) => ({
        no: d.id,
        id: d.id,
        pelaksana: d.pelaksana,
        waktu_pengawasan: d.waktu_pengawasan,
        kota: d.kota,
        status_reklame: d.status_reklame,
        pemilik_reklame: d.pemilik_reklame,
        alamat: d.alamat,
        tgl_pengecekan: d.tgl_pengecekan,
      }))
      setData(data)
    })
  }
  const GetStatusReklame = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(
          `http://127.0.0.1:3001/status-reklame/?%24filter=id%20eq%20${id}`
        )
        const result: string = data.data[0].nama
        setValData(result)
      }

      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

  useEffect(() => {
    dataPengawasReklame()
  }, [])

  const columns2 = [
    {
      name: 'No',
      width: '60px',
      selector: (row: any) => row.no,
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
                <>
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
                </>
              ))}
            </div>
          </Fragment>
        )
      },
    },
  ]

  return (
    <div>
      <DataTable columns={columns2} data={data} pagination />
    </div>
  )
}

export function DtPimpinan(props: any) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const dataPengawasReklame = () => {
    axios.get(`http://localhost:3002/reklame/`).then((res) => {
      const data = res.data.data.map((d: any) => ({
        no: d.id,
        id: d.id,
        pelaksana: d.pelaksana,
        status_reklame: d.status_reklame,
        pemilik_reklame: d.pemilik_reklame,
        alamat: d.alamat,
        tgl_pengecekan: d.tgl_pengecekan,
        lokasi_tiang: d.lokasi_tiang,
        share_location: d.share_location,
        ukuran: d.ukuran,
        konstruksi_reklame: d.konstruksi_reklame,
        konten_iklan: d.konten_iklan,
        longtitude: d.longtitude,
      }))
      setData(data)
    })
  }

  const GetStatusReklame = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(
          `http://127.0.0.1:3001/status-reklame/?%24filter=id%20eq%20${id}`
        )
        const result: string = data.data[0].nama
        setValData(result)
      }

      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

  useEffect(() => {
    dataPengawasReklame()
  }, [])

  const columns = [
    {
      name: 'No',
      width: '60px',
      selector: (row: any) => row.no,
    },
    {
      name: 'Pelaksana',
      width: '140px',
      selector: (row: any) => row.pelaksana,
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
      <DataTable columns={columns} data={data} pagination />
    </div>
  )
}
