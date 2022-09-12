import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

export function LaporanKegiatan() {
  const columns = [
    {
      name: 'No',
      selector: (row: { no: any; }) => row.no,
    },
    {
      name: 'Pelaksanaan Bidang / Wilayah',
      selector: (row: { pelaksanaan: any; }) => row.pelaksanaan,
    },
    {
      name: 'Jumlah Pengawasan dan Pendidikan',
      selector: (row: { jmlhpengawasandanpendidikan: any; }) => row.jmlhpengawasandanpendidikan,
    },
    {
      name: 'Denda',
      selector: (row: { denda: any; }) => row.denda,
    },
    {
      name: 'Keterangan',
      selector: (row: { keterangan: any; }) => row.keterangan,
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
      pelaksanaan: 'Kota Administrasi Jakarta Pusat',
      jmlhpengawasandanpendidikan: '',
      denda: '',
      keterangan: '',
    },
    {
      id: 2,
      no: '2',
      pelaksanaan: 'Kota Administrasi Jakarta Utara',
      jmlhpengawasandanpendidikan: '',
      denda: '',
      keterangan: '',
    },
    {
      id: 3,
      no: '3',
      pelaksanaan: 'Kota Administrasi Jakarta Barat',
      jmlhpengawasandanpendidikan: '',
      denda: '',
      keterangan: '',
    },
    {
      id: 4,
      no: '4',
      pelaksanaan: 'Kota Administrasi Jakarta Selatan',
      jmlhpengawasandanpendidikan: '',
      denda: '',
      keterangan: '',
    },
    {
      id: 5,
      no: '5',
      pelaksanaan: 'Kota Administrasi Jakarta Timur',
      jmlhpengawasandanpendidikan: '',
      denda: '',
      keterangan: '',
    },
    {
      id: 6,
      no: '6',
      pelaksanaan: 'Kabupaten Administrasi Kepulauan Seribu',
      jmlhpengawasandanpendidikan: '',
      denda: '',
      keterangan: '',
    },
    {
      id: 7,
      no: '',
      pelaksanaan: 'Jumlah',
      jmlhpengawasandanpendidikan: '',
      denda: '',
      keterangan: '',
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
                                    <label className="form-label">Pelaksanaan
                                      Kegiatan</label>
                                  </div>
                                  <div className="col-8">
                                    <select className="form-select form-select-solid" data-control="select2"
                                      data-placeholder="Pilih">
                                      <option></option>
                                      <option value="a">-</option>
                                      <option value="b">-</option>
                                      <option value="a">-</option>
                                      <option value="b">-</option>
                                      <option value="a">-</option>
                                      <option value="b">-</option>
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
                                    <label className="form-label align-middle">Kota</label>
                                  </div>
                                  <div className="col-8">
                                    <select className="form-select form-select-solid" data-control="select2"
                                      data-placeholder="Pilih">
                                      <option></option>
                                      <option value="a">Kota Jakarta Utara</option>
                                      <option value="b">Kota Jakarta Selatan</option>
                                      <option value="a">Kota Jakarta Timur</option>
                                      <option value="b">Kota Jakarta Barat</option>
                                      <option value="a">Kabupaten Kepulauan Seribu</option>
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
                                      <label className="form-label align-middle">Jenis
                                        Kegiatan</label>
                                    </div>
                                    <div className="col-8">
                                      <select className="form-select form-select-solid" data-control="select2"
                                        data-placeholder="Pilih">
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
                                </div>
                              </div>
                              <div className="col-md-6 col-lg-6">
                              </div>
                              <div className="col-md-12 col-lg-12 col-sm-12">
                                <div className="mb-10">
                                  <div className="row">
                                    <div className="col-4">
                                      <label className="form-label align-middle">Jenis
                                        Penertiban</label>
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
                              <div className="col-md-6 col-lg-6">
                              </div>
                              <div className="col-md-12 col-lg-12 col-sm-12">
                                <div className="mb-10">
                                  <div className="row">
                                    <div className="col-4">
                                      <label className="form-label align-middle">Jenis
                                        Perda</label>
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
                                  <button className="btn btn-sm btn-primary me-1" data-bs-toggle="modal"><i
                                  className="fa-solid fa-plus"></i>
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
                  </div>
                  <div className="card-body py-4">
                    <div id="myDIV">
                      <div className="row">
                        <div className="col fs-4 mb-2 fw-semibold text-center">
                          LAPORAN HASIL KEGIATAN
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
                      <DataTable
                    columns={columns}
                    data={data}
                    pagination
                  />
                      <div className="row">
                        <div className="col-8"></div>
                        <div className="col-4 fs-6 mb-2 fw-semibold text-center">
                          Jakarta, ..............................20...
                          <div className="col fs-6 mb-15 fw-semibold text-center">
                            KEPALA SATUAN POLISI PAMONG PRAJA
                            ...............................................................
                          </div>
                          <div className="col fs-6 mb-2 fw-semibold text-center">
                            NAMA
                          </div>
                          <div className="col fs-6 mb-2 fw-semibold text-center">
                            NIP. ......................
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

  )
}
