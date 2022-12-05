import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'

export interface FormInput {
  nama?: string
  kategori?: string
  updated_by?: number
}

interface GetDataInterface {
  id?: number
  kode?: string
  nama?: string
  kategori?: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const BIDANG_WILAYAH_URL = `${API_URL}/master/bidang-wilayah` //http://localhost:3000//master/kota

export function UpdateTempatPelaksanaan() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [selectedFile, setSelectedFile] = useState(null)
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BIDANG_WILAYAH_URL}/findone/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        nama: jsonD.nama,
        kategori: jsonD.kategori,
        updated_by: 0,
      }
      setValuesFormikExist((prevstate) => ({...prevstate, ...paramValue}))
    }
    fetchData()
  }, [valuesFormik, id])

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
      nama: '',
      kategori: '',
    },
    onSubmit: async (values) => {
      let formData = new FormData()
      const bodyparam: FormInput = {
        nama : valuesFormik?.nama
          ? valuesFormik.nama
          : valuesFormikExist?.nama
          ? valuesFormikExist.nama
          : '',
          kategori: valuesFormik?.kategori
          ? valuesFormik.kategori
          : valuesFormikExist?.kategori
          ? valuesFormikExist.kategori
          : '',
        updated_by: 0,
      }
      try {
        const response = await axios.put(`${BIDANG_WILAYAH_URL}/update/${id}`, bodyparam)
        if (response) {
          if (selectedFile) {
            formData.append('file_dokumentasi', selectedFile)
            const responseFile = await axios.post(`${BIDANG_WILAYAH_URL}/upload/${id}`, formData)
            if (responseFile) {
              console.log('File success uploaded!')
              Swal.fire({
                icon: 'success',
                title: 'Data berhasil disimpan',
                showConfirmButton: false,
                timer: 1500,
              })
              navigate('/master/TempatPelaksanaan', {replace: true})
            }
            return
          }
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/master/TempatPelaksanaan', {replace: true})
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
                  <div className='row mt-2'>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Bidang Wilayah</Form.Label>
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
                        />
                        <Form.Label>Kategori</Form.Label>
                        <Form.Control
                          name='kategori'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.kategori || valuesFormik?.kategori === ''
                              ? valuesFormik?.kategori
                              : valuesFormikExist?.kategori
                              ? valuesFormikExist?.kategori
                              : ''
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/master/TempatPelaksanaan'>
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
