import axios from 'axios'
import { unparse } from 'papaparse'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useState, useEffect } from 'react'
import { ThemeModeComponent } from '../../../../_metronic/assets/ts/layout'
import { DtSidangTipiring, DtDetail } from './datatables/data-table-laporan-sidang-tipiring'
import { useThemeMode } from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { KTSVG } from '../../../../_metronic/helpers'
import FileDownload from 'js-file-download'
import { Button } from 'react-bootstrap'

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
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`
export const MASTER_URL = `${API_URL}/master`

interface SidangTipiringInterface {
  no: number
  wilayah: string
  jumlah_penertiban: number
  jumlah_pelanggar: number
  jumlah_pelanggar_tidak_hadir: number
  verstek: number
  denda_pengadilan: string
}

export function LaporanSidangTipiring() {
  const navigate = useNavigate()
  const { mode } = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)

  const [detailView, setDV] = useState(false)

  const [totalKegiatan, setTotalKegiatan] = useState([])
  const [totalDetail, setTotalDetail] = useState([])

  const [tanggalAwal, setTanggalAwal] = useState('')
  const [tanggalAkhir, setTanggalAkhir] = useState('')

  const [data, setData] = useState<SidangTipiringInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [qParamFind, setUriFind] = useState({ strparam: '' })

  const unduhCSV = (data: any[]) => {
    const csvData = unparse(data)
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'LAPORAN SIDANG TIPIRING.csv')
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const dataPerdaPerkada = (page: number) => {
    axios
      .get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=${qParamFind.strparam}&%24top=${perPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          pelaksana: d.created_by,
          tanggal_kegiatan: d.kegiatan__tanggal,
          waktu_mulai: d.kegiatan__jam_start,
          waktu_selesai: d.kegiatan__jam_end,
          jenis_kegiatan: d.kegiatan__jenis_kegiatan_id,
          uraian_kegiatan: d.kegiatan__uraian_kegiatan,
          lokasi: d.kegiatan__lokasi,
          jenis_penertiban: d.tindak_lanjut__administrasi__jenis_penertiban,
          denda: d.tindak_lanjut__denda__pengadilan,
          denda_non_pengadilan: d.tindak_lanjut__denda__non_pengadilan,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        setData(data)
        setTotalRows(5)
        setLoading(false)

        return [data, setData] as const
      })
  }

  useEffect(() => {
    dataPerdaPerkada(0)
  }, [qParamFind, perPage])

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    axios
      .get(
        `${PELAPORAN_URL}/kegiatan-umum/?%24filter=${qParamFind.strparam}&%24top=${newPerPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          total_item: d.total_item,
          pelaksana: d.created_by,
          tanggal_kegiatan: d.kegiatan__tanggal,
          waktu_mulai: d.kegiatan__jam_start,
          waktu_selesai: d.kegiatan__jam_end,
          jenis_kegiatan: d.kegiatan__jenis_kegiatan_id,
          uraian_kegiatan: d.kegiatan__uraian_kegiatan,
          wilayah: d.created_by,
          lokasi: d.kegiatan__lokasi,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        setData(data)
        setPerPage(newPerPage)
        setLoading(false)
      })
  }

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

  const [kota, setKota] = useState([])
  const [qParamFindKota, setUriFindKota] = useState({ strparamkota: '' })

  const kotaList = async () => {
    const responseKota = await axios.get(`${MASTERDATA_URL}/kota${qParamFindKota.strparamkota}`)
    const dataKota = responseKota.data.data.map((d: any) => ({
      id: d.id,
      no: d.id,
      pelaksana: d.nama,
    }))
    Array.from(dataKota).forEach((item: any, index: any) => {
      item.serial = index + 1
    })

    setKota(dataKota)
  }

  useEffect(() => {
    kotaList()
  }, [])

  const [filterData, setFilterData] = useState('')
  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterData(e.target.value)
  }

  const filteredData = kota.filter((item: any) => {
    return item.pelaksana.toLowerCase().includes(filterData.toLowerCase())
  })

  const handleFilterReset = () => {
    setFilterData('')
  }

  const viewDetail = (row: string) => {
    setDV(!detailView)

    if (row) {
      const filterDetail = totalKegiatan.filter((item: any) => item.kegiatan__kota_id === row)

      Array.from(filterDetail).forEach((item: any, index: any) => {
        item.serial = index + 1
      })
      setTotalDetail(filterDetail)
    }
  }

  const handleChangeInputTanggalAwal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTanggalAwal(event.target.value);
  };

  const handleChangeInputTanggalAkhir = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTanggalAkhir(event.target.value);
  };

  const awal = new Date(tanggalAwal)
  const akhir = new Date(tanggalAkhir)

  const handleFilterTanggal = async () => {
    const filteredTanggal = totalDetail.filter((item: any) => {
      const itemTanggal = new Date(item.kegiatan__tanggal);
      return itemTanggal >= awal && itemTanggal <= akhir;
    });
    setTotalDetail(filteredTanggal)
  }

  const handleFilterResetTanggal = () => {
    setTanggalAwal('');
    setTanggalAkhir('');
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
        `${MASTERDATA_URL}find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
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
      `${MASTERDATA_URL}find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setTotalRows(response.data.total_data)
    setLoading(false)

    return [data, setData] as const
  }

  return (
    <div className='card'>
      {/* begin::Body */}
      {!detailView ? (
        <>
          <div className='row g-8 mt-2 ms-10 me-2'>
            <label>
              <h3>Pelaksana Kegiatan</h3>
            </label>
            <div className='col-xxl-10 col-lg-10 col-md-8 col-sm-6'>
              <input
                id='search'
                type='text'
                className='form-control form-control form-control-solid'
                placeholder='Masukkan Pelaksana Kegiatan'
                aria-label='Search Input'
                value={filterData}
                onChange={handleFilter}
              />
            </div>

            <div className='justify-content-end col-xxl-2 col-lg-2 col-md-3 col-sm-6'>
              <Button className='btn btn-light-primary me-2' onClick={handleFilterReset}>
                <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                Reset
              </Button>
            </div>
          </div>

          <div className='row g-8 mt-2 ms-10 me-2 mb-6'>
            <div className='d-flex justify-content-end'>
              <button
                type='button'
                className='btn btn-light-primary me-2'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-trigger='click'
                onClick={() => unduhCSV(data)}
              >
                <>
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr078.svg'
                    className='svg-icon-2'
                  />
                  Unduh CSV
                </>
              </button>

              <div>
                <Button
                  type='button'
                  className='btn btn-primary'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                >
                  Pilih Tabel Berdasarkan
                </Button>
                <div
                  className='menu menu-sub menu-sub-dropdown w-200px w-md-200px'
                  data-kt-menu='true'
                >
                  {/* begin::Content */}
                  <div data-kt-user-table-filter='form'>
                    <button
                      onClick={() => navigate('/perdaperkada/LaporanSidangTipiring/')}
                      className='btn btn-outline btn-active-light-primary w-100'
                    >
                      Pelaksana Kegiatan
                    </button>
                  </div>
                  {/* end::Content */}

                  {/* begin::Content */}
                  <div data-kt-user-table-filter='form'>
                    <button
                      onClick={() => navigate('/perdaperkada/SidangTipiringPasal/')}
                      className='btn btn-outline btn-active-light-primary w-100'
                    >
                      Jenis Pasal
                    </button>
                  </div>
                  {/* end::Content */}
                </div>
              </div>
            </div>
            {/* END :: Button */}
          </div>
        </>
      ) : (
        <>
          <div className='row mt-10 mb-10 px-10'>
            <div className='col-md-6 col-lg-6 col-sm-12'>
              <div className='mb-10'>
                <div className='row'>
                  <div className='col-4 pt-2'>
                    <label className='form-label'>Tanggal Awal</label>
                  </div>
                  <div className='col-8'>
                    <input
                      type='date'
                      name='tanggal_kunjungan'
                      className='form-control'
                      value={tanggalAwal}
                      onChange={handleChangeInputTanggalAwal}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12'>
              <div className='mb-10'>
                <div className='row'>
                  <div className='col-4 pt-2'>
                    <label className='form-label align-middle'>
                      Tanggal Akhir
                    </label>
                  </div>
                  <div className='col-8'>
                    <input
                      name='tanggal_kunjungan'
                      type='date'
                      className='form-control'
                      value={tanggalAkhir}
                      onChange={handleChangeInputTanggalAkhir}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row g-8 mt-2'>
              <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                <Button
                  className='btn btn-light-primary me-2'
                  onClick={handleFilterTanggal}
                >
                  <KTSVG
                    path='/media/icons/duotune/general/gen021.svg'
                    className='svg-icon-2'
                  />
                  Cari
                </Button>
                <Button
                  className='btn btn-light-primary me-2'
                  onClick={handleFilterResetTanggal}
                >
                  <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                  Reset
                </Button>
              </div>
              <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                <button
                  type='button'
                  className='btn btn-light-primary me-2'
                  data-kt-menu-placement='bottom-end'
                  data-kt-menu-trigger='click'
                  onClick={() => unduhCSV(totalDetail)}
                >
                  <>
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr078.svg'
                      className='svg-icon-2'
                    />
                    Unduh CSV
                  </>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className='row'>
        <div className='col fs-4 mb-2 fw-semibold text-center'>
          LAPORAN PELAKSANAAN SIDANG TINDAK PIDANA RINGAN (TIPIRING) HASIL PENEGAKAN PERDA/PERKADA
        </div>
      </div>
      <div className='row'>
        <div className='col fs-4 mb-2 fw-semibold text-center'>
          PADA SATPOL PP......................................
        </div>
      </div>
      <div className='row'>
        <div className='col fs-4 mb-6 fw-semibold text-center'>
          PERIODE .................... s/d .......................
        </div>
      </div>
      <div className='card-body py-4'>
        {!detailView ? (
          <DtSidangTipiring
            aksi={viewDetail}
            kota={filteredData}
            totalKegiatan={totalKegiatan}
            setTotalKegiatan={setTotalKegiatan}
            progressComponent={<LoadingAnimation />}
            loading={loading}
            theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
            noDataComponent={
              <div className='alert alert-primary d-flex align-items-center p-5 mt-10 mb-10'>
                <div className='d-flex flex-column'>
                  <h5 className='mb-1 text-center'>Data tidak ditemukan..!</h5>
                </div>
              </div>
            }
          />
        ) : (
          <>
            <DtDetail
              data={totalDetail}
              progressComponent={<LoadingAnimation />}
              loading={loading}
              theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
              noDataComponent={
                <div className='alert alert-primary d-flex align-items-center p-5 mt-10 mb-10'>
                  <div className='d-flex flex-column'>
                    <h5 className='mb-1 text-center'>Data tidak ditemukan..!</h5>
                  </div>
                </div>
              }
            />
            <Button className='btn btn-secondary me-2' onClick={() => viewDetail('')}>
              <i className='fa-solid fa-arrow-left'></i>
              Kembali
            </Button>
          </>
        )}
      </div>
    </div>
  )
}