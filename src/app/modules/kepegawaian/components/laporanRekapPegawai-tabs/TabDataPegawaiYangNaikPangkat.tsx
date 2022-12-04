import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {LaporanRekapHeader} from './LaporanRekapHeader'
import AsyncSelect from 'react-select/async'
import {SelectOptionAutoCom} from '../KepegawaianInterface'
import {KTSVG} from '../../../../../_metronic/helpers'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import FileDownload from 'js-file-download'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import ReactToPrint from 'react-to-print'

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
export const KELURAHAN_URL = `${API_URL}/master/kelurahan`
export const BIDANG_WILAYAH_URL = `${API_URL}/master/bidang-wilayah`
export const JABATAN_URL = `${API_URL}/master/jabatan`
export const PELAKSANA_URL = `${API_URL}/master/pelaksana`
export const PANGKAT_URL = `${API_URL}/master/pangkat`

export const STATUS_KENAIKAN_PANGKAT_URL = `${API_URL}/master/status_kenaikan_pangkat`

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

export function TabDataPegawaiYangNaikPangkat() {
  let componentRef: any
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const [valStatPegawai, setValStatPegawai] = useState({val: ''})
  const [valFilterNama, setFilterNama] = useState({val: ''})
  const [valFilterNRK, setFilterNRK] = useState({val: ''})
  const [valFilterNoPegawai, setFilterNoPegawai] = useState({val: ''})

  const [valFilterNip, setFilterNip] = useState({val: ''})
  const [inputValStPa, setDataStPa] = useState({label: '', value: null})
  const [inputValPangkat, setDataPangkat] = useState({label: '', value: null})

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

  var num = 1
  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.id,
      sortable: true,
      sortField: 'id',
      wrap: true,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.skpd !== 'Jumlah Keseluruhan' ? num++ : ''}</div>
      },
    },
    {
      name: 'Nama',
      selector: (row: any) => row.nama,
      sortable: true,
      sortField: 'nama',
      width: '200px',
      wrap: true,
    },
    {
      name: 'NIP',
      selector: (row: any) => row.nip,
      sortable: true,
      sortField: 'nip',
      wrap: true,
    },
    {
      name: 'NRK',
      selector: (row: any) => row.nrk,
      sortable: true,
      sortField: 'nrk',
      wrap: true,
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
      name: 'Tempat Tugas Wilayah / Bidang',
      selector: (row: any) => row.tempat_tugas,
      sortable: true,
      sortField: 'tempat_tugas',
      wrap: true,
      width: '250px',
      center: true,
    },
    {
      name: 'Tempat Tugas Kecamatan',
      selector: (row: any) => row.subbag_seksi_kecamatan,
      sortable: true,
      sortField: 'subbag_seksi_kecamatan',
      wrap: true,
      width: '220px',
      center: true,
    },
    {
      name: 'Pangkat',
      selector: (row: any) => row.pangkat,
      sortable: true,
      sortField: 'pangkat',
      wrap: true,
    },
    {
      name: 'Golongan',
      selector: (row: any) => row.golongan,
      sortable: true,
      sortField: 'golongan',
      wrap: true,
    },
    {
      name: 'TMT Pangkat',
      selector: (row: any) => row.tmt_pangkat,
      sortable: true,
      sortField: 'tmt_pangkat',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Eselon',
      selector: (row: any) => row.eselon,
      sortable: true,
      sortField: 'eselon',
      wrap: true,
    },
    {
      name: 'Status Kenaikan',
      selector: (row: any) => row.status_kenaikan_pangkat,
      sortable: true,
      sortField: 'status_kenaikan_pangkat',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Jadwal Kenaikan',
      selector: (row: any) => row.jadwal_kenaikan_pangkat,
      sortable: true,
      sortField: 'jadwal_kenaikan_pangkat',
      width: '220px',
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
                        navigate(
                          `/kepegawaian/update-naik-pangkat/UpdateNaikPangkat/${record?.id}`,
                          {
                            replace: true,
                          }
                        )
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
        `${KEPEGAWAIAN_URL}/rekapitulasi-pegawai-naik-pangkat/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
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
      `${KEPEGAWAIAN_URL}/rekapitulasi-pegawai-naik-pangkat/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
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
      `${KEPEGAWAIAN_URL}/rekapitulasi-pegawai-naik-pangkat/find?limit=${newPerPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (valStatPegawai.val !== '') {
      uriParam += `&status=${valStatPegawai.val}`
    }
    if (valFilterNama.val !== '') {
      uriParam += `&nama=${valFilterNama.val}`
    }
    if (valFilterNoPegawai.val !== '') {
      uriParam += `&nopegawai=${valFilterNoPegawai.val}`
    }
    if (valFilterNRK.val !== '') {
      uriParam += `&nrk=${valFilterNRK.val}`
    }
    if (valMasterBidangWilayah.value) {
      uriParam += `&id_tempat_tugas=${valMasterBidangWilayah.value}`
    }
    if (valFilterNip.val) {
      uriParam += `&nip=${valFilterNip.val}`
    }
    if (valMasterPelaksana.value) {
      uriParam += `&id_seksi_kecamatan=${valMasterPelaksana.value}`
    }
    if (valMasterJabatan.value) {
      uriParam += `&id_jabatan_kelurahan=${valMasterJabatan.value}`
    }
    if (inputValPangkat.value) {
      uriParam += `&id_pangkat=${inputValPangkat.value}`
    }
    if (inputValStPa.value) {
      uriParam += `&id_status_kenaikan_pangkat=${inputValStPa.value}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleFilterReset = () => {
    setValStatPegawai({val: ''})
    setFilterNama({val: ''})
    setFilterNRK({val: ''})
    setFilterNoPegawai({val: ''})
    setFilterNip({val: ''})
    setValMasterBidangWilayah({label: '', value: null})
    setValMasterPelaksana({label: '', value: ''})
    setDataPangkat({label: '', value: null})
    setValMasterJabatan({label: '', value: ''})
    setDataStPa({label: '', value: null})
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

  const handleChangeInputNip = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterNip({val: event.target.value})
  }

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
    callback: (options: SelectOptionAutoCom[]) => void
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
    callback: (options: SelectOptionAutoCom[]) => void
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
  const loadOptionsJabatan = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterjabatan(inputValue))
    }, 1000)
  }
  const handleChangeInputJabatan = (newValue: any) => {
    setValMasterJabatan((prevstate: any) => ({...prevstate, ...newValue}))
  }
  //end jabatan

  //pangkat
  const filterPangkat = async (inputValue: string) => {
    const response = await axios.get(`${PANGKAT_URL}/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.pangkat, value: i.id}))
  }
  const loadOptionsPangkat = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterPangkat(inputValue))
    }, 1000)
  }
  const handleInputPangkat = (newValue: any) => {
    setDataPangkat((prevstate: any) => ({...prevstate, ...newValue}))
  }
  //end pangkat

  //Status kenaikan pangkat
  const filterStPa = async (inputValue: string) => {
    const response = await axios.get(`${STATUS_KENAIKAN_PANGKAT_URL}/find${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.status_kenaikan_pangkat, value: i.id}))
  }
  const loadOptionsStPa = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterStPa(inputValue))
    }, 1000)
  }
  const handleInputStPa = (newValue: any) => {
    setDataStPa((prevstate: any) => ({...prevstate, ...newValue}))
  }
  //end status kenaikan pangkat

  return (
    <>
      <LaporanRekapHeader />
      <div className={`card`}>
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
                  styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                />
              </div>
            </div>
            {valStatPegawai.val === 'PNS' || valStatPegawai.val === '' ? (
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
            ) : null}
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
                  styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                />
              </div>
            </div>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12' id='fil_nrk'>
              <label htmlFor='' className='mb-3'>
                {valStatPegawai.val === 'PNS'
                  ? 'NIP'
                  : valStatPegawai.val === 'PTT'
                  ? 'NPTT'
                  : valStatPegawai.val === 'PJLP'
                  ? 'NPJLP'
                  : 'NIP'}
              </label>
              <input
                type='text'
                className='form-control form-control form-control-solid'
                value={valFilterNip.val}
                onChange={handleChangeInputNip}
                placeholder={
                  valStatPegawai.val === 'PNS'
                    ? 'NIP'
                    : valStatPegawai.val === 'PTT'
                    ? 'NPTT'
                    : valStatPegawai.val === 'PJLP'
                    ? 'NPJLP'
                    : 'NIP'
                }
              />
            </div>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Jabatan / Kelurahan
              </label>
              <AsyncSelect
                value={valMasterJabatan.value ? valMasterJabatan : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsJabatan}
                onChange={handleChangeInputJabatan}
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
              />
            </div>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Status Kenaikan
                </label>
                <AsyncSelect
                  cacheOptions
                  value={inputValStPa.value ? inputValStPa : {value: '', label: 'Pilih'}}
                  loadOptions={loadOptionsStPa}
                  defaultOptions
                  onChange={handleInputStPa}
                  styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                />
              </div>
            </div>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Pangkat
              </label>
              <AsyncSelect
                value={inputValPangkat.value ? inputValPangkat : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsPangkat}
                defaultOptions
                onChange={handleInputPangkat}
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
              />
            </div>
          </div>
        </div>

        <div className='row g-8 mt-2 ms-5 me-5'>
          <div className='row g-8 mt-2 ms-5 me-5'>
            <div className='col-md-6 col-lg-6 col-sm-12'>
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
        <div className='col-xl-12 mb-xl-12 mt-6'>
          <div className='card card-flush h-xl-100'>
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
                    DAFTAR NAMA PEGAWAI YANG MEMASUKI MASA KENAIKAN PANGKAT
                  </div>
                </div>
                <div className='row'>
                  <div className='col fs-4 mb-2 fw-bold text-center'>
                    PADA SATUAN POLISI PAMONG PRAJA PRVINSI DKI JAKARTA
                  </div>
                </div>
              </div>
            </div>

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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end::Body */}
        <div className='row'>
          <div className='col-7 p-10'></div>
          <div className='col-4 fs-8 mb-4 fw-semibold text-center'>
            .................................
            <div className='col fs-6 mb-15 fw-semibold text-center'>
              Kepala Satpol PP ...............................................................
            </div>
            <div className='col fs-6 mb-2 fw-semibold text-center'>......................</div>
            <div className='col fs-6 mb-2 fw-semibold text-center'>NIP. ......................</div>
          </div>
        </div>
      </div>
    </>
  )
}
