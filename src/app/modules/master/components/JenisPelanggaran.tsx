import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import DataTable, { createTheme } from 'react-data-table-component';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {ThemeModeComponent} from '../../../../_metronic/assets/ts/layout'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import {useFormik} from 'formik'
import {KTSVG} from '../../../../_metronic/helpers'
import clsx from 'clsx'

// API
const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const JENIS_PELANGGARAN_URL = `${API_URL}/master/Jenis-pelanggaran` //http://localhost:3000/Jenis-pelanggaran

// Theme for dark or light interface
createTheme(
  'darkMetro',
  {
    text: {
      primary: '#92929f',
      secondary: '#92929f',
    },
    background: {
      default: '#1e1e2e',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#2b2c41',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  },
  'dark'
)
const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

const reactSelectLightThem = {
  input: (base: object) => ({
    ...base,
    color: '#5e6278',
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
  container: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    color: '#cccccc',
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: '#cccccc',
  }),
  control: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
    boxShadow: '0 0 0 1px #f5f8fa',
  }),
  singleValue: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
  }),
  option: (base: object) => ({
    ...base,
    height: '100%',
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
}

const reactSelectDarkThem = {
  input: (base: object) => ({
    ...base,
    color: '#92929f',
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
  container: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    color: '#92929f',
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: '#92929f',
  }),
  control: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
    boxShadow: '0 0 0 1px #1b1b29',
  }),
  singleValue: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
  }),
  option: (base: object) => ({
    ...base,
    height: '100%',
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
}
const customStyles = {
  rows: {
    style: {
      minHeight: '105px', // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: '14px', // override the cell padding for head cells
      paddingRight: '14px',
    },
  },
  cells: {
    style: {
      paddingLeft: '14px', // override the cell padding for data cells
      paddingRight: '14px',
    },
  },
}

export interface FormInput {
  jenis_pelanggaran?: string
}

const validatorForm = Yup.object().shape({

  jenis_pelanggaran: Yup.string().required('Wajib diisi'),
})

export function JenisPelanggaran() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [valFilterJenisPelanggaran, setFilterJenisPelanggaran] = useState({val: ''})
  
  const [data, setData] = useState([])
  const [temp, setTemp] = useState([])
  const [loading, setLoading] = useState(false)
  const [qParamFind, setUriFind] = useState({strparam: ''})
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  // const handleShow = () => setShow(true);

  const handleFilter = async () => {
    //3
    let uriParam = ''
    if (valFilterJenisPelanggaran.val !== '') {
      uriParam += `${valFilterJenisPelanggaran.val}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleFilterReset = () => {
    setFilterJenisPelanggaran({val: ''})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const handleChangeInputJenisPelanggaran = (event: {
    //5
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterJenisPelanggaran({val: event.target.value})
  }

  // START : CRUD
  const LoadingAnimation = (props: any) => {
    return (
      <>
        <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
          {/* <span className="svg-icon svg-icon-2hx svg-icon-primary me-3">...</span> */}
          <span className='spinner-border spinner-border-xl align-middle me-3'></span>
          <div className='d-flex flex-column'>
            <h5 className='mb-1'>Sedang mengambil data...</h5>
          </div>
        </div>
      </>
    )
  }

  // Column Table
  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.id,
      sortable: true,
      width: '150px',
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.id}</div>
      },
      // sortField: 'id',
    },
    {},
    {
      name: 'Jenis Pelanggaran',
      selector: (row: any) => row.jenis_pelanggaran,
      sortable: true,
      sortField: 'jenis_pelanggaran',
      width: '200px',
    },
    {},
    {},
    {
      name: 'Aksi',
      sortable: false,
      text: 'Action',
      className: 'action',
      align: 'left',
      cell: (record: any) => {
        return (
          <Fragment>
            <div className='mb-2'>
              {[DropdownButton].map((DropdownType, idx) => (
                <>
                  <DropdownType
                    as={ButtonGroup}
                    key={idx}
                    id={`dropdown-button-drop-${idx}`}
                    size='sm'
                    variant='light'
                    title='Aksi'
                  >
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate('/master/JenisPelanggaran/LihatJenisPelanggaran/' + record.id, {
                          replace: true,
                        })
                      }
                    >
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => doEdit(record.id)}>Ubah</Dropdown.Item>
                    <Dropdown.Item href='#' onClick={() => konfirDel(record.id)}>
                      Hapus
                    </Dropdown.Item>
                  </DropdownType>
                </>
              ))}
            </div>
          </Fragment>
        )
      },
    },
  ]

  // START : VIEW
  useEffect(() => {
    fetchUsers(1)
  }, [])

  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      const response = await axios.get(`${JENIS_PELANGGARAN_URL}/filter/${qParamFind.strparam}`)
      // setTemp(response.data.data)
      setTotalRows(response.data.total_data)
      const timeout = setTimeout(() => {
        let items = response.data.data
        Array.from(items).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        setTemp(items)
        setLoading(false)
      }, 100)

      return () => clearTimeout(timeout)
    }
    fetchUsers(1)
    fetchDT(1)
  }, [qParamFind, perPage])

  const fetchUsers = async (page: any) => {
    setLoading(true)
    const value = await axios.get(`${JENIS_PELANGGARAN_URL}/find`)
    const timeout = setTimeout(() => {
      let items = value.data.data
      Array.from(items).forEach((item: any, index: any) => {
        item.serial = index + 1
      })
      setTemp(items)
      setLoading(false)
    }, 50)
    return () => clearTimeout(timeout)
  }

  // END : VIEW
  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }

  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [aksi, setAksi] = useState(0)

  // ADD N UPDATE
  const formik = useFormik({
    initialValues: {
      ...valuesFormik,
    },
    validationSchema: validatorForm,
    enableReinitialize: true,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      const bodyparam: FormInput = {
        jenis_pelanggaran: valuesFormik?.jenis_pelanggaran, //? valuesFormik.jenis_sarana_prasarana : '', //? valuesFormik.kategori : '',
      }

      try {
        if (aksi === 0) {
          const response = await axios.post(`${JENIS_PELANGGARAN_URL}/create`, bodyparam)
          if (response) {
            Swal.fire({
              icon: 'success',
              text: 'Data berhasil disimpan',
              showConfirmButton: false,
              timer: 1500,
            })
            handleClose()
            fetchUsers(1)
            setSubmitting(false)
          }
        } else {
          const response = await axios.put(
            `${JENIS_PELANGGARAN_URL}/update/${idEditData.id}`,
            bodyparam
          )
          if (response) {
            Swal.fire({
              icon: 'success',
              text: 'Data berhasil disimpan',
              showConfirmButton: false,
              timer: 1500,
            })
            handleClose()
            fetchUsers(1)
            setSubmitting(false)
          }
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'Data gagal disimpan, harap mencoba lagi',
          showConfirmButton: false,
          timer: 1500,
        })
        console.error(error)
      }
    },
  })

  const doAdd = () => {
    setShow(true)
    setAksi(0)
    setValuesFormik({
      jenis_pelanggaran: '',
    })
  }
  const [idEditData, setIdEditData] = useState<{id: number}>({id: 0})

  //  GET ID FOR UPDATE
  const getDetail = async (idparam: any) => {
    const {data} = await axios.get(`${JENIS_PELANGGARAN_URL}/findone/${parseInt(idparam)}`)
    setIdEditData((prevstate) => ({
      ...prevstate,
      id: parseInt(idparam),
    }))
    setValuesFormik((prevstate) => ({
      ...prevstate,
      ...data.data,
    }))
  }

  const doEdit = (id: any) => {
    setShow(true)
    setAksi(1)
    getDetail(id)
  }

  // DELETE
  const konfirDel = (id: number) => {
    Swal.fire({
      text: 'Anda yakin ingin menghapus data ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya!',
      cancelButtonText: 'Tidak!',
      color: '#000000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const bodyParam = {
          data: {
            deleted_by: 0,
          },
        }
        const response = await axios.delete(`${JENIS_PELANGGARAN_URL}/delete/${id}`, bodyParam)
        if (response) {
          fetchUsers(1)
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil dihapus',
            showConfirmButton: false,
            timer: 1500,
            color: '#000000',
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Data gagal dihapus, harap mencoba lagi',
            showConfirmButton: false,
            timer: 1500,
            color: '#000000',
          })
        }
      }
    })
  }
  // END : CRUD

  // const handlePageChange = (page: any) => {
  //   fetchUsers(page);
  // };

  // const handlePerRowsChange = async (newPerPage: any, page: any) => {
  //   setLoading(true);

  //   const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}delay=1`);

  //   setData(response.data.data);
  //   setPerPage(newPerPage);
  //   setLoading(false);
  // };

  // const handleSort = (column: any, sortDirection: any) => {
  //   // simulate server sort
  //   console.log(column, sortDirection);
  //   setLoading(true);

  //   // instead of setTimeout this is where you would handle your API call.
  //   setTimeout(() => {
  //     setData(orderBy(data, column.sortField, sortDirection));
  //     setLoading(false);
  //   }, 100);
  // };

  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-xxl- col-lg-6 col-md-3 col-sm-10'>
          <label htmlFor='' className='mb-3'>
            Jenis Pelanggaran
          </label>
          <div className='col-xxl-3 col-lg-3 col-md-3 col-sm-12'></div>
          <input
            type='text'
            className='form-control form-control form-control-solid'
            name='tags'
            value={valFilterJenisPelanggaran.val}
            onChange={handleChangeInputJenisPelanggaran}
            placeholder='Jenis Pelanggaran'
          />
        </div>
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6 col-lg-6 col-sm-12'>
          <Link to='#' onClick={handleFilter}>
            <button className='btn btn-primary'>
              <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-2' />
              Cari
            </button>
          </Link>
        </div>
        <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
          <Link to='#'>
            <button className='btn btn-primary me-5' onClick={doAdd}>
              <i className='fa-solid fa-plus'></i>
              Tambah
            </button>
          </Link>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>{aksi === 0 ? 'Tambah' : 'Ubah'} Jenis Pelanggaran</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row mt-2 '>
              <form onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                  <Form.Label>Jenis Pelanggaran</Form.Label>
                  <Form.Control
                    name='jenis_pelanggaran'
                    className={clsx(
                      'form-control form-control-solid mb-1',
                      {
                        'is-invalid':
                          formik.touched.jenis_pelanggaran && formik.errors.jenis_pelanggaran,
                      },
                      {
                        'is-valid':
                          formik.touched.jenis_pelanggaran && !formik.errors.jenis_pelanggaran,
                      }
                    )}
                    onChange={handleChangeFormik}
                    value={valuesFormik?.jenis_pelanggaran}
                  />
                  {formik.touched.jenis_pelanggaran && formik.errors.jenis_pelanggaran && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.jenis_pelanggaran}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className='p-0 mt-6'>
                  <div className='text-center'>
                    <button
                      className='float-none btn btn-light align-self-center m-1'
                      onClick={handleClose}
                      type='button'
                    >
                      <i className='fa fa-close'></i>
                      Batal
                    </button>
                    <button
                      className='float-none btn btn-primary align-self-center m-1'
                      type='submit'
                    >
                      <i className='fa-solid fa-paper-plane'></i>
                      Simpan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>

      <div className='table-responsive mt-5 ms-5 me-5 w'>
        {temp?.length > 0 && temp && (
          <DataTable
            columns={columns}
            data={temp}
            progressPending={loading}
            customStyles={customStyles}
            progressComponent={<LoadingAnimation />}
            pagination
            // paginationServer
            paginationTotalRows={totalRows}
            //    expandableRowsComponent={(row) => (
            //   <ExpandedComponent row={row} handleInputChange={handleInputChange} />
            // )}
            // expandableRowsComponent={ExpandedComponent}
            // onChangeRowsPerPage={handlePerRowsChange}
            // onChangePage={handlePageChange}
            theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
            noDataComponent={
              <div className='alert alert-primary d-flex align-items-center p-5 mt-10 mb-10'>
                <div className='d-flex flex-column'>
                  <h5 className='mb-1 text-center'>Data tidak ditemukan..!</h5>
                </div>
              </div>
            }
          />
        )}
      </div>
      {/* end::Body */}
    </div>
  )
}

// function orderBy(data: never[], sortField: any, sortDirection: any): React.SetStateAction<never[]> {
//   throw new Error('Function not implemented.');
// }

// function onEdit(record: any) {
//   throw new Error('Function not implemented.');
// }

