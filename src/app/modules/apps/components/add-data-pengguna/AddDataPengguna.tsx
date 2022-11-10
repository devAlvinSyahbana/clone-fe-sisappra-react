import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {number} from 'yup'
import AsyncSelect from 'react-select/async'

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
  nama_lengkap?: string
  id_pegawai?: string
  no_pegawai?: string
  kata_sandi?: string
  email?: string
  terakhir_login?: string
  hak_akses?: number
  status_pengguna?: number
}

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna` //http://localhost:3000/manajemen_pengguna/create
export const MASTER_HAK_AKSES = `${API_URL}/manajemen-pengguna/hak-akses`

export function AddDataPengguna() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [valInputHakAkses, setValHakAkses] = useState({val: 0})
  const [valInputStatusPengguna, setValStatusPengguna] = useState({val: 0})
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})

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

  const handleChangeHakAkses = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValHakAkses((prevValues: any) => ({
      ...prevValues,
      val: event.target.value,
    }))
  }

  const handleChangeStatusPengguna = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValStatusPengguna((prevValues: any) => ({
      ...prevValues,
      val: event.target.value,
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
      nama_lengkap: '',
      id_pegawai: '',
      no_pegawai: '',
      kata_sandi: '',
      email: '',
      terakhir_login: '',
      status_pengguna: 0,
      hak_akses: {value: '', label: 'Pilih Hak Akses'},
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        nama_lengkap: valuesFormik?.nama_lengkap ? valuesFormik.nama_lengkap : '',
        id_pegawai: valuesFormik?.id_pegawai ? valuesFormik.id_pegawai : '',
        no_pegawai: valuesFormik?.no_pegawai ? valuesFormik.no_pegawai : '',
        kata_sandi: valuesFormik?.kata_sandi ? valuesFormik.kata_sandi : '',
        email: valuesFormik?.email ? valuesFormik.email : '',
        terakhir_login: valuesFormik?.terakhir_login ? valuesFormik.terakhir_login : '',
        hak_akses: valInputHakAkses?.val ? valInputHakAkses.val : 0,
        status_pengguna: valInputStatusPengguna?.val ? valInputStatusPengguna.val : 0,
      }
      try {
        const response = await axios.post(`${MANAJEMEN_PENGGUNA_URL}/create`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/apps/data-pengguna/', {
            replace: true,
          })
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
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control
                  type='text'
                  name='nama_lengkap'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.nama_lengkap}
                  placeholder='Masukkan nama lengkap'
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  name='email'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.email}
                  placeholder='Masukkan alamat email'
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label> Password</Form.Label>
                <Form.Control
                  type='password'
                  name='kata_sandi'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.kata_sandi}
                  placeholder='Masukkan Password'
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
                    valuesFormik?.hak_akses ? valuesFormik?.hak_akses : {value: '', label: 'Pilih'}
                  }
                  placeholder={'Pilih'}
                  styles={calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem}
                  loadingMessage={() => 'Sedang mencari pilihan...'}
                  noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                />
              </div>
            </div>
          </div>
          <div className='d-grid gap-2 d-md-flex justify-content-md-center mt-4'>
            <Link to='/apps/data-pengguna'>
              <button className='float-none btn btn-light align-self-center m-1'>
                {' '}
                <i className='fa-solid fa-xmark'></i>Batal
              </button>
            </Link>
            <button className='float-none btn btn-primary align-self-center m-1' type='submit'>
              <i className='fa-sharp fa-solid fa-paper-plane'></i>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
