import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import clsx from 'clsx'
import FileDownload from 'js-file-download'
import { JadwalPiketHeader } from './jadwalPiket-tabs/JadwalPiketHeader'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL

export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const KEPEGAWAIAN_UNDUH_URL = `${API_URL}/kepegawaian-unduh`

export function JadwalPiket() {
  const navigate = useNavigate()

  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const [valStatPegawai, setValStatPegawai] = useState({ val: '' })
  const [valFilterNama, setFilterNama] = useState({ val: '' })
  const [valFilterNRK, setFilterNRK] = useState({ val: '' })
  const [valFilterNoPegawai, setFilterNoPegawai] = useState({ val: '' })
  const arrStatPegawai = ['PNS', 'PTT', 'PJLP']

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [qParamFind, setUriFind] = useState({ strparam: '' })

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
      name: 'Penanggungjawab Piket',
      colSpan: "4",
    },
    {
      name: 'Tanggal',
      selector: (row: any) => row.tanggal,
      sortable: true,
      sortField: 'tanggal',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Nik',
      selector: (row: any) => row.nik,
      sortable: true,
      sortField: 'nik',
      colspan: '3',
      wrap: true,
    },
    {
      name: 'Nama',
      selector: (row: any) => row.nama,
      sortable: true,
      sortField: 'nama',
      colspan: '3',
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
      name: 'No Telepon',
      selector: (row: any) => row.no_telepon,
      sortable: true,
      sortField: 'no_telepon',
      wrap: true,
      width: '200px',
      center: true,
    },
    {
      name: 'Nrk/Nptt/Npjlp',
      selector: (row: any) => row.nrk_nptt_npjlp,
      sortable: true,
      sortField: 'nrk_nptt_npjlp',
      wrap: true,
      width: '220px',
      center: true,
    },
    {
      name: 'Nama',
      selector: (row: any) => row.nama,
      sortable: true,
      sortField: 'nama',
      wrap: true,
    },
    {
      name: 'No Telepon',
      selector: (row: any) => row.no_telepon,
      sortable: true,
      sortField: 'no_telepon',
      wrap: true,
    },
    {
      name: 'Keterangan',
      selector: (row: any) => row.ket,
      sortable: true,
      sortField: 'ket',
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
                          `/kepegawaian/JadwalPiket/DataPiket/${record?.id}/${record?.kepegawaian_status_pegawai}`,
                          { replace: true }
                        )
                      }
                    >
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate(
                          `/kepegawaian/InformasiDataPegawai/UpdateDataPribadi/${record?.id}/${record?.kepegawaian_status_pegawai}`,
                          { replace: true }
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

  const fetchData = async (page: number) => {
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
    fetchData(page)
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
    setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
  }

  const handleFilterReset = () => {
    setValStatPegawai({ val: '' })
    setFilterNama({ val: '' })
    setFilterNRK({ val: '' })
    setFilterNoPegawai({ val: '' })
    setUriFind((prevState) => ({ ...prevState, strparam: '' }))
  }

  const handleChangeStatPegawai = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValStatPegawai({ val: event.target.value })
  }
  const handleChangeInputNama = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setFilterNama({ val: event.target.value })
  }
  const handleChangeInputNRK = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setFilterNRK({ val: event.target.value })
  }
  const handleChangeInputNoPegawai = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setFilterNoPegawai({ val: event.target.value })
  }

  const handleUnduh = async () => {
    setbtnLoadingUnduh(true)
    await axios({
      url: `${KEPEGAWAIAN_UNDUH_URL}/unduh-pegawai?status=${valStatPegawai.val !== '' ? valStatPegawai.val : 'PNS'
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
      <JadwalPiketHeader />
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
              <label htmlFor='' className='mb-3'>
                NIK
              </label>
              <input
                type='text'
                className='form-control form-control form-control-solid'
                name='nrk'
                value={valFilterNRK.val}
                onChange={handleChangeInputNRK}
                placeholder='NIK'
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
                  {arrStatPegawai.map((val: string) => {
                    return <option value={val}>{val}</option>
                  })}
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
                  {arrStatPegawai.map((val: string) => {
                    return <option value={val}>{val}</option>
                  })}
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
                  {arrStatPegawai.map((val: string) => {
                    return <option value={val}>{val}</option>
                  })}
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
            <Link to='/kepegawaian/JadwalPiket/TambahPiket'>
              <Button variant='primary'>
                <span className='svg-icon svg-icon-2'>
                  <svg
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      opacity='0.5'
                      x='11.364'
                      y='20.364'
                      width={16}
                      height={2}
                      rx={1}
                      transform='rotate(-90 11.364 20.364)'
                      fill='currentColor'
                    />
                    <rect x='4.36396' y='11.364' width={16} height={2} rx={1} fill='currentColor' />
                  </svg>
                </span>
                Tambah
              </Button>
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

        <div className='table-responsive mt-6 ms-5 me-5'>
          <div className='card-body py-4 mt-4'>
            <div className='row'>
              <div className='col fs-4 mb-2 fw-bold text-center'>DAFTAR PIKET</div>
            </div>
            <div className='row'>
              <div className='col fs-4 mb-2 fw-bold text-center'>
                PADA SATUAN POLISIPAMONG PRAJA.................................
              </div>
            </div>
            <div className="row">
              <div className="col fs-4 mb-6 fw-semibold text-center">
                BULAN.................................
              </div>
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
            customStyles={customStyles}
          />
        </div>
        <div className="row">
          <div className="col-7 p-10"></div>
          <div className="col-4 fs-8 mb-4 fw-semibold text-center">
            .................................
            <div className="col fs-6 mb-15 fw-semibold text-center">
              Kepala Satpol PP
              ...............................................................
            </div>
            <div className="col fs-6 mb-2 fw-semibold text-center">
              ......................
            </div>
            <div className="col fs-6 mb-2 fw-semibold text-center">
              NIP. ......................
            </div>
          </div>
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}
