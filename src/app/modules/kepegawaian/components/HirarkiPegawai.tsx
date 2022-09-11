import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

import { useMemo } from 'react'
import { useTable, ColumnInstance, Row } from 'react-table'
import { CustomRow } from './users-list/table/columns/CustomRow'
import { useQueryResponseData, useQueryResponseLoading } from './users-list/core/QueryResponseProvider'
import { usersColumns } from './users-list/table/columns/_columns'
import { User } from './users-list/core/_models'
import { UsersListLoading } from './users-list/components/loading/UsersListLoading'
import { UsersListPagination } from './users-list/components/pagination/UsersListPagination'
import { KTCardBody } from '../../../../_metronic/helpers'
import { CustomHeaderColumn } from './users-list/table/columns/CustomHeaderColumn';

export function HirarkiPegawai() {

  const users = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const columns = useMemo(() => usersColumns, [])
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  })

  const [lgShow, setLgShow] = useState(false);

  const [inputFields, setInputFields] = useState([
    { nrk: '', nama: '' }
  ])

  const handleFormChange = (index: number, event: { preventDefault: () => void; target: { value: string; name: string } }) => {
    let data: any = [...inputFields];
    // console.log(data);
    // console.log(event.target.name);

    data[index][event.target.name] = event.target.value;
    console.log(data)
    setInputFields(data);
  }

  const addFields = () => {
    let newfield = { nrk: '', nama: '' }

    setInputFields([...inputFields, newfield])
  }


  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='card-header border-0 pt-6'>
            <div className='card-title'>
              <div className="d-flex align-items-center position-relative my-1">
                <span className="svg-icon svg-icon-1 position-absolute ms-6">
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height={2} rx={1} transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                  </svg>
                </span>
                <input type="text" data-kt-user-table-filter="search" className="form-control form-control-solid w-250px ps-14" placeholder="Cari pegawai" />
              </div>
            </div>
            <div className="card-toolbar">
              <div className="d-flex justify-content-end" data-kt-user-table-toolbar="base">
                <button type="button" className="btn btn-light-primary me-3" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                  <span className="svg-icon svg-icon-2">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="currentColor" />
                    </svg>
                  </span>Filter
                </button>
                <div className="menu menu-sub menu-sub-dropdown w-300px w-md-325px" data-kt-menu="true">
                  <div className="px-7 py-5">
                    <div className="fs-5 text-dark fw-bold">
                      Pilihan Filter
                    </div>
                  </div>
                  <div className="separator border-gray-200" />
                  <div className="px-7 py-5" data-kt-user-table-filter="form">
                    <div className="mb-10">
                      <label className="form-label fs-6 fw-semibold">Hak Akses:</label>
                      <select className="form-select form-select-solid fw-bold" data-kt-select2="true" data-placeholder="Pilih" data-allow-clear="true" data-kt-user-table-filter="role" data-hide-search="true">
                        <option />
                        <option value="Administrator">
                          Administrator
                        </option>
                        <option value="Analyst">Analyst</option>
                        <option value="Developer">Developer</option>
                        <option value="Support">Support</option>
                        <option value="Trial">Trial</option>
                      </select>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button type="reset" className="btn btn-light btn-active-light-primary fw-semibold me-2 px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="reset">
                        Reset
                      </button>
                      <button type="submit" className="btn btn-primary fw-semibold px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="filter">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn btn-light-primary me-3" data-bs-toggle="modal" data-bs-target="#kt_modal_export_users">
                  <span className="svg-icon svg-icon-2">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect opacity="0.3" x="12.75" y="4.25" width={12} height={2} rx={1} transform="rotate(90 12.75 4.25)" fill="currentColor" />
                      <path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="currentColor" />
                      <path opacity="0.3" d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="currentColor" />
                    </svg>
                  </span>Export
                </button>
                <button type="button" className="btn btn-primary" onClick={() => setLgShow(true)}>
                  <span className="svg-icon svg-icon-2">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect opacity="0.5" x="11.364" y="20.364" width={16} height={2} rx={1} transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                      <rect x="4.36396" y="11.364" width={16} height={2} rx={1} fill="currentColor" />
                    </svg>
                  </span>
                  Tambah Atasan
                </button>
              </div>
              <div className="d-flex justify-content-end align-items-center d-none" data-kt-user-table-toolbar="selected">
                <div className="fw-bold me-5">
                  <span className="me-2" data-kt-user-table-select="selected_count" />Terpilih
                </div>
                <button type="button" className="btn btn-danger" data-kt-user-table-select="delete_selected">
                  Hapus Terpilih
                </button>
              </div>
              <div className="modal fade" id="kt_modal_export_users" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mw-650px">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h2 className="fw-bold">Export Pengguna</h2>
                    </div>
                    <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
                      <form id="kt_modal_export_users_form" className="form" action="#">
                        <div className="fv-row mb-10">
                          <label className="fs-6 fw-semibold form-label mb-2">Pilih Hak Akses:</label>
                          <select name="role" data-control="select2" data-placeholder="Pilih" data-hide-search="true" className="form-select form-select-solid fw-bold">
                            <option />
                            <option value="Administrator">
                              Administrator
                            </option>
                            <option value="Analyst">Analyst</option>
                            <option value="Developer">
                              Developer
                            </option>
                            <option value="Support">Support</option>
                            <option value="Trial">Trial</option>
                          </select>
                        </div>
                        <div className="fv-row mb-10">
                          <label className="required fs-6 fw-semibold form-label mb-2">Pilih Format Export:</label>
                          <select name="format" data-control="select2" data-placeholder="Pilih" data-hide-search="true" className="form-select form-select-solid fw-bold">
                            <option />
                            <option value="excel">Excel</option>
                            <option value="pdf">PDF</option>
                            <option value="cvs">CVS</option>
                            <option value="zip">ZIP</option>
                          </select>
                        </div>
                        <div className="text-center">
                          <button type="reset" className="btn btn-light me-3" data-kt-users-modal-action="cancel">
                            Batal
                          </button>
                          <button type="submit" className="btn btn-primary" data-kt-users-modal-action="submit">
                            <span className="indicator-label">Export</span>
                            <span className="indicator-progress">Harap tunggu...
                              <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    <h2 className="fw-bold">Tambah Atasan</h2>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="modal-content">
                    {/*begin::Modal body*/}
                    <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
                      {/*begin::Form*/}
                      <form id="kt_modal_add_user_form" className="form" action="#">
                        <div className="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_user_header" data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
                          <div className="fv-row mb-7">
                            <label className="fw-semibold fs-6 mb-2">NRK/NPTT/NPJLP</label>
                            <input type="text" name="NRK" className="form-control form-control-solid mb-3 mb-lg-0" placeholder="Masukkan NRK/NPTT/NPJLP" />
                          </div>
                        </div>
                        <div>
                          <label className="fw-semibold fs-6 mb-7">Tambah bawahan</label>
                          {/*begin::Repeater*/}
                          <div id="kt_docs_repeater_basic">
                            {/*begin::Form group*/}
                            {inputFields.map((input, index) => {
                              return (
                                <div className="form-group" key={index}>
                                  <div data-repeater-list="kt_docs_repeater_basic">
                                    <div data-repeater-item>
                                      <div className="form-group row">
                                        <div className="col-md-3">
                                          <label className="form-label">NRK:</label>
                                          <input type="text" name={`nrk`} className="form-control mb-2 mb-md-0" placeholder="Masukkan NRK" value={input.nrk} onChange={event => handleFormChange(index, event)} />
                                        </div>
                                        <div className="col-md-3">
                                          <label className="form-label">Nama:</label>
                                          <input type="text" name={`nama`} className="form-control mb-2 mb-md-0" placeholder="Masukkan Nama" value={input.nama} onChange={event => handleFormChange(index, event)} />
                                        </div>
                                        <div className="col-md-4">
                                          <a href="javascript:;" data-repeater-delete className="btn btn-sm btn-light-danger mt-3 mt-md-8">
                                            <i className="la la-trash-o" />Delete
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                            {/*end::Form group*/}
                            {/*begin::Form group*/}
                            <div className="form-group mt-5" onClick={addFields}>
                              <a href="javascript:;" data-repeater-create className="btn btn-light-primary">
                                <i className="la la-plus" />Add
                              </a>
                            </div>
                            {/*end::Form group*/}
                          </div>
                          {/*end::Repeater*/}
                        </div>
                        {/*end::Scroll*/}
                        {/*begin::Actions*/}
                        <div className="text-center pt-15">
                          <button type="reset" className="btn btn-light me-3" data-kt-users-modal-action="cancel">
                            Batal
                          </button>
                          <button type="submit" className="btn btn-primary" data-kt-users-modal-action="submit">
                            <span className="indicator-label">Simpan</span>
                            <span className="indicator-progress">Harap tunggu...
                              <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>
                          </button>
                        </div>
                        {/*end::Actions*/}
                      </form>
                      {/*end::Form*/}
                    </div>
                    {/*end::Modal body*/}
                  </div>
                  {/*end::Modal content*/}
                </Modal.Body>
              </Modal>
              {/*end::Modal - Add task*/}
            </div>
          </div>
          <div>
            <KTCardBody className='py-4'>
              <div className='table-responsive'>
                <table
                  id='kt_table_users'
                  className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                  {...getTableProps()}
                >
                  <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                      {headers.map((column: ColumnInstance<User>) => (
                        <CustomHeaderColumn key={column.id} column={column} />
                      ))}
                    </tr>
                  </thead>
                  <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                      rows.map((row: Row<User>, i) => {
                        prepareRow(row)
                        return <CustomRow row={row} key={`row-${i}-${row.id}`} />
                      })
                    ) : (
                      <tr>
                        <td colSpan={7}>
                          <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                            No matching records found
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <UsersListPagination />
              {isLoading && <UsersListLoading />}
            </KTCardBody>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}
