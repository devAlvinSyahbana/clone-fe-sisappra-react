import React from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'

export interface FormInput {
  jenis_sarana_prasarana?: any
  status_sarana_prasarana?: any
  jumlah?: number
  kondisi?: any
  keterangan?: string
  file_dokumentasi?: string
  created_by?: string
}

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const SARANA_PRASARANA_URL = `${API_URL}/sarana-prasarana` //http://localhost:3000/sarana-prasarana

export function TambahLaporanSarana() {
  const navigate = useNavigate()

  // AUTOCOMPLITE JENIS SARANA & PRASANAN
  const filterSapra = async (inputValue: string) => {
    const response = await axios.get(`${SARANA_PRASARANA_URL}/findjenis/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.jenis_sarana_prasarana, value: i.id}))
  }
  const loadOptionsSapra = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterSapra(inputValue))
    }, 1000)
  }

  // AUTOCOMPLITE STATUS SARANA & PRASANAN
  const filterStapra = async (inputValue: string) => {
    const response = await axios.get(`${SARANA_PRASARANA_URL}/findstatus/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.status_sarana_prasarana, value: i.id}))
  }
  const loadOptionsStapra = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterStapra(inputValue))
    }, 1000)
  }

  // AUTOCOMPLITE KONDISI SARANA & PRASANAN
  const filterKonpra = async (inputValue: string) => {
    const response = await axios.get(`${SARANA_PRASARANA_URL}/findkondisi/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.kondisi_sarana_prasarana, value: i.id}))
  }
  const loadOptionsKonpra = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterKonpra(inputValue))
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
      jenis_sarana_prasarana: {value: '', label: 'Pilih'},
      status_sarana_prasarana: {value: '', label: 'Pilih'},
      jumlah: 0,
      kondisi: {value: '', label: 'Pilih'},
      keterangan: '',
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        jenis_sarana_prasarana: valuesFormik?.jenis_sarana_prasarana?.value
          ? valuesFormik.jenis_sarana_prasarana.value
          : 0,
        status_sarana_prasarana: valuesFormik?.status_sarana_prasarana?.value
          ? valuesFormik.status_sarana_prasarana.value
          : 0,
        kondisi: valuesFormik?.kondisi?.value ? valuesFormik.kondisi.value : 0,
        keterangan: valuesFormik?.keterangan ? valuesFormik.keterangan : '',
        jumlah: valuesFormik?.jumlah ? valuesFormik.jumlah : 0,
        created_by: '',
      }
      try {
        const response = await axios.post(`${SARANA_PRASARANA_URL}/create`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/sarana_prasarana/LaporanSaranaPrasarana', {replace: true})
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Data gagal disimpan, harap mencoba lagi',
          showConfirmButton: false,
          timer: 1500
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
            <div className='card mb-3 mb-xl-2'>
              <div className='card-body'>
                <form onSubmit={formik.handleSubmit}>
                  <div className='row mt-2'>
                    <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-6'>
                      <div className='form-group'>
                        <label htmlFor='' className='mb-3'>
                          Jenis Sarana & Prasarana
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsSapra}
                          defaultOptions
                          onChange={(e) => handleChangeFormikSelect(e, 'jenis_sarana_prasarana')}
                          value={
                            valuesFormik?.jenis_sarana_prasarana
                              ? valuesFormik?.jenis_sarana_prasarana
                              : {value: '', label: 'Pilih'}
                          }
                          placeholder={'Pilih'}
                        />
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-6'>
                      <div className='form-group'>
                        <label htmlFor='' className='mb-3'>
                          Status Sarana & Prasarana
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsStapra}
                          defaultOptions
                          onChange={(e) => handleChangeFormikSelect(e, 'status_sarana_prasarana')}
                          value={
                            valuesFormik?.status_sarana_prasarana
                              ? valuesFormik?.status_sarana_prasarana
                              : {value: '', label: 'Pilih'}
                          }
                          placeholder={'Pilih'}
                        />
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-6'>
                      <div className='form-group'>
                        <label htmlFor='' className='mb-3'>
                          Kondisi
                        </label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsKonpra}
                          defaultOptions
                          onChange={(e) => handleChangeFormikSelect(e, 'kondisi')}
                          value={
                            valuesFormik?.kondisi
                              ? valuesFormik?.kondisi
                              : {value: '', label: 'Pilih'}
                          }
                          placeholder={'Pilih'}
                        />
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-6'>
                      <div className='form-group'>
                        <label htmlFor='' className='mb-3'>
                          Jumlah
                        </label>
                        <input
                          className='form-control form-control form-control-solid'
                          name='jumlah'
                          type='number'
                          min='0'
                          onChange={handleChangeFormik}
                          onBlur={formik.handleBlur}
                          value={valuesFormik?.jumlah}
                        />
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-6'>
                      <div className='form-group'>
                        <Form.Label>File Dokumentasi</Form.Label>
                        <Form.Control
                          type='file'
                          className='form-control form-control-solid'
                          id='firstimg'
                        />
                      </div>
                    </div>
                    <div className='col-12 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Keterangan</Form.Label>
                        <Form.Control
                          as='textarea'
                          name='keterangan'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={valuesFormik?.keterangan}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/sarana_prasarana/LaporanSaranaPrasarana'>
                      <button className='btn btn-secondary'>
                        <i className='fa-solid fa-arrow-left'></i>
                        Kembali
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
