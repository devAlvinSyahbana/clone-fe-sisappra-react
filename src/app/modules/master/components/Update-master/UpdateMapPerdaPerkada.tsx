import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

export interface FormInput {
  id?: number
  judul?: string
  pasal?: string
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
  judul?: string
  pasal?: string
}

const MASTER_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL //http://localhost:3001
export const JENIS_PERDA_PERKADA_URL = `${MASTER_URL}/jenis-perda-perkada` //http://localhost:3001/jenis-perda-perkada

export function UpdateMapPerdaPerkada() {
  const { id } = useParams()
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${JENIS_PERDA_PERKADA_URL}`)
      const jsonD: GetDataInterface = response.data.data
      const data = { judul: jsonD.judul, pasal: jsonD.pasal, updated_by: '' }
      const putResponse = await axios.put(`${JENIS_PERDA_PERKADA_URL}/${id}`, data,
        { headers: { 'Content-Type': 'application/json' } })
      const updatedData: GetDataInterface = putResponse.data.data
      const paramValue: FormInput = {
        judul: updatedData.judul,
        pasal: updatedData.pasal,
        updated_by: '',
      }
      setValuesFormikExist((prevstate: any) => ({ ...prevstate, ...paramValue }))
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
                        <Form.Label>Jenis Perda / Perkada</Form.Label>
                        <Form.Control
                          name='judul'
                          className='form-control form-control-solid'
                          value={
                            valuesFormikExist?.judul
                              ? valuesFormikExist?.judul
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>

                    <div className='col-5 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Jenis Pasal</Form.Label>
                        <Form.Control
                          name='pasal'
                          className='form-control form-control-solid'
                          value={
                            valuesFormikExist?.pasal
                              ? valuesFormikExist?.pasal
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>

                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/master/MapPerdaPerkada'>
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