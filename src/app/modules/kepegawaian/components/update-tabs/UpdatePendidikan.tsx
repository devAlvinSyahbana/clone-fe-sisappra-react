import React, { Fragment, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
// import { Dropdown1 } from '../../../../../_metronic/partials'
import { useLocation } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { Button, ButtonGroup, Dropdown, DropdownButton, Modal } from 'react-bootstrap'


export function UpdatePendidikan() {
  const location = useLocation()

  const [show, setShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    {
      name: 'Jenis Pendidikan',
      selector: (row: { pendidikan: any }) => row.pendidikan,
      sortable: true,
    },
    {
      name: 'Nama Sekolah',
      selector: (row: { namaSekolah: any }) => row.namaSekolah,
      sortable: true,
    },
    {
      name: 'Nomor Ijazah',
      selector: (row: { nomorIjazah: any }) => row.nomorIjazah,
      sortable: true,
    },
    {
      name: 'Tanggal Ijazah',
      selector: (row: { tglIjazah: any }) => row.tglIjazah,
      sortable: true,
    },
    {
      name: 'Jurusan',
      selector: (row: { jurusan: any }) => row.jurusan,
      sortable: true,
    },
    {
      name: 'Fakultas',
      selector: (row: { fakultas: any }) => row.fakultas,
      sortable: true,
    },
    {
      name: 'File Ijazah',
      sortable: false,
      text: "Action",
      className: "action",
      align: "left",
      cell: (record: any) => {
        return (
          <Fragment>
            <Link to="/#">Lihat</Link>
          </Fragment>
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      pendidikan: '	SMA',
      namaSekolah: 'SMA Tegar Beriman',
      nomorIjazah: '090909090909',
      tglIjazah: '18-09-1999',
      jurusan: 'RPL',
      fakultas: 'Rekayasa Perangkat Lunak',
    },
  ];

  return (

    <div>
      {/* begin::Body */}

      {/* Second Card */}
      <div className='card mb-5 mb-xl-10'>
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bold m-0">Pendidikan</h3>
          </div>
        </div>
        <div className="card-body p-9">
          <div className="d-flex justify-content-end">
            <Button type="reset" onClick={() => setLgShow(true)} className="btn btn-primary fw-semibold me-2 px-6">
              <i className="fa fa-plus"></i>
              Tambah
            </Button>
          </div>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">Tambah Pendidikan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form id="kt_modal_add_user_form" className="form" action="#">
                <div className="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll"
                  data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}"
                  data-kt-scroll-max-height="auto"
                  data-kt-scroll-dependencies="#kt_modal_add_user_header"
                  data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
                  <div className="fv-row mb-7">
                    <label className="required fw-semibold fs-6 mb-2">Jenis Pendidikan</label>
                    <input type="text" name="kode_e" id="kode_id_e"
                      className="form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="Jenis Pendidikan" value="" />
                  </div>
                  <div className="fv-row mb-7">
                    <label className="required fw-semibold fs-6 mb-2">Nama Sekolah / Universitas</label>
                    <input type="text" name="jenis_pelanggaran_e"
                      className=" form-control form-control-solid mb-3 mb-lg-0" placeholder="Nama Sekolah/Universitas" value="" />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="fv-row mb-7">
                        <label className="required fw-semibold fs-6 mb-2">No. Ijazah</label>
                        <input type="text" name="jenis_pelanggaran_e"
                          className=" form-control form-control-solid mb-3 mb-lg-0" placeholder="No. Ijazah" value="" />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="fv-row mb-7">
                        <div id="kt_docs_repeater_basic">
                          <div className="form-group">
                            <div data-repeater-list="kt_docs_repeater_basic">
                              <div data-repeater-item>
                                <div className="form-group row">
                                  <label className="form-label">Tanggal Ijazah</label>
                                  <input className="form-control form-control-solid"
                                    placeholder="Tanggal Lahir" id="kt_datepicker_2" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fv-row mb-7">
                    <label className="required fw-semibold fs-6 mb-2">Jurusan</label>
                    <input type="text" name="jenis_pelanggaran_e" className=" form-control form-control-solid mb-3 mb-lg-0" placeholder="No. Ijazah" value="" />
                  </div>
                  <div className="fv-row mb-7">
                    <label className="required fw-semibold fs-6 mb-2">Fakultas</label>
                    <input type="text" className=" form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="No. Ijazah" value="" />
                  </div>
                  <div className="fv-row mb-7">
                    <label className="required fw-semibold fs-6 mb-2">File Ijazah</label>
                    <input type="FIle" className=" form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="" value="" />
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Discard
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
          <DataTable
            columns={columns}
            data={data}
            defaultSortFieldId={1}
          />
          <div className="p-0 mt-6">
            <div className="text-center">
              <Link
                className="text-reset text-decoration-none"
                to="/kepegawaian/UpdateInformasiDataPegawai"
              >
                <button className="float-none btn btn-secondary align-self-center m-1">
                  <i className="fa fa-close"></i>
                  Batal
                </button>
              </Link>
              <Link
                className="text-reset text-decoration-none"
                to="/kepegawaian/UpdateDataKeluarga"
              >
                <button className="float-none btn btn-success align-self-center m-1">
                  <i className="fa-solid fa-arrow-left"></i>
                  Kembali
                </button>
              </Link>
              <Link
                className="text-reset text-decoration-none"
                to="/kepegawaian/UpdateDataKepegawaian"
              >
                <button className="float-none btn btn-primary align-self-center m-1">
                  <i className="fa-solid fa-arrow-right"></i>
                  Lanjut
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}
