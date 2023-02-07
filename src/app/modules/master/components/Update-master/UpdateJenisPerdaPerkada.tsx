import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'

export interface FormInput {
  judul?: string
  deskripsi?: string
  updated_by?: number
}

interface GetDataInterface {
  id?: number
  judul?: string
  deskripsi?: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const JENIS_PERDA_PERKADA_URL = `${API_URL}/master/jenis-perda-perkada` //http://localhost:3000//master/jenis-perda-perkada

export function UpdateJenisPerdaPerkada() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [selectedFile, setSelectedFile] = useState(null)
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${JENIS_PERDA_PERKADA_URL}/findone/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        judul: jsonD.judul,
        deskripsi: jsonD.deskripsi,
        updated_by: 0,
      }
      setValuesFormikExist((prevstate) => ({...prevstate, ...paramValue}))
    }
    fetchData()
  }, [valuesFormik, id])

  // const handleChangeFormikSelect = (value: any, name: string) => {
  //   setValuesFormik((prevValues: any) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }))
  // }

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
      judul: '',
      deskripsi: '',
    },
    onSubmit: async (values) => {
      let formData = new FormData()
      const bodyparam: FormInput = {
        judul: valuesFormik?.judul
          ? valuesFormik.judul
          : valuesFormikExist?.judul
          ? valuesFormikExist.judul
          : '',
        deskripsi: valuesFormik?.deskripsi
          ? valuesFormik.deskripsi
          : valuesFormikExist?.deskripsi
          ? valuesFormikExist.deskripsi
          : '',
        updated_by: 0,
      }
      try {
        const response = await axios.put(`${JENIS_PERDA_PERKADA_URL}/update/${id}`, bodyparam)
        if (response) {
          if (selectedFile) {
            formData.append('file_dokumentasi', selectedFile)
            const responseFile = await axios.post(`${JENIS_PERDA_PERKADA_URL}/upload/${id}`, formData)
            if (responseFile) {
              console.log('File success uploaded!')
              Swal.fire({
                icon: 'success',
                title: 'Data berhasil disimpan',
                showConfirmButton: false,
                timer: 1500,
              })
              navigate('/master/JenisPerdaPerkada', {replace: true})
            }
            return
          }
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/master/JenisPerdaPerkada', {replace: true})
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
                        <Form.Label>Jenis Perda / Perkada</Form.Label>
                        <Form.Control
                          name='judul'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.judul || valuesFormik?.judul === ''
                              ? valuesFormik?.judul
                              : valuesFormikExist?.judul
                              ? valuesFormikExist?.judul
                              : ''
                          }
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Deskripsi</Form.Label>
                        <Form.Control
                          name='deskripsi'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.deskripsi || valuesFormik?.deskripsi === ''
                              ? valuesFormik?.deskripsi
                              : valuesFormikExist?.deskripsi
                              ? valuesFormikExist?.deskripsi
                              : ''
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/master/JenisPerdaPerkada'>
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
