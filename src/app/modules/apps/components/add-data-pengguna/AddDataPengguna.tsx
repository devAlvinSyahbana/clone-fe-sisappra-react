import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import AsyncSelect from 'react-select/async'
import ReactCrop, {centerCrop, makeAspectCrop, Crop, PixelCrop} from 'react-image-crop'
import {canvasPreview} from '../handlerFotoP/canvasPreview'
import {useDebounceEffect} from '../handlerFotoP/useDebounceEffect'
import {Modal} from 'react-bootstrap'

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
  no_pegawai?: string
  kata_sandi?: string
  email?: string
  hak_akses?: any
  status_pengguna?: any
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

  // const {id} = useParams()
  const [valStatPegawai, setValStatPegawai] = useState({val: ''})
  const [valInputNoPegawai, setValNoPegawai] = useState({val: ''})
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

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

  const handleChangeNoPegawai = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValNoPegawai((prevValues: any) => ({
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
      no_pegawai: '',
      kata_sandi: '12345',
      email: '',
      foto: '',
      status_pengguna: {value: '', label: 'Pilih status pengguna'},
      hak_akses: {value: '', label: 'Pilih Hak Akses'},
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        nama_lengkap: valuesFormik?.nama_lengkap ? valuesFormik.nama_lengkap : '',
        kata_sandi: valuesFormik?.kata_sandi ? valuesFormik.kata_sandi : '12345',
        email: valuesFormik?.email ? valuesFormik.email : '',
        status_pengguna: valuesFormik?.status_pengguna ? valuesFormik.status_pengguna : 0,
        hak_akses: valuesFormik?.hak_akses?.value ? valuesFormik.hak_akses.value : 0,
        no_pegawai: valInputNoPegawai?.val ? valInputNoPegawai.val : '',
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
            {valStatPegawai.val === 'Non - PNS' ? (
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
            ) : null}
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>No Pegawai</Form.Label>
                <input
                  type='number'
                  className='form-control form-control form-control-solid'
                  value={valuesFormik?.no_pegawai}
                  onChange={handleChangeNoPegawai}
                  placeholder='Masukkan nomor NRK / NPTT / NPJLP'
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
            {/* <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='kata_sandi'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.kata_sandi}
                  placeholder='Otomatis Inputan'
                  readOnly
                />
              </div>
            </div> */}
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
