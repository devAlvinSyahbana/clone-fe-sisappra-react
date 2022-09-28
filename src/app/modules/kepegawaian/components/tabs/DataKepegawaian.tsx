// import React from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Link, useParams} from 'react-router-dom'
import {HeaderDetailWrapper} from './HeaderDetail'
import axios from 'axios'
import {Field, Formik, FormikHelpers} from 'formik'
import {useState, useEffect} from 'react'
import {DetailPegawaiInterface} from '../KepegawaianInterface'
import moment from 'moment'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function DataKepegawaian() {
  const {id, status} = useParams()
  const [data, setData] = useState<DetailPegawaiInterface>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KEPEGAWAIAN_URL}/findone/${id}/${status}`)
      setData((prevstate) => ({...prevstate, ...response.data.data}))
    }
    fetchData()
  }, [setData, id, status])

  return (
    <div>
      {/* Header */}
      <HeaderDetailWrapper />
      {/* second card */}
      <Formik
        initialValues={{
          ...data,
          kepegawaian_tmtpangkat: moment(data?.kepegawaian_tmtpangkat).format('D MMMM YYYY'),
          kepegawaian_tmt_cpns: moment(data?.kepegawaian_tmt_cpns).format('D MMMM YYYY'),
          kepegawaian_tmt_pns: moment(data?.kepegawaian_tmt_pns).format('D MMMM YYYY'),
          kepegawaian_tgl_sk_pns: moment(data?.kepegawaian_tgl_sk_pns).format('D MMMM YYYY'),
          kepegawaian_tgl_sk_pangkat_terakhir: moment(
            data?.kepegawaian_tgl_sk_pangkat_terakhir
          ).format('D MMMM YYYY'),
          kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat: moment(
            data?.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat
          ).format('D MMMM YYYY'),
          kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat: moment(
            data?.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat
          ).format('D MMMM YYYY'),
          kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat: moment(
            data?.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat
          ).format('D MMMM YYYY'),
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
                  disabled
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
                  disabled
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
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_pangkat_name'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Golongan
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_golongan_name'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  TMT Pangkat
                </label>
                <Field
                  disabled
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
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_pendidikan_pada_sk_name'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Jabatan
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_jabatan_name'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Eselon
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_eselon_name'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Tempat Tugas
                </label>
                <Field
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_bpjs_askes'
                />
              </div>

              <div className='col-12'>
                <div className='separator border-3 my-10'></div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  TMT CPNS
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tmt_cpns'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_sk_cpns && data.kepegawaian_sk_cpns !== '' ? (
                      <>
                        <a
                          href='/#'
                          className='text-gray-800 text-hover-primary d-flex flex-column'
                        >
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
                      </>
                    ) : (
                      <>
                        <div className='text-gray-800 text-hover-primary d-flex flex-column'>
                          <div className='symbol symbol-75px mb-5'>
                            <KTSVG
                              className='theme-light-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                            <KTSVG
                              className='theme-dark-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                          </div>
                          <div className='fs-5 fw-bold mb-2'>File tidak ditemukan...</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3'>
                <label htmlFor='' className='mb-3'>
                  TMT PNS
                </label>
                <Field
                  disabled
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
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tgl_sk_pns'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_sk_cpns && data.kepegawaian_sk_cpns !== '' ? (
                      <>
                        <a
                          href='/#'
                          className='text-gray-800 text-hover-primary d-flex flex-column'
                        >
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
                      </>
                    ) : (
                      <>
                        <div className='text-gray-800 text-hover-primary d-flex flex-column'>
                          <div className='symbol symbol-75px mb-5'>
                            <KTSVG
                              className='theme-light-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                            <KTSVG
                              className='theme-dark-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                          </div>
                          <div className='fs-5 fw-bold mb-2'>File tidak ditemukan...</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3'>
                <label htmlFor='' className='mb-3'>
                  Nomor SK Pangkat Terakhir
                </label>
                <Field
                  disabled
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
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tgl_sk_pangkat_terakhir'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_sk_cpns && data.kepegawaian_sk_cpns !== '' ? (
                      <>
                        <a
                          href='/#'
                          className='text-gray-800 text-hover-primary d-flex flex-column'
                        >
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
                      </>
                    ) : (
                      <>
                        <div className='text-gray-800 text-hover-primary d-flex flex-column'>
                          <div className='symbol symbol-75px mb-5'>
                            <KTSVG
                              className='theme-light-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                            <KTSVG
                              className='theme-dark-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                          </div>
                          <div className='fs-5 fw-bold mb-2'>File tidak ditemukan...</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className='col-12'>
                <div className='separator border-3 my-10'></div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Diklat Pol PP Dasar
                </label>
                <Field
                  disabled
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
                  disabled
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
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_diklat_pol_pp_dasar_file_sertifikat &&
                    data.kepegawaian_diklat_pol_pp_dasar_file_sertifikat !== '' ? (
                      <>
                        <a
                          href='/#'
                          className='text-gray-800 text-hover-primary d-flex flex-column'
                        >
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
                      </>
                    ) : (
                      <>
                        <div className='text-gray-800 text-hover-primary d-flex flex-column'>
                          <div className='symbol symbol-75px mb-5'>
                            <KTSVG
                              className='theme-light-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                            <KTSVG
                              className='theme-dark-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                          </div>
                          <div className='fs-5 fw-bold mb-2'>File tidak ditemukan...</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className='col-12'>
                <div className='separator border-3 my-10'></div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Diklat Struktural
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_strutural'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Nomor Sertifikat
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_strutural_no_sertifikat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Tanggal Sertifikat
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_diklat_pol_pp_strutural_file_sertifikat &&
                    data.kepegawaian_diklat_pol_pp_strutural_file_sertifikat !== '' ? (
                      <>
                        <a
                          href='/#'
                          className='text-gray-800 text-hover-primary d-flex flex-column'
                        >
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
                      </>
                    ) : (
                      <>
                        <div className='text-gray-800 text-hover-primary d-flex flex-column'>
                          <div className='symbol symbol-75px mb-5'>
                            <KTSVG
                              className='theme-light-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                            <KTSVG
                              className='theme-dark-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                          </div>
                          <div className='fs-5 fw-bold mb-2'>File tidak ditemukan...</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className='col-12'>
                <div className='separator border-3 my-10'></div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6'>
                <label htmlFor='' className='mb-3'>
                  Diklat PPNS
                </label>
                <Field
                  disabled
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
                  disabled
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
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_diklat_pol_pp_ppns_file_sertifikat &&
                    data.kepegawaian_diklat_pol_pp_ppns_file_sertifikat !== '' ? (
                      <>
                        <a
                          href='/#'
                          className='text-gray-800 text-hover-primary d-flex flex-column'
                        >
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
                      </>
                    ) : (
                      <>
                        <div className='text-gray-800 text-hover-primary d-flex flex-column'>
                          <div className='symbol symbol-75px mb-5'>
                            <KTSVG
                              className='theme-light-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                            <KTSVG
                              className='theme-dark-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                          </div>
                          <div className='fs-5 fw-bold mb-2'>File tidak ditemukan...</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className='p-0 mt-6'>
                <div className='text-center'>
                  <Link
                    className='text-reset text-decoration-none'
                    to={`/kepegawaian/InformasiDataPegawai/${id}/${status}`}
                  >
                    <button className='float-none btn btn-secondary align-self-center m-1'>
                      Keluar
                    </button>
                  </Link>
                  <Link
                    className='text-reset text-decoration-none'
                    to={`/kepegawaian/InformasiDataPegawai/Pendidikan/${id}/${status}`}
                  >
                    <button className='float-none btn btn-success align-self-center m-1'>
                      <i className='fa-solid fa-arrow-left'></i>
                      Kembali
                    </button>
                  </Link>
                  <Link
                    className='text-reset text-decoration-none'
                    to={`/kepegawaian/InformasiDataPegawai/HirarkiKepegawaian/${id}/${status}`}
                  >
                    <button className='float-none btn btn-primary align-self-center m-1'>
                      <i className='fa-solid fa-arrow-right'></i>
                      Lanjut
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Formik>
      {/* end::Body */}
    </div>
  )
}
