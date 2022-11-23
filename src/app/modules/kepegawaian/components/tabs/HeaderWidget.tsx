/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import clsx from 'clsx'
import {Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL

type Props = {
  className: string
  color: string
  data?: any
}

const HeaderWidget: React.FC<Props> = ({className, color, data}) => {
  const [showFullBody, setShowFullBody] = useState(false)
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0'>
        <div className='overlay overflow-hidden'>
          <div className='overlay-wrapper'>
            {/* begin::Header */}
            <div
              className={`px-10 pt-7 card-rounded h-250px w-100 bg-${color} bgi-no-repeat bgi-size-cover bgi-position-y-center bgi-position-x-center align-items-center`}
              style={{
                backgroundImage: 'url(' + `${API_URL}/${data?.foto_full_body}` + ')',
              }}
            ></div>
            {/* end::Header */}
          </div>
          <div className='overlay-layer bg-dark bg-opacity-10 align-items-center justify-content-center'>
            {data && data?.foto_full_body && data?.foto_full_body !== '' && (
              <OverlayTrigger
                key={'top'}
                placement={'top'}
                overlay={<Tooltip id={`tooltip-top`}>Lihat Foto Seluruh Tubuh.</Tooltip>}
              >
                <button
                  type='button'
                  className='btn btn-sm btn-icon btn-secondary btn-shadow mb-2'
                  onClick={() => setShowFullBody(true)}
                >
                  <i className='bi bi-fullscreen'></i>
                </button>
              </OverlayTrigger>
            )}
          </div>
        </div>
        <Modal show={showFullBody} fullscreen={true} onHide={() => setShowFullBody(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Foto Seluruh Tubuh</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={`${API_URL}/${data?.foto_full_body}`} alt={data?.nama} className='w-100' />
          </Modal.Body>
        </Modal>
        {/* begin::Items */}
        <div
          className='shadow-xs card-rounded mx-9 mb-9 px-2 py-2 position-absolute width-25 z-index-1 bg-body'
          style={{marginTop: '-100px'}}
        >
          {/* begin::Item */}
          <div className='d-flex align-items-center'>
            {/* begin::Symbol */}
            <div className='symbol symbol-100px symbol-lg-160px mb-3'>
              {data && data?.foto !== '' ? (
                <div className='symbol-label'>
                  <img src={`${API_URL}/${data?.foto}`} alt={data?.nama} className='w-100' />
                </div>
              ) : (
                <div
                  className={clsx('symbol-label fs-1', `bg-light-secondary`, `text-dark-secondary`)}
                >
                  {data?.nama?.charAt(0)}
                </div>
              )}
            </div>
            {/* end::Symbol */}
          </div>
          {/* end::Item */}
        </div>
        {/* end::Items */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {HeaderWidget}
