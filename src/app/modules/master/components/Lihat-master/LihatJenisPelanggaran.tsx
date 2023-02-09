import React, {useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'

export interface FormInput {
  jenis_pelanggaran?: string
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
  jenis_pelanggaran?: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const JENIS_PELANGGARAN_URL = `${API_URL}/master/Jenis-pelanggaran` //http://localhost:3000/sarana-prasarana

export function LihatJenisPelanggaran() {
  const {id} = useParams()
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${JENIS_PELANGGARAN_URL}/findone/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        jenis_pelanggaran: jsonD.jenis_pelanggaran,
        updated_by: '',
    }
    setValuesFormikExist((prevstate: any) => ({...prevstate, ...paramValue}))
    // console.log('respon data', valuesFormikExist)
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
                    <div className='col-5 mb-8'>
                      <div className='form-group'>
                        <Form.Label>Jenis Pelanggaran</Form.Label>
                        <Form.Control
                          name='jenis_pelanggaran'
                          className='form-control form-control-solid'
                          value={valuesFormikExist?.jenis_pelanggaran ? valuesFormikExist?.jenis_pelanggaran : ''}
                          readOnly
                        />
                      </div>
                    </div>
                    
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/master/JenisPelanggaran'>
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
