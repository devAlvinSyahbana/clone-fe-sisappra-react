import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { LaporanRekapHeader } from './LaporanRekapHeader'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import { Button, Collapse } from 'react-bootstrap'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const SARANA_PRASARANA_URL = `${API_URL}/sarana-prasarana` //http://localhost:3000/sarana-prasarana

export function TabRekapitulasiPejabatStruktural() {

    const [open, setOpen] = useState(false)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [qParamFind, setUriFind] = useState({ strparam: '' })

    useEffect(() => {
        async function fetchDT(page: number) {
            setLoading(true)
            const response = await axios.get(
                `${SARANA_PRASARANA_URL}/filter?limit=${perPage}&offset=${page}${qParamFind.strparam}`
            )
            setData(response.data.data)
            setTotalRows(response.data.total_data)
            setLoading(false)
        }
        fetchDT(1)
    }, [qParamFind, perPage])

    const columns = [
        {
            name: 'No',
            selector: (row: any) => row.no,
        },
        {
            name: 'Nama',
            selector: (row: any) => row.nama,
        },
        {
            name: 'NIP',
            selector: (row: any) => row.nip,
        },
        {
            name: 'NRK',
            selector: (row: any) => row.nrk,
        },
        {
            name: 'Jabatan',
            selector: (row: any) => row.jabatan,
        },
        {
            name: 'Tempat Tugas',
            selector: (row: any) => row.ttugas,
        },
    ];

    function MyComponent() {
        return (
            <DataTable
                columns={columns}
                data={data}
            />
        );
    };

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
                                    <div className="form-group">
                                        <div className="row mb-10">
                                            <div className="col-2">
                                                <label className="col-form-label fw-semibold fs-6">NIP</label>
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
                                            <div className="col-2 offset-md-6">
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
                                                <Button type='submit' className='btn btn-primary me-3'
                                                    data-kt-menu-dismiss="true" data-kt-user-table-filter="filter"
                                                    onClick={() => setOpen(!open)}
                                                    aria-controls='example-collapse-text'
                                                    aria-expanded={open}>
                                                    <i className='fa-solid fa-search'></i>
                                                    Cari
                                                </Button>
                                            </Link>
                                            <Link to='#'>
                                                <button className='btn btn-primary'>
                                                    <i className='fa-solid fa-arrows-rotate'></i>
                                                    Reset
                                                </button>
                                            </Link>
                                        </div>
                                        <div className='col-6 d-flex justify-content-end gap-2'>
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
                                <Collapse in={open}>
                                    <div className='card'>
                                        <div className="card-body py-4">
                                            <div className="row">
                                                <div className="col fs-4 mb-2 fw-semibold text-center">
                                                    DAFTAR PEJABAT STRUKTURAL
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col fs-4 mb-2 fw-semibold text-center">
                                                    SATPOL PP PROVINSI DKI JAKARTA
                                                </div>
                                            </div>
                                            <DataTable
                                                columns={columns}
                                                data={data}
                                                pagination
                                            />
                                            <div className="row">
                                                <div className="col-8"></div>
                                                <div className="col-4 fs-6 mb-2 fw-semibold text-center">
                                                    ..........................................
                                                    <div className="col fs-6 mb-15 fw-semibold text-center">
                                                        Kepala Satpol PP.........................................................
                                                    </div>
                                                    <div className="col fs-6 mb-2 fw-semibold text-center">
                                                        ..........................................
                                                    </div>
                                                    <div className="col fs-6 mb-2 fw-semibold text-center">
                                                        NIP. ......................
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
