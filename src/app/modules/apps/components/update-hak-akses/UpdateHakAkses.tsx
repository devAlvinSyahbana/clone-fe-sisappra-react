import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'

export interface FormInput {
  id?: number
  nama_hak_akses?: string
  nama_permission?: number
  kode?: number
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
  nama_hak_akses?: string
  nama_permission?: number
  kode?: number
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`

export function UpdateHakAkses() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/hak-akses/findone/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        kode: jsonD.kode,
        nama_permission: jsonD.nama_permission,
        nama_hak_akses: jsonD.nama_hak_akses,
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
      id: 0,
      kode: '',
      nama_hak_akses: 0,
      nama_permission: 0,
      terakhir_login: 0,
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        kode: valuesFormik?.kode
          ? valuesFormik.kode
          : valuesFormikExist?.kode
          ? valuesFormikExist.kode
          : 0,
        nama_hak_akses: valuesFormik?.nama_hak_akses
          ? valuesFormik.nama_hak_akses
          : valuesFormikExist?.nama_hak_akses
          ? valuesFormikExist.nama_hak_akses
          : '',
        nama_permission: valuesFormik?.nama_permission
          ? valuesFormik.nama_permission
          : valuesFormikExist?.nama_permission
          ? valuesFormikExist.nama_permission
          : 0,
        updated_by: 0,
      }
      try {
        const response = await axios.put(
          `${MANAJEMEN_PENGGUNA_URL}/manajemen-pengguna/update/${id}`,
          bodyparam
        )
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/apps/detail-hak-akses/DetailHakAkses', {
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
                        <Form.Label>Nama Permission</Form.Label>
                        <Form.Control
                          name='nama_permission'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.nama_permission || valuesFormik?.nama_permission === 0
                              ? valuesFormik?.nama_permission
                              : valuesFormikExist?.nama_permission
                              ? valuesFormikExist?.nama_permission
                              : 0
                          }
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Kode</Form.Label>
                        <Form.Control
                          name='kode'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.kode || valuesFormik?.kode === 0
                              ? valuesFormik?.kode
                              : valuesFormikExist?.kode
                              ? valuesFormikExist?.kode
                              : 0
                          }
                        />
                      </div>
                    </div>
                    <div className='col-4 mb-3'>
                      <div className='form-group'>
                        <Form.Label>Nama Hak Akses</Form.Label>
                        <Form.Control
                          name='nama_hak_akses'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.nama_hak_akses || valuesFormik?.nama_hak_akses === ''
                              ? valuesFormik?.nama_hak_akses
                              : valuesFormikExist?.nama_hak_akses
                              ? valuesFormikExist?.nama_hak_akses
                              : ''
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/apps/detail-hak-akses/DetailHakAkses'>
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
