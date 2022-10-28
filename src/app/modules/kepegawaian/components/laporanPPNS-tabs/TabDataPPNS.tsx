import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable, {createTheme} from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import AsyncSelect from 'react-select/async'
import {KTSVG} from '../../../../../_metronic/helpers'
import FileDownload from 'js-file-download'
import {LaporanPPNSHeader} from './LaporanPPNSHeader'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {GOLONGAN_URL, PANGKAT_URL, SKPD_URL} from '../update-tabs-ppns/UpdateDataPPNS'

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

export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const PPNS_UNDUH_URL = `${API_URL}/kepegawaian`
export const MASTER_SKPD = `${API_URL}/master/skpd`
export const MASTER_PANGKAT = `${API_URL}/master/pangkat`
export const MASTER_GOLONGAN = `${API_URL}/master/golongan`

export function TabDataPPNS() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const [valFilterNama, setFilterNama] = useState({val: ''})
  const [valFilterNRK, setFilterNRK] = useState({val: ''})
  const [valFilterNIP, setFilterNIP] = useState({val: ''})

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

  const GetSKPD = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(`${SKPD_URL}/findone/${id}`)
        const result: string = data.data.skpd
        setValData(result)
      }
      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

  const GetGolongan = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(`${GOLONGAN_URL}/findone/${id}`)
        const result: string = data.data.golongan
        setValData(result)
      }
      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

  const GetPangkat = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(`${PANGKAT_URL}/findone/${id}`)
        const result: string = data.data.pangkat
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
      sortField: 'kepegawaian_nrk',
      wrap: true,
      cell: (record: any) => {
        return <div className='mt-5 mb-5'>{no++}</div>
      },
    },
    {
      name: 'SKPD',
      selector: (row: any) => row.skpd,
      sortable: true,
      sortField: 'skpd',
      width: '240px',
      center: true,
      wrap: true,
      cell: (record: any) => <GetSKPD row={parseInt(record.skpd)} />,
    },
    {
      name: 'Nama',
      selector: (row: any) => row.pejabat_ppns_nama,
      sortable: true,
      sortField: 'nama',
      width: '240px',
      center: true,
      wrap: true,
    },
    {
      name: 'NIP',
      selector: (row: any) => row.pejabat_ppns_nip,
      sortable: true,
      sortField: 'nip',
      wrap: true,
      center: true,
      width: '170px',
    },
    {
      name: 'NRK',
      selector: (row: any) => row.pejabat_ppns_nrk,
      sortable: true,
      sortField: 'nrk',
      wrap: true,
      center: true,
      width: '150px',
    },
    {
      name: 'Pangkat',
      selector: (row: any) => row.pejabat_ppns_pangkat,
      sortable: true,
      sortField: 'pangkat',
      wrap: true,
      width: '150px',
      center: true,
      cell: (record: any) => <GetPangkat row={parseInt(record.pejabat_ppns_pangkat)} />,
    },
    {
      name: 'Golongan',
      selector: (row: any) => row.pejabat_ppns_golongan,
      sortable: true,
      sortField: 'golongan',
      wrap: true,
      width: '150px',
      center: true,
      cell: (record: any) => <GetGolongan row={parseInt(record.pejabat_ppns_golongan)} />,
    },
    {
      name: 'No. SK. PPNS',
      selector: (row: any) => row.no_sk_ppns,
      sortable: true,
      sortField: 'no_sk_ppns',
      width: '220px',
      wrap: true,
      center: true,
    },
    {
      name: 'No. KTP PPNS',
      selector: (row: any) => row.no_ktp_ppns,
      sortable: true,
      sortField: 'no_ktp_ppns',
      wrap: true,
      width: '150px',
      center: true,
    },
    {
      name: 'Wilayah Kerja',
      selector: (row: any) => row.wilayah_kerja,
      sortable: true,
      width: '190px',
      center: true,
      sortField: 'wilayah_kerja',
      wrap: true,
    },
    {
      name: 'UU yang dikawal',
      selector: (row: any) => row.uu_yg_dikawal,
      sortable: true,
      width: '190px',
      center: true,
      sortField: 'uu_yg_dikawal',
      wrap: true,
    },
    {
      name: 'Aksi',
      sortable: false,
      text: 'Aksi',
      className: 'action',
      center: true,
      allowOverflow: true,
      cell: (record: any) => {
        return (
          <Fragment>
            <div className='mb-2 mt-2'>
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
                        navigate(`/kepegawaian/tab-data-ppns/ubah-data-ppns/${record?.id}`, {
                          replace: true,
                        })
                      }
                    >
                      Ubah
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
        `${KEPEGAWAIAN_URL}/PPNS?limit=${perPage}&offset=${page}${qParamFind.strparam}`
      )
      setData(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchDT(1)
  }, [qParamFind, perPage])

  const fetchUser = async (page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${KEPEGAWAIAN_URL}/PPNS?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setTotalRows(response.data.total_data)
    setLoading(false)

    return [data, setData] as const
  }

  const handlePageChange = (page: number) => {
    fetchUser(page)
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${KEPEGAWAIAN_URL}/PPNS?limit=${newPerPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  // GET DATA
  interface SelectOptionAutoCom {
    readonly value: string
    readonly label: string
    readonly color: string
    readonly isFixed?: boolean
    readonly isDisabled?: boolean
  }

  // GET SKPD
  const [inputValSKPD, setFilterSKPD] = useState({label: '', value: null})
  const filterSKPD = async (inputValue: string) => {
    const response = await axios.get(MASTER_SKPD + '/filter/' + inputValue)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.skpd, value: i.id}))
  }
  const loadOptionsSKPD = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterSKPD(inputValue))
    }, 1000)
  }
  const handleChangeInputSKPD = (newValue: any) => {
    setFilterSKPD((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // GET PANGKAT
  const [inputValPangkat, setFilterPangkat] = useState({label: '', value: null})
  const filterPangkat = async (inputValue: string) => {
    const response = await axios.get(MASTER_PANGKAT + '/filter/' + inputValue)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.pangkat, value: i.id}))
  }
  const loadOptionsPangkat = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterPangkat(inputValue))
    }, 1000)
  }
  const handleChangeInputPangkat = (newValue: any) => {
    setFilterPangkat((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // GET GOLONGAN
  const [inputValGolongan, setFilterGolongan] = useState({label: '', value: null})
  const filterGolongan = async (inputValue: string) => {
    const response = await axios.get(MASTER_GOLONGAN + '/filter/' + inputValue)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.golongan, value: i.id}))
  }
  const loadOptionsGolongan = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterGolongan(inputValue))
    }, 1000)
  }
  const handleChangeInputGolongan = (newValue: any) => {
    setFilterGolongan((prevstate: any) => ({...prevstate, ...newValue}))
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (inputValSKPD.value) {
      uriParam += `&skpd=${inputValSKPD.value}`
    }
    if (valFilterNama.val !== '') {
      uriParam += `&pejabat_ppns_nama=${valFilterNama.val}`
    }
    if (valFilterNRK.val !== '') {
      uriParam += `&pejabat_ppns_nrk=${valFilterNRK.val}`
    }
    if (valFilterNIP.val !== '') {
      uriParam += `&pejabat_ppns_nip=${valFilterNIP.val}`
    }
    if (inputValPangkat.value) {
      uriParam += `&pejabat_ppns_pangkat=${inputValPangkat.value}`
    }
    if (inputValGolongan.value) {
      uriParam += `&pejabat_ppns_golongan=${inputValGolongan.value}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleFilterReset = () => {
    setFilterNama({val: ''})
    setFilterNRK({val: ''})
    setFilterNIP({val: ''})
    setFilterSKPD({label: '', value: null})
    setFilterPangkat({label: '', value: null})
    setFilterGolongan({label: '', value: null})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const handleChangeInputNama = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterNama({val: event.target.value})
  }
  const handleChangeInputNRK = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterNRK({val: event.target.value})
  }
  const handleChangeInputNIP = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterNIP({val: event.target.value})
  }

  const handleUnduh = async () => {
    setbtnLoadingUnduh(true)
    await axios({
      url: `${PPNS_UNDUH_URL}/unduh-PPNS?q=1${qParamFind.strparam}`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(response.data, 'DATA PENYIDIK PEGAWAI NEGERI SIPIL.xlsx')
      setbtnLoadingUnduh(false)
    })
  }

  return (
    <>
      <LaporanPPNSHeader />
      <div id='kt_app_content' className='app-content flex-column-fluid'>
        <div className='card'>
          <div className='card card-flush h-xl-100'>
            <div className='card-header border-1 pt-6'>
              <div className='col-xl-12 mb-xl-12 mt-6'>
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
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <label htmlFor='' className='mb-3'>
                              Nama
                            </label>
                            <input
                              type='text'
                              className='form-control form-control form-control-solid'
                              name='pejabat_ppns_nama'
                              value={valFilterNama.val}
                              onChange={handleChangeInputNama}
                              placeholder='Masukkan Nama'
                            />
                          </div>
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <label htmlFor='' className='mb-3'>
                              Pangkat
                            </label>
                            <AsyncSelect
                              cacheOptions
                              value={
                                inputValPangkat.value
                                  ? inputValPangkat
                                  : {value: '', label: 'Pilih Pangkat'}
                              }
                              loadOptions={loadOptionsPangkat}
                              defaultOptions
                              onChange={handleChangeInputPangkat}
                              placeholder={'Pilih'}
                              styles={
                                calculatedMode === 'dark'
                                  ? reactSelectDarkThem
                                  : reactSelectLightThem
                              }
                              loadingMessage={() => 'Sedang mencari pilihan...'}
                              noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                            />
                          </div>
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <label htmlFor='' className='mb-3'>
                              NRK
                            </label>
                            <input
                              type='text'
                              className='form-control form-control form-control-solid'
                              name='pejabat_ppns_nrk'
                              value={valFilterNRK.val}
                              onChange={handleChangeInputNRK}
                              placeholder='Masukkan NRK'
                            />
                          </div>
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <label htmlFor='' className='mb-3'>
                              Golongan
                            </label>
                            <AsyncSelect
                              cacheOptions
                              value={
                                inputValGolongan.value
                                  ? inputValGolongan
                                  : {value: '', label: 'Pilih Golongan'}
                              }
                              loadOptions={loadOptionsGolongan}
                              defaultOptions
                              onChange={handleChangeInputGolongan}
                              placeholder={'Pilih'}
                              styles={
                                calculatedMode === 'dark'
                                  ? reactSelectDarkThem
                                  : reactSelectLightThem
                              }
                              loadingMessage={() => 'Sedang mencari pilihan...'}
                              noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                            />
                          </div>
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <label htmlFor='' className='mb-3'>
                              NIP
                            </label>
                            <input
                              type='text'
                              className='form-control form-control form-control-solid'
                              name='pejabat_ppns_nip'
                              value={valFilterNIP.val}
                              onChange={handleChangeInputNIP}
                              placeholder='Masukkan NIP'
                            />
                          </div>
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <div className='form-group'>
                              <label htmlFor='' className='mb-3'>
                                SKPD
                              </label>
                              <AsyncSelect
                                cacheOptions
                                value={
                                  inputValSKPD.value
                                    ? inputValSKPD
                                    : {value: '', label: 'Pilih SKPD'}
                                }
                                loadOptions={loadOptionsSKPD}
                                defaultOptions
                                onChange={handleChangeInputSKPD}
                                placeholder={'Pilih'}
                                styles={
                                  calculatedMode === 'dark'
                                    ? reactSelectDarkThem
                                    : reactSelectLightThem
                                }
                                loadingMessage={() => 'Sedang mencari pilihan...'}
                                noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row g-8 mt-2'>
                        <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                          <Link to='#' onClick={handleFilter}>
                            <button className='btn btn-light-primary me-2'>
                              <KTSVG
                                path='/media/icons/duotune/general/gen021.svg'
                                className='svg-icon-2'
                              />
                              Cari
                            </button>
                          </Link>
                          <Link to='#' onClick={handleFilterReset}>
                            <button className='btn btn-light-primary'>
                              <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                              Reset
                            </button>
                          </Link>
                        </div>
                        <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                          <Link to='/kepegawaian/tab-data-ppns/tambah-data-ppns'>
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
              className='card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px'
              style={{
                backgroundImage: 'url(' + toAbsoluteUrl('/media/svg/shapes/top-blue.jpg') + ')',
              }}
              data-theme='light'
            >
              <div className='card-body py-8 mt-4 fw-bold text-white'>
                <div className='row'>
                  <div className='col fs-4 mb-2 fw-bold text-center'>
                    DATA PEJABAT PENYIDIK PEGAWAI NEGERI SIPIL (PPNS)
                  </div>
                </div>
                <div className='row'>
                  <div className='col fs-4 mb-2 fw-bold text-center'>PROVINSI DKI JAKARTA</div>
                </div>
              </div>
            </div>

            <div className='card-body mt-n20'>
              <div className='mt-n20 position-relative'>
                <div className='card border card-flush h-xl-100'>
                  <div className='table-responsive mt-5 ms-5 me-5'>
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
            <div className='row me-2'>
              <div className='col-8'></div>
              <div className='col-4 fs-6 mb-2 fw-semibold text-center'>
                Kepala Satuan Polisi Pamong Praja
                <div className='col fs-6 mb-15 fw-semibold text-center'>Provinsi DKI Jakara</div>
                <div className='col fs-6 mb-2 fw-semibold text-center'>(Drs. Arifin, M.AP)</div>
                <div className='col fs-6 mb-2 fw-semibold text-center'>NIP. 197206221992031003</div>
              </div>
            </div>
          </div>
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}
