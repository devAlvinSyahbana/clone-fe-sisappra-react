import {useEffect, Fragment, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import DataTable, {createTheme} from 'react-data-table-component'
import {Button, ButtonGroup, Dropdown, DropdownButton, Modal} from 'react-bootstrap'
import {UpdateHeaderDetail} from './UpdateHeaderDetail'
import axios from 'axios'
import moment from 'moment'
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

export function UpdateDataKeluarga() {
  const {id, status} = useParams()
  const {mode} = useThemeMode()
  const [loading, setLoading] = useState(false)
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [data, setData] = useState([])
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
      const response = await axios.get(`${KEPEGAWAIAN_URL}/find-data-keluarga/${id}/${status}`)
      setData(response.data.data)
      setLoading(false)
    }
    fetchDT()
  }, [id, status])

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
            <button type='button' className='btn btn-primary me-2' onClick={() => setShow(true)}>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Tambah
            </button>
          </div>
          <DataTable
            className='mt-4'
            progressPending={loading}
            progressComponent={<LoadingAnimation />}
            columns={columns}
            data={data}
            pagination
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
            onHide={() => setShow(false)}
            aria-labelledby='example-modal-sizes-title-lg'
            backdrop='static'
            keyboard={false}
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
                Tutup
              </Button>
              <Button variant='primary' onClick={handleClose}>
                Simpan
              </Button>
            </Modal.Footer>
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
