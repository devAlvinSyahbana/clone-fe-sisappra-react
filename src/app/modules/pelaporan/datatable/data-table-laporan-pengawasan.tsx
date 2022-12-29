import axios from 'axios'
import {Fragment, useEffect, useState} from 'react'
import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../redux/store'

export default function DtKabid(props: any) {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const dataPengawasReklame = () => {
    axios.get(`http://localhost:3002/reklame/`).then((res) => {
      const data = res.data.data.map((d: any) => ({
        no: d.id,
        pelaksana: d.id,
        waktu_pengawasan: d.waktu_pengawasan,
        kota: d.kota,
        status_reklame: d.status_reklame,
        pemilik_reklame: d.pemilik_reklame,
        alamat: d.alamat,
      }))
      setData(data)
    })
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
      selector: (row: any) => row.kota,
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
                    <Dropdown.Item href='#'>Detail</Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      // onClick={() => konfirDel(record.id, record.status_pegawai)}
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
      <DataTable columns={columns1} data={data} pagination />
    </div>
  )
}

export function DtAdmin(props: any) {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const dataPengawasReklame = () => {
    axios.get(`http://localhost:3002/reklame/`).then((res) => {
      const data = res.data.data.map((d: any) => ({
        no: d.id,
        pelaksana: d.id,
        waktu_pengawasan: d.waktu_pengawasan,
        kota: d.kota,
        status_reklame: d.status_reklame,
        pemilik_reklame: d.pemilik_reklame,
        alamat: d.alamat,
      }))
      setData(data)
    })
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
      selector: (row: any) => row.kota,
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
                    <Dropdown.Item href='#'>Detail</Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      // onClick={() => konfirDel(record.id, record.status_pegawai)}
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
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const dataPengawasReklame = () => {
    axios.get(`http://localhost:3002/reklame/`).then((res) => {
      
      const data = res.data.data.map((d: any) => ({
        no: d.id,
        pelaksana: d.id,
        status_reklame: d.status_reklame,
        pemilik_reklame: d.pemilik_reklame,
        alamat: d.alamat,
        tgl_pengecekan: d.tgl_pengecekan,
        lokasi_tiang: d.lokasi_tiang,
        share_location: d.share_location,
        ukuran: d.ukuran,
        konstruksi_reklame: d.konstruksi_reklame,
        konten_iklan: d.konten_iklan,
      }))
      setData(data)
    })
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
      selector: (row: any) => row.id,
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
                    <Dropdown.Item href='#'>Detail</Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      // onClick={() => konfirDel(record.id, record.status_pegawai)}
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
      <DataTable columns={columns} data={data} pagination />
    </div>
  )
}
