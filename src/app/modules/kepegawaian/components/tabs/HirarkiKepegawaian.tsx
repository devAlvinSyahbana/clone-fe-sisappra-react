import React, { useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { Button, Collapse } from 'react-bootstrap'
// import { Dropdown1 } from '../../../../../_metronic/partials'
import { useLocation } from 'react-router-dom'
// import abatar from '../../../../../../public/media/avatars/300-11.jpg'


export function HirarkiKepegawaian() {
  const location = useLocation()
  const [open, setOpen] = useState(false);

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
      <div className="d-flex flex-wrap flex-stack mb-6">
        <h3 className="fw-bold my-2">
          Bawahan
          <span className="fs-6 text-gray-400 fw-semibold ms-1"
          >(29)</span
          >
        </h3>
      </div>
      <div className='row g-6 mb-6 g-xl-9 mb-xl-9'>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex flex-center flex-column py-9 px-5">
              <div className="symbol symbol-65px symbol-circle mb-5">
                <img
                  src={toAbsoluteUrl('/media/avatars/300-11.jpg')}
                  alt="image"
                />
                <div
                  className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                ></div>
              </div>
              <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Patric Watson</a>
              <div className="fw-semibold text-gray-400 mb-6">
                FUNGSIONAL POL PP PELAKSANA / TERAMPIL
              </div>
              <div className="d-flex flex-center flex-wrap mb-5">
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">2</div>
                  <div className="fw-semibold text-gray-400">
                    Jumlah Anggota Keluarga
                  </div>
                </div>
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">S1</div>
                  <div className="fw-semibold text-gray-400">
                    Pendidikan Terakhir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex flex-center flex-column py-9 px-5">
              <div className="symbol symbol-65px symbol-circle mb-5">
                <img
                  src={toAbsoluteUrl('/media/avatars/300-6.jpg')}
                  alt="image"
                />
                <div
                  className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                ></div>
              </div>
              <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Olivia Larson</a>
              <div className="fw-semibold text-gray-400 mb-6">
                PENGADMINISTRASI UMUM
              </div>
              <div className="d-flex flex-center flex-wrap mb-5">
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">2</div>
                  <div className="fw-semibold text-gray-400">
                    Jumlah Anggota Keluarga
                  </div>
                </div>
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">S1</div>
                  <div className="fw-semibold text-gray-400">
                    Pendidikan Terakhir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex flex-center flex-column py-9 px-5">
              <div className="symbol symbol-65px symbol-circle mb-5">
                <span className="symbol-label fs-2x fw-semibold text-warning bg-light-warning">A</span>
              </div>
              <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Adam Williams</a>
              <div className="fw-semibold text-gray-400 mb-6">
                PETUGAS KEAMANAN
              </div>
              <div className="d-flex flex-center flex-wrap mb-5">
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">2</div>
                  <div className="fw-semibold text-gray-400">
                    Jumlah Anggota Keluarga
                  </div>
                </div>
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">S1</div>
                  <div className="fw-semibold text-gray-400">
                    Pendidikan Terakhir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex flex-center flex-column py-9 px-5">
              <div className="symbol symbol-65px symbol-circle mb-5">
                <span className="symbol-label fs-2x fw-semibold text-info bg-light-info">P</span>
                <div
                  className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                ></div>
              </div>
              <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Paul Marcus</a>
              <div className="fw-semibold text-gray-400 mb-6">
                FUNGSIONAL POL PP PELAKSANA / TERAMPIL
              </div>
              <div className="d-flex flex-center flex-wrap mb-5">
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">2</div>
                  <div className="fw-semibold text-gray-400">
                    Jumlah Anggota Keluarga
                  </div>
                </div>
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">S1</div>
                  <div className="fw-semibold text-gray-400">
                    Pendidikan Terakhir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex flex-center flex-column py-9 px-5">
              <div className="symbol symbol-65px symbol-circle mb-5">
                <span className="symbol-label fs-2x fw-semibold text-info bg-light-info">N</span>
                <div
                  className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                ></div>
              </div>
              <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Neil Owen</a>
              <div className="fw-semibold text-gray-400 mb-6">
                PENYUSUN KEBUTUHAN BARANG INVENTARIS
              </div>
              <div className="d-flex flex-center flex-wrap mb-5">
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">2</div>
                  <div className="fw-semibold text-gray-400">
                    Jumlah Anggota Keluarga
                  </div>
                </div>
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">S1</div>
                  <div className="fw-semibold text-gray-400">
                    Pendidikan Terakhir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex flex-center flex-column py-9 px-5">
              <div className="symbol symbol-65px symbol-circle mb-5">
                <span className="symbol-label fs-2x fw-semibold text-primary bg-light-primary">S</span>
                <div
                  className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                ></div>
              </div>
              <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Sean Paul</a>
              <div className="fw-semibold text-gray-400 mb-6">
                PENGELOLA KEAMANAN DAN KETERTIBAN
              </div>
              <div className="d-flex flex-center flex-wrap mb-5">
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">2</div>
                  <div className="fw-semibold text-gray-400">
                    Jumlah Anggota Keluarga
                  </div>
                </div>
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">S1</div>
                  <div className="fw-semibold text-gray-400">
                    Pendidikan Terakhir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex flex-center flex-column py-9 px-5">
              <div className="symbol symbol-65px symbol-circle mb-5">
                <img
                  src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                  alt="image"
                />
                <div
                  className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                ></div>
              </div>
              <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Kitona Johnson</a>
              <div className="fw-semibold text-gray-400 mb-6">
                PENGADMINISTRASI UMUM SEKSI PPNS DAN PENINDAKAN
              </div>
              <div className="d-flex flex-center flex-wrap mb-5">
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">2</div>
                  <div className="fw-semibold text-gray-400">
                    Jumlah Anggota Keluarga
                  </div>
                </div>
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">S1</div>
                  <div className="fw-semibold text-gray-400">
                    Pendidikan Terakhir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex flex-center flex-column py-9 px-5">
              <div className="symbol symbol-65px symbol-circle mb-5">
                <img
                  src={toAbsoluteUrl('/media/avatars/300-14.jpg')}
                  alt="image"
                />
                <div
                  className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                ></div>
              </div>
              <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Robert Doe</a>
              <div className="fw-semibold text-gray-400 mb-6">
                Marketing Analytic at Avito Ltd.
              </div>
              <div className="d-flex flex-center flex-wrap mb-5">
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">2</div>
                  <div className="fw-semibold text-gray-400">
                    Jumlah Anggota Keluarga
                  </div>
                </div>
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">S1</div>
                  <div className="fw-semibold text-gray-400">
                    Pendidikan Terakhir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex flex-center flex-column py-9 px-5">
              <div className="symbol symbol-65px symbol-circle mb-5">
                <img
                  src={toAbsoluteUrl('/media/avatars/300-12.jpg')}
                  alt="image"
                />
                <div
                  className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                ></div>
              </div>
              <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Soul Jacob</a>
              <div className="fw-semibold text-gray-400 mb-6">
                FUNGSIONAL POL PP PELAKSANA / TERAMPIL
              </div>
              <div className="d-flex flex-center flex-wrap mb-5">
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">2</div>
                  <div className="fw-semibold text-gray-400">
                    Jumlah Anggota Keluarga
                  </div>
                </div>
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">S1</div>
                  <div className="fw-semibold text-gray-400">
                    Pendidikan Terakhir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex flex-center flex-column py-9 px-5">
              <div className="symbol symbol-65px symbol-circle mb-5">
                <img
                  src={toAbsoluteUrl('/media/avatars/300-7.jpg')}
                  alt="image"
                />
                <div
                  className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                ></div>
              </div>
              <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Nina Strong</a>
              <div className="fw-semibold text-gray-400 mb-6">
                KOMANDAN PETUGAS KEAMANAN
              </div>
              <div className="d-flex flex-center flex-wrap mb-5">
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">2</div>
                  <div className="fw-semibold text-gray-400">
                    Jumlah Anggota Keluarga
                  </div>
                </div>
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">S1</div>
                  <div className="fw-semibold text-gray-400">
                    Pendidikan Terakhir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex flex-center flex-column py-9 px-5">
              <div className="symbol symbol-65px symbol-circle mb-5">
                <img
                  src={toAbsoluteUrl('/media/avatars/300-11.jpg')}
                  alt="image"
                />
                <div
                  className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                ></div>
              </div>
              <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Patric Watson</a>
              <div className="fw-semibold text-gray-400 mb-6">
                FUNGSIONAL POL PP PELAKSANA / TERAMPIL
              </div>
              <div className="d-flex flex-center flex-wrap mb-5">
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">2</div>
                  <div className="fw-semibold text-gray-400">
                    Jumlah Anggota Keluarga
                  </div>
                </div>
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">S1</div>
                  <div className="fw-semibold text-gray-400">
                    Pendidikan Terakhir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body d-flex flex-center flex-column py-9 px-5">
              <div className="symbol symbol-65px symbol-circle mb-5">
                <img
                  src={toAbsoluteUrl('/media/avatars/300-6.jpg')}
                  alt="image"
                />
                <div
                  className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                ></div>
              </div>
              <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Olivia Larson</a>
              <div className="fw-semibold text-gray-400 mb-6">
                PENGADMINISTRASI UMUM
              </div>
              <div className="d-flex flex-center flex-wrap mb-5">
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">2</div>
                  <div className="fw-semibold text-gray-400">
                    Jumlah Anggota Keluarga
                  </div>
                </div>
                <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                  <div className="fs-6 fw-bold text-gray-700">S1</div>
                  <div className="fw-semibold text-gray-400">
                    Pendidikan Terakhir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Collapse in={open}>
          <div id="example-collapse-text">

            <div className='row g-6 mb-6 g-xl-9 mb-xl-9'>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body d-flex flex-center flex-column py-9 px-5">
                    <div className="symbol symbol-65px symbol-circle mb-5">
                      <img
                        src={toAbsoluteUrl('/media/avatars/300-11.jpg')}
                        alt="image"
                      />
                      <div
                        className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                      ></div>
                    </div>
                    <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Patric Watson</a>
                    <div className="fw-semibold text-gray-400 mb-6">
                      FUNGSIONAL POL PP PELAKSANA / TERAMPIL
                    </div>
                    <div className="d-flex flex-center flex-wrap mb-5">
                      <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">2</div>
                        <div className="fw-semibold text-gray-400">
                          Jumlah Anggota Keluarga
                        </div>
                      </div>
                      <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">S1</div>
                        <div className="fw-semibold text-gray-400">
                          Pendidikan Terakhir
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-body d-flex flex-center flex-column py-9 px-5">
                    <div className="symbol symbol-65px symbol-circle mb-5">
                      <img
                        src={toAbsoluteUrl('/media/avatars/300-6.jpg')}
                        alt="image"
                      />
                      <div
                        className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                      ></div>
                    </div>
                    <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Olivia Larson</a>
                    <div className="fw-semibold text-gray-400 mb-6">
                      PENGADMINISTRASI UMUM
                    </div>
                    <div className="d-flex flex-center flex-wrap mb-5">
                      <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">2</div>
                        <div className="fw-semibold text-gray-400">
                          Jumlah Anggota Keluarga
                        </div>
                      </div>
                      <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">S1</div>
                        <div className="fw-semibold text-gray-400">
                          Pendidikan Terakhir
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-body d-flex flex-center flex-column py-9 px-5">
                    <div className="symbol symbol-65px symbol-circle mb-5">
                      <span className="symbol-label fs-2x fw-semibold text-warning bg-light-warning">A</span>
                    </div>
                    <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Adam Williams</a>
                    <div className="fw-semibold text-gray-400 mb-6">
                      PETUGAS KEAMANAN
                    </div>
                    <div className="d-flex flex-center flex-wrap mb-5">
                      <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">2</div>
                        <div className="fw-semibold text-gray-400">
                          Jumlah Anggota Keluarga
                        </div>
                      </div>
                      <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">S1</div>
                        <div className="fw-semibold text-gray-400">
                          Pendidikan Terakhir
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-body d-flex flex-center flex-column py-9 px-5">
                    <div className="symbol symbol-65px symbol-circle mb-5">
                      <span className="symbol-label fs-2x fw-semibold text-info bg-light-info">P</span>
                      <div
                        className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                      ></div>
                    </div>
                    <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Paul Marcus</a>
                    <div className="fw-semibold text-gray-400 mb-6">
                      FUNGSIONAL POL PP PELAKSANA / TERAMPIL
                    </div>
                    <div className="d-flex flex-center flex-wrap mb-5">
                      <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">2</div>
                        <div className="fw-semibold text-gray-400">
                          Jumlah Anggota Keluarga
                        </div>
                      </div>
                      <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">S1</div>
                        <div className="fw-semibold text-gray-400">
                          Pendidikan Terakhir
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-body d-flex flex-center flex-column py-9 px-5">
                    <div className="symbol symbol-65px symbol-circle mb-5">
                      <span className="symbol-label fs-2x fw-semibold text-info bg-light-info">N</span>
                      <div
                        className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                      ></div>
                    </div>
                    <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Neil Owen</a>
                    <div className="fw-semibold text-gray-400 mb-6">
                      PENYUSUN KEBUTUHAN BARANG INVENTARIS
                    </div>
                    <div className="d-flex flex-center flex-wrap mb-5">
                      <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">2</div>
                        <div className="fw-semibold text-gray-400">
                          Jumlah Anggota Keluarga
                        </div>
                      </div>
                      <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">S1</div>
                        <div className="fw-semibold text-gray-400">
                          Pendidikan Terakhir
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-body d-flex flex-center flex-column py-9 px-5">
                    <div className="symbol symbol-65px symbol-circle mb-5">
                      <span className="symbol-label fs-2x fw-semibold text-primary bg-light-primary">S</span>
                      <div
                        className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
                      ></div>
                    </div>
                    <a href="/#" className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">Sean Paul</a>
                    <div className="fw-semibold text-gray-400 mb-6">
                      PENGELOLA KEAMANAN DAN KETERTIBAN
                    </div>
                    <div className="d-flex flex-center flex-wrap mb-5">
                      <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">2</div>
                        <div className="fw-semibold text-gray-400">
                          Jumlah Anggota Keluarga
                        </div>
                      </div>
                      <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                        <div className="fs-6 fw-bold text-gray-700">S1</div>
                        <div className="fw-semibold text-gray-400">
                          Pendidikan Terakhir
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Collapse>
        <div className="d-flex flex-center">
          <Button className="btn btn-primary"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >Show More
          </Button>
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
              to="/kepegawaian/DataKepegawaian"
            >
              <button className="float-none btn btn-success align-self-center m-1">
                <i className="fa-solid fa-arrow-left"></i>
                Kembali
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}
