import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
// import { Dropdown1 } from '../../../../../_metronic/partials'
import { useLocation } from 'react-router-dom'
// import PDF from '../../../../../../public/media/svg/files/pdf.svg'


export function DataKepegawaian() {
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
                        <KTSVG
                          path='/media/icons/duotune/communication/com005.svg'
                          className='svg-icon-4 me-1'
                        />
                        081238303082
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

      {/* second card */}
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bold m-0">Data Kepegawaian</h3>
          </div>
        </div>
        <div className="card-body p-9">
          <div className="row g-8 mt-2 ms-5 me-5">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">NRK</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="169881" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">NIP</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="198208102008011020" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Pangkat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="PENATA MUDA" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Golongan</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="III/A" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">TMT Pangkat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="01-04-2019" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Pendidikan Pada SK</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="SLTA" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Jabatan</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="STAF ADMINISTRASI TINGKAT TERAMPIL" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Eselon</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Tempat Tugas</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="KOTA JAKARTA PUSAT" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Subag/Seksi/Kecamatan</label>
              <input type="text" className="form-control form-control form-control-solid mb-3" name="tags"
                value="-" disabled />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-4">
              <label htmlFor="" className="mb-3">Status Pegawai</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="PNS" disabled />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-4">
              <label htmlFor="" className="mb-3">Nomor Rekening</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="20120221585" disabled />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-4">
              <label htmlFor="" className="mb-3">Nomor KARPEG</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="Q132769" disabled />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-4">
              <label htmlFor="" className="mb-3">Nomor Karis/Karsu</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" disabled />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-4">
              <label htmlFor="" className="mb-3">Nomor TASPEN</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="47006861900" disabled />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-4">
              <label htmlFor="" className="mb-3">Nomor NPWP</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="699651717042000" disabled />
            </div>

            <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
              <label htmlFor="" className="mb-3">Nomor BPJS/ASKES</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="0000162349435" disabled />
            </div>

            <div className="col-12">
              <hr className="fg-gray" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">TMT CPNS</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="01-01-2008" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5">
              <div className="card h-100 mt-3">
                <div className="card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted">
                  <a href="/#" className="text-gray-800 text-hover-primary d-flex flex-column">
                    <div className="symbol symbol-75px mb-5">
                      <KTSVG className='theme-light-show svg-icon svg-icon-5x me-1' path='/media/svg/files/pdf.svg' />
                      <KTSVG className='theme-dark-show svg-icon svg-icon-5x me-1' path='/media/svg/files/pdf-dark.svg' />
                    </div>
                    <div className="fs-5 fw-bold mb-2">
                      SK CPNS
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-3 col-xxl-3">
              <label htmlFor="" className="mb-3">TMT PNS</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="01-01-2009" disabled />
            </div>

            <div className="col-sm-12 col-md-3 col-lg-3 col-xxl-3">
              <label htmlFor="" className="mb-3">Tanggal SK PNS</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="01-01-2009" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5">
              <div className="card h-100 mt-3">
                <div className="card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted">
                  <a href="/#" className="text-gray-800 text-hover-primary d-flex flex-column">
                    <div className="symbol symbol-75px mb-5">
                      <KTSVG className='theme-light-show svg-icon svg-icon-5x me-1' path='/media/svg/files/pdf.svg' />
                      <KTSVG className='theme-dark-show svg-icon svg-icon-5x me-1' path='/media/svg/files/pdf-dark.svg' />
                    </div>
                    <div className="fs-5 fw-bold mb-2">
                      SK PNS
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-3 col-xxl-3">
              <label htmlFor="" className="mb-3">Nomor SK Pangkat Terakhir</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="0000162349435" disabled />
            </div>

            <div className="col-sm-12 col-md-3 col-lg-3 col-xxl-3">
              <label htmlFor="" className="mb-3">Tanggal SK Pangkat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="18-03-2019" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5">
              <div className="card h-100 mt-3">
                <div className="card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted">
                  <a href="/#" className="text-gray-800 text-hover-primary d-flex flex-column">
                    <div className="symbol symbol-75px mb-5">
                      <KTSVG className='theme-light-show svg-icon svg-icon-5x me-1' path='/media/svg/files/pdf.svg' />
                      <KTSVG className='theme-dark-show svg-icon svg-icon-5x me-1' path='/media/svg/files/pdf-dark.svg' />
                    </div>
                    <div className="fs-5 fw-bold mb-2">
                      SK TERAKHIR
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12">
              <hr className="fg-gray" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Diklat Struktural</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Nomor Sertifikat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Tanggal Sertifikat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5">
              <div className="card h-100 mt-3">
                <div className="card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted">
                  <a href="/#" className="text-gray-800 text-hover-primary d-flex flex-column">
                    <div className="symbol symbol-75px mb-5">
                      <KTSVG className='theme-light-show svg-icon svg-icon-5x me-1' path='/media/svg/files/pdf.svg' />
                      <KTSVG className='theme-dark-show svg-icon svg-icon-5x me-1' path='/media/svg/files/pdf-dark.svg' />
                    </div>
                    <div className="fs-5 fw-bold mb-2">
                      Sertifikat
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12">
              <hr className="fg-gray" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Diklat PPNS</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Nomor Sertifikat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Tanggal Sertifikat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" disabled />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5">
              <div className="card h-100 mt-3">
                <div className="card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted">
                  <a href="/#" className="text-gray-800 text-hover-primary d-flex flex-column">
                    <div className="symbol symbol-75px mb-5">
                      <KTSVG className='theme-light-show svg-icon svg-icon-5x me-1' path='/media/svg/files/pdf.svg' />
                      <KTSVG className='theme-dark-show svg-icon svg-icon-5x me-1' path='/media/svg/files/pdf-dark.svg' />
                    </div>
                    <div className="fs-5 fw-bold mb-2">
                      Sertifikat
                    </div>
                  </a>
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
                to="/kepegawaian/Pendidikan"
              >
                <button className="float-none btn btn-success align-self-center m-1">
                  <i className="fa-solid fa-arrow-left"></i>
                  Kembali
                </button>
              </Link>
              <Link
                className="text-reset text-decoration-none"
                to="/kepegawaian/HirarkiKepegawaian"
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
    </div >
  )
}
