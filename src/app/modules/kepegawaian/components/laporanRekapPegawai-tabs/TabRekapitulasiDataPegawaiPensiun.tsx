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
import { LaporanRekapHeader } from './LaporanRekapHeader'
import { Modal } from 'react-bootstrap'
import { ErrorMessage, FieldArray, Form, Formik } from 'formik'
import AsyncSelect from 'react-select/async'
import { SelectOptionAutoCom } from '../KepegawaianInterface'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL

export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const KEPEGAWAIAN_UNDUH_URL = `${API_URL}/kepegawaian-unduh`
export const KECAMATAN_URL = `${API_URL}/master/kecamatan` //http://localhost:3000/master/kecamatan
export const KELURAHAN_URL = `${API_URL}/master/kelurahan`


export function TabRekapitulasiDataPegawaiPensiun() {
    const navigate = useNavigate()

    const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
    const [valStatPegawai, setValStatPegawai] = useState({ val: '' })
    const [valFilterNama, setFilterNama] = useState({ val: '' })
    const [valFilterNRK, setFilterNRK] = useState({ val: '' })
    const [valFilterNoPegawai, setFilterNoPegawai] = useState({ val: '' })
    const [valFilterWilayah, setFilterWilayah] = useState({ val: '' })
    const [valFilterTahunPensiun, setFilterTahunPensiun] = useState({ val: '' })
    const arrStatPegawai = ['PNS', 'PTT', 'PJLP']
    const arrKelurahan = ['', '', '']
    const arrWilayah = ['', '', '']

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    var [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [lgShow, setLgShow] = useState(false)
    const [qParamFind, setUriFind] = useState({ strparam: '' })
    const [inputValAtasan, setDataPegawai] = useState({ label: '', value: null })

    const initialValues = {
        friends: [
            {
                nrk: '',
                nama: '',
            },
        ],
    };

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

    var num = 1;

    const columns = [
        {
            name: 'No',
            wrap: true,
            cell: (row: number) => {
                return (
                    <div className='mb-2 mt-2'>
                        {num++}
                    </div>
                )
            },
        },
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
            center: true,
        },
        {
            name:
                valStatPegawai.val !== ''
                    ? valStatPegawai.val === 'PTT'
                        ? 'NPTT'
                        : valStatPegawai.val === 'PJLP'
                            ? 'NPJLP'
                            : 'NRK'
                    : 'NRK',
            selector: (row: any) => row.kepegawaian_nrk,
            sortable: true,
            sortField: 'kepegawaian_nrk',
            wrap: true,
            center: true,
        },
        {
            name: 'Jabatan',
            selector: (row: any) => row.jabatan,
            sortable: true,
            sortField: 'jabatan',
            wrap: true,
        },
        {
            name: 'Tempat Tugas Wilayah/Bidang',
            selector: (row: any) => row.wilayah,
            sortable: true,
            sortField: 'wilayah',
            wrap: true,
            width: "250px",
        },
        {
            name: 'Tempat Tugas Kecamatan/Seksi',
            selector: (row: any) => row.kecamatan,
            sortable: true,
            sortField: 'kecamatan',
            wrap: true,
            width: "250px",
        },
        {
            name: 'Tempat Lahir',
            selector: (row: any) => row.tempat_lahir,
            sortable: true,
            sortField: 'tempat_lahir',
            wrap: true,
            width: '200px',
        },
        {
            name: 'Tanggal Lahir',
            selector: (row: any) => row.tgl_lahir,
            sortable: true,
            sortField: 'tgl_lahir',
            wrap: true,
            minWidth: '15',
        },
        {
            name: 'Tahun Pensiun',
            selector: (row: any) => row.thn_pensiun,
            sortable: true,
            sortField: 'thn_pensiun',
            wrap: true,
            minWidth: '15',
        },
        // {
        //     name: 'Ket',
        //     selector: (row: any) => row.thn_pensiun,
        //     sortable: true,
        //     sortField: 'thn_pensiun',
        //     wrap: true,
        //     minWidth: '15',
        // },
        // {
        //     name: 'Aksi',
        //     sortable: false,
        //     text: 'Aksi',
        //     className: 'action',
        //     center: true,
        //     allowOverflow: true,
        //     cell: (record: any) => {
        //         return (
        //             <Fragment>
        //                 <div className='mb-2 mt-2'>
        //                     {[DropdownButton].map((DropdownType, idx) => (
        //                         <>
        //                             <DropdownType
        //                                 as={ButtonGroup}
        //                                 key={idx}
        //                                 id={`dropdown-button-drop-${idx}`}
        //                                 size='sm'
        //                                 variant='light'
        //                                 title='Aksi'
        //                             >
        //                                 <Dropdown.Item
        //                                     href='#'
        //                                     onClick={() =>
        //                                         navigate(
        //                                             `/kepegawaian/InformasiDataPegawai/DataPribadi/${record?.id}/${record?.kepegawaian_status_pegawai}`,
        //                                             { replace: true }
        //                                         )
        //                                     }
        //                                 >
        //                                     Detail
        //                                 </Dropdown.Item>
        //                                 <Dropdown.Item
        //                                     href='#'
        //                                     onClick={() =>
        //                                         navigate(
        //                                             `/kepegawaian/InformasiDataPegawai/UpdateDataPribadi/${record?.id}/${record?.kepegawaian_status_pegawai}`,
        //                                             { replace: true }
        //                                         )
        //                                     }
        //                                 >
        //                                     Ubah
        //                                 </Dropdown.Item>
        //                             </DropdownType>
        //                         </>
        //                     ))}
        //                 </div>
        //             </Fragment>
        //         )
        //     },
        // },
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

    const handleChangeStatPegawai = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setValStatPegawai({ val: event.target.value })
    }
    const handleChangeInputNama = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterNama({ val: event.target.value })
    }
    const handleChangeInputNRK = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterNRK({ val: event.target.value })
    }
    const handleChangeInputNoPegawai = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterNoPegawai({ val: event.target.value })
    }
    const handleChangeInputWilayah = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterWilayah({ val: event.target.value })
    }
    // GET DATA
    interface SelectOptionAutoCom {
        readonly value: string
        readonly label: string
    }

    // GET Kecamatan
    const [inputValKecamatan, setFilterKecamatan] = useState({ label: '', value: null })
    const filterKecamatan = async (inputValue: string) => {
        const response = await axios.get(KECAMATAN_URL + "/find");
        const json = await response.data.data
        return json.map((i: any) => ({ label: i.kecamatan, value: i.id }))
    }
    const loadOptionsKecamatan = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
        setTimeout(async () => {
            callback(await filterKecamatan(inputValue))
        }, 1000)
    }
    const handleChangeInputKecamatan = (newValue: any) => {
        setFilterKecamatan((prevstate: any) => ({ ...prevstate, ...newValue }))
    }
    // END :: GET Kecamatan

    // GET Kelurahan
    const [inputValKelurahan, setFilterKelurahan] = useState({ label: '', value: null })
    const filterKelurahan = async (inputValue: string) => {
        const response = await axios.get(KELURAHAN_URL + "/findone-by-kelurahan?kecamatan=" + inputValKecamatan.label + "&kelurahan=" + inputValue);
        const json = await response.data.data
        return json.map((i: any) => ({ label: i.kelurahan, value: i.id }))
    }
    const loadOptionsKelurahan = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
        setTimeout(async () => {
            callback(await filterKelurahan(inputValue))
        }, 1000)
    }
    const handleChangeInputKelurahan = (newValue: any) => {
        setFilterKelurahan((prevstate: any) => ({ ...prevstate, ...newValue }))
    }
    // END :: GET Kelurahan

    const handleChangeInputTahunPensiun = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterTahunPensiun({ val: event.target.value })
    }
    const filterPegawai = async (inputValue: string) => {
        const response = await axios.get(`${KEPEGAWAIAN_URL}/auto-search-pegawai?status=${valStatPegawai.val ? valStatPegawai.val : "PNS"}&nomor=${inputValue}`)
        const json = await response.data.data
        return json.map((i: any) => ({ label: i.no_pegawai + " - " + i.nama, value: i.id }))
    }
    const loadOptionsPegawai = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
        setTimeout(async () => {
            callback(await filterPegawai(inputValue))
        }, 1000)
    }
    const handleInputPegawai = (newValue: any) => {
        setDataPegawai((prevstate: any) => ({ ...prevstate, ...newValue }))
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
        if (valStatPegawai.val !== '') {
            uriParam += `&status=${valStatPegawai.val}`
        }
        if (valFilterNama.val !== '') {
            uriParam += `&nama=${valFilterNama.val}`
        }
        if (valFilterNRK.val !== '') {
            uriParam += `&nrk=${valFilterNRK.val}`
        }
        if (valFilterNoPegawai.val !== '') {
            uriParam += `&nopegawai=${valFilterNoPegawai.val}`
        }
        if (valFilterWilayah.val !== '') {
            uriParam += `&wilayah=${valFilterWilayah.val}`
        }
        if (inputValKecamatan.value !== '') {
            uriParam += `&kecamatan=${inputValKecamatan.value}`
        }
        if (inputValKelurahan.value !== '') {
            uriParam += `&kelurahan=${inputValKelurahan.value}`
        }
        if (valFilterTahunPensiun.val !== '') {
            uriParam += `&tahun_pensiun=${valFilterTahunPensiun.val}`
        }
        setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
    }

    const handleFilterReset = () => {
        setValStatPegawai({ val: '' })
        setFilterNama({ val: '' })
        setFilterNRK({ val: '' })
        setFilterNoPegawai({ val: '' })
        setFilterWilayah({ val: '' })
        setFilterKecamatan({ label: '', value: null })
        setFilterKelurahan({ label: '', value: null })
        setFilterTahunPensiun({ val: '' })
        setUriFind((prevState) => ({ ...prevState, strparam: '' }))
    }
    const handleUnduh = async () => {
        setbtnLoadingUnduh(true)
        await axios({
            url: `${KEPEGAWAIAN_UNDUH_URL}/unduh-pegawai?status=${valStatPegawai.val !== '' ? valStatPegawai.val : 'PNS'
                }`,
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            FileDownload(
                response.data,
                'DATA PEGAWAI ' + (valStatPegawai.val !== '' ? valStatPegawai.val : 'PENSIUN PROVINSI DKI JAKARTA') + '.xlsx'
            )
            setbtnLoadingUnduh(false)
        })
    }

    return (
        <>
            <LaporanRekapHeader />
            <div className={`card`}>
                {/* begin::Body */}
                <div id='kt_advanced_search_form'>
                    <div className='row g-8 mt-2 ms-5 me-5 '>
                        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12 '>
                            <label htmlFor='' className='mb-3'>
                                Nama
                            </label>
                            <input
                                type='text'
                                className='form-control form-control '
                                name='nama'
                                value={valFilterNama.val}
                                onChange={handleChangeInputNama}
                                placeholder='Nama'
                            />
                        </div>
                        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12 '>
                            <label htmlFor='' className='mb-3'>
                                Kecamatan
                            </label>
                            {/* <select
                                className='form-select'
                                name='kecamatan'
                                value={valFilterKecamatan.val}
                                onChange={handleChangeInputKecamatan}
                                placeholder='Pilih Kecamatan/Seksi'
                            >
                                <option value='' selected disabled>Pilih Kecamatan/Seksi</option>
                                {arrKecamatan.map((val: string) => {
                                    return <option value={val}>{val}</option>
                                })}
                            </select> */}
                            <AsyncSelect
                                cacheOptions
                                loadOptions={loadOptionsKecamatan}
                                defaultOptions
                                value={inputValKecamatan.value ? inputValKecamatan : { value: '', label: 'Pilih Kecamatan' }}
                                onChange={handleChangeInputKecamatan}
                            />
                        </div>
                        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12 '>
                            <div className='form-group'>
                                <label htmlFor='' className='mb-3'>
                                    Status Kepegawaian
                                </label>
                                <select
                                    className='form-select'
                                    aria-label='Select example'
                                    value={valStatPegawai.val}
                                    onChange={handleChangeStatPegawai}
                                    name='val'
                                >
                                    <option value='' disabled selected>Pilih Status</option>
                                    {arrStatPegawai.map((val: string) => {
                                        return <option value={val}>{val}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12 '>
                            <label htmlFor='' className='mb-3'>
                                Kelurahan
                            </label>
                            {/* <select
                                className='form-select'
                                name='kelurahan'
                                value={valFilterKelurahan.val}
                                onChange={handleChangeInputKelurahan}
                            >
                                <option value='' className='text-muted' selected disabled>Pilih Kelurahan</option>
                                {arrKelurahan.map((val: string) => {
                                    return <option value={val}>{val}</option>
                                })}
                            </select> */}
                            <AsyncSelect
                                cacheOptions
                                loadOptions={loadOptionsKelurahan}
                                defaultOptions
                                value={inputValKelurahan.value ? inputValKelurahan : { value: '', label: 'Pilih Kelurahan' }}
                                onChange={handleChangeInputKelurahan}
                            />
                        </div>
                        {valStatPegawai.val === 'PNS' || valStatPegawai.val === '' ? (
                            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                                <label htmlFor='' className='mb-3'>
                                    NRK
                                </label>
                                <input
                                    type='text'
                                    className='form-control form-control '
                                    name='nrk'
                                    value={valFilterNRK.val}
                                    onChange={handleChangeInputNRK}
                                    placeholder='NRK'
                                />
                            </div>
                        ) : null}
                        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12' id='fil_nrk'>
                            <label htmlFor='' className='mb-3'>
                                {valStatPegawai.val === 'PNS'
                                    ? 'NIP'
                                    : valStatPegawai.val === 'PTT'
                                        ? 'NPTT'
                                        : valStatPegawai.val === 'PJLP'
                                            ? 'NPJLP'
                                            : 'NIP'}
                            </label>
                            <input
                                type='text'
                                className='form-control form-control '
                                value={valFilterNoPegawai.val}
                                onChange={handleChangeInputNoPegawai}
                                placeholder={
                                    valStatPegawai.val === 'PNS'
                                        ? 'NIP'
                                        : valStatPegawai.val === 'PTT'
                                            ? 'NPTT'
                                            : valStatPegawai.val === 'PJLP'
                                                ? 'NPJLP'
                                                : 'NIP'
                                }
                            />
                        </div>
                        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12 '>
                            <label htmlFor='' className='mb-3'>
                                Tahun Pensiun
                            </label>
                            <input
                                type='number'
                                className='form-control form-control '
                                name='tahun_pensiun'
                                value={valFilterTahunPensiun.val}
                                onChange={handleChangeInputTahunPensiun}
                                placeholder='Masukkan Tahun Pensiun'
                            />
                        </div>
                        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12 '>
                            <label htmlFor='' className='mb-3'>
                                Wilayah/Bidang
                            </label>
                            <select
                                className='form-select '
                                name='wilayah'
                                value={valFilterWilayah.val}
                                onChange={handleChangeInputWilayah}
                                placeholder='Pilih Tempat Tugas'
                            >
                                <option value='' selected disabled>Pilih Tempat Tugas</option>
                                {arrWilayah.map((val: string) => {
                                    return <option value={val}>{val}</option>
                                })}
                            </select>
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
                        {/* <Link to='/kepegawaian/LaporanRekapitulasiPegawai/TambahPegawaiPensiun' className='me-2'>
                            <button className='btn btn-primary'>
                                <i className='fas fa-plus fa-fw'></i>
                                Tambah
                            </button>
                        </Link> */}
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
                                    <Dropdown.Item href='#' onClick={() =>
                                        navigate(
                                            `/kepegawaian/LaporanRekapitulasiPegawai/TabRekapitulasiDataPegawaiPensiun/DownloadPdf`
                                        )
                                    }>PDF</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                <div className='table-responsive mt-5 ms-5 me-5'>
                    <div className='card-body py-4 mt-4'>
                        <div className='row'>
                            <div className='col fs-4 mb-2 fw-bold text-center'>DAFTAR NAMA PEGAWAI YANG MEMASUKI MASA PENSIUN</div>
                        </div>
                        <div className='row'>
                            <div className='col fs-4 mb-2 fw-bold text-center'>
                                PADA SATUAN POLISI PAMONG PRAJA PROVINSI DKI JAKARTA
                            </div>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        subHeader={true}
                        data={data}
                        progressPending={loading}
                        progressComponent={<LoadingAnimation />}
                        highlightOnHover
                        pagination
                        paginationServer
                        paginationTotalRows={totalRows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        customStyles={customStyles}
                    />
                </div>
                {/* <div className="row">
                    <div className="col-8"></div>
                    <div className="col-4 fs-6 mb-2 pt-10 fw-semibold text-center">
                        <div className="col fs-6 mb-0 fw-semibold text-center">
                            ..................................................................
                        </div>
                        <div className="col fs-6 mb-20 fw-semibold text-center">
                            KEPALA SATPOL PP ..........................................................
                        </div>
                        <div className="col fs-6 mt-20 fw-semibold text-center">
                            ......................................................
                        </div>
                        <div className="col fs-6 mb-2 fw-semibold text-center">
                            NIP. ...................................................
                        </div>
                    </div>
                </div> */}
                {/* end::Body */}
            </div>
        </>
    )
}
