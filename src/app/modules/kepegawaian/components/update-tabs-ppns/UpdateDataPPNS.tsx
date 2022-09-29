import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import AsyncSelect from 'react-select/async'
import {DetailPegawaiInterface, SelectOptionAutoCom} from '../KepegawaianInterface'
import {Formik, Field, FormikHelpers} from 'formik'
import moment from 'moment'
// import {DatePicker} from 'react-datepicker';

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const AGAMA_URL = `${API_URL}/master/agama`
export const KOTA_URL = `${API_URL}/master/kota`
export const KECAMATAN_URL = `${API_URL}/master/kecamatan`
export const KELURAHAN_URL = `${API_URL}/master/kelurahan`

export function UpdateDataPPNS() {
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

  const [inputValAgama, setDataAgama] = useState({label: '', value: null})
  const [inputValJenis, setDataJenis] = useState({label: '', value: null})
  const [inputValStatus, setDataStatus] = useState({label: '', value: null})

  const [inputValProvKtp, setDataProvKtp] = useState({label: '', value: null})
  const [inputValKotKtp, setDataKotKtp] = useState({label: '', value: null})
  const [inputValKecKtp, setDataKecKtp] = useState({label: '', value: null})
  const [inputValKelKtp, setDataKelKtp] = useState({label: '', value: null})

  const [inputValProvDom, setDataProvDom] = useState({label: '', value: null})
  const [inputValKotDom, setDataKotDom] = useState({label: '', value: null})
  const [inputValKecDom, setDataKecDom] = useState({label: '', value: null})
  const [inputValKelDom, setDataKelDom] = useState({label: '', value: null})

  // Select Agama
  const filterAgama = async (inputValue: string) => {
    const response = await axios.get(`${AGAMA_URL}/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.agama, value: i.id}))
  }
  const loadOptionsAgama = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterAgama(inputValue))
    }, 1000)
  }
  const handleInputAgama = (newValue: any) => {
    setDataAgama((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // Select Jenis Kelamin
  const filterJenis = async (inputValue: string) => {
    return jenisKelamin.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
  }
  const loadOptionsJenis = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterJenis(inputValue))
    }, 1000)
  }
  const handleInputJenis = (newValue: any) => {
    setDataJenis((prevstate: any) => ({...prevstate, ...newValue}))
  }

  const jenisKelamin = [
    {value: 'L', label: 'Laki-Laki'},
    {value: 'P', label: 'Perempuan'},
  ]

  // Select Status Perkawinan
  const filterStat = async (inputValue: string) => {
    // const response = await axios.get(`${AGAMA_URL}/filter/${inputValue}`)
    // const json = await response.data.data
    // return json.map((i: any) => ({ label: i.agama, value: i.id }))
  }
  const loadOptionsStat = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      // callback(await filterStat(inputValue))
    }, 1000)
  }
  const handleInputStat = (newValue: any) => {
    setDataStatus((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // Select Provinsi sesuai KTP
  const filterProvKtp = async (inputValue: string) => {
    // const response = await axios.get(`${AGAMA_URL}/filter/${inputValue}`)
    // const json = await response.data.data
    // return json.map((i: any) => ({ label: i.agama, value: i.id }))
  }
  const loadOptionsProvKtp = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      // callback(await filterProvKtp(inputValue))
    }, 1000)
  }
  const handleInputProvKtp = (newValue: any) => {
    setDataProvKtp((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // Select Kab/Kota sesuai KTP
  const filterKotKtp = async (inputValue: string) => {
    const response = await axios.get(`${KOTA_URL}/filter/${inputValue}`)
    const json = await response.data.data
    // return json.map((i: any) => ({ label: i.kota, value: i.id }))
  }
  const loadOptionsKotKtp = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      // callback(await filterKot(inputValue))
    }, 1000)
  }
  const handleInputKotKtp = (newValue: any) => {
    setDataKotKtp((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // Select Kecamatan
  const filterKecKtp = async (inputValue: string) => {
    const response = await axios.get(`${KECAMATAN_URL}/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.agama, value: i.id}))
  }
  const loadOptionsKecKtp = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKecKtp(inputValue))
    }, 1000)
  }
  const handleInputKecKtp = (newValue: any) => {
    setDataKecKtp((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // Select Kelurahan sesuai KTP
  const filterKelKtp = async (inputValue: string) => {
    const response = await axios.get(`${KELURAHAN_URL}/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.agama, value: i.id}))
  }
  const loadOptionsKelKtp = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKelKtp(inputValue))
    }, 1000)
  }
  const handleInputKelKtp = (newValue: any) => {
    setDataKecKtp((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // Select Provinsi Alamat Domisili
  const filterProvDom = async (inputValue: string) => {
    // const response = await axios.get(`${AGAMA_URL}/filter/${inputValue}`)
    // const json = await response.data.data
    // return json.map((i: any) => ({ label: i.agama, value: i.id }))
  }
  const loadOptionsProvDom = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      // callback(await filterProvDom(inputValue))
    }, 1000)
  }
  const handleInputProvDom = (newValue: any) => {
    setDataProvDom((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // Select Kab/Kota Alamat Domisili
  const filterKotDom = async (inputValue: string) => {
    const response = await axios.get(`${KOTA_URL}/filter/${inputValue}`)
    const json = await response.data.data
    // return json.map((i: any) => ({ label: i.kota, value: i.id }))
  }
  const loadOptionsKotDom = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      // callback(await filterKot(inputValue))
    }, 1000)
  }
  const handleInputKotDom = (newValue: any) => {
    setDataKotDom((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // Select Kecamatan
  const filterKecDom = async (inputValue: string) => {
    const response = await axios.get(`${KECAMATAN_URL}/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.agama, value: i.id}))
  }
  const loadOptionsKecDom = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKecDom(inputValue))
    }, 1000)
  }
  const handleInputKecDom = (newValue: any) => {
    setDataKecDom((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // Select Kelurahan Alamat Domisili
  const filterKelDom = async (inputValue: string) => {
    const response = await axios.get(`${KELURAHAN_URL}/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.agama, value: i.id}))
  }
  const loadOptionsKelDom = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKelDom(inputValue))
    }, 1000)
  }
  const handleInputKelDom = (newValue: any) => {
    setDataKecDom((prevstate: any) => ({...prevstate, ...newValue}))
  }

  return (
    <>
      {/* begin::Body */}
      <Formik
        initialValues={{
          ...data,
          tgl_lahir: moment(data?.tgl_lahir).format('YYYY-MM-D'),
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
                  className='form-control form-control form-control-solid mb-4'
                  name='nama'
                  id='nama'
                  placeholder='John'
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Nama
                </label>
                <Field
                  className='form-control form-control form-control-solid mb-4'
                  name='nama'
                  id='nama'
                  placeholder='John'
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  NIP / NRK
                </label>
                <Field
                  className='form-control form-control form-control-solid mb-4'
                  name='nama'
                  id='nama'
                  placeholder='John'
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Pangkat
                </label>
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptionsJenis}
                  defaultOptions
                  value={{
                    value: data?.jenis_kelamin,
                    label: data?.jenis_kelamin ? data?.jenis_kelamin : 'Pilih Pangkat',
                  }}
                  onChange={handleInputJenis}
                  placeholder={'Pilih'}
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Golongan
                </label>
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptionsJenis}
                  defaultOptions
                  value={{
                    value: data?.jenis_kelamin,
                    label: data?.jenis_kelamin ? data?.jenis_kelamin : 'Pilih Golongan',
                  }}
                  onChange={handleInputJenis}
                  placeholder={'Pilih'}
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  NO. SK. PPNS
                </label>
                <Field
                  className='form-control form-control form-control-solid mb-4'
                  name='nama'
                  id='nama'
                  placeholder='John'
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Masa berlaku KTP PPNS
                </label>
                <div className='row'>
                  <div className='col-xxl-12 col-md-12 col-lg-12 col-sm-12'>
                    <Field
                      type='date'
                      name='tgl_lahir'
                      className='form-control form-control-solid'
                      placeholder='Tanggal Lahir'
                    />
                    {/* <DatePicker
                      dateFormat="MM/dd/yyyy"
                      name="tgl_lahir"
                    /> */}
                  </div>
                </div>
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  Wilayah Kerja
                </label>
                <Field
                  className='form-control form-control form-control-solid mb-4'
                  name='nama'
                  id='nama'
                  placeholder='John'
                />
              </div>
              <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  UU yang dikawal
                </label>
                <Field
                  className='form-control form-control form-control-solid mb-4'
                  name='nama'
                  id='nama'
                  placeholder='John'
                />
              </div>

              <div className='col-12 mb-4'>
                <hr className='fg-gray' />
              </div>
            </div>
            <div className='p-0 mt-6'>
              <div className='text-center'>
                <Link
                  className='text-reset text-decoration-none'
                  to='/kepegawaian/PenyidikPegawaiNegeriSipil/TabDataPPNS/'
                >
                  <button className='float-none btn btn-secondary align-self-center m-1'>
                    <i className='fa fa-close'></i>
                    Batal
                  </button>
                </Link>
                <Link
                  className='text-reset text-decoration-none'
                  to={`/kepegawaian/TabDaftarUrutKepangkatan/UpdateDataKeluargaDUK/${id}/${status}`}
                >
                  <button className='float-none btn btn-primary align-self-center m-1'>
                  <i className='fa-solid fa-paper-plane'></i>
                    Simpan
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
