import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable, {createTheme} from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import clsx from 'clsx'
import FileDownload from 'js-file-download'
import {LaporanRekapHeader} from './LaporanRekapHeader'
import {SelectOptionAutoCom} from '../LaporanRekapPegawaiInterface'
import AsyncSelect from 'react-select/async'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {KTSVG} from '../../../../../_metronic/helpers'

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
export const KEPEGAWAIAN_UNDUH_URL = `${API_URL}/kepegawaian/rekapitulasi-pegawai-jft`
export const MASTER_URL = `${API_URL}/master`

export function TabRekapitulasiPejabatFungsional() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const [valStatPegawai, setValStatPegawai] = useState({val: ''})
  const [valFilterNama, setFilterNama] = useState({val: ''})
  const [valFilterNRK, setFilterNRK] = useState({val: ''})

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

  const NoDataComponent = (props: any) => {
    return (
      <>
        <div className='alert d-flex flex-center flex-column py-10 px-10 px-lg-20 mb-10'>
          <span className='svg-icon svg-icon-5tx mb-5'>
            <KTSVG path='/media/icons/duotune/files/fil024.svg' className='svg-icon-2' />
          </span>
          <div className='text-center'>
            <h5 className='fw-bolder fs-3 mb-5'>Data tidak ditemukan . . .</h5>
          </div>
        </div>
      </>
    )
  }

  // Autocomplite Jabatan
  const [valMasterJabatan, setValMasterJabatan] = useState({value: '', label: ''})
  const filterjabatan = async (inputValue: string) => {
    const response = await axios.get(
      `${MASTER_URL}/jabatan/filter?id_master_tempat_seksi_pelaksanaan=${parseInt(
        idMasterPelaksana.id
      )}${inputValue !== '' && `&nama=${inputValue}`}`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.jabatan, value: i.id}))
  }
  const loadOptionsjabatan = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterjabatan(inputValue))
    }, 1000)
  }

  // Autocomplite Bidang Wilayah
  const filterbidangwilayah = async (inputValue: string) => {
    const response = await axios.get(`${MASTER_URL}/bidang-wilayah/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsbidangwilayah = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterbidangwilayah(inputValue))
    }, 1000)
  }

  const [valMasterBidangWilayah, setValMasterBidangWilayah] = useState({value: '', label: ''})
  const [idMasterBidangWilayah, setIdMasterBidangWilayah] = useState({id: ''})

  // Autocomplite Pelaksana
  const filterPelaksana = async (inputValue: string) => {
    const response = await axios.get(
      `${MASTER_URL}/pelaksana/filter?id_tempat_pelaksanaan=${parseInt(idMasterBidangWilayah.id)}${
        inputValue !== '' && `&nama=${inputValue}`
      }`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsPelaksana = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterPelaksana(inputValue))
    }, 1000)
  }

  const [valMasterPelaksana, setValMasterPelaksana] = useState({value: '', label: ''})
  const [idMasterPelaksana, setIdMasterPelaksana] = useState({id: ''})

  const columns = [
    {
      name: 'Nama',
      selector: (row: any) => row.nama,
      sortable: true,
      sortField: 'nama',
      width: '200px',
      wrap: true,
      cell: (record: any) => {
        return (
          <Fragment>
            <div className='d-flex align-items-center'>
              {/* begin:: Avatar */}
              <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                {record?.foto && record?.foto !== '' ? (
                  <div className='symbol-label'>
                    <img src={`${API_URL}}/${record?.foto}`} alt={record?.nama} className='w-100' />
                  </div>
                ) : (
                  <div className={clsx('symbol-label fs-3', `bg-light-primary`, `text-primary`)}>
                    {record?.nama.charAt(0)}
                  </div>
                )}
              </div>
              <div className='d-flex flex-column'>
                <span>{record?.nama}</span>
              </div>
            </div>
          </Fragment>
        )
      },
    },
    {
      name: 'NIP',
      selector: (row: any) => row.nip,
      sortable: true,
      sortField: 'nip',
      wrap: true,
    },
    {
      name:
        valStatPegawai.val !== ''
          ? valStatPegawai.val === 'PTT'
            ? 'NPTT'
            : valStatPegawai.val === 'PJLP'
            ? 'NPJLP'
            : 'NRK'
          : 'NRK',
      selector: (row: any) => row.nrk,
      sortable: true,
      sortField: 'kepegawaian_nrk',
      wrap: true,
      center: true,
    },
    {
      name: 'Jabatan',
      selector: (row: any) => row.jabatan,
      sortable: true,
      sortField: 'jabatan',
      wrap: true,
      center: true,
    },
    {
      name: 'Tempat Tugas',
      selector: (row: any) => row.tempat_tugas,
      sortable: true,
      sortField: 'tempat_tugas',
      wrap: true,
      center: true,
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
        `${KEPEGAWAIAN_URL}/rekapitulasi-pegawai-jft/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
      )
      setData(response.data.data)
      setTotalRows(response.data.jumlah)
      setLoading(false)
    }
    fetchDT(1)
  }, [qParamFind, perPage])

  const fetchData = async (page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${KEPEGAWAIAN_URL}/rekapitulasi-pegawai-jft/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setTotalRows(response.data.jumlah)
    setLoading(false)

    return [data, setData] as const
  }

  const handlePageChange = (page: number) => {
    fetchData(page)
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${KEPEGAWAIAN_URL}/rekapitulasi-pegawai-jft/find?limit=${newPerPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (valMasterBidangWilayah.value !== '') {
      uriParam += `&bidang_wilayah=${valMasterBidangWilayah.value}`
    }
    if (valMasterPelaksana.value !== '') {
      uriParam += `&pelaksana=${valMasterPelaksana.value}`
    }
    if (valMasterJabatan.value !== '') {
      uriParam += `&jabatan=${valMasterJabatan.value}`
    }
    if (valFilterNama.val !== '') {
      uriParam += `&nama=${valFilterNama.val}`
    }
    if (valFilterNRK.val !== '') {
      uriParam += `&nrk=${valFilterNRK.val}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleFilterReset = () => {
    setValStatPegawai({val: ''})
    setFilterNama({val: ''})
    setFilterNRK({val: ''})
    setValMasterBidangWilayah((prevstate) => ({
      ...prevstate,
      value: '',
      label: '',
    }))
    setValMasterPelaksana((prevstate) => ({
      ...prevstate,
      value: '',
      label: '',
    }))
    setValMasterJabatan((prevstate) => ({
      ...prevstate,
      value: '',
      label: '',
    }))
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

  const handleUnduh = async () => {
    setbtnLoadingUnduh(true)
    await axios({
      url: `${KEPEGAWAIAN_UNDUH_URL}/unduh${
        qParamFind.strparam !== '' && `?${qParamFind.strparam}`
      }`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(response.data, 'REKAPITULASI DATA PEJABAT FUNGSIONAL Pol PP (JFT).xlsx')
      setbtnLoadingUnduh(false)
    })
  }

  return (
    <>
      <LaporanRekapHeader />
      <div className='card'>
        {/* begin::Body */}
        <div id='kt_advanced_search_form'>
          <div className='row g-8 mt-2 ms-5 me-5'>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Nama
              </label>
              <input
                type='text'
                className='form-control form-control form-control-solid'
                name='nama'
                value={valFilterNama.val}
                onChange={handleChangeInputNama}
                placeholder='Nama'
              />
            </div>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                NRK
              </label>
              <input
                type='text'
                className='form-control form-control form-control-solid'
                name='nrk'
                value={valFilterNRK.val}
                onChange={handleChangeInputNRK}
                placeholder='NRK'
              />
            </div>
            <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Tempat Tugas Bidang/Wilayah
              </label>
              <AsyncSelect
                cacheOptions
                value={
                  valMasterBidangWilayah && valMasterBidangWilayah.label !== ''
                    ? valMasterBidangWilayah
                    : {value: '', label: 'Pilih'}
                }
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                loadOptions={loadOptionsbidangwilayah}
                onChange={async (e: any) => {
                  setIdMasterBidangWilayah((prevstate) => ({
                    ...prevstate,
                    id: e.value,
                  }))
                  setValMasterBidangWilayah((prevstate) => ({
                    ...prevstate,
                    ...e,
                  }))
                  setValMasterPelaksana((prevstate) => ({
                    ...prevstate,
                    value: '',
                    label: '',
                  }))
                  setValMasterJabatan((prevstate) => ({
                    ...prevstate,
                    value: '',
                    label: '',
                  }))
                }}
                defaultOptions
                name='kepegawaian_tempat_tugas'
                placeholder={'Pilih'}
                loadingMessage={() => 'Sedang mencari pilihan...'}
                noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
              />
            </div>
            <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Subag/Seksi/Kecamatan
              </label>
              <AsyncSelect
                value={
                  valMasterPelaksana && valMasterPelaksana.label !== ''
                    ? valMasterPelaksana
                    : {value: '', label: 'Pilih'}
                }
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                loadOptions={loadOptionsPelaksana}
                onChange={async (e: any) => {
                  setIdMasterPelaksana((prevstate) => ({
                    ...prevstate,
                    id: e.value,
                  }))
                  setValMasterPelaksana((prevstate) => ({
                    ...prevstate,
                    ...e,
                  }))
                  setValMasterJabatan((prevstate) => ({
                    ...prevstate,
                    value: '',
                    label: '',
                  }))
                }}
                name='kepegawaian_subbag_seksi_kecamatan'
                placeholder={'Pilih'}
                loadingMessage={() => 'Sedang mencari pilihan...'}
                noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
              />
            </div>
            <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Jabatan
              </label>
              <AsyncSelect
                value={
                  valMasterJabatan && valMasterJabatan.label !== ''
                    ? valMasterJabatan
                    : {value: '', label: 'Pilih'}
                }
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                loadOptions={loadOptionsjabatan}
                onChange={async (e: any) => {
                  setValMasterJabatan((prevstate) => ({
                    ...prevstate,
                    ...e,
                  }))
                }}
                name='kepegawaian_jabatan'
                placeholder={'Pilih'}
                loadingMessage={() => 'Sedang mencari pilihan...'}
                noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
              />
            </div>
          </div>
        </div>

        <div className='row g-8 mt-2 ms-5 me-5'>
          <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
            <Link to='#' onClick={handleFilter}>
              <button className='btn btn-light-primary me-2'>
                <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-2' />
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
                  <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                  Unduh
                </>
              )}
            </button>
            {/* end::Filter Button */}
            {/* begin::SubMenu */}
            <div className='menu menu-sub menu-sub-dropdown w-100px w-md-150px' data-kt-menu='true'>
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

        <div className='table-responsive mt-10 mb-1 ms-5 me-5 w'>
          <div className='card-body py-8 mt-4 '>
            <div className='row'>
              <div className='col fs-4 mb-2 d-flex justify-content-center fw-bold text-center'>
                DAFTAR PEJABAT FUNGSIONAL
              </div>
            </div>
            <div className='row'>
              <div className='col fs-4 mb-2 d-flex justify-content-center fw-bold text-center'>
                SATPOL PP PROVINSI DKI JAKARTA
              </div>
            </div>
          </div>
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
            noDataComponent={<NoDataComponent />}
          />
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}
