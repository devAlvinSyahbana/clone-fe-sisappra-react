import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import {
  JumlahSatpolDiklat,
  JumlahSatpolGolongan,
  JumlahSatpolPendidikan,
  JumlahSeluruhSatpol,
} from '../LaporanRekapPegawaiInterface'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function UnduhLaporanRekapitulasiPegawai() {
  let componentRef: any

  const [jpegawaisatpol, setJpegawaisatpol] = useState<JumlahSeluruhSatpol>()
  const [jsatpoldik, setJsatpoldik] = useState<JumlahSatpolDiklat>()
  const [jsatpolpen, setJsatpolpen] = useState<JumlahSatpolPendidikan>()
  const [jsatpolgol, setJsatpolgol] = useState<JumlahSatpolGolongan>()

  useEffect(() => {
    const fetchData = async () => {
      const jsatpol = await axios.get(`${KEPEGAWAIAN_URL}/rekapitulasi-jumlah-pegawai-polpp`)
      const jsatpoldik = await axios.get(
        `${KEPEGAWAIAN_URL}/rekapitulasi-jumlah-pegawai-polpp-by-diklat`
      )
      const jsatpolpen = await axios.get(
        `${KEPEGAWAIAN_URL}/rekapitulasi-jumlah-pegawai-polpp-by-pendidikan`
      )
      const jsatpolgol = await axios.get(
        `${KEPEGAWAIAN_URL}/rekapitulasi-jumlah-pegawai-polpp-by-golongan`
      )

      setJsatpolgol(jsatpolgol.data.data)
      setJsatpolpen(jsatpolpen.data.data)
      setJpegawaisatpol(jsatpol.data.data)
      setJsatpoldik(jsatpoldik.data.data)
    }
    fetchData()
  }, [])

  return (
    <div className='row g-5 g-xxl-8'>
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-6'>
              <Link
                className='text-reset text-decoration-none'
                to={`/kepegawaian/laporan-rekapitulasi-pegawai`}
              >
                <button className='float-none btn btn-light align-self-center m-1'>
                  <i className='fa-solid fa-arrow-left'></i>
                  Kembali
                </button>
              </Link>
            </div>
            <div className='col-6 d-flex justify-content-end'>
              <ReactToPrint
                trigger={() => (
                  <button
                    type='button'
                    className='float-none btn btn-primary align-self-center m-1'
                  >
                    <i className='fa-solid fa-print'></i>
                    Cetak
                  </button>
                )}
                pageStyle='
                  .page-header-space {
                    height: 80px;
                  }
                  
                  .page-footer-space {
                    height: 50px;
                  }
                  
                  .page {
                    page-break-after: always;
                  }
                  
                  @page {
                    margin: 20mm
                  }
                  
                  @media print {
                    thead {display: table-header-group;} 
                    tfoot {display: table-footer-group;}
                    
                    button {display: none;}
                    
                    body {margin: 0;}
                  }

                  .end{
                    display: inline-block;
                    vertical-align: right;
                  }

                  .mr-print {
                    margin-right: 100px;
                  }

                  .ml-print {
                    margin-left: 100px;
                  }

                  .ml-10 {
                    margin-left: 10%;
                  }

                  .ml-20 {
                    margin-left: 15%;
                  }

                  .ml-40 {
                    margin-left: 30%;
                  }

                  .grid-im {
                    width: 100%;
                    display: grid;
                    grid-template-columns: 4fr 1fr 2fr;
                    align-items: center;
                  }

                  .grid-im2{
                    width: 100%;
                    display: grid;
                    grid-template-columns: 6fr 1fr 2fr;
                    align-items: center;
                  }

                  .left-div {
                    text-align: left;
                  }

                  .center-div {
                    text-align: center;
                  }

                  .right-div {
                    text-align: right;
                  }
                '
                content={() => componentRef}
              />
            </div>
          </div>

          <table style={{width: '100%'}} ref={(el) => (componentRef = el)}>
            <thead>
              <tr>
                <td>
                  {/* <!--place holder for the fixed-position header--> */}
                  <div className='page-header-space'>
                    <div className='row mb-5'>
                      <div className='col-12 mb-5'>
                        <h1 className='text-dark fw-bold fs-5 text-center'>
                          LAPORAN REKAPITULASI DATA PEGAWAI
                        </h1>
                        <h1 className='text-dark fw-bold fs-5 text-center'>
                          SATUAN POLISI PAMONG PRAJA
                        </h1>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <div className='page'>
                    <div className='mx-auto'>
                      <div className='grid-im2 mb-5 mt-5'>
                        <label className='left-div col-lg-8 col-sm-8 col-md-8 fw-bold fs-6'>
                          I. Jumlah Pegawai Satuan Polisi Pamong Praja
                        </label>
                        <label className='col-2 center-div ml-print text-end'>:</label>
                        <label className='right-div col-lg-2 col-sm-2 col-md-2 fs-6 fs-6 text-end end'>
                          {jpegawaisatpol?.jmlh_seluruh_pegawai_satpol
                            ? jpegawaisatpol?.jmlh_seluruh_pegawai_satpol
                            : '- '}{' '}
                          Orang
                        </label>
                      </div>

                      <div className='mb-5 mt-5'>
                        <label className='col-lg-8 ms-10 fw-bold'>Status :</label>
                      </div>

                      <div className='grid-im2 mb-5 mt-5'>
                        <label className='ml-20 left-div col-lg-7 offset-md-1 fw-bold fs-6'>
                          -Pegawai Negeri Sipil (PNS)
                        </label>
                        <label className='col-2 center-div ml-print text-end'>:</label>
                        <label className='right-div col-lg-2 col-sm-2 col-md-2 fs-6 fs-6 text-end end'>
                          {jpegawaisatpol?.jmlh_seluruh_pns
                            ? jpegawaisatpol?.jmlh_seluruh_pns
                            : '-'}{' '}
                          Orang
                        </label>
                      </div>

                      <div className='grid-im2 mb-5 mt-5'>
                        <label className='ml-20 left-div col-lg-7 offset-md-1 fw-bold fs-6'>
                          -Calon Pegawai Negeri Sipil (CPNS)
                        </label>
                        <label className='col-2 center-div ml-print text-end'>:</label>
                        <label className='right-div col-lg-2 col-sm-2 col-md-2 fs-6 fs-6 text-end end'>
                          {jpegawaisatpol?.jmlh_seluruh_cpns
                            ? jpegawaisatpol?.jmlh_seluruh_cpns
                            : '-'}{' '}
                          Orang
                        </label>
                      </div>

                      <div className='grid-im2 mb-5 mt-5'>
                        <label className='ml-20 left-div col-lg-7 offset-md-1 fw-bold fs-6'>
                          -Non Pegawai Negeri Sipil
                        </label>
                        <label className='col-2 center-div ml-print text-end'>:</label>
                        <label className='right-div col-lg-2 col-sm-2 col-md-2 fs-6 fs-6 text-end end'>
                          {jpegawaisatpol?.jmlh_seluruh_non_pns
                            ? jpegawaisatpol?.jmlh_seluruh_non_pns
                            : '-'}{' '}
                          Orang
                        </label>
                      </div>

                      <div className='grid-im2 mb-5 mt-5'>
                        <label className='ml-20 left-div col-lg-6 offset-md-2 fw-bold fs-6'>
                          -Anggota PolPP Non PNS (PTT)
                        </label>
                        <label className='col-2 center-div ml-print text-end'>:</label>
                        <label className='right-div col-lg-2 col-sm-2 col-md-2 fs-6 fs-6 text-end end'>
                          {jpegawaisatpol?.jmlh_seluruh_non_pns_ptt
                            ? jpegawaisatpol?.jmlh_seluruh_non_pns_ptt
                            : '-'}{' '}
                          Orang
                        </label>
                      </div>

                      <div className='grid-im2 mb-5 mt-5'>
                        <label className='ml-40 left-div col-lg-6 offset-md-2 fw-bold fs-6'>
                          -Anggota PolPP Non PNS (PLJP)
                        </label>
                        <label className='col-2 center-div ml-print text-end'>:</label>
                        <label className='right-div col-lg-2 col-sm-2 col-md-2 fs-6 fs-6 text-end end'>
                          {jpegawaisatpol?.jmlh_seluruh_non_pns_pjlp
                            ? jpegawaisatpol?.jmlh_seluruh_non_pns_pjlp
                            : '-'}{' '}
                          Orang
                        </label>
                      </div>

                      <div className='grid-im2 mb-5 mt-5'>
                        <label className='ml-40 left-div col-lg-7 offset-md-1 fw-bold fs-6'>
                          -PPNS Satuan Polisi Pamong Praja
                        </label>
                        <label className='col-2 center-div ml-print text-end'>:</label>
                        <label className='right-div col-lg-2 col-sm-2 col-md-2 fs-6 fs-6 text-end end'>
                          {jpegawaisatpol?.jmlh_seluruh_ppns_satpolpp
                            ? jpegawaisatpol?.jmlh_seluruh_ppns_satpolpp
                            : '-'}{' '}
                          Orang
                        </label>
                      </div>

                      <div className='grid-im2 mb-5 mt-5'>
                        <label className='ml-20 left-div col-lg-7 offset-md-1 fw-bold fs-6'>
                          -PPNS Unit Kerja Lainnya
                        </label>
                        <label className='col-2 center-div ml-print text-end'>:</label>
                        <label className='right-div col-lg-2 col-sm-2 col-md-2 fs-6 fs-6 text-end end'>
                          {jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain
                            ? jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain
                            : '-'}{' '}
                          Orang
                        </label>
                      </div>
                    </div>
                    <div className='mx-auto'>
                      <div className='mb-5 mt-5'>
                        <label className='col-lg-8 fw-bold fs-5'>
                          II. Rincian Pegawai Satuan Polisi Pamong Praja
                        </label>
                      </div>
                      <div className='mb-5 mt-5'>
                        <label className='col-lg-8 ms-3 fw-bold'>a) Tingkat Pendidikan</label>
                      </div>
                      <div className='table-responsive'>
                        <table className='table-bordered align-middle table-row-dashed fs-7 gy-5 w-100'>
                          <thead>
                            <tr className='text-start fw-bold fs-7 text-uppercase gs-0'>
                              <th style={{width: '10px'}} className='text-center'>
                                No
                              </th>
                              <th style={{width: '200px'}} className='text-center'>
                                Pendidikan
                              </th>
                              <th style={{width: '75px'}} className='text-center'>
                                Jumlah
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {jsatpolpen?.list &&
                              jsatpolpen?.list?.length > 0 &&
                              jsatpolpen?.list?.map((dt, i) => {
                                return (
                                  <>
                                    <tr>
                                      <td className='text-center'>{i + 1}</td>
                                      <td className='text-left'>{dt.pendidikan}</td>
                                      <td>{dt.jumlah} Orang</td>
                                    </tr>
                                  </>
                                )
                              })}
                            <tr>
                              <td></td>
                              <td>JUMLAH KESELURUHAN</td>
                              <td>
                                {jsatpolpen?.jmlh_keseluruhan !== 0
                                  ? jsatpolpen?.jmlh_keseluruhan
                                  : '- '}{' '}
                                Orang
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className='row mb-5 mt-5'>
                        <label className='col-lg-8 ms-3 fw-bold'>b) Kepangkatan/Golongan</label>
                      </div>
                      <div className='table-responsive'>
                        <table className='table-bordered align-middle table-row-dashed fs-7 gy-5 w-100'>
                          <thead>
                            <tr className='text-start fw-bold fs-7 text-uppercase gs-0'>
                              <th style={{width: '10px'}} className='text-center'>
                                No
                              </th>
                              <th style={{width: '200px'}} className='text-center'>
                                Golongan
                              </th>
                              <th style={{width: '75px'}} className='text-center'>
                                Jumlah
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {jsatpolgol?.list &&
                              jsatpolgol?.list?.length > 0 &&
                              jsatpolgol?.list?.map((dt, i) => {
                                return (
                                  <>
                                    <tr>
                                      <td className='text-center'>{i + 1}</td>
                                      <td className='text-left'>{dt.golongan}</td>
                                      <td>{dt.jumlah} Orang</td>
                                    </tr>
                                  </>
                                )
                              })}
                            <tr>
                              <td></td>
                              <td>JUMLAH KESELURUHAN</td>
                              <td>
                                {jsatpolgol?.jmlh_keseluruhan !== 0
                                  ? jsatpolgol?.jmlh_keseluruhan
                                  : '- '}{' '}
                                Orang
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className='row mb-5 mt-5'>
                        <label className='col-lg-8 ms-3 fw-bold'>c) Jenis Kediklatan</label>
                      </div>
                      <div className='table-responsive'>
                        <table className='table-bordered align-middle table-row-dashed fs-7 gy-5 w-100'>
                          <thead>
                            <tr className='text-start fw-bold fs-7 text-uppercase gs-0'>
                              <th style={{width: '10px'}} className='text-center'>
                                No
                              </th>
                              <th style={{width: '200px'}} className='text-center'>
                                Jenis Diklat
                              </th>
                              <th style={{width: '75px'}} className='text-center'>
                                Jumlah
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className='text-center'>1</td>
                              <td className='text-left'>DIKLAT STRUKTURAL</td>
                              <td>
                                {' '}
                                {jsatpoldik?.diklat_pol_pp_strutural
                                  ? jsatpoldik?.diklat_pol_pp_strutural
                                  : ' - '}{' '}
                                Orang
                              </td>
                            </tr>
                            <tr>
                              <td className='text-center'>2</td>
                              <td className='text-left'>DIKLAT FUNGSIONAL POL PP</td>
                              <td>
                                {' '}
                                {jsatpoldik?.diklat_fungsional_pol_pp
                                  ? jsatpoldik?.diklat_fungsional_pol_pp
                                  : ' - '}{' '}
                                Orang
                              </td>
                            </tr>
                            <tr>
                              <td className='text-center'>3</td>
                              <td className='text-left'>DIKLAT PPNS</td>
                              <td>
                                {' '}
                                {jsatpoldik?.diklat_pol_pp_ppns
                                  ? jsatpoldik?.diklat_pol_pp_ppns
                                  : ' - '}{' '}
                                Orang
                              </td>
                            </tr>
                            <tr>
                              <td className='text-center'>4</td>
                              <td className='text-left'>DIKLAT TEKNIS</td>
                              <td>
                                {' '}
                                {jsatpoldik?.diklat_pol_pp_ppns
                                  ? jsatpoldik?.diklat_pol_pp_ppns
                                  : ' - '}{' '}
                                Orang
                              </td>
                            </tr>
                            <tr>
                              <td className='text-center'>5</td>
                              <td className='text-left'>DIKLAT DASAR POL PP</td>
                              <td>
                                {' '}
                                {jsatpoldik?.diklat_pol_pp_dasar
                                  ? jsatpoldik?.diklat_pol_pp_dasar
                                  : ' - '}{' '}
                                Orang
                              </td>
                            </tr>
                            <tr>
                              <td className='text-center'>6</td>
                              <td className='text-left'>DIKLAT LAINNYA</td>
                              <td>
                                {jsatpoldik?.diklat_pol_pp_ppns
                                  ? jsatpoldik?.diklat_pol_pp_ppns
                                  : ' - '}{' '}
                                Orang
                              </td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>JUMLAH KESELURUHAN</td>
                              <td>
                                {jsatpoldik?.jmlh_keseluruhan
                                  ? jsatpoldik?.jmlh_keseluruhan
                                  : ' - '}{' '}
                                Orang
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>

            <tfoot className='row'>
              <tr>
                <td className='d-flex justify-content-end'>
                  {/* <!--place holder for the fixed-position footer--> */}
                  <div className='page-footer-space'>
                    <div className='fs-6 mb-2 mt-7 fw-semibold text-center'>
                      ..........................................
                      <div className='fs-6 mb-15 fw-semibold text-center'>
                        Kepala Satpol PP................................
                      </div>
                      <div className='col fs-6 mb-2 fw-semibold text-center'>
                        ..........................................
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
