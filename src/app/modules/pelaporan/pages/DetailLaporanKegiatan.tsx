import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DataTable from 'react-data-table-component';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';

export function DetailLaporanKegiatan() {

  var [value, onChange] = useState(new Date()); /* Date Picker */

  const columns = [
    {
      name: 'No',
      selector: (row: { no: any; }) => row.no,
    },
    {
      name: 'Dokumentasi',
      selector: (row: { dokumentasi: any; }) => row.dokumentasi,
    },
    {
      name: 'Keterangan',
      selector: (row: { ket: any; }) => row.ket,
    },
    {
      name: 'Aksi',
      selector: (row: { aksi: any; }) => row.aksi,
    },
  ]

  const data = [
    {
      id: 1,
      no: '1',
      dokumentasi: '-',
      ket: '-',
      aksi: '-',
    },
  ]

  function MyComponent() {
    return (
      <DataTable
        columns={columns}
        data={data}
      />
    );
  };


  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
          <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            </div>
          </div>
        </div>
        <div id="kt_app_content" className="app-content flex-column-fluid">
          <div id="kt_app_content_container" className="app-container container-xxl">
            <div className="card mb-5 mb-xl-10">
              <div className="card-body">
                <Tabs>
                  <TabList>
                    <Tab>Kegiatan</Tab>
                    <Tab>Tindak Lanjut</Tab>
                    <Tab>Dokumentasi</Tab>
                  </TabList>
                  <form>
                    <div className="form-group">
                      <TabPanel>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Jenis
                              Kegiatan</label>
                          </div>
                          <div className="col-md-4">
                            <select className="form-select form-select-solid"
                              data-control="select2" data-placeholder="Pilih">
                              <option></option>
                              <option value="a">Laporan Masyarakat</option>
                              <option value="b">Deteksi dan Cegah Dini</option>
                              <option value="a">Pembinaan dan Sosialisasi</option>
                              <option value="b">Penanganan Unjuk Rasa</option>
                              <option value="a">Patroli</option>
                              <option value="b">Pengamanan</option>
                              <option value="a">Pengawalan</option>
                              <option value="b">Penertiban</option>
                              <option value="a">Kerja Bakti</option>
                              <option value="b">Sidang Tipiring</option>
                              <option value="a">Sosialisasi P4GN</option>
                              <option value="b">Apel</option>
                              <option value="a">Penertiban Bangunan</option>
                              <option value="b">Rapat</option>
                              <option value="a">Penertiban Minuman</option>
                              <option value="b">Pengaturan Lalu Lintas</option>
                              <option value="a">Kegiatan PPKM</option>
                              <option value="b">Sosialisasi P4GN (Narkoba)</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Jenis
                              Personil</label>
                          </div>
                          <div className="col-md-4">
                            <input type="text"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Uraian
                              Kegiatan</label>
                          </div>
                          <div className="col-md-4">
                            <input type="text"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                          <Link to="/pelaporan/LaporanKegiatan">
                            <button className="btn btn-secondary"><i
                              className="fa-solid fa-arrow-left"></i> Kembali
                            </button>
                          </Link>
                          <Link to="/pelaporan/LaporanKegiatan">
                            <button className="btn btn-primary"><i className="fa-solid fa-paper-plane"></i> Simpan
                            </button>
                          </Link>
                        </div>
                      </TabPanel>
                    </div>
                    <div className="form-group">
                      <TabPanel>
                        <h3>Administrasi</h3>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Jenis
                              Pelanggaran</label>
                          </div>
                          <div className="col-md-4">
                            <select className="form-select form-select-solid"
                              data-control="select2" data-placeholder="Pilih">
                              <option></option>
                              <option value="a">-</option>
                              <option value="b">-</option>
                              <option value="a">-</option>
                              <option value="b">-</option>
                              <option value="a">-</option>
                              <option value="b">-</option>
                              <option value="a">-</option>
                              <option value="b">-</option>
                              <option value="a">-</option>
                              <option value="b">-</option>
                              <option value="a">-</option>
                              <option value="b">-</option>
                              <option value="a">-</option>
                              <option value="b">-</option>
                              <option value="a">-</option>
                              <option value="b">-</option>
                              <option value="a">-</option>
                              <option value="b">-</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Jenis
                              Penertiban</label>
                          </div>
                          <div className="col-md-4">
                            <input type="text"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                        </div>
                        <div className="row mb-10">
                          <div className="col-md-2">
                            <label className="col-form-label fw-semibold fs-6">Perda/Perkada
                              yang dilanggar</label>
                          </div>
                          <div className="col-md-4">
                            <input type="text"
                              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <h3>Penyelesaian</h3>
                            </div>
                            <div className="col-md-3">
                              <select className="form-select form-select-solid"
                                data-control="select2" data-placeholder="Pilih">
                                <option></option>
                                <option value="a">Laporan Masyarakat</option>
                                <option value="b">Deteksi dan Cegah Dini
                                </option>
                                <option value="a">Pembinaan dan Sosialisasi
                                </option>
                                <option value="b">Penanganan Unjuk Rasa</option>
                                <option value="a">Patroli</option>
                                <option value="b">Pengamanan</option>
                                <option value="a">Pengawalan</option>
                                <option value="b">Penertiban</option>
                                <option value="a">Kerja Bakti</option>
                                <option value="b">Sidang Tipiring</option>
                                <option value="a">Sosialisasi P4GN</option>
                                <option value="b">Apel</option>
                                <option value="a">Penertiban Bangunan</option>
                                <option value="b">Rapat</option>
                                <option value="a">Penertiban Minuman</option>
                                <option value="b">Pengaturan Lalu Lintas
                                </option>
                                <option value="a">Kegiatan PPKM</option>
                                <option value="b">Sosialisasi P4GN (Narkoba)
                                </option>
                              </select>
                            </div>
                            <div className="col-md-2 offset-md-3">
                              <label>Penindakan</label>
                            </div>
                            <div className="col-md-2">
                              <select className="form-select form-select-solid"
                                data-control="select2" data-placeholder="Pilih">
                                <option></option>
                                <option value="a">Yustisi</option>
                                <option value="b">Non Yustisi (Pembinaan)
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="row mb-10">
                              <div className="col-md-3">
                                <h3>Non Pengadilan</h3>
                              </div>
                              <div className="col-md-2 offset-md-5">
                                <label>Volume</label>
                              </div>
                              <div className="col-md-2">
                                <input type="text"
                                  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="row mb-10">
                              <div className="col-2">
                                <label className="col-form-label fw-semibold fs-6">Denda
                                  Admministrasi</label>
                              </div>
                              <div className="col-md-2">
                                <input type="text"
                                  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                                  placeholder="Rp."></input>
                              </div>
                              <div className="col-md-2">
                                <input type="text"
                                  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                              </div>
                              <div className="col-md-2 offset-md-2">
                                <label className="col-form-label fw-semibold fs-6">Nama
                                  bank</label>
                              </div>
                              <div className="col-md-2">
                                <input type="text"
                                  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="row mb-10">
                              <div className="col-2">
                                <label
                                  className="col-form-label fw-semibold fs-6">Tanggal
                                  Setor</label>
                              </div>
                              <div className="col-md-3">
                                <DatePicker className="form-control form-control-solid" onChange={onChange} value={value} />
                              </div>
                              <div className="col-md-2 offset-md-3">
                                <label className="col-form-label fw-semibold fs-6">No.
                                  Validasi Bank</label>
                              </div>
                              <div className="col-md-2">
                                <input type="text"
                                  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                              </div>
                            </div>
                          </div>
                          <h3>Pelanggar</h3>
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">Nomor
                                BAP</label>
                            </div>
                            <div className="col-md-4">
                              <input type="text"
                                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                            </div>
                          </div>
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">Nama
                                / Penganggung Jawab</label>
                            </div>
                            <div className="col-md-4">
                              <input type="text"
                                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                            </div>
                          </div>
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">Nama
                                Usaha / Tempat</label>
                            </div>
                            <div className="col-md-4">
                              <input type="text"
                                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                            </div>
                          </div>
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">Jenis
                                Usaha / Tempat</label>
                            </div>
                            <div className="col-md-4">
                              <input type="text"
                                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                            </div>
                          </div>
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">Alamat
                                Tempat Usaha</label>
                            </div>
                            <div className="col-md-4">
                              <input type="text"
                                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                            </div>
                          </div>
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">NIK /
                                Passport</label>
                            </div>
                            <div className="col-md-4">
                              <input type="text"
                                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                            </div>
                          </div>
                          <div className="row mb-10">
                            <div className="col-md-2">
                              <label className="col-form-label fw-semibold fs-6">Alamat
                                Pelanggar</label>
                            </div>
                            <div className="col-md-4">
                              <input type="text"
                                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"></input>
                            </div>
                          </div>
                          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                            <Link to="/pelaporan/LaporanKegiatan">
                              <button className="btn btn-secondary"><i
                                className="fa-solid fa-arrow-left"></i> Kembali
                              </button>
                            </Link>
                            <Link to="/pelaporan/LaporanKegiatan">
                              <button className="btn btn-primary"><i className="fa-solid fa-paper-plane"></i> Simpan
                              </button>
                            </Link>
                          </div>
                        </div>
                      </TabPanel>
                    </div>
                    <div className="form-group">
                      <TabPanel>
                        <div className="row mb-10">
                          <div className="row mb-2">
                            <div className="col-md-2">
                              <label
                                className="col-form-label fw-semibold fs-6">Dokumentasi</label>
                            </div>
                            <div className="col-4 md-2">
                              <label
                                className="form-label"></label>
                              <input className="form-control" type="file"
                                id="formFileMultiple" multiple></input>
                            </div>
                            <div className="form-group">
                              <div className="row mb-10">
                                <div className="row mb-2">
                                  <div className="col-md-2">
                                    <label
                                      className="col-form-label fw-semibold fs-6">Keterangan</label>
                                  </div>
                                  <div className="col-md-10">
                                    <textarea id="w3review" name="w3review"
                                    ></textarea>
                                  </div>
                                  <div className="form-group">
                                    <div className="row mb-10">
                                      <div className="row mb-2">
                                        <DataTable
                                          columns={columns}
                                          data={data}
                                          pagination
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                    <Link to="/pelaporan/LaporanKegiatan">
                                      <button className="btn btn-secondary"><i
                                        className="fa-solid fa-arrow-left"></i> Kembali
                                      </button>
                                    </Link>
                                    <Link to="/pelaporan/LaporanKegiatan">
                                      <button className="btn btn-primary"><i className="fa-solid fa-paper-plane"></i> Simpan
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </div>
                  </form>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}
