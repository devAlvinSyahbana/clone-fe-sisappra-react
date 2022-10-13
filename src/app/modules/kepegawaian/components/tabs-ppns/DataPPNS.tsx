import axios from 'axios'
import {Field, Formik, FormikHelpers} from 'formik'
import moment from 'moment'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {DetailPegawaiInterface} from '../KepegawaianInterface'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function DataPPNS() {
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
    <>
      {/* Second Card */}
      <Formik
        initialValues={{
          ...data,
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
              <h3 className='fw-bold m-0'>Data Penyidik Pegawai Negeri Sipil</h3>
            </div>
          </div>
          <div className='card-body p-9'>
            <div className='row'>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  SKPD
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='skpd'
                  placeholder='SKPD'
                  disabled
                />
              </div>
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
                  NIP
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='nip'
                  placeholder='nip'
                  disabled
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  NRK
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='nrk'
                  placeholder='nrk'
                  disabled
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Pangkat
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='pangkat'
                  placeholder='pangkat'
                  disabled
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Golongan
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='golongan'
                  placeholder='golongan'
                  disabled
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  NO. SK. PPNS
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='no.sk.ppns'
                  placeholder='no.sk.ppns'
                  disabled
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Wilayah Kerja
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='wilayah kerja'
                  placeholder='wilayah kerja'
                  disabled
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  UU yang dikawal
                </label>
                <Field
                  type='text'
                  className='form-control form-control form-control-solid mb-4'
                  name='uu yang dikawal'
                  placeholder='uu yang dikawal'
                  disabled
                />
              </div>
            </div>
            <div className='p-0 mt-6'>
              <div className='text-center'>
                <Link
                  className='text-reset text-decoration-none'
                  to='/kepegawaian/PenyidikPegawaiNegeriSipil/TabDataPPNS'
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
