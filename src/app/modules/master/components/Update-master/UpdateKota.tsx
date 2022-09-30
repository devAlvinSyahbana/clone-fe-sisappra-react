import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

export function UpdateKota() {
  return (
    <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
      <div className='d-flex flex-column flex-column-fluid'>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card mb-5 mb-xl-10'>
              <div className='card-body'>
                <form>
                  <div className='form-group'>
                    <div className='row mb-10'>
                      <div className='col-md-2'>
                        <label className='col-form-label fw-semibold fs-6'>Kota</label>
                      </div>
                      <div className='col-md-4'>
                        <input
                          className='form-control form-control-solid'
                          placeholder='Kota'
                          id='kt_datepicker_time'
                        ></input>
                      </div>
                    </div>
                    <div className='row mb-10'>
                      <div className='col-md-2'>
                        <label className='col-form-label fw-semibold fs-6'>Kode</label>
                      </div>
                      <div className='col-md-4'>
                        <input
                          className='form-control form-control-solid'
                          placeholder='Kode'
                          id='kt_datepicker_time'
                        ></input>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className='card-footer'>
                <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                  <Link to='/master/Kota'>
                    <button className='btn btn-secondary'>
                      <i className='fa-solid fa-arrow-left'></i> Kembali
                    </button>
                  </Link>
                  <Link to='/master/Kota'>
                    <button className='btn btn-primary'>
                      <i className='fa-solid fa-paper-plane'></i> Simpan
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
