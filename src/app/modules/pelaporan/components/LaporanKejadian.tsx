import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import DatePicker from 'react-date-picker';

export function LaporanKejadian() {
  const columns = [
    {
      name: 'No',
      selector: (row: { no: any; }) => row.no,
    },
    {
      name: 'Bidang/Wilayah',
      selector: (row: { bidangwilayah: any; }) => row.bidangwilayah,
    },
    {
      name: 'Jumlah Kejadian',
      selector: (row: { jumlahkejadian: any; }) => row.jumlahkejadian,
    },
    {
      name: 'Banjir',
      selector: (row: { banjir: any; }) => row.banjir,
    },
    {
      name: 'Hewan Buas Dan Berbisa',
      selector: (row: { hewanbuasdanberbisa: any; }) => row.hewanbuasdanberbisa,
    },
    {
      name: 'Kebakaran',
      selector: (row: { kebakaran: any; }) => row.kebakaran,
    },
    {
      name: 'Kecelakaan',
      selector: (row: { kecelakaan: any; }) => row.kecelakaan,
    },
    {
      name: 'Pendampingan Kekerasan Pada Perempuan Dan Anak',
      selector: (row: { pendampingankekerasan: any; }) => row.pendampingankekerasan,
    },
    {
      name: 'Kerusakan Konstruksi',
      selector: (row: { kerusakankonstruksi: any; }) => row.kerusakankonstruksi,
    },
    {
      name: 'Kriminalitas',
      selector: (row: { kriminalitas: any; }) => row.kriminalitas,
    },
    {
      name: 'Pembunuhan',
      selector: (row: { pembunuhan: any; }) => row.pembunuhan,
    },
    {
      name: 'Penemuan Mayat',
      selector: (row: { penemuanmayat: any; }) => row.penemuanmayat,
    },
    {
      name: 'Penyelamatan Orang',
      selector: (row: { penyelamatanorang: any; }) => row.penyelamatanorang,
    },
    {
      name: 'Pohon Tumbang',
      selector: (row: { pohontumbang: any; }) => row.pohontumbang,
    },
    {
      name: 'Tawuran',
      selector: (row: { tawuran: any; }) => row.tawuran,
    },
    {
      name: 'Terorisme',
      selector: (row: { terorisme: any; }) => row.terorisme,
    },
    {
      name: 'Unjuk Rasa',
      selector: (row: { unjukrasa: any; }) => row.unjukrasa,
    },
    {
      name: 'Ket',
      selector: (row: { ket: any; }) => row.ket,
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
      bidangwilayah: 'Jakarta',
      jumlahkejadian: '1',
      banjir: '1',
      hewanbuasdanberbisa: '1',
      kebakaran: '1',
      kecelakaan: '1',
      pendampingankekerasan: '1',
      kerusakankonstruksi: '0',
      kriminalitas: '0',
      pembunuhan: '0',
      penemuanmayat: '0',
      penyelamatanorang: '0',
      pohontumbang: '0',
      tawuran: '0',
      terorisme: '0',
      unjukrasa: '0',
      ket: '',
      aksi: '',
    },
    {
      id: 2,
      no: '1',
      bidangwilayah: 'Jakarta',
      jumlahkejadian: '1',
      banjir: '1',
      hewanbuasdanberbisa: '1',
      kebakaran: '1',
      kecelakaan: '1',
      pendampingankekerasan: '1',
      kerusakankonstruksi: '0',
      kriminalitas: '0',
      pembunuhan: '0',
      penemuanmayat: '0',
      penyelamatanorang: '0',
      pohontumbang: '0',
      tawuran: '0',
      terorisme: '0',
      unjukrasa: '0',
      ket: '',
      aksi: '',
    },
  ];

  var [value, onChange] = useState(new Date()); //Date Picker

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
                              <div className="col-4 pt-2">
                                <label className="form-label">Pelaksana Kegiatan</label>
                              </div>
                              <div className="col-8">
                                <input type="text" className="form-control form-control-solid"
                                  placeholder="Pilih Pelaksana Kegiatan" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4 pt-2">
                                <label
                                  className="form-label align-middle">Tanggal</label>
                              </div>
                              <div className="col-8">
                                <DatePicker className="form-control form-control-solid" onChange={onChange} value={value} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4 pt-2">
                                <label
                                  className="form-label align-middle">Kota</label>
                              </div>
                              <div className="col-8">
                                <input className="form-control form-control-solid" placeholder="Pilih Kota" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4 pt-2">
                                <label
                                  className="form-label align-middle">Jenis Kejadian</label>
                              </div>
                              <div className="col-8">
                                <select className="form-select form-select-solid form-control"
                                  data-control="select2">
                                  <option className='text-muted' value="" disabled selected>Pilih Jenis Kejadian</option>
                                  <option value="banjir">Banjir</option>
                                  <option value="hewan_buas_dan_berbisa">Hewan Buas Dan Berbisa</option>
                                  <option value="kebakaran">Kebakaran</option>
                                  <option value="kecelakaan">Kecelakaan</option>
                                  <option value="pendampingan_kekerasan_pada_perempuan">Pendampingan Kekerasan Pada Perempuan</option>
                                  <option value="kerusakan_konstruksi">Kerusakan Konstruksi</option>
                                  <option value="kriminalitas">Kriminalitas</option>
                                  <option value="pembunuhan">Pembunuhan</option>
                                  <option value="penemuan_mayat">Penemuan Mayat</option>
                                  <option value="penyelamatan_orang">Penyelamatan Orang</option>
                                  <option value="pohon_tumbang">Pohon Tumbang</option>
                                  <option value="tawuran">Tawuran</option>
                                  <option value="terorisme">Terorisme</option>
                                  <option value="unjuk_rasa">Unjuk Rasa</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4 pt-2">
                                <label
                                  className="form-label align-middle">Kecamatan</label>
                              </div>
                              <div className="col-8">
                                <input className="form-control form-control-solid" placeholder="Pilih Kecamatan" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4 pt-2">
                                <label
                                  className="form-label align-middle">Jenis Bantuan</label>
                              </div>
                              <div className="col-8">
                                <select className="form-select form-select-solid form-control"
                                  data-control="select2">
                                  <option value="" disabled selected >Pilih Jenis Bantuan</option>
                                  <option value="dibawa_ke_rumah_sakit">Dibawa Ke Rumah Sakit</option>
                                  <option value="memanggil_pemadam_kebakaran">Memanggil Pemadam Kebakaran</option>
                                  <option value="mengamankan">Mengamankan</option>
                                  <option value="relokasi">Relokasi</option>
                                  <option value="evakuasi">Evakuasi</option>
                                  <option value="dibawa_ke_tempat_penampungan">Dibawa Ke Tempat Penampungan</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4 pt-2">
                                <label
                                  className="form-label align-middle">Kelurahan</label>
                              </div>
                              <div className="col-8">
                                <input type="text" className="form-control form-control-solid"
                                  placeholder="Pilih Kelurahan" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="mb-10">
                            <div className="row">
                              <div className="col-4 pt-2">
                                <label
                                  className="form-label align-middle">Korban Jiwa</label>
                              </div>
                              <div className="col-8">
                                <select className="form-select form-select-solid form-control"
                                  data-control="select2">
                                  <option value="" disabled selected>Pilih Jenis Korban Jiwa</option>
                                  <option value="meninggal">Meninggal</option>
                                  <option value="luka_berat">Luka Berat</option>
                                  <option value="luka_ringan">Luka Ringan</option>
                                  <option value="hilang">Hilang</option>
                                  <option value="terserang_penyakit">Terserang Penyakit</option>
                                  <option value="pengungsi">Pengungsi</option>
                                  <option value="nihil">Nihil</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12">
                          <div className="d-flex">
                            <button type="submit" className="btn btn-sm btn-primary fw-semibold me-auto px-6"
                              data-kt-menu-dismiss="true" data-kt-user-table-filter="filter">
                              <i className="fa fa-search"></i>
                              Cari
                            </button>
                            <Link to="/pelaporan/TambahLaporanKejadian">
                              <a className="btn btn-success me-1" data-bs-toggle="modal"><i
                                className="fa-solid fa-plus"></i>Tambah</a>
                            </Link>
                            <a href="#" className="btn btn-sm btn-danger me-1" data-bs-toggle="modal"><i
                              className="fa-solid fa-trash"></i> Hapus</a>
                            <div className="my-1 me-0">
                              <select className="form-select form-select-sm form-select-solid w-180px"
                                data-control="select2" data-placeholder="Select Hours" data-hide-search="true">
                                <option disabled selected>Unduh</option>
                                <option value="2">Excel</option>
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
              </div>
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
      <div id="kt_app_footer" className="app-footer">
        <div className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
        </div>
      </div>
    </div >
  )
}
