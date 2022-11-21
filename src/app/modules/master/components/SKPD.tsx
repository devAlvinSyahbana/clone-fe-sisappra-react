import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const SKPD_URL = `${API_URL}/master/skpd` //http://localhost:3000/master/jenis-kegiatan

export interface FormInput {
  skpd?: string
  created_by?: number
}

export function SKPD() {
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [showKata, setShowKata] = useState(false)
  const handleKataShow = () => setShowKata(true)
  const handleKataClose = () => setShowKata(false)
  const [valFilterSKPD, setFilterSKPD] = useState({ val: '' })
  const [qParamFind, setUriFind] = useState({ strparam: '' }) 
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [perPage, setPerPage] = useState(10)

  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      const response = await axios.get(`${SKPD_URL}/filter/${qParamFind.strparam}`)
      setTemp(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchUsers(1)
    fetchDT(1)
  }, [qParamFind, perPage])

  const handleFilter = async () => {
    let uriParam = ''
    if (valFilterSKPD.val !== '') {
      uriParam += `${valFilterSKPD.val}`
    }
    setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
  }

  const handleChangeInputSKPD = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setFilterSKPD({ val: event.target.value })
  }
  
  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
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

  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.id,
      sortable: true,
      sortField: 'id',
    },
    {},
    {
      name: 'SKPD',
      selector: (row: any) => row.skpd,
      sortable: true,
      sortField: 'SKPD',
      width: '300px',
    },
    {},
    {
      name: 'Kode',
      selector: (row: any) => row.kode,
      sortable: true,
      sortField: 'kode',
    },
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
                        navigate('/master/SKPD/LihatSKPD/' + record.id, {
                          replace: true,
                        })
                      }
                    >
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate('/master/SKPD/UpdateSKPD/' + record.id, {
                          replace: true,
                        })
                      }
                    >
                      Ubah
                    </Dropdown.Item>
                    <Dropdown.Item href='#' onClick={() => konfirDel(record.id)}>Hapus</Dropdown.Item>
                  </DropdownType>
                </>
              ))}
            </div>
          </Fragment>
        )
      },
    },
  ]

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  

  const [temp, setTemp] = useState([])

  const fetchUsers = async (page: any) => {
    setLoading(true)
    const value = await axios.get(SKPD_URL + '/find')

    setTemp(value.data.data)
    console.log('cek response api:', temp)

    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`
    )
    setData(response.data.data)

    setTotalRows(response.data.total)
    setLoading(false)
    console.log('cek ahhh :', data)
    return [data, setData] as const
  }

  const handlePageChange = (page: any) => {
    fetchUsers(page)
  }

  const handlePerRowsChange = async (newPerPage: any, page: any) => {
    setLoading(true)

    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${newPerPage}delay=1`
    )

    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

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

  const formik = useFormik({
    initialValues: {
      skpd: '',
    },
    onSubmit: async (values) => {
      let formData = new FormData()
      const bodyparam: FormInput = {
        skpd: valuesFormik?.skpd ? valuesFormik.skpd : '',
        created_by: 0,
      }
      try {
        const response = await axios.post(`${SKPD_URL}/create`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/master/SKPD', { replace: true })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Data gagal disimpan, harap mencoba lagi',
          showConfirmButton: false,
          timer: 1500,
        })
        console.error(error)
      }
    },
  })
  const konfirDel = (id: number) => {
    Swal.fire({
      title: 'Anda yakin?',
      text: 'Ingin menghapus data ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya!',
      cancelButtonText: 'Tidak!',
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
            title: 'Data berhasil dihapus',
            showConfirmButton: false,
            timer: 1500,
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Data gagal dihapus, harap mencoba lagi',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      }
    })
  }
  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-10'>
          <label htmlFor='' className='mb-3'>
            SKPD
          </label>
          <input
            type='text'
            className='form-control form-control form-control-solid'
            name='q'
            value={valFilterSKPD.val}
            onChange={handleChangeInputSKPD} //5
            placeholder='SKPD'
          />
        </div>
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6 col-lg-6 col-sm-12'>
          {/* 1 */}
          <Link to='#' onClick={handleFilter}> 
            <button className='btn btn-primary'>
              <i className='fa-solid fa-search'></i>
              Cari
            </button>
          </Link>
        </div>

        <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
          <Link to='#' onClick={handleKataShow}>
            <button className='btn btn-primary me-5'>
              <i className='fa-solid fa-plus'></i>
              Tambah
            </button>
          </Link>
        </div>
      </div>
      <>
        {/* onSubmit: async (values) => {
      const bodyparam: FormInput = {}
      valuesFormik?.kota ? (bodyparam.kota = valuesFormik.kota) : delete bodyparam.kota

      try {
        const response = await axios.post(`${KOTA_URL}/create`, bodyparam)
        if (response) {
          fetchUsers(1)
          handleClose()
          setValuesFormik({})
        }
      } catch (error) {
        console.error(error)
      }
    }, */}
      </>
      <>
        <Modal show={showKata} onHide={handleKataClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah SKPD</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <div className='row mt-2'>
                <div className='col-12 mb-6'>
                  <div className='form-group'>
                    <Form.Label>SKPD</Form.Label>
                    <br />
                    <Form.Control
                      name='skpd'
                      className='form-control form-control-solid'
                      onChange={handleChangeFormik}
                      value={valuesFormik?.skpd}
                    />
                  </div>
                </div>
              </div>
              <Modal.Footer>
              <div className='d-grid gap-2 d-md-flex justify-content-md-left'>
                <Link to='/apps/detail-hak-akses/DetailHakAkses' >
                  <button className='btn btn-secondary' >
                    <i className='fa fa-close'></i>
                    Batal
                  </button>
                </Link>
                <button className='btn btn-primary' type='submit'>
                  <i className='fa-solid fa-paper-plane'></i>
                  Simpan
                </button>
              </div>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </>

      <div className='table-responsive mt-30 ms-30 me-1'>
        <DataTable columns={columns} data={temp} pagination />
        {/* <DataTable
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
        /> */}
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
