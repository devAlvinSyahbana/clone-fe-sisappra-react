import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import {LaporanRekapHeader} from './LaporanRekapHeader'
import AsyncSelect from 'react-select/async'
import clsx from 'clsx'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import FileDownload from 'js-file-download'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL

export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const KELURAHAN_URL = `${API_URL}/master/kelurahan`
export const BIDANG_WILAYAH_URL = `${API_URL}/master/bidang-wilayah`
export const KECAMATAN_URL = `${API_URL}/master/kecamatan`
export const JABATAN_URL = `${API_URL}/master/jabatan`
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
  const navigate = useNavigate()

  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const [valStatPegawai, setValStatPegawai] = useState({val: ''})
  const [valFilterNama, setFilterNama] = useState({val: ''})
  const [valFilterNRK, setFilterNRK] = useState({val: ''})
  const [valFilterNoPegawai, setFilterNoPegawai] = useState({val: ''})
  const arrStatPegawai = ['PNS', 'PTT', 'PJLP']

  const [valFilterNip, setFilterNip] = useState({val: ''})
  const [valFilterJa, setFilterJa] = useState({val: ''})
  const [inputValStPa, setDataStPa] = useState({label: '', value: null})
  const [inputValWilayah, setDataWilayah] = useState({label: '', value: null})
  const [inputValKec, setDataKec] = useState({label: '', value: null})
  const [inputValKel, setDataKel] = useState({label: '', value: null})
  const [inputValPangkat, setDataPangkat] = useState({label: '', value: null})
  const [inputValJabatan, setDataJabatan] = useState({label: '', value: null})

  const [tmp_kot, setTmp_kot] = useState({label: '', value: ''})

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

  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.id,
      sortable: true,
      sortField: 'id',
      wrap: true,
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
                          `/kepegawaian/TabDataPegawaiYangNaikPangkat/UpdateNaikPangkat/${record?.id}/${record?.kepegawaian_status_pegawai}`,
                          {replace: true}
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
    if (valFilterJa.val) {
      uriParam += `&tahun_jnp=${valFilterJa.val}`
    }
    if (inputValWilayah.value) {
      uriParam += `&nama=${inputValWilayah.value}`
    }
    if (valFilterNip.val) {
      uriParam += `&nip=${valFilterNip.val}`
    }
    if (inputValKec.value) {
      uriParam += `&seksi_kecamatan=${inputValKec.value}`
    }
    if (inputValKel.value) {
      uriParam += `&kelurahan=${inputValKel.value}`
    }
    if (inputValJabatan.value) {
      uriParam += `&id_jabatan=${inputValJabatan.value}`
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
    setFilterJa({val: ''})
    setDataWilayah({label: '', value: null})
    setDataKec({label: '', value: null})
    setDataKel({label: '', value: null})
    setDataPangkat({label: '', value: null})
    setDataJabatan({label: '', value: null})
    setDataStPa({label: '', value: null})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const handleChangeInputNama = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterNama({val: event.target.value})
  }
  const handleChangeInputJa = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterJa({val: event.target.value})
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
  const filterWilayah = async (inputValue: string) => {
    const response = await axios.get(BIDANG_WILAYAH_URL + '/filter/' + inputValue)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsWilayah = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterWilayah(inputValue))
    }, 1000)
  }
  const handleInputWilayah = (newValue: any) => {
    setDataWilayah((prevstate: any) => ({...prevstate, ...newValue}))
  }
  // const handleInputWilayah = async (newValue: any) => {
  //   setDataWilayah((prevstate: any) => ({...prevstate, ...newValue}))
  //   // // filterKec(newValue)
  //   // // loadOptionsKec
  //   // await loadOptionsKec2(newValue)
  // }
  //end kota

  //kecamatan

  // const filterKec = async (inputValue: any) => {
  //   if (inputValue.label != '') {
  //     const response = await axios.get(
  //       KECAMATAN_URL + '/findone-by-kecamatan?kota=' + inputValue.label
  //     )
  //     const json = await response.data.data
  //     console.log(response.data.data)
  //     return json.map((i: any) => ({label: i.kecamatan, value: i.id}))
  //   } else {
  //   }
  // }

  // const loadOptionsKec = (inputValue: any) => {
  //   setTimeout(async () => {
  //     await filterKec2(inputValue)
  //   }, 1000)
  // }
  // const handleInputKec = (newValue: any) => {
  //     setDataKec((prevstate: any) => ({...prevstate, ...newValue}))
  //   }
  const filterKec2 = async (inputValue: string) => {
    const response = await axios.get(
      KECAMATAN_URL +
        '/findone-by-kecamatan?kota=' +
        inputValWilayah.label +
        '&kecamatan=' +
        inputValue
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.kecamatan, value: i.id}))
  }
  const loadOptionsKec2 = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterKec2(inputValue))
    }, 1000)
  }
  const handleInputKec2 = (newValue: any) => {
    setDataKec((prevstate: any) => ({...prevstate, ...newValue}))
  }
  //end kecamtan

  // //kelurahan
  // const filterKel = async (inputValue: string) => {
  //   const response = await axios.get(
  //     KELURAHAN_URL +
  //       '/findone-by-kelurahan?kecamatan=' +
  //       inputValKec.label +
  //       '&kelurahan=' +
  //       inputValue
  //   )
  //   const json = await response.data.data
  //   return json.map((i: any) => ({label: i.kelurahan, value: i.id}))
  // }
  // const loadOptionsKel = (inputValue: string, callback: (options: SelectOption[]) => void) => {
  //   setTimeout(async () => {
  //     callback(await filterKel(inputValue))
  //   }, 1000)
  // }
  // const handleInputKel = (newValue: any) => {
  //   setDataKel((prevstate: any) => ({...prevstate, ...newValue}))
  // }
  // //end kelurahan

  //jabatan
  const filterJabatan = async (inputValue: string) => {
    const response = await axios.get(`${JABATAN_URL}/filter/${inputValue}`)
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
                  cacheOptions
                  value={inputValWilayah.value ? inputValWilayah : {value: '', label: 'Pilih'}}
                  loadOptions={loadOptionsWilayah}
                  defaultOptions
                  onChange={handleInputWilayah}
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
                  cacheOptions
                  value={inputValKec.value ? inputValKec : {value: '', label: 'Pilih'}}
                  loadOptions={loadOptionsKec2}
                  // defaultOptions
                  onChange={handleInputKec2}
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

            {/* <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Kelurahan
                </label>
                <AsyncSelect
                  cacheOptions
                  value={inputValKel.value ? inputValKel : {value: '', label: 'Pilih'}}
                  defaultOptions
                  loadOptions={loadOptionsKel}
                  onChange={handleInputKel}
                />
              </div>
            </div> */}
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Status Kenaikan
              </label>
              <AsyncSelect
                cacheOptions
                value={inputValStPa.value ? inputValStPa : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsStPa}
                defaultOptions
                onChange={handleInputStPa}
              />
            </div>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Jadwal Kenaikan
                </label>
                <input
                  type='text'
                  className='form-control form-control form-control-solid'
                  name='jadwal_kenaikan_pangkat'
                  value={valFilterJa.val}
                  onChange={handleChangeInputJa}
                  placeholder='Jadwal Kenaikan'
                />
              </div>
            </div>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Pangkat
              </label>
              <AsyncSelect
                cacheOptions
                value={inputValPangkat.value ? inputValPangkat : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsPangkat}
                defaultOptions
                onChange={handleInputPangkat}
              />
            </div>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Jabatan
              </label>
              <AsyncSelect
                cacheOptions
                value={inputValJabatan.value ? inputValJabatan : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsJabatan}
                defaultOptions
                onChange={handleInputJabatan}
              />
            </div>
          </div>
        </div>

        <div className='row g-8 mt-2 ms-5 me-5'>
          <div className='col-md-6 col-lg-6 col-sm-12'>
            <Link to='#'>
              <button onClick={handleFilter} className='btn btn-primary me-2'>
                <i className='fa-solid fa-search'></i>
                Cari
              </button>
            </Link>
            <Link to='#' onClick={handleFilterReset} className=''>
              <button className='btn btn-primary'>
                <i className='fa-solid fa-arrows-rotate'></i>
                Reset
              </button>
            </Link>
          </div>
          <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
            <Dropdown as={ButtonGroup}>
              <Button variant='light'>
                {btnLoadingUnduh ? (
                  <>
                    <span className='spinner-border spinner-border-md align-middle me-3'></span>{' '}
                    Memproses...
                  </>
                ) : (
                  'Unduh'
                )}
              </Button>

              <Dropdown.Toggle split variant='light' id='dropdown-split-basic' />

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleUnduh}>Excel</Dropdown.Item>
                <Dropdown.Item>PDF</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
