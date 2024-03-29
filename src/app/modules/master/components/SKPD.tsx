import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import {Link, useNavigate} from 'react-router-dom'
import DataTable, {createTheme, ExpanderComponentProps} from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {ThemeModeComponent} from '../../../../_metronic/assets/ts/layout'
import {KTSVG} from '../../../../_metronic/helpers'
import moment from 'moment'
import Swal from 'sweetalert2'
import {useFormik} from 'formik'
import clsx from 'clsx'
import {Row} from 'react-bootstrap'

// API
const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const SKPD_URL = `${API_URL}/master/skpd`

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
  skpd?: string
}

const validatorForm = Yup.object().shape({
  skpd: Yup.string().required('Wajib diisi'),
})

export function SKPD() {
  const navigate = useNavigate()
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [valFilterSKPD, setFilterSKPD] = useState({val: ''}) //4

  const [data, setData] = useState([])
  const [temp, setTemp] = useState<any[]>([]) // Urutan 1
  const [loading, setLoading] = useState(true)
  const [qParamFind, setUriFind] = useState({strparam: ''})
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

  const handleFilter = async () => {
    //3
    let uriParam = ''
    if (valFilterSKPD.val !== '') {
      uriParam += `${valFilterSKPD.val}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleFilterReset = () => {
    setFilterSKPD({val: ''})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const handleChangeInputSKPD = (event: {
    //5
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterSKPD({val: event.target.value})
  }

  // START::CRUD
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

  // let number = 1
  // Kolom table
  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.serial,
      sortable: true,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      },
    },
    {
      name: 'SKPD',
      selector: (row: any) => row.skpd,
      sortable: true,
      sortField: 'skpd',
    },
    {
      name: 'Kode',
      selector: (row: any) => row.kode,
      sortable: true,
      sortField: 'kode',
    },
    {
      name: 'Aksi',
      sortable: false,
      text: 'Action',
      className: 'action',
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
                        navigate('/master/SKPD/LihatSKPD/' + record.id, {replace: true})
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

  // START :: VIEW
  useEffect(() => {
    fetchUsers(1)
  }, [])

  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      const response = await axios.get(`${SKPD_URL}/filter/${qParamFind.strparam}`)
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
    //urutan 3
    setLoading(true)
    const value = await axios.get(`${SKPD_URL}/find`)
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
  // END :: VIEW
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
        skpd: valuesFormik?.skpd, //? valuesFormik.skpd : '',
      }
      try {
        if (aksi === 0) {
          const response = await axios.post(`${SKPD_URL}/create`, bodyparam)
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
          const response = await axios.put(`${SKPD_URL}/update/${idEditData.id}`, bodyparam)
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
      skpd: '',
    })
  }
  const [idEditData, setIdEditData] = useState<{id: number}>({id: 0})

  // GET ID FOR UPDATE
  const getDetail = async (idparam: any) => {
    const {data} = await axios.get(`${SKPD_URL}/findone/${parseInt(idparam)}`)
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
        const response = await axios.delete(`${SKPD_URL}/delete/${id}`, bodyParam)
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
  // END::CRUD

  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className='row g-8 mt-2 ms-5 me-5'>
        <label>
          <h3>SKPD</h3>
        </label>
        <div className='col-xxl-3 col-lg-3 col-md-3 col-sm-12'>
          <input
            type='text'
            className='form-control form-control form-control-solid'
            name='q'
            value={valFilterSKPD.val} //4
            onChange={handleChangeInputSKPD}
            placeholder='SKPD'
            // 2
          />
        </div>
        <div className='col-xxl-3 col-lg-3 col-md-3 col-sm-12'>
          <Link to='#' onClick={handleFilter}>
            {/* 1 */}
            <button className='btn btn-light-primary me-2'>
              <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-2' />
              Cari
            </button>
          </Link>
        </div>
        <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
          <Link to='#i'>
            <button className='btn btn-primary me-2' onClick={doAdd}>
              <i className='fa-solid fa-plus'></i>
              Tambah
            </button>
          </Link>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>{aksi === 0 ? 'Tambah' : 'Ubah'} SKPD</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row mt-2 '>
              <form onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                  <Form.Label>SKPD</Form.Label>
                  <Form.Control
                    name='skpd'
                    className={clsx(
                      'form-control form-control-solid mb-1',
                      {
                        'is-invalid': formik.touched.skpd && formik.errors.skpd,
                      },
                      {
                        'is-valid': formik.touched.skpd && !formik.errors.skpd,
                      }
                    )}
                    onChange={handleChangeFormik}
                    value={valuesFormik?.skpd}
                  />
                  {formik.touched.skpd && formik.errors.skpd && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.skpd}</span>
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
      </div>

      {/* end::Body */}
    </div>
  )
}

// const ExpandedComponent = ({ row, handleInputChange }) => {
//   return (
//     <div className="ExpandedComponent">
//       <div className="ExpandedComponent_Row">
//         <label>Surname</label>
//         <input
//           value={row.data.surname}
//           onChange={(e) =>
//             handleInputChange(row.data, "surname", e.target.value)
//           }
//         />
//       </div>
//       <div className="ExpandedComponent_Row">
//         <label>Age</label>
//         <input
//           value={row.data.age}
//           onChange={(e) => handleInputChange(row.data, "age", e.target.value)}
//         />
//       </div>
//     </div>
//   );
// };
