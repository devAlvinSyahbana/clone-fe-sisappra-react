import React, {useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {KTSVG} from '../../../../_metronic/helpers'

export interface FormInput {
  jenis_sarana_prasarana?: any
  status_sarana_prasarana?: any
  jumlah?: number
  kondisi?: any
  keterangan?: string
  file_dokumentasi?: any
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
  jenis_sarana_prasarana_id?: number
  jenis_sarana_prasarana_name?: string
  status_sarana_prasarana_id?: 0
  status_sarana_prasarana_name?: string
  jumlah?: number
  kondisi_id?: 0
  kondisi_name?: string
  keterangan?: string
  dokumentasi?: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const SARANA_PRASARANA_URL = `${API_URL}/sarana-prasarana` //http://localhost:3000/sarana-prasarana

export function LihatLaporanSarana() {
  const {id} = useParams()
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${SARANA_PRASARANA_URL}/findone/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        jenis_sarana_prasarana: {
          value: jsonD.jenis_sarana_prasarana_id,
          label: jsonD.jenis_sarana_prasarana_name,
        },
        status_sarana_prasarana: {
          value: jsonD.status_sarana_prasarana_id,
          label: jsonD.status_sarana_prasarana_name,
        },
        kondisi: {value: jsonD.kondisi_id, label: jsonD.kondisi_name},
        jumlah: jsonD.jumlah,
        keterangan: jsonD.keterangan,
        file_dokumentasi: jsonD.dokumentasi,
        updated_by: '',
      }
      setValuesFormikExist((prevstate: any) => ({...prevstate, ...paramValue}))
    }
    fetchData()
  }, [valuesFormikExist, id])

  return (
    <div className='card mb-3 mb-xl-2'>
      <div className='card-body'>
        <form>
          <div className='row mt-2'>
            <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-6'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Jenis Sarana & Prasarana
                </label>
                <input
                  className='form-control form-control-solid'
                  name='jenis_sarpra'
                  type='text'
                  value={
                    valuesFormikExist?.jenis_sarana_prasarana?.value !== 0
                      ? valuesFormikExist?.jenis_sarana_prasarana?.label
                      : ''
                  }
                  readOnly
                />
              </div>
            </div>
            <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-6'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Status Sarana & Prasarana
                </label>
                <input
                  className='form-control form-control-solid'
                  name='stat_sarpra'
                  type='text'
                  value={
                    valuesFormikExist?.status_sarana_prasarana?.value !== 0
                      ? valuesFormikExist?.status_sarana_prasarana?.label
                      : ''
                  }
                  readOnly
                />
              </div>
            </div>
            <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-6'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Kondisi
                </label>
                <input
                  className='form-control form-control-solid'
                  name='kondisi'
                  type='text'
                  value={
                    valuesFormikExist?.kondisi?.value !== 0 ? valuesFormikExist?.kondisi?.label : ''
                  }
                  readOnly
                />
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-6'>
              <div className='form-group'>
                <label htmlFor='' className='mb-3'>
                  Jumlah
                </label>
                <input
                  className='form-control form-control-solid'
                  name='jumlah'
                  type='number'
                  min='0'
                  value={valuesFormikExist?.jumlah ? valuesFormikExist?.jumlah : 0}
                  readOnly
                />
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-6'>
              <div className='form-group'>
                <Form.Label>File Dokumentasi</Form.Label>
                <div className='card h-100 mt-3'>
                  <div className='card-body d-flex justify-content-center text-center flex-column p-4 border-gray-300 border-dotted'>
                    {valuesFormikExist?.file_dokumentasi &&
                    valuesFormikExist?.file_dokumentasi !== '' ? (
                      <>
                        <a
                          className='text-gray-800 text-hover-primary d-flex flex-column'
                          target='_blank'
                          rel='noreferrer'
                          href={`${API_URL}/${valuesFormikExist?.file_dokumentasi}`}
                        >
                          <div className='symbol symbol-75px mb-5'>
                            <KTSVG
                              className='theme-light-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil003.svg'
                            />
                            <KTSVG
                              className='theme-dark-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil003.svg'
                            />
                          </div>
                          <div className='fs-5 fw-bold mb-2'>File Dokumentasi</div>
                        </a>
                      </>
                    ) : (
                      <>
                        <div className='text-gray-800 text-hover-primary d-flex flex-column'>
                          <div className='symbol symbol-75px mb-5'>
                            <KTSVG
                              className='theme-light-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                            <KTSVG
                              className='theme-dark-show svg-icon svg-icon-5x me-1'
                              path='/media/icons/duotune/files/fil007.svg'
                            />
                          </div>
                          <div className='fs-5 fw-bold mb-2'>File tidak ditemukan...</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 mb-6'>
              <div className='form-group'>
                <Form.Label>Keterangan</Form.Label>
                <Form.Control
                  as='textarea'
                  name='keterangan'
                  className='form-control form-control-solid'
                  value={valuesFormikExist?.keterangan ? valuesFormikExist?.keterangan : ''}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
            <Link to='/sarana-prasarana/LaporanSaranaPrasarana'>
              <button className='float-none btn btn-light align-self-center m-1'>Kembali</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
