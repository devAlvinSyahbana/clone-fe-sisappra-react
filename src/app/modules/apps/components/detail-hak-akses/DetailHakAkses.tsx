import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import DataTable, {createTheme} from 'react-data-table-component'
import {Link, useNavigate} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import moment from 'moment'
import {KTSVG} from '../../../../../_metronic/helpers'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import Accordion from 'react-bootstrap/Accordion'

createTheme(
  'darkMetro',
  {
    text: {
      primary: '#92929f',
      secondary: '#92929f',
    },
    background: {
      default: '#1e1e2e',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#2b2c41',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  },
  'dark'
)
const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

const reactSelectLightThem = {
  input: (base: object) => ({
    ...base,
    color: '#5e6278',
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
  container: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    color: '#cccccc',
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: '#cccccc',
  }),
  control: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
    boxShadow: '0 0 0 1px #f5f8fa',
  }),
  singleValue: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
  }),
  option: (base: object) => ({
    ...base,
    height: '100%',
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
}

const reactSelectDarkThem = {
  input: (base: object) => ({
    ...base,
    color: '#92929f',
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
  container: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    color: '#92929f',
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: '#92929f',
  }),
  control: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
    boxShadow: '0 0 0 1px #1b1b29',
  }),
  singleValue: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
  }),
  option: (base: object) => ({
    ...base,
    height: '100%',
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
}

export interface JumlahPengguna {
  total_data?: number
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const SARANA_PRASARANA_URL = `${API_URL}/sarana-prasarana` //http://localhost:3000/sarana-prasarana
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`

export function DetailHakAkses() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [valNamaLengkap, setFilterNamaLengkap] = useState({val: ''})
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [jumlah_Pengguna, setJumlahPengguna] = useState<JumlahPengguna>()
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

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [qParamFind, setUriFind] = useState({strparam: ''})

  const [temp, setTemp] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const jumlah_Pengguna = await axios.get(
        `${MANAJEMEN_PENGGUNA_URL}/hak-akses/count-total-data`
      )

      setJumlahPengguna(jumlah_Pengguna.data.data)
    }
    fetchDT(1)
    fetchData()
  }, [qParamFind, perPage])
  async function fetchDT(page: number) {
    setLoading(true)
    const response = await axios.get(
      `${MANAJEMEN_PENGGUNA_URL}/filter-data-pengguna?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setTotalRows(response.data.total_data)
    setLoading(false)
  }

  const fetchData = async (page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${MANAJEMEN_PENGGUNA_URL}/filter-data-pengguna?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setTotalRows(response.data.total_data)
    setLoading(false)

    return [data, setData] as const
  }

  const handlePageChange = (page: number) => {
    fetchData(page)
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${MANAJEMEN_PENGGUNA_URL}/filter-data-pengguna?limit=${newPerPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }
  const handleSort = (column: any, sortDirection: any) => {
    // simulate server sort
    console.log(column, sortDirection)
    setLoading(true)

    // instead of setTimeout this is where you would handle your API call.
  }

  const konfirDel = (id: number, hak_akses: number) => {
    Swal.fire({
      text: 'Anda yakin ingin menghapus data ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya!',
      cancelButtonText: 'Tidak!',
      color: '#000000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const bodyParam = {
          data: {
            hak_akses: 0,
            deleted_by: 0,
          },
        }
        const response = await axios.delete(`${MANAJEMEN_PENGGUNA_URL}delete/${id}`, bodyParam)
        if (response) {
          fetchData(1)
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil dihapus',
            showConfirmButton: false,
            timer: 1500,
            color: '#000000',
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Data gagal dihapus, harap mencoba lagi',
            showConfirmButton: false,
            timer: 1500,
            color: '#000000',
          })
        }
      }
    })
  }
  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (valNamaLengkap.val !== '') {
      uriParam += `&nama_lengkap=${valNamaLengkap.val}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }
  const handleChangeInputNamaLengkap = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterNamaLengkap({val: event.target.value})
  }

  var num = 1
  const columns = [
    {
      name: 'ID',
      selector: (row: any) => row.id,
      sortable: true,
      sortField: 'id',
      wrap: true,
      center: true,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.id !== 'Jumlah Keseluruhan' ? num++ : ''}</div>
      },
    },
    {
      name: 'Pengguna',
      selector: (row: any) => row.nama_lengkap,
      sortField: 'nama_lengkap',
      sortable: true,
      minWidth: '200px',
      wrap: true,
      cell: (record: any) => {
        return (
          <Fragment>
            <div className='d-flex align-items-center'>
              {/* begin:: Avatar */}
              <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                {record?.foto !== '' ? (
                  <div className='symbol-label'>
                    <img
                      src={`${API_URL}/${record?.foto}`}
                      alt={record?.nama_lengkap}
                      className='w-100'
                    />
                  </div>
                ) : (
                  <div className={clsx('symbol-label fs-3', `bg-light-primary`, `text-primary`)}>
                    {record?.nama_lengkap.charAt(0)}
                  </div>
                )}
              </div>
              <div className='d-flex flex-column'>
                <span>{record?.nama_lengkap}</span>
              </div>
            </div>
          </Fragment>
        )
      },
    },
    {
      name: 'Tanggal Bergabung',
      sortable: true,
      sortField: 'tgl_bergabung',
      selector: (row: any) => moment(row.tgl_bergabung).format('D MMMM YYYY'),
      wrap: true,
      center: true,
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
                      href='#'
                      onClick={() =>
                        navigate('/apps/update-hak-akses/UpdateHakAkses/' + record.id, {
                          replace: true,
                        })
                      }
                    >
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      onClick={() => konfirDel(record.id, record.nama_lengkap)}
                    >
                      Hapus
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
    <>
      <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-9'>
        <div className='col-md-2'>
          <div className='card card-flush h-md-30'>
            <div className='card-header'>
              <div className='card-title'>
                <h2>PENGADMINISTRASI UMUM KOTA ADMINIS TRASI JAKARTA PUSAT KECAMATAN GAMBIR</h2>
              </div>
            </div>

            <div className='card-body pt-1'></div>
            <div className='card-footer flex-wrap pt-0'>
              <button onClick={handleShow} className='btn btn-light btn-active-light-primary my-1'>
                Ubah Hak Akses
              </button>
            </div>
          </div>
        </div>

        <Modal
          size='xl'
          show={show}
          aria-labelledby='example-modal-sizes-title-lg'
          backdrop='static'
          keyboard={false}
          centered
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Ubah Hak Akses</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-10 form-control-solid'>
              <Form.Label>Nama Hak Akses</Form.Label>
              <Form.Control type='text' placeholder='Masukkan Tex' />
            </Form.Group>
            {['checkbox'].map((type) => (
              <div className='fv-row'>
                <label className='fs-5 fw-bold form-label mb-2'>Akses Kontrol</label>
                <div className='table-responsive'>
                  <table className='table align-middle table-row-dashed fs-6 gy-5'>
                    <tbody className='text-gray-600 fw-semibold'>
                      {/* Dashboard */}
                      <Accordion defaultActiveKey='0'>
                        <Accordion.Item eventKey='1'>
                          <Accordion.Header>
                            <h3>Dashboard</h3>
                          </Accordion.Header>
                          <Accordion.Body>
                            <tr>
                              <td className='text-gray-800'>
                                <h3>Dashboard</h3>
                              </td>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='card-title m-0'>Dashboard Kepegawaian</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Dashboard Sarana & Prasarana</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>
                                Dashboard Penegakan Perda dan Perkada
                              </h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>
                                Dashboard Ketentraman dan Ketertiban Umum
                              </h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>
                                Dashboard Wasdak Protokol Kesehatan(PPKM)
                              </h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Dashboard Peta Titik Rawan</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Dashboard Peta Titik Reklame</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Dashboard Ploting Anggota</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      {/* end Dashboard */}
                      {/* Pelaporan */}
                      <Accordion defaultActiveKey='0'>
                        <Accordion.Item eventKey='1'>
                          <Accordion.Header>
                            <h3>Pelaporan</h3>
                          </Accordion.Header>
                          <Accordion.Body>
                            <tr>
                              <td className='text-gray-800'>
                                <h3>Pelaporan</h3>
                              </td>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Laporan Kegiatan</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Tambah</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Edit</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Hapus</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Laporan Kejadian</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Tambah</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Edit</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Hapus</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Laporan Pengawasan</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Tambah</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Edit</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Hapus</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Laporan Tamu Daerah</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Tambah</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Edit</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Hapus</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      {/* Kepegawai */}
                      <Accordion defaultActiveKey='0'>
                        <Accordion.Item eventKey='1'>
                          <Accordion.Header>
                            <h3>Kepegawai</h3>
                          </Accordion.Header>
                          <Accordion.Body>
                            <tr>
                              <td className='text-gray-800'>
                                <h3>Kepegawai</h3>
                              </td>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Informasi Data Pegawai</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Tambah</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Unduh</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Hirarki Pegawai</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Tambah</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Edit</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Hapus</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Unduh</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Laporan Rekapitulasi Pegawai</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Laporan Rekapitulasi Pegawai</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Unduh</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Daftar Urut Kepegawain</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Tambah</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Hapus</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Unduh</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>
                                Rekapitulasi Data Pegawai yang Pensiun
                              </h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Unduh</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>
                                Rekapitulasi Data Pegawai yang Naik Pangkat
                              </h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Tambah</span>
                                  </label>

                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Unduh</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>
                                Rekapitulasi Data Pegawai Pejabat Struktural
                              </h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Unduh</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>
                                Rekapitulasi Data Pejabat Fungsional Pol PP (JFT)
                              </h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Unduh</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Penyidik Pegawai Negri Sipil (PPNS)</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Kehadiran Pegawai</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Tambah</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Edit</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Hapus</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Jadwal Piket</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Tambah</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Edit</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Hapus</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      {/* Sarana & Prasarana */}
                      <Accordion defaultActiveKey='0'>
                        <Accordion.Item eventKey='1'>
                          <Accordion.Header>
                            <h3>Sarana & Prasarana</h3>
                          </Accordion.Header>
                          <Accordion.Body>
                            <tr>
                              <td className='text-gray-800'>
                                <h3>Sarana & Prasarana</h3>
                              </td>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <h5 className='text-gray-800'>Laporan Sarana & Prasarana</h5>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Akses</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Tambah</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Edit</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Hapus</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Unduh</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      {/* Master */}
                      <Accordion defaultActiveKey='0'>
                        <Accordion.Item eventKey='1'>
                          <Accordion.Header>
                            <h3>Master</h3>
                          </Accordion.Header>
                          <Accordion.Body>
                            <tr>
                              <td className='text-gray-800'>Master</td>
                              <td>
                                <div className='d-flex'>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Lihat</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Tambah</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Edit</span>
                                  </label>
                                  <label className='form-check form-check-custom form-check-solid'>
                                    <Form.Check inline id={`inline-${type}-1`} />
                                    <span className='form-check-label'>Hapus</span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleClose}>
              <i className='fa-solid fa-paper-plane'></i>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div className='card'>
            <label className=' m-9'>
              <h2>
                Pengguna Terdaftar ({/* Jumlah Pengguna */}
                {jumlah_Pengguna?.total_data !== 0
                  ? jumlah_Pengguna?.total_data
                  : 'Tidak Ada Pengguna'}
                {/* End jumlah */})
              </h2>
            </label>
            <div className='col-6 mt-1'>
              <Link className='text-reset text-decoration-none' to={`/apps/hak-akses`}>
                <button className='float-none btn btn-secondary align-self-center m-12'>
                  <i className='fa-solid fa-arrow-left '></i>
                  Kembali
                </button>
              </Link>
            </div>
            <div className='card card-flush h-xl-100'>
              <div className='card-header border-1 pt-6'>
                <div className='col-xl-12 mb-xl-12 mt-2'>
                  <div className='accordion accordion-icon-toggle' id='kt_accordion_2'>
                    <div className='mb-5'>
                      <div
                        className='accordion-header py-3 d-flex'
                        data-bs-toggle='collapse'
                        data-bs-target='#kt_accordion_2_item_1'
                      >
                        <span className='accordion-icon'>
                          <span className='svg-icon svg-icon-4'>
                            <svg
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <rect
                                opacity='0.5'
                                x='18'
                                y='13'
                                width='13'
                                height='2'
                                rx='1'
                                transform='rotate(-180 18 13)'
                                fill='currentColor'
                              />
                              <path
                                d='M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z'
                                fill='currentColor'
                              />
                            </svg>
                          </span>
                        </span>
                        <h3 className='fs-4 fw-semibold mb-0 ms-4'>Pilihan Filter</h3>
                      </div>
                      <div
                        id='kt_accordion_2_item_1'
                        className='fs-6 collapse show ps-10'
                        data-bs-parent='#kt_accordion_2'
                      >
                        <div id='kt_advanced_search_form'>
                          <div className='row g-2 mt-2'>
                            <div className='col-xxl-20 col-lg-4 col-md-20 col-sm-12'>
                              <input
                                type='text'
                                className='form-control form-control form-control-solid'
                                name='nama'
                                value={valNamaLengkap.val}
                                onChange={handleChangeInputNamaLengkap}
                                placeholder='Masukkan Nama'
                              />
                            </div>
                          </div>
                        </div>
                        <div className='row g-8 mt-2'>
                          <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                            <Link to='#' onClick={handleFilter}>
                              <button className='btn btn-light-primary me-2'>
                                <KTSVG
                                  path='/media/icons/duotune/general/gen021.svg'
                                  className='svg-icon-2'
                                />
                                Cari
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-100px'
                style={{}}
                data-theme='light'
              ></div>

              <div className='card-body mt-n20'>
                <div className='mt-n20 position-relatve'>
                  <div className='card border card-flush h-xl-100'>
                    <div className='table-responsive mt-5 ms-5 me-5 w'>
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
                        customStyles={customStyles}
                        theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                        noDataComponent={
                          <div className='alert alert-primary d-flex align-items-center p-5 mt-10 mb-10'>
                            <div className='d-flex flex-column'>
                              <h5 className='mb-1 text-center'>Data tidak ditemukan..!</h5>
                            </div>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end::Body */}
        </div>
      </div>
    </>
  )
}
