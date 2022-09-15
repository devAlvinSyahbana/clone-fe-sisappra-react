import {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useLocation, useParams} from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'
import {
  DetailPegawaiInterface,
  JumlahKeluargaInterface,
  PendidikanInterface,
} from '../KepegawaianInterface'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

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
      setPendidikan(pendidikan.data.data)
      setData(response.data.data)
    }
    fetchData()
  }, [])

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='row'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  {data?.foto !== '' ? (
                    <div className='symbol-label'>
                      <img src={data?.foto} alt={data?.nama} className='w-100' />
                    </div>
                  ) : (
                    <div className={clsx('symbol-label fs-1', `bg-light-secondary`, `text-secondary`)}>
                      {data?.nama?.charAt(0)}
                    </div>
                  )}
                  {/* <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='Metornic' /> */}
                  <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='mb-2'>
                  <div className='d-flex align-items-center mb-2'>
                    <a className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {data?.nama !== '' ? data?.nama : '-'}
                    </a>
                  </div>
                  <div className='row fw-bold fs-6 mb-4 pe-2'>
                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                      <a className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                        <KTSVG
                          path='/media/icons/duotune/communication/com006.svg'
                          className='svg-icon-4 me-1'
                        />
                        {data?.kepegawaian_status_pegawai !== ''
                          ? data?.kepegawaian_status_pegawai
                          : '-'}
                      </a>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                      <a className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                        <KTSVG
                          path='/media/icons/duotune/communication/com005.svg'
                          className='svg-icon-4 me-1'
                        />
                        {data?.no_hp !== '' ? data?.no_hp : '-'}
                      </a>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                      <a className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                        <KTSVG
                          path='/media/icons/duotune/communication/com011.svg'
                          className='svg-icon-4 me-1'
                        />
                        -
                      </a>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                      <a className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                        <i className='fa-solid fa-address-card me-1'></i>
                        {data?.kepegawaian_pangkat_name !== '' ? data?.kepegawaian_pangkat_name : '-'}
                      </a>
                    </div>
                  </div>
                </div>

                <div className='d-flex flex-wrap flex-stack'>
                  <div className='d-flex flex-column flex-grow-1 pe-8'>
                    <div className='d-flex flex-wrap'>
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

                        <div className='fw-bold fs-6 text-gray-400'>Pendidikan Tertinggi</div>
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
                      (location.pathname.includes('DataPribadi') && 'active')
                    }
                    to={`/kepegawaian/InformasiDataPegawai/DataPribadi/${id}/${status}`}
                  >
                    Data Pribadi
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('DataKeluarga') && 'active')
                    }
                    to={`/kepegawaian/InformasiDataPegawai/DataKeluarga/${id}/${status}`}
                  >
                    Data Keluarga
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('Pendidikan') && 'active')
                    }
                    to={`/kepegawaian/InformasiDataPegawai/Pendidikan/${id}/${status}`}
                  >
                    Pendidikan
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('DataKepegawaian') && 'active')
                    }
                    to={`/kepegawaian/InformasiDataPegawai/DataKepegawaian/${id}/${status}`}
                  >
                    Data Kepegawaian
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('HirarkiKepegawaian') && 'active')
                    }
                    to={`/kepegawaian/InformasiDataPegawai/HirarkiKepegawaian/${id}/${status}`}
                  >
                    Hirarki Kepegawaian
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {HeaderDetailWrapper}
