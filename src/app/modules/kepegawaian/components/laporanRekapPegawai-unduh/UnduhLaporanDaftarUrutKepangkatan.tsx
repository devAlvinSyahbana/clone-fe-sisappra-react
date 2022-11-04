import axios from 'axios'
import {useState, useEffect} from 'react'
import ReactToPrint from 'react-to-print'
import DataTable, {createTheme} from 'react-data-table-component'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../../_metronic/helpers'
import AsyncSelect from 'react-select/async'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

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
export const MASTER_URL = `${API_URL}/master`

export function UnduhLaporanDaftarUrutKepangkatanPDF() {
  let componentRef: any
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

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

  let no = 1

  const columns = [
    {
      name: 'No',
      sortable: true,
      sortField: 'No',
      cell: (record: any) => {
        return <div className='mt-2 mb-2'>{no++}</div>
      },
    },
    {
      name: 'Nama',
      selector: (row: any) => row.nama,
      sortable: true,
      sortField: 'nama',
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
    },
    {
      name: 'Jabatan',
      selector: (row: any) => row.jabatan,
      sortable: true,
      sortField: 'jabatan',
      wrap: true,
    },
    {
      name: 'Status Kepegawaian',
      selector: (row: any) => row.status_pegawai,
      sortable: true,
      sortField: 'status_pegawai',
      wrap: true,
    },

    {
      name: 'Tempat Tugas',
      selector: (row: any) => row.tempat_tugas,
      sortable: true,
      sortField: 'tempat_tugas',
      wrap: true,
    },
    {
      name: 'Tanggal Lahir',
      selector: (row: any) => row.tanggal_lahir,
      sortable: true,
      wrap: true,
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
  ]

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='card'>
        <div className='card-body'>
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
                    styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
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
                    styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
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
                    styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                    onChange={handleChangeInputJabatan}
                    name='id_jabatan_kelurahan'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-5'>
            <div className='col-6'>
              <Link to={`/kepegawaian/laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan`}>
                <button className='btn btn-light-primary me-2'>
                  <i className='fa-solid fa-arrow-left'></i>
                  Kembali
                </button>
              </Link>
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
            <div className='col-6 d-flex justify-content-end'>
              <ReactToPrint
                trigger={() => (
                  <button type='button' className='float-none btn btn-danger align-self-center m-1'>
                    <i className='fa-solid fa-print'></i>
                    Cetak
                  </button>
                )}
                pageStyle='
                @page { 
                    size: auto; 
                    margin: 0mm; 
                    } 
                     @media 
                      print {                         
                        .header, .header-space,
                        .footer, .footer-space {
                        height: 100px;
                    }
                    .header {
                        position: fixed;
                        top: 0;
                    }
                    .footer {
                        position: fixed;
                        bottom: 0;
                    }
                }    
                   @media all {
                        .pagebreak {
                        display: inline;
                      }
                  }'
                content={() => componentRef}
              />
            </div>
          </div>
          {/* START :: Isi Konten Download */}
          <div ref={(el) => (componentRef = el)}>
            <table style={{width: '100%'}}>
              <thead>
                <tr>
                  <td
                    style={{
                      border: '0px',
                    }}
                  >
                    <div className='header-space'></div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      border: '0px',
                    }}
                  >
                    <div className='content'>
                      <div className='col-12'>
                        <h1 className='text-dark fw-bold fs-3 text-center'>
                          DATA DAFTAR URUT KEPANGKATAN
                        </h1>
                        <h1 className='text-dark fw-bold fs-3 text-center'>
                          PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA
                        </h1>
                      </div>
                      <div className='p-4'></div>
                      {/* START :: Table */}
                      <div className='row g-5 g-xxl-8 ms-15 me-15'>
                        <DataTable
                          columns={columns}
                          data={data}
                          progressPending={loading}
                          progressComponent={<LoadingAnimation />}
                          pagination
                          onChangeRowsPerPage={handlePerRowsChange}
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
                      {/* END :: Table */}
                      {/* START :: Jumlah */}
                      <div className='row mt-5'></div>
                      {/* END :: Jumlah */}
                      {/* START :: Tanda Tangan */}
                      <div className='row'>
                        <div className='col-8'></div>
                        <div className='col-4 fs-6 mb-2 mt-20 fw-semibold text-center'>
                          <div className='col fs-6 mb-2 fw-semibold text-center'>
                            ................................................
                          </div>
                          <div className='col fs-6 fw-semibold text-center'>
                            Kepala Satpol PP................................
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-8'></div>
                        <div className='col-4 fs-6 mb-2 mt-20 fw-semibold text-center'>
                          <div className='col fs-6 mb-2 fw-semibold text-center'>
                            ................................................
                          </div>
                          <div className='col fs-6 fw-semibold text-center'>
                            NIP. .........................................
                          </div>
                        </div>
                      </div>
                      {/* END :: Buat Tanda Tangan */}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    style={{
                      border: '0px',
                    }}
                  >
                    <div className='footer-space'></div>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className='header'></div>
            <div className='footer'></div>
          </div>
          {/* END :: End Isi Konten Download */}
        </div>
      </div>
    </div>
  )
}
