import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import DatePicker from 'react-multi-date-picker'
import AsyncSelect from 'react-select/async'
import {Link} from 'react-router-dom'
import {Formik, Field, Form, FormikValues} from 'formik'
import {
  DatePickerField,
  DatePickerFieldRange,
  SelectField,
  ToFieldStateBNV,
  ToFieldStateCE,
} from '../components/fields.formikcto'
import {
  changedValue,
  createSchemaFilterPelaporanKegiatan,
  initialState,
  PelaporanKegiatanState,
} from '../../../redux/slices/pelaporan-kegiatan.slice'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../redux/store'
import axios from 'axios'
import {DtAdmin, DtPimpinan, DtKabid} from '../datatable/data-table-laporan-pengawasan'
import {KTSVG} from '../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MASTERDATA_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL
export const PELAPORAN_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL
export const MASTER_URL = `${API_URL}/master`
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`

export const ListPengawasPage: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [totalRows, setTotalRows] = useState(0)
  const [qParamFind, setUriFind] = useState({strparam: ''})

  const [currentSchema, setCurrentSchema] = useState(createSchemaFilterPelaporanKegiatan[0])
  const [jenisreklameList, setJenisReklameList] = useState([])
  const [jeniskendaliList, setJenisKendaliList] = useState([])
  const [statusReklameList, setStatusReklameList] = useState([])
  const kotaList = useSelector((s: RootState) => s.pelaporanPengawasan.list_kota)
  const kecamatanList = useSelector((s: RootState) => s.pelaporanPengawasan.list_kecamatan)
  const kelurahanList = useSelector((s: RootState) => s.pelaporanPengawasan.list_kelurahan)

  const updateList = () => {
    axios.get(`${MASTERDATA_URL}/jenis-kendali/combobox?$orderby=nama`).then((res) => {
      const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
      // .filter((v: any) => !excludeJenisKendali.includes(v.label))
      setJenisKendaliList(data)
    })
    axios.get(`${MASTERDATA_URL}/jenis-reklame/combobox?$orderby=nama`).then((res) => {
      const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
      // .filter((v: any) => !excludeJenisKejadian.includes(v.label))
      setJenisReklameList(data)
    })
    axios.get(`${MASTERDATA_URL}/status-reklame/combobox?$orderby=nama`).then((res) => {
      const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
      // .filter((v: any) => !excludeJenisKejadian.includes(v.label))
      setStatusReklameList(data)
    })
  }

  useEffect(() => {
    handleHakAkses()
    handleWilayahBidang()
    updateList()
  }, [])

  const [tanggalAwal, setTanggalAwal] = useState({val: ''})
  const [tanggalAkhir, setTanggalAkhir] = useState({val: ''})

  const handleChangeInputTanggalAwal = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setTanggalAwal({val: event.target.value})
  }

  const handleChangeInputTanggalAkhir = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setTanggalAkhir({val: event.target.value})
  }

  function loadOptionsKota() {
    return []
  }
  const [hakAkses, setHakAkses] = useState([])

  const handleHakAkses = async () => {
    const response = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/hak-akses/find`)
    setHakAkses(response.data.data)
  }

  const [wilayahBidang, setWilayahBidang] = useState([])

  const handleWilayahBidang = async () => {
    const response = await axios.get(`${MASTER_URL}/bidang-wilayah/find`)
    setWilayahBidang(response.data.data)
  }

  const [period, setPeriod] = useState({start: Date.now() - 10, end: Date.now()})

  const filterPelaporanKegiatan = async (values: PelaporanKegiatanState, actions: FormikValues) => {
    const res = await axios.get(`${PELAPORAN_URL}/kegiatan-umum`)
    const data = res.data.data
    setCurrentSchema(data)
    console.log(res)
  }

  const [aksi, setAksi] = useState(0)
  const [hakAksesData, setHakAksesData] = useState<any>([])
  let value: any = localStorage.getItem('kt-auth-react-v')
  let authValue = JSON.parse(value)
  let idHakAkses = authValue.data.hak_akses
  console.log('id hak akses', idHakAkses)
  console.log('aksi', aksi)

  const findHakAksesData = async () => {
    const res = await axios.get(`${API_URL}/manajemen-pengguna/hak-akses/findone/${idHakAkses}`)
    // console.log(res.data.data)
    setHakAksesData(res.data.data)
  }

  useEffect(() => {
    findHakAksesData()
  }, [])
  useEffect(() => {
    if (hakAksesData?.nama_hak_akses?.toLowerCase().includes('admin')) {
      return setAksi(1)
    } else if (hakAksesData?.nama_hak_akses?.toLowerCase().includes('kepala satpol pp dki')) {
      return setAksi(2)
    } else if (hakAksesData?.nama_hak_akses?.toLowerCase().includes('kepala')) {
      return setAksi(0)
    } else {
      return setAksi(3)
    }
  }, [hakAksesData])

  const vKabid = () => {
    setAksi(0)
  }
  const vAdmin = () => {
    setAksi(1)
  }
  const vPimpinan = () => {
    setAksi(2)
  }

  async function dataPengawasReklame(page: number) {
    setLoading(true)
    axios
      .get(
        `${PELAPORAN_URL}/reklame/?%24filter=${qParamFind.strparam}&%24top=${perPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          pelaksana: d.created_by,
          waktu_pengawasan: d.waktu_pengawasan,
          kota: d.kota,
          status_reklame: d.status_reklame,
          pemilik_reklame: d.pemilik_reklame,
          alamat: d.alamat,
          tgl_pengecekan: d.tgl_pengecekan,
          lokasi_tiang: d.lokasi_tiang,
          share_location: d.share_location,
          ukuran: d.ukuran,
          konstruksi_reklame: d.konstruksi_reklame,
          konten_iklan: d.konten_iklan,
          longtitude: d.longtitude,
        }))
        setData(data)
        setTotalRows(res.data.total_items)
        setLoading(false)

        return [data, setData] as const
      })
  }
  useEffect(() => {
    dataPengawasReklame(0)
  }, [qParamFind, perPage])

  const handleFilter = async () => {
    let uriParam = ''
    if (tanggalAwal.val && tanggalAkhir.val) {
      uriParam += `tgl_pengecekan%20ge%20%27${tanggalAwal.val}%27%20and%20tgl_pengecekan%20le%20%27${tanggalAkhir.val}%27`
      // console.log('2 on')
    } else if (tanggalAwal.val !== '') {
      // console.log('start on')
      uriParam += `tgl_pengecekan%20eq%20%27${tanggalAwal.val}%27`
    } else if (tanggalAkhir.val !== '') {
      uriParam += `tgl_pengecekan%20eq%20%27${tanggalAkhir.val}%27`
    }
    // if (instansi.val !== '' && (tanggalAwal.val || tanggalAkhir.val)) {
    //   uriParam += `%20and%20asal_instansi%20eq%20%27${instansi.val}%27`
    //   // console.log('2 on')
    // } else if (instansi.val !== '') {
    //   uriParam += `asal_instansi%20eq%20%27${instansi.val}%27`
    // }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleFilterReset = () => {
    setTanggalAwal({val: ''})
    setTanggalAkhir({val: ''})
    // setInstansi({val: ''})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const handlePageChange = (page: number) => {
    dataPengawasReklame(page - 1)
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    axios
      .get(
        `${PELAPORAN_URL}/reklame/?%24filter=${qParamFind.strparam}&%24top=${newPerPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          no: d.id,
          pelaksana: d.created_by,
          waktu_pengawasan: d.waktu_pengawasan,
          kota: d.kota,
          status_reklame: d.status_reklame,
          pemilik_reklame: d.pemilik_reklame,
          alamat: d.alamat,
          tgl_pengecekan: d.tgl_pengecekan,
        }))
        setData(data)
        setPerPage(newPerPage)
        setLoading(false)
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
                Daftar Laporan Pengawasan Reklame
              </h1>
            </div>
          </div>
        </div>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            {aksi === 3 ? (
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
                        {/* <Button onClick={vKabid}>Kabid</Button>
                      <Button onClick={vAdmin}>Admin</Button>
                      <Button onClick={vPimpinan}>Pimpinan</Button> */}
                        {aksi === 0 ? (
                          <Formik
                            validationSchema={currentSchema}
                            initialValues={initialState}
                            onSubmit={filterPelaporanKegiatan}
                          >
                            <Form id='list_pelaporan_kegiatan_filter'>
                              <div className='row w-100 mt-10 mb-10'>
                                {/* <div className='col-md-6 col-lg-6 col-sm-12'>
                                <div className='mb-10'>
                                  <div className='row'>
                                    <div className='col-4 pt-2'>
                                      <label className='form-label align-middle'>
                                        Seksi/Kecamatan
                                      </label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='kecamatan_selection'
                                        target='kecamatan'
                                        className='form-control'
                                        component={SelectField}
                                        options={kecamatanList}
                                        onChange={(o: ChangeEvent<any>) => {
                                          dispatch(changedValue(ToFieldStateCE(o)))
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                                <div className='col-md-6 col-lg-6 col-sm-12'>
                                  <div className='mb-10'>
                                    <div className='row'>
                                      <div className='col-4 pt-2'>
                                        <label className='form-label align-middle'>
                                          Tanggal Awal
                                        </label>
                                      </div>
                                      <div className='col-8'>
                                        <input
                                          type='date'
                                          name='tgl_pengecekan'
                                          className='form-control'
                                          value={tanggalAwal.val}
                                          onChange={handleChangeInputTanggalAwal}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-10 col-lg-10 col-sm-24'>
                                  <div className='mb-10'>
                                    <div className='row'>
                                      <div className='col-2 pt-2'>
                                        <label className='form-label align-middle'>
                                          Tanggal Akhir
                                        </label>
                                      </div>
                                      <div className='col-4 mx-10'>
                                        <input
                                          name='tgl_pengecekan'
                                          type='date'
                                          className='form-control'
                                          value={tanggalAkhir.val}
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
                                      onClick={handleFilter}
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen021.svg'
                                        className='svg-icon-2'
                                      />
                                      Cari
                                    </Button>
                                    <Button
                                      className='btn btn-light-primary me-2'
                                      onClick={handleFilterReset}
                                    >
                                      <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                      Reset
                                    </Button>
                                  </div>
                                  <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                                    {/* begin::Filter Button */}
                                    <button
                                      type='button'
                                      className='btn btn-light-primary'
                                      data-kt-menu-trigger='click'
                                      data-kt-menu-placement='bottom-end'
                                    >
                                      {/* {btnLoadingUnduh ? (
                                    <>
                                      <span className='spinner-border spinner-border-md align-middle me-3'></span>{' '}
                                      Memproses Unduh...
                                    </>
                                  ) : ( */}
                                      <>
                                        <KTSVG
                                          path='/media/icons/duotune/arrows/arr078.svg'
                                          className='svg-icon-2'
                                        />
                                        Unduh
                                      </>
                                      {/* )} */}
                                    </button>
                                    {/* end::Filter Button */}
                                    {/* begin::SubMenu */}
                                    <div
                                      className='menu menu-sub menu-sub-dropdown w-100px w-md-150px'
                                      data-kt-menu='true'
                                    >
                                      {/* begin::Header */}
                                      <div className='px-7 py-5'>
                                        <div className='fs-5 text-dark fw-bolder'>
                                          Pilihan Unduh
                                        </div>
                                      </div>
                                      {/* end::Header */}

                                      {/* begin::Separator */}
                                      <div className='separator border-gray-200'></div>
                                      {/* end::Separator */}

                                      {/* begin::Content */}
                                      <div className='px-7 py-5' data-kt-user-table-filter='form'>
                                        <button
                                          //   onClick={handleUnduh}
                                          className='btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success w-100'
                                        >
                                          Excel
                                        </button>
                                      </div>
                                      {/* end::Content */}

                                      {/* begin::Content */}
                                      <div className='px-7 py-2' data-kt-user-table-filter='form'>
                                        <button className='btn btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger w-100'>
                                          PDF
                                        </button>
                                      </div>
                                      {/* end::Content */}
                                    </div>
                                    {/* end::SubMenu */}
                                  </div>
                                </div>
                              </div>
                            </Form>
                          </Formik>
                        ) : aksi === 1 ? (
                          <Formik
                            validationSchema={currentSchema}
                            initialValues={initialState}
                            onSubmit={filterPelaporanKegiatan}
                          >
                            <Form id='list_pelaporan_kegiatan_filter'>
                              <div className='row w-100 mt-10 mb-10'>
                                <div className='col-md-6 col-lg-6 col-sm-12'>
                                  <div className='mb-10'>
                                    <div className='row'>
                                      <div className='col-4 pt-2'>
                                        <label className='form-label align-middle'>
                                          Tanggal Awal
                                        </label>
                                      </div>
                                      <div className='col-8'>
                                        <input
                                          type='date'
                                          name='tgl_pengecekan'
                                          className='form-control'
                                          value={tanggalAwal.val}
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
                                          name='tgl_pengecekan'
                                          type='date'
                                          className='form-control'
                                          value={tanggalAkhir.val}
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
                                      onClick={handleFilter}
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen021.svg'
                                        className='svg-icon-2'
                                      />
                                      Cari
                                    </Button>
                                    <Button
                                      className='btn btn-light-primary me-2'
                                      onClick={handleFilterReset}
                                    >
                                      <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                      Reset
                                    </Button>
                                  </div>
                                  <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                                    {/* begin::Filter Button */}
                                    <Button
                                      onClick={() =>
                                        navigate('/pelaporan/tambah-laporan-pengawasan')
                                      }
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
                                    <button
                                      type='button'
                                      className='btn btn-light-primary'
                                      data-kt-menu-trigger='click'
                                      data-kt-menu-placement='bottom-end'
                                    >
                                      {/* {btnLoadingUnduh ? (
                                    <>
                                      <span className='spinner-border spinner-border-md align-middle me-3'></span>{' '}
                                      Memproses Unduh...
                                    </>
                                  ) : ( */}
                                      <>
                                        <KTSVG
                                          path='/media/icons/duotune/arrows/arr078.svg'
                                          className='svg-icon-2'
                                        />
                                        Unduh
                                      </>
                                      {/* )} */}
                                    </button>
                                    {/* end::Filter Button */}
                                    {/* begin::SubMenu */}
                                    <div
                                      className='menu menu-sub menu-sub-dropdown w-100px w-md-150px'
                                      data-kt-menu='true'
                                    >
                                      {/* begin::Header */}
                                      <div className='px-7 py-5'>
                                        <div className='fs-5 text-dark fw-bolder'>
                                          Pilihan Unduh
                                        </div>
                                      </div>
                                      {/* end::Header */}

                                      {/* begin::Separator */}
                                      <div className='separator border-gray-200'></div>
                                      {/* end::Separator */}

                                      {/* begin::Content */}
                                      <div className='px-7 py-5' data-kt-user-table-filter='form'>
                                        <button
                                          //   onClick={handleUnduh}
                                          className='btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success w-100'
                                        >
                                          Excel
                                        </button>
                                      </div>
                                      {/* end::Content */}

                                      {/* begin::Content */}
                                      <div className='px-7 py-2' data-kt-user-table-filter='form'>
                                        <button className='btn btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger w-100'>
                                          PDF
                                        </button>
                                      </div>
                                      {/* end::Content */}
                                    </div>
                                    {/* end::SubMenu */}
                                  </div>
                                </div>
                              </div>
                            </Form>
                          </Formik>
                        ) : (
                          // Pimpinan
                          <Formik
                            validationSchema={currentSchema}
                            initialValues={initialState}
                            onSubmit={filterPelaporanKegiatan}
                          >
                            <Form id='list_pelaporan_kegiatan_filter'>
                              <div className='row w-100 mt-10 mb-10'>
                                <div className='col-md-6 col-lg-6 col-sm-12'>
                                  <div className='mb-10'>
                                    <div className='row'>
                                      <div className='col-4 pt-2'>
                                        <label className='form-label align-middle'>
                                          Pelaksana Kegiatan
                                        </label>
                                      </div>
                                      <div className='col-8'>
                                        <Field
                                          name='kelurahan_selection'
                                          target='kelurahan'
                                          className='form-control'
                                          component={SelectField}
                                          // options={kelurahanList}
                                          onChange={(o: ChangeEvent<any>) => {
                                            console.log(o)
                                            dispatch(changedValue(ToFieldStateCE(o)))
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-6 col-lg-6 col-sm-12'>
                                  <div className='mb-10'>
                                    <div className='row'>
                                      <div className='col-4 pt-2'>
                                        <label className='form-label align-middle'>Tanggal</label>
                                      </div>
                                      <div className='col-8'>
                                        <input
                                          type='date'
                                          name='tgl_pengecekan'
                                          className='form-control'
                                          value={tanggalAwal.val}
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
                                        <label className='form-label align-middle'>Kota</label>
                                      </div>
                                      <div className='col-8'>
                                        <Field
                                          name='kota_selection'
                                          target='kota'
                                          className='form-control'
                                          component={SelectField}
                                          options={kotaList}
                                          onChange={(o: ChangeEvent<any>) => {
                                            dispatch(changedValue(ToFieldStateCE(o)))
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-6 col-lg-6 col-sm-12'>
                                  <div className='mb-10'>
                                    <div className='row'>
                                      <div className='col-4 pt-2'>
                                        <label className='form-label align-middle'>Kecamatan</label>
                                      </div>
                                      <div className='col-8'>
                                        <Field
                                          name='kecamatan_selection'
                                          target='kecamatan'
                                          className='form-control'
                                          component={SelectField}
                                          options={kecamatanList}
                                          onChange={(o: ChangeEvent<any>) => {
                                            dispatch(changedValue(ToFieldStateCE(o)))
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-6 col-lg-6 col-sm-12'>
                                  <div className='mb-10'>
                                    <div className='row'>
                                      <div className='col-4 pt-2'>
                                        <label className='form-label align-middle'>Kelurahan</label>
                                      </div>
                                      <div className='col-8'>
                                        <Field
                                          name='kelurahan_selection'
                                          target='kelurahan'
                                          className='form-control'
                                          component={SelectField}
                                          options={kelurahanList}
                                          onChange={(o: ChangeEvent<any>) => {
                                            console.log(o)
                                            dispatch(changedValue(ToFieldStateCE(o)))
                                          }}
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
                                          Kawasan Kendali
                                        </label>
                                      </div>
                                      <div className='col-8'>
                                        <Field
                                          name='kawasan_kendali_selection'
                                          target='kawasan_kendali'
                                          className='form-control'
                                          component={SelectField}
                                          options={jeniskendaliList}
                                          onChange={(o: ChangeEvent<any>) => {
                                            console.log(o)
                                            dispatch(changedValue(ToFieldStateCE(o)))
                                          }}
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
                                          Jenis Reklame
                                        </label>
                                      </div>
                                      <div className='col-8'>
                                        <Field
                                          name='jenis_reklame_selection'
                                          target='jenis_reklame'
                                          className='form-control'
                                          component={SelectField}
                                          options={jenisreklameList}
                                          onChange={(o: ChangeEvent<any>) => {
                                            console.log(o)
                                            dispatch(changedValue(ToFieldStateCE(o)))
                                          }}
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
                                          Status Reklame
                                        </label>
                                      </div>
                                      <div className='col-8'>
                                        <Field
                                          name='status_reklame_selection'
                                          target='status_reklame'
                                          className='form-control'
                                          component={SelectField}
                                          options={statusReklameList}
                                          onChange={(o: ChangeEvent<any>) => {
                                            console.log(o)
                                            dispatch(changedValue(ToFieldStateCE(o)))
                                          }}
                                        />
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
                                    <Button
                                      className='btn btn-light-primary me-2'
                                      onClick={handleFilterReset}
                                    >
                                      <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                      Reset
                                    </Button>
                                  </div>
                                  <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                                    {/* begin::Filter Button */}
                                    <button
                                      type='button'
                                      className='btn btn-light-primary'
                                      data-kt-menu-trigger='click'
                                      data-kt-menu-placement='bottom-end'
                                    >
                                      {/* {btnLoadingUnduh ? (
                                    <>
                                      <span className='spinner-border spinner-border-md align-middle me-3'></span>{' '}
                                      Memproses Unduh...
                                    </>
                                  ) : ( */}
                                      <>
                                        <KTSVG
                                          path='/media/icons/duotune/arrows/arr078.svg'
                                          className='svg-icon-2'
                                        />
                                        Unduh
                                      </>
                                      {/* )} */}
                                    </button>
                                    {/* end::Filter Button */}
                                    {/* begin::SubMenu */}
                                    <div
                                      className='menu menu-sub menu-sub-dropdown w-100px w-md-150px'
                                      data-kt-menu='true'
                                    >
                                      {/* begin::Header */}
                                      <div className='px-7 py-5'>
                                        <div className='fs-5 text-dark fw-bolder'>
                                          Pilihan Unduh
                                        </div>
                                      </div>
                                      {/* end::Header */}

                                      {/* begin::Separator */}
                                      <div className='separator border-gray-200'></div>
                                      {/* end::Separator */}

                                      {/* begin::Content */}
                                      <div className='px-7 py-5' data-kt-user-table-filter='form'>
                                        <button
                                          //   onClick={handleUnduh}
                                          className='btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success w-100'
                                        >
                                          Excel
                                        </button>
                                      </div>
                                      {/* end::Content */}

                                      {/* begin::Content */}
                                      <div className='px-7 py-2' data-kt-user-table-filter='form'>
                                        <button className='btn btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger w-100'>
                                          PDF
                                        </button>
                                      </div>
                                      {/* end::Content */}
                                    </div>
                                    {/* end::SubMenu */}
                                  </div>
                                </div>
                              </div>
                            </Form>
                          </Formik>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* DATA TABLE */}
                <div className='card-body py-4'>
                  {aksi === 0 ? (
                    <DtKabid
                      data={data}
                      totalRows={totalRows}
                      handlePerRowsChange={handlePerRowsChange}
                      handlePageChange={handlePageChange}
                      loading={loading}
                      hakAkses={hakAkses}
                      wilayahBidang={wilayahBidang}
                    />
                  ) : aksi === 1 ? (
                    <DtAdmin
                      data={data}
                      totalRows={totalRows}
                      handlePerRowsChange={handlePerRowsChange}
                      handlePageChange={handlePageChange}
                      loading={loading}
                      hakAkses={hakAkses}
                      wilayahBidang={wilayahBidang}
                    />
                  ) : (
                    <>
                      <div className='row'>
                        <div className='col fs-4 mb-2 fw-semibold text-center'>
                          LAPORAN HASIL KEGIATAN
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
                      <DtPimpinan
                        data={data}
                        totalRows={totalRows}
                        handlePerRowsChange={handlePerRowsChange}
                        handlePageChange={handlePageChange}
                        loading={loading}
                        hakAkses={hakAkses}
                      />
                      <div className='row mt-10'>
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
                {/* <div className='card-body py-4'> */}
                {/* <div className='row'>
                  <div className='col fs-4 mb-2 fw-semibold text-center'>
                    LAPORAN HASIL KEGIATAN
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
                </div> */}
                {/* <DtAdmin /> */}
                {/* </div> */}
                {/* <div className='row'>
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
              </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
