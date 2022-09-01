import React, { Fragment } from 'react'
import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ButtonGroup } from 'react-bootstrap';

export function LaporanPengawasan() {
  const columns = [
    {
      name: 'No',
      selector: (row: { no: any; }) => row.no,
    },
    {
      name: 'Tanggal Pelaporan',
      selector: (row: { tanggalpelaporan: any; }) => row.tanggalpelaporan,
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
      name: 'Jenis Pengawasan',
      selector: (row: { jenispengawasan: any; }) => row.jenispengawasan,
    },
    {
      name: 'Deskripsi',
      selector: (row: { deskripsi: any; }) => row.deskripsi,
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
      tanggalpelaporan: '20/12/2021',
      kota: 'A',
      kecamatan: '1',
      kelurahan: 'A',
      jenispengawasan: 'A',
      deskripsi: 'A',
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
                Tambah Laporan Pengawasan
              </h1>
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
                              <div className="row">
                                <div className="col-4">
                                  <label
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
                          <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="d-flex">
                              <button type="submit"
                                className="btn btn-primary fw-semibold me-auto px-6"
                                data-kt-menu-dismiss="true"
                                data-kt-user-table-filter="filter">
                                <i className="fa-solid fa-rotate"></i>
                                Reset
                              </button>
                              <button type="submit"
                                className="btn btn-primary fw-semibold px-6 me-1"
                                data-kt-menu-dismiss="true"
                                data-kt-user-table-filter="filter">
                                <i className="fa-solid fa-filter"></i>
                                Filter
                              </button>
                              <a href="../../demo1/dist/sisappra/laporan/laporan-pengawasan/creat.html"
                                className="btn btn-sm btn-primary me-1"
                                data-bs-toggle="modal"><i
                                  className="fa-solid fa-plus"></i>
                                Tambah</a>
                              <div className="my-1 me-0">
                                <select
                                  className="form-select form-select-sm form-select-solid w-100px"
                                  data-control="select2"
                                  data-placeholder="Download"
                                  data-hide-search="true">
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
