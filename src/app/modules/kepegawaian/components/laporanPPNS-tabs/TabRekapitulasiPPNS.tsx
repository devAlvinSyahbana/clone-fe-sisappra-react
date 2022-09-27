import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { LaporanPPNSHeader } from './LaporanPPNSHeader'
import Dropdown from 'react-bootstrap/Dropdown'
import { JumlahSeluruhSatpol, JumlahSatpolDiklat } from '../LaporanRekapPegawaiInterface'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function TabRekapitulasiPPNS() {
    const navigate = useNavigate()

    const [jpegawaisatpol, setJpegawaisatpol] = useState<JumlahSeluruhSatpol>()
    const [jsatpoldik, setJsatpoldik] = useState<JumlahSatpolDiklat>()

    useEffect(() => {
        const fetchData = async () => {
            const jsatpol = await axios.get(`${KEPEGAWAIAN_URL}/jumlah-pegawai-polpp`)
            const jsatpoldik = await axios.get(`${KEPEGAWAIAN_URL}/jumlah-pegawai-polpp-by-diklat`)

            setJpegawaisatpol(jsatpol.data.data)
            setJsatpoldik(jsatpoldik.data.data)
        }
        fetchData()
    }, [])

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
                                    <Dropdown.Toggle variant='success' id='dropdown-basic'>
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
                                    backgroundImage: 'url(' + toAbsoluteUrl('/media/svg/shapes/top-green.png') + ')',
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
                                            <table
                                                className='table align-middle table-row-dashed fs-6 gy-3'
                                                id='kt_table_widget_4_table'
                                            >
                                                <thead>
                                                    <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                                                        <th className='min-w-25px text-center'>No</th>
                                                        <th className='min-w-150px text-center'>Unit SKPD</th>
                                                        <th className='min-w-25px text-end'>Jumlah</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='fw-bold text-gray-600'>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                1
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Satpol PP Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                243 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                2
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Perindustrian dan Energi Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                5 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                3
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Inspektorat Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                2 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                4
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Kehutanan Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                15 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                5
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Pendidikan Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                3 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                6
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Badan Pajak dan Restribusi Daerah Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                11 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                7
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Koperasi Usaha Kecil dan Menengah serta Perdagangan Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                39 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                8
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Sosial Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                5 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                9
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Sumber Daya Air Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                1 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                10
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Badan Kesatuan Bangsa dan Politik Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                2 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                11
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Cipta Karya, Tata Ruang dan Pertanahan Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                10 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                12
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Ketahanan Pangan, Kelautan dan Pertanian Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                14 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                13
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Lingkungan Hidup Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                17 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                14
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Perhubungan Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                54 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                15
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Kependudukan dan Catatan Sipil Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                29 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                16
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Pariwisata Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                9 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                17
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Penanggulangan Kebakaran dan Penyelamatan Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                62 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                18
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Kesehatan Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                8 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>
                                                            <a
                                                                href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                                                                className='text-gray-800 text-hover-primary'
                                                            >
                                                                19
                                                            </a>
                                                        </td>
                                                        <td className='text-center'>Dinas Tenaga Kerja dan Transmigrasi Provinsi DKI Jakarta</td>
                                                        <td className='text-end'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                15 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center table-primary' colSpan={2}>
                                                            Jumlah Keseluruhan
                                                        </td>
                                                        <td className='text-end table-success'>
                                                            <a href='#' className='text-gray-600 text-hover-primary'>
                                                                544 Orang
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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
                                    backgroundImage: 'url(' + toAbsoluteUrl('/media/svg/shapes/top-green.png') + ')',
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
                                                {jpegawaisatpol?.jmlh_seluruh_ppns_satpolpp
                                                    ? jpegawaisatpol?.jmlh_seluruh_ppns_satpolpp
                                                    : '-'}{' '}
                                                Orang
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
                                                        {jpegawaisatpol?.jmlh_seluruh_pns
                                                            ? jpegawaisatpol?.jmlh_seluruh_pns
                                                            : '- '}
                                                        Orang
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
                                                        {jpegawaisatpol?.jmlh_seluruh_cpns
                                                            ? jpegawaisatpol?.jmlh_seluruh_cpns
                                                            : '- '}
                                                        Orang
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
function setData(data: any) {
    throw new Error('Function not implemented.')
}
