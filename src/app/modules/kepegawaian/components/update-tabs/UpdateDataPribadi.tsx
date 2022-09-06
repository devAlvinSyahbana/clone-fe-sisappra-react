import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
// import { Dropdown1 } from '../../../../../_metronic/partials'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'


export function UpdateDataPribadi() {
  const location = useLocation()

  const jenisKelamin = [
    { value: 'LAKI-LAKI', label: 'LAKI-LAKI' },
    { value: 'PEREMPUAN', label: 'PEREMPUAN' }
  ]

  const statusPerkawinan = [
    { value: 'KAWIN', label: 'KAWIN' },
    { value: 'BELUM KAWIN', label: 'BELUM KAWIN' }
  ]

  const agama = [
    { value: 'Islam', label: 'Islam' },
    { value: 'Katolik', label: 'Katolik' },
    { value: 'Kristen Protestan', label: 'Kristen Protestan' }
  ]

  const provinsi = [
    { value: 'DKI JAKARTA', label: 'DKI JAKARTA' },
    { value: 'JAWA BARAT', label: 'JAWA BARAT' },
    { value: 'JAWA TIMUR', label: 'JAWA TIMUR' }
  ]

  const kabKota = [
    { value: 'KOTA JAKARTA UTARA', label: 'KOTA JAKARTA UTARA' },
    { value: 'KELAPA GADING BARAT', label: 'KELAPA GADING BARAT' },
    { value: 'KELAPA GADING TIMUR', label: 'KELAPA GADING TIMUR' },
    { value: 'PEGANGSAAN DUA', label: 'PEGANGSAAN DUA' }
  ]

  const kecamatan = [
    { value: 'TANJUNG PRIOK', label: 'TANJUNG PRIOK' },
    { value: 'KELAPA GADING BARAT', label: 'KELAPA GADING BARAT' },
    { value: 'KELAPA GADING TIMUR', label: 'KELAPA GADING TIMUR' },
    { value: 'PEGANGSAAN DUA', label: 'PEGANGSAAN DUA' }
  ]

  const kelurahan = [
    { value: 'PAPANGO', label: 'PAPANGO' },
    { value: 'KELAPA GADING BARAT', label: 'KELAPA GADING BARAT' },
    { value: 'KELAPA GADING TIMUR', label: 'KELAPA GADING TIMUR' },
    { value: 'PEGANGSAAN DUA', label: 'PEGANGSAAN DUA' }
  ]

  return (
    <div>
      {/* begin::Body */}
      <div className='card mb-5 mb-xl-10'>
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='Metornic' />
                  <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                </div>
                <div className="form-group mt-5">
                  <div className='form-text'>
                  Tipe file yang dibolehkan: png, jpg, jpeg.
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="ini-input"
                  />
                  <label htmlFor="ini-input">
                    <button className="btn btn-sm btn-primary mt-2" data-kt-image-input-action="change"
                      data-bs-toggle="tooltip">Upload</button>
                  </label>
                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                      <a href="/#" className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                        Agus Aprianto
                      </a>
                    </div>

                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      <a
                        href="/#"
                        className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                      >
                        <KTSVG
                          path='/media/icons/duotune/communication/com006.svg'
                          className='svg-icon-4 me-1'
                        />
                        PNS
                      </a>
                      <a
                        href="/#"
                        className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                      >
                        <i className="fas fa-phone"></i
                        >&nbsp;&nbsp;082929929292
                      </a>
                      <a
                        href="/#"
                        className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                      >
                        <KTSVG
                          path='/media/icons/duotune/communication/com011.svg'
                          className='svg-icon-4 me-1'
                        />
                        agux.aprianto@satpol.dki.com
                      </a>
                      <a
                        href="/#"
                        className="d-flex align-items-center text-gray-400 text-hover-primary me-5 ms-5 mb-2"
                      >
                        <i className="fa-solid fa-address-card me-1"></i
                        >PENGELOLA PENGENDALIAN DAN
                        OPERASIONAL
                      </a>
                    </div>
                  </div>

                  {/* <div className='d-flex my-4'>
                <a href="/#" className='btn btn-sm btn-light me-2' id='kt_user_follow_button'>
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr012.svg'
                    className='svg-icon-3 d-none'
                  />

                  <span className='indicator-label'>Follow</span>
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                </a>
                <a
                  href="/#"
                  className='btn btn-sm btn-primary me-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_offer_a_deal'
                >
                  Hire Me
                </a>
                <div className='me-0'>
                  <button
                    className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='top-end'
                  >
                    <i className='bi bi-three-dots fs-3'></i>
                  </button>
                  <Dropdown1 />
                </div>
              </div> */}
                </div>

                <div className='d-flex flex-wrap flex-stack'>
                  <div className='d-flex flex-column flex-grow-1 pe-8'>
                    <div className='d-flex flex-wrap'>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>1</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>Jumlah Anggota Keluarga</div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>S1</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>Pendidikan Tertinggi</div>
                      </div>

                      {/* <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-3 svg-icon-success me-2'
                      />
                      <div className='fs-2 fw-bolder'>60%</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Success Rate</div>
                  </div> */}
                    </div>
                  </div>

                  {/* <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Profile Compleation</span>
                  <span className='fw-bolder fs-6'>50%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{width: '50%'}}
                  ></div>
                </div>
              </div> */}
                </div>
              </div>
            </div>

            <div className='d-flex overflow-auto h-55px'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/UpdateDataPribadi' && 'active')
                    }
                    to='/kepegawaian/UpdateDataPribadi'
                  >
                    Data Pribadi
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/UpdateDataKeluarga' && 'active')
                    }
                    to='/kepegawaian/UpdateDataKeluarga'
                  >
                    Data Keluarga
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/UpdatePendidikan' && 'active')
                    }
                    to='/kepegawaian/UpdatePendidikan'
                  >
                    Pendidikan
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/UpdateDataKepegawaian' && 'active')
                    }
                    to='/kepegawaian/UpdateDataKepegawaian'
                  >
                    Data Kepegawaian
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Second Card */}
      <div className='card mb-5 mb-xl-10'>
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bold m-0">Data Pribadi</h3>
          </div>
        </div>
        <div className="card-body p-9">
          <div className="row">
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <label htmlFor="" className="mb-3">Nama</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="Nama"
                value="AGUS APRIANTO" />
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <label htmlFor="" className="mb-3">Tempat, Tanggal Lahir</label>
              <div className="row">
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="Tempat"
                    value="PALEMBANG" />
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <input type="date" className="form-control form-control-solid" placeholder="Tanggal Lahir"
                    value="10-08-1982" />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Jenis Kelamin</label>
                  <Select options={jenisKelamin}/>
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Agama</label>
                  <Select options={agama}/>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="" className="mb-3">NIK</label>
                  <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="NIK"
                    value="3172021008820023" />
                </div>
                <div className="col-6">
                  <label htmlFor="" className="mb-3">Nomor KK</label>
                  <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="Nomor KK"
                    value="3172023010141005" />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Status Perkawinan</label>
                  <Select options={statusPerkawinan}/>
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Umur</label>
                  <input type="number" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="Umur"
                    value="36" />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <label htmlFor="" className="mb-3">Nomor HP</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="Nomor HP"
                value="081238303082" />
            </div>

            <div className="col-12 mb-4">
              <hr className="fg-gray" />
            </div>

            <div className="col-12">
              <div className="row">
                <div className="col-xxl-10 col-md-10 col-lg-10 col-sm-12">
                  <label htmlFor="" className="mb-3">Alamat Sesuai KTP</label>
                  <input type="text" className="form-control form-control form-control-solid mb-3" name="tags" placeholder="Alamat Sesuai KTP"
                    value="JL. WARAKAS VI GG XVIII NO. 105 B KEL. PAPANGGO KEC. TANJUNG PRIUK JAKARTA UTARA" />
                </div>
                <div className="col-xxl-2 col-md-2 col-lg-2 col-sm-12">
                  <label htmlFor="" className="mb-3">RT/RW</label>
                  <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="RT/RW"
                    value="009 / 005" />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Provinsi</label>
                  <Select options={provinsi}/>
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Kab/Kota</label>
                  <Select options={kabKota}/>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xxl-6 col-md-10 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Kecamatan</label>
                  <Select options={kecamatan}/>
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Kelurahan</label>
                  <Select options={kelurahan}/>
                </div>
              </div>
            </div>

            <div className="col-12 mt-7">
              <hr className="fg-gray" />
            </div>

            <div className="col-12 mt-4">
              <div className="row">
                <div className="col-xxl-10 col-md-10 col-lg-10 col-sm-12">
                  <label htmlFor="" className="mb-3">Alamat Domisili</label>
                  <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="Alamat Domisili"
                    value="JL. WARAKAS VI GG XVIII NO. 105 B KEL. PAPANGGO KEC. TANJUNG PRIUK JAKARTA UTARA" />
                </div>
                <div className="col-xxl-2 col-md-2 col-lg-2 col-sm-12">
                  <label htmlFor="" className="mb-3">RT/RW</label>
                  <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="RT/RW"
                    value="009 / 005" />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Provinsi</label>
                  <Select options={provinsi}/>
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Kab/Kota</label>
                  <Select options={kabKota}/>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xxl-6 col-md-10 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Kecamatan</label>
                  <Select options={kecamatan}/>
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Kelurahan</label>
                  <Select options={kelurahan}/>
                </div>
              </div>
            </div>
          </div>
          <div className="p-0 mt-6">
            <div className="text-center">
              <Link
                className="text-reset text-decoration-none"
                to="/kepegawaian/UpdateInformasiDataPegawai"
              >
                <button className="float-none btn btn-secondary align-self-center m-1">
                  <i className="fa fa-close"></i>
                  Batal
                </button>
              </Link>
              <Link
                className="text-reset text-decoration-none"
                to="/kepegawaian/UpdateDataKeluarga"
              >
                <button className="float-none btn btn-primary align-self-center m-1">
                  <i className="fa-solid fa-arrow-right"></i>
                  Lanjut
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}
