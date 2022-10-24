import React, {useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'

export interface FormInput {
  id?: number
  nama_lengkap?: string
  id_pegawai?: number
  no_pegawai?: number
  email?: string
  kata_sandi?: string
  hak_akses?: string
  status_pengguna?: string
  terakhir_login?: string
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
  nama_lengkap?: string
  id_pegawai?: number
  no_pegawai?: number
  email?: string
  kata_sandi?: string
  hak_akses?: string
  status_pengguna?: string
  terakhir_login?: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`

export function DetailDataPengguna() {
  const {id} = useParams()
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/find/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        nama_lengkap: jsonD.nama_lengkap,
        id_pegawai: jsonD.id_pegawai,
        no_pegawai: jsonD.no_pegawai,
        email: jsonD.email,
        kata_sandi: jsonD.kata_sandi,
        hak_akses: jsonD.hak_akses,
        status_pengguna: jsonD.status_pengguna,
        terakhir_login: jsonD.terakhir_login,
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
                        <Form.Label>Nama Lengkap</Form.Label>
                        <Form.Control
                          name='nama_lengkap'
                          className='form-control form-control-solid'
                          value={
                            valuesFormikExist?.nama_lengkap ? valuesFormikExist?.nama_lengkap : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Id Pegawai</Form.Label>
                        <Form.Control
                          name='id_pegawai'
                          className='form-control form-control-solid'
                          value={valuesFormikExist?.id_pegawai ? valuesFormikExist?.id_pegawai : ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>No Pegawai</Form.Label>
                        <Form.Control
                          name='no_pegawai'
                          className='form-control form-control-solid'
                          value={valuesFormikExist?.no_pegawai ? valuesFormikExist?.no_pegawai : ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name='email'
                          className='form-control form-control-solid'
                          value={valuesFormikExist?.email ? valuesFormikExist?.email : ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Kata Sandi</Form.Label>
                        <Form.Control
                          name='kata_sandi'
                          className='form-control form-control-solid'
                          value={valuesFormikExist?.kata_sandi ? valuesFormikExist?.kata_sandi : ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Hak Akses</Form.Label>
                        <Form.Control
                          name='hak_akses'
                          className='form-control form-control-solid'
                          value={valuesFormikExist?.hak_akses ? valuesFormikExist?.hak_akses : ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Status Pengguna</Form.Label>
                        <Form.Control
                          name='status_pengguna'
                          className='form-control form-control-solid'
                          value={
                            valuesFormikExist?.status_pengguna
                              ? valuesFormikExist?.status_pengguna
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Terakhir Login</Form.Label>
                        <Form.Control
                          name='terakhir_login'
                          className='form-control form-control-solid'
                          value={
                            valuesFormikExist?.terakhir_login
                              ? valuesFormikExist?.terakhir_login
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/apps/data-pengguna'>
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
