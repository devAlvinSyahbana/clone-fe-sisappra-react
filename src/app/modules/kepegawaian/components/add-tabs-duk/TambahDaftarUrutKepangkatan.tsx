import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
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
        nrk_nptt_npjlp: valuesFormik?.nrk_nptt_npjlp ? valuesFormik.nrk_nptt_npjlp : 0,
        nip: valuesFormik?.nip ? valuesFormik.nip : '',
        status_pegawai: valuesFormik?.status_pegawai ? valuesFormik.status_pegawai : '',
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
          navigate('/kepegawaian/laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan', {
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

  const [selectedFile, setSelectedFile] = useState(null)

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
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>Status Pegawai</Form.Label>
                <Form.Control
                  type='text'
                  name='status_pegawai'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.status_pegawai}
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>NIP</Form.Label>
                <Form.Control
                  type='text'
                  name='nip'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.nip}
                  placeholder='Masukkan NIP'
                />
              </div>
            </div>
            <div className='col-6 mb-6'>
              <div className='form-group'>
                <Form.Label>NRK / NPTT / NPJLP</Form.Label>
                <Form.Control
                  type='number'
                  name='nrk_nptt_npjlp'
                  className='form-control form-control-solid'
                  onChange={handleChangeFormik}
                  value={valuesFormik?.nrk_nptt_npjlp}
                />
              </div>
            </div>
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
