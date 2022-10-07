import axios from 'axios'
import {Field, Formik, FormikHelpers} from 'formik'
import moment from 'moment'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {DetailPegawaiInterface} from '../KepegawaianInterface'
import {HeaderDetailWrapper} from './HeaderDetailDUK'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function DataPribadiDUK() {
  const {id, status} = useParams()

  const [data, setData] = useState<DetailPegawaiInterface>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KEPEGAWAIAN_URL}/findone/${id}/${status}`)
      setData((prevstate) => ({...prevstate, ...response.data.data}))
    }
    fetchData()
  }, [setData, id, status])

  const ageFromDateOfBirthday = (dateOfBirth: any): number => {
    return moment().diff(dateOfBirth, 'years')
  }

  return (
    <>
      {/* Header */}
      <HeaderDetailWrapper />
      {/* Second Card */}
      <Formik
        initialValues={{
          ...data,
          tgl_lahir: moment(data?.tgl_lahir).format('D MMMM YYYY'),
          umur: ageFromDateOfBirthday(moment(data?.tgl_lahir).format('YYYY-MM-D')),
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
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='nama'
                  placeholder='Nama'
                  disabled
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Tempat, Tanggal Lahir
                </label>
                <div className='row'>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='tempat_lahir'
                      placeholder='Tempat'
                      disabled
                    />
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                    <Field
                      className='form-control form-control-solid'
                      name='tgl_lahir'
                      placeholder='Tanggal Lahir'
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
                    <Field
                      className='form-control form-control-solid'
                      name='jenis_kelamin'
                      placeholder='Jenis Kelamin'
                      disabled
                    />
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                    <label htmlFor='' className='mb-3'>
                      Agama
                    </label>
                    <Field
                      className='form-control form-control-solid'
                      name='agama_name'
                      placeholder='Agama'
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <div className='row'>
                  <div className='col-6'>
                    <label htmlFor='' className='mb-3'>
                      NIK
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='nik'
                      placeholder='NIK'
                      disabled
                    />
                  </div>
                  <div className='col-6'>
                    <label htmlFor='' className='mb-3'>
                      Nomor KK
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='no_kk'
                      placeholder='Nomor KK'
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
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='status_perkawinan'
                      placeholder='Status Perkawinan'
                      disabled
                    />
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                    <label htmlFor='' className='mb-3'>
                      Umur
                    </label>
                    <Field
                      type='number'
                      className='form-control form-control form-control-solid mb-4'
                      name='umur'
                      placeholder='Umur'
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Nomor HP
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='no_hp'
                  placeholder='Nomor HP'
                  disabled
                />
              </div>

              <div className='col-12'>
                <div className='separator border-3 my-10'></div>
              </div>

              <div className='col-12'>
                <div className='row'>
                  <div className='col-xxl-10 col-md-10 col-lg-10 col-sm-12'>
                    <label htmlFor='' className='mb-3'>
                      Alamat Sesuai KTP
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-3'
                      name='sesuai_ktp_alamat'
                      placeholder='Alamat Sesuai KTP'
                      disabled
                    />
                  </div>
                  <div className='col-xxl-2 col-md-2 col-lg-2 col-sm-12'>
                    <label htmlFor='' className='mb-3'>
                      RT/RW
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='sesuai_ktp_rtrw'
                      placeholder='RT/RW'
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
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='sesuai_ktp_provinsi'
                      placeholder='Provinsi'
                      disabled
                    />
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                    <label htmlFor='' className='mb-3'>
                      Kab/Kota
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='sesuai_ktp_kabkota'
                      placeholder='Kab/Kota'
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <div className='row'>
                  <div className='col-xxl-6 col-md-10 col-lg-6 col-sm-12'>
                    <label htmlFor='' className='mb-3'>
                      Kecamatan
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='sesuai_ktp_kecamatan'
                      placeholder='Kecamatan'
                      disabled
                    />
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                    <label htmlFor='' className='mb-3'>
                      Kelurahan
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='sesuai_ktp_kelurahan'
                      placeholder='Kelurahan'
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className='col-12'>
                <div className='separator border-3 my-10'></div>
              </div>

              <div className='col-12 mt-4'>
                <div className='row'>
                  <div className='col-xxl-10 col-md-10 col-lg-10 col-sm-12'>
                    <label htmlFor='' className='mb-3'>
                      Alamat Domisili
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='domisili_alamat'
                      placeholder='Alamat Domisili'
                      disabled
                    />
                  </div>
                  <div className='col-xxl-2 col-md-2 col-lg-2 col-sm-12'>
                    <label htmlFor='' className='mb-3'>
                      RT/RW
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='domisili_rtrw'
                      placeholder='RT/RW'
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
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='domisili_provinsi'
                      placeholder='Provinsi'
                      disabled
                    />
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                    <label htmlFor='' className='mb-3'>
                      Kab/Kota
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='domisili_kabkota'
                      placeholder='Kab/Kota'
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <div className='row'>
                  <div className='col-xxl-6 col-md-10 col-lg-6 col-sm-12'>
                    <label htmlFor='' className='mb-3'>
                      Kecamatan
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='domisili_kecamatan'
                      placeholder='Kecamatan'
                      disabled
                    />
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                    <label htmlFor='' className='mb-3'>
                      Kelurahan
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='domisili_kelurahan'
                      placeholder='Kelurahan'
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='p-0 mt-6'>
              <div className='text-center'>
                <Link
                  className='text-reset text-decoration-none'
                  to='/kepegawaian/tab-daftar-urut-kepangkatan'
                >
                  <button className='float-none btn btn-secondary align-self-center m-1'>
                    Keluar
                  </button>
                </Link>
                <Link
                  className='text-reset text-decoration-none'
                  to={`/kepegawaian/tab-daftar-urut-kepangkatan/data-keluarga-duk/${id}/${status}`}
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
      </Formik>
      {/* end::Body */}
    </>
  )
}
