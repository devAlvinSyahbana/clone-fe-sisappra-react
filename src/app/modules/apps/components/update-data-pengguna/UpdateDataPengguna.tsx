import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import AsyncSelect from 'react-select/async'
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
  id?: number
  kata_sandi?: string
  hak_akses?: any
  updated_by?: number
  status_pengguna?: any
  no_pegawai?: string
  foto?: string
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
  kata_sandi?: string
  hak_akses?: any
  status_pengguna?: any
  no_pegawai?: string
  foto?: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`
export const MASTER_HAK_AKSES = `${API_URL}/manajemen-pengguna/hak-akses`

export function UpdateDataPengguna() {
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const navigate = useNavigate()
  const {id} = useParams()

  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/find/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        hak_akses: jsonD.hak_akses,
        kata_sandi: jsonD.kata_sandi,
        status_pengguna: jsonD.status_pengguna,
        updated_by: 0,
        no_pegawai: jsonD.no_pegawai,
      }
      getHakAksesVal(response.data.data.hak_akses)
      setValuesFormik(response.data.data)
      setValuesFormikExist((prevstate) => ({...prevstate, ...paramValue}))
    }
    fetchData()
  }, [id])

  // GET VALUE HAK AKSES
  const [valHakAkses, setValHakAkses] = useState({value: '', label: ''})
  const getHakAksesVal = async (params: any) => {
    if (params)
      return await axios
        .get(`${MASTER_HAK_AKSES}/findone/${parseInt(params)}`)
        .then((response) => {
          setValHakAkses((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.nama_hak_akses,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
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

  const handleChangeFormikSelect = (value: any, name: string) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  // AUTOCOMPLETE HAK AKSES
  const filterHakAkses = async (inputValue: string) => {
    const response = await axios.get(`${MASTER_HAK_AKSES}/filter-nama_hak_akses/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.nama_hak_akses, value: i.id}))
  }
  const loadOptionsHakAkses = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterHakAkses(inputValue))
    }, 1000)
  }

  const formik = useFormik({
    initialValues: {
      kata_sandi: '',
      no_pegawai: '',
      foto: '',
      hak_akses: {value: '', label: 'Pilih Hak Akses'},
      status_pengguna: {value: '', label: 'Status Pengguna'},
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        no_pegawai: valuesFormik?.no_pegawai
          ? valuesFormik.no_pegawai
          : valuesFormikExist?.no_pegawai
          ? valuesFormikExist.no_pegawai
          : '',
        kata_sandi: valuesFormik?.kata_sandi ? valuesFormik.kata_sandi : '',
        status_pengguna: valuesFormik?.status_pengguna
          ? valuesFormik.status_pengguna
          : valuesFormikExist?.status_pengguna
          ? valuesFormikExist.status_pengguna
          : 0,
        hak_akses: valuesFormik?.hak_akses?.value
          ? valuesFormik.hak_akses.value
          : valuesFormikExist?.hak_akses
          ? valuesFormikExist.hak_akses
          : 0,
        updated_by: 0,
      }
      try {
        const response = await axios.put(`${MANAJEMEN_PENGGUNA_URL}/update/${id}`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/apps/data-pengguna', {
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
    },
  })

  return (
    <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
      <div className='d-flex flex-column flex-column-fluid'>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card mb-2 mb-xl-1'>
              <div className='card-body'>
                <form onSubmit={formik.handleSubmit}>
                  <div className='row mt-2 '>
                    <div className='col-12 mb-6 text-center'>
                      <div className='me-7 mb-4'>
                        <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                          {valuesFormik && valuesFormik?.foto !== '' ? (
                            <div className='symbol-label'>
                              <img src={`${API_URL}/${valuesFormik?.foto}`} className='w-100' />
                            </div>
                          ) : (
                            <div
                              className={clsx(
                                'symbol-label fs-1',
                                `bg-light-secondary`,
                                `text-dark-secondary`
                              )}
                            ></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col-6 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type='password'
                          name='kata_sandi'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          // value={valuesFormik?.kata_sandi ? valuesFormik?.kata_sandi : ''}
                          placeholder='Ubah password'
                        />
                      </div>
                    </div>
                    <div className='col-6 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Hak Akses</Form.Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsHakAkses}
                          defaultOptions
                          onChange={(e) => handleChangeFormikSelect(e, 'hak_akses')}
                          value={
                            valuesFormik?.hak_akses && typeof valuesFormik?.hak_akses === 'object'
                              ? valuesFormik?.hak_akses
                              : valHakAkses && valHakAkses.label !== ''
                              ? valHakAkses
                              : {value: '', label: 'Pilih'}
                          }
                          name='hak_akses'
                          placeholder={'Pilih'}
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                          loadingMessage={() => 'Sedang mencari pilihan...'}
                          noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/apps/data-pengguna'>
                      <button className='btn btn-secondary'>
                        <i className='fa fa-close'></i>
                        Batal
                      </button>
                    </Link>
                    <button className='btn btn-primary' type='submit'>
                      <i className='fa-solid fa-paper-plane'></i>
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
