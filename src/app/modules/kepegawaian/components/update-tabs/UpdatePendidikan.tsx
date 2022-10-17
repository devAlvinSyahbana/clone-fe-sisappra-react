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
import AsyncSelect from 'react-select/async'
import Form from 'react-bootstrap/Form'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/informasi-data-pegawai`
export const MASTER_URL = `${API_URL}/master`

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
  jenis_pendidikan: Yup.object().shape({
    value: Yup.string().required('Wajib diisi'),
  }),
  nama_sekolah: Yup.string().required('Wajib diisi'),
  nomor_ijazah: Yup.string().required('Wajib diisi'),
  tgl_ijazah: Yup.string().required('Wajib diisi'),
  jurusan: Yup.string().required('Wajib diisi'),
  fakultas: Yup.string().required('Wajib diisi'),
})

export interface FormInput {
  jenis_pendidikan?: any
  nama_sekolah?: string
  nomor_ijazah?: string
  tgl_ijazah?: string
  jurusan?: string
  fakultas?: string
  file_ijazah?: any
  id_pegawai?: number
  id?: number | undefined
}

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

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

export function UpdatePendidikan() {
  const {id, status} = useParams()
  const {mode} = useThemeMode()
  const [loading, setLoading] = useState(false)
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [data, setData] = useState({dt: []})

  const columns = [
    {
      name: 'Jenis Pendidikan',
      selector: (row: any) => row.jenis_pendidikan,
      sortable: true,
      minWidth: '150px',
      wrap: true,
      cell: (record: any) => <GetDetailPendidikan row={parseInt(record.jenis_pendidikan)} />,
    },
    {
      name: 'Nama Sekolah',
      selector: (row: any) => row.nama_sekolah,
      sortable: true,
      minWidth: '135px',
      wrap: true,
    },
    {
      name: 'Nomor Ijazah',
      selector: (row: any) => row.nomor_ijazah,
      sortable: true,
      minWidth: '135px',
      wrap: true,
    },
    {
      name: 'Tanggal Ijazah',
      selector: (row: any) => row.tgl_ijazah,
      sortable: true,
      minWidth: '135px',
      wrap: true,
      cell: (record: any) => {
        return `${moment(record.tgl_ijazah).format('D MMMM YYYY')}`
      },
    },
    {
      name: 'Jurusan',
      selector: (row: any) => row.jurusan,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Fakultas',
      selector: (row: any) => row.fakultas,
      sortable: true,
      wrap: true,
    },
    {
      name: 'File Ijazah',
      sortable: false,
      text: 'Action',
      className: 'action',
      center: true,
      align: 'center',
      cell: (record: any) => {
        return (
          <Fragment>
            {record.file_ijazah && record.file_ijazah !== '' && (
              <a target='_blank' rel='noreferrer' href={`${API_URL}/${record.file_ijazah}`}>
                Lihat
              </a>
            )}
          </Fragment>
        )
      },
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

  useEffect(() => {
    async function fetchDT() {
      setLoading(true)
      const response = await axios.get(`${KEPEGAWAIAN_URL}/find-data-pendidikan/${id}/${status}`)
      setData((prevstate) => ({...prevstate, dt: response.data.data}))
      setLoading(false)
    }
    fetchDT()
  }, [id, status])

  const fetchData = async () => {
    setLoading(true)
    const response = await axios.get(`${KEPEGAWAIAN_URL}/find-data-pendidikan/${id}/${status}`)
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

  const [selectedFile, setSelectedFile] = useState(null)

  const formik = useFormik({
    initialValues: {
      ...valuesFormik,
    },
    validationSchema: validatorForm,
    enableReinitialize: true,
    onSubmit: async (values, {setSubmitting}: FormikHelpers<FormInput>) => {
      setSubmitting(true)
      let formData = new FormData()
      try {
        if (aksi === 0) {
          // aksi tambah
          const payload = {
            ...valuesFormik,
            jenis_pendidikan: valuesFormik?.jenis_pendidikan
              ? valuesFormik?.jenis_pendidikan.value
              : null,
            id_pegawai: id,
          }
          const response = await axios.post(
            `${KEPEGAWAIAN_URL}/create-pendidikan-${status !== 'PNS' ? 'non-PNS' : 'PNS'}`,
            payload
          )
          if (response && response.data.data.return_id) {
            if (selectedFile) {
              formData.append('file_ijazah', selectedFile)
              const responseFile = await axios.post(
                `${KEPEGAWAIAN_URL}/update-file-pendidikan/${response.data.data.return_id}/${status}`,
                formData
              )
              if (responseFile) {
                console.log('File success uploaded!')
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
              return
            }
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
            `${KEPEGAWAIAN_URL}/update-pendidikan-${status !== 'PNS' ? 'non-PNS' : 'PNS'}/${
              idEditData.id
            }`,
            {
              ...valuesFormik,
              jenis_pendidikan: valuesFormik?.jenis_pendidikan
                ? valuesFormik?.jenis_pendidikan.value
                : valuesFormik?.jenis_pendidikan,
              id_pegawai: id,
            }
          )
          if (response) {
            if (selectedFile) {
              formData.append('file_ijazah', selectedFile)
              const responseFile = await axios.post(
                `${KEPEGAWAIAN_URL}/update-file-pendidikan/${idEditData.id}/${status}`,
                formData
              )
              if (responseFile) {
                console.log('File success uploaded!')
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
              return
            }
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
    setSelectedFile(null)
    setValPend({
      value: '',
      label: '',
    })
    setValuesFormik({
      jenis_pendidikan: null,
      nama_sekolah: '',
      nomor_ijazah: '',
      tgl_ijazah: '',
      jurusan: '',
      fakultas: '',
      file_ijazah: null,
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
          `${KEPEGAWAIAN_URL}/delete-pendidikan-${status !== 'PNS' ? 'non-PNS' : 'PNS'}/${parseInt(
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
      `${KEPEGAWAIAN_URL}/findone-data-pendidikan/${parseInt(idparam)}/${status}`
    )
    setIdEditData((prevstate) => ({
      ...prevstate,
      id: parseInt(idparam),
    }))
    setValuesFormik((prevstate) => ({
      ...prevstate,
      ...data.data,
      tgl_ijazah: moment(data.data.tgl_ijazah).format('YYYY-MM-D'),
    }))
    getPendVal(data.data.jenis_pendidikan)
  }

  const doEdit = (id: any) => {
    setShow(true)
    setAksi(1)
    getDetail(id)
  }

  const GetDetailPendidikan = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(`${MASTER_URL}/pendidikan/findone/${id}`)
        const result: string = data.data.pendidikan
        setValData(result)
      }
      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

  // AUTOCOMPLITE JENIS SARANA & PRASANAN
  const filterPendidikan = async (inputValue: string) => {
    const response = await axios.get(`${MASTER_URL}/pendidikan/findone-by-pendidikan/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.pendidikan, value: i.id}))
  }
  const loadOptionsPendidikan = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterPendidikan(inputValue))
    }, 1000)
  }

  const handleChangeFormikSelect = (value: any, name: string) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const [valPend, setValPend] = useState({value: '', label: ''})
  const getPendVal = async (params: any) => {
    if (params)
      return await axios
        .get(`${MASTER_URL}/pendidikan/findone/${parseInt(params)}`)
        .then((response) => {
          setValPend((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.pendidikan,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  return (
    <div>
      {/* begin::Body */}
      <UpdateHeaderDetail />
      {/* Second Card */}
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bold m-0'>Data Pendidikan</h3>
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
            noDataComponent={
              <div className='alert alert-primary d-flex align-items-center p-5 mt-10 mb-10'>
                <div className='d-flex flex-column'>
                  <h5 className='mb-1 text-center'>Data tidak ditemukan..!</h5>
                </div>
              </div>
            }
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
                {aksi === 0 ? 'Tambah' : 'Ubah'} Data Pendidikan
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
                    <label className='required fw-semibold fs-6 mb-2'>Jenis Pendidikan</label>
                    <AsyncSelect
                      cacheOptions
                      loadOptions={loadOptionsPendidikan}
                      defaultOptions
                      onChange={async (e) => {
                        handleChangeFormikSelect(e, 'jenis_pendidikan')
                        await formik.setFieldValue('jenis_pendidikan', e)
                      }}
                      value={
                        valuesFormik?.jenis_pendidikan &&
                        typeof valuesFormik?.jenis_pendidikan === 'object'
                          ? valuesFormik?.jenis_pendidikan
                          : valPend && valPend.label !== ''
                          ? valPend
                          : {value: '', label: 'Pilih'}
                      }
                      placeholder={'Pilih'}
                      name='jenis_pendidikan'
                      styles={
                        calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                      }
                      loadingMessage={() => 'Sedang mencari pilihan...'}
                      noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                    />
                    {formik.touched.jenis_pendidikan && formik.errors.jenis_pendidikan && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>Wajib Diisi</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='fv-row mb-7'>
                    <label className='required fw-semibold fs-6 mb-2'>Nama Sekolah</label>
                    <input
                      type='text'
                      name='nama_sekolah'
                      placeholder='Nama Sekolah'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': formik.touched.nama_sekolah && formik.errors.nama_sekolah,
                        },
                        {
                          'is-valid': formik.touched.nama_sekolah && !formik.errors.nama_sekolah,
                        }
                      )}
                      onChange={handleChangeFormik}
                      value={valuesFormik?.nama_sekolah}
                    />
                    {formik.touched.nama_sekolah && formik.errors.nama_sekolah && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.nama_sekolah}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='form-group mb-7'>
                    <div data-repeater-list='kt_docs_repeater_basic'>
                      <div data-repeater-item>
                        <div className='form-group row'>
                          <div className='col-6'>
                            <label className='required fw-semibold fs-6 mb-2'>Nomor Ijazah</label>
                            <input
                              type='text'
                              name='nomor_ijazah'
                              placeholder='Nomor Ijazah'
                              className={clsx(
                                'form-control form-control-solid mb-1',
                                {
                                  'is-invalid':
                                    formik.touched.nomor_ijazah && formik.errors.nomor_ijazah,
                                },
                                {
                                  'is-valid':
                                    formik.touched.nomor_ijazah && !formik.errors.nomor_ijazah,
                                }
                              )}
                              onChange={handleChangeFormik}
                              value={valuesFormik?.nomor_ijazah}
                            />
                            {formik.touched.nomor_ijazah && formik.errors.nomor_ijazah && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert'>{formik.errors.nomor_ijazah}</span>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className='col-6'>
                            <label className='required fw-semibold fs-6 mb-2'>Tanggal Ijazah</label>
                            <input
                              type='date'
                              className='form-control form-control-solid'
                              placeholder='Tanggal Lahir'
                              name='tgl_ijazah'
                              onChange={handleChangeFormik}
                              value={valuesFormik?.tgl_ijazah}
                            />
                            {formik.touched.tgl_ijazah && formik.errors.tgl_ijazah && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert'>{formik.errors.tgl_ijazah}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='fv-row mb-7'>
                    <label className='required fw-semibold fs-6 mb-2'>Jurusan</label>
                    <input
                      type='text'
                      name='jurusan'
                      placeholder='Jurusan'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': formik.touched.jurusan && formik.errors.jurusan,
                        },
                        {
                          'is-valid': formik.touched.jurusan && !formik.errors.jurusan,
                        }
                      )}
                      onChange={handleChangeFormik}
                      value={valuesFormik?.jurusan}
                    />
                    {formik.touched.jurusan && formik.errors.jurusan && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.jurusan}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='fv-row mb-7'>
                    <label className='required fw-semibold fs-6 mb-2'>Fakultas</label>
                    <input
                      type='text'
                      name='fakultas'
                      placeholder='Fakultas'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': formik.touched.fakultas && formik.errors.fakultas,
                        },
                        {
                          'is-valid': formik.touched.fakultas && !formik.errors.fakultas,
                        }
                      )}
                      onChange={handleChangeFormik}
                      value={valuesFormik?.fakultas}
                    />
                    {formik.touched.fakultas && formik.errors.fakultas && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.fakultas}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='fv-row mb-7'>
                    <div className='form-group'>
                      <Form.Label>File Ijazah</Form.Label>
                      <Form.Control
                        type='file'
                        className='form-control form-control-solid'
                        id='firstimg'
                        onChange={(event: {target: any}) => setSelectedFile(event.target.files[0])}
                        accept='image/jpeg,image/png,application/pdf'
                      />
                      <small className='mt-4'>
                        *File yang dapat di upload berformat (.pdf, .jpeg, .png)
                      </small>
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
