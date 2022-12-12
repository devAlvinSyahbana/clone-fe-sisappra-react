import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {useFormik, FormikHelpers} from 'formik'
import {Link, useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import clsx from 'clsx'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import {KTSVG} from '../../../../_metronic/helpers'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const JABATAN_URL = `${API_URL}/master/jabatan` //http://localhost:3000/sarana-prasarana
export interface FormInput {
  nama?: string
  status?: string
  created_by?: number
}
const validatorForm = Yup.object().shape({
  nama: Yup.string().required('Wajib diisi'),
  status: Yup.string().required('Wajib diisi'),
})
export function Jabatan() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const navigate = useNavigate()
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [qParamFind, setUriFind] = useState({strparam: ''})
  const [perPage, setPerPage] = useState(10)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const [temp, setTemp] = useState([])
  const [aksi, setAksi] = useState(0)
  const [valFilterJabatan, setFilterJabatan] = useState({val: ''})

  useEffect(() => {
    async function fetchUsers(page: number) {
      setLoading(true)
      const response = await axios.get(
        `${JABATAN_URL}/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
      )
      setData(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchUsers(1)
  }, [qParamFind, perPage])

  const fetchData = async (page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${JABATAN_URL}/find?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setTotalRows(response.data.total_data)
    setLoading(false)

    return [data, setData] as const
  }
  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    const response = await axios.get(
      `${JABATAN_URL}/find?limit=${newPerPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (valFilterJabatan.val !== '') {
      uriParam += `&nama=${valFilterJabatan.val}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handlePageChange = (page: number) => {
    fetchData(page)
  }
  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }

  const handleChangeInputJabatan = (event: {
    //5
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterJabatan({val: event.target.value})
  }

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
  let no = 1
  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.id,
      sortable: true,
      sortField: 'no',
      minWidth: '30px',
      cell: (record: any) => {
        return <div className='mt-2 mb-2'>{no++}</div>
      },
    },
    {
      name: 'Jabatan',
      selector: (row: any) => row.jabatan,
      sortable: true,
      sortField: 'jabatan',
      minWidth: '100px',
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      sortable: true,
      sortField: 'status',
      wrap: true,
    },
    {
      name: 'Kode',
      selector: (row: any) => row.kode,
      sortable: true,
      sortField: 'kode',
      wrap: true,
    },
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
                        navigate('/master/jabatan/lihat-jabatan/' + record.id, {replace: true})
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

  const formik = useFormik({
    initialValues: {
      ...valuesFormik,
    },
    validationSchema: validatorForm,
    enableReinitialize: true,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      const bodyparam: FormInput = {
        nama: valuesFormik?.nama,
        status: valuesFormik?.status,
      }
      try {
        if (aksi === 0) {
          const response = await axios.post(`${JABATAN_URL}/create`, bodyparam)
          if (response) {
            Swal.fire({
              icon: 'success',
              text: 'Data berhasil disimpan',
              showConfirmButton: false,
              timer: 1500,
            })
            handleClose()
            fetchData(1)
            setSubmitting(false)
          }
        } else {
          const response = await axios.put(`${JABATAN_URL}/update/${idEditData.id}`, bodyparam)
          if (response) {
            Swal.fire({
              icon: 'success',
              text: 'Data berhasil disimpan',
              showConfirmButton: false,
              timer: 1500,
            })
            handleClose()
            fetchData(1)
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

  // UPDATE
  const [idEditData, setIdEditData] = useState<{id: number}>({id: 0})
  const getDetail = async (idparam: any) => {
    const {data} = await axios.get(`${JABATAN_URL}/findone/${parseInt(idparam)}`)
    setIdEditData((prevstate) => ({
      ...prevstate,
      id: parseInt(idparam),
    }))
    setValuesFormik((prevstate) => ({
      ...prevstate,
      ...data.data,
      nama:data.data.jabatan
    }))
  }
  //End UPDATE
  //Detail
  const doAdd = () => {
    setShow(true)
    setAksi(0)
    setValuesFormik({
      nama: '',
      status: '',
    })
  }

  const doEdit = (id: any) => {
    setShow(true)
    setAksi(1)
    getDetail(id)
  }
  //End Detail
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
        const response = await axios.delete(`${JABATAN_URL}/delete/${id}`, bodyParam)
        if (response) {
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil dihapus',
            showConfirmButton: false,
            timer: 1500,
            color: '#000000',
          })
          fetchData(1)
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
  // END DELET
  const handleSort = (column: any, sortDirection: any) => {
    // simulate server sort
    console.log(column, sortDirection)
    setLoading(true)

    // instead of setTimeout this is where you would handle your API call.
    setTimeout(() => {
      setData(orderBy(data, column.sortField, sortDirection))
      setLoading(false)
    }, 100)
  }

  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-10'>
          <label htmlFor='' className='mb-3'>
            Jabatan
          </label>
          <input
            type='text'
            className='form-control form-control form-control-solid'
            name='nama'
            value={valFilterJabatan.val}
            onChange={handleChangeInputJabatan}
            placeholder='Jabatan'
          />
        </div>
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6 col-lg-6 col-sm-12'>
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
            <button className='btn btn-primary me-5' onClick={doAdd}>
              <i className='fa-solid fa-plus'></i>
              Tambah
            </button>
          </Link>
        </div>
      </div>

      <>
        <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false} centered>
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              {/* <Modal.Title {aksi === 0 ? 'Tambah' : 'Ubah'}>Tambah Jabatan</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              <div className='mb-3 form-control-solid'>
                <div className='form-group'>
                  <Form.Label>Jabatan</Form.Label>
                  <Form.Control
                    name='nama'
                    className='form-control form-control-solid'
                    onChange={handleChangeFormik}
                    value={valuesFormik?.nama}
                  />
                </div>
              </div>
              <Form.Group className='mb-3 form-control-solid'>
                <label className='required fw-semibold fs-6 mb-2'>Status</label>
                <select
                  data-control='select2'
                  data-placeholder='Status'
                  name='status'
                  className={clsx(
                    'form-control form-control-solid mb-1',
                    {
                      'is-invalid': formik.touched.status && formik.errors.status,
                    },
                    {
                      'is-valid': formik.touched.status && !formik.errors.status,
                    }
                  )}
                  onChange={handleChangeFormik}
                  value={valuesFormik?.status}
                >
                  <option value=''>Pilih</option>
                  <option value='JFT'>JFT</option>
                  <option value='Non JFT'>Non JFT</option>
                </select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' type='submit'>
                <i className='fa-solid fa-paper-plane'></i>
                Simpan
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>

      <div className='table-responsive mt-5 ms-5 me-5'>
        <DataTable
          columns={columns}
          data={data}
          progressPending={loading}
          progressComponent={<LoadingAnimation />}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          sortServer
          onSort={handleSort}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
      {/* end::Body */}
    </div>
  )
}
function orderBy(data: never[], sortField: any, sortDirection: any): React.SetStateAction<never[]> {
  throw new Error('Function not implemented.')
}

function onEdit(record: any) {
  throw new Error('Function not implemented.')
}
