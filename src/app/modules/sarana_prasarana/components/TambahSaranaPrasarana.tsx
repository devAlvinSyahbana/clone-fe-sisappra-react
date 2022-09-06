import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export function TambahSaranaPrasarana() {
    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
          <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
              <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
                <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                  <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                    Tambah Sarana Prasarana
                  </h1>
                </div>
              </div>
            </div>
            <div id="kt_app_content" className="app-content flex-column-fluid">
              <div id="kt_app_content_container" className="app-container container-xxl">
                <div className="card mb-5 mb-xl-10">
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
                        <div className="row mb-2">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Dokumentasi</label>
                          </div>
                        </div>
                        <div className="row mb-10 justify-content-center">
                          <div className="col-md-3">
                            <label htmlFor="firstimg"><i className="fa fa-plus"
                                ></i></label>
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
                            <button className="btn btn-primary"><i className="fa-solid fa-paper-plane"></i> Simpan
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