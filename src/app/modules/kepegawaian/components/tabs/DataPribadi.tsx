import React from 'react'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {HeaderDetailWrapper} from './HeaderDetail'

export function DataPribadi() {
  const {id, status} = useParams()
  console.log('id, status', id, status)

  return (
    <div>
      {/* Header */}
      <HeaderDetailWrapper />
      {/* Second Card */}
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bold m-0'>Data Pribadi</h3>
          </div>
        </div>
        <div className='card-body p-9'>
          <div className='row'>
            <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Nama
              </label>
              <input
                type='text'
                className='form-control form-control form-control-solid mb-4'
                name='tags'
                placeholder='Nama'
                value='AGUS APRIANTO'
                disabled
              />
            </div>
            <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Tempat, Tanggal Lahir
              </label>
              <div className='row'>
                <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                  <input
                    type='text'
                    className='form-control form-control form-control-solid mb-4'
                    name='tags'
                    placeholder='Tempat'
                    value='PALEMBANG'
                    disabled
                  />
                </div>
                <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                  <input
                    className='form-control form-control-solid'
                    placeholder='Tanggal Lahir'
                    id='kt_datepicker_tgl_expired'
                    value='10-08-1982'
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
              <div className='row'>
                <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Jenis Kelamin
                  </label>
                  <select
                    className='form-select form-select-solid'
                    aria-label='Select example'
                    disabled
                  >
                    <option>Pilih</option>
                    <option value='1' selected>
                      Laki-laki
                    </option>
                    <option value='2'>Perempuan</option>
                  </select>
                </div>
                <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Agama
                  </label>
                  <select
                    className='form-select form-select-solid'
                    data-control='select2'
                    data-placeholder='Pilih'
                    disabled
                  >
                    <option></option>
                    <option value='3175'>Islam</option>
                    <option value='3101' selected>
                      Katolik
                    </option>
                    <option value='3171'>Kristen Protestan</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
              <div className='row'>
                <div className='col-6'>
                  <label htmlFor='' className='mb-3'>
                    NIK
                  </label>
                  <input
                    type='text'
                    className='form-control form-control form-control-solid mb-4'
                    name='tags'
                    placeholder='NIK'
                    value='3172021008820023'
                    disabled
                  />
                </div>
                <div className='col-6'>
                  <label htmlFor='' className='mb-3'>
                    Nomor KK
                  </label>
                  <input
                    type='text'
                    className='form-control form-control form-control-solid mb-4'
                    name='tags'
                    placeholder='Nomor KK'
                    value='3172023010141005'
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
              <div className='row'>
                <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Status Perkawinan
                  </label>
                  <select
                    className='form-select form-select-solid'
                    data-control='select2'
                    data-placeholder='Pilih'
                    disabled
                  >
                    <option></option>
                    <option value='0' selected>
                      KAWIN
                    </option>
                    <option value='1'>BELUM KAWIN</option>
                  </select>
                </div>
                <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Umur
                  </label>
                  <input
                    type='number'
                    className='form-control form-control form-control-solid mb-4'
                    name='tags'
                    placeholder='Umur'
                    value='36'
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
              <label htmlFor='' className='mb-3'>
                Nomor HP
              </label>
              <input
                type='text'
                className='form-control form-control form-control-solid mb-4'
                name='tags'
                placeholder='Nomor HP'
                value='081238303082'
                disabled
              />
            </div>

            <div className='col-12'>
              <hr className='fg-gray' />
            </div>

            <div className='col-12'>
              <div className='row'>
                <div className='col-xxl-10 col-md-10 col-lg-10 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Alamat Sesuai KTP
                  </label>
                  <input
                    type='text'
                    className='form-control form-control form-control-solid mb-3'
                    name='tags'
                    placeholder='Alamat Sesuai KTP'
                    value='JL. WARAKAS VI GG XVIII NO. 105 B KEL. PAPANGGO KEC. TANJUNG PRIUK JAKARTA UTARA'
                    disabled
                  />
                </div>
                <div className='col-xxl-2 col-md-2 col-lg-2 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    RT/RW
                  </label>
                  <input
                    type='text'
                    className='form-control form-control form-control-solid mb-4'
                    name='tags'
                    placeholder='RT/RW'
                    value='009 / 005'
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
              <div className='row'>
                <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Provinsi
                  </label>
                  <select
                    className='form-select form-select-solid'
                    data-control='select2'
                    data-placeholder='Pilih'
                    disabled
                  >
                    <option></option>
                    <option value='12' selected>
                      DKI JAKARTA
                    </option>
                    <option value='13'>JAWA BARAT</option>
                    <option value='14'>JAWA TIMUR</option>
                  </select>
                </div>
                <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Kab/Kota
                  </label>
                  <select
                    className='form-select form-select-solid'
                    data-control='select2'
                    data-placeholder='Pilih'
                    disabled
                  >
                    <option></option>
                    <option value='12' selected>
                      KOTA JAKARTA UTARA
                    </option>
                    <option value='13'>KELAPA GADING BARAT</option>
                    <option value='14'>KELAPA GADING TIMUR</option>
                    <option value='15'>PEGANGSAAN DUA</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
              <div className='row'>
                <div className='col-xxl-6 col-md-10 col-lg-6 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Kecamatan
                  </label>
                  <select
                    className='form-select form-select-solid'
                    data-control='select2'
                    data-placeholder='Pilih'
                    disabled
                  >
                    <option></option>
                    <option value='12' selected>
                      TANJUNG PRIOK
                    </option>
                    <option value='13'>KELAPA GADING BARAT</option>
                    <option value='14'>KELAPA GADING TIMUR</option>
                    <option value='15'>PEGANGSAAN DUA</option>
                  </select>
                </div>
                <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Kelurahan
                  </label>
                  <select
                    className='form-select form-select-solid'
                    data-control='select2'
                    data-placeholder='Pilih'
                    disabled
                  >
                    <option></option>
                    <option value='12' selected>
                      PAPANGO
                    </option>
                    <option value='13'>KELAPA GADING BARAT</option>
                    <option value='14'>KELAPA GADING TIMUR</option>
                    <option value='15'>PEGANGSAAN DUA</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='col-12'>
              <hr className='fg-gray' />
            </div>

            <div className='col-12 mt-4'>
              <div className='row'>
                <div className='col-xxl-10 col-md-10 col-lg-10 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Alamat Domisili
                  </label>
                  <input
                    type='text'
                    className='form-control form-control form-control-solid mb-4'
                    name='tags'
                    placeholder='Alamat Domisili'
                    value='JL. WARAKAS VI GG XVIII NO. 105 B KEL. PAPANGGO KEC. TANJUNG PRIUK JAKARTA UTARA'
                    disabled
                  />
                </div>
                <div className='col-xxl-2 col-md-2 col-lg-2 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    RT/RW
                  </label>
                  <input
                    type='text'
                    className='form-control form-control form-control-solid mb-4'
                    name='tags'
                    placeholder='RT/RW'
                    value='009 / 005'
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
              <div className='row'>
                <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Provinsi
                  </label>
                  <select
                    className='form-select form-select-solid'
                    data-control='select2'
                    data-placeholder='Pilih'
                    disabled
                  >
                    <option></option>
                    <option value='12' selected>
                      DKI JAKARTA
                    </option>
                    <option value='13'>JAWA BARAT</option>
                    <option value='14'>JAWA TIMUR</option>
                  </select>
                </div>
                <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Kab/Kota
                  </label>
                  <select
                    className='form-select form-select-solid'
                    data-control='select2'
                    data-placeholder='Pilih'
                    disabled
                  >
                    <option></option>
                    <option value='12' selected>
                      {' '}
                      KOTA JAKARTA UTARA
                    </option>
                    <option value='13'>KELAPA GADING BARAT</option>
                    <option value='14'>KELAPA GADING TIMUR</option>
                    <option value='15'>PEGANGSAAN DUA</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
              <div className='row'>
                <div className='col-xxl-6 col-md-10 col-lg-6 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Kecamatan
                  </label>
                  <select
                    className='form-select form-select-solid'
                    data-control='select2'
                    data-placeholder='Pilih'
                    disabled
                  >
                    <option></option>
                    <option value='12' selected>
                      TANJUNG PRIOK
                    </option>
                    <option value='13'>KELAPA GADING BARAT</option>
                    <option value='14'>KELAPA GADING TIMUR</option>
                    <option value='15'>PEGANGSAAN DUA</option>
                  </select>
                </div>
                <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                  <label htmlFor='' className='mb-3'>
                    Kelurahan
                  </label>
                  <select
                    className='form-select form-select-solid'
                    data-control='select2'
                    data-placeholder='Pilih'
                    disabled
                  >
                    <option></option>
                    <option value='12' selected>
                      PAPANGO
                    </option>
                    <option value='13'>KELAPA GADING BARAT</option>
                    <option value='14'>KELAPA GADING TIMUR</option>
                    <option value='15'>PEGANGSAAN DUA</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='p-0 mt-6'>
            <div className='text-center'>
              <Link
                className='text-reset text-decoration-none'
                to='/kepegawaian/InformasiDataPegawai'
              >
                <button className='float-none btn btn-secondary align-self-center m-1'>
                  <i className='fa fa-close'></i>
                  Batal
                </button>
              </Link>
              <Link className='text-reset text-decoration-none' to='/kepegawaian/DataKeluarga'>
                <button className='float-none btn btn-primary align-self-center m-1'>
                  <i className='fa-solid fa-arrow-right'></i>
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
