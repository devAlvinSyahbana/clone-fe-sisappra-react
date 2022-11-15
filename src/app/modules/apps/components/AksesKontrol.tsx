import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable, {createTheme} from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {ThemeModeComponent} from '../../../../_metronic/assets/ts/layout'
import {KTSVG} from '../../../../_metronic/helpers'
import moment from 'moment'
import Swal from 'sweetalert2'
import {useFormik} from 'formik'

// API
const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const AKSES_KONTROL_URL = `${API_URL}/manajemen-pengguna/akses-kontrol`

// Theme for dark or light interface
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

export interface FormInput {
  modul?: string
  level?: string
}

export function AksesKontrol() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [valFilterModul, setFilterModul] = useState({val: ''})

  const [data, setData] = useState([])
  const [temp, setTemp] = useState([])
  const [loading, setLoading] = useState(false)
  const [qParamFind, setUriFind] = useState({strparam: ''})
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

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

  const columns = [
    // {
    //   name: 'No',
    //   selector: (row: any) => row.id,
    //   sortable: true,
    //   sortField: 'id',
    // },
    {
      name: 'Nama Akses Kontrol',
      selector: (row: any) => row.modul,
      sortable: true,
      sortField: 'modul',
    },
    {
      name: 'Hak Akses Kode',
      selector: (row: any) => row.kode,
      sortable: true,
      sortField: 'kode',
    },
    // {
    //   name: 'HAK AKSES',
    //   selector: (row: any) => row.level,
    //   sortable: true,
    //   sortField: 'level',
    // },
    {
      name: 'TANGGAL BUAT',
      selector: (row: any) => moment(row.tanggal_buat).format('D MMMM YYYY'),
      sortable: true,
      sortField: 'tanggal_buat',
    },
    {
      name: 'Aksi',
      sortable: false,
      text: 'Action',
      className: 'action',
      align: 'left',
      cell: (record: any) => {
        return (
          <Fragment>
            <div className='mb-2'>
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
                    <Dropdown.Item>
                      <Link to='#'>Detail</Link>
                    </Dropdown.Item>
                    <Dropdown.Item href='#'>Ubah</Dropdown.Item>
                    <Dropdown.Item href='#' onClick={() => konfirDel(record.id)}>
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

  useEffect(() => {
    fetchUsers(1)
  }, [])

  const fetchUsers = async (page: any) => {
    setLoading(true)
    const value = await axios.get(`${AKSES_KONTROL_URL}/find`)

    setTemp(value.data.data)
    setTotalRows(value.data.total)
    console.log('cek response api real:', temp)
    setLoading(false)
    return [temp, setTemp] as const
    // setLoading(false)
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`
    )
    setData(response.data.data)

    setTotalRows(response.data.total)
    setLoading(false)
    console.log('cek dummy :', data)
    return [data, setData] as const
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (valFilterModul.val !== '') {
      uriParam += `&modul=${valFilterModul.val}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleFilterReset = () => {
    setFilterModul({val: ''})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const handleChangeInputModul = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterModul({val: event.target.value})
  }

  const konfirDel = (id: number) => {
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
        const response = await axios.delete(`${AKSES_KONTROL_URL}/delete/${id}`)
        if (response) {
          fetchUsers(1)
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

  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }

  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})

  const formik = useFormik({
    initialValues: {
      modul: '',
      level: '',
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        modul: valuesFormik?.modul ? valuesFormik.modul : '',
        level: valuesFormik?.level ? valuesFormik.level : '',
      }
      try {
        const response = await axios.post(`${AKSES_KONTROL_URL}/create`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/apps/akses-kontrol', {
            replace: true,
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'Data gagal disimpan, harap mencoba lagi',
          showConfirmButton: false,
          timer: 1500,
        })
        console.error(error)
      }
    },
  })

  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-10'>
          <label htmlFor='' className='mb-3'>
            Akses Kontrol
          </label>
          <input
            type='text'
            className='form-control form-control form-control-solid'
            name='modul'
            value={valFilterModul.val}
            onChange={handleChangeInputModul}
            placeholder='Cari Akses Kontrol'
          />
        </div>
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6 col-lg-6 col-sm-12'>
          <Link to='#' onClick={handleFilter}>
            <button className='btn btn-light-primary me-2'>
              <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-2' />
              Cari
            </button>
          </Link>
        </div>

        <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
          <Link to='#i'>
            <button className='btn btn-light-primary me-2' onClick={handleShow}>
              <i className='fa-solid fa-plus'></i>
              Tambah
            </button>
          </Link>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Akses Kontrol</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <div className='row mt-2'>
                <div className='col-4 mb-6'>
                  <div className='form-group'>
                    <Form.Label>Modul</Form.Label>
                    <Form.Control
                      name='modul'
                      className='form-control form-control-solid'
                      onChange={handleChangeFormik}
                      value={valuesFormik?.modul}
                    />
                  </div>
                </div>
              </div>
              <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                <Link to='/apps/detail-hak-akses/DetailHakAkses'>
                  <button className='btn btn-secondary'>
                    <i className='fa fa-close'></i>
                    Batal
                  </button>
                </Link>
                <button className='btn btn-primary' type='submit'>
                  <i className='fa-solid fa-paper-plane'></i>
                  Simpan
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
      <div className='table-responsive mt-5 ms-5 me-5'>
        <DataTable
          columns={columns}
          data={temp}
          // progressPending={loading}
          progressComponent={<LoadingAnimation />}
          pagination
          // paginationServer
          paginationTotalRows={totalRows}
          // onChangeRowsPerPage={handlePerRowsChange}
          // onChangePage={handlePageChange}
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
      {/* end::Body */}
    </div>
  )
}
