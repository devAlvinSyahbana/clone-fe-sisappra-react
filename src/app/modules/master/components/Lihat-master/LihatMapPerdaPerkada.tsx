import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

export interface FormInput {
  id?: number
  judul?: string
  pasal?: string
  jenis_penertiban?: string
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

const MASTER_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL //http://localhost:3001
export const JENIS_PERDA_PERKADA_URL = `${MASTER_URL}/jenis-perda-perkada` //http://localhost:3001/jenis-perda-perkada

export function LihatMapPerdaPerkada() {
  const { id } = useParams()
  const [data, setData] = useState<FormInput[]>([])
  const [loading, setLoading] = useState(true)

  const LihatMapPerdaPerkada = async () => {
    axios.get(`${JENIS_PERDA_PERKADA_URL}/?%24filter=id%20eq%20%27${id}%27`)
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          judul: d.judul,
          pasal: d.pasal,
          jenis_penertiban: d.jenis_penertiban,
          jenis_pelanggaran: d.jenis_pelanggaran,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        setData(data)
        setLoading(false)

        return [data, setData] as const
      })
  }
  useEffect(() => {
    LihatMapPerdaPerkada()
  }, [id])

  return (
    <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
      <div className='d-flex flex-column flex-column-fluid'>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card mb-3 mb-xl-2'>
              <div className='card-body'>
                <form>
                  <div className="row g-8 mt-2 ms-5 me-5">
                    <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-6'>
                      <div className='form-group'>
                        <Form.Label>Jenis Perda / Perkada</Form.Label>
                        <Form.Control
                          name='judul'
                          className='form-control form-control-solid'
                          value={data[0]?.judul || ''}
                        />
                      </div>
                    </div>

                    <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-6'>
                      <div className='form-group'>
                        <Form.Label>Jenis Pasal</Form.Label>
                        <Form.Control
                          name='pasal'
                          className='form-control form-control-solid'
                          value={data[0]?.pasal || ''}
                        />
                      </div>
                    </div>

                    <div className='col-xxl-10 col-lg-12 col-md-3 col-sm-12'>
                      <div className='form-group'>
                        <Form.Label>Jenis Penertiban</Form.Label>
                        <Form.Control
                          as='textarea'
                          name='j_penertiban'
                          className='form-control form-control-solid'
                          value={data[0]?.jenis_penertiban || ''}
                        />
                      </div>
                    </div>

                    <div className='col-xxl-10 col-lg-12 col-md-3 col-sm-12'>
                      <div className='form-group mb-10'>
                        <Form.Label>Jenis Pelanggaran</Form.Label>
                        <Form.Control
                          as='textarea'
                          name='j_pelanggaran'
                          className='form-control form-control-solid'
                          value={data[0]?.jenis_pelanggaran || ''}
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
