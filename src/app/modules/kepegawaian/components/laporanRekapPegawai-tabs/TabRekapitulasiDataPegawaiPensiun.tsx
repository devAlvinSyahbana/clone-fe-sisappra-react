import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import DataTable, { createTheme } from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import FileDownload from 'js-file-download'
import { LaporanRekapHeader } from './LaporanRekapHeader'
import AsyncSelect from 'react-select/async'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { ThemeModeComponent } from '../../../../../_metronic/assets/ts/layout'
import { useThemeMode } from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme(
    'darkMetro',
    {
        text: {
            primary: '#92929f',
            secondary: '#92929f',
        },
        background: {
            default: '#1e1e2e',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#2b2c41',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    },
    'dark'
)
const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

const reactSelectLightThem = {
    input: (base: object) => ({
        ...base,
        color: '#5e6278',
    }),
    menu: (base: object) => ({
        ...base,
        backgroundColor: '#f5f8fa',
        color: '#5e6278',
        borderColor: 'hsl(204deg 33% 97%)',
    }),
    container: (base: object) => ({
        ...base,
        backgroundColor: '#f5f8fa',
        color: '#5e6278',
        borderColor: 'hsl(204deg 33% 97%)',
    }),
    indicatorsContainer: (base: object) => ({
        ...base,
        color: '#cccccc',
    }),
    indicatorSeparator: (base: object) => ({
        ...base,
        backgroundColor: '#cccccc',
    }),
    control: (base: object) => ({
        ...base,
        backgroundColor: '#f5f8fa',
        color: '#5e6278',
        borderColor: 'hsl(204deg 33% 97%)',
        boxShadow: '0 0 0 1px #f5f8fa',
    }),
    singleValue: (base: object) => ({
        ...base,
        backgroundColor: '#f5f8fa',
        color: '#5e6278',
    }),
    option: (base: object) => ({
        ...base,
        height: '100%',
        backgroundColor: '#f5f8fa',
        color: '#5e6278',
        borderColor: 'hsl(204deg 33% 97%)',
    }),
}

const reactSelectDarkThem = {
    input: (base: object) => ({
        ...base,
        color: '#92929f',
    }),
    menu: (base: object) => ({
        ...base,
        backgroundColor: '#1b1b29',
        color: '#92929f',
        borderColor: 'hsl(240deg 13% 13%)',
    }),
    container: (base: object) => ({
        ...base,
        backgroundColor: '#1b1b29',
        color: '#92929f',
        borderColor: 'hsl(240deg 13% 13%)',
    }),
    indicatorsContainer: (base: object) => ({
        ...base,
        color: '#92929f',
    }),
    indicatorSeparator: (base: object) => ({
        ...base,
        backgroundColor: '#92929f',
    }),
    control: (base: object) => ({
        ...base,
        backgroundColor: '#1b1b29',
        color: '#92929f',
        borderColor: 'hsl(240deg 13% 13%)',
        boxShadow: '0 0 0 1px #1b1b29',
    }),
    singleValue: (base: object) => ({
        ...base,
        backgroundColor: '#1b1b29',
        color: '#92929f',
    }),
    option: (base: object) => ({
        ...base,
        height: '100%',
        backgroundColor: '#1b1b29',
        color: '#92929f',
        borderColor: 'hsl(240deg 13% 13%)',
    }),
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`
export const BIDANG_WILAYAH_URL = `${API_URL}/master/bidang-wilayah`
export const PELAKSANA_URL = `${API_URL}/master/pelaksana`
// export const KECAMATAN_URL = `${API_URL}/master/kecamatan`
export const KELURAHAN_URL = `${API_URL}/master/kelurahan`

export function TabRekapitulasiDataPegawaiPensiun() {
    const navigate = useNavigate()
    const { mode } = useThemeMode()
    const calculatedMode = mode === 'system' ? systemMode : mode

    const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
    const [valStatPegawai, setValStatPegawai] = useState({ val: '' })
    const [valFilterNama, setFilterNama] = useState({ val: '' })
    const [valFilterKecamatan, setFilterKecamatan] = useState({ val: '' })
    const [valFilterWilayah, setFilterWilayah] = useState({ val: '' })
    const [inputValKec, setDataKec] = useState({ label: '', value: null })
    const [inputValTugas, setDataTugas] = useState({ label: '', value: null })
    const [valFilterNRK, setFilterNRK] = useState({ val: '' })
    const [valFilterNIP, setFilterNIP] = useState({ val: '' })
    const [valFilterTahunPensiun, setFilterTahunPensiun] = useState({ val: '' })
    const arrStatPegawai = ['PNS', 'PTT', 'PJLP']

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
            // selector: (row: any) => row.nama,
            sortable: true,
            sortField: 'nama',
            width: '150px',
            wrap: true,
            cell: (row: any) => {
                return (
                    <div className='mb-2 mt-2' style={{ textTransform: 'uppercase' }}>
                        {row.nama}
                    </div>
                )
            },
            // cell: (record: any) => {
            //     return (
            //         <Fragment>
            //             <div className='d-flex align-items-center'>
            //                 {/* begin:: Avatar */}
            //                 <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
            //                     {record?.foto !== '' ? (
            //                         <div className='symbol-label'>
            //                             <img src={record?.foto} alt={record?.nama} className='w-100' />
            //                         </div>
            //                     ) : (
            //                         <div className={clsx('symbol-label fs-3', `bg-light-primary`, `text-primary`)}>
            //                             {record?.nama.charAt(0)}
            //                         </div>
            //                     )}
            //                 </div>
            //                 <div className='d-flex flex-column'>
            //                     <span>{record?.nama}</span>
            //                 </div>
            //             </div>
            //         </Fragment>
            //     )
            // },
        },
        {
            name: 'NIP',
            selector: (row: any) => row.nip,
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
            selector: (row: any) => row.nrk_nptt_pjlp,
            sortable: true,
            sortField: 'kepegawaian_nrk',
            wrap: true,
            center: true,
        },
        {
            name: 'Status',
            selector: (row: any) => row.kepegawaian_status_pegawai,
            sortable: true,
            sortField: 'kepegawaian_status_pegawai',
            wrap: true,
        },
        {
            name: 'Jabatan',
            selector: (row: any) => row.jabatan,
            sortable: true,
            sortField: 'jabatan',
            wrap: true,
            width: "100px",
        },
        {
            name: 'Tempat Tugas Wilayah/Bidang',
            selector: (row: any) => row.tempat_tugas,
            sortable: true,
            sortField: 'wilayah',
            wrap: true,
            width: "250px",
        },
        {
            name: 'Tempat Tugas Kecamatan/Seksi',
            selector: (row: any) => row.subbag_seksi_kecamatan,
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
            width: '150px',
        },
        {
            name: 'Tanggal Lahir',
            selector: (row: any) => moment(row.tgl_lahir).format('D MMMM YYYY'),
            sortable: true,
            sortField: 'tgl_lahir',
            wrap: true,
            width: '150px',
        },
        {
            name: 'Tahun Pensiun',
            selector: (row: any) => row.tahun_pensiun,
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
                `${KEPEGAWAIAN_URL}/Pensiun?limit=${perPage}&offset=${page}${qParamFind.strparam}`
            )
            setData(response.data.data)
            setTotalRows(response.data.total_data)
            setLoading(false)
        }
        fetchDT(1)
    }, [qParamFind, perPage, valStatPegawai.val])

    const fetchData = async (page: number) => {
        setLoading(true)
        const response = await axios.get(
            `${KEPEGAWAIAN_URL}/Pensiun?limit=${perPage}&offset=${page}${qParamFind.strparam}`
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
            `${KEPEGAWAIAN_URL}/Pensiun?limit=${newPerPage}&offset=${page}${qParamFind.strparam}`
        )
        setData(response.data.data)
        setPerPage(newPerPage)
        setLoading(false)
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
    const handleChangeInputNIP = (event: {
        preventDefault: () => void
        target: { value: any; name: any }
    }) => {
        setFilterNIP({ val: event.target.value })
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

    interface SelectOptionAutoCom {
        readonly value: string
        readonly label: string
    }

    //START :: Wilayah
    const filterTugas = async (inputValue: string) => {
        const response = await axios.get(`${BIDANG_WILAYAH_URL}/filter/${inputValue}`)
        const json = await response.data.data
        return json.map((i: any) => ({ label: i.nama, value: i.id }))
    }
    const loadOptionsTugas = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
        setTimeout(async () => {
            callback(await filterTugas(inputValue))
        }, 1000)
    }
    const handleInputTugas = async (newValue: any) => {
        setDataTugas((prevstate: any) => ({ ...prevstate, ...newValue }))
        // // filterKec(newValue)
        // // loadOptionsKec
        // await loadOptionsKec2(newValue)
    }
    //END :: Wilayah

    //START :: KECAMATAN
    const filterKec = async (inputValue: string) => {
        const response = await axios.get(`${PELAKSANA_URL}/filter?nama=${inputValue}`)
        console.log(response.data.data)
        const json = await response.data.data
        return json.map((i: any) => ({ label: i.nama, value: i.id }))
    }
    const loadOptionsKec = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
        setTimeout(async () => {
            callback(await filterKec(inputValue))
        }, 1000)
    }
    const handleInputKec = (newValue: any) => {
        setDataKec((prevstate: any) => ({ ...prevstate, ...newValue }))
    }
    //end kecamtan
    //END :: KECAMATAN

    // GET Wilayah
    // const [inputValWilayah, setFilterWilayah] = useState({ label: '', val: '' })
    // const filterWilayah = async (page: any) => {
    //     const response = await axios.get(`${KEPEGAWAIAN_URL}/pegawai-pensiun?limit=${perPage}&offset=${page}${qParamFind.strparam}&status=${valStatPegawai.val ? valStatPegawai.val : "PNS"}`);
    //     const json = await response.data.data
    //     return json.map((i: any) => ({ label: i.kepegawaian_tempat_tugas, value: i.id }))
    // }
    // const loadOptionsWilayah = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
    //     setTimeout(async () => {
    //         callback(await filterWilayah(inputValue))
    //     }, 1000)
    // }
    // const handleChangeInputWilayah = (newValue: any) => {
    //     setFilterWilayah((prevstate: any) => ({ ...prevstate, ...newValue }))
    // }
    // END :: GET Wilayah

    // GET Kecamatan
    // const [inputValKecamatan, setFilterKecamatan] = useState({ label: '', value: '' })
    // const filterKecamatan = async (page: any) => {
    //     const response = await axios.get(`${KEPEGAWAIAN_URL}/pegawai-pensiun?limit=${perPage}&offset=${page}${qParamFind.strparam}&status=${valStatPegawai.val ? valStatPegawai.val : "PNS"}`);
    //     const json = await response.data.data
    //     return json.map((i: any) => ({ label: i.kepegawaian_subbag_seksi_kecamatan, value: i.id }))
    // }
    // const loadOptionsKecamatan = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
    //     setTimeout(async () => {
    //         callback(await filterKecamatan(inputValue))
    //     }, 1000)
    // }
    // const handleChangeInputKecamatan = (newValue: any) => {
    //     setFilterKecamatan((prevstate: any) => ({ ...prevstate, ...newValue }))
    // }
    // END :: GET Kecamatan

    // GET Kelurahan
    const [inputValKelurahan, setFilterKelurahan] = useState({ label: '', value: '' })
    const filterKelurahan = async (page: any) => {
        const response = await axios.get(`${KELURAHAN_URL}/find`);
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

    const handleFilter = async () => {
        let uriParam = ''
        if (valStatPegawai.val !== '') {
            uriParam += `&status_pegawai=${valStatPegawai.val}`
        }
        if (valFilterNama.val !== '') {
            uriParam += `&nama=${valFilterNama.val}`
        }
        if (valFilterNRK.val !== '') {
            uriParam += `&nrk_nptt_pjlp=${valFilterNRK.val}`
        }
        if (valFilterNIP.val !== '') {
            uriParam += `&nip=${valFilterNIP.val}`
        }
        if (valFilterWilayah.val !== '') {
            uriParam += `&tempat_tugas=${valFilterWilayah.val}`
        }
        if (valFilterKecamatan.val !== '') {
            uriParam += `&seksi_kecamatan=${valFilterKecamatan.val}`
        }
        if (inputValKelurahan.value !== '') {
            uriParam += `&kepegawaian_subbag_seksi_kelurahan=${inputValKelurahan.value}`
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
        setFilterNIP({ val: '' })
        setFilterWilayah({ val: '' })
        setFilterKecamatan({ val: '' })
        setFilterKelurahan({ label: '', value: '' })
        setFilterTahunPensiun({ val: '' })
        setUriFind((prevState) => ({ ...prevState, strparam: '' }))
    }
    const handleUnduh = async () => {
        setbtnLoadingUnduh(true)
        await axios({
            url: `${KEPEGAWAIAN_URL}/Pensiun-unduh?${qParamFind.strparam}`,
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
                {/* FILTER */}
                <div className='card-header border-1 pt-6'>
                    <div className='col-xl-12 mb-xl-12 mt-6'>
                        <div className='accordion accordion-icon-toggle' id='kt_accordion_2'>
                            <div className='mb-5'>
                                <div
                                    className='accordion-header py-3 d-flex'
                                    data-bs-toggle='collapse'
                                    data-bs-target='#kt_accordion_2_item_1'
                                >
                                    <span className='accordion-icon'>
                                        <span className='svg-icon svg-icon-4'>
                                            <svg
                                                width='24'
                                                height='24'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <rect
                                                    opacity='0.5'
                                                    x='18'
                                                    y='13'
                                                    width='13'
                                                    height='2'
                                                    rx='1'
                                                    transform='rotate(-180 18 13)'
                                                    fill='currentColor'
                                                />
                                                <path
                                                    d='M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z'
                                                    fill='currentColor'
                                                />
                                            </svg>
                                        </span>
                                    </span>
                                    <h3 className='fs-4 fw-semibold mb-0 ms-4'>Pilihan Filter</h3>
                                </div>
                                <div id="kt_accordion_2_item_1" className="fs-6 collapse show ps-10"
                                    data-bs-parent="#kt_accordion_2">
                                    {/* begin::Body */}
                                    <div id='kt_advanced_search_form'>
                                        <div className='row g-8 mt-2 me-5'>
                                            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                                                <div className='form-group'>
                                                    <label htmlFor='' className='mb-3'>
                                                        Tempat Tugas
                                                    </label>
                                                    {/* <input
                                                        type='text'
                                                        className='form-control form-control-solid '
                                                        name='wilayah/bidang'
                                                        value={valFilterWilayah.val}
                                                        onChange={handleChangeInputWilayah}
                                                        placeholder='Masukkan Wilayah/Bidang'
                                                    /> */}
                                                    <AsyncSelect
                                                        value={inputValTugas.value ? inputValTugas : { value: '', label: 'Pilih' }}
                                                        loadOptions={loadOptionsTugas}
                                                        defaultOptions
                                                        onChange={handleInputTugas}
                                                        styles={
                                                            calculatedMode === 'dark'
                                                                ? reactSelectDarkThem
                                                                : reactSelectLightThem
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                                                <label htmlFor='' className='mb-3'>
                                                    Kecamatan/Seksi
                                                </label>
                                                {/* <input
                                                    type='text'
                                                    className='form-control form-control-solid '
                                                    name='kecamatan/seksi'
                                                    value={valFilterKecamatan.val}
                                                    onChange={handleChangeInputKecamatan}
                                                    placeholder='Masukkan Kecamatan/Seksi'
                                                /> */}
                                                <AsyncSelect
                                                    value={inputValKec.value ? inputValKec : { value: '', label: 'Pilih' }}
                                                    loadOptions={loadOptionsKec}
                                                    // defaultOptions
                                                    onChange={handleInputKec}
                                                    styles={
                                                        calculatedMode === 'dark'
                                                            ? reactSelectDarkThem
                                                            : reactSelectLightThem
                                                    }
                                                />
                                            </div>
                                            <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12' id='fil_nrk'>
                                                <label htmlFor='' className='mb-3'>
                                                    Tahun Pensiun
                                                </label>
                                                <input
                                                    type='number'
                                                    className='form-control form-control-solid '
                                                    name='tahun_pensiun'
                                                    value={valFilterTahunPensiun.val}
                                                    onChange={handleChangeInputTahunPensiun}
                                                    placeholder='Masukkan Tahun Pensiun'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row g-8 mt-2 me-5'>
                                        <div className='d-flex justify-content-start col-md-6 col-lg-6 col-sm-6'>
                                            <Link to='#' onClick={handleFilter}>
                                                <button className='btn btn-light-primary me-2'>
                                                    <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-2' />
                                                    Cari
                                                </button>
                                            </Link>
                                            <Link to='#' onClick={handleFilterReset}>
                                                <button className='btn btn-light-primary'>
                                                    <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
                                                    Reset
                                                </button>
                                            </Link>
                                        </div>
                                        <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-6'>
                                            {/* begin::Filter Button */}
                                            <button
                                                type='button'
                                                className='btn btn-light-primary'
                                                data-kt-menu-trigger='click'
                                                data-kt-menu-placement='bottom-end'
                                                onClick={handleUnduh}
                                            >
                                                {btnLoadingUnduh ? (
                                                    <>
                                                        <span className='spinner-border spinner-border-md align-middle me-3'></span>{' '}
                                                        Memproses Unduh...
                                                    </>
                                                ) : (
                                                    <>
                                                        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                                                        Unduh
                                                    </>
                                                )}
                                            </button>
                                            {/* end::Filter Button */}
                                            {/* begin::SubMenu */}
                                            <div className='menu menu-sub menu-sub-dropdown w-100px w-md-150px' data-kt-menu='true'>
                                                {/* begin::Header */}
                                                <div className='px-7 py-5'>
                                                    <div className='fs-5 text-dark fw-bolder'>Pilihan Unduh</div>
                                                </div>
                                                {/* end::Header */}

                                                {/* begin::Separator */}
                                                <div className='separator border-gray-200'></div>
                                                {/* end::Separator */}

                                                {/* begin::Content */}
                                                <div className='px-7 py-5' data-kt-user-table-filter='form'>
                                                    <button
                                                        onClick={handleUnduh}
                                                        className='btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success w-100'
                                                    >
                                                        Excel
                                                    </button>
                                                </div>
                                                {/* end::Content */}
                                            </div>
                                            {/* end::SubMenu */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className='col-xl-12 mb-xl-12 mt-6'>
                    <div className='card card-flush h-xl-100'>
                        <div
                            className='card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px'
                            style={{
                                backgroundImage: 'url(' + toAbsoluteUrl('/media/svg/shapes/top-blue.jpg') + ')',
                            }}
                            data-theme='light'
                        >
                            <div className='card-body py-8 mt-4 fw-bold text-white'>
                                <div className='row'>
                                    <div className='col fs-4 mb-2 fw-bold text-center'>
                                        DAFTAR NAMA PEGAWAI YANG MEMASUKI MASA PENSIUN
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col fs-4 mb-2 fw-bold text-center'>
                                        PADA SATUAN POLISI PAMONG PRAJA DKI JAKARTA
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='card-body mt-n20'>
                            <div className='mt-n20 position-relatve'>
                                <div className='card border card-flush h-xl-100'>
                                    <div className='table-responsive mt-5 ms-5 me-5 w'>
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
                                            theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
