/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, FC} from 'react'
import axios from 'axios'
import PieC from '../chart/piechart/piechart'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const SUM_SARANA_PRASARANA_URL = `${API_URL}/dashboard/sum-jenis-sarana_prasarana`

const SaranadanPrasarana: FC = () => {
  const [showResults, setShowResults] = useState({isShowed: false, val: ''})
  const Find = (event: {preventDefault: () => void; target: {value: string}}) => {
    console.log(typeof event.target.value)

    if (event.target.value === '1') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '2') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '3') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '4') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '5') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '6') {
      setShowResults({isShowed: true, val: event.target.value})
    }
  }

  const [data, setData] = useState([])

  useEffect(() => {
    fetchUsers(1)
  }, [])

  const fetchUsers = async (page: any) => {
    const response = await axios.get(`${SUM_SARANA_PRASARANA_URL}`)

    setData(response.data.data)

    console.log('cek :', data)
    return [data, setData] as const
  }

  return (
    <div className=' card card-body'>
      <div className='tab-content' id='myTabContent'>
        <div className='tab-pane fade show active' id='kt_tab_pane_1' role='tabpanel'>
          <div className='row'>
            <div className='col-md-12 col-lg-12 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Data Sebaran Sarana dan Prasarana Per Kota / Kabupaten
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    {/* <div className='col-md-2 col-lg-2 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_status'
                        onChange={Find}
                      >
                        <option value='1'>Provinsi</option>
                        <option value='2'>Kabupaten</option>
                        <option value='3'>Kecamatan</option>
                      </select>
                    </div> */}
                  </div>
                  {showResults.isShowed && showResults.val === '1' ? (
                    <>
                      <PieC chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '2') ? (
                    <>
                      <PieC chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '3') ? (
                    <>
                      <PieC chartID='pie-one' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-12 col-lg-12 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Data Jumlah Sarana dan Prasarana Per Jenis
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    {/* <div className='col-md-2 col-lg-2 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_status'
                        onChange={Find}
                      >
                        <option value='4'>Provinsi</option>
                        <option value='5'>Kabupaten</option>
                        <option value='6'>Kecamatan</option>
                      </select>
                    </div> */}
                  </div>
                  {showResults.isShowed && showResults.val === '4' ? (
                    <>
                      <PieC
                        chartID={data}
                        valueField='count'
                        categoryField='jenis_sarana_prasarana'
                      />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '5') ? (
                    <>
                      <PieC
                        chartID={data}
                        valueField='count'
                        categoryField='jenis_sarana_prasarana'
                      />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '6') ? (
                    <>
                      <PieC
                        chartID={data}
                        valueField='count'
                        categoryField='jenis_sarana_prasarana'
                      />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {SaranadanPrasarana}
