import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import {KTSVG} from '../../../../_metronic/helpers'

export interface FormInput {
  jenis_sarana_prasarana?: any
  status_sarana_prasarana?: any
  jumlah?: number
  kondisi?: any
  keterangan?: string
  file_dokumentasi?: any
  updated_by?: string
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
  jenis_sarana_prasarana_id?: number
  jenis_sarana_prasarana_name?: string
  status_sarana_prasarana_id?: 0
  status_sarana_prasarana_name?: string
  jumlah?: number
  kondisi_id?: 0
  kondisi_name?: string
  keterangan?: string
  dokumentasi?: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const SARANA_PRASARANA_URL = `${API_URL}/sarana-prasarana` //http://localhost:3000/sarana-prasarana

export function UbahLaporanSarana() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [selectedFile, setSelectedFile] = useState(null)
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${SARANA_PRASARANA_URL}/findone/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        jenis_sarana_prasarana: {
          value: jsonD.jenis_sarana_prasarana_id,
          label: jsonD.jenis_sarana_prasarana_name,
        },
        status_sarana_prasarana: {
          value: jsonD.status_sarana_prasarana_id,
          label: jsonD.status_sarana_prasarana_name,
        },
        kondisi: {value: jsonD.kondisi_id, label: jsonD.kondisi_name},
        jumlah: jsonD.jumlah,
        keterangan: jsonD.keterangan,
        file_dokumentasi: jsonD.dokumentasi,
        updated_by: '',
      }
      setValuesFormikExist((prevstate) => ({...prevstate, ...paramValue}))
    }
    fetchData()
  }, [valuesFormik, id])

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
      let formData = new FormData()
      const bodyparam: FormInput = {
        jenis_sarana_prasarana: valuesFormik?.jenis_sarana_prasarana?.value
          ? valuesFormik.jenis_sarana_prasarana.value
          : valuesFormikExist?.jenis_sarana_prasarana?.value
          ? valuesFormikExist.jenis_sarana_prasarana.value
          : 0,
        status_sarana_prasarana: valuesFormik?.status_sarana_prasarana?.value
          ? valuesFormik.status_sarana_prasarana.value
          : valuesFormikExist?.status_sarana_prasarana?.value
          ? valuesFormikExist.status_sarana_prasarana.value
          : 0,
        kondisi: valuesFormik?.kondisi?.value
          ? valuesFormik.kondisi.value
          : valuesFormikExist?.kondisi?.value
          ? valuesFormikExist.kondisi.value
          : 0,
        keterangan: valuesFormik?.keterangan
          ? valuesFormik.keterangan
          : valuesFormikExist?.keterangan
          ? valuesFormikExist.keterangan
          : '',
        jumlah: valuesFormik?.jumlah
          ? valuesFormik.jumlah
          : valuesFormikExist?.jumlah
          ? valuesFormikExist.jumlah
          : 0,
        updated_by: '',
      }
      try {
        const response = await axios.put(`${SARANA_PRASARANA_URL}/update/${id}`, bodyparam)
        if (response) {
          if (selectedFile) {
            formData.append('file_dokumentasi', selectedFile)
            const responseFile = await axios.post(
              `${SARANA_PRASARANA_URL}/upload-file/${id}`,
              formData
            )
            if (responseFile) {
              console.log('File success uploaded!')
              Swal.fire({
                icon: 'success',
                title: 'Data berhasil disimpan',
                showConfirmButton: false,
                timer: 1500,
              })
              navigate('/sarana-prasarana/LaporanSaranaPrasarana', {replace: true})
            }
            return
          }
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/sarana-prasarana/LaporanSaranaPrasarana', {replace: true})
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
                              : valuesFormikExist?.jenis_sarana_prasarana?.value !== 0
                              ? valuesFormikExist?.jenis_sarana_prasarana
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
                              : valuesFormikExist?.status_sarana_prasarana?.value !== 0
                              ? valuesFormikExist?.status_sarana_prasarana
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
                              : valuesFormikExist?.kondisi?.value !== 0
                              ? valuesFormikExist?.kondisi
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
                          value={
                            valuesFormik?.jumlah || valuesFormik?.jumlah === 0
                              ? valuesFormik?.jumlah
                              : valuesFormikExist?.jumlah
                              ? valuesFormikExist?.jumlah
                              : 0
                          }
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
                          onChange={(event: {target: any}) =>
                            setSelectedFile(event.target.files[0])
                          }
                          accept='image/jpeg,image/png,application/pdf'
                        />
                        <small className='mt-4'>
                          *File yang dapat di upload berformat (.pdf, .jpeg, .png)
                        </small>
                        {valuesFormikExist?.file_dokumentasi &&
                        valuesFormikExist?.file_dokumentasi !== '' ? (
                          <>
                            <div className='card h-100 mt-3'>
                              <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                                <a
                                  className='text-gray-800 text-hover-primary d-flex flex-column'
                                  target='_blank'
                                  rel="noreferrer"
                                  href={`${API_URL}/${valuesFormikExist?.file_dokumentasi}`}
                                >
                                  <div className='symbol symbol-75px mb-5'>
                                    <KTSVG
                                      className='theme-light-show svg-icon svg-icon-5x me-1'
                                      path='/media/icons/duotune/files/fil003.svg'
                                    />
                                    <KTSVG
                                      className='theme-dark-show svg-icon svg-icon-5x me-1'
                                      path='/media/icons/duotune/files/fil003.svg'
                                    />
                                  </div>
                                  <div className='fs-5 fw-bold mb-2'>File Dokumentasi</div>
                                </a>
                              </div>
                            </div>
                          </>
                        ) : null}
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
                          value={
                            valuesFormik?.keterangan || valuesFormik?.keterangan === ''
                              ? valuesFormik?.keterangan
                              : valuesFormikExist?.keterangan
                              ? valuesFormikExist?.keterangan
                              : ''
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/sarana-prasarana/LaporanSaranaPrasarana'>
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
