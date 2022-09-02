import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export function TambahLaporanPengawasan() {
    return (
                <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                    <div className="d-flex flex-column flex-column-fluid">
                        <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                            <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
                                <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                                    <h1
                                        className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                        Tambah Laporan Pengawasan
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
                                                <div className="row mb-10">
                                                    <div className="col-md-2">
                                                        <label className="col-form-label fw-semibold fs-6">Tanggal
                                                            Pelaporan</label>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <input className="form-control form-control-solid"
                                                            id="kt_daterangepicker_single"></input>
                                                    </div>
                                                </div>
                                                <div className="row mb-10">
                                                    <div className="col-md-2">
                                                        <label className="col-form-label fw-semibold fs-6">Kota</label>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <input type="text"
                                                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                                    </div>
                                                </div>
                                                <div className="row mb-10">
                                                    <div className="col-md-2">
                                                        <label className="col-form-label fw-semibold fs-6">Kecamatan</label>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <input type="text"
                                                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                                    </div>
                                                </div>
                                                <div className="row mb-10">
                                                    <div className="col-md-2">
                                                        <label className="col-form-label fw-semibold fs-6">Kelurahan</label>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <input type="text"
                                                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                                    </div>
                                                </div>
                                                <div className="row mb-10">
                                                    <div className="col-md-2">
                                                        <label className="col-form-label fw-semibold fs-6">Jenis Pengawasan</label>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <input type="text"
                                                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                                    </div>
                                                </div>
                                                <div className="row mb-10">
                                                    <div className="col-md-2">
                                                        <label className="col-form-label fw-semibold fs-6">deskripsi</label>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <input type="text"
                                                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer">
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                          <Link to="/pelaporan/LaporanPengawasan">
                                            <button className="btn btn-secondary"><i className="fa-solid fa-arrow-left"></i>
                                                Kembali

                                            </button>
                                          </Link>
                                          <Link to="/pelaporan/LaporanPengawasan">
                                            <button className="btn btn-primary"><i className="fa-solid fa-paper-plane"></i>
                                                Simpan
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
  