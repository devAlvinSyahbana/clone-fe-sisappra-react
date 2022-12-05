import {useEffect, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {UpdateHeaderDetail} from './UpdateHeaderDetail'
import axios from 'axios'
import {
  DetailPegawaiInterface,
  SelectOptionAutoCom,
  FileUploadInformasiDataPegawai,
} from '../KepegawaianInterface'
import {Formik, Field, FormikHelpers} from 'formik'
import moment from 'moment'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import clsx from 'clsx'
import AsyncSelect from 'react-select/async'
import Form from 'react-bootstrap/Form'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/informasi-data-pegawai`
export const MASTER_URL = `${API_URL}/master`

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
  kepegawaian_nrk: Yup.string()
    .matches(/^[0-9]+$/, 'Isian harus berupa angka')
    .required('Wajib diisi'),
  kepegawaian_nip: Yup.string()
    .matches(/^[0-9]+$/, 'Isian harus berupa angka')
    .required('Wajib diisi'),
  kepegawaian_no_rekening: Yup.string()
    .matches(/^[0-9]+$/, 'Isian harus berupa angka')
    .required('Wajib diisi'),
  kepegawaian_no_karpeg: Yup.string()
    .matches(/^[0-9]+$/, 'Isian harus berupa angka')
    .required('Wajib diisi'),
  kepegawaian_no_kasirkasur: Yup.string()
    .matches(/^[0-9]+$/, 'Isian harus berupa angka')
    .required('Wajib diisi'),
  kepegawaian_no_taspen: Yup.string()
    .matches(/^[0-9]+$/, 'Isian harus berupa angka')
    .required('Wajib diisi'),
  kepegawaian_no_bpjs_askes: Yup.string()
    .matches(/^[0-9]+$/, 'Isian harus berupa angka')
    .required('Wajib diisi'),
  kepegawaian_no_sk_pangkat_terakhir: Yup.string()
    .matches(/^[0-9]+$/, 'Isian harus berupa angka')
    .required('Wajib diisi'),
  // kepegawaian_diklat_pol_pp_dasar_no_sertifikat: Yup.string()
  //   .matches(/^[0-9]+$/, 'Isian harus berupa angka')
  //   .required('Wajib diisi'),
  // kepegawaian_diklat_pol_pp_strutural_no_sertifikat: Yup.string()
  //   .matches(/^[0-9]+$/, 'Isian harus berupa angka')
  //   .required('Wajib diisi'),
  // kepegawaian_diklat_pol_pp_ppns_no_sertifikat: Yup.string()
  //   .matches(/^[0-9]+$/, 'Isian harus berupa angka')
  //   .required('Wajib diisi'),
  // kepegawaian_diklat_fungsional_pol_pp_no_sertifikat: Yup.string()
  //   .matches(/^[0-9]+$/, 'Isian harus berupa angka')
  //   .required('Wajib diisi'),
  // kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat: Yup.string().required('Wajib diisi'),
  kepegawaian_tmtpangkat: Yup.string().required('Wajib diisi'),
  kepegawaian_npwp: Yup.string().required('Wajib diisi'),
  kepegawaian_tmt_cpns: Yup.string().required('Wajib diisi'),
  kepegawaian_tmt_pns: Yup.string().required('Wajib diisi'),
  kepegawaian_tgl_sk_pns: Yup.string().required('Wajib diisi'),
  kepegawaian_tgl_sk_pangkat_terakhir: Yup.string().required('Wajib diisi'),
  // kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat: Yup.string().required('Wajib diisi'),
  // kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat: Yup.string().required('Wajib diisi'),
  // kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat: Yup.string().required('Wajib diisi'),
  kepegawaian_subbag_seksi_kecamatan: Yup.string().required('Wajib diisi'),
  kepegawaian_tempat_tugas: Yup.string().required('Wajib diisi'),
  kepegawaian_pangkat: Yup.string().required('Wajib diisi'),
  kepegawaian_golongan: Yup.string().required('Wajib diisi'),
  kepegawaian_pendidikan_pada_sk: Yup.string().required('Wajib diisi'),
  kepegawaian_jabatan: Yup.string().required('Wajib diisi'),
  kepegawaian_eselon: Yup.string().required('Wajib diisi'),
})

export function UpdateDataKepegawaian() {
  const {id, status} = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState<DetailPegawaiInterface>({})
  const [valuesFormik, setValuesFormik] = useState<DetailPegawaiInterface>({})
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const [selectedFile, setSelectedFile] = useState<FileUploadInformasiDataPegawai>()

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

  // Autocomplite Pangkat
  const filterPangkat = async (inputValue: string) => {
    const response = await axios.get(`${MASTER_URL}/pangkat/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.pangkat, value: i.id}))
  }
  const loadOptionsPangkat = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterPangkat(inputValue))
    }, 1000)
  }

  const handleChangeFormikSelect = (value: any, name: string) => {
    if (name === 'kepegawaian_tempat_tugas') {
      setIdMasterBidangWilayah((prevstate) => ({
        ...prevstate,
        id: value.value,
      }))
      setValuesFormik((prevValues: any) => ({
        ...prevValues,
        kepegawaian_subbag_seksi_kecamatan: null,
        kepegawaian_jabatan: null,
      }))
      setValMasterPelaksana((prevstate) => ({
        ...prevstate,
        value: '',
        label: '',
      }))
      setValMasterJabatan((prevstate) => ({
        ...prevstate,
        value: '',
        label: '',
      }))
    }
    if (name === 'kepegawaian_subbag_seksi_kecamatan') {
      setIdMasterPelaksana((prevstate) => ({
        ...prevstate,
        id: value.value,
      }))
      setValuesFormik((prevValues: any) => ({
        ...prevValues,
        kepegawaian_jabatan: null,
      }))
      setValMasterJabatan((prevstate) => ({
        ...prevstate,
        value: '',
        label: '',
      }))
    }
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }))
  }

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

  // Autocomplite Golongan
  const filtergolongan = async (inputValue: string) => {
    const response = await axios.get(`${MASTER_URL}/golongan/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.golongan, value: i.id}))
  }
  const loadOptionsgolongan = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filtergolongan(inputValue))
    }, 1000)
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

  // Autocomplite Pendidikan
  const filterpendidikan = async (inputValue: string) => {
    const response = await axios.get(`${MASTER_URL}/pendidikan/findone-by-pendidikan/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.pendidikan, value: i.id}))
  }
  const loadOptionspendidikan = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterpendidikan(inputValue))
    }, 1000)
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

  // Autocomplite Jabatan
  const filterjabatan = async (inputValue: string) => {
    const response = await axios.get(
      `${MASTER_URL}/jabatan/filter?id_master_tempat_seksi_pelaksanaan=${parseInt(
        idMasterPelaksana.id
      )}${inputValue !== '' && `&nama=${inputValue}`}`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.jabatan, value: i.id}))
  }
  const loadOptionsjabatan = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterjabatan(inputValue))
    }, 1000)
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

  // Autocomplite Eselon
  const filtereselon = async (inputValue: string) => {
    const response = await axios.get(`${MASTER_URL}/eselon/findone-by-eselon/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.eselon, value: i.id}))
  }
  const loadOptionseselon = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filtereselon(inputValue))
    }, 1000)
  }

  // Autocomplite Bidang Wilayah
  const filterbidangwilayah = async (inputValue: string) => {
    const response = await axios.get(`${MASTER_URL}/bidang-wilayah/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsbidangwilayah = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterbidangwilayah(inputValue))
    }, 1000)
  }

  const [valMasterBidangWilayah, setValMasterBidangWilayah] = useState({value: '', label: ''})
  const [idMasterBidangWilayah, setIdMasterBidangWilayah] = useState({id: ''})
  const getBidangWilayah = async (params: any) => {
    if (params)
      return await axios
        .get(`${MASTER_URL}/bidang-wilayah/findone/${parseInt(params)}`)
        .then((response) => {
          setIdMasterBidangWilayah((prevstate) => ({
            ...prevstate,
            id: response?.data?.data?.id,
          }))
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

  // Autocomplite Pelaksana
  const filterPelaksana = async (inputValue: string) => {
    const response = await axios.get(
      `${MASTER_URL}/pelaksana/filter?id_tempat_pelaksanaan=${parseInt(idMasterBidangWilayah.id)}${
        inputValue !== '' && `&nama=${inputValue}`
      }`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsPelaksana = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterPelaksana(inputValue))
    }, 1000)
  }

  const [valMasterPelaksana, setValMasterPelaksana] = useState({value: '', label: ''})
  const [idMasterPelaksana, setIdMasterPelaksana] = useState({id: ''})
  const getPelaksana = async (params: any) => {
    if (params)
      return await axios
        .get(`${MASTER_URL}/pelaksana/findone/${parseInt(params)}`)
        .then((response) => {
          setIdMasterPelaksana((prevstate) => ({
            ...prevstate,
            id: response?.data?.data?.id,
          }))
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
    <>
      {/* begin::Body */}
      <UpdateHeaderDetail />
      {/* second card */}
      <Formik
        initialValues={{
          ...data,
          kepegawaian_tmtpangkat: data?.kepegawaian_tmtpangkat
            ? moment(data?.kepegawaian_tmtpangkat).format('YYYY-MM-D')
            : '',
          kepegawaian_tmt_cpns: data?.kepegawaian_tmt_cpns
            ? moment(data?.kepegawaian_tmt_cpns).format('YYYY-MM-D')
            : '',
          kepegawaian_tgl_sk_pns: data?.kepegawaian_tgl_sk_pns
            ? moment(data?.kepegawaian_tgl_sk_pns).format('YYYY-MM-D')
            : '',
          kepegawaian_tgl_sk_pangkat_terakhir: data?.kepegawaian_tgl_sk_pangkat_terakhir
            ? moment(data?.kepegawaian_tgl_sk_pangkat_terakhir).format('YYYY-MM-D')
            : '',
          kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat:
            data?.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat
              ? moment(data?.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat).format('YYYY-MM-D')
              : '',
          kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat:
            data?.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat
              ? moment(data?.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat).format('YYYY-MM-D')
              : '',
          kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat:
            data?.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat
              ? moment(data?.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat).format('YYYY-MM-D')
              : '',
          kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat:
            data?.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat
              ? moment(data?.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat).format(
                  'YYYY-MM-D'
                )
              : '',
          kepegawaian_tmt_pns: data?.kepegawaian_tmt_pns
            ? moment(data?.kepegawaian_tmt_pns).format('YYYY-MM-D')
            : '',
        }}
        validationSchema={validatorForm}
        onSubmit={function (
          values: DetailPegawaiInterface,
          {setSubmitting}: FormikHelpers<DetailPegawaiInterface>
        ) {
          let formData = new FormData()
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
              const bodyParam = {
                nama: values.nama,
                tempat_lahir: values.tempat_lahir,
                tgl_lahir: values.tgl_lahir !== '' ? values.tgl_lahir : null,
                jenis_kelamin: values.jenis_kelamin,
                agama: values.agama,
                nik: values.nik,
                no_kk: values.no_kk,
                status_perkawinan: values.status_perkawinan,
                no_hp: values.no_hp,
                sesuai_ktp_alamat: values.sesuai_ktp_alamat,
                sesuai_ktp_rtrw: values.sesuai_ktp_rtrw,
                sesuai_ktp_provinsi: values.sesuai_ktp_provinsi,
                sesuai_ktp_kabkota: values.sesuai_ktp_kabkota,
                sesuai_ktp_kecamatan: values.sesuai_ktp_kecamatan,
                sesuai_ktp_kelurahan: values.sesuai_ktp_kelurahan,
                domisili_alamat: values.domisili_alamat,
                domisili_rtrw: values.domisili_rtrw,
                domisili_provinsi: values.domisili_provinsi,
                domisili_kabkota: values.domisili_kabkota,
                domisili_kecamatan: values.domisili_kecamatan,
                domisili_kelurahan: values.domisili_kelurahan,

                kepegawaian_nrk: values.kepegawaian_nrk,
                kepegawaian_nip: values.kepegawaian_nip,
                kepegawaian_pangkat: valuesFormik?.kepegawaian_pangkat?.value
                  ? valuesFormik.kepegawaian_pangkat.value
                  : values.kepegawaian_pangkat,
                kepegawaian_golongan: valuesFormik?.kepegawaian_golongan?.value
                  ? valuesFormik.kepegawaian_golongan.value
                  : values.kepegawaian_golongan,
                kepegawaian_tmtpangkat: values.kepegawaian_tmtpangkat,
                kepegawaian_pendidikan_pada_sk: valuesFormik?.kepegawaian_pendidikan_pada_sk?.value
                  ? valuesFormik.kepegawaian_pendidikan_pada_sk.value
                  : values.kepegawaian_pendidikan_pada_sk,
                kepegawaian_jabatan: valuesFormik?.kepegawaian_jabatan?.value
                  ? valuesFormik.kepegawaian_jabatan.value
                  : values.kepegawaian_jabatan,
                kepegawaian_eselon: valuesFormik?.kepegawaian_eselon?.value
                  ? valuesFormik.kepegawaian_eselon.value
                  : values.kepegawaian_eselon,
                kepegawaian_tempat_tugas: valuesFormik?.kepegawaian_tempat_tugas?.value
                  ? valuesFormik.kepegawaian_tempat_tugas.value
                  : values.kepegawaian_tempat_tugas,
                kepegawaian_subbag_seksi_kecamatan: valuesFormik?.kepegawaian_subbag_seksi_kecamatan
                  ?.value
                  ? valuesFormik.kepegawaian_subbag_seksi_kecamatan.value
                  : values.kepegawaian_subbag_seksi_kecamatan,
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
                kepegawaian_diklat_pol_pp_dasar_no_sertifikat:
                  values.kepegawaian_diklat_pol_pp_dasar_no_sertifikat,
                kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat:
                  values.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat,
                kepegawaian_diklat_pol_pp_strutural_no_sertifikat:
                  values.kepegawaian_diklat_pol_pp_strutural_no_sertifikat,
                kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat:
                  values.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat,
                kepegawaian_diklat_pol_pp_ppns_no_sertifikat:
                  values.kepegawaian_diklat_pol_pp_ppns_no_sertifikat,
                kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat:
                  values.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat,
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
                  if (selectedFile) {
                    let fileUpld: any = selectedFile
                    Object.keys(fileUpld).forEach(function (key) {
                      formData.append(key, fileUpld[key])
                    })
                    const responseFile = await axios.post(
                      `${KEPEGAWAIAN_URL}/update-file/${id}/${status}`,
                      formData
                    )
                    if (responseFile) {
                      console.log('File success uploaded!')
                      Swal.fire({
                        icon: 'success',
                        text: 'Data berhasil disimpan',
                        showConfirmButton: false,
                        timer: 1500,
                      })
                      navigate(
                        `/kepegawaian/informasi-data-pegawai/ubah-data-kepegawaian/${id}/${status}`,
                        {
                          replace: true,
                        }
                      )
                    }
                    return
                  }
                  Swal.fire({
                    icon: 'success',
                    title: 'Data berhasil disimpan',
                    showConfirmButton: false,
                    timer: 1500,
                  })
                  navigate(
                    `/kepegawaian/informasi-data-pegawai/ubah-data-kepegawaian/${id}/${status}`,
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
            } else {
              setSubmitting(false)
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
          setFieldValue,
          handleSubmit,
          isSubmitting,
          isValid,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
              <div className='card-header cursor-pointer'>
                <div className='card-title m-0'>
                  <h3 className='fw-bold m-0'>Data Kepegawaian</h3>
                </div>
              </div>
              <div className='card-body p-9'>
                <div className='row'>
                  <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      NRK
                    </label>
                    <Field
                      type='text'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': touched.kepegawaian_nrk && errors.kepegawaian_nrk,
                        },
                        {
                          'is-valid': touched.kepegawaian_nrk && !errors.kepegawaian_nrk,
                        }
                      )}
                      name='kepegawaian_nrk'
                      disabled
                    />
                    {touched.kepegawaian_nrk && errors.kepegawaian_nrk && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.kepegawaian_nrk}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      NIP
                    </label>
                    <Field
                      type='text'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': touched.kepegawaian_nip && errors.kepegawaian_nip,
                        },
                        {
                          'is-valid': touched.kepegawaian_nip && !errors.kepegawaian_nip,
                        }
                      )}
                      name='kepegawaian_nip'
                      disabled
                    />
                    {touched.kepegawaian_nip && errors.kepegawaian_nip && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.kepegawaian_nip}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Pangkat
                    </label>
                    <AsyncSelect
                      value={
                        valuesFormik?.kepegawaian_pangkat
                          ? valuesFormik?.kepegawaian_pangkat
                          : valMasterPangkat && valMasterPangkat.label !== ''
                          ? valMasterPangkat
                          : {value: '', label: 'Pilih'}
                      }
                      styles={
                        calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                      }
                      loadOptions={loadOptionsPangkat}
                      onChange={async (e) => {
                        handleChangeFormikSelect(e, 'kepegawaian_pangkat')
                        await setFieldValue('kepegawaian_pangkat', e.value)
                      }}
                      defaultOptions
                      name='kepegawaian_pangkat'
                      placeholder={'Pilih'}
                      loadingMessage={() => 'Sedang mencari pilihan...'}
                      noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                    />
                    {touched.kepegawaian_pangkat && errors.kepegawaian_pangkat && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>Wajib Diisi</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Golongan
                    </label>
                    <AsyncSelect
                      cacheOptions
                      value={
                        valuesFormik?.kepegawaian_golongan
                          ? valuesFormik?.kepegawaian_golongan
                          : valMasterGolongan && valMasterGolongan.label !== ''
                          ? valMasterGolongan
                          : {value: '', label: 'Pilih'}
                      }
                      styles={
                        calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                      }
                      loadOptions={loadOptionsgolongan}
                      onChange={async (e) => {
                        handleChangeFormikSelect(e, 'kepegawaian_golongan')
                        await setFieldValue('kepegawaian_golongan', e.value)
                      }}
                      defaultOptions
                      name='kepegawaian_golongan'
                      placeholder={'Pilih'}
                      loadingMessage={() => 'Sedang mencari pilihan...'}
                      noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                    />
                    {touched.kepegawaian_golongan && errors.kepegawaian_golongan && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>Wajib Diisi</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      TMT Pangkat
                    </label>
                    <Field
                      type='date'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid':
                            touched.kepegawaian_tmtpangkat && errors.kepegawaian_tmtpangkat,
                        },
                        {
                          'is-valid':
                            touched.kepegawaian_tmtpangkat && !errors.kepegawaian_tmtpangkat,
                        }
                      )}
                      name='kepegawaian_tmtpangkat'
                    />
                    {touched.kepegawaian_tmtpangkat && errors.kepegawaian_tmtpangkat && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.kepegawaian_tmtpangkat}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Pendidikan Pada SK
                    </label>
                    <AsyncSelect
                      cacheOptions
                      value={
                        valuesFormik?.kepegawaian_pendidikan_pada_sk
                          ? valuesFormik?.kepegawaian_pendidikan_pada_sk
                          : valMasterPendidikan && valMasterPendidikan.label !== ''
                          ? valMasterPendidikan
                          : {value: '', label: 'Pilih'}
                      }
                      styles={
                        calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                      }
                      loadOptions={loadOptionspendidikan}
                      onChange={async (e) => {
                        handleChangeFormikSelect(e, 'kepegawaian_pendidikan_pada_sk')
                        await setFieldValue('kepegawaian_pendidikan_pada_sk', e.value)
                      }}
                      defaultOptions
                      name='kepegawaian_pendidikan_pada_sk'
                      placeholder={'Pilih'}
                      loadingMessage={() => 'Sedang mencari pilihan...'}
                      noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                    />
                    {touched.kepegawaian_pendidikan_pada_sk &&
                      errors.kepegawaian_pendidikan_pada_sk && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>Wajib Diisi</span>
                          </div>
                        </div>
                      )}
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Tempat Tugas Bidang/Wilayah
                    </label>
                    <AsyncSelect
                      cacheOptions
                      value={
                        valuesFormik?.kepegawaian_tempat_tugas
                          ? valuesFormik?.kepegawaian_tempat_tugas
                          : valMasterBidangWilayah && valMasterBidangWilayah.label !== ''
                          ? valMasterBidangWilayah
                          : {value: '', label: 'Pilih'}
                      }
                      styles={
                        calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                      }
                      loadOptions={loadOptionsbidangwilayah}
                      onChange={async (e) => {
                        handleChangeFormikSelect(e, 'kepegawaian_tempat_tugas')
                        await setFieldValue('kepegawaian_tempat_tugas', e.value)
                      }}
                      defaultOptions
                      name='kepegawaian_tempat_tugas'
                      placeholder={'Pilih'}
                      loadingMessage={() => 'Sedang mencari pilihan...'}
                      noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                    />
                    {touched.kepegawaian_tempat_tugas && errors.kepegawaian_tempat_tugas && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>Wajib Diisi</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Subag/Seksi/Kecamatan
                    </label>
                    <AsyncSelect
                      value={
                        valuesFormik?.kepegawaian_subbag_seksi_kecamatan
                          ? valuesFormik?.kepegawaian_subbag_seksi_kecamatan
                          : valMasterPelaksana && valMasterPelaksana.label !== ''
                          ? valMasterPelaksana
                          : {value: '', label: 'Pilih'}
                      }
                      styles={
                        calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                      }
                      loadOptions={loadOptionsPelaksana}
                      onChange={async (e) => {
                        handleChangeFormikSelect(e, 'kepegawaian_subbag_seksi_kecamatan')
                        await setFieldValue('kepegawaian_subbag_seksi_kecamatan', e.value)
                      }}
                      name='kepegawaian_subbag_seksi_kecamatan'
                      placeholder={'Pilih'}
                      loadingMessage={() => 'Sedang mencari pilihan...'}
                      noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                    />
                    {touched.kepegawaian_subbag_seksi_kecamatan &&
                      errors.kepegawaian_subbag_seksi_kecamatan && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>Wajib Diisi</span>
                          </div>
                        </div>
                      )}
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Jabatan
                    </label>
                    <AsyncSelect
                      value={
                        valuesFormik?.kepegawaian_jabatan
                          ? valuesFormik?.kepegawaian_jabatan
                          : valMasterJabatan && valMasterJabatan.label !== ''
                          ? valMasterJabatan
                          : {value: '', label: 'Pilih'}
                      }
                      styles={
                        calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                      }
                      loadOptions={loadOptionsjabatan}
                      onChange={async (e) => {
                        handleChangeFormikSelect(e, 'kepegawaian_jabatan')
                        await setFieldValue('kepegawaian_jabatan', e.value)
                      }}
                      name='kepegawaian_jabatan'
                      placeholder={'Pilih'}
                      loadingMessage={() => 'Sedang mencari pilihan...'}
                      noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                    />
                    {touched.kepegawaian_jabatan && errors.kepegawaian_jabatan && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>Wajib Diisi</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Eselon
                    </label>
                    <AsyncSelect
                      cacheOptions
                      value={
                        valuesFormik?.kepegawaian_eselon
                          ? valuesFormik?.kepegawaian_eselon
                          : valMasterEselon && valMasterEselon.label !== ''
                          ? valMasterEselon
                          : {value: '', label: 'Pilih'}
                      }
                      styles={
                        calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                      }
                      loadOptions={loadOptionseselon}
                      onChange={async (e) => {
                        handleChangeFormikSelect(e, 'kepegawaian_eselon')
                        await setFieldValue('kepegawaian_eselon', e.value)
                      }}
                      defaultOptions
                      name='kepegawaian_eselon'
                      placeholder={'Pilih'}
                      loadingMessage={() => 'Sedang mencari pilihan...'}
                      noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                    />
                    {touched.kepegawaian_eselon && errors.kepegawaian_eselon && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>Wajib Diisi</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Status Pegawai
                    </label>
                    <Field
                      type='text'
                      className='form-control form-control form-control-solid mb-4'
                      name='kepegawaian_status_pegawai'
                      disabled
                    />
                  </div>

                  <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Nomor Rekening
                    </label>
                    <Field
                      type='text'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid':
                            touched.kepegawaian_no_rekening && errors.kepegawaian_no_rekening,
                        },
                        {
                          'is-valid':
                            touched.kepegawaian_no_rekening && !errors.kepegawaian_no_rekening,
                        }
                      )}
                      name='kepegawaian_no_rekening'
                    />
                    {touched.kepegawaian_no_rekening && errors.kepegawaian_no_rekening && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.kepegawaian_no_rekening}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Nomor KARPEG
                    </label>
                    <Field
                      type='text'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid':
                            touched.kepegawaian_no_karpeg && errors.kepegawaian_no_karpeg,
                        },
                        {
                          'is-valid':
                            touched.kepegawaian_no_karpeg && !errors.kepegawaian_no_karpeg,
                        }
                      )}
                      name='kepegawaian_no_karpeg'
                    />
                    {touched.kepegawaian_no_karpeg && errors.kepegawaian_no_karpeg && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.kepegawaian_no_karpeg}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Nomor Karis/Karsu
                    </label>
                    <Field
                      type='text'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid':
                            touched.kepegawaian_no_kasirkasur && errors.kepegawaian_no_kasirkasur,
                        },
                        {
                          'is-valid':
                            touched.kepegawaian_no_kasirkasur && !errors.kepegawaian_no_kasirkasur,
                        }
                      )}
                      name='kepegawaian_no_kasirkasur'
                    />
                    {touched.kepegawaian_no_kasirkasur && errors.kepegawaian_no_kasirkasur && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.kepegawaian_no_kasirkasur}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Nomor TASPEN
                    </label>
                    <Field
                      type='text'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid':
                            touched.kepegawaian_no_taspen && errors.kepegawaian_no_taspen,
                        },
                        {
                          'is-valid':
                            touched.kepegawaian_no_taspen && !errors.kepegawaian_no_taspen,
                        }
                      )}
                      name='kepegawaian_no_taspen'
                    />
                    {touched.kepegawaian_no_taspen && errors.kepegawaian_no_taspen && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.kepegawaian_no_taspen}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-4 col-lg-4 col-xxl-4 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Nomor NPWP
                    </label>
                    <Field
                      type='text'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': touched.kepegawaian_npwp && errors.kepegawaian_npwp,
                        },
                        {
                          'is-valid': touched.kepegawaian_npwp && !errors.kepegawaian_npwp,
                        }
                      )}
                      name='kepegawaian_npwp'
                    />
                    {touched.kepegawaian_npwp && errors.kepegawaian_npwp && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.kepegawaian_npwp}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-12 col-lg-12 col-xxl-12 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Nomor BPJS/ASKES
                    </label>
                    <Field
                      type='text'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid':
                            touched.kepegawaian_no_bpjs_askes && errors.kepegawaian_no_bpjs_askes,
                        },
                        {
                          'is-valid':
                            touched.kepegawaian_no_bpjs_askes && !errors.kepegawaian_no_bpjs_askes,
                        }
                      )}
                      name='kepegawaian_no_bpjs_askes'
                    />
                    {touched.kepegawaian_no_bpjs_askes && errors.kepegawaian_no_bpjs_askes && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.kepegawaian_no_bpjs_askes}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-12 mb-4'>
                    <div className='separator border-3 my-10'></div>
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      TMT CPNS
                    </label>
                    <Field
                      type='date'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': touched.kepegawaian_tmt_cpns && errors.kepegawaian_tmt_cpns,
                        },
                        {
                          'is-valid': touched.kepegawaian_tmt_cpns && !errors.kepegawaian_tmt_cpns,
                        }
                      )}
                      name='kepegawaian_tmt_cpns'
                    />
                    {touched.kepegawaian_tmt_cpns && errors.kepegawaian_tmt_cpns && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.kepegawaian_tmt_cpns}</span>
                        </div>
                      </div>
                    )}
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

                        <label className='fw-semibold fs-6 mb-2 mt-2'>Upload SK CPNS</label>
                        <Form.Control
                          type='file'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          onChange={(event: {target: any}) =>
                            setSelectedFile((prevstate) => ({
                              ...prevstate,
                              kepegawaian_sk_cpns: event.target.files[0],
                            }))
                          }
                          accept='application/pdf'
                        />
                        <small className='mt-4'>*File yang dapat di upload berformat (.pdf)</small>
                      </div>
                    </div>
                  </div>

                  <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      TMT PNS
                    </label>
                    <Field
                      type='date'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': touched.kepegawaian_tmt_pns && errors.kepegawaian_tmt_pns,
                        },
                        {
                          'is-valid': touched.kepegawaian_tmt_pns && !errors.kepegawaian_tmt_pns,
                        }
                      )}
                      name='kepegawaian_tmt_pns'
                    />
                    {touched.kepegawaian_tmt_pns && errors.kepegawaian_tmt_pns && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.kepegawaian_tmt_pns}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Tanggal SK PNS
                    </label>
                    <Field
                      type='date'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid':
                            touched.kepegawaian_tgl_sk_pns && errors.kepegawaian_tgl_sk_pns,
                        },
                        {
                          'is-valid':
                            touched.kepegawaian_tgl_sk_pns && !errors.kepegawaian_tgl_sk_pns,
                        }
                      )}
                      name='kepegawaian_tgl_sk_pns'
                    />
                    {touched.kepegawaian_tgl_sk_pns && errors.kepegawaian_tgl_sk_pns && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors.kepegawaian_tgl_sk_pns}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-6 col-lg-6 col-xxl-6 mb-5'>
                    <div className='card h-100 mt-3'>
                      <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                        {data.kepegawaian_sk_pns && data.kepegawaian_sk_pns !== '' ? (
                          <>
                            <a
                              href={`${API_URL}/${data.kepegawaian_sk_pns}`}
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
                        <label className='fw-semibold fs-6 mb-2 mt-2'>Upload SK PNS</label>
                        <Form.Control
                          type='file'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          onChange={(event: {target: any}) =>
                            setSelectedFile((prevstate) => ({
                              ...prevstate,
                              kepegawaian_sk_pns: event.target.files[0],
                            }))
                          }
                          accept='application/pdf'
                        />
                        <small className='mt-4'>*File yang dapat di upload berformat (.pdf)</small>
                      </div>
                    </div>
                  </div>

                  <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Nomor SK Pangkat Terakhir
                    </label>
                    <Field
                      type='text'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid':
                            touched.kepegawaian_no_sk_pangkat_terakhir &&
                            errors.kepegawaian_no_sk_pangkat_terakhir,
                        },
                        {
                          'is-valid':
                            touched.kepegawaian_no_sk_pangkat_terakhir &&
                            !errors.kepegawaian_no_sk_pangkat_terakhir,
                        }
                      )}
                      name='kepegawaian_no_sk_pangkat_terakhir'
                    />
                    {touched.kepegawaian_no_sk_pangkat_terakhir &&
                      errors.kepegawaian_no_sk_pangkat_terakhir && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.kepegawaian_no_sk_pangkat_terakhir}</span>
                          </div>
                        </div>
                      )}
                  </div>

                  <div className='col-sm-12 col-md-3 col-lg-3 col-xxl-3 mb-4'>
                    <label htmlFor='' className='mb-3 required'>
                      Tanggal SK Pangkat
                    </label>
                    <Field
                      type='date'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid':
                            touched.kepegawaian_tgl_sk_pangkat_terakhir &&
                            errors.kepegawaian_tgl_sk_pangkat_terakhir,
                        },
                        {
                          'is-valid':
                            touched.kepegawaian_tgl_sk_pangkat_terakhir &&
                            !errors.kepegawaian_tgl_sk_pangkat_terakhir,
                        }
                      )}
                      name='kepegawaian_tgl_sk_pangkat_terakhir'
                    />
                    {touched.kepegawaian_tgl_sk_pangkat_terakhir &&
                      errors.kepegawaian_tgl_sk_pangkat_terakhir && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{errors.kepegawaian_tgl_sk_pangkat_terakhir}</span>
                          </div>
                        </div>
                      )}
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
                        <label className='fw-semibold fs-6 mb-2 mt-2'>Upload SK Terakhir</label>
                        <Form.Control
                          type='file'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          onChange={(event: {target: any}) =>
                            setSelectedFile((prevstate) => ({
                              ...prevstate,
                              kepegawaian_sk_pangkat_terakhir: event.target.files[0],
                            }))
                          }
                          accept='application/pdf'
                        />
                        <small className='mt-4'>*File yang dapat di upload berformat (.pdf)</small>
                      </div>
                    </div>
                  </div>

                  <div className='col-12 mb-4'>
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
                          type='text'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid':
                                touched.kepegawaian_diklat_pol_pp_dasar_no_sertifikat &&
                                errors.kepegawaian_diklat_pol_pp_dasar_no_sertifikat,
                            },
                            {
                              'is-valid':
                                touched.kepegawaian_diklat_pol_pp_dasar_no_sertifikat &&
                                !errors.kepegawaian_diklat_pol_pp_dasar_no_sertifikat,
                            }
                          )}
                          name='kepegawaian_diklat_pol_pp_dasar_no_sertifikat'
                        />
                        {touched.kepegawaian_diklat_pol_pp_dasar_no_sertifikat &&
                          errors.kepegawaian_diklat_pol_pp_dasar_no_sertifikat && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>
                                  {errors.kepegawaian_diklat_pol_pp_dasar_no_sertifikat}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className='col-12 mb-4'>
                        <label htmlFor='' className='mb-3'>
                          Tanggal Sertifikat
                        </label>
                        <Field
                          type='date'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid':
                                touched.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat &&
                                errors.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat,
                            },
                            {
                              'is-valid':
                                touched.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat &&
                                !errors.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat,
                            }
                          )}
                          name='kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat'
                        />
                        {touched.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat &&
                          errors.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>
                                  {errors.kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat}
                                </span>
                              </div>
                            </div>
                          )}
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
                        <label className='fw-semibold fs-6 mb-2 mt-2'>Upload Sertifikat</label>
                        <Form.Control
                          type='file'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          onChange={(event: {target: any}) =>
                            setSelectedFile((prevstate) => ({
                              ...prevstate,
                              kepegawaian_diklat_pol_pp_dasar_file_sertifikat:
                                event.target.files[0],
                            }))
                          }
                          accept='application/pdf'
                        />
                        <small className='mt-4'>*File yang dapat di upload berformat (.pdf)</small>
                      </div>
                    </div>
                  </div>

                  <div className='col-12 mb-4'>
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
                          type='text'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid':
                                touched.kepegawaian_diklat_pol_pp_strutural_no_sertifikat &&
                                errors.kepegawaian_diklat_pol_pp_strutural_no_sertifikat,
                            },
                            {
                              'is-valid':
                                touched.kepegawaian_diklat_pol_pp_strutural_no_sertifikat &&
                                !errors.kepegawaian_diklat_pol_pp_strutural_no_sertifikat,
                            }
                          )}
                          name='kepegawaian_diklat_pol_pp_strutural_no_sertifikat'
                        />
                        {touched.kepegawaian_diklat_pol_pp_strutural_no_sertifikat &&
                          errors.kepegawaian_diklat_pol_pp_strutural_no_sertifikat && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>
                                  {errors.kepegawaian_diklat_pol_pp_strutural_no_sertifikat}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className='col-12 mb-4'>
                        <label htmlFor='' className='mb-3'>
                          Tanggal Sertifikat
                        </label>
                        <Field
                          type='date'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid':
                                touched.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat &&
                                errors.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat,
                            },
                            {
                              'is-valid':
                                touched.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat &&
                                !errors.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat,
                            }
                          )}
                          name='kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat'
                        />
                        {touched.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat &&
                          errors.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>
                                  {errors.kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat}
                                </span>
                              </div>
                            </div>
                          )}
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
                        <label className='fw-semibold fs-6 mb-2 mt-2'>Upload Sertifikat</label>
                        <Form.Control
                          type='file'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          onChange={(event: {target: any}) =>
                            setSelectedFile((prevstate) => ({
                              ...prevstate,
                              kepegawaian_diklat_pol_pp_strutural_file_sertifikat:
                                event.target.files[0],
                            }))
                          }
                          accept='image/jpeg,image/png,application/pdf'
                        />
                        <small className='mt-4'>*File yang dapat di upload berformat (.pdf)</small>
                      </div>
                    </div>
                  </div>

                  <div className='col-12 mb-4'>
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
                          type='text'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid':
                                touched.kepegawaian_diklat_pol_pp_ppns_no_sertifikat &&
                                errors.kepegawaian_diklat_pol_pp_ppns_no_sertifikat,
                            },
                            {
                              'is-valid':
                                touched.kepegawaian_diklat_pol_pp_ppns_no_sertifikat &&
                                !errors.kepegawaian_diklat_pol_pp_ppns_no_sertifikat,
                            }
                          )}
                          name='kepegawaian_diklat_pol_pp_ppns_no_sertifikat'
                        />
                        {touched.kepegawaian_diklat_pol_pp_ppns_no_sertifikat &&
                          errors.kepegawaian_diklat_pol_pp_ppns_no_sertifikat && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>
                                  {errors.kepegawaian_diklat_pol_pp_ppns_no_sertifikat}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className='col-12 mb-4'>
                        <label htmlFor='' className='mb-3'>
                          Tanggal Sertifikat
                        </label>
                        <Field
                          type='date'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid':
                                touched.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat &&
                                errors.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat,
                            },
                            {
                              'is-valid':
                                touched.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat &&
                                !errors.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat,
                            }
                          )}
                          name='kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat'
                        />
                        {touched.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat &&
                          errors.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>
                                  {errors.kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat}
                                </span>
                              </div>
                            </div>
                          )}
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
                        <label className='fw-semibold fs-6 mb-2 mt-2'>Upload Sertifikat</label>
                        <Form.Control
                          type='file'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          onChange={(event: {target: any}) =>
                            setSelectedFile((prevstate) => ({
                              ...prevstate,
                              kepegawaian_diklat_pol_pp_ppns_file_sertifikat: event.target.files[0],
                            }))
                          }
                          accept='application/pdf'
                        />
                        <small className='mt-4'>*File yang dapat di upload berformat (.pdf)</small>
                      </div>
                    </div>
                  </div>

                  <div className='col-12 mb-4'>
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
                          type='text'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid':
                                touched.kepegawaian_diklat_fungsional_pol_pp_no_sertifikat &&
                                errors.kepegawaian_diklat_fungsional_pol_pp_no_sertifikat,
                            },
                            {
                              'is-valid':
                                touched.kepegawaian_diklat_fungsional_pol_pp_no_sertifikat &&
                                !errors.kepegawaian_diklat_fungsional_pol_pp_no_sertifikat,
                            }
                          )}
                          name='kepegawaian_diklat_fungsional_pol_pp_no_sertifikat'
                        />
                        {touched.kepegawaian_diklat_fungsional_pol_pp_no_sertifikat &&
                          errors.kepegawaian_diklat_fungsional_pol_pp_no_sertifikat && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>
                                  {errors.kepegawaian_diklat_fungsional_pol_pp_no_sertifikat}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className='col-12 mb-4'>
                        <label htmlFor='' className='mb-3'>
                          Tanggal Sertifikat
                        </label>
                        <Field
                          type='date'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid':
                                touched.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat &&
                                errors.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat,
                            },
                            {
                              'is-valid':
                                touched.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat &&
                                !errors.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat,
                            }
                          )}
                          name='kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat'
                        />
                        {touched.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat &&
                          errors.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>
                                  {errors.kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat}
                                </span>
                              </div>
                            </div>
                          )}
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
                        <label className='fw-semibold fs-6 mb-2 mt-2'>Upload Sertifikat</label>
                        <Form.Control
                          type='file'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          onChange={(event: {target: any}) =>
                            setSelectedFile((prevstate) => ({
                              ...prevstate,
                              kepegawaian_diklat_fungsional_pol_pp_file_sertifikat:
                                event.target.files[0],
                            }))
                          }
                          accept='application/pdf'
                        />
                        <small className='mt-4'>*File yang dapat di upload berformat (.pdf)</small>
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
