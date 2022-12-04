import React, {useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'

export interface FormInput {
  kecamatan?: string
  kode_kota?: string
  kode_kecamatan?: string
  kota?: string
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
  kecamatan?: string
  kode_kota?: string
  kode_kecamatan?: string
  kota?: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const KECAMATAN_URL = `${API_URL}/master/kecamatan` //http://localhost:3000/master/kecamatan
export function LihatKecamatan() {
  const {id} = useParams()
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KECAMATAN_URL}/findone/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        kecamatan: jsonD.kecamatan,
        kode_kota: jsonD.kode_kota,
        kode_kecamatan: jsonD.kode_kecamatan,
        kota: jsonD.kota,
        updated_by: '',
      }
      setValuesFormikExist((prevstate: any) => ({...prevstate, ...paramValue}))
    }
    fetchData()
  }, [valuesFormikExist, id])

  return (
    <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
      <div className='d-flex flex-column flex-column-fluid'>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card mb-3 mb-xl-2'>
              <div className='card-body'>
                <form>
                  <div className='row mt-2'>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Kecamatan</Form.Label>
                        <Form.Control
                          name='kecamatan'
                          className='form-control form-control-solid'
                          value={valuesFormikExist?.kecamatan ? valuesFormikExist?.kecamatan : ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Kode Kota</Form.Label>
                        <Form.Control
                          name='kode_kota'
                          className='form-control form-control-solid'
                          value={valuesFormikExist?.kode_kota ? valuesFormikExist?.kode_kota : ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Kode Kecamatan</Form.Label>
                        <Form.Control
                          name='kode_kecamatan'
                          className='form-control form-control-solid'
                          value={
                            valuesFormikExist?.kode_kecamatan
                              ? valuesFormikExist?.kode_kecamatan
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Kota</Form.Label>
                        <Form.Control
                          name='kota'
                          className='form-control form-control-solid'
                          value={valuesFormikExist?.kota ? valuesFormikExist?.kota : ''}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/master/Kecamatan'>
                      <button className='btn btn-secondary'>
                        <i className='fa-solid fa-arrow-left'></i>
                        Kembali
                      </button>
                    </Link>
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
