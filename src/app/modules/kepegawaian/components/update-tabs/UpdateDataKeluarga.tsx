import {useEffect, Fragment, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import DataTable, {createTheme} from 'react-data-table-component'
import {ButtonGroup, Dropdown, DropdownButton, Modal} from 'react-bootstrap'
import {UpdateHeaderDetail} from './UpdateHeaderDetail'
import axios from 'axios'
import moment from 'moment'
import {useFormik, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/informasi-data-pegawai`

// createTheme creates a new theme named solarized that overrides the build in dark theme
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

const validatorForm = Yup.object().shape({
  hubungan: Yup.string().required('Wajib diisi'),
  nama: Yup.string().required('Wajib diisi'),
  jenis_kelamin: Yup.string().required('Wajib diisi'),
})

export interface FormInput {
  hubungan?: string
  nama?: string
  tempat_lahir?: string
  tgl_lahir?: string
  jenis_kelamin?: string
  id_pegawai?: number
  id?: number | undefined
}

export function UpdateDataKeluarga() {
  const {id, status} = useParams()
  const {mode} = useThemeMode()
  const [loading, setLoading] = useState(false)
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [data, setData] = useState({dt: []})
  const columns = [
    {
      name: 'Nama',
      selector: (row: any) => row.nama,
      sortable: true,
    },
    {
      name: 'Hubungan Keluarga',
      selector: (row: any) => row.hubungan,
      sortable: true,
    },
    {
      name: 'Tempat, Tanggal Lahir',
      sortable: false,
      cell: (record: any) => {
        return `${record.tempat_lahir}, ${moment(record.tgl_lahir).format('D MMMM YYYY')}`
      },
    },
    {
      name: 'Jenis Kelamin',
      selector: (row: any) => row.jenis_kelamin,
      sortable: true,
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
                    <Dropdown.Item onClick={() => doEdit(record.id)}>Ubah</Dropdown.Item>
                    <Dropdown.Item onClick={() => konfirDel(record.id)}>Hapus</Dropdown.Item>
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

  const NoDataComponent = (props: any) => {
    return (
      <>
        <div className='alert d-flex flex-center flex-column py-10 px-10 px-lg-20 mb-10'>
          <span className='svg-icon svg-icon-5tx mb-5'>
            <KTSVG path='/media/icons/duotune/files/fil024.svg' className='svg-icon-2' />
          </span>
          <div className='text-center'>
            <h5 className='fw-bolder fs-3 mb-5'>Data tidak ditemukan . . .</h5>
          </div>
        </div>
      </>
    )
  }

  useEffect(() => {
    async function fetchDT() {
      setLoading(true)
      const response = await axios.get(`${KEPEGAWAIAN_URL}/find-data-keluarga/${id}/${status}`)
      setData((prevstate) => ({...prevstate, dt: response.data.data}))
      setLoading(false)
    }
    fetchDT()
  }, [id, status])

  const fetchData = async () => {
    setLoading(true)
    const response = await axios.get(`${KEPEGAWAIAN_URL}/find-data-keluarga/${id}/${status}`)
    setData((prevstate) => ({...prevstate, dt: response.data.data}))
    setLoading(false)
  }

  const [aksi, setAksi] = useState(0)
  const [valuesFormik, setValuesFormik] = useState<FormInput>()

  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }

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
          // aksi tambah
          const response = await axios.post(
            `${KEPEGAWAIAN_URL}/create-keluarga-${status !== 'PNS' ? 'non-PNS' : 'PNS'}`,
            {...valuesFormik, id_pegawai: id}
          )
          if (response) {
            Swal.fire({
              icon: 'success',
              text: 'Data berhasil disimpan',
              showConfirmButton: false,
              timer: 1500,
            })
            handleClose()
            fetchData()
            setSubmitting(false)
          }
        } else {
          // aksi ubah
          const response = await axios.put(
            `${KEPEGAWAIAN_URL}/update-keluarga-${status !== 'PNS' ? 'non-PNS' : 'PNS'}/${
              idEditData.id
            }`,
            {...valuesFormik, id_pegawai: id}
          )
          if (response) {
            Swal.fire({
              icon: 'success',
              text: 'Data berhasil disimpan',
              showConfirmButton: false,
              timer: 1500,
            })
            handleClose()
            fetchData()
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
        setSubmitting(false)
      }
    },
  })

  const doAdd = () => {
    setShow(true)
    setAksi(0)
    setValuesFormik({
      hubungan: '',
      nama: '',
      tempat_lahir: '',
      tgl_lahir: '',
      jenis_kelamin: '',
    })
  }

  const konfirDel = (idparam: any) => {
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
        const response = await axios.delete(
          `${KEPEGAWAIAN_URL}/delete-keluarga-${status !== 'PNS' ? 'non-PNS' : 'PNS'}/${parseInt(
            idparam
          )}`
        )
        if (response) {
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil dihapus',
            showConfirmButton: false,
            timer: 1500,
            color: '#000000',
          })
          fetchData()
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

  const [idEditData, setIdEditData] = useState<{id: number}>({id: 0})
  const getDetail = async (idparam: any) => {
    const {data} = await axios.get(
      `${KEPEGAWAIAN_URL}/findone-data-keluarga/${parseInt(idparam)}/${status}`
    )
    setIdEditData((prevstate) => ({
      ...prevstate,
      id: parseInt(idparam),
    }))
    setValuesFormik((prevstate) => ({
      ...prevstate,
      ...data.data,
      tgl_lahir: moment(data.data.tgl_lahir).format('YYYY-MM-D'),
    }))
  }

  const doEdit = (id: any) => {
    setShow(true)
    setAksi(1)
    getDetail(id)
  }

  return (
    <div>
      {/* begin::Body */}
      <UpdateHeaderDetail />
      {/* Second Card */}
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bold m-0'>Data Keluarga</h3>
          </div>
        </div>
        <div className='card-body p-9'>
          <div className='d-flex justify-content-end'>
            <button type='button' className='btn btn-primary me-2' onClick={doAdd}>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Tambah
            </button>
          </div>
          <DataTable
            className='mt-4'
            progressPending={loading}
            progressComponent={<LoadingAnimation />}
            columns={columns}
            data={data.dt}
            pagination
            customStyles={customStyles}
            theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
            noDataComponent={<NoDataComponent />}
          />

          <Modal
            size='lg'
            show={show}
            onHide={handleClose}
            aria-labelledby='example-modal-sizes-title-lg'
            backdrop='static'
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id='example-modal-sizes-title-lg'>
                {aksi === 0 ? 'Tambah' : 'Ubah'} Data Keluarga
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className='form' onSubmit={formik.handleSubmit}>
                <div
                  className='d-flex flex-column scroll-y me-n7 pe-7'
                  id='kt_modal_add_user_scroll'
                  data-kt-scroll='true'
                  data-kt-scroll-activate='{default: false, lg: true}'
                  data-kt-scroll-max-height='auto'
                  data-kt-scroll-dependencies='#kt_modal_add_user_header'
                  data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
                  data-kt-scroll-offset='300px'
                >
                  <div className='fv-row mb-7'>
                    <label className='required fw-semibold fs-6 mb-2'>Nama</label>
                    <input
                      type='text'
                      name='nama'
                      placeholder='Nama'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': formik.touched.nama && formik.errors.nama,
                        },
                        {
                          'is-valid': formik.touched.nama && !formik.errors.nama,
                        }
                      )}
                      onChange={handleChangeFormik}
                      value={valuesFormik?.nama}
                    />
                    {formik.touched.nama && formik.errors.nama && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.nama}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='fv-row mb-7'>
                    <label className='required fw-semibold fs-6 mb-2'>Hubungan Keluarga</label>
                    <input
                      type='text'
                      name='hubungan'
                      placeholder='Hubungan Keluarga'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': formik.touched.hubungan && formik.errors.hubungan,
                        },
                        {
                          'is-valid': formik.touched.hubungan && !formik.errors.hubungan,
                        }
                      )}
                      onChange={handleChangeFormik}
                      value={valuesFormik?.hubungan}
                    />
                    {formik.touched.hubungan && formik.errors.hubungan && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.hubungan}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='fv-row mb-7'>
                    <div id='kt_docs_repeater_basic'>
                      <div className='fv-row mb-7 mt-7'>
                        <label className='required fw-semibold fs-6 mb-2'>Jenis Kelamin</label>
                        <select
                          data-control='select2'
                          data-placeholder='Jenis Kelamin'
                          name='jenis_kelamin'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid':
                                formik.touched.jenis_kelamin && formik.errors.jenis_kelamin,
                            },
                            {
                              'is-valid':
                                formik.touched.jenis_kelamin && !formik.errors.jenis_kelamin,
                            }
                          )}
                          onChange={handleChangeFormik}
                          value={valuesFormik?.jenis_kelamin}
                        >
                          <option value=''>Pilih</option>
                          <option value='L'>Laki-laki</option>
                          <option value='P'>Perempuan</option>
                        </select>
                        {formik.touched.jenis_kelamin && formik.errors.jenis_kelamin && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.jenis_kelamin}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='form-group'>
                        <div data-repeater-list='kt_docs_repeater_basic'>
                          <div data-repeater-item>
                            <div className='form-group row'>
                              <label className='form-label'>Tempat, Tanggal Lahir</label>
                              <div className='col-4'>
                                <input
                                  type='text'
                                  className='form-control form-control-solid mb-3 mb-lg-0'
                                  placeholder='Tempat'
                                  name='tempat_lahir'
                                  onChange={handleChangeFormik}
                                  value={valuesFormik?.tempat_lahir}
                                />
                              </div>
                              <div className='col-8'>
                                <input
                                  type='date'
                                  className='form-control form-control-solid'
                                  placeholder='Tanggal Lahir'
                                  name='tgl_lahir'
                                  onChange={handleChangeFormik}
                                  value={valuesFormik?.tgl_lahir}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='p-0 mt-6'>
                  <div className='text-center'>
                    <button
                      type='button'
                      onClick={handleClose}
                      className='float-none btn btn-light align-self-center m-1'
                    >
                      Tutup
                    </button>
                    <button
                      type='submit'
                      className='float-none btn btn-primary align-self-center m-1'
                      disabled={formik.isSubmitting || !formik.isValid}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          <div className='p-0 mt-6'>
            <div className='text-center'>
              <Link
                className='text-reset text-decoration-none'
                to='/kepegawaian/informasi-data-pegawai'
              >
                <button className='float-none btn btn-light align-self-center m-1'>Batal</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}
