import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
// import { Dropdown1 } from '../../../../../_metronic/partials'
import { useLocation } from 'react-router-dom'


export function DataPribadi() {
  const location = useLocation()

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
                      (location.pathname === '/kepegawaian/DataPribadi' && 'active')
                    }
                    to='/kepegawaian/DataPribadi'
                  >
                    Data Pribadi
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/DataKeluarga' && 'active')
                    }
                    to='/kepegawaian/DataKeluarga'
                  >
                    Data Keluarga
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/Pendidikan' && 'active')
                    }
                    to='/kepegawaian/Pendidikan'
                  >
                    Pendidikan
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/DataKepegawaian' && 'active')
                    }
                    to='/kepegawaian/DataKepegawaian'
                  >
                    Data Kepegawaian
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/HirarkiKepegawaian' && 'active')
                    }
                    to='/kepegawaian/HirarkiKepegawaian'
                  >
                    Hirarki Kepegawaian
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
                value="AGUS APRIANTO" disabled />
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <label htmlFor="" className="mb-3">Tempat, Tanggal Lahir</label>
              <div className="row">
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="Tempat"
                    value="PALEMBANG" disabled />
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <input className="form-control form-control-solid" placeholder="Tanggal Lahir" id="kt_datepicker_tgl_expired"
                    value="10-08-1982" disabled />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Jenis Kelamin</label>
                  <select className="form-select form-select-solid" aria-label="Select example" disabled>
                    <option>Pilih</option>
                    <option value="1" selected>Laki-laki</option>
                    <option value="2">Perempuan</option>
                  </select>
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Agama</label>
                  <select className="form-select form-select-solid" data-control="select2" data-placeholder="Pilih" disabled>
                    <option></option>
                    <option value="3175">Islam</option>
                    <option value="3101" selected>Katolik</option>
                    <option value="3171">Kristen Protestan</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="" className="mb-3">NIK</label>
                  <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="NIK"
                    value="3172021008820023" disabled />
                </div>
                <div className="col-6">
                  <label htmlFor="" className="mb-3">Nomor KK</label>
                  <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="Nomor KK"
                    value="3172023010141005" disabled />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Status Perkawinan</label>
                  <select className="form-select form-select-solid" data-control="select2" data-placeholder="Pilih" disabled>
                    <option></option>
                    <option value="0" selected>KAWIN</option>
                    <option value="1">BELUM KAWIN</option>
                  </select>
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Umur</label>
                  <input type="number" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="Umur"
                    value="36" disabled />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <label htmlFor="" className="mb-3">Nomor HP</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="Nomor HP"
                value="081238303082" disabled />
            </div>

            <div className="col-12">
              <hr className="fg-gray" />
            </div>

            <div className="col-12">
              <div className="row">
                <div className="col-xxl-10 col-md-10 col-lg-10 col-sm-12">
                  <label htmlFor="" className="mb-3">Alamat Sesuai KTP</label>
                  <input type="text" className="form-control form-control form-control-solid mb-3" name="tags" placeholder="Alamat Sesuai KTP"
                    value="JL. WARAKAS VI GG XVIII NO. 105 B KEL. PAPANGGO KEC. TANJUNG PRIUK JAKARTA UTARA" disabled />
                </div>
                <div className="col-xxl-2 col-md-2 col-lg-2 col-sm-12">
                  <label htmlFor="" className="mb-3">RT/RW</label>
                  <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="RT/RW"
                    value="009 / 005" disabled />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Provinsi</label>
                  <select className="form-select form-select-solid" data-control="select2" data-placeholder="Pilih" disabled>
                    <option></option>
                    <option value="12" selected>DKI JAKARTA</option>
                    <option value="13">JAWA BARAT</option>
                    <option value="14">JAWA TIMUR</option>
                  </select>
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Kab/Kota</label>
                  <select className="form-select form-select-solid" data-control="select2" data-placeholder="Pilih" disabled>
                    <option></option>
                    <option value="12" selected>KOTA JAKARTA UTARA</option>
                    <option value="13">KELAPA GADING BARAT</option>
                    <option value="14">KELAPA GADING TIMUR</option>
                    <option value="15">PEGANGSAAN DUA</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xxl-6 col-md-10 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Kecamatan</label>
                  <select className="form-select form-select-solid" data-control="select2" data-placeholder="Pilih" disabled>
                    <option></option>
                    <option value="12" selected>TANJUNG PRIOK</option>
                    <option value="13">KELAPA GADING BARAT</option>
                    <option value="14">KELAPA GADING TIMUR</option>
                    <option value="15">PEGANGSAAN DUA</option>
                  </select>
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Kelurahan</label>
                  <select className="form-select form-select-solid" data-control="select2" data-placeholder="Pilih" disabled>
                    <option></option>
                    <option value="12" selected>PAPANGO</option>
                    <option value="13">KELAPA GADING BARAT</option>
                    <option value="14">KELAPA GADING TIMUR</option>
                    <option value="15">PEGANGSAAN DUA</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-12">
              <hr className="fg-gray" />
            </div>

            <div className="col-12 mt-4">
              <div className="row">
                <div className="col-xxl-10 col-md-10 col-lg-10 col-sm-12">
                  <label htmlFor="" className="mb-3">Alamat Domisili</label>
                  <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="Alamat Domisili"
                    value="JL. WARAKAS VI GG XVIII NO. 105 B KEL. PAPANGGO KEC. TANJUNG PRIUK JAKARTA UTARA" disabled />
                </div>
                <div className="col-xxl-2 col-md-2 col-lg-2 col-sm-12">
                  <label htmlFor="" className="mb-3">RT/RW</label>
                  <input type="text" className="form-control form-control form-control-solid mb-4" name="tags" placeholder="RT/RW"
                    value="009 / 005" disabled />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Provinsi</label>
                  <select className="form-select form-select-solid" data-control="select2" data-placeholder="Pilih" disabled>
                    <option></option>
                    <option value="12" selected>DKI JAKARTA</option>
                    <option value="13">JAWA BARAT</option>
                    <option value="14">JAWA TIMUR</option>
                  </select>
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Kab/Kota</label>
                  <select className="form-select form-select-solid" data-control="select2" data-placeholder="Pilih" disabled>
                    <option></option>
                    <option value="12" selected> KOTA JAKARTA UTARA</option>
                    <option value="13">KELAPA GADING BARAT</option>
                    <option value="14">KELAPA GADING TIMUR</option>
                    <option value="15">PEGANGSAAN DUA</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xxl-6 col-md-10 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Kecamatan</label>
                  <select className="form-select form-select-solid" data-control="select2" data-placeholder="Pilih" disabled>
                    <option></option>
                    <option value="12" selected>TANJUNG PRIOK</option>
                    <option value="13">KELAPA GADING BARAT</option>
                    <option value="14">KELAPA GADING TIMUR</option>
                    <option value="15">PEGANGSAAN DUA</option>
                  </select>
                </div>
                <div className="col-xxl-6 col-md-6 col-lg-6 col-sm-12">
                  <label htmlFor="" className="mb-3">Kelurahan</label>
                  <select className="form-select form-select-solid" data-control="select2" data-placeholder="Pilih" disabled>
                    <option></option>
                    <option value="12" selected>PAPANGO</option>
                    <option value="13">KELAPA GADING BARAT</option>
                    <option value="14">KELAPA GADING TIMUR</option>
                    <option value="15">PEGANGSAAN DUA</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="p-0 mt-6">
            <div className="text-center">
              <Link
                className="text-reset text-decoration-none"
                to="/kepegawaian/InformasiDataPegawai"
              >
                <button className="float-none btn btn-secondary align-self-center m-1">
                  <i className="fa fa-close"></i>
                  Batal
                </button>
              </Link>
              <Link
                className="text-reset text-decoration-none"
                to="/kepegawaian/DataKeluarga"
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
