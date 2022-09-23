import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export function TambahPiket() {
    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_content" className="app-content flex-column-fluid">
                    <div id="kt_app_content_container" className="app-container container-xxl">
                        <div className="card mb-5 mb-xl-10">
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6">Tanggal</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" id="kt_daterangepicker_single"></input>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className='separator border-3 my-10'></div>
                                        </div>
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6 col-md-4">Nik</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" placeholder="Nik"
                                                    id="kt_datepicker_time"></input>
                                            </div>
                                        </div>
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6 col-md-4">Nama</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" placeholder="Nama"
                                                    id="kt_datepicker_time"></input>
                                            </div>
                                        </div>
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6">Jabatan</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" placeholder="Jabatan"
                                                    id="kt_datepicker_time"></input>
                                            </div>
                                        </div>
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6">No Telepon</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" placeholder="No Telepon"
                                                    id="kt_datepicker_time"></input>
                                            </div>
                                        </div>                                        
                                        <div className='col-12'>
                                            <div className='separator border-3 my-10'></div>
                                        </div>
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6 col-md-4">Nrk/Nptt/Npjlp</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" placeholder="Nrk/Nptt/Npjlp"
                                                    id="kt_datepicker_time"></input>
                                            </div>
                                        </div>
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6 col-md-4">Nama</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" placeholder="Nama"
                                                    id="kt_datepicker_time"></input>
                                            </div>
                                        </div>
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6">No Telepon</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" placeholder="No Telepon"
                                                    id="kt_datepicker_time"></input>
                                            </div>
                                        </div> 
                                        
                                        <div className='col-12'>
                                            <div className='separator border-3 my-10'></div>
                                        </div>
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6">Alamat Kantor</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" className="form-control form-control-lg form-control-solid mb-4 mb-lg-0"></input>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                    <Link to="/kepegawaian/JadwalPiket">
                                        <button className="btn btn-secondary"><i
                                            className="fa-solid fa-arrow-left"></i> Kembali
                                        </button>
                                    </Link>
                                    <Link to="/kepegawaian/JadwalPiket">
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



