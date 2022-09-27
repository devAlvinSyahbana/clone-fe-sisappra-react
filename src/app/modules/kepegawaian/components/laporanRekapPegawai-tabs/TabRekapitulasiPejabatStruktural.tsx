import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LaporanRekapHeader } from './LaporanRekapHeader'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import { Button, Collapse } from 'react-bootstrap'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function TabRekapitulasiPejabatStruktural() {

    const [open, setOpen] = useState(false)

    const columns = [
        {
            name: 'No',
            selector: (row: { no: any; }) => row.no,
        },
        {
            name: 'Nama',
            selector: (row: { nama: any; }) => row.nama,
        },
        {
            name: 'NIP',
            selector: (row: { nip: any; }) => row.nip,
        },
        {
            name: 'NRK',
            selector: (row: { nrk: any; }) => row.nrk,
        },
        {
            name: 'Jabatan',
            selector: (row: { jabatan: any; }) => row.jabatan,
        },
        {
            name: 'Tempat Tugas',
            selector: (row: { ttugas: any; }) => row.ttugas,
        },
        {
            name: 'Keterangan',
            selector: (row: { ket: any; }) => row.ket,
        },
        {
            name: 'Aksi',
            sortable: false,
            text: "Action",
            className: "action",
            align: "left",
            cell: (record: any) => {
                return (
                    <Fragment>

                        <div className="mb-2">
                            {[DropdownButton].map((DropdownType, idx) => (
                                <>
                                    <DropdownType
                                        as={ButtonGroup}
                                        key={idx}
                                        id={`dropdown-button-drop-${idx}`}
                                        size="sm"
                                        variant="light"
                                        title="Aksi">
                                        <Dropdown.Item href="/#/action-2">Hapus</Dropdown.Item>
                                        <Dropdown.Item href="/#/action-2">Detail</Dropdown.Item>
                                    </DropdownType>
                                </>
                            ))}
                        </div>
                    </Fragment>
                );
            },
        },
    ];


    const data = [
        {
            id: 1,
            no: '1',
            nama: 'Arifin',
            nip: '197206221992031003',
            nrk: '118558',
            jabatan: 'Kepala Satpol PP Provinsi DKI Jakarta',
            ttugas: 'Satpol PP Provinsi DKI Jakarta',
            ket: '',
        },
        {
            id: 2,
            no: '2',
            nama: '',
            nip: '',
            nrk: '',
            jabatan: '',
            ttugas: '',
            ket: '',
        },
        {
            id: 3,
            no: '3',
            nama: '',
            nip: '',
            nrk: '',
            jabatan: '',
            ttugas: '',
            ket: '',
        },
        {
            id: 4,
            no: '4',
            nama: '',
            nip: '',
            nrk: '',
            jabatan: '',
            ttugas: '',
            ket: '',
        },
        {
            id: 5,
            no: '5',
            nama: '',
            nip: '',
            nrk: '',
            jabatan: '',
            ttugas: '',
            ket: '',
        },
    ]

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
                                            <Link to="/kepegawaian/LaporanRekapitulasiPegawai/TambahPejabatStruktural">
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
