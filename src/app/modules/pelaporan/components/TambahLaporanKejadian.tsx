import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';

export function TambahLaporanKejadian() {

  var [value, onChange] = useState(new Date()); /* Date Picker */



  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
          <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
              <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                Tambah Laporan Kejadian
              </h1>
            </div>
          </div>
        </div>
        <div id="kt_app_content" className="app-content flex-column-fluid">
          <div id="kt_app_content_container" className="app-container container-xxl">
            <div className="card mb-5 mb-xl-10">
              <div className="card-body">
                <Tabs>
                  <TabList>
                    <Tab>Kejadian</Tab>
                    <Tab>Tindak Lanjut</Tab>
                  </TabList>
                  <form>
                    <div className="form-group">
                      <TabPanel>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Tanggal Kejadian</label>
                          </div>
                          <div className="col-md-4">
                            <DatePicker className="form-control form-control-solid" onChange={onChange} value={value} />
                            {/* <input className="form-control form-control-solid" placeholder="20/12/2021"
                              id="kt_daterangepicker_single"></input> */}
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Waktu Kejadian</label>
                          </div>
                          <div className="col-md-4">
                            <input placeholder="07:00:00" className="form-control form-control-solid"
                              id="kt_datepicker_time" />
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Kota</label>
                          </div>
                          <div className="col-md-4">
                            <input type="text" placeholder="Jakarta Selatan"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Kecamatan</label>
                          </div>
                          <div className="col-md-4">
                            <input type="text" placeholder="Jagakarsa"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Kelurahan</label>
                          </div>
                          <div className="col-md-4">
                            <input type="text" placeholder="Ciganjur"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Alamat Lengkap</label>
                          </div>
                          <div className="col-md-4">
                            <textarea className="form-control form-control form-control-solid" data-kt-autosize="true"
                              placeholder="Jl. Sirsak Ujung Kel. Ciganjur Kec. Jagakarsa"></textarea>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Jenis Kejadian</label>
                          </div>
                          <div className="col-md-4">
                            <select className="form-select form-select-solid" data-control="select2">
                              <option value="Select All" className='text-muted' disabled selected>Pilih Jenis Kejadian</option>
                              <option value="Pohon Tumbang">Pohon Tumbang</option>
                              <option value="Kebakaran">Kebakaran</option>
                              <option value="Tawuran">Tawuran</option>
                              <option value="Penemuan Mayat">Penemuan Mayat</option>
                              <option value="Kecelakaan">Kecelakaan</option>
                              <option value="Terorisme">Terorisme</option>
                              <option value="Penyelamatan Orang">Penyelamatan Orang</option>
                              <option value="Kerusakan Konstruksi">Kerusakan Konstruksi</option>
                              <option value="Unjuk Rasa">Unjuk Rasa</option>
                              <option value="Kriminalitas">Kriminalitas</option>
                              <option value="Hewan Buas dan Berbisa">Hewan Buas dan Berbisa</option>
                              <option value="Pembunuhan">Pembunuhan</option>
                              <option value="Pendampingan Kekerasan pada Ibu dan Anak">Pendampingan Kekerasan pada Ibu dan Anak</option>
                              <option value="Banjir">Banjir</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Uraian Kejadian</label>
                          </div>
                          <div className="col-md-4">
                            <textarea className="form-control form-control form-control-solid" data-kt-autosize="true"
                              placeholder="Telah terjadi ........................................"></textarea>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Jumlah Personil Satpol PP</label>
                          </div>
                          <div className="col-md-1">
                            <input placeholder="0" type="number"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Jumlah Personil Instansi Lain</label>
                          </div>
                          <div className="col-md-1">
                            <input placeholder="0" type="number"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="row mb-2">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Jenis Bantuan</label>
                          </div>
                          <div className="col-md-4">
                            <label className="col-form-label fw-semibold fs-6">Satpol PP</label>
                          </div>
                          <div className="col-md-4">
                            <label className="col-form-label fw-semibold fs-6">Instansi Terkait</label>
                          </div>
                        </div>
                        <div id="kt_docs_repeater_nested">
                          <div className="form-group">
                            <div data-repeater-list="kt_docs_repeater_nested_outer">
                              <div data-repeater-item>
                                <div className="form-group row justify-content-center mb-5">
                                  <div className="col-md-4">
                                    <div className="inner-repeater">
                                      <div data-repeater-list="kt_docs_repeater_nested_inner" className="mb-5">
                                        <div data-repeater-item>
                                          <div className="input-group pb-3">
                                            <select className="form-select form-select-solid" data-control="select2">
                                              <option value="Select All" className='text-muted' disabled selected>Pilih Jenis Bantuan</option>
                                              <option value="a">Dibawa ke rumah sakit</option>
                                              <option value="b">Memanggil Pemadam Kebakaran</option>
                                              <option value="a">Mengamankan</option>
                                              <option value="b">Relokasi</option>
                                              <option value="a">Dibawa ke tempat penampungan</option>
                                              <option value="b">Evakuasi</option>
                                            </select>
                                            <button className="border border-secondary btn btn-icon btn-light-danger"
                                              data-repeater-delete type="button">
                                              <i className="la la-trash-o fs-3"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <button className="btn btn-sm btn-light-primary" data-repeater-create type="button">
                                        <i className="la la-plus"></i> Tambah
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="inner-repeater">
                                      <div data-repeater-list="kt_docs_repeater_nested_inner" className="mb-5">
                                        <div data-repeater-item>
                                          <div className="input-group pb-3">
                                            <select className="form-select form-select-solid" data-control="select2">
                                              <option className='text-muted' disabled selected>Pilih Jenis Bantuan</option>
                                              <option value="a">Dibawa ke rumah sakit</option>
                                              <option value="b">Memanggil Pemadam Kebakaran</option>
                                              <option value="a">Mengamankan</option>
                                              <option value="b">Relokasi</option>
                                              <option value="a">Dibawa ke tempat penampungan</option>
                                              <option value="b">Evakuasi</option>
                                            </select>
                                            <button className="border border-secondary btn btn-icon btn-light-danger"
                                              data-repeater-delete type="button">
                                              <i className="la la-trash-o fs-3"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <button className="btn btn-sm btn-light-primary" data-repeater-create type="button">
                                        <i className="la la-plus"></i> Tambah
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="kt_docs_repeater_basic">
                          <div className="form-group">
                            <div data-repeater-list="kt_docs_repeater_basic">
                              <div data-repeater-item>
                                <div className="form-group row mb-2">
                                  <div className="col-md-2">
                                    <label className="col-form-label fw-semibold fs-6">Korban Jiwa</label>
                                  </div>
                                  <div className="col-md-2">
                                    <select className="form-select form-select-solid" data-control="select2">
                                      <option className='text-muted' disabled selected>Pilih Korban Jiwa</option>
                                      <option value="a">Meninggal</option>
                                      <option value="b">Luka - luka Berat</option>
                                      <option value="a">Luka - luka Ringan</option>
                                      <option value="b">Terserang Penyakit</option>
                                      <option value="a">Hilang</option>
                                      <option value="b">Pengungsi</option>
                                      <option value="a">Nihil</option>
                                    </select>
                                  </div>
                                  <div className="col-md-2">
                                    <label className="col-form-label fw-semibold fs-6">Jumlah Korban Pria</label>
                                  </div>
                                  <div className="col-md-1">
                                    <input type="number" placeholder="0"
                                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                  </div>
                                  <div className="col-md-2">
                                    <label className="col-form-label fw-semibold fs-6">Jumlah Korban Wanita</label>
                                  </div>
                                  <div className="col-md-1">
                                    <input type="number" placeholder="0"
                                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                  </div>
                                  <div className="col-md-2">
                                    <a href="javascript:;" data-repeater-delete className="btn btn-sm btn-light-danger">
                                      <i className="la la-trash-o"></i>Hapus
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group mt-1">
                            <a href="javascript:;" data-repeater-create className="btn btn-light-primary">
                              <i className="la la-plus"></i>Tambah
                            </a>
                          </div>
                        </div>
                        <div id="kt_docs_repeater_basic_2">
                          <div className="form-group">
                            <div data-repeater-list="kt_docs_repeater_basic_2">
                              <div data-repeater-item>
                                <div className="form-group row mb-2">
                                  <div className="col-md-2">
                                    <label className="col-form-label fw-semibold fs-6">Korban Material</label>
                                  </div>
                                  <div className="col-md-2">
                                    <select className="form-select form-select-solid" data-control="select2"
                                      data-placeholder="Pilih">
                                      <option className='text-muted' disabled selected>Pilih Korban Material</option>
                                      <option value="a">Rumah Rusak</option>
                                      <option value="b">Rumah Tergenang</option>
                                      <option value="a">Tempat Ibadah</option>
                                      <option value="b">Fasilitas Umum</option>
                                      <option value="a">Kendaraan Roda 4</option>
                                      <option value="b">Kendaraan Roda 2</option>
                                      <option value="a">Lain - lain</option>
                                    </select>
                                  </div>
                                  <div className="col-md-2">
                                    <label className="col-form-label fw-semibold fs-6">Jumlah Korban</label>
                                  </div>
                                  <div className="col-md-1">
                                    <input type="number" placeholder="0"
                                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                                  </div>
                                  <div className="col-md-2">
                                    <a href="javascript:;" data-repeater-delete className="btn btn-sm btn-light-danger">
                                      <i className="la la-trash-o"></i>Hapus
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group mt-5">
                            <a href="javascript:;" data-repeater-create className="btn btn-light-primary">
                              <i className="la la-plus"></i>Tambah
                            </a>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Dokumentasi</label>
                          </div>
                        </div>
                        <div className="row mb-10 justify-content-center">
                          <div className="col-md-3">
                            <label htmlFor="firstimg"></label>
                            <input type="file" name="" id="firstimg"></input>
                          </div>
                          <div className="col-md-3">
                            <label htmlFor="firstimg"></label>
                            <input type="file" name="" id="firstimg"></input>
                          </div>
                          <div className="col-md-3">
                            <label htmlFor="firstimg"></label>
                            <input type="file" name="" id="firstimg"></input>
                          </div>
                          <div className="col-md-3">
                            <label htmlFor="firstimg"></label>
                            <input type="file" name="" id="firstimg"></input>
                          </div>
                        </div>
                      </TabPanel>
                    </div>
                  </form>
                </Tabs>
              </div>
              <div className="card-footer">
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link to="/pelaporan/LaporanKejadian">
                    <button className="btn btn-secondary"><i
                      className="fa-solid fa-arrow-left"></i> Kembali
                    </button>
                  </Link>
                  <Link to="/pelaporan/LaporanKejadian">
                    <button className="btn btn-primary"><i className="fa-solid fa-paper-plane"></i> Simpan
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}