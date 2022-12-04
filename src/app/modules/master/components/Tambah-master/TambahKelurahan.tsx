import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'

export interface FormInput {
  kelurahan?: string
  kode_kecamatan?: string
  created_by?: number
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const KELURAHAN_URL = `${API_URL}/master/kelurahan` //http://localhost:3000/master/kelurahan

export function TambahKelurahan() {
  const navigate = useNavigate()

  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})

  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value.toUpperCase(),
    }))
  }

  const formik = useFormik({
    initialValues: {
      kelurahan: '',
      kode_kecamatan: '',
    },
    onSubmit: async (values) => {
      console.log(selectedFile)
      let formData = new FormData()
      const bodyparam: FormInput = {
        kelurahan: valuesFormik?.kelurahan ? valuesFormik.kelurahan : '',
        kode_kecamatan: valuesFormik?.kode_kecamatan ? valuesFormik.kode_kecamatan : '',
        created_by: 0,
      }
      try {
        const response = await axios.post(`${KELURAHAN_URL}/create`, bodyparam)
        if (response) {
          if (selectedFile) {
            formData.append('file_dokumentasi', selectedFile)
            const responseFile = await axios.post(
              `${KELURAHAN_URL}/upload-file/${response.data.data.return_id}`,
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
              navigate('/master/kelurahan', {replace: true})
            }
            return
          }
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/master/kelurahan', {replace: true})
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

  const [selectedFile, setSelectedFile] = useState(null)

  return (
    <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
      <div className='d-flex flex-column flex-column-fluid'>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card mb-3 mb-xl-2'>
              <div className='card-body'>
                <form onSubmit={formik.handleSubmit}>
                  <div className='row mt-2'>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>kelurahan</Form.Label>
                        <Form.Control
                          name='kelurahan'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={valuesFormik?.kelurahan}
                        />
                      </div>
                    </div>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Kode Kecamatan</Form.Label>
                        <Form.Control
                          name='kode_kecamatan'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={valuesFormik?.kode_kecamatan}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/master/kelurahan'>
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
