import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

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

export interface FormInput {
  skpd?: any
  pejabat_ppns_pangkat?: any
  pejabat_ppns_golongan?: any
  pejabat_ppns_nama?: string
  pejabat_ppns_nip?: string
  pejabat_ppns_nrk?: string
  no_sk_ppns?: string
  no_ktp_ppns?: string
  wilayah_kerja?: string
  uu_yg_dikawal?: string
  updated_by?: string
}

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

interface GetDataInterface {
  id?: number
  skpd?: any
  pejabat_ppns_pangkat?: any
  pejabat_ppns_golongan?: any
  keterangan?: string
  pejabat_ppns_nama?: string
  pejabat_ppns_nip?: string
  pejabat_ppns_nrk?: string
  no_sk_ppns?: string
  no_ktp_ppns?: string
  wilayah_kerja?: string
  uu_yg_dikawal?: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian` //http://localhost:3000/sarana-prasarana
export const PANGKAT_URL = `${API_URL}/master/pangkat` //http://localhost:3000/pangkat
export const GOLONGAN_URL = `${API_URL}/master/golongan` //http://localhost:3000/golongan
export const SKPD_URL = `${API_URL}/master/skpd` //http://localhost:3000/skpd

export function UpdateDataPPNS() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const {id} = useParams()
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KEPEGAWAIAN_URL}/PPNS/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        pejabat_ppns_pangkat: jsonD.pejabat_ppns_pangkat,
        pejabat_ppns_golongan: jsonD.pejabat_ppns_golongan,
        skpd: jsonD.skpd,
        pejabat_ppns_nama: jsonD.pejabat_ppns_nama,
        pejabat_ppns_nip: jsonD.pejabat_ppns_nip,
        pejabat_ppns_nrk: jsonD.pejabat_ppns_nrk,
        no_ktp_ppns: jsonD.no_ktp_ppns,
        no_sk_ppns: jsonD.no_sk_ppns,
        wilayah_kerja: jsonD.wilayah_kerja,
        uu_yg_dikawal: jsonD.uu_yg_dikawal,
        updated_by: '',
      }
      getPangkatVal(response.data.data.pejabat_ppns_pangkat)
      getGolonganVal(response.data.data.pejabat_ppns_golongan)
      getSKPDVal(response.data.data.skpd)
      setValuesFormikExist((prevstate) => ({...prevstate, ...paramValue}))
    }
    fetchData()
  }, [valuesFormik, id])

  // GET VALUE SKPD
  const [valSKPD, setValSKPD] = useState({value: '', label: ''})
  const getSKPDVal = async (params: any) => {
    if (params)
      return await axios
        .get(`${SKPD_URL}/findone/${parseInt(params)}`)
        .then((response) => {
          setValSKPD((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.skpd,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  // GET VALUE PANGKAT
  const [valPangkat, setValPangkat] = useState({value: '', label: ''})
  const getPangkatVal = async (params: any) => {
    if (params)
      return await axios
        .get(`${PANGKAT_URL}/findone/${parseInt(params)}`)
        .then((response) => {
          setValPangkat((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.pangkat,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  // GET VALUE GOLONGAN
  const [valGolongan, setValGolongan] = useState({value: '', label: ''})
  const getGolonganVal = async (params: any) => {
    if (params)
      return await axios
        .get(`${GOLONGAN_URL}/findone/${parseInt(params)}`)
        .then((response) => {
          setValGolongan((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.golongan,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  // AUTOCOMPLETE SKPD
  const filterSKPD = async (inputValue: string) => {
    const response = await axios.get(`${SKPD_URL}/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.skpd, value: i.id}))
  }
  const loadOptionSKPD = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterSKPD(inputValue))
    }, 1000)
  }

  // AUTOCOMPLETE PANGKAT
  const filterPangkat = async (inputValue: string) => {
    const response = await axios.get(`${PANGKAT_URL}/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.pangkat, value: i.id}))
  }
  const loadOptionsPangkat = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterPangkat(inputValue))
    }, 1000)
  }

  // AUTOCOMPLETE GOLONGAN
  const filterGolongan = async (inputValue: string) => {
    const response = await axios.get(`${GOLONGAN_URL}/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.golongan, value: i.id}))
  }
  const loadOptionsGolongan = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterGolongan(inputValue))
    }, 1000)
  }

  const handleChangeFormikSelect = (value: any, name: string) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }

  const formik = useFormik({
    initialValues: {
      pejabat_ppns_nama: '',
      pejabat_ppns_nip: '',
      pejabat_ppns_nrk: '',
      no_sk_ppns: '',
      no_ktp_ppns: '',
      wilayah_kerja: '',
      uu_yg_dikawal: '',
      skpd: {value: '', label: 'Pilih Pangkat'},
      pangkat: {value: '', label: 'Pilih Pangkat'},
      golongan: {value: '', label: 'Pilih Golongan'},
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        skpd: valuesFormik?.skpd?.value
          ? valuesFormik.skpd.value
          : valuesFormikExist?.skpd
          ? valuesFormikExist.skpd
          : 0,
        pejabat_ppns_pangkat: valuesFormik?.pejabat_ppns_pangkat?.value
          ? valuesFormik.pejabat_ppns_pangkat.value
          : valuesFormikExist?.pejabat_ppns_pangkat
          ? valuesFormikExist.pejabat_ppns_pangkat
          : 0,
        pejabat_ppns_golongan: valuesFormik?.pejabat_ppns_golongan?.value
          ? valuesFormik.pejabat_ppns_golongan.value
          : valuesFormikExist?.pejabat_ppns_golongan
          ? valuesFormikExist.pejabat_ppns_golongan
          : 0,
        pejabat_ppns_nama: valuesFormik?.pejabat_ppns_nama
          ? valuesFormik.pejabat_ppns_nama
          : valuesFormikExist?.pejabat_ppns_nama
          ? valuesFormikExist.pejabat_ppns_nama
          : '',
        pejabat_ppns_nip: valuesFormik?.pejabat_ppns_nip
          ? valuesFormik.pejabat_ppns_nip
          : valuesFormikExist?.pejabat_ppns_nip
          ? valuesFormikExist.pejabat_ppns_nip
          : '',
        pejabat_ppns_nrk: valuesFormik?.pejabat_ppns_nrk
          ? valuesFormik.pejabat_ppns_nrk
          : valuesFormikExist?.pejabat_ppns_nrk
          ? valuesFormikExist.pejabat_ppns_nrk
          : '',
        no_sk_ppns: valuesFormik?.no_sk_ppns
          ? valuesFormik.no_sk_ppns
          : valuesFormikExist?.no_sk_ppns
          ? valuesFormikExist.no_sk_ppns
          : '',
        no_ktp_ppns: valuesFormik?.no_ktp_ppns
          ? valuesFormik.no_ktp_ppns
          : valuesFormikExist?.no_ktp_ppns
          ? valuesFormikExist.no_ktp_ppns
          : '',
        wilayah_kerja: valuesFormik?.wilayah_kerja
          ? valuesFormik.wilayah_kerja
          : valuesFormikExist?.wilayah_kerja
          ? valuesFormikExist.wilayah_kerja
          : '',
        uu_yg_dikawal: valuesFormik?.uu_yg_dikawal
          ? valuesFormik.uu_yg_dikawal
          : valuesFormikExist?.uu_yg_dikawal
          ? valuesFormikExist.uu_yg_dikawal
          : '',
        updated_by: '',
      }
      try {
        const response = await axios.put(`${KEPEGAWAIAN_URL}/update-PPNS/${id}`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/kepegawaian/penyidik-pegawai-negeri-sipil/tab-data-ppns', {replace: true})
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'Data gagal disimpan, harap mencoba lagi',
          showConfirmButton: false,
          timer: 1500,
        })
        console.error(error)
      }
    },
  })

  return (
    <div className='card mb-3 mb-xl-2'>
      <div className='card-body'>
        <form onSubmit={formik.handleSubmit}>
          <div className='row mt-2'>
            <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-6'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  SKPD
                </label>
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptionSKPD}
                  defaultOptions
                  onChange={(e) => handleChangeFormikSelect(e, 'skpd')}
                  value={
                    valuesFormik?.skpd && typeof valuesFormik?.skpd === 'object'
                      ? valuesFormik?.skpd
                      : valSKPD && valSKPD.label !== ''
                      ? valSKPD
                      : {value: '', label: 'Pilih'}
                  }
                  placeholder={'Pilih'}
                  styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                  loadingMessage={() => 'Sedang mencari pilihan...'}
                  noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type='text'
                  name='pejabat_ppns_nama'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={
                    valuesFormik?.pejabat_ppns_nama || valuesFormik?.pejabat_ppns_nama === ''
                      ? valuesFormik?.pejabat_ppns_nama
                      : valuesFormikExist?.pejabat_ppns_nama
                      ? valuesFormikExist?.pejabat_ppns_nama
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>NIP</Form.Label>
                <Form.Control
                  type='text'
                  name='pejabat_ppns_nip'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={
                    valuesFormik?.pejabat_ppns_nip || valuesFormik?.pejabat_ppns_nip === ''
                      ? valuesFormik?.pejabat_ppns_nip
                      : valuesFormikExist?.pejabat_ppns_nip
                      ? valuesFormikExist?.pejabat_ppns_nip
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>NRK</Form.Label>
                <Form.Control
                  type='text'
                  name='pejabat_ppns_nrk'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={
                    valuesFormik?.pejabat_ppns_nrk || valuesFormik?.pejabat_ppns_nrk === ''
                      ? valuesFormik?.pejabat_ppns_nrk
                      : valuesFormikExist?.pejabat_ppns_nrk
                      ? valuesFormikExist?.pejabat_ppns_nrk
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-6'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Pangkat
                </label>
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptionsPangkat}
                  defaultOptions
                  onChange={(e) => handleChangeFormikSelect(e, 'pejabat_ppns_pangkat')}
                  value={
                    valuesFormik?.pejabat_ppns_pangkat &&
                    typeof valuesFormik?.pejabat_ppns_pangkat === 'object'
                      ? valuesFormik?.pejabat_ppns_pangkat
                      : valPangkat && valPangkat.label !== ''
                      ? valPangkat
                      : {value: '', label: 'Pilih'}
                  }
                  name='pejabat_ppns_pangkat'
                  placeholder={'Pilih'}
                  styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                  loadingMessage={() => 'Sedang mencari pilihan...'}
                  noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                />
              </div>
            </div>
            <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-6'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Golongan
                </label>
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptionsGolongan}
                  defaultOptions
                  onChange={(e) => handleChangeFormikSelect(e, 'pejabat_ppns_golongan')}
                  value={
                    valuesFormik?.pejabat_ppns_golongan &&
                    typeof valuesFormik?.pejabat_ppns_golongan === 'object'
                      ? valuesFormik?.pejabat_ppns_golongan
                      : valGolongan && valGolongan.label !== ''
                      ? valGolongan
                      : {value: '', label: 'Pilih'}
                  }
                  placeholder={'Pilih'}
                  styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                  loadingMessage={() => 'Sedang mencari pilihan...'}
                  noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                />
              </div>
            </div>

            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>No. SK. PPNS</Form.Label>
                <Form.Control
                  type='text'
                  name='no_sk_ppns'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={
                    valuesFormik?.no_sk_ppns || valuesFormik?.no_sk_ppns === ''
                      ? valuesFormik?.no_sk_ppns
                      : valuesFormikExist?.no_sk_ppns
                      ? valuesFormikExist?.no_sk_ppns
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>No. KTP. PPNS</Form.Label>
                <Form.Control
                  type='text'
                  name='no_ktp_ppns'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={
                    valuesFormik?.no_ktp_ppns || valuesFormik?.no_ktp_ppns === ''
                      ? valuesFormik?.no_ktp_ppns
                      : valuesFormikExist?.no_ktp_ppns
                      ? valuesFormikExist?.no_ktp_ppns
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>Wilayah Kerja</Form.Label>
                <Form.Control
                  type='text'
                  name='wilayah_kerja'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={
                    valuesFormik?.wilayah_kerja || valuesFormik?.wilayah_kerja === ''
                      ? valuesFormik?.wilayah_kerja
                      : valuesFormikExist?.wilayah_kerja
                      ? valuesFormikExist?.wilayah_kerja
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>UU yg dikawal</Form.Label>
                <Form.Control
                  type='text'
                  name='uu_yg_dikawal'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={
                    valuesFormik?.uu_yg_dikawal || valuesFormik?.uu_yg_dikawal === ''
                      ? valuesFormik?.uu_yg_dikawal
                      : valuesFormikExist?.uu_yg_dikawal
                      ? valuesFormikExist?.uu_yg_dikawal
                      : ''
                  }
                />
              </div>
            </div>
          </div>
          <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
            <Link to='/kepegawaian/penyidik-pegawai-negeri-sipil/tab-data-ppns'>
              <button className='float-none btn btn-light align-self-center m-1'>
                <i className='fa-solid fa-xmark'></i>Batal
              </button>
            </Link>
            <button className='float-none btn btn-primary align-self-center m-1' type='submit'>
              <i className='fa-solid fa-paper-plane'></i>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
