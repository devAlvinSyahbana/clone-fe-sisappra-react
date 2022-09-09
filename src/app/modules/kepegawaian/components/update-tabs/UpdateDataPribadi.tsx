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
