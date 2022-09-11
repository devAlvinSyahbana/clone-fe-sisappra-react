import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'






export function UbahSaranaPrasarana() {
    return (
        <div className="app-main flex-column flex-row-fluid-" id="kt_app_main">
          <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
              <div id="kt_app_content_container" className="app-container container-xxl">
                <div className="card mb-5 mb-xl-10 ">
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                      <div className="row g-8 mt-2 ms-5 me-5">
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label htmlFor="" className='mb-3'>Jenis Sarana & Prasarana</label>
                              <select className="form-select form-select-solid" aria-label="Select example">
                                <option>Pilih</option>
                                <option value="1"></option>
                                <option value="2"></option>
                                <option value="3"></option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row g-8 mt-2 ms-5 me-5">
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label htmlFor="" className='mb-3'>Status Sarana & Prasarana</label>
                              <select className="form-select form-select-solid" aria-label="Select example">
                                <option>Pilih</option>
                                <option value="1"></option>
                                <option value="2"></option>
                                <option value="3"></option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row g-8 mt-2 ms-5 me-5">
                            <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-10'>
                              <label htmlFor='' className='mb-3'>
                                Jumlah
                              </label>
                              <input
                                type='text' className='form-control form-control form-control-solid' name='tags'/>
                            </div>
                        </div>
                        <div className="row g-8 mt-2 ms-5 me-5">
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label htmlFor="" className='mb-3'>Kondisi</label>
                              <select className="form-select form-select-solid" aria-label="Select example">
                                <option>Pilih</option>
                                <option value="1"></option>
                                <option value="2"></option>
                                <option value="3"></option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row g-8 mt-2 ms-5 me-5">
                            <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-10'>
                              <label htmlFor='' className='mb-3'>
                                Keterangan
                              </label>
                              <textarea className="form-control form-control form-control-solid" data-kt-autosize="true"></textarea>
                            </div>
                        </div>
                        <div className="row g-8 mt-2 ms-5 me-5">
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label htmlFor="" className='mb-5'>Dokumentasi</label>
                            </div>
                            <label htmlFor="firstimg"></label>
                            <input type="file" name="" id="firstimg"></input>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <Link to="/sarana_prasarana/LaporanSaranaPrasarana">
                            <button className="btn btn-secondary"><i
                          className="fa-solid fa-arrow-left"></i> Kembali
                            </button>
                        </Link>
                        <Link to="/sarana_prasarana/LaporanSaranaPrasarana">
                            <button className="btn btn-primary" ><i className="fa-solid fa-paper-plane"></i> Simpan
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