import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams, useNavigate} from 'react-router-dom'
import AsyncSelect from 'react-select/async'
import {UpdateHeaderDetail} from './UpdateHeaderDetail'
import {DetailPegawaiInterface, SelectOptionAutoCom} from '../KepegawaianInterface'
import {Formik, Field, FormikHelpers} from 'formik'
import moment from 'moment'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import clsx from 'clsx'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const AGAMA_URL = `${API_URL}/master/agama`
export const KOTA_URL = `${API_URL}/master/kota`
export const KECAMATAN_URL = `${API_URL}/master/kecamatan`
export const KELURAHAN_URL = `${API_URL}/master/kelurahan`
export const GLOBAL_URL = `${API_URL}/master`

const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

const reactSelectLightThem = {
  input: (base: object) => ({
    ...base,
    color: '#5e6278',
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
  container: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    color: '#cccccc',
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: '#cccccc',
  }),
  control: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
    boxShadow: '0 0 0 1px #f5f8fa',
  }),
  singleValue: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
  }),
  option: (base: object) => ({
    ...base,
    height: '100%',
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
}

const reactSelectDarkThem = {
  input: (base: object) => ({
    ...base,
    color: '#92929f',
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
  container: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    color: '#92929f',
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: '#92929f',
  }),
  control: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
    boxShadow: '0 0 0 1px #1b1b29',
  }),
  singleValue: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
  }),
  option: (base: object) => ({
    ...base,
    height: '100%',
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
}

const validatorForm = Yup.object().shape({
  nama: Yup.string().required('Wajib diisi'),
  tempat_lahir: Yup.string().required('Wajib diisi'),
  tgl_lahir: Yup.string().required('Wajib diisi'),
  nik: Yup.string()
    .matches(/^[0-9]+$/, 'Isian harus berupa angka')
    .required('Wajib diisi'),
  no_kk: Yup.string()
    .matches(/^[0-9]+$/, 'Isian harus berupa angka')
    .required('Wajib diisi'),
  no_hp: Yup.string()
    .matches(/^[0-9]+$/, 'Isian harus berupa angka')
    .required('Wajib diisi'),
  sesuai_ktp_alamat: Yup.string().required('Wajib diisi'),
  sesuai_ktp_rtrw: Yup.string().required('Wajib diisi'),
  domisili_alamat: Yup.string().required('Wajib diisi'),
  domisili_rtrw: Yup.string().required('Wajib diisi'),
  status_perkawinan: Yup.string().required('Wajib diisi'),
  jenis_kelamin: Yup.string().required('Wajib diisi'),
  sesuai_ktp_provinsi: Yup.string().required('Wajib diisi'),
  sesuai_ktp_kabkota: Yup.string().required('Wajib diisi'),
  sesuai_ktp_kecamatan: Yup.string().required('Wajib diisi'),
  sesuai_ktp_kelurahan: Yup.string().required('Wajib diisi'),
  domisili_provinsi: Yup.string().required('Wajib diisi'),
  domisili_kabkota: Yup.string().required('Wajib diisi'),
  domisili_kecamatan: Yup.string().required('Wajib diisi'),
  domisili_kelurahan: Yup.string().required('Wajib diisi'),
})

export function UpdateDataPribadi() {
  const {id, status} = useParams()
  const [data, setData] = useState<DetailPegawaiInterface>({})
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KEPEGAWAIAN_URL}/findone/${id}/${status}`)
      setData((prevstate) => ({...prevstate, ...response.data.data}))
      getProvVal(response.data.data.domisili_provinsi, 'domisili_provinsi')
      getProvVal(response.data.data.sesuai_ktp_provinsi, 'sesuai_ktp_provinsi')
      getKabKotaVal(response.data.data.domisili_kabkota, 'domisili_kabkota')
      getKabKotaVal(response.data.data.sesuai_ktp_kabkota, 'sesuai_ktp_kabkota')
      getKecVal(response.data.data.domisili_kecamatan, 'domisili_kecamatan')
      getKecVal(response.data.data.sesuai_ktp_kecamatan, 'sesuai_ktp_kecamatan')
      getKelVal(response.data.data.domisili_kelurahan, 'domisili_kelurahan')
      getKelVal(response.data.data.sesuai_ktp_kelurahan, 'sesuai_ktp_kelurahan')
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

  const [valProvKTP, setValProvKTP] = useState({value: '', label: ''})
  const [valProvDomisili, setValProvDomisili] = useState({value: '', label: ''})
  const getProvVal = async (params: any, field: string) => {
    if (params)
      return await axios
        .get(`${GLOBAL_URL}/global-provinsi/findone/${params}`)
        .then((response) => {
          if (field === 'sesuai_ktp_provinsi') {
            setidOptProvKTP(response?.data?.data?.id)
            setValProvKTP((prevstate) => ({
              ...prevstate,
              value: response?.data?.data?.id,
              label: response?.data?.data?.name,
            }))
          }
          if (field === 'domisili_provinsi') {
            setidOptProvDom(response?.data?.data?.id)
            setValProvDomisili((prevstate) => ({
              ...prevstate,
              value: response?.data?.data?.id,
              label: response?.data?.data?.name,
            }))
          }
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const [valKabKotaKTP, setValKabKotaKTP] = useState({value: '', label: ''})
  const [valKabKotaDomisili, setValKabKotaDomisili] = useState({value: '', label: ''})
  const getKabKotaVal = async (params: any, field: string) => {
    if (params)
      return await axios
        .get(`${GLOBAL_URL}/global-kab-kota/findone/${params}`)
        .then((response) => {
          if (field === 'sesuai_ktp_kabkota') {
            setidOptKotKTP(response?.data?.data?.id)
            setValKabKotaKTP((prevstate) => ({
              ...prevstate,
              value: response?.data?.data?.id,
              label: response?.data?.data?.name,
            }))
          }
          if (field === 'domisili_kabkota') {
            setidOptKotDom(response?.data?.data?.id)
            setValKabKotaDomisili((prevstate) => ({
              ...prevstate,
              value: response?.data?.data?.id,
              label: response?.data?.data?.name,
            }))
          }
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const [valKecKTP, setValKecKTP] = useState({value: '', label: ''})
  const [valKecDomisili, setValKecDomisili] = useState({value: '', label: ''})
  const getKecVal = async (params: any, field: string) => {
    if (params)
      return await axios
        .get(`${GLOBAL_URL}/global-kecamatan/findone/${params}`)
        .then((response) => {
          if (field === 'sesuai_ktp_kecamatan') {
            setidOptKecKTP(response?.data?.data?.id)
            setValKecKTP((prevstate) => ({
              ...prevstate,
              value: response?.data?.data?.id,
              label: response?.data?.data?.name,
            }))
          }
          if (field === 'domisili_kecamatan') {
            setidOptKecDom(response?.data?.data?.id)
            setValKecDomisili((prevstate) => ({
              ...prevstate,
              value: response?.data?.data?.id,
              label: response?.data?.data?.name,
            }))
          }
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const [valKelKTP, setValKelKTP] = useState({value: '', label: ''})
  const [valKelDomisili, setValKelDomisili] = useState({value: '', label: ''})
  const getKelVal = async (params: any, field: string) => {
    if (params)
      return await axios
        .get(`${GLOBAL_URL}/global-kelurahan/findone/${params}`)
        .then((response) => {
          if (field === 'sesuai_ktp_kelurahan') {
            setValKelKTP((prevstate) => ({
              ...prevstate,
              value: response?.data?.data?.id,
              label: response?.data?.data?.name,
            }))
          }
          if (field === 'domisili_kelurahan') {
            setValKelDomisili((prevstate) => ({
              ...prevstate,
              value: response?.data?.data?.id,
              label: response?.data?.data?.name,
            }))
          }
        })
        .catch((error) => {
          console.log(error)
        })
  }

  return (
    <>
      {/* begin::Body */}
      <UpdateHeaderDetail />
      {/* Second Card */}

      <Formik
        initialValues={{
          ...data,
          tgl_lahir: moment(data?.tgl_lahir).format('YYYY-MM-D'),
        }}
        validationSchema={validatorForm}
        onSubmit={async function (
          values: DetailPegawaiInterface,
          {setSubmitting}: FormikHelpers<DetailPegawaiInterface>
        ) {
          Swal.fire({
            title: 'Anda yakin?',
            text: 'Ingin menyimpan perubahan data ini',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!',
            cancelButtonText: 'Tidak!',
          }).then(async (result) => {
            if (result.isConfirmed) {
              setSubmitting(true)
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
                const response = await axios.put(
                  `${KEPEGAWAIAN_URL}/update/${id}/${status}`,
                  bodyParam
                )
                if (response) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Data berhasil disimpan',
                    showConfirmButton: false,
                    timer: 1500,
                  })
                  navigate(
                    `/kepegawaian/informasi-data-pegawai/ubah-data-pribadi/${id}/${status}`,
                    {
                      replace: true,
                    }
                  )
                }
                setSubmitting(false)
              } catch (error) {
                Swal.fire({
                  icon: 'error',
                  title: 'Data gagal disimpan, harap mencoba lagi',
                  showConfirmButton: false,
                  timer: 1500,
                })
                setSubmitting(false)
                console.error(error)
              }
            }
          })
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
          isValid,
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
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Nama
                    </label>
                    <Field
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': touched.nama && errors.nama,
                        },
                        {
                          'is-valid': touched.nama && !errors.nama,
                        }
                      )}
                      name='nama'
                      id='nama'
                      placeholder='Nama'
                    />
                    {touched.nama && errors.nama && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.nama}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Tempat, Tanggal Lahir
                    </label>
                    <div className='row'>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                        <Field
                          type='text'
                          name='tempat_lahir'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid': touched.tempat_lahir && errors.tempat_lahir,
                            },
                            {
                              'is-valid': touched.tempat_lahir && !errors.tempat_lahir,
                            }
                          )}
                          placeholder='Tempat'
                        />
                        {touched.tempat_lahir && errors.tempat_lahir && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.tempat_lahir}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                        <Field
                          type='date'
                          name='tgl_lahir'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid': touched.tgl_lahir && errors.tgl_lahir,
                            },
                            {
                              'is-valid': touched.tgl_lahir && !errors.tgl_lahir,
                            }
                          )}
                          placeholder='Tanggal Lahir'
                        />
                        {touched.tgl_lahir && errors.tgl_lahir && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.tgl_lahir}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                    <div className='row'>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
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
                          onChange={(e) => {
                            handleChangeFormikSelect(e, 'jenis_kelamin')
                            handleChange('jenis_kelamin')(e.value)
                          }}
                          placeholder={'Pilih'}
                          loadingMessage={() => 'Sedang mencari pilihan...'}
                          noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                          name='jenis_kelamin'
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                        />
                        {touched.jenis_kelamin && errors.jenis_kelamin && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>Wajib Diisi</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
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
                          onChange={(e) => {
                            handleChangeFormikSelect(e, 'agama')
                            handleChange('agama')(e.value)
                          }}
                          placeholder={'Pilih'}
                          loadingMessage={() => 'Sedang mencari pilihan...'}
                          noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                          name='agama'
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                        />
                        {touched.jenis_kelamin && errors.jenis_kelamin && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>Wajib Diisi</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                    <div className='row'>
                      <div className='col-6'>
                        <label htmlFor='' className='mb-3 required'>
                          NIK
                        </label>
                        <Field
                          type='text'
                          name='nik'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid': touched.nik && errors.nik,
                            },
                            {
                              'is-valid': touched.nik && !errors.nik,
                            }
                          )}
                          placeholder='NIK'
                        />
                        {touched.nik && errors.nik && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.nik}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='col-6'>
                        <label htmlFor='' className='mb-3 required'>
                          Nomor KK
                        </label>
                        <Field
                          type='text'
                          name='no_kk'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid': touched.no_kk && errors.no_kk,
                            },
                            {
                              'is-valid': touched.no_kk && !errors.no_kk,
                            }
                          )}
                          placeholder='Nomor KK'
                        />
                        {touched.no_kk && errors.no_kk && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.no_kk}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
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
                      onChange={(e) => {
                        handleChangeFormikSelect(e, 'status_perkawinan')
                        handleChange('status_perkawinan')(e.value)
                      }}
                      placeholder={'Pilih'}
                      loadingMessage={() => 'Sedang mencari pilihan...'}
                      noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                      name='status_perkawinan'
                      styles={
                        calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                      }
                    />
                    {touched.status_perkawinan && errors.status_perkawinan && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>Wajib Diisi</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Nomor HP
                    </label>
                    <Field
                      type='text'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': touched.no_hp && errors.no_hp,
                        },
                        {
                          'is-valid': touched.no_hp && !errors.no_hp,
                        }
                      )}
                      name='no_hp'
                      placeholder='Nomor HP'
                    />
                    {touched.no_hp && errors.no_hp && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.no_hp}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-12 mb-4'>
                    <div className='separator border-3 my-10'></div>
                  </div>

                  <div className='col-12 mb-4'>
                    <div className='row'>
                      <div className='col-xxl-10 col-md-10 col-lg-10 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
                          Alamat Sesuai KTP
                        </label>
                        <Field
                          type='text'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid': touched.sesuai_ktp_alamat && errors.sesuai_ktp_alamat,
                            },
                            {
                              'is-valid': touched.sesuai_ktp_alamat && !errors.sesuai_ktp_alamat,
                            }
                          )}
                          name='sesuai_ktp_alamat'
                          placeholder='Alamat Sesuai KTP'
                        />
                        {touched.sesuai_ktp_alamat && errors.sesuai_ktp_alamat && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.sesuai_ktp_alamat}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='col-xxl-2 col-md-2 col-lg-2 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
                          RT/RW
                        </label>
                        <Field
                          type='text'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid': touched.sesuai_ktp_rtrw && errors.sesuai_ktp_rtrw,
                            },
                            {
                              'is-valid': touched.sesuai_ktp_rtrw && !errors.sesuai_ktp_rtrw,
                            }
                          )}
                          name='sesuai_ktp_rtrw'
                          placeholder='RT/RW'
                        />
                        {touched.sesuai_ktp_rtrw && errors.sesuai_ktp_rtrw && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.sesuai_ktp_rtrw}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                    <div className='row'>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
                          Provinsi
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsProvKTP}
                          defaultOptions
                          value={
                            valuesFormik?.sesuai_ktp_provinsi
                              ? valuesFormik?.sesuai_ktp_provinsi
                              : valProvKTP && valProvKTP.label !== ''
                              ? valProvKTP
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => {
                            handleChangeFormikSelect(e, 'sesuai_ktp_provinsi')
                            handleChange('sesuai_ktp_provinsi')(e.value)
                          }}
                          placeholder={'Pilih'}
                          loadingMessage={() => 'Sedang mencari pilihan...'}
                          noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                          name='sesuai_ktp_provinsi'
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                        />
                        {touched.sesuai_ktp_provinsi && errors.sesuai_ktp_provinsi && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>Wajib Diisi</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
                          Kab/Kota
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKotKTP}
                          defaultOptions
                          value={
                            valuesFormik?.sesuai_ktp_kabkota
                              ? valuesFormik?.sesuai_ktp_kabkota
                              : valKabKotaKTP && valKabKotaKTP.label !== ''
                              ? valKabKotaKTP
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => {
                            handleChangeFormikSelect(e, 'sesuai_ktp_kabkota')
                            handleChange('sesuai_ktp_kabkota')(e.value)
                          }}
                          placeholder={'Pilih'}
                          loadingMessage={() => 'Sedang mencari pilihan...'}
                          noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                          name='sesuai_ktp_kabkota'
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                        />
                        {touched.sesuai_ktp_kabkota && errors.sesuai_ktp_kabkota && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>Wajib Diisi</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                    <div className='row'>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
                          Kecamatan
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKecKTP}
                          defaultOptions
                          value={
                            valuesFormik?.sesuai_ktp_kecamatan
                              ? valuesFormik?.sesuai_ktp_kecamatan
                              : valKecKTP && valKecKTP.label !== ''
                              ? valKecKTP
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => handleChangeFormikSelect(e, 'sesuai_ktp_kecamatan')}
                          placeholder={'Pilih'}
                          loadingMessage={() => 'Sedang mencari pilihan...'}
                          noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                        />
                        {touched.sesuai_ktp_kabkota && errors.sesuai_ktp_kabkota && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>Wajib Diisi</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
                          Kelurahan
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKelKTP}
                          defaultOptions
                          value={
                            valuesFormik?.sesuai_ktp_kelurahan
                              ? valuesFormik?.sesuai_ktp_kelurahan
                              : valKelKTP && valKelKTP.label !== ''
                              ? valKelKTP
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => {
                            handleChangeFormikSelect(e, 'sesuai_ktp_kelurahan')
                            handleChange('sesuai_ktp_kelurahan')(e.value)
                          }}
                          placeholder={'Pilih'}
                          loadingMessage={() => 'Sedang mencari pilihan...'}
                          noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                          name='sesuai_ktp_kelurahan'
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                        />
                        {touched.sesuai_ktp_kelurahan && errors.sesuai_ktp_kelurahan && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>Wajib Diisi</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className='col-12 mb-4'>
                    <div className='separator border-3 my-10'></div>
                  </div>

                  <div className='col-12 mb-4'>
                    <div className='row'>
                      <div className='col-xxl-10 col-md-10 col-lg-10 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
                          Alamat Domisili
                        </label>
                        <Field
                          type='text'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid': touched.domisili_alamat && errors.domisili_alamat,
                            },
                            {
                              'is-valid': touched.domisili_alamat && !errors.domisili_alamat,
                            }
                          )}
                          name='domisili_alamat'
                          placeholder='Alamat Domisili'
                        />
                        {touched.domisili_alamat && errors.domisili_alamat && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.domisili_alamat}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='col-xxl-2 col-md-2 col-lg-2 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
                          RT/RW
                        </label>
                        <Field
                          type='text'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid': touched.domisili_rtrw && errors.domisili_rtrw,
                            },
                            {
                              'is-valid': touched.domisili_rtrw && !errors.domisili_rtrw,
                            }
                          )}
                          name='domisili_rtrw'
                          placeholder='RT/RW'
                        />
                        {touched.domisili_rtrw && errors.domisili_rtrw && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{errors.domisili_rtrw}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                    <div className='row'>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
                          Provinsi
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsProvDom}
                          defaultOptions
                          value={
                            valuesFormik?.domisili_provinsi
                              ? valuesFormik?.domisili_provinsi
                              : valProvDomisili && valProvDomisili.label !== ''
                              ? valProvDomisili
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => {
                            handleChangeFormikSelect(e, 'domisili_provinsi')
                            handleChange('domisili_provinsi')(e.value)
                          }}
                          placeholder={'Pilih'}
                          loadingMessage={() => 'Sedang mencari pilihan...'}
                          noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                          name='domisili_provinsi'
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                        />
                        {touched.domisili_provinsi && errors.domisili_provinsi && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>Wajib Diisi</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
                          Kab/Kota
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKotDom}
                          defaultOptions
                          value={
                            valuesFormik?.domisili_kabkota
                              ? valuesFormik?.domisili_kabkota
                              : valKabKotaDomisili && valKabKotaDomisili.label !== ''
                              ? valKabKotaDomisili
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => {
                            handleChangeFormikSelect(e, 'domisili_kabkota')
                            handleChange('domisili_kabkota')(e.value)
                          }}
                          placeholder={'Pilih'}
                          loadingMessage={() => 'Sedang mencari pilihan...'}
                          noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                          name='domisili_kabkota'
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                        />
                        {touched.domisili_kabkota && errors.domisili_kabkota && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>Wajib Diisi</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                    <div className='row'>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
                          Kecamatan
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKecDom}
                          defaultOptions
                          value={
                            valuesFormik?.domisili_kecamatan
                              ? valuesFormik?.domisili_kecamatan
                              : valKecDomisili && valKecDomisili.label !== ''
                              ? valKecDomisili
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => {
                            handleChangeFormikSelect(e, 'domisili_kecamatan')
                            handleChange('domisili_kecamatan')(e.value)
                          }}
                          placeholder={'Pilih'}
                          loadingMessage={() => 'Sedang mencari pilihan...'}
                          noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                          name='domisili_kecamatan'
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                        />
                        {touched.domisili_kecamatan && errors.domisili_kecamatan && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>Wajib Diisi</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='col-xxl-6 col-md-6 col-lg-6 col-sm-12 mb-4'>
                        <label htmlFor='' className='mb-3 required'>
                          Kelurahan
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKelDom}
                          defaultOptions
                          value={
                            valuesFormik?.domisili_kelurahan
                              ? valuesFormik?.domisili_kelurahan
                              : valKelDomisili && valKelDomisili.label !== ''
                              ? valKelDomisili
                              : {value: '', label: 'Pilih'}
                          }
                          onChange={(e) => {
                            handleChangeFormikSelect(e, 'domisili_kelurahan')
                            handleChange('domisili_kelurahan')(e.value)
                          }}
                          placeholder={'Pilih'}
                          loadingMessage={() => 'Sedang mencari pilihan...'}
                          noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                          name='domisili_kelurahan'
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                        />
                        {touched.domisili_kelurahan && errors.domisili_kelurahan && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>Wajib Diisi</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='p-0 mt-6'>
                  <div className='text-center'>
                    <Link
                      className='text-reset text-decoration-none'
                      to='/kepegawaian/informasi-data-pegawai'
                    >
                      <button className='float-none btn btn-light align-self-center m-1'>
                        Batal
                      </button>
                    </Link>
                    <button
                      type='submit'
                      className='float-none btn btn-primary align-self-center m-1'
                      disabled={isSubmitting || !isValid}
                    >
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
