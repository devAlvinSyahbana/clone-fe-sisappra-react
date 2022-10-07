import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable, {createTheme} from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import clsx from 'clsx'
import FileDownload from 'js-file-download'
import {KTSVG} from '../../../../_metronic/helpers'
import {ThemeModeComponent} from '../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_INFORMASI_DATA_PEGAWAI_URL = `${API_URL}/informasi-data-pegawai`
export const MASTER_URL = `${API_URL}/master`

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

export function InformasiDataPegawai() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const [valStatPegawai, setValStatPegawai] = useState({val: ''})
  const [valFilterNama, setFilterNama] = useState({val: ''})
  const [valFilterNRK, setFilterNRK] = useState({val: ''})
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

  const GetAgama = ({row}: {row: number}) => {
    const [valData, setValData] = useState('')
    useEffect(() => {
      async function fetchDT(id: number) {
        const {data} = await axios.get(`${MASTER_URL}/agama/findone/${id}`)
        const result: string = data.data.agama
        setValData(result)
      }
      fetchDT(row)
    }, [valData, row])

    return <>{valData}</>
  }

  const columns = [
    {
      name: 'Nama',
      selector: (row: any) => row.nama,
      sortable: true,
      sortField: 'nama',
      minWidth: '200px',
      wrap: true,
      cell: (record: any) => {
        return (
          <Fragment>
            <div className='d-flex align-items-center'>
              {/* begin:: Avatar */}
              <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                {record?.foto !== '' ? (
                  <div className='symbol-label'>
                    <img src={record?.foto} alt={record?.nama} className='w-100' />
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
      name: 'Tempat Lahir',
      selector: (row: any) => row.tempat_lahir,
      sortable: true,
      sortField: 'tempat_lahir',
      wrap: true,
      minWidth: '125px',
    },
    {
      name: 'Tanggal Lahir',
      selector: (row: any) => row.tgl_lahir,
      sortable: true,
      sortField: 'tgl_lahir',
      wrap: true,
      minWidth: '125px',
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
      selector: (row: any) => row.no_pegawai,
      sortable: true,
      sortField: 'no_pegawai',
      wrap: true,
      center: true,
      minWidth: '100px',
    },
    {
      name: 'Tipe Pegawai',
      selector: (row: any) => row.kepegawaian_status_pegawai,
      sortable: true,
      sortField: 'kepegawaian_status_pegawai',
      wrap: true,
      center: true,
      minWidth: '125px',
    },
    {
      name: 'Jenis Kelamin',
      selector: (row: any) => row.jenis_kelamin,
      sortable: true,
      sortField: 'jenis_kelamin',
      wrap: true,
      center: true,
      minWidth: '125px',
    },
    {
      name: 'Agama',
      selector: (row: any) => row.agama,
      sortable: true,
      sortField: 'agama',
      wrap: true,
      minWidth: '100px',
      cell: (record: any) => <GetAgama row={parseInt(record.agama)} />,
    },
    {
      name: 'No. HP',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
      minWidth: '100px',
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
                          `/kepegawaian/informasi-data-pegawai/detail-data-pribadi/${record?.id}/${record?.kepegawaian_status_pegawai}`,
                          {replace: true}
                        )
                      }
                    >
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate(
                          `/kepegawaian/informasi-data-pegawai/ubah-data-pribadi/${record?.id}/${record?.kepegawaian_status_pegawai}`,
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
        `${KEPEGAWAIAN_INFORMASI_DATA_PEGAWAI_URL}/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
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
      `${KEPEGAWAIAN_INFORMASI_DATA_PEGAWAI_URL}/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
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
      `${KEPEGAWAIAN_INFORMASI_DATA_PEGAWAI_URL}/find?limit=${newPerPage}&offset=${page}${qParamFind.strparam}`
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
    if (valFilterNRK.val !== '') {
      uriParam += `&nrk=${valFilterNRK.val}`
    }
    if (valFilterNoPegawai.val !== '') {
      uriParam += `&nopegawai=${valFilterNoPegawai.val}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleFilterReset = () => {
    setValStatPegawai({val: ''})
    setFilterNama({val: ''})
    setFilterNRK({val: ''})
    setFilterNoPegawai({val: ''})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const handleChangeStatPegawai = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValStatPegawai({val: event.target.value})
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

  const handleUnduh = async () => {
    setbtnLoadingUnduh(true)
    await axios({
      url: `${KEPEGAWAIAN_INFORMASI_DATA_PEGAWAI_URL}/unduh-pegawai?status=${
        valStatPegawai.val !== '' ? valStatPegawai.val : 'PNS'
      }`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(
        response.data,
        'DATA KEPEGAWAIAN ' + (valStatPegawai.val !== '' ? valStatPegawai.val : 'PNS') + '.xlsx'
      )
      setbtnLoadingUnduh(false)
    })
  }

  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div id='kt_advanced_search_form'>
        <div className='row g-8 mt-2 ms-5 me-5'>
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
                {arrStatPegawai.map((val: string) => {
                  return <option value={val}>{val}</option>
                })}
              </select>
            </div>
          </div>
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
              value={valFilterNoPegawai.val}
              onChange={handleChangeInputNoPegawai}
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
        <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-6'>
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
      {/* end::Body */}
    </div>
  )
}
