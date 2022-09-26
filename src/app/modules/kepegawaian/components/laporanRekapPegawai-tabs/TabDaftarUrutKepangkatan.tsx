import {useState, useEffect, Fragment} from 'react'
import StickyBox from 'react-sticky-box'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import clsx from 'clsx'
import FileDownload from 'js-file-download'
import {LaporanRekapHeader} from './LaporanRekapHeader'
import {number} from 'yup/lib/locale'

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
      selector: (row: any) => row.no_kk,
      sortable: true,
      sortField: 'no_kk',
      wrap: true,
      center: true,
    },
    {
      name: 'Status Perkawinan',
      selector: (row: any) => row.status_perkawinan,
      sortable: true,
      width: '150px',
      sortField: 'status_perkawinan',
      wrap: true,
    },
    {
      name: 'Umur',
      selector: (row: any) => row.umur,
      sortable: true,
      sortField: 'umur',
      wrap: true,
    },
    {
      name: 'Nomor HP',
      selector: (row: any) => row.no_hp,
      sortable: true,
      sortField: 'no_hp',
      wrap: true,
    },
    {
      name: 'Alamat Sesuai KTP',
      selector: (row: any) => row.sesuai_ktp_alamat,
      sortable: true,
      sortField: 'sesua_ktp_alamat',
      width: '150px',
      wrap: true,
    },
    {
      name: 'RT/RW',
      selector: (row: any) => row.sesuai_ktp_rtrw,
      sortable: true,
      sortField: 'sesuai_ktp_rtrw',
      wrap: true,
    },
    {
      name: 'Provinsi',
      selector: (row: any) => row.sesuai_ktp_provinsi,
      sortable: true,
      sortField: 'sesuai_ktp_provinsi',
      wrap: true,
    },
    {
      name: 'Kab/Kota',
      selector: (row: any) => row.sesuai_ktp_kabkota,
      sortable: true,
      sortField: 'sesuai_ktp_kabkota',
      wrap: true,
    },
    {
      name: 'Kecamatan',
      selector: (row: any) => row.sesuai_ktp_kecamatan,
      sortable: true,
      width: '150px',
      sortField: 'sesuai_ktp_kecamatan',
      wrap: true,
    },
    {
      name: 'Kelurahan',
      selector: (row: any) => row.sesuai_ktp_kelurahan,
      sortable: true,
      sortField: 'sesuai_ktp_kelurahan',
      wrap: true,
    },
    {
      name: 'Alamat Domisili',
      selector: (row: any) => row.domisili_alamat,
      sortable: true,
      sortField: 'domisili_alamat',
      width: '150px',
      wrap: true,
    },
    {
      name: 'RT/RW',
      selector: (row: any) => row.domisili_rtrw,
      sortable: true,
      sortField: 'domisili_rtrw',
      wrap: true,
    },
    {
      name: 'Provinsi',
      selector: (row: any) => row.domisili_provinsi,
      sortable: true,
      sortField: 'domisili_provinsi',
      wrap: true,
    },
    {
      name: 'Kab/Kota',
      selector: (row: any) => row.domisili_kabkota,
      sortable: true,
      sortField: 'domisili_kabkota',
      wrap: true,
    },
    {
      name: 'Kecamatan',
      selector: (row: any) => row.domisili_kecamatan,
      sortable: true,
      width: '150px',
      sortField: 'domisili_kecamatan',
      wrap: true,
    },
    {
      name: 'Kelurahan',
      selector: (row: any) => row.domisili_kelurahan,
      sortable: true,
      sortField: 'domisili_kelurahan',
      wrap: true,
    },
    {
      name: 'Nama',
      selector: (row: any) => row.keluarga_nama,
      sortable: true,
      sortField: 'keluarga_nama',
      wrap: true,
    },
    {
      name: 'Hubungan Keluarga',
      selector: (row: any) => row.keluarga_hubungan,
      sortable: true,
      sortField: 'keluarga_hubungan',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Nama',
      selector: (row: any) => row.keluarga_nama1,
      sortable: true,
      sortField: 'keluarga_nama1',
      wrap: true,
    },
    {
      name: 'Tempat Lahir',
      selector: (row: any) => row.keluarga_tempat_lahir,
      sortable: true,
      sortField: 'keluarga_tempat_lahir',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Tanggal Lahir',
      selector: (row: any) => row.keluarga_tgl_lahir,
      sortable: true,
      width: '150px',
      sortField: 'keluarga_tgl_lahir',
      wrap: true,
    },
    {
      name: 'Jenis Kelamin',
      selector: (row: any) => row.keluarga_jenis_kelamin,
      sortable: true,
      width: '150px',
      sortField: 'keluarga_jenis_kelamin',
      wrap: true,
    },
    {
      name: 'Jenis Pendidikan',
      selector: (row: any) => row.pendidikan_jenis_pendidikan,
      sortable: true,
      sortField: 'pendidikan_jenis_pendidikan',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nama Sekolah / Universitas',
      selector: (row: any) => row.pendidikan_nama_sekolah,
      sortable: true,
      sortField: 'pendidikan_nama_sekolah',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Nomor Ijazah',
      selector: (row: any) => row.pendidikan_no_ijazah,
      sortable: true,
      width: '150px',
      sortField: 'pendidikan_no_ijazah',
      wrap: true,
    },
    {
      name: 'Tanggal Ijazah',
      selector: (row: any) => row.pendidikan_tgl_ijazah,
      sortable: true,
      sortField: 'pendidikan_tgl_ijazah',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Jurusan',
      selector: (row: any) => row.pendidikan_jurusan,
      sortable: true,
      sortField: 'pendidikan_jurusan',
      wrap: true,
    },
    {
      name: 'Fakultas',
      selector: (row: any) => row.pendidikan_fakultas,
      sortable: true,
      sortField: 'pendidikan_fakultas',
      wrap: true,
    },
    {
      name: 'Upload Ijazah',
      selector: (row: any) => row.pendidikan_file_ijazah,
      sortable: true,
      width: '150px',
      sortField: 'pendidikan_file_ijazah',
      wrap: true,
    },
    {
      name: 'NRK',
      selector: (row: any) => row.kepegawaian_nrk,
      sortable: true,
      sortField: 'kepegawaian_nrk',
      wrap: true,
    },
    {
      name: 'NIP',
      selector: (row: any) => row.kepegawaian_nip,
      sortable: true,
      sortField: 'kepegawaian_nip',
      wrap: true,
    },
    {
      name: 'Pangkat',
      selector: (row: any) => row.kepegawaian_pangkat,
      sortable: true,
      sortField: 'kepegawaian_pangkatno_hp',
      wrap: true,
    },
    {
      name: 'Golongan',
      selector: (row: any) => row.kepegawaian_golongan,
      sortable: true,
      sortField: 'kepegawaian_golongan',
      wrap: true,
    },
    {
      name: 'TMT Pangkat',
      selector: (row: any) => row.kepegawaian_tmtpangkat,
      sortable: true,
      width: '150px',
      sortField: 'kepegawaian_tmtpangkat',
      wrap: true,
    },
    {
      name: 'Pendidikan pada SK',
      selector: (row: any) => row.kepegawaian_pendidikan_pada_sk,
      sortable: true,
      sortField: 'kepegawaian_pendidikan_pada_sk',
      width: '180px',
      wrap: true,
    },
    {
      name: 'Jabatan',
      selector: (row: any) => row.kepegawaian_jabatan,
      sortable: true,
      sortField: 'kepegawaian_jabatan',
      wrap: true,
    },
    {
      name: 'Eselon',
      selector: (row: any) => row.kepegawaian_eselon,
      sortable: true,
      sortField: 'kepegawaian_eselon',
      wrap: true,
    },
    {
      name: 'Tempat Tugas',
      selector: (row: any) => row.kepegawaian_tempat_tugas,
      sortable: true,
      width: '150px',
      sortField: 'kepegawaian_tempat_tugas',
      wrap: true,
    },
    {
      name: 'Subbag/Seksi/Kecamatan',
      selector: (row: any) => row.kepegawaian_subbag_seksi_kecamatan,
      sortable: true,
      sortField: 'kepegawaian_subbag_seksi_kecamatan',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Status Pegawai',
      selector: (row: any) => row.kepegawaian_status_pegawai,
      sortable: true,
      sortField: 'kepegawaian_status_pegawai',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor Rekening',
      selector: (row: any) => row.kepegawaian_no_rek,
      sortable: true,
      sortField: 'kepegawaian_no_rek',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor KARPEG',
      selector: (row: any) => row.kepegawaian_no_karpeg,
      sortable: true,
      sortField: 'kepegawaian_no_karpeg',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor KARIS/KARSU',
      selector: (row: any) => row.kepegawaian_no_kasirkarsu,
      sortable: true,
      sortField: 'kepegawaian_no_kasirkarsu',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Nomor TASPEN',
      selector: (row: any) => row.kepegawaian_no_taspen,
      sortable: true,
      sortField: 'kepegawaian_no_taspen',
      width: '150px',
      wrap: true,
    },
    {
      name: 'NPWP',
      selector: (row: any) => row.kepegawaian_npwp,
      sortable: true,
      sortField: 'kepegawaian_npwp',
      wrap: true,
    },
    {
      name: 'Nomor BPJS/ASKES',
      selector: (row: any) => row.kepegawaian_no_bpjs_askes,
      sortable: true,
      sortField: 'kepegawaian_no_bpjs_askes',
      width: '150px',
      wrap: true,
    },
    {
      name: 'TMT CPNS',
      selector: (row: any) => row.kepegawaian_tmt_cpns,
      sortable: true,
      sortField: 'kepegawaian_tmt_cpns',
      wrap: true,
    },
    {
      name: 'Upload SK CPNS',
      selector: (row: any) => row.kepegawaian_sk_cpns,
      sortable: true,
      sortField: 'kepegawaian_sk_cpns',
      width: '150px',
      wrap: true,
    },
    {
      name: 'TMT PNS',
      selector: (row: any) => row.kepegawaian_tmt_pns,
      sortable: true,
      sortField: 'kepegawaian_tmt_pns',
      wrap: true,
    },
    {
      name: 'Tanggal SK PNS',
      selector: (row: any) => row.kepegawaian_tgl_sk_pns,
      sortable: true,
      sortField: 'kepegawaian_tgl_sk_pns',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Upload SK PNS',
      selector: (row: any) => row.kepegawaian_sk_pns,
      sortable: true,
      sortField: 'kepegawaian_sk_pns',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor SK Pangkat',
      selector: (row: any) => row.kepegawaian_no_sk_pangkat_terakhir,
      sortable: true,
      sortField: 'kepegawaian_no_sk_pangkat_terakhir',
      width: '200px',
      wrap: true,
    },
    {
      name: 'Tanggal SK',
      selector: (row: any) => row.kepegawaian_tgl_sk_pangkat_terakhir,
      sortable: true,
      width: '100px',
      sortField: 'kepegawaian_tgl_sk_pangkat_terakhir',
      wrap: true,
    },
    {
      name: 'Upload SK Terakhir',
      selector: (row: any) => row.kepegawaian_sk_pangkat_terakhir,
      sortable: true,
      sortField: 'kepegawaian_sk_pangkat_terakhir',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Diklat Pol PP Dasar',
      selector: (row: any) => row.kepegawaian_diklat_pol_pp_dasar,
      sortable: true,
      sortField: 'kepegawaian_diklat_pol_pp_dasar',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor Sertifikat',
      selector: (row: any) => row.kepegawaian_diklat_pol_pp_dasar_no_sertifikat,
      sortable: true,
      sortField: 'kepegawaian_diklat_pol_pp_dasar_no_sertifikat',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Tanggal Sertifikat',
      selector: (row: any) => row.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat,
      sortable: true,
      sortField: 'kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Upload Sertifikat',
      selector: (row: any) => row.kepegawaian_diklat_pol_pp_dasar_file_sertifikat,
      sortable: true,
      sortField: 'kepegawaian_diklat_pol_pp_dasar_file_sertifikat',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Diklat Struktural',
      selector: (row: any) => row.kepegawaian_diklat_pol_pp_struktural,
      sortable: true,
      sortField: 'kepegawaian_diklat_pol_pp_struktural',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor Sertifikat',
      selector: (row: any) => row.kepegawaian_diklat_pol_pp_struktural_no_sertifikat,
      sortable: true,
      sortField: 'kepegawaian_diklat_pol_pp_struktural_no_sertifikat',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Tanggal Sertifikat',
      selector: (row: any) => row.kepegawaian_diklat_pol_pp_struktural_tgl_sertifikat,
      sortable: true,
      sortField: 'kepegawaian_diklat_pol_pp_struktural_tgl_sertifikat',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Upload Sertifikat',
      selector: (row: any) => row.kepegawaian_diklat_pol_pp_struktural_file_sertifikat,
      sortable: true,
      sortField: 'kepegawaian_diklat_pol_pp_struktural_file_sertifikat',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Diklat PPNS',
      selector: (row: any) => row.kepegawaian_diklat_pol_pp_ppns,
      sortable: true,
      sortField: 'kepegawaian_diklat_pol_pp_ppns',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Nomor Sertifikat',
      selector: (row: any) => row.kepegawaian_diklat_pol_pp_ppns_no_sertifikat,
      sortable: true,
      sortField: 'kepegawaian_diklat_pol_pp_ppns_no_sertifikat',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Tanggal Sertifikat',
      selector: (row: any) => row.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat,
      sortable: true,
      sortField: 'kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Upload Sertifikat',
      selector: (row: any) => row.kepegawaian_diklat_pol_pp_ppns_file_sertifikat,
      sortable: true,
      sortField: 'kepegawaian_diklat_pol_pp_ppns_file_sertifikat',
      width: '150px',
      wrap: true,
    },
    {
      name: 'Diklat Fungsional',
      selector: (row: any) => row.kepegawaian_diklat_fungsional_pol_pp,
      sortable: true,
      width: '150px',
      sortField: 'kepegawaian_diklat_fungsional_pol_pp',
      wrap: true,
    },
    {
      name: 'Nomor Sertifikat',
      selector: (row: any) => row.kepegawaian_diklat_fungsional_pol_pp_no_sertifikat,
      sortable: true,
      width: '150px',
      sortField: 'kepegawaian_diklat_fungsional_pol_pp_no_sertifikat',
      wrap: true,
    },
    {
      name: 'Tanggal Sertifikat',
      selector: (row: any) => row.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat,
      sortable: true,
      width: '150px',
      sortField: 'kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat',
      wrap: true,
    },
    {
      name: 'Upload Sertifikat',
      selector: (row: any) => row.kepegawaian_diklat_fungsional_pol_pp_file_sertifikat,
      sortable: true,
      width: '150px',
      sortField: 'kepegawaian_diklat_fungsional_pol_pp_file_sertifikat',
      wrap: true,
    },
    {
      name: 'Upload Foto',
      selector: (row: any) => row.foto,
      sortable: true,
      width: '150px',
      sortField: 'foto',
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
          <StickyBox>
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
                      <Dropdown.Item href='#' onClick={() => navigate(``, {replace: true})}>
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
          </StickyBox>
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
            <Link
              to='/kepegawaian/TabDaftarUrutKepangkatan/AddDataPribadiDUK/'
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
                backgroundImage: 'url(' + toAbsoluteUrl('/media/svg/shapes/top-green.png') + ')',
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
