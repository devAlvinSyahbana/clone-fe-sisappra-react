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

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const STATUS_KENAIKAN_PANGKAT_URL = `${API_URL}/master/status_kenaikan_pangkat`
export interface FormInput {
  status_kenaikan_pangkat?: string
  created_by?: number
}
const validatorForm = Yup.object().shape({
  status_kenaikan_pangkat: Yup.string().required('Wajib diisi'),
})
export function StatusKenaikanPangkat() {
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
  const [valFilterPangkat, setFilterPangkat] = useState({val: ''})

  useEffect(() => {
    async function fetchUsers(page: number) {
      setLoading(true)
      const response = await axios.get(
        `${STATUS_KENAIKAN_PANGKAT_URL}/filter/${qParamFind.strparam}`
      )
      setData(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchUsers(1)
  }, [qParamFind, perPage])

  const fetchData = async (page: number) => {
    setLoading(true)
    const response = await axios.get(`${STATUS_KENAIKAN_PANGKAT_URL}/filter/${qParamFind.strparam}`)
    setData(response.data.data)
    setTotalRows(response.data.total_data)
    setLoading(false)

    return [data, setData] as const
  }
  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    const response = await axios.get(`${STATUS_KENAIKAN_PANGKAT_URL}/filter/${qParamFind.strparam}`)
    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (valFilterPangkat.val !== '') {
      uriParam += `${valFilterPangkat.val}`
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

  const handleChangeInputPangkat = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterPangkat({val: event.target.value})
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
      name: 'Status Kenaikan Pangkat',
      selector: (row: any) => row.status_kenaikan_pangkat,
      sortable: true,
      sortField: 'status_kenaikan_pangkat',
      minWidth: '100px',
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
                        navigate(
                          '/master/statuskenaikanpangkat/lihat-status-kenaikan-pangkat/' +
                            record.id,
                          {replace: true}
                        )
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
        status_kenaikan_pangkat: valuesFormik?.status_kenaikan_pangkat,
      }
      try {
        if (aksi === 0) {
          const response = await axios.post(`${STATUS_KENAIKAN_PANGKAT_URL}/create`, bodyparam)
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
          const response = await axios.put(
            `${STATUS_KENAIKAN_PANGKAT_URL}/update/${idEditData.id}`,
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
    const {data} = await axios.get(`${STATUS_KENAIKAN_PANGKAT_URL}/findone/${parseInt(idparam)}`)
    setIdEditData((prevstate) => ({
      ...prevstate,
      id: parseInt(idparam),
    }))
    setValuesFormik((prevstate) => ({
      ...prevstate,
      ...data.data,
    }))
  }
  //End UPDATE
  //Detail
  const doAdd = () => {
    setShow(true)
    setAksi(0)
    setValuesFormik({
      status_kenaikan_pangkat: '',
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
        const response = await axios.delete(
          `${STATUS_KENAIKAN_PANGKAT_URL}/delete/${id}`,
          bodyParam
        )
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
            Status Kenaikan Pangkat
          </label>
          <input
            type='text'
            className='form-control form-control form-control-solid'
            name='q'
            value={valFilterPangkat.val}
            onChange={handleChangeInputPangkat}
            placeholder='Status Kenaikan Pangkat'
          />
        </div>
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6 col-lg-6 col-sm-12'>
          <Link to='#' onClick={handleFilter}>
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
              {/* <Modal.Title {aksi === 0 ? 'Tambah' : 'Ubah'}>Tambah Pangkat</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              <div className='mb-3 form-control-solid'>
                <div className='form-group'>
                  <Form.Label>Status Kenaikan Pangkat</Form.Label>
                  <Form.Control
                    name='status_kenaikan_pangkat'
                    className='form-control form-control-solid'
                    onChange={handleChangeFormik}
                    value={valuesFormik?.status_kenaikan_pangkat}
                  />
                </div>
              </div>
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
