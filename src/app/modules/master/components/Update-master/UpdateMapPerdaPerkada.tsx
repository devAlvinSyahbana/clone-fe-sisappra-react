import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'

export interface FormInput {
  judul?: string
  pasal?: string
  jenis_penertiban?: string
  jenis_pelanggaran?: string
  updated_by?: number
}

interface GetDataInterface {
  id?: number
  judul?: string
  pasal?: string
  jenis_penertiban?: string
  jenis_pelanggaran?: string
}

const MASTER_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL //http://localhost:3000
export const JENIS_PERDA_PERKADA_URL = `${MASTER_URL}/jenis-perda-perkada` //http://localhost:3000//master/jenis-perda-perkada

export function UpdateMapPerdaPerkada() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${JENIS_PERDA_PERKADA_URL}/?%24filter=id%20eq%20%27${id}%27`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        judul: jsonD.judul,
        pasal: jsonD.pasal,
        jenis_penertiban: jsonD.jenis_penertiban,
        jenis_pelanggaran: jsonD.jenis_pelanggaran,
        updated_by: 0,
      }
      setValuesFormikExist((prevstate) => ({ ...prevstate, ...paramValue }))
    }
    fetchData()
  }, [valuesFormik, id])

  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }

  const formik = useFormik({
    initialValues: {
      judul: '',
      pasal: '',
      jenis_penertiban: '',
      jenis_pelanggaran: '',
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        judul: valuesFormik?.judul
          ? valuesFormik.judul
          : valuesFormikExist?.judul
            ? valuesFormikExist.judul
            : '',
        pasal: valuesFormik?.pasal
          ? valuesFormik.pasal
          : valuesFormikExist?.pasal
            ? valuesFormikExist.pasal
            : '',
        jenis_penertiban: valuesFormik?.jenis_penertiban
          ? valuesFormik.jenis_penertiban
          : valuesFormikExist?.jenis_penertiban
            ? valuesFormikExist.jenis_penertiban
            : '',
        jenis_pelanggaran: valuesFormik?.jenis_pelanggaran
          ? valuesFormik.jenis_pelanggaran
          : valuesFormikExist?.jenis_pelanggaran
            ? valuesFormikExist.jenis_pelanggaran
            : '',
        updated_by: 0,
      }
      try {
        const response = await axios.put(`${JENIS_PERDA_PERKADA_URL}/${id}`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/master/MapPerdaPerkada', { replace: true })
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
                  <div className='row g-8 mt-2 ms-5 me-5'>
                    <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-6'>
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
                    <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-6'>
                      <div className='form-group'>
                        <Form.Label>Jenis Pasal</Form.Label>
                        <Form.Control
                          name='pasal'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.pasal || valuesFormik?.pasal === ''
                              ? valuesFormik?.pasal
                              : valuesFormikExist?.pasal
                                ? valuesFormikExist?.pasal
                                : ''
                          }
                        />
                      </div>
                    </div>
                    <div className='col-xxl-10 col-lg-12 col-md-3 col-sm-12'>
                      <div className='form-group'>
                        <Form.Label>Jenis Penertiban</Form.Label>
                        <Form.Control
                          as='textarea'
                          name='jenis_penertiban'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.jenis_penertiban || valuesFormik?.jenis_penertiban === ''
                              ? valuesFormik?.jenis_penertiban
                              : valuesFormikExist?.jenis_penertiban
                                ? valuesFormikExist?.jenis_penertiban
                                : ''
                          }
                        />
                      </div>
                    </div>
                    <div className='col-xxl-10 col-lg-12 col-md-3 col-sm-12'>
                      <div className='form-group'>
                        <Form.Label>Jenis Pelanggaran</Form.Label>
                        <Form.Control
                          as='textarea'
                          name='jenis_pelanggaran'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.jenis_pelanggaran || valuesFormik?.jenis_pelanggaran === ''
                              ? valuesFormik?.jenis_pelanggaran
                              : valuesFormikExist?.jenis_pelanggaran
                                ? valuesFormikExist?.jenis_pelanggaran
                                : ''
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row g-8 mt-2 ms-5 me-5">
                    <div className='d-md-flex justify-content-md-center'>
                      <Link to='/master/MapPerdaPerkada'>
                        <button className='btn btn-secondary me-2'>
                          <i className='fa-solid fa-arrow-left'></i>
                          Kembali
                        </button>
                      </Link>
                      <button className='btn btn-primary' type='submit'>
                        <i className='fa-solid fa-paper-plane'></i>
                        Simpan
                      </button>
                    </div>
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