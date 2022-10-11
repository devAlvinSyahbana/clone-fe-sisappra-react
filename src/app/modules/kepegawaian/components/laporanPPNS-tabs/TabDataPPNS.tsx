import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import AsyncSelect from 'react-select/async'
import clsx from 'clsx'
import FileDownload from 'js-file-download'
import {LaporanPPNSHeader} from './LaporanPPNSHeader'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL

export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const KEPEGAWAIAN_UNDUH_URL = `${API_URL}/kepegawaian-unduh`

export function TabDataPPNS() {
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
      sortField: 'kepegawaian_nrk',
      wrap: true,
      cell: (record: any) => {
        return <div className='mt-5 mb-5'>{no++}</div>
      },
    },
    {
      name: 'SKPD',
      selector: (row: any) => row.skpd,
      sortable: true,
      sortField: 'skpd',
      width: '200px',
      center: true,
      wrap: true,
    },
    {
      name: 'Nama',
      selector: (row: any) => row.pejabat_ppns_nama,
      sortable: true,
      sortField: 'nama',
      width: '240px',
      center: true,
      wrap: true,
    },
    {
      name: 'NIP',
      selector: (row: any) => row.pejabat_ppns_nip,
      sortable: true,
      sortField: 'nip',
      wrap: true,
      center: true,
      width: '170px',
    },
    {
      name: 'NRK',
      selector: (row: any) => row.pejabat_ppns_nrk,
      sortable: true,
      sortField: 'nrk',
      wrap: true,
      center: true,
      width: '150px',
    },
    {
      name: 'Pangkat',
      selector: (row: any) => row.pejabat_ppns_pangkat,
      sortable: true,
      sortField: 'pejabat_ppns_pangkat',
      wrap: true,
      width: '150px',
      center: true,
    },
    {
      name: 'Golongan',
      selector: (row: any) => row.pejabat_ppns_golongan,
      sortable: true,
      sortField: 'pejabat_ppns_golongan',
      wrap: true,
      width: '150px',
      center: true,
    },
    {
      name: 'No. SK. PPNS',
      selector: (row: any) => row.no_sk_ppns,
      sortable: true,
      sortField: 'no_sk_ppns',
      width: '220px',
      wrap: true,
      center: true,
    },
    {
      name: 'No. KTP PPNS',
      selector: (row: any) => row.no_ktp_ppns,
      sortable: true,
      sortField: 'no_ktp_ppns',
      wrap: true,
      width: '150px',
      center: true,
    },
    {
      name: 'Wilayah Kerja',
      selector: (row: any) => row.wilayah_kerja,
      sortable: true,
      width: '190px',
      center: true,
      sortField: 'wilayah_kerja',
      wrap: true,
    },
    {
      name: 'UU yang dikawal',
      selector: (row: any) => row.uu_yg_dikawal,
      sortable: true,
      width: '190px',
      center: true,
      sortField: 'uu_yg_dikawal',
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
                          `/kepegawaian/TabDataPPNS/DataPPNS/${record?.id}/${record?.kepegawaian_status_pegawai}`,
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
                          `/kepegawaian/TabDataPPNS/UpdateDataPPNS/${record?.id}/${record?.kepegawaian_status_pegawai}`,
                          {
                            replace: true,
                          }
                        )
                      }
                    >
                      Ubah
                    </Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate(
                          `/kepegawaian/TabDataPPNS/UpdateDataPPNS/${record?.id}/${record?.kepegawaian_status_pegawai}`,
                          {replace: true}
                        )
                      }
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
          fetchUser(1)
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
        `${KEPEGAWAIAN_URL}/PPNS?limit=${perPage}&offset=${page}${qParamFind.strparam}`
      )
      setData(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchDT(1)
  }, [qParamFind, perPage])

  const fetchUser = async (page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${KEPEGAWAIAN_URL}/PPNS?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setTotalRows(response.data.total_data)
    setLoading(false)

    return [data, setData] as const
  }

  const handlePageChange = (page: number) => {
    fetchUser(page)
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
      <LaporanPPNSHeader />
      <div id='kt_app_content' className='app-content flex-column-fluid'>
        <div className='col-xl-12 mb-xl-12 mt-6'>
          <div className='card'>
            <div className='card card-flush h-xl-100'>
              <div className='card-header border-1 pt-6'>
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
                              placeholder='Nama'
                            />
                          </div>
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <label htmlFor='' className='mb-3'>
                              PANGKAT
                            </label>
                            <input
                              type='text'
                              className='form-control form-control form-control-solid'
                              name='nama'
                              value={valFilterNama.val}
                              onChange={handleChangeInputNama}
                              placeholder='Pangkat'
                            />
                          </div>
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <label htmlFor='' className='mb-3'>
                              NRK
                            </label>
                            <input
                              type='text'
                              className='form-control form-control form-control-solid'
                              name='NRK'
                              value={valFilterNama.val}
                              onChange={handleChangeInputNama}
                              placeholder='NRK'
                            />
                          </div>
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <label htmlFor='' className='mb-3'>
                              GOLONGAN
                            </label>
                            <input
                              type='text'
                              className='form-control form-control form-control-solid'
                              name='nama'
                              value={valFilterNama.val}
                              onChange={handleChangeInputNama}
                              placeholder='Golongan'
                            />
                          </div>
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <label htmlFor='' className='mb-3'>
                              NIP
                            </label>
                            <input
                              type='text'
                              className='form-control form-control form-control-solid'
                              name='nama'
                              value={valFilterNama.val}
                              onChange={handleChangeInputNama}
                              placeholder='NIP'
                            />
                          </div>
                          <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <div className='form-group'>
                              <label htmlFor='' className='mb-3'>
                                SKPD
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
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row g-8 mt-2'>
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
                            to='/kepegawaian/tab-data-ppns/tambah-data-ppns'
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
                    DATA PEJABAT PENYIDIK PEGAWAI NEGERI SIPIL (PPNS)
                  </div>
                </div>
                <div className='row'>
                  <div className='col fs-4 mb-2 fw-bold text-center'>PROVINSI DKI JAKARTA</div>
                </div>
              </div>
            </div>

            <div className='card-body mt-n20'>
              <div className='mt-n20 position-relative'>
                <div className='card border card-flush h-xl-100'>
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
            Kepala Satuan Polisi Pamong Praja
            <div className='col fs-6 mb-15 fw-semibold text-center'>Provinsi DKI Jakara</div>
            <div className='col fs-6 mb-2 fw-semibold text-center'>(Drs. Arifin, M.AP)</div>
            <div className='col fs-6 mb-2 fw-semibold text-center'>NIP. 197206221992031003</div>
          </div>
        </div>
      </div>
    </>
  )
}
