import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {number} from 'yup'

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

  const formik = useFormik({
    initialValues: {
      nama_lengkap: '',
      id_pegawai: '',
      no_pegawai: '',
      kata_sandi: '',
      email: '',
      terakhir_login: '',
      status_pengguna: 0,
      hak_akses: 0,
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
          navigate('apps/data-pengguna/tambah-data-pengguna', {
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
                <Form.Label>Nama</Form.Label>
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
                <Form.Label>ID Pegawai</Form.Label>
                <Form.Control
                  type='text'
                  name='id_pegawai'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.id_pegawai}
                  placeholder='Masukkan id pegawai'
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>No Pegawai</Form.Label>
                <Form.Control
                  type='text'
                  name='no_pegawai'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.no_pegawai}
                  placeholder='Masukkan nomor pegawai'
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>Kata Sandi</Form.Label>
                <Form.Control
                  type='text'
                  name='kata_sandi'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.kata_sandi}
                  placeholder='Masukkan kata sandi'
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
                <Form.Label>Hak Akses</Form.Label>
                <Form.Control
                  type='number'
                  name='hak_akses'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.hak_akses}
                  placeholder='Masukkan hak akses'
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>Status Pengguna</Form.Label>
                <Form.Control
                  type='number'
                  name='status_pengguna'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.status_pengguna}
                  placeholder='Masukkan status pengguna'
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>Terakhir Login</Form.Label>
                <Form.Control
                  type='string'
                  name='terakhir_login'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.terakhir_login}
                  placeholder='Masukkan terakhir login'
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
