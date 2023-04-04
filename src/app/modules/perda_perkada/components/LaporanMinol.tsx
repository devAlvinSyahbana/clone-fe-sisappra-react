import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {ThemeModeComponent} from '../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import AsyncSelect from 'react-select/async'
import {KTSVG} from '../../../../_metronic/helpers'
import FileDownload from 'js-file-download'

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
export const KELURAHAN_URL = `${API_URL}/master/kelurahan`
export const BIDANG_WILAYAH_URL = `${API_URL}/master/bidang-wilayah`
export const JABATAN_URL = `${API_URL}/master/jabatan`
export const PELAKSANA_URL = `${API_URL}/master/pelaksana`
export const PANGKAT_URL = `${API_URL}/master/pangkat`

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

<<<<<<< HEAD
export function LaporanMinol() {
=======
export function LaporanMinol () {
>>>>>>> 824506315198835c33fd3fee5812e2a685102b7d
  let componentRef: any
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)

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
      // selector: (row: any) => row.id,
      sortable: true,
      sortField: 'id',
      wrap: true,
      // cell: (row: any) => {
      //   return <div className='mb-2 mt-2'>{row.skpd !== 'Jumlah Keseluruhan' ? num++ : ''}</div>
      // },
    },

    {
<<<<<<< HEAD
      name: 'Unit Organisasi ',
      selector: (row: any) => row.kota,
      sortable: true,
      sortField: 'kota',
=======
      name: 'Pelaksana',
      selector: (row: any) => row.bidang_wilayah,
      sortable: true,
      sortField: 'bidang_wilayah',
>>>>>>> 824506315198835c33fd3fee5812e2a685102b7d
      wrap: true,
      width: '250px',
      center: true,
    },
    {
<<<<<<< HEAD
      name: 'Jumlah',
=======
      name: 'Jumlah Minol',
>>>>>>> 824506315198835c33fd3fee5812e2a685102b7d
      selector: (row: any) => row.kecamatan,
      sortable: true,
      sortField: 'kecamatan',
      wrap: true,
      width: '220px',
      center: true,
    },
    {
      name: 'Jenis/Merk',
      selector: (row: any) => row.kelurahan,
      sortable: true,
      sortField: 'kelurahan',
      wrap: true,
    },
    {
      name: 'Tanggal',
      selector: (row: any) => row.lokasi,
      sortable: true,
      sortField: 'lokasi',
      wrap: true,
    },
    {
      name: 'Keterangan',
      selector: (row: any) => row.titik_koordinat,
      sortable: true,
      sortField: 'titik_koordinat',
      width: '200px',
      wrap: true,
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
        `${BIDANG_WILAYAH_URL}find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
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
      `${BIDANG_WILAYAH_URL}find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
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
      `${BIDANG_WILAYAH_URL}find?limit=${newPerPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  const handleFilter = async () => {
    let uriParam = ''
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
    setValMasterBidangWilayah({label: '', value: null})
    setValMasterPelaksana({label: '', value: null})
    setValMasterJabatan({label: '', value: null})

    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  //unduh
  const handleUnduh = async () => {
    setbtnLoadingUnduh(true)
    await axios({
      url: `${BIDANG_WILAYAH_URL}unduh?status=${qParamFind.strparam}`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(response.data, 'DATA STATUS KENAIKAN PANGKAT.xlsx')
      setbtnLoadingUnduh(false)
    })
  }
  //end unduh

  const [idMasterBidangWilayah, setIdMasterBidangWilayah] = useState({id: ''})
  const [valMasterBidangWilayah, setValMasterBidangWilayah] = useState({value: null, label: ''})
  const [masterBidangWilayah, setMasterBidangWilayah] = useState([])
  const filterbidangwilayah = async (inputValue: string) => {
    const response = await axios.get(`${BIDANG_WILAYAH_URL}/filter/${inputValue}`)
    const json = response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsbidangwilayah = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterbidangwilayah(inputValue))
    }, 1000)
  }
  const handleChangeInputKota = (newValue: any) => {
    setValMasterBidangWilayah((prevstate: any) => ({...prevstate, ...newValue}))
    setIdMasterBidangWilayah({id: newValue.value})
    setValMasterPelaksana({value: null, label: ''})
    setValMasterJabatan({value: null, label: ''})
    // console.log('cek', newValue.value)
    const timeout = setTimeout(async () => {
      const response = await axios.get(
        `${PELAKSANA_URL}/filter?id_tempat_pelaksanaan=${newValue.value}`
      )
      let items = response.data.data
      Array.from(items).forEach(async (item: any) => {
        item.label = item.nama
        item.value = item.id
      })
      setMasterBidangWilayah(items)
      // console.log(items)
    }, 100)

    return () => clearTimeout(timeout)
  }
  //end nama_hak_akses

  // kecamatan
  const [idMasterPelaksana, setIdMasterPelaksana] = useState({id: ''})
  const [valMasterPelaksana, setValMasterPelaksana] = useState({value: null, label: ''})
  const [masterPelaksana, setMasterPelaksana] = useState([])
  const filterKecamatan = async (inputValue: string) => {
    const response = await axios.get(
      `${PELAKSANA_URL}/filter?id_tempat_pelaksanaan=${idMasterBidangWilayah.id}${
        inputValue !== '' && `&nama=${inputValue}`
      }`
    )
    const json = response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsKecamatan = (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKecamatan(inputValue))
    }, 500)
  }
  const handleChangeInputKecamatan = (newValue: any) => {
    setValMasterPelaksana((prevstate: any) => ({...prevstate, ...newValue}))
    setIdMasterPelaksana({id: newValue.value})
    setValMasterJabatan({value: null, label: ''})
    // console.log('cek', newValue.value)
    const timeout = setTimeout(async () => {
      const response = await axios.get(
        `${JABATAN_URL}/filter?id_master_tempat_seksi_pelaksanaan=${newValue.value}`
      )
      let items = response.data.data
      Array.from(items).forEach(async (item: any) => {
        item.label = item.jabatan
        item.value = item.id
      })
      setMasterPelaksana(items)
      // console.log(items)
    }, 100)

    return () => clearTimeout(timeout)
  }
  //end kecamatan

  //jabatan
  const [valMasterJabatan, setValMasterJabatan] = useState({value: null, label: ''})
  const filterjabatan = async (inputValue: string) => {
    const response = await axios.get(
      `${JABATAN_URL}/filter?id_master_tempat_seksi_pelaksanaan=${parseInt(idMasterPelaksana.id)}${
        inputValue !== '' && `&nama=${inputValue}`
      }`
    )
    const json = response.data.data
    return json.map((i: any) => ({label: i.jabatan, value: i.id}))
  }
  const loadOptionsJabatan = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterjabatan(inputValue))
    }, 500)
  }
  const handleChangeInputJabatan = (newValue: any) => {
    setValMasterJabatan((prevstate: any) => ({...prevstate, ...newValue}))
  }
  //end jabatan

  return (
    <>
      {/* <LaporanRekapHeader /> */}
      <div className={`card`}>
        {/* begin::Body */}
        <div className='row g-8 mt-2 ms-5 me-5'>
          <div className='col-12'>
            <div className='form-group'>
              <label htmlFor='' className='mb-3'>
<<<<<<< HEAD
                Unit Organisasi
=======
                Pelaksana
>>>>>>> 824506315198835c33fd3fee5812e2a685102b7d
              </label>
              <AsyncSelect
                className='mb-5'
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
          <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12'>
            <div className='form-group'>
              <label htmlFor='' className='mb-3'>
                Tahun
              </label>
              <AsyncSelect
                className='mb-5'
                value={valMasterPelaksana.value ? valMasterPelaksana : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsKecamatan}
                defaultOptions={masterBidangWilayah}
                onChange={handleChangeInputKecamatan}
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
              />
            </div>
          </div>
          <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12'>
            <div className='form-group'>
              <label htmlFor='' className='mb-3'>
                Bulan
              </label>
              <AsyncSelect
                value={valMasterJabatan.value ? valMasterJabatan : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsJabatan}
                defaultOptions={masterPelaksana}
                onChange={handleChangeInputJabatan}
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
                    {/* <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' /> */}
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
              style={
                {
                  // backgroundImage: 'url(' + toAbsoluteUrl('/media/svg/shapes/top-blue.jpg') + ')',
                }
              }
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
