import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable, {createTheme} from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import AsyncSelect from 'react-select/async'
import Swal from 'sweetalert2'
import FileDownload from 'js-file-download'
import {KTSVG} from '../../../../_metronic/helpers'
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

export interface FormInput {
  jenis_sarana_prasarana?: any
  status_sarana_prasarana?: any
  jumlah?: number
  kondisi?: any
  keterangan?: string
  file_dokumentasi?: string
}

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const SARANA_PRASARANA_URL = `${API_URL}/sarana-prasarana` //http://localhost:3000/sarana-prasarana

export function LaporanSaranaPrasarana() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [inputValJenis, setDataJenis] = useState({label: '', value: null})
  const [inputValStatus, setDataStatus] = useState({label: '', value: null})
  const [inputValKondisi, setDataKondisi] = useState({label: '', value: null})
  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [qParamFind, setUriFind] = useState({strparam: ''})

  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      const response = await axios.get(
        `${SARANA_PRASARANA_URL}/filter?limit=${perPage}&offset=${page}${qParamFind.strparam}`
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

  const konfirDel = (id: number) => {
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
        const response = await axios.delete(`${SARANA_PRASARANA_URL}/delete/${id}`)
        if (response) {
          fetchUsers(1)
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

  const columns = [
    {
      name: 'Jenis Sarana & Prasarana',
      selector: (row: any) => row.jenis_sarana_prasarana,
      sortable: true,
      sortField: 'jenis_sarana_prasarana',
      wrap: true,
      minWidth: '200px',
    },
    {
      name: 'Status Sarana & Prasarana',
      selector: (row: any) => row.status_sarana_prasarana,
      sortable: true,
      sortField: 'status_sarana_prasarana',
      wrap: true,
      minWidth: '200px',
    },
    {
      name: 'Jumlah',
      selector: (row: any) => row.jumlah,
      sortable: true,
      sortField: 'jumlah',
      wrap: true,
      minWidth: '100px',
      center: true,
    },
    {
      name: 'Kondisi',
      selector: (row: any) => row.kondisi,
      sortable: true,
      sortField: 'kondisi',
      wrap: true,
      minWidth: '100px',
    },
    {
      name: 'Keterangan',
      selector: (row: any) => row.keterangan,
      sortable: true,
      sortField: 'keterangan',
      wrap: true,
      minWidth: '100px',
    },
    {
      name: 'Dokumentasi',
      selector: (row: any) => row.dokumentasi,
      sortable: false,
      minWidth: '100px',
      center: true,
      cell: (record: any) => {
        return (
          <a
            target='_blank'
            rel='noreferrer'
            href={`${API_URL}/${record.dokumentasi}`}
            className='btn-link'
          >
            Lihat
          </a>
        )
      },
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
                          '/sarana-prasarana/LaporanSaranaPrasarana/LihatLaporanSarana/' +
                            record.id,
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
                          '/sarana-prasarana/LaporanSaranaPrasarana/UbahLaporanSarana/' + record.id,
                          {replace: true}
                        )
                      }
                    >
                      Ubah
                    </Dropdown.Item>
                    <Dropdown.Item href='#' onClick={() => konfirDel(record.id)}>
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
        minHeight: '121px', // override the row height
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

  const fetchUsers = async (page: any) => {
    setLoading(true)
    const response = await axios.get(
      `${SARANA_PRASARANA_URL}/filter?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)

    setTotalRows(response.data.total_data)
    setLoading(false)
    return [data, setData] as const
  }

  const handlePageChange = (page: any) => {
    fetchUsers(page)
  }

  const handlePerRowsChange = async (newPerPage: any, page: any) => {
    setLoading(true)

    const response = await axios.get(
      `${SARANA_PRASARANA_URL}/filter?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )

    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  // AUTOCOMPLITE JENIS SARANA & PRASANAN
  const filterSapra = async (inputValue: string) => {
    const response = await axios.get(`${SARANA_PRASARANA_URL}/findjenis/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.jenis_sarana_prasarana, value: i.id}))
  }
  const loadOptionsSapra = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterSapra(inputValue))
    }, 1000)
  }
  const handleInputChange = (newValue: any) => {
    setDataJenis((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // AUTOCOMPLITE STATUS SARANA & PRASANAN
  const filterStapra = async (inputValue: string) => {
    const response = await axios.get(`${SARANA_PRASARANA_URL}/findstatus/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.status_sarana_prasarana, value: i.id}))
  }
  const loadOptionsStapra = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterStapra(inputValue))
    }, 1000)
  }
  const handleInputStapra = (newValue: any) => {
    setDataStatus((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // AUTOCOMPLITE KONDISI SARANA & PRASANAN
  const filterKonpra = async (inputValue: string) => {
    const response = await axios.get(`${SARANA_PRASARANA_URL}/findkondisi/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.kondisi_sarana_prasarana, value: i.id}))
  }
  const loadOptionsKonpra = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterKonpra(inputValue))
    }, 1000)
  }
  const handleInputKonpra = (newValue: any) => {
    setDataKondisi((prevstate: any) => ({...prevstate, ...newValue}))
  }

  const handleFilterReset = () => {
    setDataJenis({label: '', value: null})
    setDataStatus({label: '', value: null})
    setDataKondisi({label: '', value: null})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (inputValJenis.value) {
      uriParam += `&jenis_sarana_prasarana=${inputValJenis.value}`
    }
    if (inputValStatus.value) {
      uriParam += `&status_sarana_prasarana=${inputValStatus.value}`
    }
    if (inputValKondisi.value) {
      uriParam += `&kondisi_sarana_prasarana=${inputValKondisi.value}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleUnduh = async () => {
    setbtnLoadingUnduh(true)
    await axios({
      url: `${SARANA_PRASARANA_URL}/unduh?q=1${qParamFind.strparam}`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(response.data, 'DATA SARANA DAN PRASARANA.xlsx')
      setbtnLoadingUnduh(false)
    })
  }

  return (
    <>
      <div className={`card`}>
        {/* begin::Body */}
        <div className='row g-8 mt-2 ms-5 me-5'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='' className='mb-3'>
                Jenis Sarana & Prasarana
              </label>
              <AsyncSelect
                cacheOptions
                value={inputValJenis.value ? inputValJenis : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsSapra}
                defaultOptions
                onChange={handleInputChange}
                placeholder={'Pilih'}
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                loadingMessage={() => 'Sedang mencari pilihan...'}
                noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
              />
            </div>
          </div>
        </div>
        <div className='row g-8 mt-2 ms-5 me-5'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='' className='mb-3'>
                Status Sarana & Prasarana
              </label>
              <AsyncSelect
                cacheOptions
                value={inputValStatus.value ? inputValStatus : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsStapra}
                defaultOptions
                onChange={handleInputStapra}
                placeholder={'Pilih'}
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                loadingMessage={() => 'Sedang mencari pilihan...'}
                noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
              />
            </div>
          </div>
        </div>
        <div className='row g-8 mt-2 ms-5 me-5'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='' className='mb-3'>
                Kondisi
              </label>
              <AsyncSelect
                cacheOptions
                value={inputValKondisi.value ? inputValKondisi : {value: '', label: 'Pilih'}}
                loadOptions={loadOptionsKonpra}
                defaultOptions
                onChange={handleInputKonpra}
                placeholder={'Pilih'}
                styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
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
            <Link to='/sarana-prasarana/LaporanSaranaPrasarana/TambahLaporanSarana'>
              {/* begin::Add user */}
              <button type='button' className='btn btn-primary me-2'>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
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
    </>
  )
}
