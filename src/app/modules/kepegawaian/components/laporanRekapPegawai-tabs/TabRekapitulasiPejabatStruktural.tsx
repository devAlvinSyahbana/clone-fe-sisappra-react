import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { LaporanRekapHeader } from './LaporanRekapHeader'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import { Button, Collapse } from 'react-bootstrap'
import clsx from 'clsx'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`


export function TabRekapitulasiPejabatStruktural() {

    const [open, setOpen] = useState(false)

    const [valFilternama, setFilternama] = useState({ val: '' })
    const [valFilterkepegawaian_nip, setFilterkepegawaian_nip] = useState({ val: '' })
    const [valFilterkepegawaian_nrk, setFilterkepegawaian_nrk] = useState({ val: '' })
    const [valFilterkepegawaian_jabatan, setFilterkepegawaian_jabatan] = useState({ val: '' })
    const [valFilterkepegawaian_tempat_tugas, setFilterkepegawaian_tempat_tugas] = useState({ val: '' })

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [qParamFind, setUriFind] = useState({ strparam: '' })

    useEffect(() => {
        async function fetchDT(page: number) {
            setLoading(true)
            const response = await axios.get(
                `${KEPEGAWAIAN_URL}/filter-rekapitulasi-pejabat-struktural?limit=${perPage}&offset=${page}${qParamFind.strparam}`
            )
            setData(response.data.data)
            setTotalRows(response.data.total_data)
            setLoading(false)
        }
        fetchDT(1)
    }, [qParamFind, perPage])

    const LoadingAnimation = (props: any) => {
        return (
            <>
                <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
                    <span className='spinner-border spinner-border-xl align-middle me-3'></span>
                    <div className='d-flex flex-column'>
                        <h5 className='mb-1'>Sedang mengambil data...</h5>
                    </div>
                </div>
            </>
        )
    }


    const handlePerRowsChange = async (newPerPage: any, page: any) => {
        setLoading(true)

        const response = await axios.get(
            `${KEPEGAWAIAN_URL}/filter-rekapitulasi-pejabat-struktural?limit=${perPage}&offset=${page}${qParamFind.strparam}`
        )

        setData(response.data.data)
        setPerPage(newPerPage)
        setLoading(false)
    }

    const handleFilter = async () => {
        let uriParam = ''
        if (valFilternama.val !== '') {
            uriParam += `&nama=${valFilternama.val}`
        }
        if (valFilterkepegawaian_nip.val !== '') {
            uriParam += `&nip=${valFilterkepegawaian_nip.val}`
        }
        if (valFilterkepegawaian_nrk.val !== '') {
            uriParam += `&nrk=${valFilterkepegawaian_nrk.val}`
        }
        if (valFilterkepegawaian_jabatan.val !== '') {
            uriParam += `&kepegawaian_jabatan=${valFilterkepegawaian_jabatan.val}`
        }
        if (valFilterkepegawaian_tempat_tugas.val !== '') {
            uriParam += `&kepegawaian_tempat_tugas=${valFilterkepegawaian_tempat_tugas.val}`
        }
        setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
    }

    const handleFilterReset = () => {
        setFilternama({ val: '' })
        setFilterkepegawaian_nip({ val: '' })
        setFilterkepegawaian_nrk({ val: '' })
        setFilterkepegawaian_jabatan({ val: '' })
        setFilterkepegawaian_tempat_tugas({ val: '' })
        setUriFind((prevState) => ({ ...prevState, strparam: '' }))
    }

    const columns = [
        {
            name: 'Nama',
            selector: (row: any) => row.nama,
            sortable: true,
            sortField: 'nama',
            width: '200px',
            wrap: true,
            cell: (record: any) => {
                return (
                    <Fragment>
                        <div className='d-flex align-items-center'>
                            {/* begin:: Avatar */}
                            <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                                {record?.foto !== '' ? (
                                    <div className='symbol-label'>
                                        <img src={record?.foto} alt={record?.nama} className='w-100' />
                                    </div>
                                ) : (
                                    <div className={clsx('symbol-label fs-3', `bg-light-primary`, `text-primary`)}>
                                        {record?.nama.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className='d-flex flex-column'>
                                <span>{record?.nama}</span>
                            </div>
                        </div>
                    </Fragment>
                )
            },
        },
        {
            name: 'NIP',
            selector: (row: any) => row.kepegawaian_nip,
            sortable: true,
            sortField: 'kepegawaian_nip',
            wrap: true,

        },
        {
            name: 'NRK',
            selector: (row: any) => row.kepegawaian_nrk,
            sortable: true,
            sortField: 'kepegawaian_nrk',
            wrap: true,
        },
        {
            name: 'Jabatan',
            selector: (row: any) => row.kepegawaian_jabatan,
            sortable: true,
            sortField: 'kepegawaian_jabatan',
            wrap: true,
        },
        {
            name: 'Tempat Tugas',
            selector: (row: any) => row.kepegawaian_tempat_tugas,
            sortable: true,
            sortField: 'kepegawaian_tempat_tugas',
            wrap: true,
        },
    ];

    const fetchUsers = async (page: any) => {
        setLoading(true)
        const response = await axios.get(
            `${KEPEGAWAIAN_URL}/filter?limit=${perPage}&offset=${page}${qParamFind.strparam}`
        )
        setData(response.data.data)

        setTotalRows(response.data.total_data)
        setLoading(false)
        return [data, setData] as const
    }

    const fetchData = async (page: number) => {
        setLoading(true)
        const response = await axios.get(
            `${KEPEGAWAIAN_URL}/filter-rekapitulasi-pejabat-struktural?limit=${perPage}&offset=${page}${qParamFind.strparam}`
        )
        setData(response.data.data)
        setTotalRows(response.data.total_data)
        setLoading(false)

        return [data, setData] as const
    }

    const handleChangeInputnama = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilternama({ val: event.target.value })
    }
    const handleChangeInputkepegawaian_nip = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterkepegawaian_nip({ val: event.target.value })
    }
    const handleChangeInputkepegawaian_nrk = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterkepegawaian_nrk({ val: event.target.value })
    }
    const handleChangeInputkepegawaian_jabatan = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterkepegawaian_jabatan({ val: event.target.value })
    }
    const handleChangeInputkepegawaian_tempat_tugas = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterkepegawaian_tempat_tugas({ val: event.target.value })
    }

    const handlePageChange = (page: number) => {
        fetchData(page)
    }

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
                                            <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-12'>
                                                <label htmlFor='' className='mb-3'>
                                                    Nama
                                                </label>
                                                <input
                                                    type='text'
                                                    className='form-control form-control form-control-solid'
                                                    name='nama'
                                                    value={valFilternama.val}
                                                    onChange={handleChangeInputnama}
                                                    placeholder='Nama'
                                                />
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
                                            <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-12'>
                                                <label htmlFor='' className='mb-3'>NRK</label>
                                                <input
                                                    type='text'
                                                    className='form-control form-control form-control-solid'
                                                    name='kepegawaian_nrk'
                                                    value={valFilterkepegawaian_nrk.val}
                                                    onChange={handleChangeInputkepegawaian_nrk}
                                                    placeholder='NRK'
                                                />
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
                                            <div className='col-xxl-4 col-lg-4 col-md-4 col-sm-12'>
                                                <label htmlFor='' className='mb-3'>NIP</label>
                                                <input
                                                    type='text'
                                                    className='form-control form-control form-control-solid'
                                                    name='kepegawaian_nip'
                                                    value={valFilterkepegawaian_nip.val}
                                                    onChange={handleChangeInputkepegawaian_nip}
                                                    placeholder='NIP'
                                                />
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
                                                <Button onClick={handleFilter} className='btn btn-primary me-3'>
                                                    <i className='fa-solid fa-search'></i>
                                                    Cari
                                                </Button>
                                            </Link>
                                            <Link to='#' onClick={handleFilterReset}>
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
                                            progressPending={loading}
                                            progressComponent={<LoadingAnimation />}
                                            pagination
                                            paginationServer
                                            paginationTotalRows={totalRows}
                                            onChangeRowsPerPage={handlePerRowsChange}
                                            onChangePage={handlePageChange}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
