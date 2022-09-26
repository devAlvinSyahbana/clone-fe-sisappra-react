import axios from "axios";
import { useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { JumlahSatpolDiklat, JumlahSeluruhSatpol } from "../LaporanRekapPegawaiInterface";

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function UnduhLaporanRekapitulasiPegawai() {
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
                  LAPORAN REKAPITULASI DATA PEGAWAI
                </h1>
                <h1 className="text-dark fw-bold fs-3 text-center">
                  SATUAN POLISI PAMONG PRAJA …...............................................
                </h1>
              </div>
            </div>
            <div className="row mb-5 mt-5">
              <label className="col-lg-8 col-sm-8 col-md-8 fw-bold">I. Jumlah Pegawai Satuan Polisi Pamong Praja</label>
              <label className="col-lg-2 col-sm-2 col-md-2 text-end">
                :
              </label>
              <div className="col-lg-2 col-sm-2 col-md-2 d-flex justify-content-end">
                <span className="fs-6 fw-normal">{jpegawaisatpol?.jmlh_seluruh_ppns_satpolpp ? jpegawaisatpol?.jmlh_seluruh_ppns_satpolpp : '- '} Orang</span>
              </div>
            </div>
            <div className="row mb-5 mt-5">
              <label className="col-lg-8 ms-10 fw-bold">Status :</label>
            </div>
            <div className="row mb-5 mt-5">
              <label className="col-lg-7 offset-md-1 fw-bold">-Pegawai Negeri Sipil (PNS)</label>
              <label className="col-lg-2 text-end">
                :
              </label>
              <div className="col-lg-2 d-flex justify-content-end">
                <span className="fs-6 fw-normal">{jpegawaisatpol?.jmlh_seluruh_pns ? jpegawaisatpol?.jmlh_seluruh_pns : '-'} Orang</span>
              </div>
            </div>
            <div className="row mb-5 mt-5">
              <label className="col-lg-7 offset-md-1 fw-bold">-Calon Pegawai Negeri Sipil (CPNS)</label>
              <label className="col-lg-2 text-end">
                :
              </label>
              <div className="col-lg-2 d-flex justify-content-end">
                <span className="fs-6 fw-normal">{jpegawaisatpol?.jmlh_seluruh_cpns ? jpegawaisatpol?.jmlh_seluruh_cpns : '-'} Orang</span>
              </div>
            </div>
            <div className="row mb-5 mt-5">
              <label className="col-lg-7 offset-md-1 fw-bold">-Non Pegawai Negeri Sipil</label>
              <label className="col-lg-2 text-end">
                :
              </label>
              <div className="col-lg-2 d-flex justify-content-end">
                <span className="fs-6 fw-normal">{jpegawaisatpol?.jmlh_seluruh_non_pns ? jpegawaisatpol?.jmlh_seluruh_non_pns : '-'} Orang</span>
              </div>
            </div>
            <div className="row mb-5 mt-5">
              <label className="col-lg-6 offset-md-2 fw-bold">-Anggota PolPP Non PNS (PTT)</label>
              <label className="col-lg-2 text-end">
                :
              </label>
              <div className="col-lg-2 d-flex justify-content-end">
                <span className="fs-6 fw-normal">{jpegawaisatpol?.jmlh_seluruh_non_pns_ptt ? jpegawaisatpol?.jmlh_seluruh_non_pns_ptt : '-'} Orang</span>
              </div>
            </div>
            <div className="row mb-5 mt-5">
              <label className="col-lg-6 offset-md-2 fw-bold">-Anggota PolPP Non PNS (PLJP)</label>
              <label className="col-lg-2 text-end">
                :
              </label>
              <div className="col-lg-2 d-flex justify-content-end">
                <span className="fs-6 fw-normal">{jpegawaisatpol?.jmlh_seluruh_non_pns_pjlp ? jpegawaisatpol?.jmlh_seluruh_non_pns_pjlp : '-'} Orang</span>
              </div>
            </div>

            <div className="row mb-5 mt-5">
              <label className="col-lg-7 offset-md-1 fw-bold">-PPNS Satuan Polisi Pamong Praja</label>
              <label className="col-lg-2 text-end">
                :
              </label>
              <div className="col-lg-2 d-flex justify-content-end">
                <span className="fs-6 fw-normal">{jpegawaisatpol?.jmlh_seluruh_ppns_satpolpp ? jpegawaisatpol?.jmlh_seluruh_ppns_satpolpp : '-'} Orang</span>
              </div>
            </div>
            <div className="row mb-5 mt-5">
              <label className="col-lg-7 offset-md-1 fw-bold">-PPNS Unit Kerja Lainnya</label>
              <label className="col-lg-2 text-end">
                :
              </label>
              <div className="col-lg-2 d-flex justify-content-end">
                <span className="fs-6 fw-normal">{jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain ? jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain : '-'} Orang</span>
              </div>
            </div>

            <div className="row mb-5 mt-5">
              <label className="col-lg-8 fw-bold">II. Rincian Pegawai Satuan Polisi Pamong Praja</label>
            </div>
            <div className="row mb-5 mt-5">
              <label className="col-lg-8 ms-3 fw-bold">a) Tingkat Pendidikan</label>
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
            <div className="row mb-5 mt-5">
              <label className="col-lg-8 ms-3 fw-bold">b) Kepangkatan/Golongan</label>
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
                    <td className="text-left">I</td>
                    <td>40 Orang</td>
                  </tr>
                  <tr>
                    <td className="text-center">2</td>
                    <td className="text-left">II</td>
                    <td>2323 Orang</td>
                  </tr>
                  <tr>
                    <td className="text-center">3</td>
                    <td className="text-left">III</td>
                    <td>626 Orang</td>
                  </tr>
                  <tr>
                    <td className="text-center">4</td>
                    <td className="text-left">IV</td>
                    <td>33 Orang</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>JUMLAH KESELURUHAN</td>
                    <td>3022 Orang</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row mb-5 mt-5">
              <label className="col-lg-8 ms-3 fw-bold">c) Jenis Kediklatan</label>
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
                    <td className="text-left">DIKLAT STRUKTURAL</td>
                    <td> {jsatpoldik?.diklat_pol_pp_strutural ? jsatpoldik?.diklat_pol_pp_strutural : ' - '} Orang</td>
                  </tr>
                  <tr>
                    <td className="text-center">2</td>
                    <td className="text-left">DIKLAT FUNGSIONAL POL PP</td>
                    <td> {jsatpoldik?.diklat_fungsional_pol_pp ? jsatpoldik?.diklat_fungsional_pol_pp : ' - '} Orang</td>
                  </tr>
                  <tr>
                    <td className="text-center">3</td>
                    <td className="text-left">DIKLAT PPNS</td>
                    <td> {jsatpoldik?.diklat_pol_pp_ppns ? jsatpoldik?.diklat_pol_pp_ppns : ' - '} Orang</td>
                  </tr>
                  <tr>
                    <td className="text-center">4</td>
                    <td className="text-left">DIKLAT TEKNIS</td>
                    <td>0 Orang</td>
                  </tr>
                  <tr>
                    <td className="text-center">5</td>
                    <td className="text-left">DIKLAT DASAR POL PP</td>
                    <td> {jsatpoldik?.diklat_pol_pp_dasar ? jsatpoldik?.diklat_pol_pp_dasar : ' - '} Orang</td>
                  </tr>
                  <tr>
                    <td className="text-center">6</td>
                    <td className="text-left">DIKLAT LAINNYA</td>
                    <td>218 Orang</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>JUMLAH KESELURUHAN</td>
                    <td>3477 Orang</td>
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