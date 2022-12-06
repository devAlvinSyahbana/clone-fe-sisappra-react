import {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import axios from 'axios'
import {createTheme} from 'react-data-table-component'

// Chart
import './hirarki-chart/components/responsive.css'
// OrgChart
import OrganizationalChart from './hirarki-chart/components/orgChart'
// API
const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const ATASAN_URL = `${API_URL}/kepegawaian`
export const DATA_HIRARKI_URL = `${API_URL}/master/struktur_data_hirarki`

createTheme(
  'darkMetro',
  {
    text: {
      primary: '#92929f',
      secondary: '#92929f',
    },
    background: {
      default: '#1e1e2e',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#2b2c41',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  },
  'dark'
)

export function HirarkiPegawai() {
  const [datasatpp, setDataSatPP] = useState()

  useEffect(() => {
    const fetchDataPP = async () => {
      const value = await axios.get(`${DATA_HIRARKI_URL}/find-bagan`)
      const fixedData = value.data.data.map((item: any) => {
        const {parentid, position_name, ...newItem} = item
        return {
          ...newItem,
          parentId: parentid == '0' ? '' : parentid + '',
          positionName: position_name,
        }
      })
      setDataSatPP(fixedData)
    }
    console.log('ini buat data test', datasatpp)
    fetchDataPP()
  }, [])

  return (
    <>
      <div className={`card`}>
        {/* begin::Body */}
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
            <div className='container pb-5 pt-5'>
              <div className='row'>
                <div className='col-md-3 col-xs-2'>
                  <div className='d-flex justify-content-center'>
                    <img
                      src={toAbsoluteUrl('/media/logos/logo-dki-jakarta.png')}
                      // className='img-fluid'
                      width='250px'
                      height='150px'
                      alt='Profile'
                    />
                  </div>
                </div>
                <div className='col-md-6  col-xs-2'>
                  <div className='col pt-8' style={{fontSize: '16px'}}>
                    <h1 className='text-dark fw-bold fs-2 text-center'>STRUKTUR ORGANISASI</h1>
                    <h1 className='text-dark fw-bold fs-2 text-center'>
                      SATUAN POLISI PAMONG PRAJA
                    </h1>
                    <h1 className='text-dark fw-bold fs-2 text-center'>PROVINSI DKI JAKARTA</h1>
                  </div>
                </div>
                <div className='col-md-3 col-xs-2'>
                  <div className='d-flex justify-content-center pt-3'>
                    <img
                      src={toAbsoluteUrl('/media/logos/logo-satpol-pp.png')}
                      // className='img-fluid'
                      width='190px'
                      height='120px'
                      alt='Profile'
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Menampilkan Struktur Organisasi */}
            {/* {datasatpp && <OrganizationalChart data={datasatpp} />} */}
            <OrganizationalChart data={datasatpp} />
          </div>
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}
