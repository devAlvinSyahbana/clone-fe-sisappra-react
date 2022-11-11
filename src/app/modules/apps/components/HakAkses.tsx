import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import CardGroup from 'react-bootstrap/CardGroup'
import {Link, useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import Accordion from 'react-bootstrap/Accordion'
// import {SelectOptionAutoCom} from '../KepegawaianInterface'


//creat


const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const SARANA_PRASARANA_URL = `${API_URL}/sarana-prasarana`
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
  const [valStatPegawai, setValStatPegawai] = useState({val: ''})
  const arrStatPegawai = ['Pelaksana', 'Non Pelaksana']
  const [valFilterNRK, setFilterNRK] = useState({val: ''})
  const [valFilterNoPegawai, setFilterNoPegawai] = useState({val: ''})
  const [qParamFind, setUriFind] = useState({strparam: ''})

  useEffect(() => {
    fetchUsers(1)
  }, [])

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

  const [temp, setTemp] = useState([])

  const fetchUsers = async (page: any) => {
    setLoading(true)
    const value = await axios.get(SARANA_PRASARANA_URL + '/find')

    setTemp(value.data.data)
    console.log('cek response api:', temp)

    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`
    )
    setData(response.data.data)

    setTotalRows(response.data.total)
    setLoading(false)
    console.log('cek ahhh :', data)
    return [data, setData] as const
  }
  const handleChangeStatPegawai = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValStatPegawai({val: event.target.value})
  }
  const handleFilter = async () => {
    let uriParam = ''
    if (valStatPegawai.val !== '') {
      uriParam += `&status=${valStatPegawai.val}`
    }
    if (valFilterNRK.val !== '') {
      uriParam += `&nrk=${valFilterNRK.val}`
    }
    if (valFilterNoPegawai.val !== '') {
      uriParam += `&nopegawai=${valFilterNoPegawai.val}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }
  const handlePageChange = (page: any) => {
    fetchUsers(page)
  }

  const handlePerRowsChange = async (newPerPage: any, page: any) => {
    setLoading(true)

    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${newPerPage}delay=1`
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
  const handleChangeInputNoPegawai = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterNoPegawai({val: event.target.value})
  }
  const handleChangeInputNRK = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterNRK({val: event.target.value})
  }

  //kota
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
  //end kota

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

  return (
    <CardGroup>
      <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-9'>
        <div className='col-md-4'>
          <div className='card card-flush h-md-100'>
            <div className='card-header'>
              <div className='card-title'>
                <h2>PENGADMINISTRASI UMUM KOTA ADMINIS TRASI JAKARTA PUSAT KECAMATAN GAMBIR</h2>
              </div>
            </div>

            <div className='card-body pt-1'>
              <div className='fw-bold text-gray-600 mb-5'>
                Total Pengguna Dengan Hak Akses Ini: 5
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
                        <h5 className='text-gray-800'>Rekapitulasi Data Pegawai yang Pensiun</h5>
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
        <div className='col-md-4'>
          <div className='card card-flush h-md-100'>
            <div className='card-header'>
              <div className='card-title'>
                <h2>
                  PENGELOLA DATA ADMINISTRASI DAN VERIFIKASI SEKRETARIAT PROVINSI DKI JAKARTA
                  SUBBAGIAN UMUM
                </h2>
              </div>
            </div>

            <div className='card-body pt-1'>
              <div className='fw-bold text-gray-600 mb-5'>
                Total Pengguna Dengan Hak Akses Ini: 14
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

        <div className='col-md-4'>
          <div className='card card-flush h-md-100'>
            <div className='card-header'>
              <div className='card-title'>
                <h2>
                  PETUGAS KEAMANAN KOTA ADMINISTRASI JAKARTA SELATAN SEKSI ADMINISTRASI JAKARTA
                  SELATAN SEKSI KETENTRAMAN DAN KETERTIBAN UMUM DAN OPERASI
                </h2>
              </div>
            </div>

            <div className='card-body pt-1'>
              <div className='fw-bold text-gray-600 mb-5'>
                Total Pengguna Dengan Hak Akses Ini: 4
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

        <div className='col-md-4'>
          <div className='card card-flush h-md-100'>
            <div className='card-header'>
              <div className='card-title'>
                <h2>KEPALA SUB BAGIAN UMUM SUBBAGIAN UMUM SEKRETARIAT PROVINSI DKI JAKARTA</h2>
              </div>
            </div>

            <div className='card-body pt-1'>
              <div className='fw-bold text-gray-600 mb-5'>
                Total Pengguna Dengan Hak Akses Ini: 23
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

        <div className='col-md-4'>
          <div className='card card-flush h-md-100'>
            <div className='card-header'>
              <div className='card-title'>
                <h2>
                  ANALIS PENINDAKAN SEKSI OPERASI SEKSI OPERASI BIDANG PENEGAKAN DAN PENINDAKAN
                </h2>
              </div>
            </div>

            <div className='card-body pt-1'>
              <div className='fw-bold text-gray-600 mb-5'>
                Total Pengguna Dengan Hak Akses Ini: 546
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
          <Modal.Header closeButton>
            <Modal.Title>Tambah Hak Akses Pelaksana</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='col-md-6 col-lg-6'></div>
            <div className='form-group'>
              <label htmlFor='' className='mb-3'>
                Status Kepegawaian
              </label>
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <select
                  className='form-select form-select-solid'
                  aria-label='Select example'
                  value={valStatPegawai.val}
                  onChange={handleChangeStatPegawai}
                  name='val'
                >
                  <option value=''>Pilih </option>
                  {arrStatPegawai.map((val: string) => {
                    return <option value={val}>{val}</option>
                  })}
                </select>
              </div>
            </div>
            {valStatPegawai.val === 'Pelaksana' || valStatPegawai.val === '' ? (
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
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
            {valStatPegawai.val === 'Pelaksana' || valStatPegawai.val === '' ? (
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
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
            {valStatPegawai.val === 'Pelaksana' || valStatPegawai.val === '' ? (
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
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

            {/* <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Wilayah / Bidang
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
            </div>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Kecamatan / Seksi
                </label>
                <AsyncSelect
                  value={
                    valMasterPelaksana.value ? valMasterPelaksana : {value: '', label: 'Pilih'}
                  }
                  loadOptions={loadOptionsKecamatan}
                  onChange={handleChangeInputKecamatan}
                />
              </div>
            </div>

            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Jabatan / Kelurahan
              </label>
              <AsyncSelect
                value={valMasterJabatan.value ? valMasterJabatan : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsJabatan}
                onChange={handleChangeInputJabatan}
              />
            </div> */}
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
                              <h5 className='text-gray-800'>Jenis DIDIKAN</h5>
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
            <Button variant='primary' onClick={handleTambahClose}>
              <i className='fa-solid fa-paper-plane'></i>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </CardGroup>
  )
}
