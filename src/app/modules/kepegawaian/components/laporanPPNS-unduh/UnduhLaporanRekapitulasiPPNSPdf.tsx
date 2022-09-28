import axios from "axios";
import { useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { JumlahSatpolDiklat, JumlahSeluruhSatpol } from "../LaporanRekapPegawaiInterface";

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function UnduhLaporanRekapitulasiPPNSPdf() {
    let componentRef: any;

    const [jpegawaisatpol, setJpegawaisatpol] = useState<JumlahSeluruhSatpol>()
    const [jsatpoldik, setJsatpoldik] = useState<JumlahSatpolDiklat>()

    useEffect(() => {
        const fetchData = async () => {
            const jsatpol = await axios.get(`${KEPEGAWAIAN_URL}/jumlah-pegawai-polpp`)
            const jsatpoldik = await axios.get(`${KEPEGAWAIAN_URL}/jumlah-pegawai-polpp-by-diklat`)


            setJpegawaisatpol(jsatpol.data.data)
            setJsatpoldik(jsatpoldik.data.data)
            console.log(jsatpol)
        }
        fetchData()
    }, [])

    return (
        <div className='row g-5 g-xxl-8'>
            <div className="card">
                <div className="card-body">
                    <ReactToPrint
                        trigger={() => (
                            <a className="btn btn-success" href="#">
                                Unduh Pdf
                            </a>
                        )}
                        pageStyle="
            @page { 
              size: auto; 
              margin: 0mm; 
            } 
            @media 
            print { 
              .pagebreak {
                page-break-before: always;
              }
              body { 
                -webkit-print-color-adjust: exact; 
                padding: 40px !important; 
              } 
            }
            .kurang-kiri {
              margin-left: -100px;
            }
            .col-lg-4 {
              width: 40%;
            }
            .col-lg-8 {
              width: 80 %;
            }
            
            @media all {
              .pagebreak {
                display: none;
              }
            }
          "
                        content={() => componentRef}
                    />

                    <div ref={(el) => (componentRef = el)}>
                        <div className="p-4"></div>
                        <div className="table-responsive">
                            <table className="table-bordered align-middle table-row-dashed fs-7 gy-5 w-100">
                                <thead>
                                    <tr className="text-start fw-bold fs-7 text-uppercase gs-0 bg-success">
                                        <th style={{ width: "10px" }} className="text-center">No</th>
                                        <th style={{ width: "200px" }} className="text-center">Unit SKPD</th>
                                        <th style={{ width: "75px" }} className="text-center">Jumlah</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-center'>

                                            1

                                        </td>
                                        <td className='text-center'>Satpol PP Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            243 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            2

                                        </td>
                                        <td className='text-center'>Dinas Perindustrian dan Energi Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            5 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            3

                                        </td>
                                        <td className='text-center'>Inspektorat Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            2 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            4

                                        </td>
                                        <td className='text-center'>Dinas Kehutanan Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            15 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            5

                                        </td>
                                        <td className='text-center'>Dinas Pendidikan Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            3 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            6

                                        </td>
                                        <td className='text-center'>Badan Pajak dan Restribusi Daerah Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            11 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            7

                                        </td>
                                        <td className='text-center'>Dinas Koperasi Usaha Kecil dan Menengah serta Perdagangan Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            39 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            8

                                        </td>
                                        <td className='text-center'>Dinas Sosial Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            5 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            9

                                        </td>
                                        <td className='text-center'>Dinas Sumber Daya Air Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            1 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            10

                                        </td>
                                        <td className='text-center'>Badan Kesatuan Bangsa dan Politik Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            2 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            11

                                        </td>
                                        <td className='text-center'>Dinas Cipta Karya, Tata Ruang dan Pertanahan Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            10 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            12

                                        </td>
                                        <td className='text-center'>Dinas Ketahanan Pangan, Kelautan dan Pertanian Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            14 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            13

                                        </td>
                                        <td className='text-center'>Dinas Lingkungan Hidup Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            17 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            14

                                        </td>
                                        <td className='text-center'>Dinas Perhubungan Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            54 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            15

                                        </td>
                                        <td className='text-center'>Dinas Kependudukan dan Catatan Sipil Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            29 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            16

                                        </td>
                                        <td className='text-center'>Dinas Pariwisata Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            9 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            17

                                        </td>
                                        <td className='text-center'>Dinas Penanggulangan Kebakaran dan Penyelamatan Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            62 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            18

                                        </td>
                                        <td className='text-center'>Dinas Kesehatan Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            8 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center'>

                                            19

                                        </td>
                                        <td className='text-center'>Dinas Tenaga Kerja dan Transmigrasi Provinsi DKI Jakarta</td>
                                        <td className='text-end'>

                                            15 Orang

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-center fw-bold table-primary' colSpan={2}>
                                            JUMLAH
                                        </td>
                                        <td className='text-end fw-bold table-success'>

                                            544 Orang

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row mt-5">
                            <label className="col-lg-7 offset-md-1 fw-bold">SATPOL PP PROVINSI DKI JAKARTA</label>
                            <label className="col-lg-2 text-end">
                            </label>
                            <div className="col-lg-2 d-flex justify-content-end">
                                <span className="fs-6 fw-normal">{jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain ? jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain : '-'} Orang</span>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-lg-7 offset-md-1 fw-bold">SKPD LAIN</label>
                            <label className="col-lg-2 text-end">
                            </label>
                            <div className="col-lg-2 d-flex justify-content-end">
                                <span className="fs-6 fw-normal">{jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain ? jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain : '-'} Orang</span>
                            </div>
                        </div>
                        <div className="row mb-10">
                            <label className="col-lg-7 offset-md-1 fw-bold">JUMLAH</label>
                            <label className="col-lg-2 text-end">
                            </label>
                            <div className="col-lg-2 d-flex justify-content-end">
                                <span className="fs-6 fw-normal">{jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain ? jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain : '-'} Orang</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8"></div>
                            <div className="col-4 fs-6 mb-2 mt-20 fw-semibold text-center">
                                <div className="col fs-6 mb-2 fw-semibold text-center">
                                    ..........................................
                                </div>
                                <div className="col fs-6 fw-semibold text-center">
                                    Kepala Satpol PP................................
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}