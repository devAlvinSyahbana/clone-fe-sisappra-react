import {useState, useEffect} from 'react'
import axios from 'axios'
import CardGroup from 'react-bootstrap/CardGroup'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import Accordion from 'react-bootstrap/Accordion'
import {ThemeModeComponent} from '../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

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

//create
export interface FormInput {
  wilayah_bidang?: any
  kecamatan?: any
  jabatan?: any
  nama_hak_akses?: string
  created_by?: number
}
export interface JumlahPengguna {
  total_data?: number
}
export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}
export interface DataPermission {
  id: number
  akses_kontrol: number
  nama_permission: string
  status: number
  akses_kontrol_name: string
  akses_kontrol_id: number
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`
export const BIDANG_WILAYAH_URL = `${API_URL}/master/bidang-wilayah`
export const JABATAN_URL = `${API_URL}/master/jabatan`
export const PELAKSANA_URL = `${API_URL}/master/pelaksana`
export const AKSES_KONTROL_URL = `${API_URL}/manajemen-pengguna/akses-kontrol`

export function HakAkses() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  //handle tambah
  const [showTambah, setTambahShow] = useState(false)
  const handleTambahClose = () => setTambahShow(false)
  const handleTambahShow = () => setTambahShow(true)
  //pelaksana & non plaksana
  const [valStatAKses, setValStatAKses] = useState({val: 'Pelaksana'})
  const arrStatAKses = ['Pelaksana', 'Non-Pelaksana']

  const [data, setData] = useState<any[]>([])
  const [aksesKontrol, setAksesKontrol] = useState<any[]>([])
  const [modulPermission, setModulPermission] = useState<DataPermission[]>([])

  const handleChangeStatAKses = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValStatAKses({val: event.target.value})
  }

  //onSubmit
  const formik = useFormik({
    initialValues: {
      wilayah_bidang: {value: '', label: 'Pilih'},
      kecamatan: {value: '', label: 'Pilih'},
      jabatan: {value: '', label: 'Pilih'},
      nama_hak_akses: '',
      value_permission: [],
    },
    onSubmit: async (values: any) => {
      let statusAkses: string
      if (valStatAKses.val === 'Pelaksana') {
        statusAkses =
          valMasterBidangWilayah.label +
          ' ' +
          valMasterPelaksana.label +
          ' ' +
          valMasterJabatan.label
      } else {
        statusAkses = values.nama_hak_akses
      }

      const bodyparam: FormInput = {
        nama_hak_akses: statusAkses,
        wilayah_bidang: valMasterBidangWilayah?.value ? valMasterBidangWilayah.value : 0,
        kecamatan: valMasterPelaksana?.value ? valMasterPelaksana.value : 0,
        jabatan: valMasterJabatan?.value ? valMasterJabatan.value : 0,
        created_by: 0,
      }
      try {
        const response = await axios.post(`${MANAJEMEN_PENGGUNA_URL}/hak-akses/create`, bodyparam)
        if (response) {
          // console.log(bodyparam.nama_hak_akses)
          // alert(JSON.stringify(values, null, 2))
          for (let i = 0; i < modulPermission.length; i++) {
            let mp: string = modulPermission[i].akses_kontrol + ' ' + modulPermission[i].id
            if (mp && values.value_permission.includes(mp)) {
              await axios.post(`${MANAJEMEN_PENGGUNA_URL}/akses-kontrol-mapping/create`, {
                id_hak_akses: response.data.data.id,
                id_akses_kontrol: modulPermission[i].akses_kontrol,
                id_permission: modulPermission[i].id,
                value_permission: true,
              })
            } else {
              await axios.post(`${MANAJEMEN_PENGGUNA_URL}/akses-kontrol-mapping/create`, {
                id_hak_akses: response.data.data.id,
                id_akses_kontrol: modulPermission[i].akses_kontrol,
                id_permission: modulPermission[i].id,
                value_permission: false,
              })
            }
          }

          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          values.value_permission = []
          setTambahShow(false)
        }
        fetchDT()
        handleTambahClose()
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

  //nama_hak_akses
  const [idMasterBidangWilayah, setIdMasterBidangWilayah] = useState({id: ''})
  const [valMasterBidangWilayah, setValMasterBidangWilayah] = useState({value: null, label: ''})
  const [masterBidangWilayah, setMasterBidangWilayah] = useState([])
  const filterbidangwilayah = async (inputValue: string) => {
    const response = await axios.get(`${BIDANG_WILAYAH_URL}/filter/${inputValue}`)
    const json = response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsbidangwilayah = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterbidangwilayah(inputValue))
    }, 1000)
  }
  const handleChangeInputKota = (newValue: any) => {
    setValMasterBidangWilayah((prevstate: any) => ({...prevstate, ...newValue}))
    setIdMasterBidangWilayah({id: newValue.value})
    setValMasterPelaksana({value: null, label: ''})
    setValMasterJabatan({value: null, label: ''})
    // console.log('cek', newValue.value)
    const timeout = setTimeout(async () => {
      const response = await axios.get(
        `${PELAKSANA_URL}/filter?id_tempat_pelaksanaan=${newValue.value}`
      )
      let items = response.data.data
      Array.from(items).forEach(async (item: any) => {
        item.label = item.nama
        item.value = item.id
      })
      setMasterBidangWilayah(items)
      // console.log(items)
    }, 100)

    return () => clearTimeout(timeout)
  }
  //end nama_hak_akses

  // kecamatan
  const [idMasterPelaksana, setIdMasterPelaksana] = useState({id: ''})
  const [valMasterPelaksana, setValMasterPelaksana] = useState({value: null, label: ''})
  const [masterPelaksana, setMasterPelaksana] = useState([])
  const filterKecamatan = async (inputValue: string) => {
    const response = await axios.get(
      `${PELAKSANA_URL}/filter?id_tempat_pelaksanaan=${idMasterBidangWilayah.id}${
        inputValue !== '' && `&nama=${inputValue}`
      }`
    )
    const json = response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsKecamatan = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKecamatan(inputValue))
    }, 500)
  }
  const handleChangeInputKecamatan = (newValue: any) => {
    setValMasterPelaksana((prevstate: any) => ({...prevstate, ...newValue}))
    setIdMasterPelaksana({id: newValue.value})
    setValMasterJabatan({value: null, label: ''})
    // console.log('cek', newValue.value)
    const timeout = setTimeout(async () => {
      const response = await axios.get(
        `${JABATAN_URL}/filter?id_master_tempat_seksi_pelaksanaan=${newValue.value}`
      )
      let items = response.data.data
      Array.from(items).forEach(async (item: any) => {
        item.label = item.jabatan
        item.value = item.id
      })
      setMasterPelaksana(items)
      // console.log(items)
    }, 100)

    return () => clearTimeout(timeout)
  }
  //end kecamatan

  //jabatan
  const [valMasterJabatan, setValMasterJabatan] = useState({value: null, label: ''})
  const filterjabatan = async (inputValue: string) => {
    const response = await axios.get(
      `${JABATAN_URL}/filter?id_master_tempat_seksi_pelaksanaan=${parseInt(idMasterPelaksana.id)}${
        inputValue !== '' && `&nama=${inputValue}`
      }`
    )
    const json = response.data.data
    return json.map((i: any) => ({label: i.jabatan, value: i.id}))
  }
  const loadOptionsJabatan = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterjabatan(inputValue))
    }, 500)
  }
  const handleChangeInputJabatan = (newValue: any) => {
    setValMasterJabatan((prevstate: any) => ({...prevstate, ...newValue}))
  }
  //end jabatan

  useEffect(() => {
    fetchDT()
    fetchUsers()
    fetchPermission()
  }, [])

  const fetchDT = async () => {
    const response = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/hak-akses/find`)
    let items = response.data.data
    Array.from(items).forEach(async (item: any) => {
      const value = await axios.get(
        `${MANAJEMEN_PENGGUNA_URL}/hak-akses/count-total-data/{id_hak_akses}?id_hak_akses=${item.id}`
      )
      item.jumlah_pengguna = `${value.data.data.total_data}`
    })
    const timeout = setTimeout(() => {
      setData(items)
    }, 1500)

    return () => clearTimeout(timeout)
  }

  //akses kontrol
  const fetchUsers = async () => {
    const value = await axios.get(`${AKSES_KONTROL_URL}/find`)
    setAksesKontrol(value?.data?.data)
    // console.log('cek akses kontrol', aksesKontrol)
  }
  //end akses kontrol

  //modul permission
  const fetchPermission = async () => {
    const value = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/modul-permission/find`)
    setModulPermission(value?.data?.data)
    // console.log('cek mp', modulPermission)
  }
  //modul permission

  return (
    <CardGroup>
      <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-9'>
        {data &&
          data.length > 0 &&
          data.map((d: any) => {
            return (
              <>
                <div className='col-md-4' key={d.id + d.kode}>
                  <div className='card card-flush h-md-100'>
                    <div className='card-header'>
                      <div className='card-title'>
                        <h3>{d?.nama_hak_akses}</h3>
                      </div>
                    </div>
                    <div className='card-body pt-1'>
                      <div className='fw-bold text-gray-600 mb-5'>
                        Total Pengguna Dengan Hak Akses Ini:{' '}
                        <span className='fw-bold text-black'>{d.jumlah_pengguna}</span>
                      </div>
                    </div>
                    <div className='ol-md-4'>
                      <div className='card h-md-100'>
                        <div className='card-body d-flex flex-center'>
                          <button
                            className='btn btn-light btn-active-primary my-1 me-2'
                            onClick={() =>
                              navigate(`/apps/detail-hak-akses/DetailHakAkses/` + d.id, {
                                state: {parent: d.hak_akses, parentName: d.hak_akses},
                              })
                            }
                          >
                            Detail Hak Akses
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}

        <div className='col-md-4'>
          <div className='card h-md-100'>
            <div className='card-body d-flex flex-center'>
              <button
                type='button'
                className='btn btn-clear d-flex flex-column flex-center'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_add_role'
                onClick={handleTambahShow}
              >
                <div className='fw-bold fs-3 text-gray-600 text-hover-primary'>
                  Tambah Hak Akses
                </div>
              </button>
            </div>
          </div>
        </div>

        <Modal
          size='xl'
          show={showTambah}
          aria-labelledby='example-modal-sizes-title-lg'
          backdrop='static'
          keyboard={false}
          centered
          onHide={handleTambahClose}
        >
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Tambah Hak Akses Pelaksana</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='col-md-6 col-lg-6'></div>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Status Kepegawaian
                </label>
                <div>
                  <select
                    className='form-select form-select-solid mb-5'
                    aria-label='Select example'
                    value={valStatAKses.val}
                    onChange={handleChangeStatAKses}
                    name='val'
                  >
                    {arrStatAKses.map((val: string) => {
                      return <option value={val}>{val}</option>
                    })}
                  </select>
                </div>
              </div>
              {valStatAKses.val === 'Pelaksana' ? (
                <>
                  <div>
                    <label htmlFor='' className='mb-3'>
                      Wilayah/Bidang
                    </label>
                    <AsyncSelect
                      styles={
                        calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                      }
                      className='mb-5'
                      value={
                        valMasterBidangWilayah.value
                          ? valMasterBidangWilayah
                          : {value: '', label: 'Pilih'}
                      }
                      loadOptions={loadOptionsbidangwilayah}
                      defaultOptions
                      onChange={handleChangeInputKota}
                    />
                  </div>
                  <div>
                    <label htmlFor='' className='mb-3'>
                      Kecamatan
                    </label>
                    <AsyncSelect
                      styles={
                        calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                      }
                      className='mb-5'
                      value={
                        valMasterPelaksana.value ? valMasterPelaksana : {value: '', label: 'Pilih'}
                      }
                      loadOptions={loadOptionsKecamatan}
                      defaultOptions={masterBidangWilayah}
                      onChange={handleChangeInputKecamatan}
                    />
                  </div>
                  <div>
                    <label htmlFor='' className='mb-3'>
                      Jabatan
                    </label>
                    <AsyncSelect
                      styles={
                        calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                      }
                      value={
                        valMasterJabatan.value ? valMasterJabatan : {value: '', label: 'Pilih'}
                      }
                      loadOptions={loadOptionsJabatan}
                      defaultOptions={masterPelaksana}
                      onChange={handleChangeInputJabatan}
                    />
                  </div>
                </>
              ) : null}

              {valStatAKses.val === 'Non-Pelaksana' ? (
                <div>
                  <label htmlFor='' className='mb-3'>
                    Nama Hak Akses
                  </label>
                  <Form.Control
                    name='nama_hak_akses'
                    className='form-control form-control-solid'
                    onChange={formik.handleChange}
                    value={formik.values.nama_hak_akses}
                  />
                </div>
              ) : null}
              {/* Akses Kontrol */}
              <div className='fv-row mt-5'>
                <h5 className='fs-5 fw-bold form-label mb-3'>Akses Kontrol</h5>
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
                                <Accordion key={ak.id} defaultActiveKey='0'>
                                  <Accordion.Item eventKey='1'>
                                    <Accordion.Header>
                                      <h3>{ak.modul}</h3>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      {aksesKontrol.map((ak2: any) => {
                                        return (
                                          <>
                                            {ak2.level.split('-')[0] === ak.level && (
                                              <div className='d-flex align-items-center py-4 mb-4'>
                                                <h5 className='card-title m-0 w-50'>{ak2.modul}</h5>
                                                <div className='d-flex w-50'>
                                                  {modulPermission.map((mp: any) => {
                                                    return (
                                                      <>
                                                        {mp.akses_kontrol === ak2.id && (
                                                          <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                                            <input
                                                              name='value_permission'
                                                              type='checkbox'
                                                              onChange={formik.handleChange}
                                                              value={ak2.id + ' ' + mp.id}
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
              <Button variant='secondary' onClick={handleTambahClose}>
                Close
              </Button>
              <button className='btn btn-primary' type='submit'>
                <i className='fa-solid fa-paper-plane'></i>
                Simpan
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </CardGroup>
  )
}
