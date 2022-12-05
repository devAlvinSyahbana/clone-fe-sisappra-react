import React, {useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'

export interface FormInput {
  kecamatan?: string
  kode_kelurahan?: string
  kode_kecamatan?: string
  kelurahan?: string
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
  kode_kelurahan?: string
  kode_kecamatan?: string
  kelurahan?: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const KELURAHAN_URL = `${API_URL}/master/kelurahan` //http://localhost:3000/master/kelurahan
export function LihatKelurahan() {
  const {id} = useParams()
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KELURAHAN_URL}/findone/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        kecamatan: jsonD.kecamatan,
        kode_kelurahan: jsonD.kode_kelurahan,
        kode_kecamatan: jsonD.kode_kecamatan,
        kelurahan: jsonD.kelurahan,
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
                        <Form.Label>Kode Kelurahan</Form.Label>
                        <Form.Control
                          name='kode_kelurahan'
                          className='form-control form-control-solid'
                          value={
                            valuesFormikExist?.kode_kelurahan
                              ? valuesFormikExist?.kode_kelurahan
                              : ''
                          }
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
                        <Form.Label>Kelurahan</Form.Label>
                        <Form.Control
                          name='kelurahan'
                          className='form-control form-control-solid'
                          value={valuesFormikExist?.kelurahan ? valuesFormikExist?.kelurahan : ''}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/master/Kelurahan'>
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
