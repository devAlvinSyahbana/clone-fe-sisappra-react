import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import CardGroup from 'react-bootstrap/CardGroup'
import {Link, useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import Accordion from 'react-bootstrap/Accordion'
// import {SelectOptionAutoCom} from '../KepegawaianInterface'

//creat
export interface FormInput {
  nama_hak_akses?: string
  level?: number
  created_by?: number
}
export interface JumlahPengguna {
  total_data?: number
}
export interface jabatan {
  id?: number
  nama?: string
  status?: string
  level?: string
  id_master_tempat_seksi_pelaksanaan?: number
  created_by?: number
}
export interface wilayah {
  id?: number
  nama?: string
  kategori?: string
  created_by?: number
}
export interface kecamtan {
  id?: number
  nama?: string
  kode?: string
  created_by?: number
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`
export const BIDANG_WILAYAH_URL = `${API_URL}/master/bidang-wilayah`
export const JABATAN_URL = `${API_URL}/master/jabatan`
export const PELAKSANA_URL = `${API_URL}/master/pelaksana`
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
  const arrStatAKses = ['Pelaksana', 'Non Pelaksana']
  const [qParamFind, setUriFind] = useState({strparam: ''})

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [temp, setTemp] = useState([])
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [jumlah_Pengguna, setJumlahPengguna] = useState<JumlahPengguna>()
  const [valuesFormikW, setValuesFormikW] = React.useState<wilayah>({})
  const [valuesFormikK, setValuesFormikK] = React.useState<kecamtan>({})
  const [valuesFormikJ, setValuesFormikJ] = React.useState<jabatan>({})

  //check
  const [valStatCheck, setValStatCheck] = useState({val: ''})

  useEffect(() => {
    const fetchData = async () => {
      const jumlah_Pengguna = await axios.get(
        `${MANAJEMEN_PENGGUNA_URL}/hak-akses/count-total-data`
      )

      setJumlahPengguna(jumlah_Pengguna.data.data)
    }
    fetchDT(1)
    fetchData()
  }, [qParamFind])
  async function fetchDT(page: number) {
    setLoading(true)
    const response = await axios.get(
      `${MANAJEMEN_PENGGUNA_URL}/hak-akses/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setTotalRows(response.data.total_data)
    setLoading(false)
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
    },
    onSubmit: async (values) => {
      let formData = new FormData()
      const bodyparam: FormInput = {
        nama_hak_akses: valuesFormik?.nama_hak_akses ? valuesFormik.nama_hak_akses : '',
        created_by: 0,
      }
      try {
        const response = await axios.post(`${MANAJEMEN_PENGGUNA_URL}/hak-akses/create`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          fetchDT(1)
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

  //check
  const handleChangeCheck = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValStatCheck({val: event.target.value})
  }

  return (
    <CardGroup>
      <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-9'>
        {data &&
          data.length > 0 &&
          data.map((d: any, i: number) => {
            return (
              <>
                <div className='col-md-4'>
                  <div className='card card-flush h-md-100'>
                    <div className='card-header'>
                      <div className='card-title'>
                        <a>{d?.nama_hak_akses}</a>
                      </div>
                    </div>

                    <div className='card-body pt-1'>
                      <div className='fw-bold text-gray-600 mb-5'>
                        Total Pengguna Dengan Hak Akses Ini:
                        <div className='mb-1'>
                          {/* Jumlah Pengguna */}
                          {jumlah_Pengguna?.total_data !== 0
                            ? jumlah_Pengguna?.total_data
                            : 'Tidak Ada Pengguna'}
                          {/* End jumlah */}
                        </div>
                      </div>
                    </div>
                    <div className='card-footer flex-wrap pt-0'>
                      <button
                        onClick={() => navigate(`/apps/detail-hak-akses/DetailHakAkses`)}
                        className='btn btn-light btn-active-primary my-1 me-2'
                      >
                        Detail Hak Akses
                      </button>
                      <button
                        type='button'
                        className='btn btn-light btn-active-light-primary my-1'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_update_role'
                        onClick={handleShow}
                      >
                        Ubah Hak Akses
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )
          })}

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
                <div className='table-responsive'>
                  <table className='table align-middle table-row-dashed fs-6 gy-5'>
                    <label className='fs-5 fw-bold form-label mb-2'>Akses Kontrol</label>
                    <tbody className='text-gray-600 fw-semibold'>
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
                        <h5 className='text-gray-800'>Dashboard Penegakan Perda dan Perkada</h5>
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
                        <h5 className='text-gray-800'>Dashboard Ketentraman dan Ketertiban Umum</h5>
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
                        <h5 className='text-gray-800'>Dashboard Wasdak Protokol Kesehatan(PPKM)</h5>
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
                        <h5 className='text-gray-800'>Informasi Data AKses</h5>
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
                        <h5 className='text-gray-800'>Hirarki AKses</h5>
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
                        <h5 className='text-gray-800'>Laporan Rekapitulasi AKses</h5>
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
                        <h5 className='text-gray-800'>Laporan Rekapitulasi AKses</h5>
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
                        <h5 className='text-gray-800'>Rekapitulasi Data AKses yang Pensiun</h5>
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
                        <h5 className='text-gray-800'>Rekapitulasi Data AKses yang Naik Pangkat</h5>
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
                          Rekapitulasi Data AKses Pejabat Struktural
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
                        <h5 className='text-gray-800'>Penyidik AKses Negri Sipil (PPNS)</h5>
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
                        <h5 className='text-gray-800'>Kehadiran AKses</h5>
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
                      <tr>
                        <td className='text-gray-800'>Perizinan</td>
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
                      <tr>
                        <td className='text-gray-800'>Verifikasi</td>

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

                      <tr>
                        <td className='text-gray-800'>Manajemen Data</td>

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

                      <tr>
                        <td className='text-gray-800'>Monitoring</td>

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

                      <tr>
                        <td className='text-gray-800'>Penegakan Perda dan Perkada</td>
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
                      <tr>
                        <td className='text-gray-800'>Manajemen Pengguna</td>
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
                {/* <img src="assets/media/illustrations/sketchy-1/4.png" alt="" class="mw-100 mh-150px mb-7"> */}

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
                    <option>Pilih</option>
                    {arrStatAKses.map((val: string) => {
                      return <option value={val}>{val}</option>
                    })}
                  </select>
                </div>
              </div>
              {valStatAKses.val === 'Pelaksana' || valStatAKses.val === '' ? (
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
              ) : null}
              {valStatAKses.val === 'Pelaksana' || valStatAKses.val === '' ? (
                <div>
                  <label htmlFor='' className='mb-3'>
                    Kecamtan
                  </label>

                  <AsyncSelect
                    value={
                      valMasterPelaksana.value ? valMasterPelaksana : {value: '', label: 'Pilih'}
                    }
                    loadOptions={loadOptionsKecamatan}
                    onChange={handleChangeInputKecamatan}
                  />
                </div>
              ) : null}
              {valStatAKses.val === 'Pelaksana' || valStatAKses.val === '' ? (
                <div>
                  <label htmlFor='' className='mb-3'>
                    Jabatan
                  </label>
                  <AsyncSelect
                    value={valMasterJabatan.value ? valMasterJabatan : {value: '', label: 'Pilih'}}
                    loadOptions={loadOptionsJabatan}
                    onChange={handleChangeInputJabatan}
                  />
                </div>
              ) : null}
              {valStatAKses.val === 'Non Pelaksana' || valStatAKses.val === '' ? (
                <div>
                  <label htmlFor='' className='mb-3'>
                    Nama Hak Akses
                  </label>
                  <Form.Control
                    name='nama_hak_akses'
                    className='form-control form-control-solid'
                    onChange={handleChangeFormik}
                    value={valuesFormik?.nama_hak_akses}
                  />
                </div>
              ) : null}
              {['checkbox'].map((type) => (
                <div className='fv-row'>
                  <div className='table-responsive'>
                    <table className='table align-middle table-row-dashed fs-6 gy-5'>
                      <tbody className='text-gray-600 fw-semibold'>
                        <label className='fs-5 fw-bold form-label mb-2'>Akses Kontrol</label>
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
                                      <Form.Check
                                        inline
                                        name='level'
                                        id={`inline-${type}-1`}
                                        onChange={handleChangeCheck}
                                        value={valuesFormik?.level}
                                      />
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
                                <h5 className='text-gray-800'>Informasi Data AKses</h5>
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
                                <h5 className='text-gray-800'>Hirarki AKses</h5>
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
                                <h5 className='text-gray-800'>Laporan Rekapitulasi AKses</h5>
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
                                <h5 className='text-gray-800'>Laporan Rekapitulasi AKses</h5>
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
                                  Rekapitulasi Data AKses yang Pensiun
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
                                  Rekapitulasi Data AKses yang Naik Pangkat
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
                                  Rekapitulasi Data AKses Pejabat Struktural
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
                                <h5 className='text-gray-800'>Penyidik AKses Negri Sipil (PPNS)</h5>
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
                                <h5 className='text-gray-800'>Kehadiran AKses</h5>
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
                                <td className='text-gray-800'>
                                  <h3>Master</h3>
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
                                <h5 className='text-gray-800'>Kota</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>SKPD</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Pangkat</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Agama</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Korban Jiwa</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Kecamatan</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Kelurahan</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Jenis Kegiatan</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Jenis Kejadian</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Instansi Terkait</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Jenis Bantuan</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Korban Material</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Jenis Pertolongan</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Jenis Perda / Perkada</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Jenis Penindkan</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Jenis Pelanggaran</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Tempat Pelaksana</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Pendidikan</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Jenis Sarana & Prasana</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Golongan</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Eselon</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Jabatan</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Jenis Penyelesaian</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Sumber Informasi</h5>
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
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <h5 className='text-gray-800'>Jenis Pendidikan</h5>
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
                                      <Form.Check inline id={`inline-${type}-4`} />
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
