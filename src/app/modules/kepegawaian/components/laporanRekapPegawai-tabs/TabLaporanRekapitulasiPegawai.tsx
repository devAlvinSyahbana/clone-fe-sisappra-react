import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { LaporanRekapHeader } from './LaporanRekapHeader'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table';
import { JumlahSeluruhSatpol, JumlahSatpolDiklat } from '../LaporanRekapPegawaiInterface'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

export function TabLaporanRekapitulasiPegawai() {
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
      <LaporanRekapHeader />
      {/* Second Card */}
      <div className='card'>
        <div className='card-body'>
          <div className='row mb-5'>
            <div className='col-12'>
              <h1 className='text-dark fw-bold fs-3 text-center'>
                LAPORAN REKAPITULASI DATA PEGAWAI
              </h1>
              <h1 className='text-dark fw-bold fs-3 text-center'>
                SATUAN POLISI PAMONG PRAJA …...............................................
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
                          `/kepegawaian/LaporanRekapitulasiPegawai/TabLaporanRekapitulasiPegawai/UnduhLaporanRekapitulasiPegawai`
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
                    Jumlah Pegawai Satuan Polisi Pamong Praja
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
                            Pegawai Negeri Sipil (PNS)
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
                            Calon Pegawai Negeri Sipil (CPNS)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-12 d-flex flex-wrap'>
                      <div className='bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 w-100'>
                        <div className='m-0 border-bottom border-secondary border-2 pb-1 mb-2'>
                          <span className='text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1'>
                            {jpegawaisatpol?.jmlh_seluruh_non_pns
                              ? jpegawaisatpol?.jmlh_seluruh_non_pns
                              : '- '}
                            Orang
                          </span>
                          <span className='text-gray-500 fw-semibold fs-6'>
                            Non Pegawai Negeri Sipil
                          </span>
                        </div>
                        <div className='row'>
                          <div className='col-6 border-end border-secondary pt-2'>
                            <span className='text-gray-700 fw-bolder d-block fs-3 lh-1 ls-n1 mb-1'>
                              {jpegawaisatpol?.jmlh_seluruh_non_pns_ptt
                                ? jpegawaisatpol?.jmlh_seluruh_non_pns_ptt
                                : '- '}
                              Orang
                            </span>
                            <span className='text-gray-500 fw-semibold fs-6'>
                              Anggota PolPP Non PPNS (PTT)
                            </span>
                          </div>
                          <div className='col-6 border-start border-secondary pt-2'>
                            <span className='text-gray-700 fw-bolder d-block fs-3 lh-1 ls-n1 mb-1'>
                              {jpegawaisatpol?.jmlh_seluruh_non_pns_pjlp
                                ? jpegawaisatpol?.jmlh_seluruh_non_pns_pjlp
                                : '- '}
                              Orang
                            </span>
                            <span className='text-gray-500 fw-semibold fs-6'>
                              Anggota PolPP Non PPNS (PJLP)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-6 d-flex flex-wrap'>
                      <div className='bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 w-100'>
                        <div className='m-0'>
                          <span className='text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1'>
                            {jpegawaisatpol?.jmlh_seluruh_ppns_satpolpp
                              ? jpegawaisatpol?.jmlh_seluruh_ppns_satpolpp
                              : '- '}
                            Orang
                          </span>
                          <span className='text-gray-500 fw-semibold fs-6'>
                            PPNS Satuan Polisi Pamong Praja
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-6 d-flex flex-wrap'>
                      <div className='bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 w-100'>
                        <div className='m-0'>
                          <span className='text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1'>
                            {jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain
                              ? jpegawaisatpol?.jmlh_seluruh_ppns_unit_kerja_lain
                              : '- '}
                            Orang
                          </span>
                          <span className='text-gray-500 fw-semibold fs-6'>
                            PPNS Unit Kerja Lainnya
                          </span>
                        </div>
                      </div>
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
                    Rincian Pegawai Satuan Polisi Pamong Praja
                  </span>
                </h3>
              </div>
              <div className='card-body mt-n20'>
                <div className='mt-n20 position-relative'>
                  <div className='card border card-flush h-xl-100'>
                    <div className='card-header pt-7'>
                      <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold text-gray-800'>
                          Tingkat Pendidikan{' '}
                        </span>
                      </h3>
                    </div>
                    <div className='card-body pt-2'>
                      <Table responsive
                        className='table align-middle table-row-dashed fs-6 gy-3'
                        id='kt_table_widget_4_table'
                      >
                        <thead>
                          <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                            <th className='min-w-25px text-center'>No</th>
                            <th className='min-w-150px text-center'>Pendidikan</th>
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
                            <td className='text-center'>DOKTOR (S3)</td>
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
                                2
                              </a>
                            </td>
                            <td className='text-center'>PASCA SARJANA (S2)</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                20 Orang
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
                            <td className='text-center'>SARJANA (S1)</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                113 Orang
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
                            <td className='text-center'>DIPLOMA IV</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                0 Orang
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
                            <td className='text-center'>DIPLOMA III</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                12 Orang
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
                            <td className='text-center'>DIPLOMA II</td>
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
                                7
                              </a>
                            </td>
                            <td className='text-center'>DIPLOMA I</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                0 Orang
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
                            <td className='text-center'>SMA / Sederajat</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                269 Orang
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
                            <td className='text-center'>SMP / Sederajat</td>
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
                            <td className='text-center'>SD / Sederajat</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                0 Orang
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className='text-center table-primary' colSpan={2}>
                              Jumlah Keseluruhan
                            </td>
                            <td className='text-end table-success'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                396 Orang
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className='mt-20 position-relative'>
                  <div className='card border card-flush h-xl-100'>
                    <div className='card-header pt-7'>
                      <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold text-gray-800'>
                          Kepangkatan/Golongan
                        </span>
                      </h3>
                    </div>
                    <div className='card-body pt-2'>
                      <Table responsive
                        className='table align-middle table-row-dashed fs-6 gy-3'
                        id='kt_table_widget_4_table'
                      >
                        <thead>
                          <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                            <th className='min-w-25px text-center'>No</th>
                            <th className='min-w-150px text-center'>Golongan</th>
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
                            <td className='text-center'>I</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                40 Orang
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
                            <td className='text-center'>II</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                2323 Orang
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
                            <td className='text-center'>III</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                626 Orang
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
                            <td className='text-center'>IV</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                33 Orang
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className='text-center table-primary' colSpan={2}>
                              Jumlah Keseluruhan
                            </td>
                            <td className='text-end table-success'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                3022 Orang
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className='mt-20 position-relative'>
                  <div className='card border card-flush h-xl-100'>
                    <div className='card-header pt-7'>
                      <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold text-gray-800'>Jenis Kediklatan</span>
                      </h3>
                    </div>
                    <div className='card-body pt-2'>
                      <Table responsive
                        className='table align-middle table-row-dashed fs-6 gy-3'
                        id='kt_table_widget_4_table'
                      >
                        <thead>
                          <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                            <th className='min-w-25px text-center'>No</th>
                            <th className='min-w-150px text-center'>Golongan</th>
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
                            <td className='text-center'>DIKLAT STRUKTURAL</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                {jsatpoldik?.diklat_pol_pp_strutural
                                  ? jsatpoldik?.diklat_pol_pp_strutural
                                  : '- '}{' '}
                                Orang
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
                            <td className='text-center'>DIKLAT FUNGSIONAL POL PP</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                {jsatpoldik?.diklat_fungsional_pol_pp
                                  ? jsatpoldik?.diklat_fungsional_pol_pp
                                  : '- '}{' '}
                                Orang
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
                            <td className='text-center'>DIKLAT PPNS</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                {jsatpoldik?.diklat_pol_pp_ppns
                                  ? jsatpoldik?.diklat_pol_pp_ppns
                                  : '- '}{' '}
                                Orang
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
                            <td className='text-center'>DIKLAT TEKNIS</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                0 Orang
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
                            <td className='text-center'>DIKLAT DASAR POL PP</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                {jsatpoldik?.diklat_pol_pp_dasar
                                  ? jsatpoldik?.diklat_pol_pp_dasar
                                  : '- '}{' '}
                                Orang
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
                            <td className='text-center'>DIKLAT LAINNYA</td>
                            <td className='text-end'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                218 Orang
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className='text-center table-primary' colSpan={2}>
                              Jumlah Keseluruhan
                            </td>
                            <td className='text-end table-success'>
                              <a href='#' className='text-gray-600 text-hover-primary'>
                                3477 Orang
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
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
