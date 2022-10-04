import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import FileDownload from 'js-file-download'
import {LaporanRekapHeader} from './LaporanRekapHeader'
import {number} from 'yup/lib/locale'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL

export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const KEPEGAWAIAN_UNDUH_URL = `${API_URL}/kepegawaian-unduh`

export function TabDaftarUrutKepangkatan() {
  const navigate = useNavigate()

  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const [valStatPegawai, setValStatPegawai] = useState({val: ''})
  const [valFilterNama, setFilterNama] = useState({val: ''})
  const [valFilterNRK, setFilterNRK] = useState({val: ''})
  const [valFilterNoPegawai, setFilterNoPegawai] = useState({val: ''})
  const [valFilterWilayah, setFilterWilayah] = useState({val: ''})
  const [valFilterKecamatanSeksi, setFilterKecamatanSeksi] = useState({val: ''})
  const [valFilterKelurahan, setFilterKelurahan] = useState({val: ''})
  const arrStatPegawai = ['CPNS', 'PNS', 'PTT', 'PJLP']

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
      selector: (row: any) => row.tgl_lahir,
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
      name: 'Status Kepegawaian',
      selector: (row: any) => row.status_kepegawaian,
      sortable: true,
      sortField: 'status_kepegawaian',
      width: '180px',
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
      selector: (row: any) => row.kepegawaian_nrk,
      sortable: true,
      sortField: 'kepegawaian_nrk',
      wrap: true,
      center: true,
    },
    {
      name: 'Nomor KK',
      selector: (row: any) => row.no_kk,
      sortable: true,
      sortField: 'no_kk',
      wrap: true,
      center: true,
    },
    {
      name: 'Tempat Tugas',
      selector: (row: any) => row.tempat_tugas,
      sortable: true,
      sortField: 'tempat_tugas',
      width: '120px',
      wrap: true,
    },
    {
      name: 'Tanggal Lahir',
      selector: (row: any) => row.tanggal_lahir,
      sortable: true,
      sortField: 'tanggal_lahir',
      width: '120px',
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
                          `/kepegawaian/TabDaftarUrutKepangkatan/DataPribadiDUK/${record?.id}/${record?.kepegawaian_status_pegawai}`,
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
                          `/kepegawaian/TabDaftarUrutKepangkatan/UpdateDataPribadiDUK/${record?.id}/${record?.kepegawaian_status_pegawai}`,
                          {
                            replace: true,
                          }
                        )
                      }
                    >
                      Ubah
                    </Dropdown.Item>
                    <Dropdown.Item href='#' onClick={() => konfirDel(record?.id)}>
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

  const konfirDel = (id: number) => {
    Swal.fire({
      title: 'Anda yakin?',
      text: 'Ingin menghapus data ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya!',
      cancelButtonText: 'Tidak!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(`${KEPEGAWAIAN_URL}/delete/${id}`)
        if (response) {
          fetchUsers(1)
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil dihapus',
            showConfirmButton: false,
            timer: 1500,
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Data gagal dihapus, harap mencoba lagi',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      }
    })
  }

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
        `${KEPEGAWAIAN_URL}/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
      )
      setData(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchDT(1)
  }, [qParamFind, perPage])

  const fetchUsers = async (page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${KEPEGAWAIAN_URL}/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setTotalRows(response.data.total_data)
    setLoading(false)

    return [data, setData] as const
  }

  const handlePageChange = (page: number) => {
    fetchUsers(page)
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${KEPEGAWAIAN_URL}/find?limit=${newPerPage}&offset=${page}${qParamFind.strparam}`
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
      url: `${KEPEGAWAIAN_UNDUH_URL}/unduh-pegawai?status=${
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
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Wilayah / Bidang
                </label>
                <select
                  className='form-select form-select-solid'
                  aria-label='Select example'
                  value={valStatPegawai.val}
                  onChange={handleChangeStatPegawai}
                  name='val'
                >
                  <option value=''>Pilih</option>
                  <option value=''>1</option>
                  <option value=''>2</option>
                  <option value=''>3</option>
                  {/* {arrStatPegawai.map((val: string) => {
                    return <option value={val}>{val}</option>
                  })} */}
                </select>
              </div>
            </div>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Kecamatan / Seksi
                </label>
                <select
                  className='form-select form-select-solid'
                  aria-label='Select example'
                  value={valStatPegawai.val}
                  onChange={handleChangeStatPegawai}
                  name='val'
                >
                  <option value=''>Pilih</option>
                  <option value=''>1</option>
                  <option value=''>2</option>
                  <option value=''>3</option>
                  {/* {arrStatPegawai.map((val: string) => {
                    return <option value={val}>{val}</option>
                  })} */}
                </select>
              </div>
            </div>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Kelurahan
                </label>
                <select
                  className='form-select form-select-solid'
                  aria-label='Select example'
                  value={valStatPegawai.val}
                  onChange={handleChangeStatPegawai}
                  name='val'
                >
                  <option value=''>Pilih</option>
                  <option value=''>1</option>
                  <option value=''>2</option>
                  <option value=''>3</option>
                  {/* {arrStatPegawai.map((val: string) => {
                    return <option value={val}>{val}</option>
                  })} */}
                </select>
              </div>
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
            <Link
              to='/kepegawaian/TabDaftarUrutKepangkatan/AddDataPribadiDUK'
              onClick={handleFilterReset}
              className='me-2'
            >
              <button className='btn btn-primary'>
                <i className='fa-solid fa-plus'></i>
                Tambah
              </button>
            </Link>
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end::Body */}
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
    </>
  )
}
