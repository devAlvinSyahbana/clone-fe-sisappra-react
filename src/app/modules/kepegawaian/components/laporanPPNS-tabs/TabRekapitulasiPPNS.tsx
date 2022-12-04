import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { LaporanPPNSHeader } from './LaporanPPNSHeader'
import Dropdown from 'react-bootstrap/Dropdown'
import { JumlahPPNS, JumlahUnitSKPD } from '../LaporanRekapPegawaiInterface'
import DataTable, { createTheme } from 'react-data-table-component'
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
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian/`

export function TabRekapitulasiPPNS() {
    const navigate = useNavigate()
    const { mode } = useThemeMode()
    const calculatedMode = mode === 'system' ? systemMode : mode

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [jumlah_unit_skpd, setJUnitSKPD] = useState<JumlahUnitSKPD>()
    const [jumlah_PPNS, setJumlahPPNS] = useState<JumlahPPNS>()

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

    useEffect(() => {
        const fetchData = async () => {
            const jumlah_PPNS = await axios.get(`${KEPEGAWAIAN_URL}PPNS-rekapitulasi-jumlah`)

            setJumlahPPNS(jumlah_PPNS.data.data)
        }
        fetchData()
        fetchDT(1)
    }, [])

    async function fetchDT(datarekap: any) {
        setLoading(true)
        const jumlah_unit_skpd = await axios.get(`${KEPEGAWAIAN_URL}PPNS-rekapitulasi`)
        setData(jumlah_unit_skpd.data.data)
        setLoading(false)
    }


    var num = 1;

    const columns = [
        {
            name: 'No',
            width: "8%",
            wrap: true,
            cell: (row: number) => {
                return (
                    <div className='mb-2 mt-2'>
                        {num !== 20 ? (num++) : ('')}
                    </div>
                )
            },
        },
        {
            name: 'Unit SKPD',
            cell: (row: any) => {
                return (
                    <Fragment>
                        <div className='mb-2 mt-2'>
                            {row.skpd !== 'Jumlah Keseluruhan' ? (row.skpd) : (
                                <div className='h4'>Jumlah Keseluruhan</div>
                            )}
                        </div>
                    </Fragment>
                )
            },
            width: "82%",
            wrap: true,
        },
        {
            name: 'Jumlah',
            cell: (row: any) => {
                return (
                    <Fragment>
                        <div className='mb-2 mt-2'>
                            {row.skpd === 'Jumlah Keseluruhan' ? (<div className='h4'>{row.jumlah}</div>) : (
                                row.jumlah
                            )}
                        </div>
                    </Fragment>
                )
            },
            wrap: true,
            width: "10%",
        },
    ]

    return (
        <>
            {/* Header */}
            <LaporanPPNSHeader />
            {/* Second Card */}
            <div className='card'>
                <div className='card-body'>
                    <div className='row mb-5'>
                        <div className='col-12'>
                            <h1 className='text-dark fw-bold fs-3 text-center'>
                                LAPORAN REKAPITULASI DATA PPNS
                            </h1>
                            <h1 className='text-dark fw-bold fs-3 text-center'>
                                PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA
                            </h1>
                        </div>
                        <div className='col-12'>
                            <div className='d-flex justify-content-end'>
                                <Dropdown>
                                    <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                                        Unduh
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href='#'>Docx</Dropdown.Item>
                                        <Dropdown.Item
                                            href='#'
                                            onClick={() =>
                                                navigate(
                                                    `/kepegawaian/PenyidikPegawaiNegeriSipil/TabRekapitulasiPPNS/UnduhLaporanRekapitulasiPPNSPdf`
                                                )
                                            }
                                        >
                                            PDF
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>

                    <div className='col-xl-12 mb-xl-12'>
                        <div className='card card-flush h-xl-100'>
                            <div
                                className='card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px'
                                style={{
                                    backgroundImage: 'url(' + toAbsoluteUrl('/media/svg/shapes/top-blue.jpg') + ')',
                                }}
                                data-theme='light'
                            >
                                <h3 className='card-title align-items-start flex-column text-white pt-10'>
                                    <span className='fw-bold fs-1 mb-3'>
                                        Rincian Penyidik Pegawai Negeri Sipil (PPNS)
                                    </span>
                                </h3>
                            </div>
                            <div className='card-body mt-n20'>
                                <div className='mt-n20 position-relative'>
                                    <div className='card border card-flush h-xl-100'>
                                        <div className='card-body pt-2'>
                                            <DataTable
                                                columns={columns}
                                                data={data}
                                                progressPending={loading}
                                                progressComponent={<LoadingAnimation />}
                                                highlightOnHover
                                                theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-xl-12 mb-xl-12'>
                        <div className='card card-flush h-xl-100'>
                            <div
                                className='card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px'
                                style={{
                                    backgroundImage: 'url(' + toAbsoluteUrl('/media/svg/shapes/top-blue.jpg') + ')',
                                }}
                                data-theme='light'
                            >
                                <h3 className='card-title align-items-start flex-column text-white pt-10'>
                                    <span className='fw-bold fs-1 mb-3'>
                                        Jumlah Penyidik Pegawai Negeri Sipil (PPNS)
                                    </span>
                                    <div className='fs-4 text-white'>
                                        <span className='opacity-75'>Total : </span>
                                        <span className='position-relative d-inline-block'>
                                            <div className='opacity-75-hover fw-bold fs-1 d-block mb-1'>
                                                {jumlah_PPNS?.jumlah_ppns !== 0 ? jumlah_PPNS?.jumlah_ppns : '-'} Orang
                                            </div>
                                        </span>
                                    </div>
                                </h3>
                            </div>
                            <div className='card-body mt-n20'>
                                <div className='mt-n20 position-relative'>
                                    <div className='row g-3 g-lg-6'>
                                        <div className='col-6 d-flex flex-wrap'>
                                            <div className='bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 w-100'>
                                                <div className='m-0'>
                                                    <span className='text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1'>
                                                        {jumlah_PPNS?.satpol_pp !== 0 ? jumlah_PPNS?.satpol_pp : '-'} Orang
                                                    </span>
                                                    <span className='text-gray-500 fw-semibold fs-6'>
                                                        SATPOL PP PROVINSI DKI JAKARTA
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-6 d-flex flex-wrap'>
                                            <div className='bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 w-100'>
                                                <div className='m-0'>
                                                    <span className='text-gray-700 fw-bolder d-block fs-2x lh-1 ls-n1 mb-1'>
                                                        {jumlah_PPNS?.skpd_lain !== 0 ? jumlah_PPNS?.skpd_lain : '-'} Orang
                                                    </span>
                                                    <span className='text-gray-500 fw-semibold fs-6'>
                                                        SKPD LAIN
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end::Body */}
        </>
    )
}