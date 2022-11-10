import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'

export interface FormInput {
  id?: number
  nama_lengkap?: string
  id_pegawai?: number
  no_pegawai?: number
  email?: string
  kata_sandi?: string
  hak_akses?: number
  status_pengguna?: number
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
  nama_lengkap?: string
  id_pegawai?: number
  no_pegawai?: number
  email?: string
  kata_sandi?: string
  hak_akses?: number
  status_pengguna?: number
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`

export function UpdateDataPengguna() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
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
      nama_lengkap: '',
      id_pegawai: 0,
      no_pegawai: 0,
      email: '',
      kata_sandi: '',
      hak_akses: 0,
      status_pengguna: 0,
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        nama_lengkap: valuesFormik?.nama_lengkap
          ? valuesFormik.nama_lengkap
          : valuesFormikExist?.nama_lengkap
          ? valuesFormikExist.nama_lengkap
          : '',
        id_pegawai: valuesFormik?.id_pegawai
          ? valuesFormik.id_pegawai
          : valuesFormikExist?.id_pegawai
          ? valuesFormikExist.id_pegawai
          : 0,
        no_pegawai: valuesFormik?.no_pegawai
          ? valuesFormik.no_pegawai
          : valuesFormikExist?.no_pegawai
          ? valuesFormikExist.no_pegawai
          : 0,
        email: valuesFormik?.email
          ? valuesFormik.email
          : valuesFormikExist?.email
          ? valuesFormikExist.email
          : '',
        kata_sandi: valuesFormik?.kata_sandi
          ? valuesFormik.kata_sandi
          : valuesFormikExist?.kata_sandi
          ? valuesFormikExist.kata_sandi
          : '',
        hak_akses: valuesFormik?.hak_akses
          ? valuesFormik.hak_akses
          : valuesFormikExist?.hak_akses
          ? valuesFormikExist.hak_akses
          : 0,
        status_pengguna: valuesFormik?.status_pengguna
          ? valuesFormik.status_pengguna
          : valuesFormikExist?.status_pengguna
          ? valuesFormikExist.status_pengguna
          : 0,
        updated_by: 0,
      }
      try {
        const response = await axios.put(`${MANAJEMEN_PENGGUNA_URL}/update/${id}`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/apps/data-pengguna', {
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
                        <Form.Label>ID Pegawai</Form.Label>
                        <Form.Control
                          name='id_pegawai'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.id_pegawai || valuesFormik?.id_pegawai === 0
                              ? valuesFormik?.id_pegawai
                              : valuesFormikExist?.id_pegawai
                              ? valuesFormikExist?.id_pegawai
                              : ''
                          }
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Nama</Form.Label>
                        <Form.Control
                          name='nama_lengkap'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.nama_lengkap || valuesFormik?.nama_lengkap === ''
                              ? valuesFormik?.nama_lengkap
                              : valuesFormikExist?.nama_lengkap
                              ? valuesFormikExist?.nama_lengkap
                              : ''
                          }
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>No Pegawai</Form.Label>
                        <Form.Control
                          name='no_pegawai'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.no_pegawai || valuesFormik?.no_pegawai === 0
                              ? valuesFormik?.no_pegawai
                              : valuesFormikExist?.no_pegawai
                              ? valuesFormikExist?.no_pegawai
                              : ''
                          }
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name='email'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.email || valuesFormik?.email === ''
                              ? valuesFormik?.email
                              : valuesFormikExist?.email
                              ? valuesFormikExist?.email
                              : ''
                          }
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Hak Akses</Form.Label>
                        <Form.Control
                          type='number'
                          name='hak_akses'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.hak_akses || valuesFormik?.hak_akses === 0
                              ? valuesFormik?.hak_akses
                              : valuesFormikExist?.hak_akses
                              ? valuesFormikExist?.hak_akses
                              : ''
                          }
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Status Pengguna</Form.Label>
                        <Form.Control
                          name='status_pengguna'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.status_pengguna || valuesFormik?.status_pengguna === 0
                              ? valuesFormik?.status_pengguna
                              : valuesFormikExist?.status_pengguna
                              ? valuesFormikExist?.status_pengguna
                              : ''
                          }
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Kata Sandi</Form.Label>
                        <Form.Control
                          name='kata_sandi'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.kata_sandi || valuesFormik?.kata_sandi === ''
                              ? valuesFormik?.kata_sandi
                              : valuesFormikExist?.kata_sandi
                              ? valuesFormikExist?.kata_sandi
                              : ''
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/apps/data-pengguna'>
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
