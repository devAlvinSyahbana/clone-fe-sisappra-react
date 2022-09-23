import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import clsx from 'clsx'
import FileDownload from 'js-file-download'
import {LaporanPPNSHeader} from './LaporanPPNSHeader'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL

export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const KEPEGAWAIAN_DATA_KELUARGA_URL = `${API_URL}/kepegawaian/find-data-keluarga`
export const KEPEGAWAIAN_DATA_PENDIDIKAN_URL = `${API_URL}/kepegawaian/find-data-pendidikan/`
export const KEPEGAWAIAN_DATA_PENDIDKAN_TERAKHIR_URL = `${API_URL}/kepegawaian/get-pendidikan-terakhir`
export const KEPEGAWAIAN_AUTO_SEARCH_PEGAWAI_URL = `${API_URL}/kepegawaian/auto-search-pegawai`
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

  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.kepegawaian_nrk,
      sortable: true,
      sortField: 'kepegawaian_nrk',
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
      name: 'Tempat Lahir',
      selector: (row: any) => row.tempat_lahir,
      sortable: true,
      sortField: 'tempat_lahir',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Tanggal Lahir',
      selector: (row: any) => row.tgl_lahir,
      sortable: true,
      sortField: 'tgl_lahir',
      wrap: true,
      width: '150px',
    },
    {
      name: 'Jenis Kelamin',
      selector: (row: any) => row.jenis_kelamin,
      sortable: true,
      sortField: 'jenis_kelamin',
      wrap: true,
      width: '150px',
      center: true,
    },
    {
      name: 'Agama',
      selector: (row: any) => row.agama,
      sortable: true,
      sortField: 'agama',
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
      selector: (row: any) => row.kepegawaian_status_pegawai,
      sortable: true,
      sortField: 'kepegawaian_status_pegawai',
      wrap: true,
      center: true,
    },
    {
      name: 'Status Perkawinan',
      selector: (row: any) => row.kepegawaian_nrk,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Umur',
      selector: (row: any) => row.kepegawaian_nrk,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Nomor HP',
      selector: (row: any) => row.kepegawaian_nrk,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Alamat Sesuai KTP',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'RT/RW',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Provinsi',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Kab/Kota',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Kecamatan',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Kelurahan',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Alamat Domisili',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'RT/RW',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Provinsi',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Kab/Kota',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Kecamatan',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Kelurahan',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Nama',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Hubungan Keluarga',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Nama',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Tempat Lahir',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Jenis Kelamin',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Tanggal Lahir',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Jenis Pendidikan',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nama Sekolah / Universitas',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Nomor Ijazah',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Tanggal Ijazah',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Jurusan',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Fakultas',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Upload Ijazah',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'NRK',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'NIP',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Pangkat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Golongan',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'TMT Pangkat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Pendidikan pada SK',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '180px',
      wrap: true,
    },
    {
      name: 'Jabatan',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Eselon',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Tempat Tugas',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Subbag/Seksi/Kecamatan',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Status Pegawai',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor Rekening',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor KARPEG',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor KARIS/KARSU',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Nomor TASPEN',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'NPWP',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Nomor BPJS/ASKES',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'TMT CPNS',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Upload SK CPNS',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'TMT PNS',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Tanggal SK PNS',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Upload SK PNS',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor SK Pangkat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Tanggal SK',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '100px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Upload SK Terakhir',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Diklat Pol PP Dasar',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor Sertifikat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Tanggal Sertifikat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Upload Sertifikat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Diklat Struktural',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor Sertifikat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Tanggal Sertifikat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Upload Sertifikat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Diklat PPNS',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor Sertifikat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Tanggal Sertifikat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Upload Sertifikat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Diklat Fungsional',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Nomor Sertifikat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Tanggal Sertifikat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Upload Sertifikat',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Upload Foto',
      selector: (row: any) => row.no_hp,
      sortable: true,
      width: '150px',
      sortField: 'no_hp',
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
                    <Dropdown.Item href='#' onClick={() => navigate(``, {replace: true})}>
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate(
                          `/kepegawaian/DaftarUrutKepangkatan/UpdateDataPribadiDUK/${record?.id}/${record?.kepegawaian_status_pegawai}`,
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
                          `/kepegawaian/DaftarUrutKepangkatan/UpdateDataPribadi/${record?.id}/${record?.kepegawaian_status_pegawai}`,
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
              <label htmlFor='' className='mb-3'>
                NRK
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
            <Link to='#' onClick={handleFilterReset} className='me-2'>
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

        <div className='table-responsive mt-5 ms-5 me-5 w'>
          <div className='card-body py-8 mt-4'>
            <div className='row'>
              <div className='col fs-4 mb-2 fw-bold text-center'>DAFTAR URUT KEPANGKATAN (DUK)</div>
            </div>
            <div className='row'>
              <div className='col fs-4 mb-2 fw-bold text-center'>
                SATUAN POLISI PAMONG PRAJA..................
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
