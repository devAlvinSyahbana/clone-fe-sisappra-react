import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

export function LaporanTamuDaerah() {
  const columns = [
    {
      name: 'No',
      selector: (row: { no: any; }) => row.no,
    },
    {
      name: 'Pelaksanaan',
      selector: (row: { pelaksanaan: any; }) => row.pelaksanaan,
    },
    {
      name: 'Tanggal Kunjungan',
      selector: (row: { tanggalkunjungan: any; }) => row.tanggalkunjungan,
    },
    {
      name: 'Waktu Mulai Kunjungan',
      selector: (row: { waktumulaikunjungan: any; }) => row.waktumulaikunjungan,
    },
    {
      name: 'Waktu Selesai Kunjungan',
      selector: (row: { waktuselesaikunjungan: any; }) => row.waktuselesaikunjungan,
    },
    {
      name: 'Asal Instansi',
      selector: (row: { asalinstansi: any; }) => row.asalinstansi,
    },
    {
      name: 'Jumlah Pengunjung',
      selector: (row: { jumlahpengunjung: any; }) => row.jumlahpengunjung,
    },
    {
      name: 'Maksud Tujuan',
      selector: (row: { maksudtujuan: any; }) => row.maksudtujuan,
    },
    {
      name: 'Pejabat Penerima Kunjungan',
      selector: (row: { pejabatpenerimakunjungan: any; }) => row.pejabatpenerimakunjungan,
    },
    {
      name: 'Tempat Kunjungan',
      selector: (row: { tempatkunjungan: any; }) => row.tempatkunjungan,
    },
    {
      name: 'Dokumentasi',
      selector: (row: { dokumentasi: any; }) => row.dokumentasi,
    },
    {
      name: 'Aksi',
      sortable: false,
      text: "Action",
      className: "action",
      align: "left",
      cell: (record: any) => {
        return (
          <Fragment>

            <div className="mb-2">
              {[DropdownButton].map((DropdownType, idx) => (
                <>
                  <DropdownType
                    as={ButtonGroup}
                    key={idx}
                    id={`dropdown-button-drop-${idx}`}
                    size="sm"
                    variant="light"
                    title="Aksi">
                    <Dropdown.Item href="/#/action-2">Detail</Dropdown.Item>
                    <Dropdown.Item href="/#/action-2">Ubah</Dropdown.Item>
                    <Dropdown.Item href="/#/action-2">Hapus</Dropdown.Item>
                  </DropdownType>
                </>
              ))}
            </div>
          </Fragment>
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      no: '1',
      pelaksanaan: '20/12/2021',
      tanggalkunjungan: '07:00:00',
      waktumulaikunjungan: '08:00:00',
      waktuselesaikunjungan: 'A',
      asalinstansi: '1',
      jumlahpengunjung: 'A',
      maksudtujuan: 'A',
      pejabatpenerimakunjungan: 'A',
      tempatkunjungan: 'A',
      dokumentasi: 'A',
    },
    {
      id: 2,
      no: '2',
      pelaksanaan: '21/12/2021',
      tanggalkunjungan: '07:00:00',
      waktumulaikunjungan: '08:00:00',
      waktuselesaikunjungan: 'A',
      asalinstansi: '1',
      jumlahpengunjung: 'A',
      maksudtujuan: 'A',
      pejabatpenerimakunjungan: 'A',
      tempatkunjungan: 'A',
      dokumentasi: 'A',
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
                Daftar Laporan Tamu Daerah
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
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                  <div className="mb-10">
                                    <div className="row">
                                      <div className="col-4">
                                        <label htmlFor="exampleFormControlInput1"
                                          className="form-label align-middle">Pelaksanaan
                                          Kegiatan</label>
                                      </div>
                                      <div className="col-8">
                                        <select className="form-select form-select-solid" data-control="select2"
                                          data-placeholder="Pilih Pelaksanaan Kegiatan">
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
                                <div className="row">
                                  <div className="col-4">
                                    <label className="form-label">Kota</label>
                                  </div>
                                  <div className="col-8">
                                    <select className="form-select form-select-solid" data-control="select2"
                                      data-placeholder="Pilih Kota">
                                      <option></option>
                                      <option value="a">Kota Jakarta Utara
                                      </option>
                                      <option value="b">Kota Jakarta Selatan
                                      </option>
                                      <option value="a">Kota Jakarta Timur
                                      </option>
                                      <option value="b">Kota Jakarta Barat
                                      </option>
                                      <option value="a">Kota Jakarta Selatan
                                      </option>
                                      <option value="b">Kabupaten Kepulauan Seribu
                                      </option>
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
                        <div className="col-md-12 col-lg-12 col-sm-12">
                          <div className="d-flex">
                            <button type="submit" className="btn btn-primary fw-semibold me-auto px-6"
                              data-kt-menu-dismiss="true" data-kt-user-table-filter="filter">
                              <i className="fa-solid fa-rotate"></i>
                              Reset
                            </button>
                            <button type="submit" className="btn btn-primary fw-semibold px-6 me-1"
                              data-kt-menu-dismiss="true" data-kt-user-table-filter="filter">
                              <i className="fa-solid fa-filter"></i>
                              Filter
                            </button>
                            <Link to="/pelaporan/TambahTamuDaerah">
                            <button className="btn btn-sm btn-primary me-1" data-bs-toggle="modal"><i
                                  className="fa-solid fa-plus"></i>
                                Tambah
                              </button>
                              </Link>
                            <div className="my-1 me-0">
                              <select className="form-select form-select-sm form-select-solid w-100px"
                                data-control="select2" data-placeholder="Download" data-hide-search="true">
                                <option value="1">Excell</option>
                                <option value="2">Pdf</option>
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
                <div className="row">
                  <div className="col fs-4 mb-2 fw-semibold text-center">
                    REKAPITULASI TAMU DAERAH
                  </div>
                </div>
                <div className="row">
                  <div className="col fs-4 mb-2 fw-semibold text-center">
                    PADA SATPOL PP......................................
                  </div>
                </div>
                <div className="row">
                  <div className="col fs-4 mb-6 fw-semibold text-center">
                    PERIODE .................... s/d .......................
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
      </div>
    </div>
  )
}
