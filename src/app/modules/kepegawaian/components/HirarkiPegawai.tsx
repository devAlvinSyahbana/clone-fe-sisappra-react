import React, { useEffect, useState } from 'react'
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
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { SelectOptionAutoCom } from './KepegawaianInterface'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const ATASAN_URL = `${API_URL}/kepegawaian`

export function HirarkiPegawai() {

  const users = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const columns = useMemo(() => usersColumns, [])
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  })
  const { id, status } = useParams()
  console.log('id, status', id, status)
  const [lgShow, setLgShow] = useState(false);
  const [inputValAtasan, setDataPegawai] = useState({ label: '', value: null })

  const initialValues = {
    friends: [
      {
        nrk: '',
        nama: '',
      },
    ],
  };

  // Autocomplete Pegawai
  const filterPegawai = async (inputValue: string) => {
    const response = await axios.get(`${ATASAN_URL}/auto-search-pegawai?status=${inputValue}&nomor=${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({ label: i.no_pegawai + " - " + i.nama, value: i.id }))
  }
  const loadOptionsPegawai = (inputValue: string, callback: (options: SelectOptionAutoCom[]) => void) => {
    setTimeout(async () => {
      callback(await filterPegawai(inputValue))
    }, 1000)
  }
  const handleInputPegawai = (newValue: any) => {
    setDataPegawai((prevstate: any) => ({ ...prevstate, ...newValue }))
  }

  return (
    <>
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
                    <Formik
                      initialValues={initialValues}
                      onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        alert(JSON.stringify(values, null, 2));
                      }}
                    >
                      {({ values }) => (
                        <Form>
                          <FieldArray name="friends">
                            {({ insert, remove, push }) => (
                              <div>
                                <div className="modal-content">
                                  <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
                                    <div className="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_user_header" data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
                                      <div className="fv-row mb-7">
                                        <label className="fw-semibold fs-6 mb-2">NRK/NPTT/NPJLP</label>
                                        <AsyncSelect
                                          cacheOptions
                                          loadOptions={loadOptionsPegawai}
                                          defaultOptions
                                          onChange={handleInputPegawai}
                                          placeholder={'Masukkan NRK/NPTT/NPJLP'}
                                        />
                                      </div>
                                    </div>
                                    <label className="fw-semibold fs-6 mb-7">Tambah bawahan</label>
                                    {values.friends.length > 0 &&
                                      values.friends.map((friend, index) => (


                                        <div className='form-group mb-5'>
                                          <div className="row" key={index}>
                                            <div className="col-md-5">
                                              <label className="form-label">NRK:</label>
                                              <AsyncSelect
                                                cacheOptions
                                                loadOptions={loadOptionsPegawai}
                                                defaultOptions
                                                onChange={handleInputPegawai}
                                                placeholder={'Masukkan NRK/NPTT/NPJLP'}
                                              />
                                              {/* <Field
                                                name={`friends.${index}.nama`}
                                                className="form-control mb-2 mb-md-0"
                                                placeholder="Masukkan NRK/NPTT/NPJLP"
                                                type="text"
                                              /> */}
                                              <ErrorMessage
                                                name={`friends.${index}.nama`}
                                                component="div"
                                                className="field-error"
                                              />
                                            </div>
                                            <div className="col-md-4">
                                              <label className="form-label">Nama:</label>
                                              <AsyncSelect
                                                cacheOptions
                                                loadOptions={loadOptionsPegawai}
                                                defaultOptions
                                                onChange={handleInputPegawai}
                                                placeholder={'Masukkan Nama'}
                                              />
                                              {/* <Field
                                                name={`friends.${index}.nrk`}
                                                className="form-control mb-2 mb-md-0"
                                                placeholder="Masukkan Nama"
                                                type="text"
                                                readonly
                                              /> */}
                                              <ErrorMessage
                                                name={`friends.${index}.nama`}
                                                component="div"
                                                className="field-error"
                                              />
                                            </div>
                                            <div className="col-md-3">
                                              <button
                                                type="button"
                                                className="btn btn-sm btn-light-danger mt-3 mt-md-8"
                                                onClick={() => remove(index)}
                                              >
                                                <i className="la la-trash-o" />
                                                Delete
                                              </button>
                                            </div>
                                          </div>
                                        </div>

                                      ))}
                                    <div className="form-group mt-5">
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-light-primary"
                                        onClick={() => push({ name: '', email: '' })}
                                      >
                                        <i className="la la-plus" />
                                        Tambah
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </FieldArray>
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
                        </Form>
                      )}
                    </Formik>
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
    </>
  )
}
