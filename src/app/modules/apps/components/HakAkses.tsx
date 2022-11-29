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
// import {ids} from 'webpack'
// import {SelectOptionAutoCom} from '../KepegawaianInterface'

//creat
export interface FormInput {
  nama_hak_akses?: string
  created_by?: number
}
export interface JumlahPengguna {
  total_data?: number
}
// export interface jabatan {
//   id?: number
//   nama?: string
//   status?: string
//   level?: string
//   id_master_tempat_seksi_pelaksanaan?: number
//   created_by?: number
// }
// export interface wilayah {
//   id?: number
//   nama?: string
//   kategori?: string
//   created_by?: number
// }
// export interface kecamtan {
//   id?: number
//   nama?: string
//   kode?: string
//   created_by?: number
// }

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`
export const BIDANG_WILAYAH_URL = `${API_URL}/master/bidang-wilayah`
export const JABATAN_URL = `${API_URL}/master/jabatan`
export const PELAKSANA_URL = `${API_URL}/master/pelaksana`
export const AKSES_KONTROL_URL = `${API_URL}/manajemen-pengguna/akses-kontrol`

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

export function HakAkses() {
  const navigate = useNavigate()
  //handle ubah
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //handle tambah
  const [showTambah, setTambahShow] = useState(false)
  const handleTambahClose = () => setTambahShow(false)
  const handleTambahShow = () => setTambahShow(true)
  //non pelaksana
  const [showNon, setNonShow] = useState(false)
  const handleNonClose = () => setNonShow(false)
  const handleNonShow = () => setNonShow(true)
  //radio batton
  const [valStatAKses, setValStatAKses] = useState({val: ''})
  const arrStatAKses = ['Pelaksana', 'Non-Pelaksana']
  const [qParamFind, setUriFind] = useState({strparam: ''})

  const [data, setData] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [valuesFormik, setValuesFormik] = useState<FormInput>({})
  const [jumlah_Pengguna, setJumlahPengguna] = useState<JumlahPengguna>()

  const [aksesKontrol, setAksesKontrol] = useState<any[]>([])
  const [modulPermission, setModulPermission] = useState<any[]>([])
  const [akm, setAkm] = useState([])

  //check
  const [valStatCheck, setValStatCheck] = useState({val: ''})

  useEffect(() => {
    const fetchData = async () => {
      const jumlah_Pengguna = await axios.get(
        `${MANAJEMEN_PENGGUNA_URL}/hak-akses/count-total-data/1`
      )

      setJumlahPengguna(jumlah_Pengguna.data.data)
    }
    fetchDT(1)
    fetchData()
    fetchUsers()
    fetchPermission()
    fetchMapping()
  }, [qParamFind])

  async function fetchDT(page: number) {
    const response = await axios.get(
      `${MANAJEMEN_PENGGUNA_URL}/hak-akses/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    // console.log(data)
    setTotalRows(response.data.total_data)
  }

  const handleChangeStatAKses = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValStatAKses({val: event.target.value})
  }

  //onSubmit
  const formik = useFormik({
    initialValues: {
      nama_hak_akses: '',
      value_permission: [],
    },
    onSubmit: async (values: any) => {
      // let formData = new FormData()
      const bodyparam: FormInput = {
        // nama_hak_akses: valuesFormik?.nama_hak_akses ? valuesFormik.nama_hak_akses : '',
        nama_hak_akses: values.nama_hak_akses,
        created_by: 0,
      }
      try {
        const response = await axios.post(`${MANAJEMEN_PENGGUNA_URL}/hak-akses/create`, bodyparam)
        if (response) {
          const value = await axios.get(
            `${MANAJEMEN_PENGGUNA_URL}/hak-akses/findone-by-nama-hak-akses/${values.nama_hak_akses}`
          )
          // alert(JSON.stringify(values, null, 2))
          for (let i = 0; i < modulPermission.length; i++) {
            let mp: string = modulPermission[i].akses_kontrol + ' ' + modulPermission[i].id
            // console.log(mp)
            // console.log(values.value_permission)
            if (values.value_permission.includes(mp)) {
              await axios.post(`${MANAJEMEN_PENGGUNA_URL}/akses-kontrol-mapping/create`, {
                id_hak_akses: value.data.data.id,
                id_akses_kontrol: modulPermission[i].akses_kontrol,
                id_permission: modulPermission[i].id,
                value_permission: true,
              })
            } else {
              await axios.post(`${MANAJEMEN_PENGGUNA_URL}/akses-kontrol-mapping/create`, {
                id_hak_akses: value.data.data.id,
                id_akses_kontrol: modulPermission[i].akses_kontrol,
                id_permission: modulPermission[i].id,
                value_permission: false,
              })
            }
          }
          fetchDT(1)
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          values.value_permission = []
          setTambahShow(false)
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

  //nama_hak_akses
  const [idMasterBidangWilayah, setIdMasterBidangWilayah] = useState({id: ''})
  const [valMasterBidangWilayah, setValMasterBidangWilayah] = useState({value: null, label: ''})
  const filterbidangwilayah = async (inputValue: string) => {
    const response = await axios.get(`${BIDANG_WILAYAH_URL}/filter/${inputValue}`)
    const json = await response.data.data
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
    setIdMasterBidangWilayah((prevstate) => ({
      ...prevstate,
      id: newValue.value,
    }))
  }
  //end nama_hak_akses

  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }
  const [idMasterPelaksana, setIdMasterPelaksana] = useState({id: ''})
  const [valMasterPelaksana, setValMasterPelaksana] = useState({value: '', label: ''})
  const filterKecamatan = async (inputValue: string) => {
    const response = await axios.get(
      `${PELAKSANA_URL}/filter?id_tempat_pelaksanaan=${parseInt(idMasterBidangWilayah.id)}${
        inputValue !== '' && `&nama=${inputValue}`
      }`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsKecamatan = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKecamatan(inputValue))
    }, 1000)
  }
  const handleChangeInputKecamatan = (newValue: any) => {
    setValMasterPelaksana((prevstate: any) => ({...prevstate, ...newValue}))
    setIdMasterPelaksana((prevstate) => ({
      ...prevstate,
      id: newValue.value,
    }))
  }
  //end kecamtan

  //jabatan
  const [valMasterJabatan, setValMasterJabatan] = useState({value: '', label: ''})
  const filterjabatan = async (inputValue: string) => {
    const response = await axios.get(
      `${JABATAN_URL}/filter?id_master_tempat_seksi_pelaksanaan=${parseInt(idMasterPelaksana.id)}${
        inputValue !== '' && `&nama=${inputValue}`
      }`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.jabatan, value: i.id}))
  }
  const loadOptionsJabatan = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterjabatan(inputValue))
    }, 1000)
  }
  const handleChangeInputJabatan = (newValue: any) => {
    setValMasterJabatan((prevstate: any) => ({...prevstate, ...newValue}))
  }
  //end jabatan

  //akses kontrol
  const fetchUsers = async () => {
    const value = await axios.get(`${AKSES_KONTROL_URL}/find`)
    setAksesKontrol(value?.data?.data)
    setTotalRows(value.data.total)
    // console.log('cek akses kontrol', aksesKontrol)
  }
  //end akses kontrol

  //modul permission
  const fetchPermission = async () => {
    const value = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/modul-permission/find`)
    setModulPermission(value?.data?.data)
    setTotalRows(value.data.total)
    console.log('cek mp', modulPermission)
  }
  //modul permission

  // mapping
  const fetchMapping = async () => {
    const value = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/akses-kontrol-mapping/find`)
    setAkm(value.data.data)
    setTotalRows(value.data.total)
    // console.log('cek mapping:', akm)
  }
  //end mapping

  return (
    <CardGroup>
      <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-9'>
        {data &&
          data.length > 0 &&
          data.map((d: any, i: number) => {
            return (
              <>
                <div className='col-md-4' key={d.kode}>
                  <div className='card card-flush h-md-100'>
                    <div className='card-header'>
                      <div className='card-title'>
                        <a>{d?.nama_hak_akses}</a>
                      </div>
                    </div>
                    <div className='card-body pt-1'>
                      <div className='fw-bold text-gray-600 mb-5'>
                        Total Pengguna Dengan Hak Akses Ini: {/* Jumlah Pengguna */}
                        {jumlah_Pengguna?.total_data !== 0
                          ? jumlah_Pengguna?.total_data
                          : 'Tidak Ada Pengguna'}
                        {/* End jumlah */}
                      </div>
                    </div>
                    <div className='ol-md-4'>
                      <div className='card h-md-100'>
                        <div className='card-body d-flex flex-center'>
                          <button
                            className='btn btn-light btn-active-primary my-1 me-2'
                            onClick={() =>
                              navigate(`/apps/detail-hak-akses/DetailHakAkses/${d?.id}`)
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

        <div className='ol-md-4'>
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
                    className='form-select form-select-solid'
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
              {valStatAKses.val === 'Pelaksana' || valStatAKses.val === '' ? (
                <>
                  <div>
                    <label htmlFor='' className='mb-3'>
                      Wilayah/Bidang
                    </label>
                    <AsyncSelect
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
                      value={
                        valMasterPelaksana.value ? valMasterPelaksana : {value: '', label: 'Pilih'}
                      }
                      loadOptions={loadOptionsKecamatan}
                      onChange={handleChangeInputKecamatan}
                    />
                  </div>
                  <div>
                    <label htmlFor='' className='mb-3'>
                      Jabatan
                    </label>
                    <AsyncSelect
                      value={
                        valMasterJabatan.value ? valMasterJabatan : {value: '', label: 'Pilih'}
                      }
                      loadOptions={loadOptionsJabatan}
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
                    value={valuesFormik?.nama_hak_akses}
                  />
                </div>
              ) : null}
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
