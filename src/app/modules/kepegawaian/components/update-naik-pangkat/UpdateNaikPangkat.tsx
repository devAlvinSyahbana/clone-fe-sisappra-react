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
  nama?: string
  nrk?: number
  nip?: string
  jabatan?: string
  tempat_tugas?: string
  subbag_seksi_kecamatan?: string
  pangkat?: string
  golongan?: string
  tmt_pangkat?: number
  eselon?: string
  status_kenaikan_pangkat?: any
  updated_by?: number
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
  nama?: string
  nrk?: number
  nip?: string
  jabatan?: string
  tempat_tugas?: string
  subbag_seksi_kecamatan?: string
  pangkat?: string
  golongan?: string
  tmt_pangkat?: number
  eselon?: string
  status_kenaikan_pangkat?: any
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000

export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian` //http://localhost:3000/kepegawaian
export const STATUS_KENAIKAN_PANGKAT_URL = `${API_URL}/master/status_kenaikan_pangkat`

export function UpdateNaikPangkat() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const {id} = useParams()
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  const [inputValPangkat, setDataPangkat] = useState({label: '', value: null})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${KEPEGAWAIAN_URL}/rekapitulasi-pegawai-naik-pangkat/findone/${id}`
      )
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        nama: jsonD.nama,
        nrk: jsonD.nrk,
        nip: jsonD.nip,
        jabatan: jsonD.jabatan,
        tempat_tugas: jsonD.tempat_tugas,
        subbag_seksi_kecamatan: jsonD.subbag_seksi_kecamatan,
        pangkat: jsonD.pangkat,
        golongan: jsonD.golongan,
        tmt_pangkat: jsonD.tmt_pangkat,
        eselon: jsonD.eselon,
        status_kenaikan_pangkat: {
          value: jsonD.status_kenaikan_pangkat,
          label: jsonD.status_kenaikan_pangkat,
        },
        updated_by: 0,
      }
      setValuesFormikExist((prevstate) => ({...prevstate, ...paramValue}))
    }
    fetchData()
  }, [valuesFormik, id])

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
      nrk: '',
      nip: '',
      jabatan: '',
      tempat_tugas: '',
      subbag_seksi_kecamatan: '',
      pangkat: '',
      golongan: '',
      tmt_pangkat: 0,
      eselon: 0,
      status_kenaikan_pangkat: {value: '', label: 'Pilih'},
    },
    onSubmit: async (values) => {
      console.log(inputValPangkat)
      const bodyparam: FormInput = {
        status_kenaikan_pangkat: inputValPangkat?.value
          ? inputValPangkat.value
          : valuesFormikExist?.status_kenaikan_pangkat
          ? valuesFormikExist.status_kenaikan_pangkat
          : '',
        updated_by: 0,
      }
      try {
        const response = await axios.put(
          `${KEPEGAWAIAN_URL}/update-status-kenaikan-pangkat/${id}`,
          bodyparam
        )
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/kepegawaian/LaporanRekapitulasiPegawai/TabDataPegawaiYangNaikPangkat', {
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

  //Status Naik Pangkat
  const filterPangkat = async (inputValue: string) => {
    const response = await axios.get(`${STATUS_KENAIKAN_PANGKAT_URL}/find${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.status_kenaikan_pangkat, value: i.id}))
  }
  const loadOptionsPangkat = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterPangkat(inputValue))
    }, 1000)
  }
  const handleInputPangkat = (newValue: any) => {
    setDataPangkat((prevstate: any) => ({...prevstate, ...newValue}))
  }

  return (
    <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
      <div className='d-flex flex-column flex-column-fluid'>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card mb-2 mb-xl-1'>
              <div className='card-body'>
                <form onSubmit={formik.handleSubmit}>
                  <div className='row mt-2'>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>NIP</Form.Label>
                        <Form.Control
                          name='nip'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.nip || valuesFormik?.nip === ''
                              ? valuesFormik?.nip
                              : valuesFormikExist?.nip
                              ? valuesFormikExist?.nip
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>NRK</Form.Label>
                        <Form.Control
                          name='nrk'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.nrk || valuesFormik?.nrk === 0
                              ? valuesFormik?.nrk
                              : valuesFormikExist?.nrk
                              ? valuesFormikExist?.nrk
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Nama</Form.Label>
                        <Form.Control
                          name='nama'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.nama || valuesFormik?.nama === ''
                              ? valuesFormik?.nama
                              : valuesFormikExist?.nama
                              ? valuesFormikExist?.nama
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Pangkat</Form.Label>
                        <Form.Control
                          name='pangkat'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.pangkat || valuesFormik?.pangkat === ''
                              ? valuesFormik?.pangkat
                              : valuesFormikExist?.pangkat
                              ? valuesFormikExist?.pangkat
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>TMT Pangkat</Form.Label>
                        <Form.Control
                          name='tmt_pangkat'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.tmt_pangkat || valuesFormik?.tmt_pangkat === 0
                              ? valuesFormik?.tmt_pangkat
                              : valuesFormikExist?.tmt_pangkat
                              ? valuesFormikExist?.tmt_pangkat
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Jabatan</Form.Label>
                        <Form.Control
                          name='jabatan'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.jabatan || valuesFormik?.jabatan === ''
                              ? valuesFormik?.jabatan
                              : valuesFormikExist?.jabatan
                              ? valuesFormikExist?.jabatan
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Eselon</Form.Label>
                        <Form.Control
                          name='eselon'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.eselon || valuesFormik?.eselon === ''
                              ? valuesFormik?.eselon
                              : valuesFormikExist?.eselon
                              ? valuesFormikExist?.eselon
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Tempat Tugas Wilayah/Bidang</Form.Label>
                        <Form.Control
                          name='tempat_tugas'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.tempat_tugas || valuesFormik?.tempat_tugas === ''
                              ? valuesFormik?.tempat_tugas
                              : valuesFormikExist?.tempat_tugas
                              ? valuesFormikExist?.tempat_tugas
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Tempat Tugas Kecamatan/Seksi</Form.Label>
                        <Form.Control
                          name='subbag_seksi_kecamatan'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.subbag_seksi_kecamatan ||
                            valuesFormik?.subbag_seksi_kecamatan === ''
                              ? valuesFormik?.subbag_seksi_kecamatan
                              : valuesFormikExist?.subbag_seksi_kecamatan
                              ? valuesFormikExist?.subbag_seksi_kecamatan
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Golongan</Form.Label>
                        <Form.Control
                          name='golongan'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.golongan || valuesFormik?.golongan === ''
                              ? valuesFormik?.golongan
                              : valuesFormikExist?.golongan
                              ? valuesFormikExist?.golongan
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Status Kenaikan</Form.Label>
                        <AsyncSelect
                          cacheOptions
                          value={
                            inputValPangkat.value
                              ? inputValPangkat
                              : valuesFormikExist.status_kenaikan_pangkat &&
                                valuesFormikExist.status_kenaikan_pangkat.value !== ''
                              ? valuesFormikExist.status_kenaikan_pangkat
                              : {value: '', label: 'Pilih'}
                          }
                          loadOptions={loadOptionsPangkat}
                          defaultOptions
                          onChange={handleInputPangkat}
                          placeholder={'Pilih'}
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/kepegawaian/LaporanRekapitulasiPegawai/TabDataPegawaiYangNaikPangkat'>
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
