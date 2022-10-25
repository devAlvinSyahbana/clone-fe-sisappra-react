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
  nama?: string
  nrk_nptt_npjlp?: number
  nip?: string
  status_pegawai?: string
  created_by?: number
}

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian` //http://localhost:3000/kepegawaian

export function TambahDaftarUrutKepangkatan() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const arrStatPegawai = ['PNS', 'PTT', 'PJLP']

  const [valStatPegawai, setValStatPegawai] = useState({val: ''})
  const [valInputNoPegawai, setValNoPegawai] = useState({val: 0})
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

  const handleChangeStatPegawai = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValStatPegawai((prevValues: any) => ({
      ...prevValues,
      val: event.target.value,
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

  const formik = useFormik({
    initialValues: {
      nama: '',
      nrk_nptt_npjlp: 0,
      nip: '',
      status_pegawai: '',
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        nama: valuesFormik?.nama ? valuesFormik.nama : '',
        nrk_nptt_npjlp: valInputNoPegawai?.val ? valInputNoPegawai.val : 0,
        nip: valuesFormik?.nip ? valuesFormik.nip : '',
        status_pegawai: valStatPegawai.val ? valStatPegawai.val : '',
        created_by: 0,
      }
      try {
        const response = await axios.post(
          `${KEPEGAWAIAN_URL}/rekapitulasi-duk-pegawai/create`,
          bodyparam
        )
        if (response) {
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/kepegawaian/laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan/', {
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
                  name='nama'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.nama}
                  placeholder='Masukkan nama'
                />
              </div>
            </div>
            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Status Kepegawaian
                </label>
                <select
                  className='form-select form-select-solid'
                  aria-label='Select example'
                  value={valStatPegawai.val}
                  onChange={handleChangeStatPegawai}
                  name='status_pegawai'
                >
                  <option value=''>Pilih</option>
                  {arrStatPegawai.map((val: string) => {
                    return <option value={val}>{val}</option>
                  })}
                </select>
              </div>
            </div>
            {valStatPegawai.val === 'PNS' || valStatPegawai.val === '' ? (
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  NRK
                </label>
                <input
                  type='number'
                  className='form-control form-control form-control-solid'
                  name='nrk_nptt_npjlp'
                  value={valInputNoPegawai.val}
                  onChange={handleChangeNoPegawai}
                  placeholder='Masukkan NRK'
                />
              </div>
            ) : null}
            {valStatPegawai.val === 'PNS' || valStatPegawai.val === '' ? (
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <label htmlFor='' className='mb-3'>
                  NIP
                </label>
                <input
                  type='text'
                  className='form-control form-control form-control-solid'
                  name='nip'
                  value={valuesFormik.nip}
                  onChange={handleChangeFormik}
                  placeholder='Masukkan NIP'
                />
              </div>
            ) : null}
            {valStatPegawai.val !== 'PNS' && valStatPegawai.val !== '' ? (
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12' id='fil_nrk'>
                <label htmlFor='' className='mb-3'>
                  {valStatPegawai.val === 'PTT'
                    ? 'NPTT'
                    : valStatPegawai.val === 'PJLP'
                    ? 'NPJLP'
                    : ''}
                </label>
                <input
                  type='number'
                  className='form-control form-control form-control-solid'
                  value={valInputNoPegawai.val}
                  onChange={handleChangeNoPegawai}
                  placeholder={
                    valStatPegawai.val === 'PTT'
                      ? 'Masukkan NPTT'
                      : valStatPegawai.val === 'PJLP'
                      ? 'Masukkan NPJLP'
                      : ''
                  }
                />
              </div>
            ) : null}
          </div>
          <div className='d-grid gap-2 d-md-flex justify-content-md-center mt-4'>
            <Link to='/kepegawaian/laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan'>
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
