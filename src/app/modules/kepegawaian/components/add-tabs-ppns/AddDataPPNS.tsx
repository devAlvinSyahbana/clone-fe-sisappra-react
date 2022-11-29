import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import * as Yup from 'yup'
import clsx from 'clsx'

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
}

const addPPNSSchema = Yup.object().shape({
  pejabat_ppns_nama: Yup.string().required('Wajib diisi'),
  pejabat_ppns_nip: Yup.string().required('Wajib diisi'),
  pejabat_ppns_nrk: Yup.string()
    .matches(/^[0-9]+$/, 'Isian harus berupa angka')
    .required('Wajib diisi'),
  no_ktp_ppns: Yup.string().required('Wajib diisi'),
  no_sk_ppns: Yup.string().required('Wajib diisi'),
  wilayah_kerja: Yup.string().required('Wajib diisi'),
  uu_yg_dikawal: Yup.string().required('Wajib diisi'),
})

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian` //http://localhost:3000/sarana-prasarana
export const SKPD_URL = `${API_URL}/master/skpd` //http://localhost:3000/skpd
export const PANGKAT_URL = `${API_URL}/master/pangkat` //http://localhost:3000/pangkat
export const GOLONGAN_URL = `${API_URL}/master/golongan` //http://localhost:3000/golongan

export function AddDataPPNS() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

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

  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})

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
      ...valuesFormik,
    },
    validationSchema: addPPNSSchema,
    enableReinitialize: true,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      const bodyparam: FormInput = {
        skpd: valuesFormik?.skpd?.value ? valuesFormik.skpd.value : 0,
        pejabat_ppns_pangkat: valuesFormik?.pejabat_ppns_pangkat?.value
          ? valuesFormik.pejabat_ppns_pangkat.value
          : 0,
        pejabat_ppns_golongan: valuesFormik?.pejabat_ppns_golongan?.value
          ? valuesFormik.pejabat_ppns_golongan.value
          : 0,
        pejabat_ppns_nama: valuesFormik?.pejabat_ppns_nama ? valuesFormik.pejabat_ppns_nama : '',
        pejabat_ppns_nip: valuesFormik?.pejabat_ppns_nip ? valuesFormik.pejabat_ppns_nip : '',
        pejabat_ppns_nrk: valuesFormik?.pejabat_ppns_nrk ? valuesFormik.pejabat_ppns_nrk : '',
        no_sk_ppns: valuesFormik?.no_sk_ppns ? valuesFormik.no_sk_ppns : '',
        no_ktp_ppns: valuesFormik?.no_ktp_ppns ? valuesFormik.no_ktp_ppns : '',
        wilayah_kerja: valuesFormik?.wilayah_kerja ? valuesFormik.wilayah_kerja : '',
        uu_yg_dikawal: valuesFormik?.uu_yg_dikawal ? valuesFormik.uu_yg_dikawal : '',
      }
      try {
        const response = await axios.post(`${KEPEGAWAIAN_URL}/create-PPNS`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/kepegawaian/penyidik-pegawai-negeri-sipil/tab-data-ppns', {replace: true})
          setSubmitting(false)
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
                <label htmlFor='' className='mb-3 required'>
                  SKPD
                </label>
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptionSKPD}
                  defaultOptions
                  onChange={(e) => handleChangeFormikSelect(e, 'skpd')}
                  value={valuesFormik?.skpd ? valuesFormik?.skpd : {value: '', label: 'Pilih'}}
                  placeholder={'Pilih'}
                  styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                  loadingMessage={() => 'Sedang mencari pilihan...'}
                  noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label className='required'>Nama</Form.Label>
                <Form.Control
                  // type='text'
                  {...formik.getFieldProps('pejabat_ppns_nama')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid':
                        formik.touched.pejabat_ppns_nama && formik.errors.pejabat_ppns_nama,
                    },
                    {
                      'is-valid':
                        formik.touched.pejabat_ppns_nama && !formik.errors.pejabat_ppns_nama,
                    }
                  )}
                  name='pejabat_ppns_nama'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.pejabat_ppns_nama}
                  placeholder='Masukkan Nama'
                />
                {formik.touched.pejabat_ppns_nama && formik.errors.pejabat_ppns_nama && (
                  <div className='fv-plugins-message-container mb-n7'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.pejabat_ppns_nama}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label className='required'>NIP</Form.Label>
                <Form.Control
                  // type='text'
                  {...formik.getFieldProps('pejabat_ppns_nip')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid':
                        formik.touched.pejabat_ppns_nip && formik.errors.pejabat_ppns_nip,
                    },
                    {
                      'is-valid':
                        formik.touched.pejabat_ppns_nip && !formik.errors.pejabat_ppns_nip,
                    }
                  )}
                  name='pejabat_ppns_nip'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.pejabat_ppns_nip}
                  placeholder='Masukkan NIP'
                />
                {formik.touched.pejabat_ppns_nip && formik.errors.pejabat_ppns_nip && (
                  <div className='fv-plugins-message-container mb-n7'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.pejabat_ppns_nip}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label className='required'>NRK</Form.Label>
                <Form.Control
                  {...formik.getFieldProps('pejabat_ppns_nrk')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid':
                        formik.touched.pejabat_ppns_nrk && formik.errors.pejabat_ppns_nrk,
                    },
                    {
                      'is-valid':
                        formik.touched.pejabat_ppns_nrk && !formik.errors.pejabat_ppns_nrk,
                    }
                  )}
                  // type='text'
                  name='pejabat_ppns_nrk'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.pejabat_ppns_nrk}
                  placeholder='Masukkan NRK'
                />
                {formik.touched.pejabat_ppns_nrk && formik.errors.pejabat_ppns_nrk && (
                  <div className='fv-plugins-message-container mb-n7'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.pejabat_ppns_nrk}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-6'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3 required'>
                  Pangkat
                </label>
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptionsPangkat}
                  defaultOptions
                  onChange={(e) => handleChangeFormikSelect(e, 'pejabat_ppns_pangkat')}
                  value={
                    valuesFormik?.pejabat_ppns_pangkat
                      ? valuesFormik?.pejabat_ppns_pangkat
                      : {value: '', label: 'Pilih'}
                  }
                  placeholder={'Pilih'}
                  styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                  loadingMessage={() => 'Sedang mencari pilihan...'}
                  noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                />
              </div>
            </div>
            <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-6'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3 required'>
                  Golongan
                </label>
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptionsGolongan}
                  defaultOptions
                  onChange={(e) => handleChangeFormikSelect(e, 'pejabat_ppns_golongan')}
                  value={
                    valuesFormik?.pejabat_ppns_golongan
                      ? valuesFormik?.pejabat_ppns_golongan
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
                <Form.Label className='required'>No. SK. PPNS</Form.Label>
                <Form.Control
                  {...formik.getFieldProps('no_sk_ppns')}
                  className={clsx(
                    'form-control bg-transparent',
                    {'is-invalid': formik.touched.no_sk_ppns && formik.errors.no_sk_ppns},
                    {
                      'is-valid': formik.touched.no_sk_ppns && !formik.errors.no_sk_ppns,
                    }
                  )}
                  // type='text'
                  name='no_sk_ppns'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.no_sk_ppns}
                  placeholder='Masukkan No SK PPNS'
                />
                {formik.touched.no_sk_ppns && formik.errors.no_sk_ppns && (
                  <div className='fv-plugins-message-container mb-n7'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.no_sk_ppns}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label className='required'>No. KTP. PPNS</Form.Label>
                <Form.Control
                  {...formik.getFieldProps('no_ktp_ppns')}
                  className={clsx(
                    'form-control bg-transparent',
                    {'is-invalid': formik.touched.no_ktp_ppns && formik.errors.no_ktp_ppns},
                    {
                      'is-valid': formik.touched.no_ktp_ppns && !formik.errors.no_ktp_ppns,
                    }
                  )}
                  // type='text'
                  name='no_ktp_ppns'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.no_ktp_ppns}
                  placeholder='Masukkan No KTP PPNS'
                />
                {formik.touched.no_ktp_ppns && formik.errors.no_ktp_ppns && (
                  <div className='fv-plugins-message-container mb-n7'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.no_ktp_ppns}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label className='required'>Wilayah Kerja</Form.Label>
                <Form.Control
                  {...formik.getFieldProps('wilayah_kerja')}
                  className={clsx(
                    'form-control bg-transparent',
                    {'is-invalid': formik.touched.wilayah_kerja && formik.errors.wilayah_kerja},
                    {
                      'is-valid': formik.touched.wilayah_kerja && !formik.errors.wilayah_kerja,
                    }
                  )}
                  // type='text'
                  name='wilayah_kerja'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.wilayah_kerja}
                  placeholder='Masukkan Wilayah Kerja'
                />
                {formik.touched.wilayah_kerja && formik.errors.wilayah_kerja && (
                  <div className='fv-plugins-message-container mb-n7'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.wilayah_kerja}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label className='required'>UU yg dikawal</Form.Label>
                <Form.Control
                  {...formik.getFieldProps('uu_yg_dikawal')}
                  className={clsx(
                    'form-control bg-transparent',
                    {'is-invalid': formik.touched.uu_yg_dikawal && formik.errors.uu_yg_dikawal},
                    {
                      'is-valid': formik.touched.uu_yg_dikawal && !formik.errors.uu_yg_dikawal,
                    }
                  )}
                  // type='text'
                  name='uu_yg_dikawal'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.uu_yg_dikawal}
                  placeholder='Masukkan UU yg dikawal'
                />
                {formik.touched.uu_yg_dikawal && formik.errors.uu_yg_dikawal && (
                  <div className='fv-plugins-message-container mb-n7'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.uu_yg_dikawal}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
            <Link to='/kepegawaian/penyidik-pegawai-negeri-sipil/tab-data-ppns'>
              <button className='float-none btn btn-light align-self-center m-1'>
                <i className='fa-solid fa-xmark'></i>Batal
              </button>
            </Link>

            <button
              className='float-none btn btn-primary align-self-center m-1'
              type='submit'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              <i className='fa-solid fa-paper-plane'></i>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
