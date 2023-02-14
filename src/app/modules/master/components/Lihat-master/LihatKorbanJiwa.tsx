import React, {useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'

export interface FormInput {
  jenis_korban_jiwa?: string
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
  jenis_korban_jiwa?: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const JENIS_KORBAN_JIWA_URL = `${API_URL}/master/jenis-korban-jiwa` //http://localhost:3000/master/korban_jiwa

export function LihatKorbanJiwa() {
  const {id} = useParams()
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${JENIS_KORBAN_JIWA_URL}/findone/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        jenis_korban_jiwa: jsonD.jenis_korban_jiwa,
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
                        <Form.Label>Korban Jiwa</Form.Label>
                        <Form.Control
                          name='korban jiwa'
                          className='form-control form-control-solid'
                          value={
                            valuesFormikExist?.jenis_korban_jiwa
                              ? valuesFormikExist?.jenis_korban_jiwa
                              : ''
                          }
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/master/KorbanJiwa'>
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