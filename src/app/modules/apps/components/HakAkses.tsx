import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import {Link, useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const SARANA_PRASARANA_URL = `${API_URL}/sarana-prasarana` //http://localhost:3000/sarana-prasarana

export function HakAkses() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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

  return (
    <CardGroup>
      <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-9'>
        <div className='col-md-4'>
          <div className='card card-flush h-md-100'>
            <div className='card-header'>
              <div className='card-title'>
                <h2>Administrator</h2>
              </div>
            </div>

            <div className='card-body pt-1'>
              <div className='fw-bold text-gray-600 mb-5'>
                Total pengguna dengan hak akses ini: 5
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
                <label className='fs-5 fw-bold form-label mb-2'>Akses Kontrol</label>
                <div className='table-responsive'>
                  <table className='table align-middle table-row-dashed fs-6 gy-5'>
                    <tbody className='text-gray-600 fw-semibold'>
                      <tr>
                        <td className='text-gray-800'>
                          Administrator Akses
                          <i
                            className='fas fa-exclamation-circle ms-1 fs-7'
                            data-bs-toggle='tooltip'
                            aria-label='Memungkinkan akses penuh ke sistem'
                            data-kt-initialized='1'
                          ></i>
                        </td>
                        <td>
                          <label className='form-check form-check-sm form-check-custom form-check-solid me-9'>
                            {/* <input className="form-check-input" type="checkbox" value="" id="kt_roles_select_all"> */}
                            {/* <span className='form-check-label' for='kt_roles_select_all'> */}
                            Pilih semua
                            {/* </span> */}
                          </label>
                        </td>
                      </tr>
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
                <h2>Developer</h2>
              </div>
            </div>

            <div className='card-body pt-1'>
              <div className='fw-bold text-gray-600 mb-5'>
                Total pengguna dengan hak akses ini: 14
              </div>
            </div>
            <div className='card-footer flex-wrap pt-0'>
              <a
                href='../../demo1/dist/sisappra/user-management/roles/view.html'
                className='btn btn-light btn-active-primary my-1 me-2'
              >
                Detail Hak Akses
              </a>
              <button
                type='button'
                className='btn btn-light btn-active-light-primary my-1'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_update_role'
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
                <h2>Analyst</h2>
              </div>
            </div>

            <div className='card-body pt-1'>
              <div className='fw-bold text-gray-600 mb-5'>
                Total pengguna dengan hak akses ini: 4
              </div>
            </div>
            <div className='card-footer flex-wrap pt-0'>
              <a
                href='../../demo1/dist/sisappra/user-management/roles/view.html'
                className='btn btn-light btn-active-primary my-1 me-2'
              >
                Detail Hak Akses
              </a>
              <button
                type='button'
                className='btn btn-light btn-active-light-primary my-1'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_update_role'
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
                <h2>Support</h2>
              </div>
            </div>

            <div className='card-body pt-1'>
              <div className='fw-bold text-gray-600 mb-5'>
                Total pengguna dengan hak akses ini: 23
              </div>
            </div>

            <div className='card-footer flex-wrap pt-0'>
              <a
                href='../../demo1/dist/sisappra/user-management/roles/view.html'
                className='btn btn-light btn-active-primary my-1 me-2'
              >
                Detail Hak Akses
              </a>
              <button
                type='button'
                className='btn btn-light btn-active-light-primary my-1'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_update_role'
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
                <h2>Trial</h2>
              </div>
            </div>

            <div className='card-body pt-1'>
              <div className='fw-bold text-gray-600 mb-5'>
                Total pengguna dengan hak akses ini: 546
              </div>
            </div>
            <div className='card-footer flex-wrap pt-0'>
              <a
                href='../../demo1/dist/sisappra/user-management/roles/view.html'
                className='btn btn-light btn-active-primary my-1 me-2'
              >
                Detail Hak Akses
              </a>
              <button
                type='button'
                className='btn btn-light btn-active-light-primary my-1'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_update_role'
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
              >
                <div className='fw-bold fs-3 text-gray-600 text-hover-primary'>
                  Tambah Hak Akses
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </CardGroup>
  )
}
