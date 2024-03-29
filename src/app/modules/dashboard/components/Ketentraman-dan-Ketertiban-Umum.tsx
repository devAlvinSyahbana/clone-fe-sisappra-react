/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, FC} from 'react'
import axios from 'axios'
import BarC from '../chart/barchart/barchart'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const SUM_KASUS_TRAMTIBUM_URL = `${API_URL}/dashboard/sum-kasus-tramtibum`
export const SUM_JENIS_PELANGGARAN_PERDA_URL = `${API_URL}/dashboard/sum-jenis-pelanggaran-perda-tramtibum`
export const SUM_KEGIATAN_TRAMTIBUM_URL = `${API_URL}/dashboard/sum-kegiatan-tramtibum`

export const KetentramandanKetertibanUmum: FC = () => {
  const [showResults, setShowResults] = useState({isShowed: false, val: ''})
  const Find = (event: {preventDefault: () => void; target: {value: string}}) => {
    console.log(typeof event.target.value)

    setShowResults({isShowed: true, val: event.target.value})
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
    if (event.target.value === '') {
      setShowResults({isShowed: true, val: event.target.value})
    }
  }
  const [data, setData] = useState([])
  const [dataJPP, setDataJPP] = useState([])
  const [dataKGT, setDataKGT] = useState([])

  useEffect(() => {
    fetchUsers(1)
  }, [])

  // const [temp, setTemp] = useState([])

  const fetchUsers = async (page: any) => {
    const response = await axios.get(`${SUM_KASUS_TRAMTIBUM_URL}`)
    const responseJPP = await axios.get(`${SUM_JENIS_PELANGGARAN_PERDA_URL}`)
    const responseKGT = await axios.get(`${SUM_KEGIATAN_TRAMTIBUM_URL}`)

    setData(response.data.data)
    setDataJPP(responseJPP.data.data)
    setDataKGT(responseKGT.data.data)

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
                  <h3 className='card-title text-white'>Data Jumlah Kasus Per Wilayah</h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    {/* <div className='col-md-4 col-lg-4 col-sm-12'>
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
                  {/* {showResults.isShowed && showResults.val === '1' ? (
                    <>
                      <BarC chartID={data} valueField='count' categoryField='kasus_tramtibum' />
                    </>
                  ) : null && showResults.isShowed && showResults.val === '2' ? (
                    <>
                      <BarC chartID={data} valueField='count' categoryField='kasus_tramtibum' />
                    </>
                  ) : null && showResults.isShowed && showResults.val === '3' ? (
                    <>
                      <BarC chartID={data} valueField='count' categoryField='kasus_tramtibum' />
                    </>
                  ) : null} */}
                </div>
              </div>
            </div>
            <div className='col-md-12 col-lg-12 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header bg-primary justify-content-center'>
                  <h3 className='card-title text-center text-white'>
                    Data Jumlah Jenis Pelanggaran Perda/ Perkada Terkait dengan Tramtibum
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    {/* <div className='col-md-4 col-lg-4 col-sm-12'>
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
                      <BarC
                        chartID={dataJPP}
                        valueField='count'
                        categoryField='jenis_pelanggaran_perda_tramtibum'
                      />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '5') ? (
                    <>
                      <BarC
                        chartID={dataJPP}
                        valueField='count'
                        categoryField='jenis_pelanggaran_perda_tramtibum'
                      />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '6') ? (
                    <>
                      <BarC
                        chartID={dataJPP}
                        valueField='count'
                        categoryField='jenis_pelanggaran_perda_tramtibum'
                      />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-12 col-lg-12 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>Data Jumlah Kegiatan Tramtibum</h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    {/* <div className='col-md-4 col-lg-4 col-sm-12'>
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
                    </div> */}
                  </div>
                  {showResults.isShowed && showResults.val === '7' ? (
                    <>
                      <BarC
                        chartID={dataKGT}
                        valueField='count'
                        categoryField='kegiatan_tramtibum'
                      />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '8') ? (
                    <>
                      <BarC
                        chartID={dataKGT}
                        valueField='count'
                        categoryField='kegiatan_tramtibum'
                      />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '9') ? (
                    <>
                      <BarC
                        chartID={dataKGT}
                        valueField='count'
                        categoryField='kegiatan_tramtibum'
                      />
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
