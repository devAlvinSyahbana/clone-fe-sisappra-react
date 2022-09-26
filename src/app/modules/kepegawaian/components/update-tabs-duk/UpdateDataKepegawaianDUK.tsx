import React, {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Link, useParams} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {UpdateHeaderDetailDUK} from './UpdateHeaderDetailDUK'
import axios from 'axios'
import {DetailPegawaiInterface} from '../KepegawaianInterface'
import {Formik, Field, FormikHelpers} from 'formik'
import moment from 'moment'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function UpdateDataKepegawaianDUK() {
  const {id, status} = useParams()
  console.log('id, status', id, status)
  const [data, setData] = useState<DetailPegawaiInterface>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KEPEGAWAIAN_URL}/findone/${id}/${status}`)
      setData((prevstate) => ({...prevstate, ...response.data.data}))
      // console.log(response.data.data);
    }
    fetchData()
  }, [setData])

  return (
    <>
      {/* begin::Body */}
      <UpdateHeaderDetailDUK />
      {/* second card */}
      <Formik
        initialValues={{
          ...data,
          kepegawaian_tmtpangkat: moment(data?.kepegawaian_tmtpangkat).format('YYYY-MM-D'),
        }}
        onSubmit={function (
          values: DetailPegawaiInterface,
          {setSubmitting}: FormikHelpers<DetailPegawaiInterface>
        ) {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 500)
        }}
        enableReinitialize
      >
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bold m-0'>Data Kepegawaian</h3>
            </div>
          </div>
          <div className='card-body p-9'>
            <div className='row g-8 mt-2 ms-5 me-5'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  NRK
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_nrk'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  NIP
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_nip'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Pangkat
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_pangkat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Golongan
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_golongan'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  TMT Pangkat
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tmtpangkat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Pendidikan Pada SK
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_pendidikan_pada_sk'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Jabatan
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_jabatan'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Eselon
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_eselon'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Tempat Tugas
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tempat_tugas'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Subag/Seksi/Kecamatan
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-3'
                  name='kepegawaian_subbag_seksi_kecamatan'
                />
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4'>
                <label htmlFor='' className='mb-3'>
                  Status Pegawai
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_status_pegawai'
                />
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4'>
                <label htmlFor='' className='mb-3'>
                  Nomor Rekening
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_rekening'
                />
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4'>
                <label htmlFor='' className='mb-3'>
                  Nomor KARPEG
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_karpeg'
                />
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4'>
                <label htmlFor='' className='mb-3'>
                  Nomor Karis/Karsu
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_kasirkasur'
                />
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4'>
                <label htmlFor='' className='mb-3'>
                  Nomor TASPEN
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_taspen'
                />
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4'>
                <label htmlFor='' className='mb-3'>
                  Nomor NPWP
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_npwp'
                />
              </div>

              <div className='col-sm-12 col-md-12 col-lg-12 col-xxl-12'>
                <label htmlFor='' className='mb-3'>
                  Nomor BPJS/ASKES
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_bpjs_askes'
                />
              </div>

              <div className='col-12'>
                <hr className='fg-gray' />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  TMT CPNS
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tmt_cpns'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    <a href='/#' className='text-gray-800 text-hover-primary d-flex flex-column'>
                      <div className='symbol symbol-75px mb-5'>
                        <KTSVG
                          className='theme-light-show svg-icon svg-icon-5x me-1'
                          path='/media/svg/files/pdf.svg'
                        />
                        <KTSVG
                          className='theme-dark-show svg-icon svg-icon-5x me-1'
                          path='/media/svg/files/pdf-dark.svg'
                        />
                      </div>
                      <div className='fs-5 fw-bold mb-2'>SK CPNS</div>
                    </a>
                    <label className='fw-semibold fs-6 mb-2 mt-2'>Upload SK CPNS</label>
                    <Field
                      type='FIle'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder=''
                      value=''
                    />
                  </div>
                </div>
              </div>

              <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3'>
                <label htmlFor='' className='mb-3'>
                  TMT PNS
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tmt_pns'
                />
              </div>

              <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3'>
                <label htmlFor='' className='mb-3'>
                  Tanggal SK PNS
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tgl_sk_pns'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    <a href='/#' className='text-gray-800 text-hover-primary d-flex flex-column'>
                      <div className='symbol symbol-75px mb-5'>
                        <KTSVG
                          className='theme-light-show svg-icon svg-icon-5x me-1'
                          path='/media/svg/files/pdf.svg'
                        />
                        <KTSVG
                          className='theme-dark-show svg-icon svg-icon-5x me-1'
                          path='/media/svg/files/pdf-dark.svg'
                        />
                      </div>
                      <div className='fs-5 fw-bold mb-2'>SK PNS</div>
                    </a>
                    <label className='fw-semibold fs-6 mb-2 mt-2'>Upload SK PNS</label>
                    <Field
                      type='FIle'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder=''
                      value=''
                    />
                  </div>
                </div>
              </div>

              <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3'>
                <label htmlFor='' className='mb-3'>
                  Nomor SK Pangkat Terakhir
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_sk_pangkat_terakhir'
                />
              </div>

              <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3'>
                <label htmlFor='' className='mb-3'>
                  Tanggal SK Pangkat
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tgl_sk_pangkat_terakhir'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    <a href='/#' className='text-gray-800 text-hover-primary d-flex flex-column'>
                      <div className='symbol symbol-75px mb-5'>
                        <KTSVG
                          className='theme-light-show svg-icon svg-icon-5x me-1'
                          path='/media/svg/files/pdf.svg'
                        />
                        <KTSVG
                          className='theme-dark-show svg-icon svg-icon-5x me-1'
                          path='/media/svg/files/pdf-dark.svg'
                        />
                      </div>
                      <div className='fs-5 fw-bold mb-2'>SK TERAKHIR</div>
                    </a>
                    <label className='fw-semibold fs-6 mb-2 mt-2'>Upload SK Terakhir</label>
                    <Field
                      type='FIle'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder=''
                      value=''
                    />
                  </div>
                </div>
              </div>

              <div className='col-12'>
                <hr className='fg-gray' />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Diklat Pol PP Dasar
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_dasar'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Nomor Sertifikat
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_dasar_no_sertifikat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Tanggal Sertifikat
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    <a href='/#' className='text-gray-800 text-hover-primary d-flex flex-column'>
                      <div className='symbol symbol-75px mb-5'>
                        <KTSVG
                          className='theme-light-show svg-icon svg-icon-5x me-1'
                          path='/media/svg/files/pdf.svg'
                        />
                        <KTSVG
                          className='theme-dark-show svg-icon svg-icon-5x me-1'
                          path='/media/svg/files/pdf-dark.svg'
                        />
                      </div>
                      <div className='fs-5 fw-bold mb-2'>Sertifikat</div>
                    </a>
                    <label className='fw-semibold fs-6 mb-2 mt-2'>Upload Sertifikat</label>
                    <Field
                      type='FIle'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder=''
                      value=''
                    />
                  </div>
                </div>
              </div>

              <div className='col-12'>
                <hr className='fg-gray' />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Diklat Struktural
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_strutular'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Nomor Sertifikat
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_strutular_no_sertifikat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Tanggal Sertifikat
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_strutular_tgl_sertifikat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    <a href='/#' className='text-gray-800 text-hover-primary d-flex flex-column'>
                      <div className='symbol symbol-75px mb-5'>
                        <KTSVG
                          className='theme-light-show svg-icon svg-icon-5x me-1'
                          path='/media/svg/files/pdf.svg'
                        />
                        <KTSVG
                          className='theme-dark-show svg-icon svg-icon-5x me-1'
                          path='/media/svg/files/pdf-dark.svg'
                        />
                      </div>
                      <div className='fs-5 fw-bold mb-2'>Sertifikat</div>
                    </a>
                    <label className='fw-semibold fs-6 mb-2 mt-2'>Upload Sertifikat</label>
                    <Field
                      type='FIle'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder=''
                      value=''
                    />
                  </div>
                </div>
              </div>

              <div className='col-12'>
                <hr className='fg-gray' />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Diklat PPNS
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_ppns'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Nomor Sertifikat
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_ppns_no_sertifikat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Tanggal Sertifikat
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    <a href='/#' className='text-gray-800 text-hover-primary d-flex flex-column'>
                      <div className='symbol symbol-75px mb-5'>
                        <KTSVG
                          className='theme-light-show svg-icon svg-icon-5x me-1'
                          path='/media/svg/files/pdf.svg'
                        />
                        <KTSVG
                          className='theme-dark-show svg-icon svg-icon-5x me-1'
                          path='/media/svg/files/pdf-dark.svg'
                        />
                      </div>
                      <div className='fs-5 fw-bold mb-2'>Sertifikat</div>
                    </a>
                    <label className='fw-semibold fs-6 mb-2 mt-2'>Upload Sertifikat</label>
                    <Field
                      type='FIle'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder=''
                      value=''
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='p-0 mt-6'>
              <div className='text-center'>
                <Link
                  className='text-reset text-decoration-none'
                  to='/kepegawaian/LaporanRekapitulasiPegawai/TabDaftarUrutKepangkatan/'
                >
                  <button className='float-none btn btn-secondary align-self-center m-1'>
                    <i className='fa fa-close'></i>
                    Batal
                  </button>
                </Link>
                <Link
                  className='text-reset text-decoration-none'
                  to={`/kepegawaian/TabDaftarUrutKepangkatan/UpdateDataPendidikanDUK/${id}/${status}`}
                >
                  <button className='float-none btn btn-success align-self-center m-1'>
                    <i className='fa-solid fa-arrow-left'></i>
                    Kembali
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Formik>
      {/* end::Body */}
    </>
  )
}
