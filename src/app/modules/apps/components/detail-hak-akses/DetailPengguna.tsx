import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {KTSVG} from '../../../../../_metronic/helpers'
import FileDownload from 'js-file-download'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form'

export interface FormInput {
  id?: number
  nama_hak_akses?: string
  nama_permission?: number
  kode?: number
  updated_by?: number
}

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

interface GetDataInterface {
  id?: number
  nama_hak_akses?: string
  nama_permission?: number
  kode?: number
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function DetailPengguna() {
  const {id} = useParams()
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})
  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const navigate = useNavigate()
  const [qParamFind, setUriFind] = useState({strparam: ''})
  const [show, setShow] = useState(false)
  const [showKata, setShowKata] = useState(false)
  const [showHak, setShowHak] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleKataClose = () => setShowKata(false)
  const handleKataShow = () => setShowKata(true)
  const handleHakClose = () => setShowHak(false)
  const handleHakShow = () => setShowHak(true)
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/hak-akses/findone/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        kode: jsonD.kode,
        nama_permission: jsonD.nama_permission,
        nama_hak_akses: jsonD.nama_hak_akses,
        updated_by: 0,
      }
      setValuesFormikExist((prevstate) => ({...prevstate, ...paramValue}))
    }
    fetchData()
  }, [valuesFormikExist, valuesFormik, id])

  //unduh
  const handleUnduh = async () => {
    setbtnLoadingUnduh(true)
    await axios({
      url: `${KEPEGAWAIAN_URL}/rekapitulasi-pegawai-naik-pangkat/unduh?status=${qParamFind.strparam}`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(response.data, 'DATA STATUS KENAIKAN PANGKAT.xlsx')
      setbtnLoadingUnduh(false)
    })
  }
  //end unduh

  const formik = useFormik({
    initialValues: {
      id: 0,
      kode: '',
      nama_hak_akses: 0,
      nama_permission: 0,
      terakhir_login: 0,
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        kode: valuesFormik?.kode
          ? valuesFormik.kode
          : valuesFormikExist?.kode
          ? valuesFormikExist.kode
          : 0,
        nama_hak_akses: valuesFormik?.nama_hak_akses
          ? valuesFormik.nama_hak_akses
          : valuesFormikExist?.nama_hak_akses
          ? valuesFormikExist.nama_hak_akses
          : '',
        nama_permission: valuesFormik?.nama_permission
          ? valuesFormik.nama_permission
          : valuesFormikExist?.nama_permission
          ? valuesFormikExist.nama_permission
          : 0,
        updated_by: 0,
      }
      try {
        const response = await axios.put(
          `${MANAJEMEN_PENGGUNA_URL}/manajemen-pengguna/update/${id}`,
          bodyparam
        )
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/apps/detail-hak-akses/DetailPengguna/', {
            replace: true,
          })
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

  return (
    <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-9'>
      <div className='col-md-2'>
        <div className='card card-flush h-md-100'>
          <div className='card-header'></div>
        </div>
      </div>
      <div className='flex-lg-row-fluid ms-lg-15'>
        <ul
          className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8'
          role='tablist'
        >
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link text-active-primary pb-4 active'
              data-kt-countup-tabs='true'
              data-bs-toggle='tab'
              href='#kt_user_view_overview_security'
              data-kt-initialized='1'
              aria-selected='true'
              role='tab'
            >
              Keamanan
            </a>
          </li>

          <li className='nav-item' role='presentation'>
            <a
              className='nav-link text-active-primary pb-4'
              data-bs-toggle='tab'
              href='#kt_user_view_overview_events_and_logs_tab'
              aria-selected='false'
              // tabindex='-1'
              role='tab'
            >
              Logs
            </a>
          </li>
        </ul>

        <div className='tab-content' id='myTabContent'>
          <div
            className='tab-pane fade show active'
            id='kt_user_view_overview_security'
            role='tabpanel'
          >
            <div className='card pt-4 mb-6 mb-xl-9'>
              <div className='card-header border-0'>
                <div className='card-title'>
                  <h2>Profile</h2>
                </div>
              </div>

              <div className='card-body pt-0 pb-5'>
                <div className='table-responsive'>
                  <table
                    className='table align-middle table-row-dashed gy-5'
                    id='kt_table_users_login_session'
                  >
                    <tbody className='fs-6 fw-semibold text-gray-600'>
                      <tr>
                        <td>Nama Permission</td>
                        <td>
                          <Form.Control
                            name='nama_permission'
                            className='form-control form-control-solid'
                            value={
                              valuesFormikExist?.nama_permission
                                ? valuesFormikExist?.nama_permission
                                : ''
                            }
                            readOnly
                          />
                        </td>
                        <td className='text-end'>
                          <button
                            type='button'
                            className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_update_email'
                            onClick={handleShow}
                          >
                            <span className='svg-icon svg-icon-3'>
                              <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  opacity='0.3'
                                  d='M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z'
                                  fill='currentColor'
                                ></path>
                                <path
                                  d='M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z'
                                  fill='currentColor'
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Kode</td>
                        <td>
                          <Form.Control
                            name='kode'
                            className='form-control form-control-solid'
                            value={valuesFormikExist?.kode ? valuesFormikExist?.kode : 0}
                            readOnly
                          />
                        </td>
                        <td className='text-end'>
                          <button
                            type='button'
                            className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_update_password'
                            onClick={handleKataShow}
                          >
                            <span className='svg-icon svg-icon-3'>
                              <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  opacity='0.3'
                                  d='M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z'
                                  fill='currentColor'
                                ></path>
                                <path
                                  d='M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z'
                                  fill='currentColor'
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Nama Hak Akses</td>
                        <td>
                          <Form.Control
                            name='nama_hak_akses'
                            className='form-control form-control-solid'
                            value={
                              valuesFormikExist?.nama_hak_akses
                                ? valuesFormikExist?.nama_hak_akses
                                : ''
                            }
                            readOnly
                          />
                        </td>
                        <td className='text-end'>
                          <button
                            type='button'
                            className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_update_role'
                            onClick={handleHakShow}
                          >
                            <span className='svg-icon svg-icon-3'>
                              <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  opacity='0.3'
                                  d='M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z'
                                  fill='currentColor'
                                ></path>
                                <path
                                  d='M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z'
                                  fill='currentColor'
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </td>
                      </tr>
                      <div className='d-grid gap-2 d-md-flex justify-content-md'>
                        <Link to='/apps/detail-hak-akses/DetailHakAkses'>
                          <button className='btn btn-secondary'>
                            <i className='fa-solid fa-arrow-left'></i>
                            Kembali
                          </button>
                        </Link>
                      </div>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ubah Kode</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className='mb-3 form-control-solid'>
                  <Form.Control
                    name='kode'
                    className='form-control form-control-solid'
                    value={valuesFormikExist?.kode ? valuesFormikExist?.kode : 0}
                  />
                </Form.Group>
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
            </Modal>
          </>
          <>
            <Modal show={showKata} onHide={handleKataClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ubah Nama Hak Akses</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className='mb-3 form-control-solid'>
                  <Form.Control
                    name='nama_hak_akses'
                    className='form-control form-control-solid'
                    value={
                      valuesFormikExist?.nama_hak_akses ? valuesFormikExist?.nama_hak_akses : ''
                    }
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleKataClose}>
                  Close
                </Button>
                <button className='btn btn-primary' type='submit'>
                  <i className='fa-solid fa-paper-plane'></i>
                  Simpan
                </button>
              </Modal.Footer>
            </Modal>
          </>
          <>
            <Modal show={showHak} onHide={handleHakClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ubah Nama Permission</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className='mb-3 form-control-solid'>
                  <Form.Control
                    name='nama_permission'
                    className='form-control form-control-solid'
                    value={
                      valuesFormikExist?.nama_permission ? valuesFormikExist?.nama_permission : ''
                    }
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleHakClose}>
                  Close
                </Button>
                <button className='btn btn-primary' type='submit'>
                  <i className='fa-solid fa-paper-plane'></i>
                  Simpan
                </button>
              </Modal.Footer>
            </Modal>
          </>
          <div
            className='tab-pane fade'
            id='kt_user_view_overview_events_and_logs_tab'
            role='tabpanel'
          >
            <div className='card pt-4 mb-6 mb-xl-9'>
              <div className='card-header border-0'>
                <div className='card-title'>
                  <h2>Logs</h2>
                </div>

                <div className='card-toolbar'>
                  <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                    {/* begin::Filter Button */}
                    <button
                      type='button'
                      className='btn btn-light-primary'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-end'
                    >
                      {btnLoadingUnduh ? (
                        <>
                          <span className='spinner-border spinner-border-md align-middle me-3'></span>{' '}
                          Memproses Unduh...
                        </>
                      ) : (
                        <>
                          <KTSVG
                            path='/media/icons/duotune/arrows/arr078.svg'
                            className='svg-icon-2'
                          />
                          Unduh
                        </>
                      )}
                    </button>
                    {/* end::Filter Button */}
                    {/* begin::SubMenu */}
                    <div
                      className='menu menu-sub menu-sub-dropdown w-100px w-md-150px'
                      data-kt-menu='true'
                    >
                      {/* begin::Header */}
                      <div className='px-7 py-5'>
                        <div className='fs-5 text-dark fw-bolder'>Pilihan Unduh</div>
                      </div>
                      {/* end::Header */}

                      {/* begin::Separator */}
                      <div className='separator border-gray-200'></div>
                      {/* end::Separator */}

                      {/* begin::Content */}
                      <div className='px-7 py-5' data-kt-user-table-filter='form'>
                        <button
                          onClick={handleUnduh}
                          className='btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success w-100'
                        >
                          Excel
                        </button>
                      </div>
                      <div className='px-7 py-5' data-kt-user-table-filter='form'>
                        <button
                          onClick={() =>
                            navigate(`/kepegawaian/LaporanRekapitulasiPegawai/UnduhNaikPangkatPdf`)
                          }
                          className='btn btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger w-100'
                        >
                          PDF
                        </button>
                      </div>
                      {/* end::Content */}
                    </div>
                    {/* end::SubMenu */}
                  </div>
                </div>
              </div>

              <div className='card-body py-0'>
                <div className='table-responsive'>
                  <table
                    className='table align-middle table-row-dashed fw-semibold text-gray-600 fs-6 gy-5'
                    id='kt_table_users_logs'
                  >
                    <tbody>
                      <tr>
                        <td className='min-w-70px'>
                          <div className='badge badge-light-success'>200 OK</div>
                        </td>

                        <td>POST /v1/invoices/in_9319_8822/payment</td>

                        <td className='pe-0 text-end min-w-200px'>10 Mar 2022, 8:43 pm</td>
                      </tr>

                      <tr>
                        <td className='min-w-70px'>
                          <div className='badge badge-light-warning'>404 WRN</div>
                        </td>

                        <td>POST /v1/customer/c_62cfa2fd63db1/not_found</td>

                        <td className='pe-0 text-end min-w-200px'>21 Feb 2022, 5:20 pm</td>
                      </tr>

                      <tr>
                        <td className='min-w-70px'>
                          <div className='badge badge-light-success'>200 OK</div>
                        </td>

                        <td>POST /v1/invoices/in_5646_7664/payment</td>

                        <td className='pe-0 text-end min-w-200px'>10 Nov 2022, 9:23 pm</td>
                      </tr>

                      <tr>
                        <td className='min-w-70px'>
                          <div className='badge badge-light-success'>200 OK</div>
                        </td>

                        <td>POST /v1/invoices/in_9319_8822/payment</td>

                        <td className='pe-0 text-end min-w-200px'>21 Feb 2022, 5:30 pm</td>
                      </tr>

                      <tr>
                        <td className='min-w-70px'>
                          <div className='badge badge-light-success'>200 OK</div>
                        </td>

                        <td>POST /v1/invoices/in_5646_7664/payment</td>

                        <td className='pe-0 text-end min-w-200px'>25 Oct 2022, 9:23 pm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
