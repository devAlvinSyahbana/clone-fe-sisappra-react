import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
// import { Dropdown1 } from '../../../../../_metronic/partials'
import { useLocation } from 'react-router-dom'


export function UpdateDataKepegawaian() {
  const location = useLocation()

  return (
    <div>
      {/* begin::Body */}
      
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
                value="169881" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">NIP</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="198208102008011020" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Pangkat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="PENATA MUDA" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Golongan</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="III/A" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">TMT Pangkat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="01-04-2019" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Pendidikan Pada SK</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="SLTA" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Jabatan</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="STAF ADMINISTRASI TINGKAT TERAMPIL" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Eselon</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Tempat Tugas</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="KOTA JAKARTA PUSAT" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Subag/Seksi/Kecamatan</label>
              <input type="text" className="form-control form-control form-control-solid mb-3" name="tags"
                value="-" />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-4">
              <label htmlFor="" className="mb-3">Status Pegawai</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="PNS" />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-4">
              <label htmlFor="" className="mb-3">Nomor Rekening</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="20120221585" />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-4">
              <label htmlFor="" className="mb-3">Nomor KARPEG</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="Q132769" />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-4">
              <label htmlFor="" className="mb-3">Nomor Karis/Karsu</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-4">
              <label htmlFor="" className="mb-3">Nomor TASPEN</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="47006861900" />
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4 col-xxl-4">
              <label htmlFor="" className="mb-3">Nomor NPWP</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="699651717042000" />
            </div>

            <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
              <label htmlFor="" className="mb-3">Nomor BPJS/ASKES</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="0000162349435" />
            </div>

            <div className="col-12">
              <hr className="fg-gray" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">TMT CPNS</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="01-01-2008" />
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
                  <label className="fw-semibold fs-6 mb-2 mt-2"
                  >Upload SK CPNS</label
                  >
                  <input
                    type="FIle"
                    className="form-control form-control-solid mb-3 mb-lg-0"
                    placeholder=""
                    value=""
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-3 col-xxl-3">
              <label htmlFor="" className="mb-3">TMT PNS</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="01-01-2009" />
            </div>

            <div className="col-sm-12 col-md-3 col-lg-3 col-xxl-3">
              <label htmlFor="" className="mb-3">Tanggal SK PNS</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="01-01-2009" />
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
                  <label className="fw-semibold fs-6 mb-2 mt-2"
                  >Upload SK CPNS</label
                  >
                  <input
                    type="FIle"
                    className="form-control form-control-solid mb-3 mb-lg-0"
                    placeholder=""
                    value=""
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-3 col-lg-3 col-xxl-3">
              <label htmlFor="" className="mb-3">Nomor SK Pangkat Terakhir</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="0000162349435" />
            </div>

            <div className="col-sm-12 col-md-3 col-lg-3 col-xxl-3">
              <label htmlFor="" className="mb-3">Tanggal SK Pangkat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="18-03-2019" />
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
                  <label className="fw-semibold fs-6 mb-2 mt-2"
                  >Upload SK CPNS</label
                  >
                  <input
                    type="FIle"
                    className="form-control form-control-solid mb-3 mb-lg-0"
                    placeholder=""
                    value=""
                  />
                </div>
              </div>
            </div>

            <div className="col-12">
              <hr className="fg-gray" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Diklat Struktural</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Nomor Sertifikat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Tanggal Sertifikat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" />
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
                  <label className="fw-semibold fs-6 mb-2 mt-2"
                  >Upload SK CPNS</label
                  >
                  <input
                    type="FIle"
                    className="form-control form-control-solid mb-3 mb-lg-0"
                    placeholder=""
                    value=""
                  />
                </div>
              </div>
            </div>

            <div className="col-12">
              <hr className="fg-gray" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Diklat PPNS</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Nomor Sertifikat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-6">
              <label htmlFor="" className="mb-3">Tanggal Sertifikat</label>
              <input type="text" className="form-control form-control form-control-solid mb-4" name="tags"
                value="-" />
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
                  <label className="fw-semibold fs-6 mb-2 mt-2"
                  >Upload SK CPNS</label
                  >
                  <input
                    type="FIle"
                    className="form-control form-control-solid mb-3 mb-lg-0"
                    placeholder=""
                    value=""
                  />
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
                to="/kepegawaian/UpdatePendidikan"
              >
                <button className="float-none btn btn-success align-self-center m-1">
                  <i className="fa-solid fa-arrow-left"></i>
                  Kembali
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
