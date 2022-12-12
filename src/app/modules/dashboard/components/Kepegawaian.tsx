/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, FC} from 'react'
import axios from 'axios'
import BarC from '../chart/barchart/barchart'
import PieC from '../chart/piechart/piechart'
import BarC2 from '../chart/barchart/barchartPPNS'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const SUM_PEGAWAI_WILAYAH_URL = `${API_URL}/dashboard/sum-pegawai-wilayah`
export const SUM_STATUS_KEPEGAWAIAN_URL = `${API_URL}/dashboard/sum-status-kepegawaian`
export const SUM_PENDIDIKAN_TERAKHIR_URL = `${API_URL}/dashboard/sum-pendidikan-terakhir`
export const SUM_GOLONGAN_URL = `${API_URL}/dashboard/sum-golongan`
export const SUM_ESELON_URL = `${API_URL}/dashboard/sum-eselon`
export const SUM_USIA_URL = `${API_URL}/dashboard/sum-usia`
export const SUM_STATUS_PNS_URL = `${API_URL}/dashboard/sum-status-ppns`

export const Kepegawaian: FC = () => {
  const [dataSPW, setDataSPW] = useState([])
  const [data, setData] = useState([])
  const [dataPT, setDataPT] = useState([])
  const [dataG, setDataG] = useState([])
  const [dataE, setDataE] = useState([])
  const [dataU, setDataU] = useState([])
  const [dataSP, setDataSP] = useState([])

  useEffect(() => {
    fetchUsers(1)
  }, [])

  const fetchUsers = async (page: any) => {
    const responseSPW = await axios.get(`${SUM_PEGAWAI_WILAYAH_URL}`)
    const response = await axios.get(`${SUM_STATUS_KEPEGAWAIAN_URL}`)
    const responsePT = await axios.get(`${SUM_PENDIDIKAN_TERAKHIR_URL}`)
    const responseG = await axios.get(`${SUM_GOLONGAN_URL}`)
    const responseU = await axios.get(`${SUM_USIA_URL}`)
    const responseE = await axios.get(`${SUM_ESELON_URL}`)
    const responseSP = await axios.get(`${SUM_STATUS_PNS_URL}`)

    setDataSPW(responseSPW.data.data)
    setData(response.data.data)
    setDataPT(responsePT.data.data)
    setDataG(responseG.data.data)
    setDataE(responseE.data.data)
    setDataU(responseU.data.data)
    setDataSP(responseSP.data.data)

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
                  <h3 className='card-title text-white'>Pegawai Satpol PP DKI Jakarta</h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    {dataSPW?.length >= 1 ? (
                      <BarC chartID={dataSPW} valueField='count' categoryField='wilayah' />
                    ) : (
                      <>loading...</>
                    )}
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
                  {data?.length >= 1 ? (
                    <PieC chartID={data} valueField='count' categoryField='status_kepegawaian' />
                  ) : (
                    <>loading...</>
                  )}
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
                  {dataPT?.length >= 1 ? (
                    <PieC chartID={dataPT} valueField='count' categoryField='pendidikan_terakhir' />
                  ) : (
                    <>loading...</>
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-6 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Usia
                  </h3>
                </div>
                <div className='card-body'>
                  {dataU?.length >= 1 ? (
                    <PieC chartID={dataU} valueField='jumlah' categoryField='range_umur' />
                  ) : (
                    <>loading...</>
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title  text-white text-center'>
                    Jumlah Personil Satpol PP Berdasarkan Jenis Eselon
                  </h3>
                </div>
                <div className='card-body'>
                  {dataE?.length >= 1 ? (
                    <PieC chartID={dataE} valueField='count' categoryField='eselon' />
                  ) : (
                    <>loading...</>
                  )}
                </div>
              </div>
            </div>

            <div className='col-md-12 col-lg-12 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-center text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Golongan
                  </h3>
                </div>
                <div className='card-body'>
                  {dataG?.length >= 1 ? (
                    <BarC2 chartID={dataG} valueField='count' categoryField='golongan' />
                  ) : (
                    <>loading...</>
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-12 col-lg-12 col-sm-12 mb-12'>
              <div className='card card-bordered border-primary'>
                <div className='card-header bg-primary justify-content-center'>
                  <h3 className='card-title text-white '>
                    Jumlah Personil Satpol PP Berdasarkan PPNS
                  </h3>
                </div>
                <div className='card-body'>
                  {dataSP?.length >= 1 ? (
                    <BarC2 chartID={dataSP} valueField='count' categoryField='skpd' />
                  ) : (
                    <>loading...</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
