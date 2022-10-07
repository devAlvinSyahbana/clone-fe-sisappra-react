import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'

export interface FormInput {
  kepegawaian_nip?: string
  nama?: string
  updated_by?: number
}

interface GetDataInterface {
  id?: number
  kepegawaian_nip?: string
  nama?: string
}

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian` //http://localhost:3000/kepegawaian
export const PANGKAT_URL = `${API_URL}/master/pangkat`

export function UpdateNaikPangkat() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [selectedFile, setSelectedFile] = useState(null)
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  const [inputValPangkat, setDataPangkat] = useState({label: '', value: null})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KEPEGAWAIAN_URL}/findone/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        nama: jsonD.nama,
        kepegawaian_nip: jsonD.kepegawaian_nip,
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
      kepegawaian_nip: '',
    },
    onSubmit: async (values) => {
      let formData = new FormData()
      const bodyparam: FormInput = {
        nama: valuesFormik?.nama
          ? valuesFormik.nama
          : valuesFormikExist?.nama
          ? valuesFormikExist.nama
          : '',
        kepegawaian_nip: valuesFormik?.kepegawaian_nip
          ? valuesFormik.kepegawaian_nip
          : valuesFormikExist?.kepegawaian_nip
          ? valuesFormikExist.kepegawaian_nip
          : '',
        updated_by: 0,
      }
      try {
        const response = await axios.put(`${KEPEGAWAIAN_URL}/update/${id}`, bodyparam)
        if (response) {
          if (selectedFile) {
            formData.append('file_dokumentasi', selectedFile)
            const responseFile = await axios.post(`${KEPEGAWAIAN_URL}/upload/${id}`, formData)
            if (responseFile) {
              console.log('File success uploaded!')
              Swal.fire({
                icon: 'success',
                title: 'Data berhasil disimpan',
                showConfirmButton: false,
                timer: 1500,
              })
              navigate('/kepegawaian/TabDataPegawaiYangNaikPangkat', {replace: true})
            }
            return
          }
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/kepegawaian/TabDataPegawaiYangNaikPangkat', {replace: true})
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

  const filterPangkat = async (inputValue: string) => {
    const response = await axios.get(`${PANGKAT_URL}/find${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.pangkat, value: i.id}))
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
                        <Form.Label>NRK</Form.Label>
                        <Form.Control
                          name='kepegawaian_nip'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.kepegawaian_nip || valuesFormik?.kepegawaian_nip === ''
                              ? valuesFormik?.kepegawaian_nip
                              : valuesFormikExist?.kepegawaian_nip
                              ? valuesFormikExist?.kepegawaian_nip
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
                          name='kepegawaian_nip'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.kepegawaian_nip || valuesFormik?.kepegawaian_nip === ''
                              ? valuesFormik?.kepegawaian_nip
                              : valuesFormikExist?.kepegawaian_nip
                              ? valuesFormikExist?.kepegawaian_nip
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
                        <Form.Label>Jabatan</Form.Label>
                        <Form.Control
                          name='kepegawaian_nip'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.kepegawaian_nip || valuesFormik?.kepegawaian_nip === ''
                              ? valuesFormik?.kepegawaian_nip
                              : valuesFormikExist?.kepegawaian_nip
                              ? valuesFormikExist?.kepegawaian_nip
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>No Telepon</Form.Label>
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
                        <Form.Label>Eselon</Form.Label>
                        <Form.Control
                          name='kepegawaian_nip'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.kepegawaian_nip || valuesFormik?.kepegawaian_nip === ''
                              ? valuesFormik?.kepegawaian_nip
                              : valuesFormikExist?.kepegawaian_nip
                              ? valuesFormikExist?.kepegawaian_nip
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
                        <Form.Label>Tempat Tugas nama/Seksi</Form.Label>
                        <Form.Control
                          name='kepegawaian_nip'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.kepegawaian_nip || valuesFormik?.kepegawaian_nip === ''
                              ? valuesFormik?.kepegawaian_nip
                              : valuesFormikExist?.kepegawaian_nip
                              ? valuesFormikExist?.kepegawaian_nip
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
                        <Form.Label>Status Kenaikan</Form.Label>
                        <AsyncSelect
                          cacheOptions
                          value={
                            inputValPangkat.value ? inputValPangkat : {value: '', label: 'Pilih'}
                          }
                          loadOptions={loadOptionsPangkat}
                          defaultOptions
                          onChange={handleInputPangkat}
                          placeholder={'Pilih'}
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Jadwal Kenaikan</Form.Label>
                        <Form.Control
                          name='kepegawaian_nip'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.kepegawaian_nip || valuesFormik?.kepegawaian_nip === ''
                              ? valuesFormik?.kepegawaian_nip
                              : valuesFormikExist?.kepegawaian_nip
                              ? valuesFormikExist?.kepegawaian_nip
                              : ''
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/kepegawaian/LaporanRekapitulasiPegawai/TabDataPegawaiYangNaikPangkat/'>
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
