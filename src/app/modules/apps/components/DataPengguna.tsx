import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable, {createTheme} from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Swal from 'sweetalert2'
import {KTSVG} from '../../../../_metronic/helpers'
import moment from 'moment'
import FileDownload from 'js-file-download'
import {ThemeModeComponent} from '../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

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

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL

export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`

export function DataPengguna() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const [valNamaLengkap, setFilterNamaLengkap] = useState({val: ''})
  const [valFilterEmail, setFilterEmail] = useState({val: ''})
  const [valFilterHakAkses, setFilterHakAkses] = useState({val: ''})

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [qParamFind, setUriFind] = useState({strparam: ''})

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

  const GetHakAkses = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/hak-akses/findone/${id}`)
        const result: string = data.data.nama_hak_akses
        setValData(result)
      }
      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

  let no = 1

  const columns = [
    {
      name: 'No',
      sortable: true,
      sortField: 'No',
      wrap: true,
      cell: (record: any) => {
        return <div className='mt-5 mb-5'>{no++}</div>
      },
    },
    {
      name: 'Nama',
      selector: (row: any) => row.nama_lengkap,
      sortable: true,
      sortField: 'nama_lengkap',
      wrap: true,
    },
    {
      name: 'Hak Akses',
      selector: (row: any) => row.hak_akses,
      sortable: true,
      sortField: 'hak_akses',
      wrap: true,
      center: true,
      cell: (record: any) => <GetHakAkses row={parseInt(record.hak_akses)} />,
    },
    {
      name: 'Terakhir Login',
      selector: (row: any) => row.terakhir_login,
      sortable: true,
      sortField: 'terakhir_login',
      wrap: true,
      center: true,
    },
    {
      name: 'Tanggal Bergabung',
      selector: (row: any) => moment(row.tgl_bergabung).format('D MMMM YYYY'),
      sortable: true,
      sortField: 'tgl_bergabung',
      wrap: true,
      width: '180px',
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
          <Fragment>
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
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate('/apps/data-pengguna/update-data-pengguna/' + record.id, {
                          replace: true,
                        })
                      }
                    >
                      Ubah
                    </Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      onClick={() => konfirDel(record.id, record.status_pegawai)}
                    >
                      Hapus
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

  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      const response = await axios.get(
        `${MANAJEMEN_PENGGUNA_URL}/filter-data-pengguna?limit=${perPage}&offset=${page}${qParamFind.strparam}`
      )
      setData(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchDT(1)
  }, [qParamFind, perPage])

  const fetchData = async (page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${MANAJEMEN_PENGGUNA_URL}/filter-data-pengguna?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setTotalRows(response.data.total_data)
    setLoading(false)

    return [data, setData] as const
  }

  const handlePageChange = (page: number) => {
    fetchData(page)
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${MANAJEMEN_PENGGUNA_URL}/filter-data-pengguna?limit=${newPerPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (valNamaLengkap.val !== '') {
      uriParam += `&nama_lengkap=${valNamaLengkap.val}`
    }
    if (valFilterHakAkses.val !== '') {
      uriParam += `&hak_akses=${valFilterHakAkses.val}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleFilterReset = () => {
    setFilterHakAkses({val: ''})
    setFilterNamaLengkap({val: ''})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const handleChangeInputNamaLengkap = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterNamaLengkap({val: event.target.value})
  }

  const handleChangeInputHakAkses = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterHakAkses({val: event.target.value})
  }

  const handleChangeInputEmail = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterEmail({val: event.target.value})
  }

  const handleUnduh = async () => {
    setbtnLoadingUnduh(true)
    await axios({
      url: `${MANAJEMEN_PENGGUNA_URL}/unduh-data-pengguna?q=1${qParamFind.strparam}`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(response.data, 'DATA PENGGUNA.xlsx')
      setbtnLoadingUnduh(false)
    })
  }

  return (
    <>
      <div id='kt_app_content' className='app-content flex-column-fluid'>
        <div className='card'>
          <div className='card card-flush h-xl-100'>
            <div className='card-header border-1 pt-6'>
              <div className='col-xl-12  mt-6'>
                <div className='accordion accordion-icon-toggle' id='kt_accordion_2'>
                  <div className='mb-5'>
                    <div
                      className='accordion-header py-3 d-flex'
                      data-bs-toggle='collapse'
                      data-bs-target='#kt_accordion_2_item_1'
                    >
                      <span className='accordion-icon'>
                        <span className='svg-icon svg-icon-4'>
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <rect
                              opacity='0.5'
                              x='18'
                              y='13'
                              width='13'
                              height='2'
                              rx='1'
                              transform='rotate(-180 18 13)'
                              fill='currentColor'
                            />
                            <path
                              d='M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z'
                              fill='currentColor'
                            />
                          </svg>
                        </span>
                      </span>
                      <h3 className='fs-4 fw-semibold mb-0 ms-4'>Pilihan Filter</h3>
                    </div>
                    <div
                      id='kt_accordion_2_item_1'
                      className='fs-6 collapse show ps-10'
                      data-bs-parent='#kt_accordion_2'
                    >
                      <div id='kt_advanced_search_form'>
                        <div className='row g-8 mt-2'>
                          <div className='col-xxl-3 col-lg-3 col-md-3 col-sm-12'>
                            <input
                              type='text'
                              className='form-control form-control form-control-solid'
                              name='nama'
                              value={valNamaLengkap.val}
                              onChange={handleChangeInputNamaLengkap}
                              placeholder='Masukkan Nama / Hak Akses'
                            />
                          </div>
                          <div className='col-xxl-3 col-lg-3 col-md-3 col-sm-12'>
                            <Link to='#' onClick={handleFilter}>
                              <button className='btn btn-light-primary me-2'>
                                <KTSVG
                                  path='/media/icons/duotune/general/gen021.svg'
                                  className='svg-icon-2'
                                />
                                Cari
                              </button>
                            </Link>
                          </div>
                          <div className='d-flex justify-content-end col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <Link to='/apps/data-pengguna/tambah-data-pengguna'>
                              {/* begin::Add user */}
                              <button type='button' className='btn btn-primary me-2'>
                                <KTSVG
                                  path='/media/icons/duotune/arrows/arr075.svg'
                                  className='svg-icon-2'
                                />
                                Tambah
                              </button>
                              {/* end::Add user */}
                            </Link>
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
                          </div>
                        </div>
                      </div>
                      <div className='row g-8 mt-2'>
                        <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
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
                            {/* end::Content */}
                          </div>
                          {/* end::SubMenu */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-100px'
              style={{}}
              data-theme='light'
            ></div>

            <div className='card-body mt-n20'>
              <div className='mt-n20 position-relatve'>
                <div className='card border card-flush h-xl-100'>
                  <div className='table-responsive mt-5 ms-5 me-5 w'>
                    <DataTable
                      columns={columns}
                      data={data}
                      progressPending={loading}
                      progressComponent={<LoadingAnimation />}
                      pagination
                      paginationServer
                      paginationTotalRows={totalRows}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
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
              </div>
            </div>
          </div>
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}
