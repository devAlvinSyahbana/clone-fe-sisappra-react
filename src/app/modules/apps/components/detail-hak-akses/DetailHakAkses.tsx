import {useState, useEffect} from 'react'
import axios from 'axios'
import DataTable, {createTheme} from 'react-data-table-component'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import {useFormik} from 'formik'
import clsx from 'clsx'
import moment from 'moment'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import {KTSVG} from '../../../../../_metronic/helpers'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

//THEME
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
// END THEME

// INTERFACE
export interface JumlahPengguna {
  total_data?: number
}
export interface FormInput {
  nama_hak_akses?: string
  id_modul_permission?: number
  updated_by?: number
  wilayah_bidang?: number
  kecamatan?: number
  jabatan?: number
}

export interface HakAkses {
  id: number
  nama_hak_akses: string
  kode: string
  nama_permission: string
  wilayah_bidang: number
  kecamatan: number
  jabatan: number
}

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}
// END INTERFACE

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`
export const AKSES_KONTROL_URL = `${API_URL}/manajemen-pengguna/akses-kontrol`

export function DetailHakAkses() {
  // STATE SECTION
  const {id} = useParams()
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [valNamaLengkap, setFilterNamaLengkap] = useState({val: ''})
  const calculatedMode = mode === 'system' ? systemMode : mode
  //
  const [jumlah_Pengguna, setJumlahPengguna] = useState<JumlahPengguna>()
  const [hakAkses, setHakAkses] = useState<HakAkses>()
  const [aksesKontrol, setAksesKontrol] = useState<any[]>([])
  const [modulPermission, setModulPermission] = useState<any[]>([])
  const [aksesKontrolMapping, setAksesKontrolMapping] = useState<any[]>([])
  //
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(0)
  const [qParamFind, setUriFind] = useState({strparam: ''})
  // END STATE SECTION

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

  const formik = useFormik({
    initialValues: {
      nama_hak_akses: '',
      value_permission: aksesKontrolMapping,
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        nama_hak_akses: values.nama_hak_akses,
        updated_by: 0,
      }
      try {
        const response = await axios.put(
          `${MANAJEMEN_PENGGUNA_URL}/hak-akses/update/${id}`,
          bodyparam
        )
        // alert(JSON.stringify(values, null, 2))
        if (response) {
          for (let i = 0; i < modulPermission.length; i++) {
            let mp: string = modulPermission[i].akses_kontrol + ' ' + modulPermission[i].id
            // console.log('cek akm, ', aksesKontrolMapping)
            if (aksesKontrolMapping.length === modulPermission.length) {
              // let akm: string = aksesKontrolMapping[i].id_akses_kontrol + ' ' + aksesKontrolMapping[i].id_permission
              if (values.value_permission.includes(mp)) {
                await axios.put(
                  `${MANAJEMEN_PENGGUNA_URL}/akses-kontrol-mapping/update/${aksesKontrolMapping[i].id}`,
                  {
                    id_hak_akses: id,
                    id_akses_kontrol: modulPermission[i].akses_kontrol,
                    id_permission: modulPermission[i].id,
                    value_permission: true,
                  }
                )
                // console.log('tt')
              } else {
                await axios.put(
                  `${MANAJEMEN_PENGGUNA_URL}/akses-kontrol-mapping/update/${aksesKontrolMapping[i].id}`,
                  {
                    id_hak_akses: id,
                    id_akses_kontrol: modulPermission[i].akses_kontrol,
                    id_permission: modulPermission[i].id,
                    value_permission: false,
                  }
                )
                // console.log(id, 'tf')
              }
            } else if (
              aksesKontrolMapping.length < modulPermission.length &&
              aksesKontrolMapping.length > 0
            ) {
              console.log(true)
            } else {
              if (values.value_permission.includes(mp)) {
                await axios.post(`${MANAJEMEN_PENGGUNA_URL}/akses-kontrol-mapping/create`, {
                  id_hak_akses: id,
                  id_akses_kontrol: modulPermission[i].akses_kontrol,
                  id_permission: modulPermission[i].id,
                  value_permission: true,
                })
                // console.log('ft')
              } else {
                await axios.post(`${MANAJEMEN_PENGGUNA_URL}/akses-kontrol-mapping/create`, {
                  id_hak_akses: id,
                  id_akses_kontrol: modulPermission[i].akses_kontrol,
                  id_permission: modulPermission[i].id,
                  value_permission: false,
                })
                // console.log('ff')
              }
            }
          }
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          values.value_permission = []
          fetchMapping(1)
          setShow(false)
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Data gagal disimpan, harap mencoba lagi',
          showConfirmButton: false,
          timer: 1500,
        })
        console.error(error)
      }
    },
  })

  // End Data Tabel

  const konfirDel = (id: number, status_pegawai: string) => {
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
            status_pegawai: status_pegawai,
            deleted_by: 0,
          },
        }
        const response = await axios.delete(`${MANAJEMEN_PENGGUNA_URL}/delete/${id}`, bodyParam)
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

  // USEEFFECT + FETCH FUNCTION
  useEffect(() => {
    fetchDataAwal(1)
  }, [])

  useEffect(() => {
    fetchData(1)
    fetchAksesKontrol()
    fetchPermission()
    fetchMapping(1)
  }, [qParamFind, perPage])

  useEffect(() => {
    fetchDataAwal(1)
  }, [formik.isSubmitting])

  //Data Tabel
  const fetchDataAwal = async (page: number) => {
    const value = await axios.get(
      `${MANAJEMEN_PENGGUNA_URL}/hak-akses/count-total-data/{id_hak_akses}?id_hak_akses=${id}`
    )
    setJumlahPengguna(value.data.data)
    setPerPage(value.data.data.total_data)

    const response = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/hak-akses/findone/${id}`)
    setHakAkses(response.data.data)
    formik.values.nama_hak_akses = response.data.data.nama_hak_akses

    console.log(value.data.data.total_data)
    const val = await axios.get(
      `${MANAJEMEN_PENGGUNA_URL}/filter-data-pengguna?limit=${value.data.data.total_data}&offset=${page}${qParamFind.strparam}&hak_akses=${id}`
    )
    setTotalRows(val.data.total_data)
    const timeout = setTimeout(() => {
      let items = val.data.data
      Array.from(items).forEach((item: any, index: any) => {
        item.serial = index + 1
      })
      setData(items)
      setLoading(false)
    }, 50)

    return () => clearTimeout(timeout)
  }

  const fetchData = async (page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${MANAJEMEN_PENGGUNA_URL}/filter-data-pengguna?limit=${perPage}&offset=${page}${qParamFind.strparam}&hak_akses=${id}`
    )
    setTotalRows(response.data.total_data)
    const timeout = setTimeout(() => {
      let items = response.data.data
      Array.from(items).forEach((item: any, index: any) => {
        item.serial = index + 1
      })
      setData(items)
      setLoading(false)
    }, 100)

    return () => clearTimeout(timeout)
  }

  //akses kontrol
  const fetchAksesKontrol = async () => {
    const value = await axios.get(`${AKSES_KONTROL_URL}/find`)
    setAksesKontrol(value.data.data)
    // setTotalRows(value.data.total)
  }
  //end akses kontrol

  //modul permission
  const fetchPermission = async () => {
    const value = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/modul-permission/find`)
    setModulPermission(value.data.data)
    // setTotalRows(value.data.total)
  }
  //modul permission

  // mapping
  const fetchMapping = async (page: number) => {
    const value = await axios.get(
      `${MANAJEMEN_PENGGUNA_URL}/akses-kontrol-mapping/filter/{id_hak_akses}?limit=${modulPermission.length}&offset=${page}&id_hak_akses=${id}`
    )
    let items = []
    for (let i = 0; i < value.data.data.length; i++) {
      if (value.data.data[i].value_permission)
        items.push(value.data.data[i].id_akses_kontrol + ' ' + value.data.data[i].id_permission)
    }
    setAksesKontrolMapping(value.data.data)
    formik.values.value_permission = items
    // setTotalRows(value.data.total)
  }
  //end mapping
  // EMD USEEFFECT + FETCH FUNCTION

  // var num = 1
  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.serial,
      sortable: true,
      width: '10%',
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      },
    },
    {
      name: 'Pengguna',
      selector: (row: any) => (row.hak_akses !== '' ? row.nama_lengkap : (row.nama_lengkap = '')),
      sortField: 'nama_lengkap',
      sortable: true,
      minWidth: '200px',
      wrap: true,
      cell: (record: any) => {
        return (
          <>
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
          </>
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
          <>
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
                    {/* <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate('/apps/update-hak-akses/UpdateHakAkses/' + record.id, {
                          replace: true,
                        })
                      }
                    >
                      Detail
                    </Dropdown.Item> */}
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
          </>
        )
      },
    },
  ]

  return (
    <>
      <div className='row row-cols-1 g-5 g-xl-9'>
        <div className='px-0'>
          <div className='card card-flush h-md-30'>
            <div className='card-header pt-8'>
              <div className='card-title'>
                <h2>{hakAkses?.nama_hak_akses}</h2>
              </div>
            </div>
            <div className='card-body pt-1'></div>
            <div className='card-footer flex-wrap pt-0'>
              <button
                className='float-none btn btn-secondary align-self-center'
                onClick={() => navigate(-1)}
              >
                <i className='fa-solid fa-arrow-left '></i>
                Kembali
              </button>
              <button
                onClick={handleShow}
                className='btn btn-primary btn-active-light-primary ms-4'
              >
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
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Ubah Hak Akses</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className='mb-10 form-control-solid'>
                <Form.Label>Nama Hak Akses</Form.Label>
                <Form.Control
                  name='nama_hak_akses'
                  className='form-control form-control-solid'
                  onChange={formik.handleChange}
                  value={formik.values.nama_hak_akses}
                />
              </Form.Group>
              {/* Akses Kontrol */}
              <div className='fv-row'>
                <span className='fs-5 fw-bold form-label mb-2'>Akses Kontrol</span>
                <div className='table-responsive'>
                  <div className='table align-middle table-row-dashed fs-6 gy-5'>
                    <div className='text-gray-600 fw-semibold'>
                      {aksesKontrol &&
                        aksesKontrol.length > 0 &&
                        aksesKontrol.map((ak: any) => {
                          return (
                            <>
                              {/* Dashboard */}
                              {ak.level.split('-').length < 2 && (
                                <Accordion key={'ak' + ak.id} defaultActiveKey='0'>
                                  <Accordion.Item eventKey='1'>
                                    <Accordion.Header>
                                      <h3>{ak.modul}</h3>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      {aksesKontrol.map((ak2: any) => {
                                        return (
                                          <>
                                            {ak2.level.split('-')[0] === ak.level && (
                                              <div
                                                className='d-flex align-items-center py-4 mb-4'
                                                key={'ak2' + ak2.id}
                                              >
                                                <h5 className='card-title m-0 w-50'>{ak2.modul}</h5>
                                                <div className='d-flex w-50'>
                                                  {modulPermission.map((mp: any) => {
                                                    return (
                                                      <>
                                                        {mp.akses_kontrol === ak2.id && (
                                                          <label
                                                            className='form-check form-check-custom form-check-solid me-5 me-lg-20'
                                                            key={'mp' + ak2.id}
                                                          >
                                                            <input
                                                              name='value_permission'
                                                              type='checkbox'
                                                              onChange={formik.handleChange}
                                                              value={ak2.id + ' ' + mp.id}
                                                              checked={formik.values.value_permission.includes(
                                                                ak2.id + ' ' + mp.id
                                                              )}
                                                            />
                                                            <span className='form-check-label'>
                                                              {mp.nama_permission}
                                                            </span>
                                                          </label>
                                                        )}
                                                      </>
                                                    )
                                                  })}
                                                </div>
                                              </div>
                                            )}
                                          </>
                                        )
                                      })}
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              )}
                              {/* end Dashboard */}
                            </>
                          )
                        })}
                    </div>
                  </div>
                </div>
              </div>
              {/* Akses Kontrol */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <button className='btn btn-primary' type='submit'>
                <i className='fa-solid fa-paper-plane'></i>
                Simpan
              </button>
            </Modal.Footer>
          </form>
        </Modal>

        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div className='card'>
            <div className='row g-8 mt-2 ms-5 me-5'>
              <label>
                <h2>
                  Pengguna Terdaftar ({/* Jumlah Pengguna */}
                  {jumlah_Pengguna?.total_data !== 0
                    ? jumlah_Pengguna?.total_data
                    : 'Tidak Ada Pengguna'}
                  {/* End jumlah */})
                </h2>
              </label>
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
              <div className='col-xxl-20 col-lg-4 col-md-20 col-sm-12'>
                <Link to='#' onClick={handleFilter}>
                  <button className='btn btn-light-primary me-2'>
                    <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-2' />
                    Cari
                  </button>
                </Link>
              </div>
            </div>
            <div className='table-responsive mt-5 ms-5 me-5 w'>
              <DataTable
                columns={columns}
                data={data}
                progressPending={loading}
                progressComponent={<LoadingAnimation />}
                pagination
                paginationTotalRows={totalRows}
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
          {/* end::Body */}
        </div>
      </div>
    </>
  )
}
