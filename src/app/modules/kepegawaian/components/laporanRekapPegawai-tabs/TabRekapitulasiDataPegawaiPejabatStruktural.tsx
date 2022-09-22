import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LaporanRekapHeader } from './LaporanRekapHeader'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function TabRekapitulasiDataPegawaiPejabatStruktural() {

    return (
        <>
            {/* Header */}
            <LaporanRekapHeader />
            {/* Second Card */}
            <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                <div className="d-flex flex-column flex-column-fluid">
                    <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                        <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
                            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                            </div>
                        </div>
                    </div>
                    <div id="kt_app_content" className="app-content flex-column-fluid">
                        <div id="kt_app_content_container" className="app-container container-xxl">
                            <div className="card mb-5 mb-xl-10">
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="row mb-10">
                                            <div className="col-2">
                                                <label className="col-form-label fw-semibold fs-6">Nama</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text"
                                                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                            </div>
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6">Jabatan</label>
                                            </div>
                                            <div className="col-md-4">
                                                <select className="form-select form-select-solid"
                                                    data-control="select2" data-placeholder="Pilih">
                                                    <option></option>
                                                    <option value="a">-</option>
                                                    <option value="b">-</option>
                                                    <option value="a">-</option>
                                                    <option value="b">-</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row mb-10">
                                            <div className="col-2">
                                                <label className="col-form-label fw-semibold fs-6">NRK</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text"
                                                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                            </div>
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6">Kelurahan</label>
                                            </div>
                                            <div className="col-md-4">
                                                <select className="form-select form-select-solid"
                                                    data-control="select2" data-placeholder="Pilih">
                                                    <option></option>
                                                    <option value="a">-</option>
                                                    <option value="b">-</option>
                                                    <option value="a">-</option>
                                                    <option value="b">-</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row mb-10">
                                            <div className="col-2">
                                                <label className="col-form-label fw-semibold fs-6">Wilayah / Bidang</label>
                                            </div>
                                            <div className="col-md-4">
                                                <select className="form-select form-select-solid"
                                                    data-control="select2" data-placeholder="Pilih">
                                                    <option></option>
                                                    <option value="a">-</option>
                                                    <option value="b">-</option>
                                                    <option value="a">-</option>
                                                    <option value="b">-</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <label className="col-form-label fw-semibold fs-6">NIP</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text"
                                                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row mb-10">
                                            <div className="col-2">
                                                <label className="col-form-label fw-semibold fs-6">Kecamatan / Seksi</label>
                                            </div>
                                            <div className="col-md-4">
                                                <select className="form-select form-select-solid"
                                                    data-control="select2" data-placeholder="Pilih">
                                                    <option></option>
                                                    <option value="a">-</option>
                                                    <option value="b">-</option>
                                                    <option value="a">-</option>
                                                    <option value="b">-</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className='col-sm-6 col-md-6 col-lg-6'>
                                            <Link to='#'>
                                                <button className='btn btn-primary me-3'>
                                                    <i className='fa-solid fa-search'></i>
                                                    Cari
                                                </button>
                                            </Link>
                                            <Link to='#'>
                                                <button className='btn btn-primary'>
                                                    <i className='fa-solid fa-arrows-rotate'></i>
                                                    Reset
                                                </button>
                                            </Link>
                                        </div>
                                        <div className='col-6 d-flex justify-content-end gap-2'>
                                            <Link to="/pelaporan/TambahLaporanKejadian">
                                                <a className="btn btn-success me-1" data-bs-toggle="modal"><i
                                                    className="fa-solid fa-plus"></i>Tambah</a>
                                            </Link>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Unduh
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/">Excel</Dropdown.Item>
                                                    <Dropdown.Item href="#/">PDF</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
