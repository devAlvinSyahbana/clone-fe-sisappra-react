import React, {Fragment, useState, useEffect} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {Button, ButtonGroup, Dropdown, DropdownButton, Modal} from 'react-bootstrap'
import {AddHeaderDetailDUK} from './AddHeaderDetailDUK'
import {
  DetailPegawaiInterface,
  JumlahKeluargaInterface,
  PendidikanInterface,
} from '../KepegawaianInterface'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function AddDataKeluargaDUK() {
  // const location = useLocation()
  const {id, status} = useParams()
  const [dpi, setDpi] = useState<DetailPegawaiInterface>()
  const [jkeluarga, setJkeluarga] = useState<JumlahKeluargaInterface>()
  const [pendidikan, setPendidikan] = useState<PendidikanInterface>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KEPEGAWAIAN_URL}/findone/${id}/${status}`)
      const keluarga = await axios.get(`${KEPEGAWAIAN_URL}/count-keluarga/${id}/${status}`)
      const pendidikan = await axios.get(
        `${KEPEGAWAIAN_URL}/get-pendidikan-terakhir/${id}/${status}`
      )
      setJkeluarga(keluarga.data.data)
      setPendidikan(pendidikan.data.data)
      setDpi(response.data.data)
    }
    fetchData()
  }, [id, status])

  const [show, setShow] = useState(false)
  const [lgShow, setLgShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const columns = [
    {
      name: 'Nama',
      selector: (row: {name: any}) => row.name,
      sortable: true,
    },
    {
      name: 'Hubungan Keluarga',
      selector: (row: {hubungan: any}) => row.hubungan,
      sortable: true,
    },
    {
      name: 'Tempat, Tanggal Lahir',
      selector: (row: {ttl: any}) => row.ttl,
      sortable: true,
    },
    {
      name: 'Jenis Kelamin',
      selector: (row: {jk: any}) => row.jk,
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
                    <Dropdown.Item>
                      <Link className='text-reset' to='/#'>
                        Ubah
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link className='text-reset' to='/#'>
                        Hapus
                      </Link>
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

  const data = [
    {
      id: 1,
      name: 'RAHMI FITRIA ASRIL',
      hubungan: 'Istri',
      ttl: 'JAKARTA, 27-05-1988',
      jk: 'PEREMPUAN',
    },
    {
      id: 2,
      name: 'RAHMI FITRIA ASRIL',
      hubungan: 'Istri',
      ttl: 'JAKARTA, 27-05-1988',
      jk: 'PEREMPUAN',
    },
    {
      id: 3,
      name: 'RAHMI FITRIA ASRIL',
      hubungan: 'Istri',
      ttl: 'JAKARTA, 27-05-1988',
      jk: 'PEREMPUAN',
    },
  ]

  return (
    <div>
      {/* begin::Body */}
      <AddHeaderDetailDUK />
      {/* Second Card */}
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bold m-0'>Data Keluarga</h3>
          </div>
        </div>
        <div className='card-body p-9'>
          <div className='d-flex justify-content-end'>
            <Button
              type='reset'
              onClick={() => setLgShow(true)}
              className='btn btn-primary fw-semibold me-2 px-6'
            >
              <i className='fa fa-plus'></i>
              Tambah
            </Button>
          </div>
          <Modal
            size='lg'
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby='example-modal-sizes-title-lg'
          >
            <Modal.Header closeButton>
              <Modal.Title id='example-modal-sizes-title-lg'>Tambah Data Keluarga</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form id='kt_modal_add_user_form' className='form' action='#'>
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
                      name='kode_e'
                      id='kode_id_e'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder='Nama'
                      value=''
                    />
                  </div>
                  <div className='fv-row mb-7'>
                    <label className='required fw-semibold fs-6 mb-2'>Hubungan Keluarga</label>
                    <input
                      type='text'
                      name='jenis_pelanggaran_e'
                      className=' form-control form-control-solid mb-3 mb-lg-0'
                      placeholder='Hubungan Keluarga'
                      value=''
                    />
                  </div>
                  <div className='fv-row mb-7'>
                    <div id='kt_docs_repeater_basic'>
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
                                />
                              </div>
                              <div className='col-8'>
                                <input
                                  type='date'
                                  className='form-control form-control-solid'
                                  placeholder='Tanggal Lahir'
                                  value=''
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='fv-row mb-7 mt-7'>
                        <label className='required fw-semibold fs-6 mb-2'>Jenis Kelamin</label>
                        <select
                          className='form-select form-select-solid'
                          data-control='select2'
                          data-placeholder='Jenis Kelamin'
                        >
                          <option></option>
                          <option value='1'>LAKI-LAKI</option>
                          <option value='2'>PEREMPUAN</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Discard
              </Button>
              <Button variant='primary' onClick={handleClose}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
          <DataTable columns={columns} data={data} defaultSortFieldId={1} />
          <div className='p-0 mt-6'>
            <div className='text-center'>
              <Link
                className='text-reset text-decoration-none'
                to='/kepegawaian/LaporanRekapitulasiPegawai/TabDaftarUrutKepangkatan/'
              >
                <button className='float-none btn btn-secondary align-self-center m-1'>
                  <i className='fa fa-close'></i>
                  Batal
                </button>
              </Link>
              <Link
                className='text-reset text-decoration-none'
                to={`/kepegawaian/TabDaftarUrutKepangkatan/UpdatePribadiDUK/${id}/${status}`}
              >
                <button className='float-none btn btn-success align-self-center m-1'>
                  <i className='fa-solid fa-arrow-left'></i>
                  Kembali
                </button>
              </Link>
              <Link
                className='text-reset text-decoration-none'
                to={`/kepegawaian/TabDaftarUrutKepangkatan/UpdateDataPendidikanDUK`}
              >
                <button className='float-none btn btn-primary align-self-center m-1'>
                  <i className='fa-solid fa-arrow-right'></i>
                  Lanjut
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}
