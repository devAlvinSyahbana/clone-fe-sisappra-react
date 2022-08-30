import React from 'react'

export function TambahLaporanKegiatan() {
  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
          <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
              <h1
                className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
              </h1>
              <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                <li className="breadcrumb-item text-muted">
                  <a href="../../demo1/dist/index.html"
                    className="text-muted text-hover-primary">Modul</a>
                </li>
                <li className="breadcrumb-item">
                  <span className="bullet bg-gray-400 w-5px h-2px"></span>
                </li>
                <li className="breadcrumb-item text-muted">Pelaporan</li>
                <li className="breadcrumb-item">
                  <span className="bullet bg-gray-400 w-5px h-2px"></span>
                </li>
                <li className="breadcrumb-item text-muted">
                  Tambah Laporan Kegiatan
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="kt_app_content" className="app-content flex-column-fluid">
          <div id="kt_app_content_container" className="app-container container-xxl">
            <div className="card mb-5 mb-xl-10">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <div className="row mb-10">
                      <div className="col-md-2">
                        <label className="col-form-label fw-semibold fs-6">Kota</label>
                      </div>
                      <div className="col-md-4">
                        <select className="form-select form-select-solid"
                          data-control="select2" data-placeholder="Pilih">
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
                    <div className="row mb-10">
                      <div className="col-md-2">
                        <label className="col-form-label fw-semibold fs-6">Kecamatan</label>
                      </div>
                      <div className="col-md-4">
                        <select className="form-select form-select-solid"
                          data-control="select2" data-placeholder="Pilih">
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
                    <div className="row mb-10">
                      <div className="col-md-2">
                        <label className="col-form-label fw-semibold fs-6">Kelurahan</label>
                      </div>
                      <div className="col-md-4">
                        <select className="form-select form-select-solid"
                          data-control="select2" data-placeholder="Pilih">
                          <option></option>
                          <option value="a">Kelapa Gading Barat</option>
                          <option value="b">Kepala Gading Timur</option>
                          <option value="a">Pegangsaan Dua</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-10">
                      <div className="col-md-2">
                        <label className="col-form-label fw-semibold fs-6">Kegiatan</label>
                      </div>
                      <div className="col-md-4">
                        <input type="text"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"> </input>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <a href="../../demo1/dist/sisappra/laporan/laporan-kegiatan/read.html"
                    className="btn btn-secondary"><i className="fa-solid fa-arrow-left"></i>
                    Kembali</a>
                  <a href="./components/LaporanKegiatan" className="btn btn-primary"><i className="fa-solid fa-paper-plane"></i>
                    Simpan</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      )
}
