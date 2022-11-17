/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-lg-row flex-column-fluid h-100'
      style={{
        // backgroundColor: '#151521',
        opacity: '1',
        background:
          'repeating-linear-gradient( -45deg, #1a1a1f, #1a1a1f 5px, #151521 5px, #151521 25px',
      }}
    >
      {/* begin::Body */}
      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
        {/* begin::Form */}
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          {/* begin::Wrapper */}
          <div className='d-flex flex-column flex-center py-5 px-5 px-md-15 mt-n15 mt-lg-0 w-100 border border-dark bg-white bg-opacity-25 rounded-3'>
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}
      <div className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'>
        {/* begin::Content */}
        <div className='d-flex flex-column flex-center pb-5 pt-10 px-5 py-md-15 px-md-15 w-100'>
          {/* begin::Title */}
          <h1 className='text-white fs-5x fw-bold text-center mb-4'>SISAPPRA</h1>
          {/* end::Title */}

          {/* begin::Text */}
          <div className='text-white fs-1 text-center mb-2'>
            Sistem Informasi Satuan Polisi Pamong Praja
          </div>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/myasset/logosatpol.png')}
            className='h-150px h-md-225px h-lg-350px'
          />
          {/* end::Text */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
    </div>
  )
}

export {AuthLayout}
