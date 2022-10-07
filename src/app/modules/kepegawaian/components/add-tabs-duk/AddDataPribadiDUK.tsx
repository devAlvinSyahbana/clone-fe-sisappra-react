import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams, useNavigate} from 'react-router-dom'
import AsyncSelect from 'react-select/async'
import {AddHeaderDetailDUK} from './AddHeaderDetailDUK'
import {DetailPegawaiInterface, SelectOptionAutoCom} from '../KepegawaianInterface'
import {Formik, Field, FormikHelpers} from 'formik'
import moment from 'moment'
import Swal from 'sweetalert2'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const AGAMA_URL = `${API_URL}/master/agama`
export const KOTA_URL = `${API_URL}/master/kota`
export const KECAMATAN_URL = `${API_URL}/master/kecamatan`
export const KELURAHAN_URL = `${API_URL}/master/kelurahan`
export const GLOBAL_URL = `${API_URL}/master`

export function AddDataPribadiDUK() {
  const {id, status} = useParams()
  const [data, setData] = useState<DetailPegawaiInterface>({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KEPEGAWAIAN_URL}/findone/${id}/${status}`)
      setData((prevstate) => ({...prevstate, ...response.data.data}))
    }
    fetchData()
  }, [setData, id, status])

  const [valuesFormik, setValuesFormik] = useState<DetailPegawaiInterface>({})

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
  const jenisKelamin = [
    {value: 'L', label: 'Laki-Laki'},
    {value: 'P', label: 'Perempuan'},
  ]

  // Select Status Perkawinan
  const filterStatPerkawinan = async (inputValue: string) => {
    return optionsStatKawin.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
  }
  const loadOptionsStatPerkawinan = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterStatPerkawinan(inputValue))
    }, 1000)
  }
  const optionsStatKawin = [
    {value: 'Sudah Menikah', label: 'Sudah Menikah'},
    {value: 'Belum Menikah', label: 'Belum Menikah'},
  ]

  // Select Provinsi sesuai KTP
  const [idOptProvKTP, setidOptProvKTP] = useState(null)
  const filterProvKTP = async (inputValue: string) => {
    const response = await axios.get(`${GLOBAL_URL}/global-provinsi/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.name, value: i.id}))
  }
  const loadOptionsProvKTP = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterProvKTP(inputValue))
    }, 1000)
  }

  // Select Kab/Kota sesuai KTP
  const [idOptKotKTP, setidOptKotKTP] = useState(null)
  const filterKotKTP = async (inputValue: string) => {
    const response = await axios.get(
      `${GLOBAL_URL}/global-kab-kota/filter/${idOptProvKTP}/${inputValue}`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.name, value: i.id}))
  }
  const loadOptionsKotKTP = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKotKTP(inputValue))
    }, 1000)
  }

  // Select Kecamatan sesuai KTP
  const [idOptKecKTP, setidOptKecKTP] = useState(null)
  const filterKecKTP = async (inputValue: string) => {
    const response = await axios.get(
      `${GLOBAL_URL}/global-kecamatan/filter/${idOptKotKTP}/${inputValue}`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.name, value: i.id}))
  }
  const loadOptionsKecKTP = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKecKTP(inputValue))
    }, 1000)
  }

  // Select Kelurahan sesuai KTP
  const filterKelKTP = async (inputValue: string) => {
    const response = await axios.get(
      `${GLOBAL_URL}/global-kelurahan/filter/${idOptKecKTP}/${inputValue}`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.name, value: i.id}))
  }
  const loadOptionsKelKTP = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKelKTP(inputValue))
    }, 1000)
  }

  // Select Provinsi Alamat Domisili
  const [idOptProvDom, setidOptProvDom] = useState(null)
  const filterProvDom = async (inputValue: string) => {
    const response = await axios.get(`${GLOBAL_URL}/global-provinsi/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.name, value: i.id}))
  }
  const loadOptionsProvDom = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterProvDom(inputValue))
    }, 1000)
  }

  // Select Kab/Kota Alamat Domisili
  const [idOptKotDom, setidOptKotDom] = useState(null)
  const filterKotDom = async (inputValue: string) => {
    const response = await axios.get(
      `${GLOBAL_URL}/global-kab-kota/filter/${idOptProvDom}/${inputValue}`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.name, value: i.id}))
  }
  const loadOptionsKotDom = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKotDom(inputValue))
    }, 1000)
  }

  // Select Kecamatan Alamat Domisili
  const [idOptKecDom, setidOptKecDom] = useState(null)
  const filterKecDom = async (inputValue: string) => {
    const response = await axios.get(
      `${GLOBAL_URL}/global-kecamatan/filter/${idOptKotDom}/${inputValue}`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.name, value: i.id}))
  }
  const loadOptionsKecDom = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKecDom(inputValue))
    }, 1000)
  }

  // Select Kelurahan Alamat Domisili
  const filterKelDom = async (inputValue: string) => {
    const response = await axios.get(
      `${GLOBAL_URL}/global-kelurahan/filter/${idOptKecDom}/${inputValue}`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.name, value: i.id}))
  }
  const loadOptionsKelDom = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKelDom(inputValue))
    }, 1000)
  }

  const handleChangeFormikSelect = (value: any, name: string) => {
    // ktp
    if (name === 'sesuai_ktp_kabkota') {
      setidOptKotKTP(value.value)
      setValuesFormik((prevValues: any) => ({
        ...prevValues,
        sesuai_ktp_kecamatan: null,
        sesuai_ktp_kelurahan: null,
      }))
    }
    if (name === 'sesuai_ktp_kecamatan') {
      setidOptKecKTP(value.value)
      setValuesFormik((prevValues: any) => ({
        ...prevValues,
        sesuai_ktp_kelurahan: null,
      }))
    }
    if (name === 'sesuai_ktp_provinsi') {
      setidOptProvKTP(value.value)
      setValuesFormik((prevValues: any) => ({
        ...prevValues,
        sesuai_ktp_kabkota: null,
        sesuai_ktp_kecamatan: null,
        sesuai_ktp_kelurahan: null,
      }))
    }
    // domisili
    if (name === 'domisili_kabkota') {
      setidOptKotDom(value.value)
      setValuesFormik((prevValues: any) => ({
        ...prevValues,
        domisili_kecamatan: null,
        domisili_kelurahan: null,
      }))
    }
    if (name === 'domisili_kecamatan') {
      setidOptKecDom(value.value)
      setValuesFormik((prevValues: any) => ({
        ...prevValues,
        domisili_kelurahan: null,
      }))
    }
    if (name === 'domisili_provinsi') {
      setidOptProvDom(value.value)
      setValuesFormik((prevValues: any) => ({
        ...prevValues,
        domisili_kabkota: null,
        domisili_kecamatan: null,
        domisili_kelurahan: null,
      }))
    }

    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  return (
    <>
      {/* begin::Body */}
      <AddHeaderDetailDUK />
      {/* Second Card */}

      <Formik
        initialValues={{
          ...data,
          tgl_lahir: moment(data?.tgl_lahir).format('YYYY-MM-D'),
        }}
        onSubmit={async function (
          values: DetailPegawaiInterface,
          {setSubmitting}: FormikHelpers<DetailPegawaiInterface>
        ) {
          setSubmitting(false)
          const bodyParam: DetailPegawaiInterface = {
            nama: values.nama,
            tempat_lahir: values.tempat_lahir,
            tgl_lahir: values.tgl_lahir,
            jenis_kelamin: valuesFormik?.jenis_kelamin?.value
              ? valuesFormik.jenis_kelamin.value
              : values.jenis_kelamin_value,
            agama: valuesFormik?.agama?.value ? valuesFormik.agama.value : values.agama_id,
            nik: values.nik,
            no_kk: values.no_kk,
            status_perkawinan: valuesFormik?.status_perkawinan?.value
              ? valuesFormik.status_perkawinan.value
              : values.status_perkawinan,
            no_hp: values.no_hp,
            sesuai_ktp_alamat: values.sesuai_ktp_alamat,
            sesuai_ktp_rtrw: values.sesuai_ktp_rtrw,
            sesuai_ktp_provinsi: valuesFormik?.sesuai_ktp_provinsi?.value
              ? valuesFormik.sesuai_ktp_provinsi.value
              : values.sesuai_ktp_provinsi,
            sesuai_ktp_kabkota: valuesFormik?.sesuai_ktp_kabkota?.value
              ? valuesFormik.sesuai_ktp_kabkota.value
              : values.sesuai_ktp_kabkota,
            sesuai_ktp_kecamatan: valuesFormik?.sesuai_ktp_kecamatan?.value
              ? valuesFormik.sesuai_ktp_kecamatan.value
              : values.sesuai_ktp_kecamatan,
            sesuai_ktp_kelurahan: valuesFormik?.sesuai_ktp_kelurahan?.value
              ? valuesFormik.sesuai_ktp_kelurahan.value
              : values.sesuai_ktp_kelurahan,
            domisili_alamat: values.domisili_alamat,
            domisili_rtrw: values.domisili_rtrw,
            domisili_provinsi: valuesFormik?.domisili_provinsi?.value
              ? valuesFormik.domisili_provinsi.value
              : values.domisili_provinsi,
            domisili_kabkota: valuesFormik?.domisili_kabkota?.value
              ? valuesFormik.domisili_kabkota.value
              : values.domisili_kabkota,
            domisili_kecamatan: valuesFormik?.domisili_kecamatan?.value
              ? valuesFormik.domisili_kecamatan.value
              : values.domisili_kecamatan,
            domisili_kelurahan: valuesFormik?.domisili_kelurahan?.value
              ? valuesFormik.domisili_kelurahan.value
              : values.domisili_kelurahan,
            kepegawaian_nrk: values.kepegawaian_nrk,
            kepegawaian_nip: values.kepegawaian_nip,
            kepegawaian_pangkat: values.kepegawaian_pangkat_id,
            kepegawaian_golongan: values.kepegawaian_golongan_id,
            kepegawaian_tmtpangkat: values.kepegawaian_tmtpangkat,
            kepegawaian_pendidikan_pada_sk: values.kepegawaian_pendidikan_pada_sk_id,
            kepegawaian_jabatan: values.kepegawaian_jabatan_id,
            kepegawaian_eselon: values.kepegawaian_eselon_id,
            kepegawaian_tempat_tugas: values.kepegawaian_tempat_tugas,
            kepegawaian_subbag_seksi_kecamatan: values.kepegawaian_subbag_seksi_kecamatan,
            kepegawaian_kelurahan: values.kepegawaian_kelurahan,
            kepegawaian_status_pegawai: values.kepegawaian_status_pegawai,
            kepegawaian_no_rekening: values.kepegawaian_no_rekening,
            kepegawaian_no_karpeg: values.kepegawaian_no_karpeg,
            kepegawaian_no_kasirkasur: values.kepegawaian_no_kasirkasur,
            kepegawaian_no_taspen: values.kepegawaian_no_taspen,
            kepegawaian_npwp: values.kepegawaian_npwp,
            kepegawaian_no_bpjs_askes: values.kepegawaian_no_bpjs_askes,
            kepegawaian_tmt_cpns: values.kepegawaian_tmt_cpns,
            kepegawaian_sk_cpns: values.kepegawaian_sk_cpns,
            kepegawaian_tmt_pns: values.kepegawaian_tmt_pns,
            kepegawaian_tgl_sk_pns: values.kepegawaian_tgl_sk_pns,
            kepegawaian_no_sk_pangkat_terakhir: values.kepegawaian_no_sk_pangkat_terakhir,
            kepegawaian_tgl_sk_pangkat_terakhir: values.kepegawaian_tgl_sk_pangkat_terakhir,
            kepegawaian_diklat_pol_pp_dasar: values.kepegawaian_diklat_pol_pp_dasar,
            kepegawaian_diklat_pol_pp_dasar_no_sertifikat:
              values.kepegawaian_diklat_pol_pp_dasar_no_sertifikat,
            kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat:
              values.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat,
            kepegawaian_diklat_pol_pp_strutural: values.kepegawaian_diklat_pol_pp_strutural,
            kepegawaian_diklat_pol_pp_strutural_no_sertifikat:
              values.kepegawaian_diklat_pol_pp_strutural_no_sertifikat,
            kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat:
              values.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat,
            kepegawaian_diklat_pol_pp_ppns: values.kepegawaian_diklat_pol_pp_ppns,
            kepegawaian_diklat_pol_pp_ppns_no_sertifikat:
              values.kepegawaian_diklat_pol_pp_ppns_no_sertifikat,
            kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat:
              values.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat,
            kepegawaian_diklat_fungsional_pol_pp: values.kepegawaian_diklat_fungsional_pol_pp,
            kepegawaian_diklat_fungsional_pol_pp_no_sertifikat:
              values.kepegawaian_diklat_fungsional_pol_pp_no_sertifikat,
            kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat:
              values.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat,
          }
          try {
            const response = await axios.put(`${KEPEGAWAIAN_URL}/update/${id}/${status}`, bodyParam)
            if (response) {
              Swal.fire({
                icon: 'success',
                title: 'Data berhasil disimpan',
                showConfirmButton: false,
                timer: 1500,
              })
              navigate(`/kepegawaian/InformasiDataPegawai/UpdateDataPribadi/${id}/${status}`, {
                replace: true,
              })
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Data gagal disimpan, harap mencoba lagi',
              showConfirmButton: false,
              timer: 1500,
            })
            console.error(error)
          }
        }}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
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
                      className='form-control form-control form-control-solid mb-4'
                      name='nama'
                      id='nama'
                      placeholder='John'
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
                          name='tempat_lahir'
                          className='form-control form-control form-control-solid mb-4'
                          placeholder='Tempat'
                        />
                      </div>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                        <Field
                          type='date'
                          name='tgl_lahir'
                          className='form-control form-control-solid'
                          placeholder='Tanggal Lahir'
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
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsJenis}
                          defaultOptions
                          value={
                            valuesFormik?.jenis_kelamin
                              ? valuesFormik?.jenis_kelamin
                              : data?.jenis_kelamin
                              ? {
                                  value: data?.jenis_kelamin,
                                  label: data?.jenis_kelamin ? data?.jenis_kelamin : '-',
                                }
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => handleChangeFormikSelect(e, 'jenis_kelamin')}
                          placeholder={'Pilih'}
                        />
                      </div>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                        <label htmlFor='' className='mb-3'>
                          Agama
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsAgama}
                          defaultOptions
                          value={
                            valuesFormik?.agama
                              ? valuesFormik?.agama
                              : data?.agama_id
                              ? {
                                  value: data?.agama_id,
                                  label: data?.agama_name ? data?.agama_name : '-',
                                }
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => handleChangeFormikSelect(e, 'agama')}
                          placeholder={'Pilih'}
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
                          name='nik'
                          className='form-control form-control form-control-solid mb-4'
                          placeholder='NIK'
                        />
                      </div>
                      <div className='col-6'>
                        <label htmlFor='' className='mb-3'>
                          Nomor KK
                        </label>
                        <Field
                          type='text'
                          name='no_kk'
                          className='form-control form-control form-control-solid mb-4'
                          placeholder='Nomor KK'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xxl-4 col-md-4 col-lg-4 col-sm-12'>
                      <label htmlFor='' className='mb-3'>
                        Status Perkawinan
                      </label>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={loadOptionsStatPerkawinan}
                        defaultOptions
                        value={
                          valuesFormik?.status_perkawinan
                            ? valuesFormik?.status_perkawinan
                            : data?.status_perkawinan
                            ? {
                                value: data?.status_perkawinan,
                                label: data?.status_perkawinan ? data?.status_perkawinan : '-',
                              }
                            : {value: '', label: 'Pilih'}
                        }
                        onChange={(e) => handleChangeFormikSelect(e, 'status_perkawinan')}
                        placeholder={'Pilih'}
                      />
                    </div>
                    <div className='col-xxl-4 col-md-4 col-lg-4 col-sm-12'>
                      <label htmlFor='' className='mb-3'>
                        Umur
                      </label>
                      <Field
                        type='number'
                        className='form-control form-control form-control-solid mb-4'
                        name='umur'
                        placeholder='Umur'
                      />
                    </div>
                    <div className='col-xxl-4 col-md-4 col-lg-4 col-sm-12'>
                      <label htmlFor='' className='mb-3'>
                        Nomor HP
                      </label>
                      <Field
                        type='text'
                        className='form-control form-control form-control-solid mb-4'
                        name='no_hp'
                        placeholder='Nomor HP'
                      />
                    </div>
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
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsProvKTP}
                          defaultOptions
                          value={
                            valuesFormik?.sesuai_ktp_provinsi
                              ? valuesFormik?.sesuai_ktp_provinsi
                              : data?.sesuai_ktp_provinsi
                              ? {
                                  value: data?.sesuai_ktp_provinsi,
                                  label: data?.sesuai_ktp_provinsi
                                    ? data?.sesuai_ktp_provinsi
                                    : '-',
                                }
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => handleChangeFormikSelect(e, 'sesuai_ktp_provinsi')}
                          placeholder={'Pilih'}
                        />
                      </div>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                        <label htmlFor='' className='mb-3'>
                          Kab/Kota
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKotKTP}
                          defaultOptions
                          value={
                            valuesFormik?.sesuai_ktp_kabkota
                              ? valuesFormik?.sesuai_ktp_kabkota
                              : data?.sesuai_ktp_kabkota
                              ? {
                                  value: data?.sesuai_ktp_kabkota,
                                  label: data?.sesuai_ktp_kabkota ? data?.sesuai_ktp_kabkota : '-',
                                }
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => handleChangeFormikSelect(e, 'sesuai_ktp_kabkota')}
                          placeholder={'Pilih'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                    <div className='row'>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                        <label htmlFor='' className='mb-3'>
                          Kecamatan
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKecKTP}
                          defaultOptions
                          value={
                            valuesFormik?.sesuai_ktp_kecamatan
                              ? valuesFormik?.sesuai_ktp_kecamatan
                              : data?.sesuai_ktp_kecamatan
                              ? {
                                  value: data?.sesuai_ktp_kecamatan,
                                  label: data?.sesuai_ktp_kecamatan
                                    ? data?.sesuai_ktp_kecamatan
                                    : '-',
                                }
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => handleChangeFormikSelect(e, 'sesuai_ktp_kecamatan')}
                          placeholder={'Pilih'}
                        />
                      </div>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                        <label htmlFor='' className='mb-3'>
                          Kelurahan
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKelKTP}
                          defaultOptions
                          value={
                            valuesFormik?.sesuai_ktp_kelurahan
                              ? valuesFormik?.sesuai_ktp_kelurahan
                              : data?.sesuai_ktp_kelurahan
                              ? {
                                  value: data?.sesuai_ktp_kelurahan,
                                  label: data?.sesuai_ktp_kelurahan
                                    ? data?.sesuai_ktp_kelurahan
                                    : '-',
                                }
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => handleChangeFormikSelect(e, 'sesuai_ktp_kelurahan')}
                          placeholder={'Pilih'}
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
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsProvDom}
                          defaultOptions
                          value={
                            valuesFormik?.domisili_provinsi
                              ? valuesFormik?.domisili_provinsi
                              : data?.domisili_provinsi
                              ? {
                                  value: data?.domisili_provinsi,
                                  label: data?.domisili_provinsi ? data?.domisili_provinsi : '-',
                                }
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => handleChangeFormikSelect(e, 'domisili_provinsi')}
                          placeholder={'Pilih'}
                        />
                      </div>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                        <label htmlFor='' className='mb-3'>
                          Kab/Kota
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKotDom}
                          defaultOptions
                          value={
                            valuesFormik?.domisili_kabkota
                              ? valuesFormik?.domisili_kabkota
                              : data?.domisili_kabkota
                              ? {
                                  value: data?.domisili_kabkota,
                                  label: data?.domisili_kabkota ? data?.domisili_kabkota : '-',
                                }
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => handleChangeFormikSelect(e, 'domisili_kabkota')}
                          placeholder={'Pilih'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                    <div className='row'>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                        <label htmlFor='' className='mb-3'>
                          Kecamatan
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKecDom}
                          defaultOptions
                          value={
                            valuesFormik?.domisili_kecamatan
                              ? valuesFormik?.domisili_kecamatan
                              : data?.domisili_kecamatan
                              ? {
                                  value: data?.domisili_kecamatan,
                                  label: data?.domisili_kecamatan ? data?.domisili_kecamatan : '-',
                                }
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => handleChangeFormikSelect(e, 'domisili_kecamatan')}
                          placeholder={'Pilih'}
                        />
                      </div>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12'>
                        <label htmlFor='' className='mb-3'>
                          Kelurahan
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKelDom}
                          defaultOptions
                          value={
                            valuesFormik?.domisili_kelurahan
                              ? valuesFormik?.domisili_kelurahan
                              : data?.domisili_kelurahan
                              ? {
                                  value: data?.domisili_kelurahan,
                                  label: data?.domisili_kelurahan ? data?.domisili_kelurahan : '-',
                                }
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => handleChangeFormikSelect(e, 'domisili_kelurahan')}
                          placeholder={'Pilih'}
                        />
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
                    <button
                      type='submit'
                      className='float-none btn btn-primary align-self-center m-1'
                    >
                      <i className='fa-solid fa-save'></i>
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      {/* end::Body */}
    </>
  )
}
