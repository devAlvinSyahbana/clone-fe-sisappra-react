import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom'
import DataTable, {createTheme, ExpanderComponentProps} from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {KTSVG} from '../../../../../_metronic/helpers'
import moment from 'moment'
import Swal from 'sweetalert2'
import {useFormik, FormikHelpers} from 'formik'
import {Row} from 'react-bootstrap'
import * as Yup from 'yup'
import clsx from 'clsx'

// API
const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const AKSES_KONTROL_URL = `${API_URL}/manajemen-pengguna/akses-kontrol`
export const AKSES_KONTROL2_URL = `${API_URL}/manajemen-penggunaakses-kontrol`

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

const validatorForm = Yup.object().shape({
  modul: Yup.string().required('Wajib diisi'),
})

export function ManajemenSubModul() {
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
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

  // START::CRUD
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

  let number = 1
  // Kolom table
  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.serial,
    },
    {
      name: 'Nama Akses Kontrol',
      sortable: true,
      sortField: 'modul',
      selector: (row: any) => (row.level !== '' ? row.modul : (row.modul = '')),
    },
    {
      name: 'Aksi',
      sortable: false,
      text: 'Action',
      className: 'action',
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
                    <Dropdown.Item
                      onClick={() =>
                        navigate(`/apps/akses-kontrol/manajemen-permission/` + record.id, {
                          state: {id_akses: record.id, nama_modul: record.modul},
                        })
                      }
                    >
                      Manajemen Permission
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => doEdit(record.id)}>Ubah</Dropdown.Item>
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

  // START :: VIEW
  const location: any = useLocation()

  useEffect(() => {
    fetchUsers()
  }, [])

  const [nama, setNama] = useState<FormInput>()
  const {id} = useParams()

  const fetchUsers = async () => {
    setLoading(true)
    const value = await axios.get(`${AKSES_KONTROL_URL}/find-all`)
    const nama = await axios.get(`${AKSES_KONTROL_URL}/findone/${id}`)
    const currentMenu = nama.data.data.level + '-'
    const children = value.data.data.filter((item: any) => item.level.startsWith(currentMenu))
    // const currentMenu = location.state.parent + '-'
    // const children = value.data.data.filter((item: any) => item.level.startsWith(currentMenu))
    let items = children
    Array.from(items).forEach((item: any, index: any) => {
      item.serial = index + 1
    })

    setTemp(items)
    setTotalRows(items.length)
    console.log(location, children, currentMenu)
    setLoading(false)
    setNama(nama.data.data)
    setValuesFormik({level: currentMenu})
    return [temp, setTemp] as const
  }
  // END :: VIEW
  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }

  const [aksi, setAksi] = useState(0)
  const [valuesFormik, setValuesFormik] = useState<FormInput>()
  // const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})

  // ADD N UPDATE
  const formik = useFormik({
    initialValues: {
      ...valuesFormik,
    },
    validationSchema: validatorForm,
    enableReinitialize: true,
    onSubmit: async (values, {setSubmitting}: FormikHelpers<FormInput>) => {
      setSubmitting(true)
      try {
        if (aksi === 0) {
          const response = await axios.post(`${AKSES_KONTROL_URL}/create`, {...valuesFormik})
          if (response) {
            Swal.fire({
              icon: 'success',
              text: 'Data berhasil disimpan',
              showConfirmButton: false,
              timer: 1500,
            })
            handleClose()
            fetchUsers()
            setSubmitting(false)
          }
        } else {
          const response = await axios.put(`${AKSES_KONTROL2_URL}/update/${idEditData.id}`, {
            ...valuesFormik,
          })
          if (response) {
            Swal.fire({
              icon: 'success',
              text: 'Data berhasil disimpan',
              showConfirmButton: false,
              timer: 1500,
            })
            handleClose()
            fetchUsers()
            setSubmitting(false)
          }
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

  const doAdd = () => {
    setShow(true)
    setAksi(0)
    setValuesFormik({
      modul: '',
      level: location.state.parent + '-',
    })
  }
  const [idEditData, setIdEditData] = useState<{id: number}>({id: 0})
  // GET ID FOR UPDATE
  const getDetail = async (idparam: any) => {
    const {data} = await axios.get(`${AKSES_KONTROL_URL}/findone/${parseInt(idparam)}`)
    setIdEditData((prevstate) => ({
      ...prevstate,
      id: parseInt(idparam),
    }))
    setValuesFormik((prevstate) => ({
      ...prevstate,
      ...data.data,
    }))
  }

  const doEdit = (id: any) => {
    setShow(true)
    setAksi(1)
    getDetail(id)
  }
  // DELETE
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
          fetchUsers()
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
  // END::CRUD

  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className='row g-8 mt-2 ms-5 me-5'>
        <label>
          <h3>Manajemen Sub Modul {nama?.modul}</h3>
        </label>
        <div className='col d-flex justify-content-end'>
          <Link to=''>
            <button className='btn btn-primary me-2' onClick={doAdd}>
              <i className='fa-solid fa-plus'></i>
              Tambah Sub Modul
            </button>
          </Link>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>{aksi === 0 ? 'Tambah' : 'Ubah'} Sub Modul</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row mt-2 '>
              <form onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                  <Form.Label>Nama Akses Kontrol</Form.Label>
                  <Form.Control
                    name='modul'
                    className={clsx(
                      'form-control form-control-solid mb-1',
                      {
                        'is-invalid': formik.touched.modul && formik.errors.modul,
                      },
                      {
                        'is-valid': formik.touched.modul && !formik.errors.modul,
                      }
                    )}
                    onChange={handleChangeFormik}
                    value={valuesFormik?.modul}
                    placeholder='Masukkan Nama Akses Kontrol'
                  />
                  {formik.touched.modul && formik.errors.modul && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.modul}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className='form-group'>
                  <Form.Label>Level</Form.Label>
                  <Form.Control
                    name='level'
                    className={clsx(
                      'form-control form-control-solid mb-1',
                      {
                        'is-invalid': formik.touched.level && formik.errors.level,
                      },
                      {
                        'is-valid': formik.touched.level && !formik.errors.level,
                      }
                    )}
                    onChange={handleChangeFormik}
                    value={valuesFormik?.level}
                    placeholder='Masukkan Level Akses'
                  />
                  {formik.touched.level && formik.errors.level && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.level}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className='p-0 mt-6'>
                  <div className='text-center'>
                    <button
                      className='float-none btn btn-light align-self-center m-1'
                      onClick={handleClose}
                      type='button'
                    >
                      <i className='fa fa-close'></i>
                      Batal
                    </button>
                    <button
                      className='float-none btn btn-primary align-self-center m-1'
                      type='submit'
                    >
                      <i className='fa-solid fa-paper-plane'></i>
                      Simpan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
      <div className='table-responsive mt-5 ms-5 me-5 w'>
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
      <div className='col d-flex justify-content-center mb-10'>
        <button className='btn btn-light' onClick={() => navigate(-1)}>
          <i className='fa-solid fa-arrow-left' />
          Kembali
        </button>
      </div>
      {/* end::Body */}
    </div>
  )
}
