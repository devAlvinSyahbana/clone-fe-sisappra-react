import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';

export function LaporanKejadian() {
  const columns = [
    {
      name: 'No',
      selector: (row: { no: any; }) => row.no,
    },
    {
      name: 'Jam',
      selector: (row: { jam: any; }) => row.jam,
    },
    {
      name: 'Tanggal',
      selector: (row: { tanggal: any; }) => row.tanggal,
    },
    {
      name: 'Jenis Kejadian',
      selector: (row: { jeniskejadian: any; }) => row.jeniskejadian,
    },
    {
      name: 'Uraian Kejadian',
      selector: (row: { uraiankejadian: any; }) => row.uraiankejadian,
    },
    {
      name: 'Kota',
      selector: (row: { kota: any; }) => row.kota,
    },
    {
      name: 'Kecamatan',
      selector: (row: { kecamatan: any; }) => row.kecamatan,
    },
    {
      name: 'Kelurahan',
      selector: (row: { kelurahan: any; }) => row.kelurahan,
    },
    {
      name: 'Meninggal',
      selector: (row: { meninggal: any; }) => row.meninggal,
    },
    {
      name: 'Luka-Luka Berat',
      selector: (row: { lukalukaberat: any; }) => row.lukalukaberat,
    },
    {
      name: 'Luka-Luka Ringan',
      selector: (row: { lukalukaringan: any; }) => row.lukalukaringan,
    },
    {
      name: 'Terserang Penyakit',
      selector: (row: { terserangpenyakit: any; }) => row.terserangpenyakit,
    },
    {
      name: 'Hilang',
      selector: (row: { hilang: any; }) => row.hilang,
    },
    {
      name: 'Pengungsi',
      selector: (row: { pengungsi: any; }) => row.pengungsi,
    },
  ];

  const data = [
    {
      id: 1,
      no: '1',
      jam: '07:00:00',
      tanggal: '21/12/2021',
      jeniskejadian: 'Pohon Tumbang',
      uraiankejadian: 'Pohon Tumbang karena angin kencang yang menimpa Mobil Aqya Minibus',
      kota: 'Jakarta Selatan',
      kecamatan: 'Jagakarsa',
      kelurahan: 'Ciganjut',
      meninggal: '0',
      lukalukaberat: '0',
      lukalukaringan: '0',
      terserangpenyakit: '0',
      hilang: '0',
      pengungsi: '0',
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
              <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                Daftar Laporan Kejadian
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
                                <input type="text" className="form-control form-control-solid"
                                  placeholder="Masukkan Kota" />
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
                                <input type="text" className="form-control form-control-solid"
                                  placeholder="Masukkan Kecamatan" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 ">
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4">
                                <label
                                  className="form-label align-middle">Kelurahan</label>
                              </div>
                              <div className="col-8">
                                <input type="text" className="form-control form-control-solid"
                                  placeholder="Masukkan Kelurahan" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12">
                          <div className="d-flex justify-content-end">
                            <label>Pilih Jenis Kejadian</label>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12">
                          <div className="d-flex">
                            <button type="submit" className="btn btn-primary fw-semibold me-auto px-6"
                              data-kt-menu-dismiss="true" data-kt-user-table-filter="filter">
                              <i className="fa fa-search"></i>
                              Cari
                            </button>
                            <a href="#" className="btn btn-sm btn-danger me-2" data-bs-toggle="modal"
                              data-bs-target="#kt_modal_offer_a_deal"><i className="fa-solid fa-trash"></i>Hapus</a>
                            <div className="my-1 me-2">
                              <select className="form-select form-select-sm form-select-solid w-100px"
                                data-control="select2" data-placeholder="Download" data-hide-search="true">
                                <option value="1">Excell</option>
                                <option value="2">Pdf</option>
                              </select>
                            </div>
                            <Link to="/pelaporan/TambahLaporanKejadian">
                              <button className="btn btn-sm btn-success me-2" data-bs-toggle="modal">Tambah
                              </button>
                            </Link>
                            <div className="my-1 me-0">
                              <select className="form-select form-select-sm form-select-solid w-200px"
                                data-control="select2" data-placeholder="Select Hours" data-hide-search="true">
                                <option value="1">Pohon Tumbang</option>
                                <option value="2">Kebakaran</option>
                                <option value="3">Tawuran</option>
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
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="kt_app_footer" className="app-footer">
        <div className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
        </div>
      </div>
    </div>
  )
}
