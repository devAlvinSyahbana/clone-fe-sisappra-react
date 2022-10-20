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
export const KEPEGAWAIAN_URL = `${API_URL}/informasi-data-pegawai`
export const MASTER_URL = `${API_URL}/master`

export function DataKepegawaian() {
  const {id, status} = useParams()
  const [data, setData] = useState<DetailPegawaiInterface>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KEPEGAWAIAN_URL}/findone/${id}/${status}`)
      setData((prevstate) => ({...prevstate, ...response.data.data}))
      getPangkat(response.data.data.kepegawaian_pangkat)
      getGolongan(response.data.data.kepegawaian_golongan)
      getPendidikan(response.data.data.kepegawaian_pendidikan_pada_sk)
      getJabatan(response.data.data.kepegawaian_jabatan)
      getEselon(response.data.data.kepegawaian_eselon)
      getBidangWilayah(response.data.data.kepegawaian_tempat_tugas)
      getPelaksana(response.data.data.kepegawaian_subbag_seksi_kecamatan)
    }
    fetchData()
  }, [setData, id, status])

  const [valMasterPangkat, setValMasterPangkat] = useState({value: '', label: ''})
  const getPangkat = async (params: any) => {
    if (params)
      return await axios
        .get(`${MASTER_URL}/pangkat/findone/${parseInt(params)}`)
        .then((response) => {
          setValMasterPangkat((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.pangkat,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const [valMasterGolongan, setValMasterGolongan] = useState({value: '', label: ''})
  const getGolongan = async (params: any) => {
    if (params)
      return await axios
        .get(`${MASTER_URL}/golongan/findone/${parseInt(params)}`)
        .then((response) => {
          setValMasterGolongan((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.golongan,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const [valMasterPendidikan, setValMasterPendidikan] = useState({value: '', label: ''})
  const getPendidikan = async (params: any) => {
    if (params)
      return await axios
        .get(`${MASTER_URL}/pendidikan/findone/${parseInt(params)}`)
        .then((response) => {
          setValMasterPendidikan((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.pendidikan,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const [valMasterJabatan, setValMasterJabatan] = useState({value: '', label: ''})
  const getJabatan = async (params: any) => {
    if (params)
      return await axios
        .get(`${MASTER_URL}/jabatan/findone/${parseInt(params)}`)
        .then((response) => {
          setValMasterJabatan((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.jabatan,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const [valMasterEselon, setValMasterEselon] = useState({value: '', label: ''})
  const getEselon = async (params: any) => {
    if (params)
      return await axios
        .get(`${MASTER_URL}/eselon/findone/${parseInt(params)}`)
        .then((response) => {
          setValMasterEselon((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.eselon,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const [valMasterBidangWilayah, setValMasterBidangWilayah] = useState({value: '', label: ''})
  const getBidangWilayah = async (params: any) => {
    if (params)
      return await axios
        .get(`${MASTER_URL}/bidang-wilayah/findone/${parseInt(params)}`)
        .then((response) => {
          setValMasterBidangWilayah((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.nama,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const [valMasterPelaksana, setValMasterPelaksana] = useState({value: '', label: ''})
  const getPelaksana = async (params: any) => {
    if (params)
      return await axios
        .get(`${MASTER_URL}/pelaksana/findone/${parseInt(params)}`)
        .then((response) => {
          setValMasterPelaksana((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.nama,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  return (
    <div>
      {/* Header */}
      <HeaderDetailWrapper />
      {/* second card */}
      <Formik
        initialValues={{
          ...data,
          kepegawaian_pangkat: valMasterPangkat.label ? valMasterPangkat.label : '',
          kepegawaian_golongan: valMasterGolongan.label ? valMasterGolongan.label : '',
          kepegawaian_pendidikan_pada_sk: valMasterPendidikan.label
            ? valMasterPendidikan.label
            : '',
          kepegawaian_jabatan: valMasterJabatan.label ? valMasterJabatan.label : '',
          kepegawaian_eselon: valMasterEselon.label ? valMasterEselon.label : '',
          kepegawaian_tempat_tugas: valMasterBidangWilayah.label ? valMasterBidangWilayah.label : '',
          kepegawaian_subbag_seksi_kecamatan: valMasterPelaksana.label ? valMasterPelaksana.label : '',
          kepegawaian_tmtpangkat: data?.kepegawaian_tmtpangkat
            ? moment(data?.kepegawaian_tmtpangkat).format('D MMMM YYYY')
            : '',
          kepegawaian_tmt_cpns: data?.kepegawaian_tmt_cpns
            ? moment(data?.kepegawaian_tmt_cpns).format('D MMMM YYYY')
            : '',
          kepegawaian_tmt_pns: data?.kepegawaian_tmt_pns
            ? moment(data?.kepegawaian_tmt_pns).format('D MMMM YYYY')
            : '',
          kepegawaian_tgl_sk_pns: data?.kepegawaian_tgl_sk_pns
            ? moment(data?.kepegawaian_tgl_sk_pns).format('D MMMM YYYY')
            : '',
          kepegawaian_tgl_sk_pangkat_terakhir: data?.kepegawaian_tgl_sk_pangkat_terakhir
            ? moment(data?.kepegawaian_tgl_sk_pangkat_terakhir).format('D MMMM YYYY')
            : '',
          kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat:
            data?.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat
              ? moment(data?.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat).format('D MMMM YYYY')
              : '',
          kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat:
            data?.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat
              ? moment(data?.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat).format(
                  'D MMMM YYYY'
                )
              : '',
          kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat:
            data?.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat
              ? moment(data?.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat).format('D MMMM YYYY')
              : '',
          kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat:
            data?.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat
              ? moment(data?.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat).format(
                  'D MMMM YYYY'
                )
              : '',
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
              <h3 className='fw-bold'>Data Kepegawaian</h3>
            </div>
            <div className='card-toolbar'>
              <Link
                className='text-reset text-decoration-none m-0'
                to={`/kepegawaian/informasi-data-pegawai/ubah-data-kepegawaian/${id}/${status}`}
              >
                <button className='float-none btn btn-light-primary align-self-center'>Ubah</button>
              </Link>
            </div>
          </div>
          <div className='card-body p-9'>
            <div className='row'>
              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <label htmlFor='' className='mb-3'>
                  NRK
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_nrk'
                  placeholder='NRK'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <label htmlFor='' className='mb-3'>
                  NIP
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_nip'
                  placeholder='NIP'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Pangkat
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_pangkat'
                  placeholder='Pangkat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Golongan
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_golongan'
                  placeholder='Golongan'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <label htmlFor='' className='mb-3'>
                  TMT Pangkat
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tmtpangkat'
                  placeholder='TMT Pangkat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Pendidikan Pada SK
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_pendidikan_pada_sk'
                  placeholder='Pendidikan Pada SK'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Tempat Tugas Bidang/Wilayah
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tempat_tugas'
                  placeholder='Tempat Tugas Bidang/Wilayah'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Subag/Seksi/Kecamatan
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-3'
                  name='kepegawaian_subbag_seksi_kecamatan'
                  placeholder='Subag/Seksi/Kecamatan'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Jabatan
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_jabatan'
                  placeholder='Jabatan'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Eselon
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_eselon'
                  placeholder='Eselon'
                />
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Status Pegawai
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_status_pegawai'
                  placeholder='Status Pegawai'
                />
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Nomor Rekening
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_rekening'
                  placeholder='Nomor Rekening'
                />
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Nomor KARPEG
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_karpeg'
                  placeholder='Nomor KARPEG'
                />
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Nomor Karis/Karsu
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_kasirkasur'
                  placeholder='Nomor Karis/Karsu'
                />
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Nomor TASPEN
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_taspen'
                  placeholder='Nomor TASPEN'
                />
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Nomor NPWP
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_npwp'
                  placeholder='Nomor NPWP'
                />
              </div>

              <div className='col-sm-12 col-md-12 col-lg-12 col-xxl-12 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Nomor BPJS/ASKES
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_bpjs_askes'
                  placeholder='Nomor BPJS/ASKES'
                />
              </div>

              <div className='col-12'>
                <div className='separator border-3 my-10'></div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <label htmlFor='' className='mb-3'>
                  TMT CPNS
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tmt_cpns'
                  placeholder='TMT CPNS'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_sk_cpns && data.kepegawaian_sk_cpns !== '' ? (
                      <>
                        <a
                          href={`${API_URL}/${data.kepegawaian_sk_cpns}`}
                          target='_blank'
                          rel='noreferrer'
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

              <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3 mb-4'>
                <label htmlFor='' className='mb-3'>
                  TMT PNS
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tmt_pns'
                  placeholder='TMT PNS'
                />
              </div>

              <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Tanggal SK PNS
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tgl_sk_pns'
                  placeholder='Tanggal SK PNS'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_sk_pns && data.kepegawaian_sk_pns !== '' ? (
                      <>
                        <a
                          href={`${API_URL}/${data.kepegawaian_sk_cpns}`}
                          target='_blank'
                          rel='noreferrer'
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

              <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Nomor SK Pangkat Terakhir
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_no_sk_pangkat_terakhir'
                  placeholder='Nomor SK Pangkat Terakhir'
                />
              </div>

              <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3 mb-4'>
                <label htmlFor='' className='mb-3'>
                  Tanggal SK Pangkat
                </label>
                <Field
                  disabled
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='kepegawaian_tgl_sk_pangkat_terakhir'
                  placeholder='Tanggal SK Pangkat'
                />
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_sk_pangkat_terakhir &&
                    data.kepegawaian_sk_pangkat_terakhir !== '' ? (
                      <>
                        <a
                          href={`${API_URL}/${data.kepegawaian_sk_pangkat_terakhir}`}
                          target='_blank'
                          rel='noreferrer'
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

              <div className='col-12 mb-4'>
                <label htmlFor='' className='mb-3 fs-2'>
                  Diklat Pol PP Dasar
                </label>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <div className='row'>
                  <div className='col-12 mb-4'>
                    <label htmlFor='' className='mb-3'>
                      Nomor Sertifikat
                    </label>
                    <Field
                      disabled
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='kepegawaian_diklat_pol_pp_dasar_no_sertifikat'
                      placeholder='Nomor Sertifikat'
                    />
                  </div>
                  <div className='col-12 mb-4'>
                    <label htmlFor='' className='mb-3'>
                      Tanggal Sertifikat
                    </label>
                    <Field
                      disabled
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat'
                      placeholder='Tanggal Sertifikat'
                    />
                  </div>
                </div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_diklat_pol_pp_dasar_file_sertifikat &&
                    data.kepegawaian_diklat_pol_pp_dasar_file_sertifikat !== '' ? (
                      <>
                        <a
                          href={`${API_URL}/${data.kepegawaian_diklat_pol_pp_dasar_file_sertifikat}`}
                          target='_blank'
                          rel='noreferrer'
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

              <div className='col-12 mb-4'>
                <label htmlFor='' className='mb-3 fs-2'>
                  Diklat Struktural
                </label>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <div className='row'>
                  <div className='col-12 mb-4'>
                    <label htmlFor='' className='mb-3'>
                      Nomor Sertifikat
                    </label>
                    <Field
                      disabled
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='kepegawaian_diklat_pol_pp_strutural_no_sertifikat'
                      placeholder='Nomor Sertifikat'
                    />
                  </div>
                  <div className='col-12 mb-4'>
                    <label htmlFor='' className='mb-3'>
                      Tanggal Sertifikat
                    </label>
                    <Field
                      disabled
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat'
                      placeholder='Tanggal Sertifikat'
                    />
                  </div>
                </div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_diklat_pol_pp_strutural_file_sertifikat &&
                    data.kepegawaian_diklat_pol_pp_strutural_file_sertifikat !== '' ? (
                      <>
                        <a
                          href={`${API_URL}/${data.kepegawaian_diklat_pol_pp_strutural_file_sertifikat}`}
                          target='_blank'
                          rel='noreferrer'
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

              <div className='col-12 mb-4'>
                <label htmlFor='' className='mb-3 fs-2'>
                  Diklat PPNS
                </label>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <div className='row'>
                  <div className='col-12 mb-4'>
                    <label htmlFor='' className='mb-3'>
                      Nomor Sertifikat
                    </label>
                    <Field
                      disabled
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='kepegawaian_diklat_pol_pp_ppns_no_sertifikat'
                      placeholder='Nomor Sertifikat'
                    />
                  </div>
                  <div className='col-12 mb-4'>
                    <label htmlFor='' className='mb-3'>
                      Tanggal Sertifikat
                    </label>
                    <Field
                      disabled
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat'
                      placeholder='Tanggal Sertifikat'
                    />
                  </div>
                </div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_diklat_pol_pp_ppns_file_sertifikat &&
                    data.kepegawaian_diklat_pol_pp_ppns_file_sertifikat !== '' ? (
                      <>
                        <a
                          href={`${API_URL}/${data.kepegawaian_diklat_pol_pp_ppns_file_sertifikat}`}
                          target='_blank'
                          rel='noreferrer'
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

              <div className='col-12 mb-4'>
                <label htmlFor='' className='mb-3 fs-2'>
                  Diklat Fungsional Pol PP
                </label>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                <div className='row'>
                  <div className='col-12 mb-4'>
                    <label htmlFor='' className='mb-3'>
                      Nomor Sertifikat
                    </label>
                    <Field
                      disabled
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='kepegawaian_diklat_fungsional_pol_pp_no_sertifikat'
                      placeholder='Nomor Sertifikat'
                    />
                  </div>
                  <div className='col-12 mb-4'>
                    <label htmlFor='' className='mb-3'>
                      Tanggal Sertifikat
                    </label>
                    <Field
                      disabled
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat'
                      placeholder='Tanggal Sertifikat'
                    />
                  </div>
                </div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {data.kepegawaian_diklat_fungsional_pol_pp_file_sertifikat &&
                    data.kepegawaian_diklat_fungsional_pol_pp_file_sertifikat !== '' ? (
                      <>
                        <a
                          href={`${API_URL}/${data.kepegawaian_diklat_fungsional_pol_pp_file_sertifikat}`}
                          target='_blank'
                          rel='noreferrer'
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
                    to={`/kepegawaian/informasi-data-pegawai/${id}/${status}`}
                  >
                    <button className='float-none btn btn-light align-self-center m-1'>
                      Keluar
                    </button>
                  </Link>
                  <Link
                    className='text-reset text-decoration-none'
                    to={`/kepegawaian/informasi-data-pegawai/detail-data-pendidikan/${id}/${status}`}
                  >
                    <button className='float-none btn btn-light-primary align-self-center m-1'>
                      <i className='fa-solid fa-arrow-left'></i>
                      Kembali
                    </button>
                  </Link>
                  <Link
                    className='text-reset text-decoration-none'
                    to={`/kepegawaian/informasi-data-pegawai/detail-hirarki-kepegawaian/${id}/${status}`}
                  >
                    <button className='float-none btn btn-primary align-self-center m-1'>
                      Lanjut <i className='fa-solid fa-arrow-right'></i>
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
