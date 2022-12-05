import {useEffect, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useLocation, useParams} from 'react-router-dom'
import axios from 'axios'
import {
  DetailPegawaiInterface,
  JumlahKeluargaInterface,
  PendidikanInterface,
  DetailMasterJabatan,
} from '../KepegawaianInterface'
import {HeaderWidget} from './HeaderWidget'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/informasi-data-pegawai`
export const MASTER_URL = `${API_URL}/master`

const HeaderDetailWrapper = () => {
  const location = useLocation()
  const {id, status} = useParams()
  const [data, setData] = useState<DetailPegawaiInterface>()
  const [jkeluarga, setJkeluarga] = useState<JumlahKeluargaInterface>()
  const [pendidikan, setPendidikan] = useState<PendidikanInterface>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KEPEGAWAIAN_URL}/findone/${id}/${status}`)
      const keluarga = await axios.get(`${KEPEGAWAIAN_URL}/count-keluarga/${id}/${status}`)
      const pendidikan = await axios.get(
        `${KEPEGAWAIAN_URL}/get-pendidikan-terakhir/${id}/${status}`
      )
      setJkeluarga(keluarga.data.data)
      if (pendidikan.data.data) {
        const {data} = await axios.get(
          `${MASTER_URL}/pendidikan/findone/${pendidikan.data.data.jenis_pendidikan}`
        )
        setPendidikan((prevstate) => ({...prevstate, jenis_pendidikan: data.data.pendidikan}))
      }
      setData(response.data.data)
      getDetailJabatan(response.data.data.kepegawaian_jabatan)
    }
    fetchData()
  }, [id, status])

  const [detailJabatan, setDetailJabatan] = useState<DetailMasterJabatan>()
  const getDetailJabatan = async (id: number) => {
    if (id) {
      const response = await axios.get(`${MASTER_URL}/jabatan/findone/${id}`)
      setDetailJabatan((prevstate) => ({...prevstate, ...response.data.data}))
    }
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='row'>
            <div className='col-12 mb-3'>
              <HeaderWidget className='card-xl-stretch mb-xl-8' color='secondary' data={data} />
            </div>
            <div
              className='d-flex flex-wrap flex-sm-nowrap mb-3'
              style={{
                marginTop: '60px',
              }}
            >
              <div className='flex-grow-1'>
                <div className='mb-2'>
                  <div className='d-flex align-items-center mb-2'>
                    <div className='text-gray-800 text-hover-primary fs-1 fw-bolder me-1'>
                      {data?.nama !== '' ? data?.nama : '-'}
                    </div>
                  </div>
                </div>
                <div className="separator border-secondary my-10"></div>
                <div className='d-flex flex-wrap flex-stack'>
                  <div className='d-flex flex-column flex-grow-1 pe-8'>
                    <div className='d-flex flex-wrap'>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>
                            <KTSVG
                              path='/media/icons/duotune/communication/com006.svg'
                              className='svg-icon-1 me-2'
                            />
                            {data?.kepegawaian_status_pegawai !== ''
                              ? data?.kepegawaian_status_pegawai
                              : '-'}
                          </div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>Status Pegawai</div>
                      </div>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>
                            <KTSVG
                              path='/media/icons/duotune/communication/com005.svg'
                              className='svg-icon-1 me-2'
                            />
                            {data?.no_hp !== '' ? data?.no_hp : '-'}
                          </div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>No. Kontak</div>
                      </div>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>
                            <KTSVG
                              path='/media/icons/duotune/communication/com011.svg'
                              className='svg-icon-1 me-2'
                            />-
                          </div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>Email</div>
                      </div>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>
                            <i className='fa-solid fa-address-card me-2'></i>
                            {detailJabatan?.jabatan ? detailJabatan?.jabatan : '-'}
                          </div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>Jabatan</div>
                      </div>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>
                            {jkeluarga?.total !== 0 ? jkeluarga?.total : '-'}
                          </div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>Jumlah Anggota Keluarga</div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>
                            {pendidikan?.jenis_pendidikan ? pendidikan?.jenis_pendidikan : '-'}
                          </div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>Pendidikan Terakhir</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='d-flex overflow-auto h-55px'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('detail-data-pribadi') && 'active')
                    }
                    to={`/kepegawaian/informasi-data-pegawai/detail-data-pribadi/${id}/${status}`}
                  >
                    Data Pribadi
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('detail-data-keluarga') && 'active')
                    }
                    to={`/kepegawaian/informasi-data-pegawai/detail-data-keluarga/${id}/${status}`}
                  >
                    Data Keluarga
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('detail-data-pendidikan') && 'active')
                    }
                    to={`/kepegawaian/informasi-data-pegawai/detail-data-pendidikan/${id}/${status}`}
                  >
                    Pendidikan
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('detail-data-kepegawaian') && 'active')
                    }
                    to={`/kepegawaian/informasi-data-pegawai/detail-data-kepegawaian/${id}/${status}`}
                  >
                    Data Kepegawaian
                  </Link>
                </li>
                {/* <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('detail-hirarki-kepegawaian') && 'active')
                    }
                    to={`/kepegawaian/informasi-data-pegawai/detail-hirarki-kepegawaian/${id}/${status}`}
                  >
                    Hirarki Kepegawaian
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {HeaderDetailWrapper}
