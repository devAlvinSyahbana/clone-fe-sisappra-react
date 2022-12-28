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
import {DtAdmin, DtPimpinan} from '../datatable/data-table-laporan-tamu-daerah'
import {KTSVG} from '../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export const ListTamuDaerahPage: FC = () => {
  const navigate = useNavigate()
  const [tanggalAwal, setTanggalAwal] = useState({val: ''})
  const [tanggalAkhir, setTanggalAkhir] = useState({val: ''})
  const [instansi, setInstansi] = useState()
  const tanggal = [
    {
      tanggalAwal: tanggalAwal.val,
      tanggalAkhir: tanggalAkhir.val,
    },
  ]

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

  const handlefilter = () => {
    // tanggalAwal
  }
  // useEffect(() => {
  //   updateJenisKegiatanList()
  // }, [])

  const [aksi, setAksi] = useState(1)
  const vAdmin = () => {
    setAksi(1)
  }
  const vPimpinan = () => {
    setAksi(2)
  }

  // console.log(tanggalAwal.val)

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
                      <Button onClick={vAdmin}>Admin</Button>
                      <Button onClick={vPimpinan}>Pimpinan</Button>
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
                                  {tanggalAwal.val}
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
                                  {tanggalAkhir.val}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className='row g-8 mt-2'>
                            <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                              <Button className='btn btn-light-primary me-2' onClick={handlefilter}>
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
                                    onKeyUp={(o: ChangeEvent<any>) => {
                                      setInstansi(o.target.value)
                                    }}
                                  />
                                  {instansi}
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
                                    onChange={(o: any) => {
                                      setTanggalAwal(o.target.value)
                                    }}
                                  />
                                  {tanggalAwal.val}
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
                                    onChange={(o: any) => {
                                      setTanggalAkhir(o.target.value)
                                    }}
                                  />
                                  {tanggalAkhir.val}
                                </div>
                              </div>
                            </div>
                          </div>

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
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {aksi === 1 ? (
                <div className='card-body py-4'>
                  <DtAdmin filterData={tanggal} />
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
                        {tanggalAkhir.val !== undefined ? tanggalAkhir.val : '....................'}
                      </div>
                    </div>
                    <DtPimpinan />
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
          </div>
        </div>
      </div>
    </div>
  )
}
