/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, FC} from 'react'
import axios from 'axios'
import PieC from '../chart/piechart/piechart'
import BarC from '../chart/barchart/barchart'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const SUM_STATUS_KEPEGAWAIAN_URL = `${API_URL}/dashboard/kepegawaian/sum-status-kepegawaian`
export const SUM_PENDIDIKAN_TERAKHIR_URL = `${API_URL}/dashboard/kepegawaian/sum-pendidikan-terakhir`
export const SUM_GOLONGAN_URL = `${API_URL}/dashboard/kepegawaian/sum-golongan`
export const SUM_ESELON_URL = `${API_URL}/dashboard/kepegawaian/sum-eselon`
export const SUM_USIA_URL = `${API_URL}/dashboard/kepegawaian/sum-usia`
export const SUM_STATUS_PNS_URL = `${API_URL}/dashboard/kepegawaian/sum-status-kepegawaian`

export const Kepegawaian: FC = () => {
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
    if (event.target.value === '16') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '17') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '18') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '19') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '20') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '21') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '22') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '23') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '24') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '25') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '26') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '27') {
      setShowResults({isShowed: true, val: event.target.value})
    }
  }

  const columns = [
    {
      selector: (row: any) => row.status_kepegawaian,
      sortable: true,
      sortField: 'status_kepegawaian',
    },
    {
      selector: (row: any) => row.count,
      sortable: true,
      sortField: 'count',
    },
  ]

  const [data, setData] = useState([])

  useEffect(() => {
    fetchUsers(1)
  }, [])

  const [temp, setTemp] = useState([])

  const fetchUsers = async (page: any) => {
    const value = await axios.get(SUM_STATUS_KEPEGAWAIAN_URL)

    setTemp(value.data.data)
    console.log('cek response api:', temp)

    const response = await axios.get(`${SUM_STATUS_KEPEGAWAIAN_URL}`)

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
                  <h3 className='card-title text-white'>Jumlah Personil Satpol PP Per Wilayah</h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-2 col-lg-2 col-sm-12'>
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
                    <div className='col-md-2 col-lg-2 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_tahun'
                        onChange={Find}
                      >
                        <option value='a'>2018</option>
                        <option value='b'>2019</option>
                        <option value='c'>2020</option>
                        <option value='d'>2021</option>
                        <option value='e'>2022</option>
                      </select>
                    </div>
                    {showResults.isShowed && showResults.val === '1' ? (
                      <>
                        <BarC chartID={columns} />
                      </>
                    ) : null || (showResults.isShowed && showResults.val === '2') ? (
                      <>
                        <BarC chartID={columns} />
                      </>
                    ) : null || (showResults.isShowed && showResults.val === '3') ? (
                      <>
                        <BarC chartID={columns} />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header bg-primary'>
                  <h3 className='card-title text-center text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Status Kepegawaian (PNS, PTT, PJLP)
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-5 col-lg-5 col-sm-12'>
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
                    <div className='col-md-5 col-lg-5 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_tahun'
                        onChange={Find}
                      >
                        <option value='a'>2018</option>
                        <option value='b'>2019</option>
                        <option value='c'>2020</option>
                        <option value='d'>2021</option>
                        <option value='e'>2022</option>
                      </select>
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '4' ? (
                    <>
                      <PieC chartID={data} valueField='count' categoryField='status_kepegawaian' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '5') ? (
                    <>
                      <PieC chartID={data} />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '6') ? (
                    <>
                      <PieC chartID={data} />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header bg-primary'>
                  <h3 className='card-title text-center text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Tingkat Pendidikan Terakhir (SMA, S1, S2,
                    S3)
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-5 col-lg-5 col-sm-12'>
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
                    <div className='col-md-5 col-lg-5 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_tahun'
                        onChange={Find}
                      >
                        <option value='a'>2018</option>
                        <option value='b'>2019</option>
                        <option value='c'>2020</option>
                        <option value='d'>2021</option>
                        <option value='e'>2022</option>
                      </select>
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '7' ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '8') ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '9') ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Golongan
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-5 col-lg-5 col-sm-12'>
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
                    <div className='col-md-5 col-lg-5 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_tahun'
                        onChange={Find}
                      >
                        <option value='a'>2018</option>
                        <option value='b'>2019</option>
                        <option value='c'>2020</option>
                        <option value='d'>2021</option>
                        <option value='e'>2022</option>
                      </select>
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '10' ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '11') ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '12') ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header bg-primary'>
                  <h3 className='card-title text-center text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Jenis Eselon
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-5 col-lg-5 col-sm-12'>
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
                    <div className='col-md-5 col-lg-5 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_tahun'
                        onChange={Find}
                      >
                        <option value='a'>2018</option>
                        <option value='b'>2019</option>
                        <option value='c'>2020</option>
                        <option value='d'>2021</option>
                        <option value='e'>2022</option>
                      </select>
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '13' ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '14') ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '15') ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Usia
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-5 col-lg-5 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_status'
                        onChange={Find}
                      >
                        <option value='16'>Provinsi</option>
                        <option value='17'>Kabupaten</option>
                        <option value='18'>Kecamatan</option>
                      </select>
                    </div>
                    <div className='col-md-5 col-lg-5 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_tahun'
                        onChange={Find}
                      >
                        <option value='a'>2018</option>
                        <option value='b'>2019</option>
                        <option value='c'>2020</option>
                        <option value='d'>2021</option>
                        <option value='e'>2022</option>
                      </select>
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '19' ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '20') ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '21') ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Jumlah Personil Satpol PP Berdasarkan PPNS
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-5 col-lg-5 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_status'
                        onChange={Find}
                      >
                        <option value='19'>Provinsi</option>
                        <option value='20'>Kabupaten</option>
                        <option value='21'>Kecamatan</option>
                      </select>
                    </div>
                    <div className='col-md-5 col-lg-5 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_tahun'
                        onChange={Find}
                      >
                        <option value='a'>2018</option>
                        <option value='b'>2019</option>
                        <option value='c'>2020</option>
                        <option value='d'>2021</option>
                        <option value='e'>2022</option>
                      </select>
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '22' ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '23') ? (
                    <>
                      <PieC chartID='pie-tow' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '24') ? (
                    <>
                      <PieC chartID='pie-tow' />
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
