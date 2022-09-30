import axios from "axios";
import { useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { JumlahSatpolDiklat, JumlahSeluruhSatpol } from "../LaporanRekapPegawaiInterface";

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function UnduhLaporanPegawaiPensiunPdf() {
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
                        <div className="row mb-5">
                            <div className="col-12 mb-5">
                                <h1 className="text-dark fw-bold fs-3 text-center">
                                    DAFTAR NAMA PEGAWAI YANG MEMASUKI MASA PENSIUN
                                </h1>
                                <h1 className="text-dark fw-bold fs-3 text-center">
                                    PADA SATUAN POLISI PAMONG PRAJA PROVINSI DKI JAKARTA
                                </h1>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table-bordered align-middle table-row-dashed fs-7 gy-5 w-100">
                                <thead>
                                    <tr className="text-start fw-bold fs-7 text-uppercase gs-0">
                                        <th style={{ width: "10px" }} className="text-center">No</th>
                                        <th style={{ width: "200px" }} className="text-center">Pendidikan</th>
                                        <th style={{ width: "75px" }} className="text-center">Jumlah</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">1</td>
                                        <td className="text-left">DOKTOR (S3)</td>
                                        <td>1 Orang</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">2</td>
                                        <td className="text-left">PASCA SARJANA (S2)</td>
                                        <td>20 Orang</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">3</td>
                                        <td className="text-left">SARJANA (S1)</td>
                                        <td>113 Orang</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">4</td>
                                        <td className="text-left">DIPLOMA IV</td>
                                        <td>0 Orang</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">5</td>
                                        <td className="text-left">DIPLOMA III</td>
                                        <td>12 Orang</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">6</td>
                                        <td className="text-left">DIPLOMA II</td>
                                        <td>1 Orang</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">7</td>
                                        <td className="text-left">DIPLOMA I</td>
                                        <td>0 Orang</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">8</td>
                                        <td className="text-left">SMA / Sederajat</td>
                                        <td>269 Orang</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">9</td>
                                        <td className="text-left">SMP / Sederajat</td>
                                        <td>1 Orang</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">10</td>
                                        <td className="text-left">SD / Sederajat</td>
                                        <td>0 Orang</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>JUMLAH KESELURUHAN</td>
                                        <td>396 Orang</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-8"></div>
                            <div className="col-4 fs-6 mb-2 fw-semibold text-center">
                                ..........................................
                                <div className="col fs-6 mb-15 fw-semibold text-center">
                                    Kepala Satpol PP................................
                                </div>


                                <div className="col fs-6 mb-2 fw-semibold text-center">
                                    ..........................................
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}