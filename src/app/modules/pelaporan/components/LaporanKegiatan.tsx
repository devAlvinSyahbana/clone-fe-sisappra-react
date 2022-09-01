import React from 'react'
import { Link } from 'react-router-dom'

export function LaporanKegiatan() {
  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
          <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
              <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                Daftar Laporan Kegiatan
              </h1>
            </div>
          </div>
        </div>
        <div id="kt_app_content" className="app-content flex-column-fluid">
          <div id="kt_app_content_container" className="app-container container-xxl">
            <div className="card">
              <div className="card-header border-1 pt-6">
                <div className="accordion accordion-icon-toggle" id="kt_accordion_2">
                  <div className="mb-5">
                    <div className="accordion-header py-3 d-flex" data-bs-toggle="collapse"
                      data-bs-target="#kt_accordion_2_item_1">
                      <span className="accordion-icon">
                        <span className="svg-icon svg-icon-4">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1"
                              transform="rotate(-180 18 13)" fill="currentColor" />
                            <path
                              d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                              fill="currentColor" />
                          </svg>
                        </span>
                      </span>
                      <h3 className="fs-4 fw-semibold mb-0 ms-4">
                        Pilihan Filter
                      </h3>
                    </div>
                    <div id="kt_accordion_2_item_1" className="fs-6 collapse show ps-10"
                      data-bs-parent="#kt_accordion_2">
                      <div className="row w-100 mt-10 mb-10">
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Kota</label>
                              </div>
                              <div className="col-8">
                                <select className="form-select form-select-solid" data-control="select2"
                                  data-placeholder="Pilih">
                                  <option></option>
                                  <option value="a">Kota Jakarta Utara</option>
                                  <option value="b">Kota Jakarta Selatan</option>
                                  <option value="a">Kota Jakarta Timur</option>
                                  <option value="b">Kota Jakarta Barat</option>
                                  <option value="a">Kota Jakarta Selatan</option>
                                  <option value="b">Kabupaten Kepulauan Seribu</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4">
                                <label
                                  className="form-label align-middle">Tanggal</label>
                              </div>
                              <div className="col-8">
                                <input className="form-control form-control-solid" placeholder="Pilih tanggal"
                                  id="kt_daterangepicker_tgl" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4">
                                <label
                                  className="form-label align-middle">Kecamatan</label>
                              </div>
                              <div className="col-8">
                                <select className="form-select form-select-solid" data-control="select2"
                                  data-placeholder="Pilih">
                                  <option></option>
                                  <option value="a">Jagakarsa</option>
                                  <option value="b">Pasar Minggu</option>
                                  <option value="a">Cilandak</option>
                                  <option value="b">Pesanggrahan</option>
                                  <option value="a">Kebayoran Lama</option>
                                  <option value="b">Kebayoran Baru</option>
                                  <option value="a">Mampang Prapatan</option>
                                  <option value="b">Pancoran</option>
                                  <option value="a">Tebet</option>
                                  <option value="b">Pasar Rebo</option>
                                  <option value="a">Ciracas</option>
                                  <option value="b">Cipayung</option>
                                  <option value="a">Makasar</option>
                                  <option value="b">Kramatjati</option>
                                  <option value="a">Jatinegara</option>
                                  <option value="b">Duren Sawit</option>
                                  <option value="a">Cakung</option>
                                  <option value="b">Pulogadung</option>
                                  <option value="a">Matraman</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6">
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="mb-10">
                              <div className="row">
                                <div className="col-4">
                                  <label
                                    className="form-label align-middle">Kelurahan</label>
                                </div>
                                <div className="col-8">
                                  <select className="form-select form-select-solid" data-control="select2"
                                    data-placeholder="Pilih">
                                    <option></option>
                                    <option value="a">Kelapa Gading Barat</option>
                                    <option value="b">Kepala Gading Timur</option>
                                    <option value="a">Pegangsaan Dua</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6">
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="mb-10">
                              <div className="row">
                                <div className="col-4">
                                  <label
                                    className="form-label align-middle">Kegiatan</label>
                                </div>
                                <div className="col-8">
                                  <select className="form-select form-select-solid" data-control="select2"
                                    data-placeholder="Pilih">
                                    <option></option>
                                    <option value="22">
                                      -
                                    </option>
                                    <option value="23">
                                      -
                                    </option>
                                    <option value="24">
                                      -
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-lg-12 col-sm-12">
                            <div className="d-flex">
                              <button type="submit" className="btn btn-primary fw-semibold me-auto px-6"
                                data-kt-menu-dismiss="true" data-kt-user-table-filter="filter">
                                <i className="fa fa-search"></i>
                                Cari
                              </button>
                              <Link to="/pelaporan/TambahLaporanKegiatan">
                                <button className="btn btn-sm btn-primary me-1 px-6">
                                  <i className="fa-solid fa-plus"></i>
                                  Tambah
                                </button>
                                </Link>
                                <a href="#" className="btn btn-sm btn-danger me-1" data-bs-toggle="modal"><i
                                  className="fa-solid fa-trash"></i> Hapus</a>
                                <div className="my-1 me-0">
                                  <select className="form-select form-select-sm form-select-solid w-180px"
                                    data-control="select2" data-placeholder="Select Hours" data-hide-search="true">
                                    <option value="1">Unduh</option>
                                    <option value="2">Excell</option>
                                    <option value="3">Pdf</option>
                                  </select>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body py-4">
                  <table id="kt_datatable_responsive" className="table align-middle table-row-dashed fs-7 gy-5">
                    <thead>
                      <tr className="text-start align-top text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th></th>
                        <th>No</th>
                        <th>Kota</th>
                        <th>Kecamatan</th>
                        <th>Kelurahan</th>
                        <th>Kegiatan</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>1</td>
                        <td>Jakarta Utara</td>
                        <td>Pasar Minggu</td>
                        <td>Kelapa Gading Barat</td>
                        <td>Pohon Tumbang karena angin kencang yang menimpa Mobil Aqya Minibus</td>
                        <td>
                          <a href="../../demo1/dist/sisappra/laporan/laporan-kegiatan/update.html">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </a>
                          <a href="#">
                            <i className="fa-solid fa-trash"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div >
          </div>
        </div>
      </div>
    </div>
  )
}
