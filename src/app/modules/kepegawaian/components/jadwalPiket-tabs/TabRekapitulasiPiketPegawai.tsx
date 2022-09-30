import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import clsx from 'clsx'
import FileDownload from 'js-file-download'
import { useRowState } from 'react-table'
import { Modal } from 'react-bootstrap'
import { ErrorMessage, FieldArray, Form, Formik } from 'formik'
import AsyncSelect from 'react-select/async'
import { JadwalPiketHeader } from './JadwalPiketHeader'
const API_URL = process.env.REACT_APP_SISAPPRA_API_URL

export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const KEPEGAWAIAN_UNDUH_URL = `${API_URL}/kepegawaian-unduh`

export function TabRekapitulasiPiketPegawai() {
    const navigate = useNavigate()

    const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
    const [valFilterTanggal, setFilterTanggal] = useState({ val: '' })
    const [valFilterWilayah, setFilterWilayah] = useState({ val: '' })
    const [valFilterKecamatan, setFilterKecamatan] = useState({ val: '' })
    const [valFilterKelurahan, setFilterKelurahan] = useState({ val: '' })
    const arrWilayah = ['', '', '']
    const arrKecamatan = ['', '', '']
    const arrKelurahan = ['', '', '']

    const [valFilterUnitOrganisasi, setFilterUnitOrganisasi] = useState({ val: '' })
    const [valFilterJumlahPegawai, setFilterJumlahPegawai] = useState({ val: '' })
    const [valFilterHadir, setFilterHadir] = useState({ val: '' })
    const [valFilterTidakHadir, setFilterTidakHadir] = useState({ val: '' })
    const [valFilterKeterangan, setFilterKeterangan] = useState({ val: '' })
    const [valFilterJumlah, setFilterJumlah] = useState({ val: '' })

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [qParamFind, setUriFind] = useState({ strparam: '' })

    const LoadingAnimation = (props: any) => {
        return (
            <>
                <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
                    {/* <span className="svg-icon svg-icon-2hx svg-icon-primary me-3">...</span> */}
                    <span className='spinner-border spinner-border-xl align-middle me-3'></span>
                    <div className='d-flex flex-column'>
                        <h5 className='mb-1'>Sedang mengambil data...</h5>
                    </div>
                </div>
            </>
        )
    }

    var num = 1

    const columns = [
        {
            name: 'No',
            sortable: true,
            sortField: 'no',
            wrap: true,
            width: '50px',
            cell: (row: any) => {
                return (
                    <div className='mb-2 mt-2'>
                        {num++}
                    </div>
                )
            },
        },
        {
            name: 'Unit Organisasi',
            selector: (row: any) => row.unit_organisasi,
            sortable: true,
            sortField: 'unit_organisasi',
            wrap: true,
        },
        {
            name: 'Jumlah Pegawai',
            selector: (row: any) => row.jumlah_pegawai,
            sortable: true,
            sortField: 'jumlah_pegawai',
            wrap: true,
        },
        {
            name: 'Hadir',
            selector: (row: any) => row.hadir,
            sortable: true,
            sortField: 'hadir',
            wrap: true,
            minWidth: '15',
        },
        {
            name: 'Tidak Hadir',
            selector: (row: any) => row.tidak_hadir,
            sortable: true,
            sortField: 'tidak_hadir',
            wrap: true,
            minWidth: '15',
        },
        {
            name: 'Keterangan',
            selector: (row: any) => row.keterangan,
            sortable: true,
            sortField: 'keterangan',
            wrap: true,
            center: true,
        },
        {
            name: 'Aksi',
            sortable: false,
            text: 'Aksi',
            className: 'action',
            center: true,
            allowOverflow: true,
            cell: (record: any) => {
                return (
                    <Fragment>
                        <div className='mb-2 mt-2'>
                            {[DropdownButton].map((DropdownType, idx) => (
                                <>
                                    <DropdownType
                                        as={ButtonGroup}
                                        key={idx}
                                        id={`dropdown-button-drop-${idx}`}
                                        size='sm'
                                        variant='light'
                                        title='Aksi'
                                    >
                                        <Dropdown.Item
                                            href='#'
                                        // onClick={() =>
                                        //     navigate(
                                        //         `/kepegawaian/InformasiDataPegawai/DataPribadi/${record?.id}/${record?.kepegawaian_status_pegawai}`,
                                        //         { replace: true }
                                        //     )
                                        // }
                                        >
                                            Detail
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href='#'
                                        // onClick={() =>
                                        //     navigate(
                                        //         `/kepegawaian/InformasiDataPegawai/UpdateDataPribadi/${record?.id}/${record?.kepegawaian_status_pegawai}`,
                                        //         { replace: true }
                                        //     )
                                        // }
                                        >
                                            Ubah
                                        </Dropdown.Item>
                                    </DropdownType>
                                </>
                            ))}
                        </div>
                    </Fragment>
                )
            },
        },
    ]

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                minHeight: '100px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    }

    useEffect(() => {
        async function fetchDT(page: number) {
            setLoading(true)
            const response = await axios.get(
                `${KEPEGAWAIAN_URL}/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
            )
            setData(response.data.data)
            setTotalRows(response.data.total_data)
            setLoading(false)
        }
        fetchDT(1)
    }, [qParamFind, perPage])

    const fetchData = async (page: number) => {
        setLoading(true)
        const response = await axios.get(
            `${KEPEGAWAIAN_URL}/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
        )
        setData(response.data.data)
        setTotalRows(response.data.total_data)
        setLoading(false)

        return [data, setData] as const
    }

    const handlePageChange = (page: number) => {
        fetchData(page)
    }

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setLoading(true)
        const response = await axios.get(
            `${KEPEGAWAIAN_URL}/find?limit=${newPerPage}&offset=${page}${qParamFind.strparam}`
        )
        setData(response.data.data)
        setPerPage(newPerPage)
        setLoading(false)
    }

    const handleFilter = async () => {
        let uriParam = ''
        if (valFilterTanggal.val !== '') {
            uriParam += `&tanggal=${valFilterTanggal.val}`
        }
        if (valFilterWilayah.val !== '') {
            uriParam += `&wilayah=${valFilterWilayah.val}`
        }
        if (valFilterKecamatan.val !== '') {
            uriParam += `&kecamatan=${valFilterKecamatan.val}`
        }
        if (valFilterKelurahan.val !== '') {
            uriParam += `&kelurahan=${valFilterKelurahan.val}`
        }
        setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
    }

    const handleFilterReset = () => {
        setFilterTanggal({ val: '' })
        setFilterWilayah({ val: '' })
        setFilterKecamatan({ val: '' })
        setFilterKelurahan({ val: '' })
        setUriFind((prevState) => ({ ...prevState, strparam: '' }))
    }

    const handleChangeInputTanggal = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterTanggal({ val: event.target.value })
    }
    const handleChangeInputWilayah = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterWilayah({ val: event.target.value })
    }
    const handleChangeInputKecamatan = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterKecamatan({ val: event.target.value })
    }
    const handleChangeInputKelurahan = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterKelurahan({ val: event.target.value })
    }

    // Input Tambah
    const handleChangeInputUnitOrganisasi = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterUnitOrganisasi({ val: event.target.value })
    }
    const handleChangeInputJumlahPegawai = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterJumlahPegawai({ val: event.target.value })
    }
    const handleChangeInputHadir = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterHadir({ val: event.target.value })
    }
    const handleChangeInputTidakHadir = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterTidakHadir({ val: event.target.value })
    }
    const handleChangeInputKeterangan = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterKeterangan({ val: event.target.value })
    }
    const handleChangeInputJumlah = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterJumlah({ val: event.target.value })
    }
    // const handleFilterResetForm = () => {
    //     setFilterUnitOrganisasi({ val: '' })
    //     setFilterJumlahPegawai({ val: '' })
    //     setFilterHadir({ val: '' })
    //     setFilterTidakHadir({ val: '' })
    //     setFilterKeterangan({ val: '' })
    //     setFilterJumlah({ val: '' })
    //     setUriFind((prevState) => ({ ...prevState, strparam: '' }))
    // }

    const handleUnduh = async () => {
        setbtnLoadingUnduh(true)
        await axios({
            url: `${KEPEGAWAIAN_UNDUH_URL}/unduh-pegawai?status=${valFilterTanggal.val !== '' ? valFilterTanggal.val : 'PNS'
                }`,
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            FileDownload(
                response.data,
                'DATA KEPEGAWAIAN ' + (valFilterTanggal.val !== '' ? valFilterTanggal.val : 'PNS') + '.xlsx'
            )
            setbtnLoadingUnduh(false)
        })
    }

    const [lgShow, setLgShow] = useState(false)
    const handleClose = () => setLgShow(false);
    const [inputValAtasan, setDataPegawai] = useState({ label: '', value: null })

    const initialValues = {
        friends: [
            {
                nrk: '',
                nama: '',
            },
        ],
    };

    // const loadOptionsPegawai = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
    //     setTimeout(async () => {
    //         callback(await filterPegawai(inputValue))
    //     }, 1000)
    // }
    const handleInputPegawai = (newValue: any) => {
        setDataPegawai((prevstate: any) => ({ ...prevstate, ...newValue }))
    }

    return (
        <>
            <JadwalPiketHeader />
            <div className={`card`}>
                {/* begin::Body */}
                <div id='kt_advanced_search_form'>
                    <div className='row g-8 mt-2 ms-5 me-5'>
                        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <label htmlFor='' className='mb-3'>
                                Tanggal
                            </label>
                            <input
                                type='date'
                                className='form-control form-control'
                                name='tanggal'
                                value={valFilterTanggal.val}
                                onChange={handleChangeInputTanggal}
                                placeholder='Nama'
                            />
                        </div>
                        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <div className='form-group'>
                                <label htmlFor='' className='mb-3'>
                                    Wilayah/Bidang
                                </label>
                                <select
                                    className='form-select'
                                    aria-label='Select example'
                                    value={valFilterWilayah.val}
                                    onChange={handleChangeInputWilayah}
                                    name='wilayah'
                                >
                                    <option value=''>Pilih Tempat Tugas</option>
                                    {arrWilayah.map((val: string) => {
                                        return <option value={val}>{val}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <div className='form-group'>
                                <label htmlFor='' className='mb-3'>
                                    Kecamatan/Seksi
                                </label>
                                <select
                                    className='form-select '
                                    aria-label='Select example'
                                    value={valFilterKecamatan.val}
                                    onChange={handleChangeInputKecamatan}
                                    name='kecamatan'
                                >
                                    <option value=''>Pilih Kecamatan/Seksi</option>
                                    {arrKecamatan.map((val: string) => {
                                        return <option value={val}>{val}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                            <div className='form-group'>
                                <label htmlFor='' className='mb-3'>
                                    Kelurahan
                                </label>
                                <select
                                    className='form-select'
                                    aria-label='Select example'
                                    value={valFilterKelurahan.val}
                                    onChange={handleChangeInputKelurahan}
                                    name='kelurahan'
                                >
                                    <option value=''>Pilih Kelurahan</option>
                                    {arrKelurahan.map((val: string) => {
                                        return <option value={val}>{val}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row g-8 mt-2 ms-5 me-5 '>
                    <div className='col-md-6 col-lg-6 col-sm-12'>
                        <Link to='#'>
                            <button onClick={handleFilter} className='btn btn-primary me-2'>
                                <i className='fa-solid fa-search'></i>
                                Cari
                            </button>
                        </Link>
                        <Link to='#' onClick={handleFilterReset} className=''>
                            <button className='btn btn-primary'>
                                <i className='fa-solid fa-arrows-rotate'></i>
                                Reset
                            </button>
                        </Link>
                    </div>
                    <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12 '>
                        <Link to='#' onClick={() => setLgShow(true)} className='me-2'>
                            <button className='btn btn-primary'>
                                <i className='fa-solid fa-plus'></i>
                                Tambah
                            </button>
                        </Link>
                        <div className='d-flex justify-content-end me-2 '>
                            <Dropdown as={ButtonGroup}>
                                <Button variant='light'>
                                    {btnLoadingUnduh ? (
                                        <>
                                            <span className='spinner-border spinner-border-md align-middle me-3'></span>{' '}
                                            Memproses...
                                        </>
                                    ) : (
                                        'Unduh'
                                    )}
                                </Button>

                                <Dropdown.Toggle split variant='light' id='dropdown-split-basic' />

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleUnduh}>Excel</Dropdown.Item>
                                    <Dropdown.Item>PDF</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Modal
                            size="lg"
                            show={lgShow}
                            onHide={handleClose}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    <h2 className="fw-bold">Tambah Rekap Piket Pegawai </h2>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={async (values) => {
                                        await new Promise((r) => setTimeout(r, 500));
                                        alert(JSON.stringify(values, null, 2));
                                    }}
                                >
                                    {({ values }) => (
                                        <Form>
                                            <FieldArray name="friends">
                                                {({ insert, remove, push }) => (
                                                    <div>
                                                        <div className="modal-content">
                                                            <div className="modal-body scroll-y mx-xl-0">
                                                                <div className="d-flex flex-column scroll-y" id="kt_modal_add_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_user_header" data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
                                                                    <div className='form-group'>
                                                                        <div className="fv-row mb-7 pt-3">
                                                                            <label htmlFor='' className='fw-semibold fs-6 mb-2'>
                                                                                Unit Organisasi
                                                                            </label>
                                                                            <input
                                                                                className='form-control form-control'
                                                                                name='unit_organisasi'
                                                                                type='text'
                                                                                onChange={handleChangeInputUnitOrganisasi}
                                                                            // onBlur={formik.handleBlur}
                                                                            // value={valuesFormik?.Kota}
                                                                            />
                                                                            {/* <AsyncSelect
                                                                        cacheOptions
                                                                        loadOptions={loadOptionsPegawai}
                                                                        defaultOptions
                                                                        onChange={handleInputPegawai}
                                                                        placeholder={'Masukkan Nomor Pegawai'}
                                                                    /> */}

                                                                        </div>
                                                                    </div>
                                                                    <div className="fv-row mb-7">
                                                                        <label className="fw-semibold fs-6 mb-2">Jumlah Pegawai</label>
                                                                        <input
                                                                            className='form-control form-control'
                                                                            name='jumlah_pegawai'
                                                                            type='number'
                                                                            onChange={handleChangeInputJumlahPegawai}
                                                                        />
                                                                    </div>
                                                                    <div className="fv-row mb-7">
                                                                        <label className="fw-semibold fs-6 mb-2">Hadir</label>
                                                                        <input
                                                                            className='form-control form-control'
                                                                            name='jumlah_pegawai'
                                                                            type='number'
                                                                            onChange={handleChangeInputHadir}
                                                                        />
                                                                    </div>
                                                                    <div className="fv-row mb-7">
                                                                        <label className="fw-semibold fs-6 mb-2">Tidak Hadir</label>
                                                                        <input
                                                                            className='form-control form-control'
                                                                            name='jumlah_pegawai'
                                                                            type='number'
                                                                            onChange={handleChangeInputTidakHadir}
                                                                        />
                                                                    </div>
                                                                    <div className="fv-row mb-7">
                                                                        <label className="fw-semibold fs-6 mb-2">Keterangan</label>
                                                                        <textarea
                                                                            className='form-control form-control'
                                                                            name='jumlah_pegawai'
                                                                            onChange={handleChangeInputKeterangan}
                                                                        />
                                                                    </div>
                                                                    <div className="fv-row mb-7">
                                                                        <label className="fw-semibold fs-6 mb-2">Jumlah</label>
                                                                        <input
                                                                            className='form-control form-control'
                                                                            name='jumlah_pegawai'
                                                                            type='number'
                                                                            onChange={handleChangeInputJumlah}
                                                                            value={valFilterHadir.val + valFilterTidakHadir.val + valFilterJumlahPegawai.val}
                                                                            disabled
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </FieldArray>
                                            <div className="text-center pt-15">
                                                <button type="reset" className="btn btn-light me-3" onClick={handleClose}>
                                                    Batal
                                                </button>
                                                <button type="submit" className="btn btn-primary" data-kt-users-modal-action="submit">
                                                    <span className="indicator-label">Simpan</span>
                                                    <span className="indicator-progress">Harap tunggu...
                                                        <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                {/*end::Modal content*/}
                            </Modal.Body>
                        </Modal>
                        {/*end::Modal - Add task*/}
                    </div>
                </div>

                <div className='table-responsive mt-5 ms-5 me-5'>
                    <div className='card-body py-4 mt-4'>
                        <div className='row'>
                            <div className='col fs-4 mb-2 fw-bold text-center'>REKAPITULASI PIKET PEGAWAI</div>
                        </div>
                        <div className='row'>
                            <div className='col fs-4 mb-2 fw-bold text-center'>
                                PADA SATUAN POLISI PAMONG PRAJA ........................................
                            </div>
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
                        customStyles={customStyles}
                    />
                    <div className="row">
                        <div className="col-8"></div>
                        <div className="col-4 fs-6 mb-2 pt-10 fw-semibold text-center">
                            {valFilterTanggal.val === '' ? (
                                '...................................................................'
                            ) : valFilterTanggal.val}
                            <div className="col fs-6 mb-15 fw-semibold text-center">
                                Kepala Satpol PP
                                {valFilterWilayah.val === '' ? (
                                    '...........................................'
                                ) : valFilterWilayah.val}
                            </div>
                            <div className="col fs-6 mb-2 pt-10 fw-semibold text-center">

                            </div>
                            <div className="col fs-6 mb-0 fw-semibold text-center">
                                ...................................................................
                            </div>
                            <div className="col fs-6 mb-2 fw-semibold text-center">
                                NIP. ..............................................................
                            </div>
                        </div>
                    </div>
                </div>
                {/* end::Body */}
            </div>
        </>
    )
}