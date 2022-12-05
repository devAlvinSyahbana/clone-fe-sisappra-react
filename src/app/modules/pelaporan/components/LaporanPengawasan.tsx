import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ButtonGroup } from 'react-bootstrap';
import { Button } from 'bootstrap';

export function LaporanPengawasan() {
  const columns = [
    {
      name: 'No',
      selector: (row: { no: any; }) => row.no,
    },
    {
      name: 'NRK',
      selector: (row: { nrk: any; }) => row.nrk,
    },
    {
      name: 'Nama',
      selector: (row: { nama: any; }) => row.nama,
    },
    {
      name: 'Tanggal Pengecekan',
      selector: (row: { tanggalpengecekan: any; }) => row.tanggalpengecekan,
    },
    {
      name: 'Share Location',
      selector: (row: { shareloc: any; }) => row.shareloc,
    },
    {
      name: 'Alamat',
      selector: (row: { alamat: any; }) => row.alamat,
    },
    {
      name: 'Lokasi Tiang',
      selector: (row: { lokasitiang: any; }) => row.lokasitiang,
    },
    {
      name: 'Kawasan Kendali',
      selector: (row: { kawasankendali: any; }) => row.kawasankendali,
    },
    {
      name: 'Status',
      selector: (row: { status: any; }) => row.status,
    },
    {
      name: 'Ukuran',
      selector: (row: { ukuran: any; }) => row.ukuran,
    },
    {
      name: 'Pemilik Reklame',
      selector: (row: { pemilikreklame: any; }) => row.pemilikreklame,
    },
    {
      name: 'Konstruksi Reklame',
      selector: (row: { konstruksireklame: any; }) => row.konstruksireklame,
    },
    {
      name: 'Konten Iklan',
      selector: (row: { konteniklan: any; }) => row.konteniklan,
    },
    {
      name: 'Dokumentasi',
      selector: (row: { docs: any; }) => row.docs,
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
      nrk: '166665',
      nama: 'Irwan Novyanto',
      tanggalpengecekan: '08-01-2021',
      shareloc: 'Lat: -6.1821440999999995, Long: 106.8284776',
      alamat: 'Jalan Kebon Sirih 22, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
      lokasitiang: 'testibg',
      kawasankendali: 'Kendali Ketat',
      status: 'Aktif',
      ukuran: '6x10',
      pemilikreklame: 'a',
      konstruksireklame: 'a',
      konteniklan: 'a',
      docs: '',
    },
    {
      id: 2,
      no: '2',
      nrk: '166721',
      nama: 'Udi Hartono',
      tanggalpengecekan: '28-05-2021',
      shareloc: 'Lat: -6.1833066, Long: 106.8282431',
      alamat: 'Jalan Kebon Sirih 77A, Kebon Sirih, Kecamatan Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
      lokasitiang: 'Balkot',
      kawasankendali: 'Ketat',
      status: 'Tidak',
      ukuran: '10x10',
      pemilikreklame: 'PT.a',
      konstruksireklame: 'PT.b',
      konteniklan: 'Sampo',
      docs: '',
    },
    {
      id: 3,
      no: '3',
      nrk: '166665',
      nama: 'Irwan Novyanto',
      tanggalpengecekan: '24-09-2021',
      shareloc: 'Lat: -6.346061, Long: 106.89405099999999',
      alamat: 'Jalan Hankam Munjul 73, Munjul, Kecamatan Cipayung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta',
      lokasitiang: 'Menempel Gedung',
      kawasankendali: 'Sedang',
      status: 'Aktif',
      ukuran: '2x5',
      pemilikreklame: 'aaa',
      konstruksireklame: 'ads',
      konteniklan: 'Rokok',
      docs: '',
    },
    {
      id: 4,
      no: '4',
      nrk: '166665',
      nama: 'Irwan Novyanto',
      tanggalpengecekan: '24-01-2022',
      shareloc: 'Lat: -6.1820642, Long: 106.8284563',
      alamat: 'Jalan Kebon Sirih No.22, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
      lokasitiang: 'Berdiri Sendiri',
      kawasankendali: 'Kendali Ketat',
      status: 'Aktif',
      ukuran: '4x6',
      pemilikreklame: 'aa',
      konstruksireklame: 'abc',
      konteniklan: 'Elektronik',
      docs: '',
    },
    {
      id: 5,
      no: '5',
      nrk: '166665',
      nama: 'Irwan Novyanto',
      tanggalpengecekan: '15-03-2022',
      shareloc: 'Lat: -6.1820642, Long: 106.8284563',
      alamat: 'Jalan Kebon Sirih No.22, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
      lokasitiang: 'Berdiri Sendiri',
      kawasankendali: 'Ketat',
      status: 'Aktif',
      ukuran: '4x6',
      pemilikreklame: 'asik',
      konstruksireklame: 'PT.xxx',
      konteniklan: 'Sampo',
      docs: '',
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
              <h1
                className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                Laporan Pengawasan
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
                            <rect opacity="0.5" x="18" y="13" width="13" height="2"
                              rx="1" transform="rotate(-180 18 13)"
                              fill="currentColor" />
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
                                    <select
                                      className="form-select form-select-solid"
                                      data-control="select2"
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
                                <label htmlFor="exampleFormControlInput1"
                                  className="form-label">Kota</label>
                              </div>
                              <div className="col-8">
                                <select className="form-select form-select-solid"
                                  data-control="select2"
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
                                <label htmlFor="exampleFormControlInput1"
                                  className="form-label align-middle">Tanggal</label>
                              </div>
                              <div className="col-8">
                                <input className="form-control form-control-solid"
                                  placeholder="Pilih tanggal"
                                  id="kt_daterangepicker_tgl" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4">
                                <label htmlFor="exampleFormControlInput1"
                                  className="form-label align-middle">Kecamatan</label>
                              </div>
                              <div className="col-8">
                                <select className="form-select form-select-solid"
                                  data-control="select2"
                                  data-placeholder="Pilih Kecamatan">
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
                                  <label htmlFor="exampleFormControlInput1"
                                    className="form-label align-middle">Kelurahan</label>
                                </div>
                                <div className="col-8">
                                  <select
                                    className="form-select form-select-solid"
                                    data-control="select2"
                                    data-placeholder="Pilih Kelurahan">
                                    <option></option>
                                    <option value="a">Kelapa Gading Barat
                                    </option>
                                    <option value="b">Kepala Gading Timur
                                    </option>
                                    <option value="a">Pegangsaan Dua
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
                                  <label htmlFor="exampleFormControlInput1"
                                    className="form-label align-middle">Kawasan
                                    Kendali</label>
                                </div>
                                <div className="col-8">
                                  <select
                                    className="form-select form-select-solid"
                                    data-control="select2"
                                    data-placeholder="Pilih Kawasan Kendali">
                                    <option></option>
                                    <option value="22">
                                      Kawasan Kendali Ketat
                                    </option>
                                    <option value="23">
                                      Kawasan Kendali Sedang
                                    </option>
                                    <option value="24">
                                      Kawasan Kendali Rendah
                                    </option>
                                    <option value="24">
                                      Kawasan Khusus
                                    </option>
                                    <option value="24">
                                      Kawasan Tanpa Penyelenggaraan
                                      Reklame
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="mb-10">
                              <div className="row">
                                <div className="col-4">
                                  <label htmlFor="exampleFormControlInput1"
                                    className="form-label align-middle">Jenis
                                    Reklame</label>
                                </div>
                                <div className="col-8">
                                  <select
                                    className="form-select form-select-solid"
                                    data-control="select2"
                                    data-placeholder="Pilih Jenis Reklame">
                                    <option></option>
                                    <option value="22">
                                      Reklame Papan/Billboard
                                    </option>
                                    <option value="23">
                                      Reklame Megatron, Videotron, LED
                                    </option>
                                    <option value="25">
                                      Reklame Kain
                                    </option>
                                    <option value="26">
                                      Reklame Melekat (Stiker)
                                    </option>
                                    <option value="27">
                                      Reklame Selebaran
                                    </option>
                                    <option value="28">
                                      Reklame Berjalan/Kendaraan
                                    </option>
                                    <option value="29">
                                      Reklame Udara
                                    </option>
                                    <option value="30">
                                      Reklame Kain
                                    </option>
                                    <option value="31">
                                      Reklame Suara
                                    </option>
                                    <option value="32">
                                      Reklame Film/Slide
                                    </option>
                                    <option value="33">
                                      Reklame Peragaan
                                    </option>
                                    <option value="34">
                                      Reklame Apung
                                    </option>
                                    <option value="35">
                                      Reklame Grafiti
                                    </option>
                                    <option value="36">
                                      Reklame Lainnya
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="mb-10">
                              <div className="row">
                                <div className="col-4">
                                  <label htmlFor="exampleFormControlInput1"
                                    className="form-label align-middle">Status
                                    Reklame</label>
                                </div>
                                <div className="col-8">
                                  <select
                                    className="form-select form-select-solid"
                                    data-control="select2"
                                    data-placeholder="Pilih Status Reklame">
                                    <option></option>
                                    <option value="22">
                                      Aktif
                                    </option>
                                    <option value="23">
                                      Tidak Aktif
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-lg-12 col-sm-12">
                            <div className="d-flex">
                              <button type="submit"
                                className="btn btn-primary fw-semibold me-auto px-6"
                                data-kt-menu-dismiss="true"
                                data-kt-user-table-filter="filter">
                                <i className="fa fa-search"></i>
                                Cari
                              </button>
                              <a href="#" className="btn btn-sm btn-danger me-1"
                                data-bs-toggle="modal"><i
                                  className="fa-solid fa-trash"></i> Hapus</a>
                              <div className="my-1 me-0">
                                <select
                                  className="form-select form-select-sm form-select-solid w-180px"
                                  data-control="select2"
                                  data-placeholder="Select Hours"
                                  data-hide-search="true">
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
                <div className="row">
                  <div className="col fs-4 mb-2 fw-semibold text-center">
                    LAPORAN HASIL PENGAWASAN REKLAME
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
