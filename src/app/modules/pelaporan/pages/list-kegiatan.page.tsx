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
import DtKabid, {DtAdmin, DtPimpinan} from '../datatable/data-table-laporan-kegiatan'
import {KTSVG} from '../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MASTER_URL = `${API_URL}/master`

export const ListKegiatanPage: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentSchema, setCurrentSchema] = useState(createSchemaFilterPelaporanKegiatan[0])
  const [jenisKegiatanList, setJenisKegiatanList] = useState([])
  const [jenisKegiatan, setJenisKegiatan] = useState([])

  const updateJenisKegiatanList = () => {
    axios.get(`http://localhost:3001/jenis-kegiatan/combobox?$orderby=nama`).then((res) => {
      const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
      // .filter((v: any) => !excludeJenisKegiatan.includes(v.label))
      setJenisKegiatanList(data)
    })
  }

  useEffect(() => {
    updateJenisKegiatanList()
    // updateJenisUsahaList()
    // updateJenisPenindakanList()
  }, [])

  function loadOptionsKota() {
    return []
  }

  const [period, setPeriod] = useState({start: Date.now() - 10, end: Date.now()})

  const filterPelaporanKegiatan = async (values: PelaporanKegiatanState, actions: FormikValues) => {
    const res = await axios.get(`http://localhost:3002/kegiatan-umum`)
    const data = res.data.data
    // .filter((v: any) => !excludeJenisKegiatan.includes(v.label))
    setCurrentSchema(data)
    console.log(res)
  }

  const [aksi, setAksi] = useState(0)
  const vKabid = () => {
    setAksi(0)
  }
  const vAdmin = () => {
    setAksi(1)
  }
  const vPimpinan = () => {
    setAksi(2)
  }

  const [inputValKota, setDataKota] = useState([])
  const [inputValKec, setDataKec] = useState([])
  const [inputValKel, setDataKel] = useState([])
  const [inputValJpen, setDataJpen] = useState([])
  const [inputValJper, setDataJper] = useState([])

  const filterList = async () => {
    const responseKota = await axios.get(`${MASTER_URL}/kota/find`)
    const responseKecamatan = await axios.get(`${MASTER_URL}/kecamatan/find`)
    const responseKelurahan = await axios.get(`${MASTER_URL}/kelurahan/find`)
    const responseJPen = await axios.get(`${MASTER_URL}/jenis-penertiban/find`)
    const responseJPer = await axios.get(`${MASTER_URL}/jenis-perda-perkada/find`)
    const dataKota = responseKota.data.data.map((d: any) => ({
      label: d.kota,
      value: String(d.kode_kota),
    }))
    const dataKec = responseKecamatan.data.data.map((d: any) => ({
      label: d.kecamatan,
      value: String(d.kode_kecamatan),
    }))
    const dataKel = responseKelurahan.data.data.map((d: any) => ({
      label: d.kelurahan,
      value: String(d.kode_kelurahan),
    }))
    const dataJPen = responseJPen.data.data.map((d: any) => ({
      label: d.jenis_penertiban,
      value: String(d.kode),
    }))
    const dataJPer = responseJPer.data.data.map((d: any) => ({
      label: d.judul,
      value: String(d.id),
    }))
    // const json = await response.data.data
    // return json.map((i: any) => ({label: i.kecamatan, value: i.id}))
    setDataKota(dataKota)
    setDataKec(dataKec)
    setDataKel(dataKel)
    setDataJpen(dataJPen)
    setDataJper(dataJPer)
    // console.log(data)
  }

  useEffect(() => {
    filterList()
    // updateJenisUsahaList()
    // updateJenisPenindakanList()
  }, [])

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
                Daftar Laporan Kegiatan
              </h1>
            </div>
          </div>
        </div>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
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
                      <Button onClick={vKabid}>Kabid</Button>
                      <Button onClick={vAdmin}>Admin</Button>
                      <Button onClick={vPimpinan}>Pimpinan</Button>
                      {aksi === 0 ? (
                        <Formik
                          validationSchema={currentSchema}
                          initialValues={initialState}
                          onSubmit={filterPelaporanKegiatan}
                        >
                          <Form id='list_pelaporan_kegiatan_filter'>
                            <div className='row w-100 mt-10 mb-10'>
                              {/* START :: Filter Form */}
                              <div className='col-md-6 col-lg-6 col-sm-12'>
                                <div className='mb-10'>
                                  <div className='row'>
                                    <div className='col-4 pt-2'>
                                      <label className='form-label'>Seksi/Kecamatan</label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='filter_jenis_kegiatan_id_selection'
                                        target='filter_jenis_kegiatan_id'
                                        className='form-control'
                                        component={SelectField}
                                        options={inputValKec}
                                        onChange={(o: ChangeEvent<any>) => {
                                          // dispatch(changedValue(ToFieldStateCE(o)))
                                          // updateJenisPasalList()
                                          // updateJenisPenyelesaianList()
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
                                        Jenis Kegiatan
                                      </label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='filter_jenis_kegiatan_id_selection'
                                        target='filter_jenis_kegiatan_id'
                                        className='form-control'
                                        component={SelectField}
                                        options={jenisKegiatanList}
                                        onChange={(o: ChangeEvent<any>) => {
                                          // dispatch(changedValue(ToFieldStateCE(o)))
                                          // updateJenisPasalList()
                                          // updateJenisPenyelesaianList()
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-10 col-lg-10 col-sm-24'>
                                <div className='mb-10'>
                                  <div className='row'>
                                    <div className='col-2 pt-2'>
                                      <label className='form-label align-middle'>Tanggal</label>
                                    </div>
                                    <div className='col-4 mx-10'>
                                      <Field
                                        name='kegiatan__tanggal'
                                        component={DatePickerFieldRange}
                                        onChange={(o: any) => {
                                          dispatch(changedValue(ToFieldStateCE(o)))
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* END :: Filter Form */}

                              {/* BUTTON */}
                              <div className='row g-8 mt-2'>
                                <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                                  <Button className='btn btn-light-primary me-2'>
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
                                    <button className='btn btn-light-primary'>
                                      <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                      Reset
                                    </button>
                                  </Link>
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
                                      <div className='fs-5 text-dark fw-bolder'>Pilihan Unduh</div>
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
                              {/* END :: Button */}
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
                            {/* <Button onClick={vKabid}>Kepala Bidang</Button>
                          <Button onClick={vAdmin}>Admin</Button>
                          <Button onClick={vPimpinan}>Pimpinan</Button> */}
                            <div className='row w-100 mt-10 mb-10'>
                              {/* START :: Filter Form */}
                              <div className='col-md-6 col-lg-6 col-sm-12'>
                                <div className='mb-10'>
                                  <div className='row'>
                                    <div className='col-4 pt-2'>
                                      <label className='form-label'>Pelaksana Kegiatan</label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='filter_jenis_kegiatan_id_selection'
                                        target='filter_jenis_kegiatan_id'
                                        className='form-control'
                                        component={SelectField}
                                        options={jenisKegiatanList}
                                        onChange={setJenisKegiatan}
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
                                        Jenis Kegiatan
                                      </label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='filter_jenis_kegiatan_id_selection'
                                        target='filter_jenis_kegiatan_id'
                                        className='form-control'
                                        component={SelectField}
                                        options={jenisKegiatanList}
                                        onChange={(o: ChangeEvent<any>) => {
                                          dispatch(changedValue(ToFieldStateCE(o)))
                                          // updateJenisPasalList()
                                          // updateJenisPenyelesaianList()
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-10 col-lg-10 col-sm-24'>
                                <div className='mb-10'>
                                  <div className='row'>
                                    <div className='col-2 pt-2'>
                                      <label className='form-label align-middle'>Tanggal</label>
                                    </div>
                                    <div className='col-4 mx-10'>
                                      <Field
                                        name='kegiatan__tanggal'
                                        component={DatePickerFieldRange}
                                        onChange={(o: any) => {
                                          dispatch(changedValue(ToFieldStateCE(o)))
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* END :: Filter Form */}

                              {/* BUTTON */}
                              <div className='row g-8 mt-2'>
                                <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                                  <Button className='btn btn-light-primary me-2'>
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
                                    <button className='btn btn-light-primary'>
                                      <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                      Reset
                                    </button>
                                  </Link>
                                </div>
                                <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
                                  {/* begin::Filter Button */}
                                  <Button
                                    onClick={() => navigate('/pelaporan/TambahLaporanKegiatan')}
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
                                      <div className='fs-5 text-dark fw-bolder'>Pilihan Unduh</div>
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
                              {/* END :: Button */}
                            </div>
                          </Form>
                        </Formik>
                      ) : (
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
                                      <label className='form-label'>Pelaksana Kegiatan</label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='kecamatan'
                                        target='kecamatan'
                                        className='form-control'
                                        component={SelectField}
                                        options={jenisKegiatanList}
                                        onChange={(o: ChangeEvent<any>) => {
                                          // dispatch(changedValue(ToFieldStateCE(o)))
                                          // updateJenisPasalList()
                                          // updateJenisPenyelesaianList()
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
                                      <label className='form-label'>Tanggal</label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='kegiatan__tanggal'
                                        component={DatePickerField}
                                        onChange={(o: any) => {
                                          dispatch(changedValue(ToFieldStateCE(o)))
                                        }}
                                        placeholder='Masukkan Tanggal'
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-6 col-lg-6 col-sm-12'>
                                <div className='mb-10'>
                                  <div className='row'>
                                    <div className='col-4 pt-2'>
                                      <label className='form-label'>Kota</label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='kecamatan'
                                        target='kecamatan'
                                        className='form-control'
                                        component={SelectField}
                                        options={inputValKota}
                                        onChange={(o: ChangeEvent<any>) => {
                                          // dispatch(changedValue(ToFieldStateCE(o)))
                                          // updateJenisPasalList()
                                          // updateJenisPenyelesaianList()
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
                                      <label className='form-label'>Kecamatan</label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='filter_jenis_kegiatan_id_selection'
                                        target='filter_jenis_kegiatan_id'
                                        className='form-control'
                                        component={SelectField}
                                        options={inputValKec}
                                        onChange={(o: ChangeEvent<any>) => {
                                          // dispatch(changedValue(ToFieldStateCE(o)))
                                          // updateJenisPasalList()
                                          // updateJenisPenyelesaianList()
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
                                      <label className='form-label'>Kelurahan</label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='kecamatan'
                                        target='kecamatan'
                                        className='form-control'
                                        component={SelectField}
                                        options={inputValKel}
                                        onChange={(o: ChangeEvent<any>) => {
                                          // dispatch(changedValue(ToFieldStateCE(o)))
                                          // updateJenisPasalList()
                                          // updateJenisPenyelesaianList()
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
                                      <label className='form-label'>Jenis Kegiatan</label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='filter_jenis_kegiatan_id_selection'
                                        target='filter_jenis_kegiatan_id'
                                        className='form-control'
                                        component={SelectField}
                                        options={jenisKegiatanList}
                                        onChange={(o: ChangeEvent<any>) => {
                                          // dispatch(changedValue(ToFieldStateCE(o)))
                                          // updateJenisPasalList()
                                          // updateJenisPenyelesaianList()
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
                                      <label className='form-label'>Jenis Penertiban</label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='kecamatan'
                                        target='kecamatan'
                                        className='form-control'
                                        component={SelectField}
                                        options={inputValJpen}
                                        onChange={(o: ChangeEvent<any>) => {
                                          // dispatch(changedValue(ToFieldStateCE(o)))
                                          // updateJenisPasalList()
                                          // updateJenisPenyelesaianList()
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
                                      <label className='form-label'>Jenis Perda</label>
                                    </div>
                                    <div className='col-8'>
                                      <Field
                                        name='filter_jenis_kegiatan_id_selection'
                                        target='filter_jenis_kegiatan_id'
                                        className='form-control'
                                        component={SelectField}
                                        options={inputValJper}
                                        onChange={(o: ChangeEvent<any>) => {
                                          // dispatch(changedValue(ToFieldStateCE(o)))
                                          // updateJenisPasalList()
                                          // updateJenisPenyelesaianList()
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Search */}
                              <div className='row g-8 mt-2'>
                                <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                                  <Link
                                    to='#'
                                    // onClick={handleFilter}
                                  >
                                    <button className='btn btn-light-primary me-2'>
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen021.svg'
                                        className='svg-icon-2'
                                      />
                                      Cari
                                    </button>
                                  </Link>
                                  <Link
                                    to='#'
                                    // onClick={handleFilterReset}
                                  >
                                    <button className='btn btn-light-primary'>
                                      <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                      Reset
                                    </button>
                                  </Link>
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
                                      <div className='fs-5 text-dark fw-bolder'>Pilihan Unduh</div>
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
              <div className='card-body py-4'>
                {aksi === 0 ? (
                  <DtKabid />
                ) : aksi === 1 ? (
                  <DtAdmin />
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
                    <DtPimpinan />

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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
