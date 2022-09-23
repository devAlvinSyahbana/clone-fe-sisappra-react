import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export function UpdateNaikPangkat() {
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
                                                <label className="col-form-label fw-semibold fs-6 col-md-5">Pangkat</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" placeholder="Pangkat"
                                                    id="kt_datepicker_time"></input>
                                            </div>
                                        </div>
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6 col-md-5">Tmt Pngkat</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" placeholder="Tmt Pngkat"
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
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6 col-md-">Status Kenaikan</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" placeholder="Status Kenaikan"
                                                    id="kt_datepicker_time"></input>
                                            </div>
                                        </div>
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6 col-md-4">Jadwal Kenaikan</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" placeholder="Jadwal Kenaikan"
                                                    id="kt_datepicker_time"></input>
                                            </div>
                                        </div>
                                        <div className="row mb-10">
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6">Keterangan</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input className="form-control form-control-solid" placeholder="Keterangan"
                                                    id="kt_datepicker_time"></input>
                                            </div>
                                        </div> 
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                    <Link to="/kepegawaian/DataPegawaiYangNaikPangkat">
                                        <button className="btn btn-secondary"><i
                                            className="fa-solid fa-arrow-left"></i> Kembali
                                        </button>
                                    </Link>
                                    <Link to="/kepegawaian/DataPegawaiYangNaikPangkat">
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



