import { FC, SetStateAction, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { unparse } from 'papaparse'
import { DtAdmin, DtPimpinan } from '../datatable/data-table-laporan-tamu-daerah'
import { KTSVG } from '../../../../_metronic/helpers'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { createTheme } from 'react-data-table-component'
import { ThemeModeComponent } from '../../../../_metronic/assets/ts/layout'
import { useThemeMode } from '../../../../_metronic/partials'

// Dark Theme
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

export const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MASTERDATA_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL
export const PELAPORAN_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL

export const ListTamuDaerahPage: FC = () => {
  const navigate = useNavigate()
  const { mode } = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [tanggalAwal, setTanggalAwal] = useState({ val: '' })
  const [tanggalAkhir, setTanggalAkhir] = useState({ val: '' })
  const [instansi, setInstansi] = useState({ val: '' })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [totalRows, setTotalRows] = useState(0)
  const [qParamFind, setUriFind] = useState({ strparam: '' })
  const tanggal = [
    {
      tanggalAwal: tanggalAwal.val,
      tanggalAkhir: tanggalAkhir.val,
    },
  ]

  const handleChangeInputTanggalAwal = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setTanggalAwal({ val: event.target.value })
  }

  const handleChangeInputTanggalAkhir = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setTanggalAkhir({ val: event.target.value })
  }

  const handleChangeInputInstansi = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setInstansi({ val: event.target.value })
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (tanggalAwal.val && tanggalAkhir.val) {
      uriParam += `tanggal_kunjungan%20ge%20%27${tanggalAwal.val}%27%20and%20tanggal_kunjungan%20le%20%27${tanggalAkhir.val}%27`
      // console.log('2 on')
    } else if (tanggalAwal.val !== '') {
      // console.log('start on')
      uriParam += `tanggal_kunjungan%20eq%20%27${tanggalAwal.val}%27`
    } else if (tanggalAkhir.val !== '') {
      uriParam += `tanggal_kunjungan%20eq%20%27${tanggalAkhir.val}%27`
    }
    if (instansi.val !== '' && (tanggalAwal.val || tanggalAkhir.val)) {
      uriParam += `%20and%20asal_instansi%20eq%20%27${instansi.val}%27`
      // console.log('2 on')
    } else if (instansi.val !== '') {
      uriParam += `asal_instansi%20eq%20%27${instansi.val}%27`
    }
    setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
  }

  const handleFilterReset = () => {
    setTanggalAwal({ val: '' })
    setTanggalAkhir({ val: '' })
    setInstansi({ val: '' })
    setUriFind((prevState) => ({ ...prevState, strparam: '' }))
  }

  // GET DATA FOR DATA TABLE
  async function dataTamuDaerah(page: number) {
    setLoading(true)
    axios
      .get(
        `${PELAPORAN_URL}/tamu-daerah/?%24filter=${qParamFind.strparam}&%24top=${perPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          tanggal_kunjungan: d.tanggal_kunjungan,
          waktu_mulai_kunjungan: d.waktu_mulai_kunjungan,
          waktu_selesai_kunjungan: d.waktu_selesai_kunjungan,
          asal_instansi: d.asal_instansi,
          jumlah: d.jml_pengunjung,
          maksud_dan_tujuan: d.maksud_dan_tujuan,
          pejabat_penerima_kunjungan: d.pejabat_penerima_kunjungan,
          tempat_kunjungan: d.tempat_kunjungan,
          total_items: d.total_items,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        setData(data)
        setTotalRows(res.data.total_items)
        setLoading(false)

        return [data, setData] as const
      })
  }
  useEffect(() => {
    dataTamuDaerah(0)
  }, [qParamFind, perPage])

  const handlePageChange = (page: number) => {
    dataTamuDaerah(page - 1)
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    axios
      .get(
        `${PELAPORAN_URL}/tamu-daerah/?%24filter=${qParamFind.strparam}&%24top=${newPerPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          tanggal_kunjungan: d.tanggal_kunjungan,
          waktu_mulai_kunjungan: d.waktu_mulai_kunjungan,
          waktu_selesai_kunjungan: d.waktu_selesai_kunjungan,
          asal_instansi: d.asal_instansi,
          jumlah: d.jml_pengunjung,
          maksud_dan_tujuan: d.maksud_dan_tujuan,
          pejabat_penerima_kunjungan: d.pejabat_penerima_kunjungan,
          tempat_kunjungan: d.tempat_kunjungan,
          total_items: d.total_items,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        setData(data)
        setPerPage(newPerPage)
        setLoading(false)
      })
  }

  //ACTION FOR SWITCH USER
  // const [aksi, setAksi] = useState(1)
  const [aksi, setAksi] = useState(0)
  const [hakAkses, setHakAkses] = useState<any>([])
  let value: any = localStorage.getItem('kt-auth-react-v')
  let authValue = JSON.parse(value)
  let idHakAkses = authValue.data.hak_akses
  // console.log('id hak akses', idHakAkses)
  // console.log('aksi', aksi)
  console.log(MASTERDATA_URL)

  const findHakAksesData = async () => {
    const res = await axios.get(`${API_URL}/manajemen-pengguna/hak-akses/findone/${idHakAkses}`)
    // console.log(res.data.data)
    setHakAkses(res.data.data)
  }

  useEffect(() => {
    findHakAksesData()
  }, [])
  useEffect(() => {
    if (hakAkses?.nama_hak_akses?.toLowerCase().includes('admin')) {
      return setAksi(1)
    } else if (hakAkses?.nama_hak_akses?.toLowerCase().includes('kepala ')) {
      return setAksi(2)
    } else {
      return setAksi(0)
    }
  }, [hakAkses])

  const unduhCSV = (data: any[]) => {
    const csvData = unparse(data)
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'LAPORAN PENGAWASAN.csv')
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const vAdmin = () => {
    setAksi(1)
  }
  const vPimpinan = () => {
    setAksi(2)
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
        const bodyParam = {
          data: {
            deleted_by: 'string',
          },
        }
        const response = await axios.delete(`${PELAPORAN_URL}/tamu-daerah/${id}`, bodyParam)
        if (response) {
          dataTamuDaerah(0)
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

  return (
    <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
      <div className='d-flex flex-column flex-column-fluid'>
        <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
          <div
            id='kt_app_toolbar_container'
            className='app-container container-xxl d-flex flex-stack'
          >
            <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
              <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
                Daftar Laporan Tamu Daerah
              </h1>
            </div>
          </div>
        </div>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            {aksi === 0 ? (
              <div className='card'>
                <div className='card-header border-1 py-6 d-flex justify-content-center align-items-center'>
                  <h3 className='fs-4 fw-semibold'>TIDAK MEMILIKI HAK AKSES HALAMAN INI</h3>
                </div>
              </div>
            ) : (
              <div className='card'>
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
                        {/* <Button onClick={vAdmin}>Admin</Button>
                      <Button onClick={vPimpinan}>Pimpinan</Button> */}
                        {aksi === 1 ? (
                          <div className='row w-100 mt-10 mb-10'>
                            <div className='col-md-10 col-lg-10 col-sm-24'>
                              <div className='mb-10'>
                                <div className='row'>
                                  <div className='col-2 pt-2'>
                                    <label className='form-label align-middle'>Tanggal Awal</label>
                                  </div>
                                  <div className='col-4 mx-10'>
                                    <input
                                      type='date'
                                      name='tanggal_kunjungan'
                                      className='form-control'
                                      value={tanggalAwal.val}
                                      onChange={handleChangeInputTanggalAwal}
                                    // onChange={(o: any) => {
                                    //   setTanggalAwal(o.target.value)
                                    // }}
                                    />
                                    {/* {tanggalAwal.val} */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-10 col-lg-10 col-sm-24'>
                              <div className='mb-10'>
                                <div className='row'>
                                  <div className='col-2 pt-2'>
                                    <label className='form-label align-middle'>Tanggal Akhir</label>
                                  </div>
                                  <div className='col-4 mx-10'>
                                    <input
                                      name='tanggal_kunjungan'
                                      type='date'
                                      className='form-control'
                                      value={tanggalAkhir.val}
                                      onChange={handleChangeInputTanggalAkhir}
                                    // onChange={(o: any) => {
                                    //   setTanggalAkhir(o.target.value)
                                    // }}
                                    />
                                    {/* {tanggalAkhir.val} */}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='row g-8 mt-2'>
                              <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                                <Button
                                  className='btn btn-light-primary me-2'
                                  onClick={handleFilter}
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/general/gen021.svg'
                                    className='svg-icon-2'
                                  />
                                  Cari
                                </Button>
                                <Link
                                  to='#'
                                // onClick={handleFilterReset}
                                >
                                  <Button
                                    className='btn btn-light-primary me-2'
                                    onClick={handleFilterReset}
                                  >
                                    <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                    Reset
                                  </Button>
                                </Link>
                              </div>
                              <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                                {/* begin::Button Unduh */}
                                <button
                                  type='button'
                                  className='btn btn-light-primary me-2'
                                  data-kt-menu-trigger='click'
                                  data-kt-menu-placement='bottom-end'
                                  onClick={() => unduhCSV(data)}>
                                  <>
                                    <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                                    Unduh
                                  </>
                                  {/* end::Button Unduh */}
                                </button>
                                {/* begin::Filter Button */}
                                <Button
                                  onClick={() => navigate('/pelaporan/tambah-laporan-tamu-daerah')}
                                  className='btn btn-primary me-2'
                                >
                                  {/* begin::Add user */}
                                  <KTSVG
                                    path='/media/icons/duotune/arrows/arr075.svg'
                                    className='svg-icon-2'
                                  />
                                  Tambah
                                  {/* end::Add user */}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // View Pimpinan
                          <div className='row w-100 mt-10 mb-10'>
                            <div className='col-md-6 col-lg-6 col-sm-12'>
                              <div className='mb-10'>
                                <div className='row'>
                                  <div className='col-4 pt-2'>
                                    <label className='form-label align-middle'>Instansi</label>
                                  </div>
                                  <div className='col-8'>
                                    <input
                                      type='text'
                                      name='asal_instansi'
                                      className='form-control'
                                      placeholder='Masukkan asal instansi'
                                      value={instansi.val}
                                      onChange={handleChangeInputInstansi}
                                    />
                                    {/* {instansi.val} */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-6 col-lg-6 col-sm-12'>
                              <div className='mb-10'>
                                <div className='row'>
                                  <div className='col-4 pt-2'>
                                    <label className='form-label align-middle'>Tanggal Awal</label>
                                  </div>
                                  <div className='col-8'>
                                    <input
                                      name='kegiatan__tanggal_awal'
                                      type='date'
                                      className='form-control'
                                      value={tanggalAwal.val}
                                      onChange={handleChangeInputTanggalAwal}
                                    />
                                    {/* {tanggalAwal.val} */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-10 col-lg-10 col-sm-24'>
                              <div className='mb-10'>
                                <div className='row'>
                                  <div className='col-2 pt-2'>
                                    <label className='form-label align-middle'>Tanggal Akhir</label>
                                  </div>
                                  <div className='col-4 mx-10'>
                                    <input
                                      name='kegiatan__tanggal_akhir'
                                      type='date'
                                      className='form-control'
                                      value={tanggalAkhir.val}
                                      onChange={handleChangeInputTanggalAkhir}
                                    />
                                    {/* {tanggalAkhir.val} */}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='row g-8 mt-2'>
                              <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                                <Button
                                  className='btn btn-light-primary me-2'
                                  onClick={handleFilter}
                                >
                                  <KTSVG
                                    path='/media/icons/duotune/general/gen021.svg'
                                    className='svg-icon-2'
                                  />
                                  Cari
                                </Button>
                                <Link
                                  to='#'
                                // onClick={handleFilterReset}
                                >
                                  <Button
                                    className='btn btn-light-primary me-2'
                                    onClick={handleFilterReset}
                                  >
                                    <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                    Reset
                                  </Button>
                                </Link>
                              </div>
                              <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                                {/* begin::Button Unduh */}
                                <button
                                  type='button'
                                  className='btn btn-light-primary me-2'
                                  data-kt-menu-trigger='click'
                                  data-kt-menu-placement='bottom-end'
                                  onClick={() => unduhCSV(data)}>
                                  <>
                                    <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                                    Unduh
                                  </>
                                  {/* end::Button Unduh */}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {aksi === 1 ? (
                  <div className='card-body py-4'>
                    <DtAdmin
                      data={data}
                      totalRows={totalRows}
                      handlePerRowsChange={handlePerRowsChange}
                      handlePageChange={handlePageChange}
                      loading={loading}
                      konfirDel={konfirDel}
                      theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                    />
                  </div>
                ) : (
                  <>
                    <div className='card-body py-4'>
                      <div className='row'>
                        <div className='col fs-4 mb-2 fw-semibold text-center'>
                          REKAPITULASI TAMU DAERAH
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col fs-4 mb-2 fw-semibold text-center'>
                          PADA SATPOL PP......................................
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col fs-4 mb-6 fw-semibold text-center'>
                          PERIODE{' '}
                          {tanggalAwal.val !== undefined ? tanggalAwal.val : '....................'}{' '}
                          s/d{' '}
                          {tanggalAkhir.val !== undefined
                            ? tanggalAkhir.val
                            : '....................'}
                        </div>
                      </div>
                      <DtPimpinan
                        data={data}
                        totalRows={totalRows}
                        handlePerRowsChange={handlePerRowsChange}
                        handlePageChange={handlePageChange}
                        loading={loading}
                        theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                      />
                    </div>
                    <div className='row'>
                      <div className='col-8'></div>
                      <div className='col-4 fs-6 mb-2 fw-semibold text-center'>
                        Jakarta, ..............................20...
                        <div className='col fs-6 mb-15 fw-semibold text-center'>
                          KEPALA SATUAN POLISI PAMONG PRAJA
                          ...............................................................
                        </div>
                        <div className='col fs-6 mb-2 fw-semibold text-center'>NAMA</div>
                        <div className='col fs-6 mb-2 fw-semibold text-center'>
                          NIP. ......................
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
