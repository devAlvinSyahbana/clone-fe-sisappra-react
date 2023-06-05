import axios from 'axios'
import { unparse } from 'papaparse'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useState, useEffect } from 'react'
import { ThemeModeComponent } from '../../../../_metronic/assets/ts/layout'
import { DtSidangTipiringPerda, DtDetail } from './datatables/data-table-laporan-sidang-tipiring'
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
  jenis_perda_perkada: string
  jumlah_penertiban: number
  jumlah_pelanggar: number
  jumlah_pelanggar_tidak_hadir: number
  verstek: number
  denda: number
}

export function SidangTipiringPasal() {
  const navigate = useNavigate()
  const { mode } = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)

  const [detailView, setDV] = useState(false)

  const [totalKegiatan, setTotalKegiatan] = useState([])
  const [totalDetail, setTotalDetail] = useState([])

  const [tanggalAwal, setTanggalAwal] = useState({ val: '' })
  const [tanggalAkhir, setTanggalAkhir] = useState({ val: '' })

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

  const dataTipiring = (page: number) => {
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
          denda_pengadilan: d.tindak_lanjut__denda__pengadilan,
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
    dataTipiring(0)
  }, [qParamFind, perPage])

  const [perdaPerkada, setPerdaPerkada] = useState([])
  const [qParamFindPerdaPerkada, setUriFindPerdaPerkada] = useState({ strParamPerdaPerkada: '' })

  const dataPerdaPerkada = async (page: number) => {
    const response = await axios.get(
      `${MASTERDATA_URL}/jenis-perda-perkada${qParamFindPerdaPerkada.strParamPerdaPerkada}?%24top=200&%24select=id%2C%20judul%2C%20pasal%2C%20jenis_penertiban%2C%20jenis_pelanggaran`
    )
    const filter = await axios.get(
      `${MASTERDATA_URL}/map-master-perda/jenis-kegiatan?%24filter=jenis_kegiatan_id%20eq%20%2711%27&%24select=id%2C%20perda_id%2C%20jenis_kegiatan_id`
    )

    let filteredArr = response.data.data.filter((obj1: any) =>
      filter.data.data.some((obj2: any) => obj2.perda_id === obj1.id)
    )
    console.log('filter', filteredArr)
    const data = filteredArr.map((d: any) => ({
      pasal: d.pasal,
      id: d.id,
      no: d.id,
      penertiban: d.jenis_penertiban,
      pelanggaran: d.jenis_pelanggaran,
      perda: d.judul,
    }))
    await Array.from(data).forEach((item: any, index: any) => {
      item.serial = index + 1
    })
    setPerdaPerkada(data)

    return [perdaPerkada, setPerdaPerkada] as const
  }

  useEffect(() => {
    dataPerdaPerkada(0)
  }, [])

  const [filterData, setFilterData] = useState('')
  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterData(e.target.value)
  }

  const filteredData = perdaPerkada.filter((item: any) => {
    return item.pasal.toLowerCase().includes(filterData.toLowerCase())
  })

  const handleFilterReset = () => {
    setFilterData('')
  }

  const viewDetail = (row: string) => {
    setDV(!detailView)

    if (row) {
      const filterDetail = totalKegiatan.filter((item: any) => item.tindak_lanjut__administrasi__jenis_pasal_id === row)

      Array.from(filterDetail).forEach((item: any, index: any) => {
        item.serial = index + 1
      })
      setTotalDetail(filterDetail)
    }
  }

  const handlePageChange = (page: number) => {
    dataTipiring(page - 1)
  }

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
              <h3>Jenis Pasal</h3>
            </label>
            <div className='col-xxl-10 col-lg-10 col-md-8 col-sm-6'>
              <input
                id='search'
                type='text'
                className='form-control form-control form-control-solid'
                placeholder='Masukkan Jenis Pasal'
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
                      onClick={() => navigate('/perdaperkada/SidangTipiringPasal/')}
                      className='btn btn-outline btn-active-light-primary w-100'
                    >
                      Jenis Pasal
                    </button>
                  </div>
                  {/* end::Content */}

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
                      value={tanggalAwal.val}
                      onChange={handleChangeInputTanggalAwal}
                      placeholder={'Pilih Tanggal'}
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
                      value={tanggalAkhir.val}
                      onChange={handleChangeInputTanggalAkhir}
                      placeholder={'Pilih Tanggal'}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row g-8 mt-2'>
              <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                <Button
                  className='btn btn-light-primary me-2'
                >
                  <KTSVG
                    path='/media/icons/duotune/general/gen021.svg'
                    className='svg-icon-2'
                  />
                  Cari
                </Button>
                <Button
                  className='btn btn-light-primary me-2'
                >
                  <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                  Reset
                </Button>
              </div>
              <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                {/* begin::Filter Button */}
                {/* <button
                                          type='button'
                                          className='btn btn-light-primary'
                                          data-kt-menu-trigger='click'
                                          data-kt-menu-placement='bottom-end'
                                        > */}
                {/* {btnLoadingUnduh ? (
                                    <>
                                      <span className='spinner-border spinner-border-md align-middle me-3'></span>{' '}
                                      Memproses Unduh...
                                    </>
                                  ) : ( */}
                {/* <>
                                            <KTSVG
                                              path='/media/icons/duotune/arrows/arr078.svg'
                                              className='svg-icon-2'
                                            />
                                            Unduh
                                          </> */}
                {/* )} */}
                {/* </button> */}
                {/* end::Filter Button */}
                {/* begin::SubMenu */}
                {/* <div
                                          className='menu menu-sub menu-sub-dropdown w-100px w-md-150px'
                                          data-kt-menu='true'
                                        > */}
                {/* begin::Header */}
                {/* <div className='px-7 py-5'>
                                            <div className='fs-5 text-dark fw-bolder'>
                                              Pilihan Unduh
                                            </div>
                                          </div> */}
                {/* end::Header */}

                {/* begin::Separator */}
                {/* <div className='separator border-gray-200'></div> */}
                {/* end::Separator */}

                {/* begin::Content */}
                {/* <div
                                            className='px-7 py-5'
                                            data-kt-user-table-filter='form'
                                          >
                                            <button
                                              //   onClick={handleUnduh}
                                              className='btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success w-100'
                                            >
                                              Excel
                                            </button>
                                          </div> */}
                {/* end::Content */}

                {/* begin::Content */}
                {/* <div
                                            className='px-7 py-2'
                                            data-kt-user-table-filter='form'
                                          >
                                            <button className='btn btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger w-100'>
                                              PDF
                                            </button>
                                          </div> */}
                {/* end::Content */}
                {/* </div> */}
                {/* end::SubMenu */}
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
          <DtSidangTipiringPerda
            aksi={viewDetail}
            perdaPerkada={filteredData}
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
