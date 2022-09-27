import React, { Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'

export function TambahPejabatStruktural() {
    const { id, status } = useParams()

    return (
        <div className='card mb-5 mb-xl-10'>
            {/* Body */}
            <div className="card-body p-9">
                <div className="row mb-10">
                    <div className="col-md-2">
                        <label className="col-form-label fw-semibold fs-6">NIP</label>
                    </div>
                    <div className="col-md-4">
                        <input type="text" placeholder="Masukkan NIP"
                            className="form-control form-control-lg mb-3 mb-lg-0"></input>
                    </div>
                </div>
                <div className="row mb-10">
                    <div className="col-md-2">
                        <label className="col-form-label fw-semibold fs-6">NRK</label>
                    </div>
                    <div className="col-md-4">
                        <input type="text" placeholder="NRK" disabled
                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                    </div>
                </div>
                <div className="row mb-10">
                    <div className="col-md-2">
                        <label className="col-form-label fw-semibold fs-6">Nama</label>
                    </div>
                    <div className="col-md-4">
                        <input type="text" placeholder="Nama" disabled
                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                    </div>
                </div>
                <div className="row mb-10">
                    <div className="col-md-2">
                        <label className="col-form-label fw-semibold fs-6">Jabatan</label>
                    </div>
                    <div className="col-md-4">
                        <input type="text" placeholder="Jabatan" disabled
                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                    </div>
                </div>
                <div className="row mb-10">
                    <div className="col-md-2">
                        <label className="col-form-label fw-semibold fs-6">Tampat Tugas</label>
                    </div>
                    <div className="col-md-4">
                        <input type="text" placeholder="Penugasan" disabled
                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                    </div>
                </div>
                <div className="row mb-10">
                    <div className="col-md-2">
                        <label className="col-form-label fw-semibold fs-6">Keterangan</label>
                    </div>
                    <div className="col-md-4">
                        <textarea className="form-control form-control" data-kt-autosize="true"></textarea>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="card-footer">
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Link
                        to={`/kepegawaian/LaporanRekapitulasiPegawai/TabRekapitulasiPejabatStruktural`}>
                        <button className="btn btn-secondary"><i
                            className="fa-solid fa-arrow-left"></i> Kembali
                        </button>
                    </Link>
                    <Link
                        to={`/kepegawaian/LaporanRekapitulasiPegawai/TabRekapitulasiPejabatStruktural`}>
                        <button className="btn btn-primary"><i className="fa-solid fa-paper-plane"></i> Simpan
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}