import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable, {createTheme} from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Swal from 'sweetalert2'
import AsyncSelect from 'react-select/async'
import {KTSVG} from '../../../../../_metronic/helpers'
import FileDownload from 'js-file-download'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {LaporanRekapHeader} from './LaporanRekapHeader'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {parse} from 'path'

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

export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian/duk-pegawai`
export const DELETE_DUK_URL = `${API_URL}/kepegawaian/rekapitulasi-duk-pegawai`
export const KEPEGAWAIAN_UNDUH_URL = `${API_URL}/kepegawaian/rekapitulasi-duk-pegawai`
export const MASTER_URL = `${API_URL}/master`

export function TabDaftarUrutKepangkatan() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const [valStatPegawai, setValStatPegawai] = useState({val: ''})
  const [valFilterNama, setFilterNama] = useState({val: ''})
  const [valFilterNRK, setFilterNRK] = useState({val: ''})
  const [valFilterNIP, setFilterNIP] = useState({val: ''})
  const [valFilterNoPegawai, setFilterNoPegawai] = useState({val: ''})
  const arrStatPegawai = ['PNS', 'PTT', 'PJLP']

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
        const response = await axios.delete(`${DELETE_DUK_URL}/delete/${id}`, bodyParam)
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
      selector: (row: any) => row.nama,
      sortable: true,
      sortField: 'nama',
      width: '150px',
      wrap: true,
    },
    {
      name: 'NIP',
      selector: (row: any) => row.nip,
      sortable: true,
      sortField: 'nip',
      width: '200px',
      wrap: true,
      center: true,
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
      selector: (row: any) => row.nrk_nptt_npjlp,
      sortable: true,
      sortField: 'nrk_nptt_npjlp',
      wrap: true,
      center: true,
    },
    {
      name: 'Jabatan',
      selector: (row: any) => row.jabatan,
      sortable: true,
      sortField: 'jabatan',
      width: '270px',
      wrap: true,
      center: true,
    },
    {
      name: 'Status Kepegawaian',
      selector: (row: any) => row.status_pegawai,
      sortable: true,
      sortField: 'status_pegawai',
      width: '180px',
      wrap: true,
      center: true,
    },

    {
      name: 'Tempat Tugas',
      selector: (row: any) => row.tempat_tugas,
      sortable: true,
      sortField: 'tempat_tugas',
      width: '200px',
      wrap: true,
      center: true,
    },
    {
      name: 'Tanggal Lahir',
      selector: (row: any) => row.tanggal_lahir,
      sortable: true,
      width: '150px',
      center: true,
    },
    {
      name: 'Agama',
      selector: (row: any) => row.agama,
      sortable: true,
      sortField: 'agama',
      wrap: true,
    },
    {
      name: 'Alamat',
      selector: (row: any) => row.alamat,
      sortable: true,
      sortField: 'alamat',
      wrap: true,
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
                        navigate(
                          `/kepegawaian/laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan/detail-data-pribadi-duk/${record?.id}/${record?.status_pegawai}`,
                          {replace: true}
                        )
                      }
                    >
                      Detail
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
        `${KEPEGAWAIAN_URL}/filter?limit=${perPage}&offset=${page}${qParamFind.strparam}`
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
      `${KEPEGAWAIAN_URL}/filter?limit=${perPage}&offset=${page}${qParamFind.strparam}`
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
      `${KEPEGAWAIAN_URL}/filter?limit=${newPerPage}&offset=${page}${qParamFind.strparam}`
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

  // GET KOTA (Wilayah / Bidang)
  const [valMasterBidangWilayah, setValMasterBidangWilayah] = useState({value: null, label: ''})
  const filterKota = async (inputValue: string) => {
    const response = await axios.get(MASTER_URL + '/bidang-wilayah/filter/' + inputValue)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsKota = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKota(inputValue))
    }, 1000)
  }
  const handleChangeInputKota = (newValue: any) => {
    setValMasterBidangWilayah((prevstate: any) => ({...prevstate, ...newValue}))
    setIdMasterBidangWilayah((prevstate) => ({
      ...prevstate,
      id: newValue.value,
    }))
  }
  const [idMasterBidangWilayah, setIdMasterBidangWilayah] = useState({id: ''})

  // GET Kecamatan (PELAKSANA)
  const [valMasterPelaksana, setValMasterPelaksana] = useState({value: null, label: ''})
  const filterKecamatan = async (inputValue: string) => {
    const response = await axios.get(
      `${MASTER_URL}/pelaksana/filter?id_tempat_pelaksanaan=${parseInt(idMasterBidangWilayah.id)}${
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
  const [idMasterPelaksana, setIdMasterPelaksana] = useState({id: ''})

  // END :: GET Kecamatan

  // GET Jabatan
  const [valMasterJabatan, setValMasterJabatan] = useState({value: null, label: ''})
  const filterJabatan = async (inputValue: string) => {
    const response = await axios.get(
      `${MASTER_URL}/jabatan/filter?id_master_tempat_seksi_pelaksanaan=${parseInt(
        idMasterPelaksana.id
      )}${inputValue !== '' && `&nama=${inputValue}`}`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.jabatan, value: i.id}))
  }
  const loadOptionJabatan = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterJabatan(inputValue))
    }, 1000)
  }
  const handleChangeInputJabatan = (newValue: any) => {
    setValMasterJabatan((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // // END :: GET Jabatan

  const handleFilter = async () => {
    let uriParam = ''
    if (valStatPegawai.val !== '') {
      uriParam += `&status_pegawai=${valStatPegawai.val}`
    }
    if (valFilterNama.val !== '') {
      uriParam += `&nama=${valFilterNama.val}`
    }
    if (valFilterNIP.val !== '') {
      uriParam += `&nip=${valFilterNIP.val}`
    }
    if (valFilterNRK.val !== '') {
      uriParam += `&nrk_nptt_pjlp=${valFilterNRK.val}`
    }
    if (valFilterNoPegawai.val !== '') {
      uriParam += `&nrk_nptt_pjlp=${valFilterNoPegawai.val}`
    }
    if (valMasterBidangWilayah.value) {
      uriParam += `&id_tempat_tugas=${valMasterBidangWilayah.value}`
    }
    if (valMasterPelaksana.value) {
      uriParam += `&id_seksi_kecamatan=${valMasterPelaksana.value}`
    }
    if (valMasterJabatan.value) {
      uriParam += `&id_jabatan_kelurahan=${valMasterJabatan.value}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleFilterReset = () => {
    setValStatPegawai({val: ''})
    setFilterNama({val: ''})
    setFilterNRK({val: ''})
    setFilterNoPegawai({val: ''})
    setFilterNIP({val: ''})
    setValMasterBidangWilayah({label: '', value: null})
    setValMasterPelaksana({label: '', value: null})
    setValMasterJabatan({label: '', value: null})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const handleChangeStatPegawai = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValStatPegawai((prevValues: any) => ({
      ...prevValues,
      val: event.target.value,
    }))
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
  const handleChangeInputNoPegawai = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterNoPegawai({val: event.target.value})
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
      url: `${KEPEGAWAIAN_UNDUH_URL}/unduh?q=1${qParamFind.strparam}`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(response.data, 'DATA DAFTAR URUT KEPANGKATAN.xlsx')
      setbtnLoadingUnduh(false)
    })
  }

  return (
    <>
      <LaporanRekapHeader />
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
                              name='nama'
                              value={valFilterNama.val}
                              onChange={handleChangeInputNama}
                              placeholder='Masukkan nama'
                            />
                          </div>
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <div className='form-group'>
                              <label htmlFor='' className='mb-3'>
                                Status Kepegawaian
                              </label>
                              <select
                                className='form-select form-select-solid'
                                aria-label='Select example'
                                value={valStatPegawai.val}
                                onChange={handleChangeStatPegawai}
                                name='val'
                              >
                                <option value=''>Pilih</option>
                                {arrStatPegawai.map((valueInput: string) => {
                                  return <option value={valueInput}>{valueInput}</option>
                                })}
                              </select>
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
                                name='nrk_nptt_npjlp'
                                value={valFilterNRK.val}
                                onChange={handleChangeInputNRK}
                                placeholder='Masukkan NRK'
                              />
                            </div>
                          ) : null}
                          {valStatPegawai.val === 'PNS' || valStatPegawai.val === '' ? (
                            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                              <label htmlFor='' className='mb-3'>
                                NIP
                              </label>
                              <input
                                type='text'
                                className='form-control form-control form-control-solid'
                                name='nip'
                                value={valFilterNIP.val}
                                onChange={handleChangeInputNIP}
                                placeholder='Masukkan NIP'
                              />
                            </div>
                          ) : null}
                          {valStatPegawai.val !== 'PNS' && valStatPegawai.val !== '' ? (
                            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12' id='fil_nrk'>
                              <label htmlFor='' className='mb-3'>
                                {valStatPegawai.val === 'PTT'
                                  ? 'NPTT'
                                  : valStatPegawai.val === 'PJLP'
                                  ? 'NPJLP'
                                  : ''}
                              </label>
                              <input
                                type='text'
                                className='form-control form-control form-control-solid'
                                value={valFilterNoPegawai.val}
                                onChange={handleChangeInputNoPegawai}
                                placeholder={
                                  valStatPegawai.val === 'PTT'
                                    ? 'Masukkan NPTT'
                                    : valStatPegawai.val === 'PJLP'
                                    ? 'Masukkan NPJLP'
                                    : ''
                                }
                              />
                            </div>
                          ) : null}
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <div className='form-group'>
                              <label htmlFor='' className='mb-3'>
                                Wilayah / Bidang
                              </label>
                              <AsyncSelect
                                value={
                                  valMasterBidangWilayah.value
                                    ? valMasterBidangWilayah
                                    : {value: '', label: 'Pilih Pangkat'}
                                }
                                loadOptions={loadOptionsKota}
                                defaultOptions
                                onChange={handleChangeInputKota}
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
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <div className='form-group'>
                              <label htmlFor='' className='mb-3'>
                                Kecamatan / Seksi
                              </label>
                              <AsyncSelect
                                loadOptions={loadOptionsKecamatan}
                                value={
                                  valMasterPelaksana.value
                                    ? valMasterPelaksana
                                    : {value: '', label: 'Pilih Kecamatan / Seksi'}
                                }
                                styles={
                                  calculatedMode === 'dark'
                                    ? reactSelectDarkThem
                                    : reactSelectLightThem
                                }
                                onChange={handleChangeInputKecamatan}
                                name='id_seksi_kecamatan'
                              />
                            </div>
                          </div>
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <div className='form-group'>
                              <label htmlFor='' className='mb-3'>
                                Jabatan
                              </label>
                              <AsyncSelect
                                loadOptions={loadOptionJabatan}
                                value={
                                  valMasterJabatan.value
                                    ? valMasterJabatan
                                    : {value: '', label: 'Pilih Jabatan'}
                                }
                                styles={
                                  calculatedMode === 'dark'
                                    ? reactSelectDarkThem
                                    : reactSelectLightThem
                                }
                                onChange={handleChangeInputJabatan}
                                name='id_jabatan_kelurahan'
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
                          <Link to='/kepegawaian/laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan/tambah-daftar-urut-kepangkatan'>
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
                    DAFTAR URUT KEPANGKATAN (DUK)
                  </div>
                </div>
                <div className='row'>
                  <div className='col fs-4 mb-2 fw-bold text-center'>
                    SATUAN POLISI PAMONG PRAJA..................
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
                .......................................
                <div className='col fs-6 mb-15 fw-semibold text-center'>
                  Kepala Satpol PP ....................................
                </div>
                <div className='col fs-6 mb-2 fw-semibold text-center'>
                  ..........................................................
                </div>
                <div className='col fs-6 mb-2 fw-semibold text-center'>
                  NIP. ..........................................................
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
