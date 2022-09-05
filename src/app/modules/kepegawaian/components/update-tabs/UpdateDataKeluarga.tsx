import React, { Fragment, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
// import { Dropdown1 } from '../../../../../_metronic/partials'
import { useLocation } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { Button, ButtonGroup, Dropdown, DropdownButton, Modal } from 'react-bootstrap'


export function UpdateDataKeluarga() {
  const location = useLocation()

  const [show, setShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    {
      name: 'Nama',
      selector: (row: { name: any }) => row.name,
      sortable: true,
    },
    {
      name: 'Hubungan Keluarga',
      selector: (row: { hubungan: any }) => row.hubungan,
      sortable: true,
    },
    {
      name: 'Tempat, Tanggal Lahir',
      selector: (row: { ttl: any }) => row.ttl,
      sortable: true,
    },
    {
      name: 'Jenis Kelamin',
      selector: (row: { jk: any }) => row.jk,
      sortable: true,
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
                    <Dropdown.Item>
                      <Link className="text-reset" to="/#">
                        Ubah
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link className="text-reset" to="/#">
                        Hapus
                      </Link>
                    </Dropdown.Item>
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
      name: 'RAHMI FITRIA ASRIL',
      hubungan: 'Istri',
      ttl: 'JAKARTA, 27-05-1988',
      jk: 'PEREMPUAN',
    },
    {
      id: 2,
      name: 'RAHMI FITRIA ASRIL',
      hubungan: 'Istri',
      ttl: 'JAKARTA, 27-05-1988',
      jk: 'PEREMPUAN',
    },
    {
      id: 3,
      name: 'RAHMI FITRIA ASRIL',
      hubungan: 'Istri',
      ttl: 'JAKARTA, 27-05-1988',
      jk: 'PEREMPUAN',
    },
  ];

  return (

    <div>
      {/* begin::Body */}
      <div className='card mb-5 mb-xl-10'>
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='Metornic' />
                  <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                </div>
                <div className="form-group mt-5">
                  <div className='form-text'>
                    Tipe file yang dibolehkan: png, jpg, jpeg.
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="ini-input"
                  />
                  <label htmlFor="ini-input">
                    <button className="btn btn-sm btn-primary mt-2" data-kt-image-input-action="change"
                      data-bs-toggle="tooltip">Upload</button>
                  </label>
                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                      <a href="/#" className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                        Agus Aprianto
                      </a>
                    </div>

                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      <a
                        href="/#"
                        className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                      >
                        <KTSVG
                          path='/media/icons/duotune/communication/com006.svg'
                          className='svg-icon-4 me-1'
                        />
                        PNS
                      </a>
                      <a
                        href="/#"
                        className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                      >
                        <i className="fas fa-phone"></i
                        >&nbsp;&nbsp;082929929292
                      </a>
                      <a
                        href="/#"
                        className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                      >
                        <KTSVG
                          path='/media/icons/duotune/communication/com011.svg'
                          className='svg-icon-4 me-1'
                        />
                        agux.aprianto@satpol.dki.com
                      </a>
                      <a
                        href="/#"
                        className="d-flex align-items-center text-gray-400 text-hover-primary me-5 ms-5 mb-2"
                      >
                        <i className="fa-solid fa-address-card me-1"></i
                        >PENGELOLA PENGENDALIAN DAN
                        OPERASIONAL
                      </a>
                    </div>
                  </div>

                  {/* <div className='d-flex my-4'>
                <a href="/#" className='btn btn-sm btn-light me-2' id='kt_user_follow_button'>
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr012.svg'
                    className='svg-icon-3 d-none'
                  />

                  <span className='indicator-label'>Follow</span>
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                </a>
                <a
                  href="/#"
                  className='btn btn-sm btn-primary me-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_offer_a_deal'
                >
                  Hire Me
                </a>
                <div className='me-0'>
                  <button
                    className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='top-end'
                  >
                    <i className='bi bi-three-dots fs-3'></i>
                  </button>
                  <Dropdown1 />
                </div>
              </div> */}
                </div>

                <div className='d-flex flex-wrap flex-stack'>
                  <div className='d-flex flex-column flex-grow-1 pe-8'>
                    <div className='d-flex flex-wrap'>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>1</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>Jumlah Anggota Keluarga</div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>S1</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>Pendidikan Tertinggi</div>
                      </div>

                      {/* <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-3 svg-icon-success me-2'
                      />
                      <div className='fs-2 fw-bolder'>60%</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Success Rate</div>
                  </div> */}
                    </div>
                  </div>

                  {/* <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Profile Compleation</span>
                  <span className='fw-bolder fs-6'>50%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{width: '50%'}}
                  ></div>
                </div>
              </div> */}
                </div>
              </div>
            </div>

            <div className='d-flex overflow-auto h-55px'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/UpdateDataPribadi' && 'active')
                    }
                    to='/kepegawaian/UpdateDataPribadi'
                  >
                    Data Pribadi
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/UpdateDataKeluarga' && 'active')
                    }
                    to='/kepegawaian/UpdateDataKeluarga'
                  >
                    Data Keluarga
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/UpdatePendidikan' && 'active')
                    }
                    to='/kepegawaian/UpdatePendidikan'
                  >
                    Pendidikan
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/DataKepegawaian' && 'active')
                    }
                    to='/kepegawaian/DataKepegawaian'
                  >
                    Data Kepegawaian
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/kepegawaian/HirarkiKepegawaian' && 'active')
                    }
                    to='/kepegawaian/HirarkiKepegawaian'
                  >
                    Hirarki Kepegawaian
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Second Card */}
      <div className='card mb-5 mb-xl-10'>
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bold m-0">Data Keluarga</h3>
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
              <Modal.Title id="example-modal-sizes-title-lg">Tambah Data Keluarga</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form id="kt_modal_add_user_form" className="form" action="#">
                <div className="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll"
                  data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}"
                  data-kt-scroll-max-height="auto"
                  data-kt-scroll-dependencies="#kt_modal_add_user_header"
                  data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
                  <div className="fv-row mb-7">
                    <label className="required fw-semibold fs-6 mb-2">Nama</label>
                    <input type="text" name="kode_e" id="kode_id_e"
                      className="form-control form-control-solid mb-3 mb-lg-0" placeholder="Nama"
                      value="" />
                  </div>
                  <div className="fv-row mb-7">
                    <label className="required fw-semibold fs-6 mb-2">Hubungan
                      Keluarga</label>
                    <input type="text" name="jenis_pelanggaran_e"
                      className=" form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="Hubungan Keluarga" value="" />
                  </div>
                  <div className="fv-row mb-7">
                    <div id="kt_docs_repeater_basic">
                      <div className="form-group">
                        <div data-repeater-list="kt_docs_repeater_basic">
                          <div data-repeater-item>
                            <div className="form-group row">
                              <label className="form-label">Tempat, Tanggal Lahir</label>
                              <div className="col-4">
                                <input type="text" className="form-control form-control-solid mb-3 mb-lg-0"
                                  placeholder="Tempat" />
                              </div>
                              <div className="col-8">
                                <input type="date" className="form-control form-control-solid" placeholder="Tanggal Lahir"
                                  value="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="fv-row mb-7 mt-7">
                        <label className="required fw-semibold fs-6 mb-2">Jenis Kelamin</label>
                        <select className="form-select form-select-solid" data-control="select2"
                          data-placeholder="Jenis Kelamin">
                          <option></option>
                          <option value="1">LAKI-LAKI</option>
                          <option value="2">PEREMPUAN</option>
                        </select>
                      </div>
                    </div>
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
                to="/kepegawaian/UpdateDataPribadi"
              >
                <button className="float-none btn btn-success align-self-center m-1">
                  <i className="fa-solid fa-arrow-left"></i>
                  Kembali
                </button>
              </Link>
              <Link
                className="text-reset text-decoration-none"
                to="/kepegawaian/UpdatePendidikan"
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
