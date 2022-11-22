/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, FC} from 'react'
import axios from 'axios'
import BarC from '../chart/barchart/barchart'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const SUM_JENIS_PERORANGAN_URL = `${API_URL}/dashboard/sum-jenis-perorangan`
export const SUM_JENIS_TEMPAT_MAKAN_URL = `${API_URL}/dashboard/sum-jenis-tempat-makan`
export const SUM_JENIS_PERKANTORAN_URL = `${API_URL}/dashboard/sum-jenis-perkantoran`
export const SUM_JENIS_USAHA_URL = `${API_URL}/dashboard/sum-jenis-usaha`
export const SUM_JENIS_KERUMUNAN_URL = `${API_URL}/dashboard/sum-jenis-kerumunan`

const WasdakProtokolKesehatan: FC = () => {
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
    if (event.target.value === '7') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '8') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '9') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '10') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '11') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '12') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '13') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '14') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '15') {
      setShowResults({isShowed: true, val: event.target.value})
    }
  }
  const [data, setData] = useState([])
  const [dataJTM, setDataJTM] = useState([])
  const [dataJP, setDataJP] = useState([])
  const [dataJU, setDataJU] = useState([])
  const [dataJK, setDataJK] = useState([])

  useEffect(() => {
    fetchUsers(1)
  }, [])

  // const [temp, setTemp] = useState([])

  const fetchUsers = async (page: any) => {
    const response = await axios.get(`${SUM_JENIS_PERORANGAN_URL}`)
    const responseJTM = await axios.get(`${SUM_JENIS_TEMPAT_MAKAN_URL}`)
    const responseJP = await axios.get(`${SUM_JENIS_PERKANTORAN_URL}`)
    const responseJU = await axios.get(`${SUM_JENIS_USAHA_URL}`)
    const responseJK = await axios.get(`${SUM_JENIS_KERUMUNAN_URL}`)

    setData(response.data.data)
    setDataJTM(responseJTM.data.data)
    setDataJP(responseJP.data.data)
    setDataJU(responseJU.data.data)
    setDataJK(responseJK.data.data)

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
                  <h3 className='card-title text-white'>Data Jumlah Penindakan Perorangan</h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
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
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '1' ? (
                    <>
                      <BarC chartID={data} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '2') ? (
                    <>
                      <BarC chartID={data} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '3') ? (
                    <>
                      <BarC chartID={data} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-12 col-lg-12 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header bg-primary justify-content-center'>
                  <h3 className='card-title text-center text-white'>
                    Data Jumlah Pengawasan dan Penindakan Warung Makan, Restoran, dan Kafe
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
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
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '4' ? (
                    <>
                      <BarC chartID={dataJTM} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '5') ? (
                    <>
                      <BarC chartID={dataJTM} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '6') ? (
                    <>
                      <BarC chartID={dataJTM} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-12 col-lg-12 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>Data Jumlah Penindakan Perkantoran</h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_status'
                        onChange={Find}
                      >
                        <option value='7'>Provinsi</option>
                        <option value='8'>Kabupaten</option>
                        <option value='9'>Kecamatan</option>
                      </select>
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '7' ? (
                    <>
                      <BarC chartID={dataJP} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '8') ? (
                    <>
                      <BarC chartID={dataJP} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '9') ? (
                    <>
                      <BarC chartID={dataJP} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-12 col-lg-12 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Data Jumlah Penindakan Tempat Usaha Lainnya
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_status'
                        onChange={Find}
                      >
                        <option value='10'>Provinsi</option>
                        <option value='11'>Kabupaten</option>
                        <option value='12'>Kecamatan</option>
                      </select>
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '10' ? (
                    <>
                      <BarC chartID={dataJU} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '11') ? (
                    <>
                      <BarC chartID={dataJU} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '12') ? (
                    <>
                      <BarC chartID={dataJU} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-12 col-lg-12 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Data Jumlah Penindakan Area Publik dan Kerumunan
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_status'
                        onChange={Find}
                      >
                        <option value='13'>Provinsi</option>
                        <option value='14'>Kabupaten</option>
                        <option value='15'>Kecamatan</option>
                      </select>
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '13' ? (
                    <>
                      <BarC chartID={dataJK} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '14') ? (
                    <>
                      <BarC chartID={dataJK} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '15') ? (
                    <>
                      <BarC chartID={dataJK} valueField='count' categoryField='jenis_wasdak' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='tab-pane fade' id='kt_tab_pane_2' role='tabpanel'>
          <h1 className='fw-bolder text-gray-900 text-center mb-7'>COMING SOON</h1>
          <p className='fw-bolder text-gray-900 text-center mb-7'>
            We are currently working on our website.
          </p>
        </div>
      </div>
    </div>
  )
}

export {WasdakProtokolKesehatan}
