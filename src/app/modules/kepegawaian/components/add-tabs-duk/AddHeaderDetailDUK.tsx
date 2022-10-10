import {useEffect, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
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

const AddHeaderDetailDUK = () => {
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
  }, [id, status])

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='row'>
            <div className='d-flex overflow-auto h-55px'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('tambah-data-pribadi-duk') && 'active')
                    }
                    to='/kepegawaian/tab-daftar-urut-kepangkatan/tambah-data-pribadi-duk'
                  >
                    Data Pribadi
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('tambah-data-keluarga-duk') && 'active')
                    }
                    to='/kepegawaian/tab-daftar-urut-kepangkatan/tambah-data-keluarga-duk'
                  >
                    Data Keluarga
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('tambah-pendidikan-duk') && 'active')
                    }
                    to='/kepegawaian/tab-daftar-urut-kepangkatan/tambah-pendidikan-duk'
                  >
                    Data Pendidikan
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('tambah-data-kepegawaian-duk') && 'active')
                    }
                    to='/kepegawaian/tab-daftar-urut-kepangkatan/tambah-data-kepegawaian-duk'
                  >
                    Data Kepegawaian
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </>
  )
}

export {AddHeaderDetailDUK}
