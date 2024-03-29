import React, {Fragment, useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {LaporanRekapHeader} from './LaporanRekapHeader'
import {DropdownButton, ButtonGroup, Dropdown} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Footer from 'react-multi-date-picker/plugins/range_picker_footer'
import {Button, Collapse} from 'react-bootstrap'
import clsx from 'clsx'
import {SelectOptionAutoCom} from '../KepegawaianInterface'
import FileDownload from 'js-file-download'
import AsyncSelect from 'react-select/async'
import {KTSVG} from '../../../../../_metronic/helpers'

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const KOTA_URL = `${API_URL}/master/kota`
export const KECAMATAN_URL = `${API_URL}/master/kecamatan`
export const KELURAHAN_URL = `${API_URL}/master/kelurahan`
export const JABATAN_URL = `${API_URL}/master/jabatan`
export const MASTER_BIDANG_WILAYAH = `${API_URL}/master/bidang-wilayah`
export const REKAPITULASI_PEJABAT_STRUKTURAL = `${API_URL}/kepegawaian-unduh`

export function TabRekapitulasiPejabatStruktural() {
  const [open, setOpen] = useState(false)

  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const [valFilternama, setFilternama] = useState({val: ''})
  const [valFilterkepegawaian_nip, setFilterkepegawaian_nip] = useState({val: ''})
  const [valFilterkepegawaian_nrk, setFilterkepegawaian_nrk] = useState({val: ''})

  const [inputValKota, setDataKota] = useState({label: '', value: null})
  const [inputValKec, setDataKec] = useState({label: '', value: null})
  const [inputValKel, setDataKel] = useState({label: '', value: null})
  const [inputValJabatan, setDataJabatan] = useState({label: '', value: null})

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [qParamFind, setUriFind] = useState({strparam: ''})

  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      const response = await axios.get(
        `${KEPEGAWAIAN_URL}/filter-rekapitulasi-pejabat-struktural?limit=${perPage}&offset=${page}${qParamFind.strparam}`
      )
      setData(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchDT(1)
  }, [qParamFind, perPage])

  const LoadingAnimation = (props: any) => {
    return (
      <>
        <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
          <span className='spinner-border spinner-border-xl align-middle me-3'></span>
          <div className='d-flex flex-column'>
            <h5 className='mb-1'>Sedang mengambil data...</h5>
          </div>
        </div>
      </>
    )
  }

  const handlePerRowsChange = async (newPerPage: any, page: any) => {
    setLoading(true)

    const response = await axios.get(
      `${KEPEGAWAIAN_URL}/filter-rekapitulasi-pejabat-struktural?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )

    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (valFilternama.val !== '') {
      uriParam += `&nama=${valFilternama.val}`
    }
    if (valFilterkepegawaian_nip.val !== '') {
      uriParam += `&nip=${valFilterkepegawaian_nip.val}`
    }
    if (valFilterkepegawaian_nrk.val !== '') {
      uriParam += `&nrk=${valFilterkepegawaian_nrk.val}`
    }
    if (inputValKota.value) {
      uriParam += `&kota=${inputValKota.value}`
    }
    if (inputValKec.value) {
      uriParam += `&kecamatan=${inputValKec.value}`
    }
    if (inputValKel.value) {
      uriParam += `&kelurahan=${inputValKel.value}`
    }
    if (inputValJabatan.value) {
      uriParam += `&jabatan=${inputValJabatan.value}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleFilterReset = () => {
    setFilternama({val: ''})
    setFilterkepegawaian_nip({val: ''})
    setFilterkepegawaian_nrk({val: ''})
    setDataKota({label: '', value: null})
    setDataKec({label: '', value: null})
    setDataKel({label: '', value: null})
    setDataJabatan({label: '', value: null})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const filterKota = async (inputValue: string) => {
    const response = await axios.get(`${KOTA_URL}/find${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.kota, value: i.id}))
  }
  const loadOptionsKota = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterKota(inputValue))
    }, 1000)
  }
  const handleInputKota = (newValue: any) => {
    setDataKota((prevstate: any) => ({...prevstate, ...newValue}))
  }

  const filterKec = async (inputValue: string) => {
    const response = await axios.get(`${KECAMATAN_URL}/find${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.kecamatan, value: i.id}))
  }
  const loadOptionsKec = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterKec(inputValue))
    }, 1000)
  }
  const handleInputKec = (newValue: any) => {
    setDataKec((prevstate: any) => ({...prevstate, ...newValue}))
  }

  const filterKel = async (inputValue: string) => {
    const response = await axios.get(`${KELURAHAN_URL}/find${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.kelurahan, value: i.id}))
  }
  const loadOptionsKel = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterKel(inputValue))
    }, 1000)
  }
  const handleInputKel = (newValue: any) => {
    setDataKel((prevstate: any) => ({...prevstate, ...newValue}))
  }

  const filterJabatan = async (inputValue: string) => {
    const response = await axios.get(`${JABATAN_URL}/find${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.jabatan, value: i.id}))
  }
  const loadOptionsJabatan = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterJabatan(inputValue))
    }, 1000)
  }
  const handleInputJabatan = (newValue: any) => {
    setDataJabatan((prevstate: any) => ({...prevstate, ...newValue}))
  }

  const GetJabatan = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(`${JABATAN_URL}/findone/${id}`)
        const result: string = data.data.jabatan
        setValData(result)
      }
      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

  const GetTempatTugas = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(`${MASTER_BIDANG_WILAYAH}/findone/${id}`)
        const result: string = data.data.nama
        setValData(result)
      }
      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
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
        return <div className='mb-2 mt-2'>{num++}</div>
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
      selector: (row: any) => row.kepegawaian_nip,
      sortable: true,
      sortField: 'kepegawaian_nip',
      wrap: true,
      width: '175px',
    },
    {
      name: 'NRK',
      selector: (row: any) => row.kepegawaian_nrk,
      sortable: true,
      sortField: 'kepegawaian_nrk',
      wrap: true,
    },
    {
      name: 'Jabatan',
      selector: (row: any) => row.kepegawaian_jabatan,
      sortable: true,
      sortField: 'kepegawaian_jabatan',
      wrap: true,
      width: '280px',
      cell: (record: any) => <GetJabatan row={parseInt(record.kepegawaian_jabatan)} />,
    },
    {
      name: 'Tempat Tugas',
      selector: (row: any) => row.kepegawaian_tempat_tugas,
      sortable: true,
      sortField: 'kepegawaian_tempat_tugas',
      wrap: true,
      width: '170px',
      cell: (record: any) => <GetTempatTugas row={parseInt(record.kepegawaian_tempat_tugas)} />,
    },
  ]

  const fetchUsers = async (page: any) => {
    setLoading(true)
    const response = await axios.get(
      `${KEPEGAWAIAN_URL}/filter?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)

    setTotalRows(response.data.total_data)
    setLoading(false)
    return [data, setData] as const
  }

  const fetchData = async (page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${KEPEGAWAIAN_URL}/filter-rekapitulasi-pejabat-struktural?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setTotalRows(response.data.total_data)
    setLoading(false)

    return [data, setData] as const
  }

  const handleChangeInputnama = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilternama({val: event.target.value})
  }
  const handleChangeInputkepegawaian_nip = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterkepegawaian_nip({val: event.target.value})
  }
  const handleChangeInputkepegawaian_nrk = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterkepegawaian_nrk({val: event.target.value})
  }

  const handlePageChange = (page: number) => {
    fetchData(page)
  }

  const handleUnduh = async () => {
    setbtnLoadingUnduh(true)
    await axios({
      url: `${REKAPITULASI_PEJABAT_STRUKTURAL}/unduh-data-pegawai-struktural?q=1${qParamFind.strparam}`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(response.data, 'DATA REKAPITULASI PEJABAT STRUKTURAL.xlsx')
      setbtnLoadingUnduh(false)
    })
  }

  return (
    <>
      {/* Header */}
      <LaporanRekapHeader />
      {/* Second Card */}
      <div className='card'>
        <div className='card-body'>
          <div className='form-group'>
            <div className='row mb-10'>
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Nama
                </label>
                <input
                  type='text'
                  className='form-control form-control form-control-solid'
                  name='nama'
                  value={valFilternama.val}
                  onChange={handleChangeInputnama}
                  placeholder='Nama'
                />
              </div>
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Wilayah / Bidang
                </label>
                <AsyncSelect
                  cacheOptions
                  value={inputValKota.value ? inputValKota : {value: '', label: 'Pilih'}}
                  loadOptions={loadOptionsKota}
                  defaultOptions
                  onChange={handleInputKota}
                  placeholder={'Pilih'}
                />
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='row mb-10'>
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  NRK
                </label>
                <input
                  type='text'
                  className='form-control form-control form-control-solid'
                  name='kepegawaian_nrk'
                  value={valFilterkepegawaian_nrk.val}
                  onChange={handleChangeInputkepegawaian_nrk}
                  placeholder='NRK'
                />
              </div>
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Kecamatan / Seksi
                </label>
                <AsyncSelect
                  cacheOptions
                  value={inputValKec.value ? inputValKec : {value: '', label: 'Pilih'}}
                  loadOptions={loadOptionsKec}
                  defaultOptions
                  onChange={handleInputKec}
                  placeholder={'Pilih'}
                />
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='row mb-10'>
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  NIP
                </label>
                <input
                  type='text'
                  className='form-control form-control form-control-solid'
                  name='kepegawaian_nip'
                  value={valFilterkepegawaian_nip.val}
                  onChange={handleChangeInputkepegawaian_nip}
                  placeholder='NIP'
                />
              </div>
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Kelurahan
                </label>
                <AsyncSelect
                  cacheOptions
                  value={inputValKel.value ? inputValKel : {value: '', label: 'Pilih'}}
                  loadOptions={loadOptionsKel}
                  defaultOptions
                  onChange={handleInputKel}
                  placeholder={'Pilih'}
                />
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='row mb-10'>
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12 offset-md-6'>
                <label htmlFor='' className='mb-3'>
                  Jabatan
                </label>
                <AsyncSelect
                  cacheOptions
                  value={inputValJabatan.value ? inputValJabatan : {value: '', label: 'Pilih'}}
                  loadOptions={loadOptionsJabatan}
                  defaultOptions
                  onChange={handleInputJabatan}
                  placeholder={'Pilih'}
                />
              </div>
            </div>
          </div>
          <div className='row g-8 mt-2'>
            <div className='col-sm-4 col-md-6 col-lg-6'>
              <Link to='#'>
                <Button onClick={handleFilter} className='btn btn-primary me-2'>
                  <i className='fa-solid fa-search'></i>
                  Cari
                </Button>
              </Link>
              <Link to='#' onClick={handleFilterReset}>
                <button className='btn btn-primary'>
                  <i className='fa-solid fa-arrows-rotate'></i>
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
                {/* end::Content */}
              </div>
              {/* end::SubMenu */}
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body py-4'>
            <div className='row'>
              <div className='col fs-4 mb-2 fw-semibold text-center'>DAFTAR PEJABAT STRUKTURAL</div>
            </div>
            <div className='row'>
              <div className='col fs-4 mb-2 fw-semibold text-center'>
                SATPOL PP PROVINSI DKI JAKARTA
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
            />
          </div>
        </div>
      </div>
    </>
  )
}
