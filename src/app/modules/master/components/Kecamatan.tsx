import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const KECAMATAN_URL = `${API_URL}/master/kecamatan` //http://localhost:3000/master/kecamatan

export function Kecamatan() {
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const [valFilterKota, setFilterKota] = useState({val: ''})
  const [valFilterKecamatan, setFilterKecamatan] = useState({val: ''})
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [qParamFind, setUriFind] = useState({strparam: ''})
 
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    fetchUsers(1)
  }, [])

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
  const handleFilter = async () => {
    let uriParam = ''
    if (valFilterKota.val !== '') {
      uriParam += `kota=${valFilterKota.val}`
    }
    if (valFilterKecamatan.val !== '') {
      uriParam += `&kecamatan=${valFilterKecamatan.val}`
    }
    
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleChangeInputKota = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterKota({val: event.target.value})
  }
  const handleChangeInputKecamatan = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterKecamatan({val: event.target.value})
  }

  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.id,
      sortable: true,
      sortField: 'no',
    },
    {
      name: 'Kode Kecamatan',
      selector: (row: any) => row.kode_kecamatan,
      sortable: true,
      sortField: 'kode_kecamatan',
      width: '200px',
    },
    {
      name: 'kecamatan',
      selector: (row: any) => row.kecamatan,
      sortable: true,
      sortField: 'kecamatan',
      width: '250px',
    },
    {
      name: 'Kode Kota',
      selector: (row: any) => row.kode_kota,
      sortable: true,
      sortField: 'kode_kota',
      width: '150px',
    },
    {
      name: 'kota',
      selector: (row: any) => row.kota,
      sortable: true,
      sortField: 'kota',
      width: '300px',
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
                        navigate('/master/Kecamatan/LihatKecamatan/' + record.id, {replace: true})
                      }
                    >
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate('/master/Kecamatan/UpdateKecamatan/' + record.id, {replace: true})
                      }
                    >
                      Ubah
                    </Dropdown.Item>
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



  const [temp, setTemp] = useState([])

  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      console.log(qParamFind)
      const response = await axios.get(
        `${KECAMATAN_URL}/findone-by-kecamatan?${qParamFind.strparam}`
      )
      console.log(response.data.data)
      // setTotalRows(response.data.total_data)
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
  //}

  const fetchUsers = async (page: any) => {
    setLoading(true)
    const value = await axios.get(KECAMATAN_URL + '/find')
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
        const response = await axios.delete(`${KECAMATAN_URL}/delete/${id}`, bodyParam)
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
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor='' className='mb-3'>
              Kota
            </label>
            <input
            type='text'
            className='form-control form-control form-control-solid'
            name='kota'
            value={valFilterKota.val}
            onChange={handleChangeInputKota}
            placeholder='kota'
          />
          </div>
        </div>
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor='' className='mb-3'>
              Kecamatan
            </label>
            <input
            type='text'
            className='form-control form-control form-control-solid'
            name='kecamatan'
            value={valFilterKecamatan.val}
            onChange={handleChangeInputKecamatan}
            placeholder='Kecamatan'
          />
          </div>
        </div>
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6 col-lg-6 col-sm-12'>
          <Link onClick={handleFilter} to='#'>
            <button className='btn btn-primary'>
              <i className='fa-solid fa-search'></i>
              Cari
            </button>
          </Link>
        </div>

        <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
          <Link to='/master/Kecamatan/TambahKecamatan'>
            <button className='btn btn-primary me-5'>
              <i className='fa-solid fa-plus'></i>
              Tambah
            </button>
          </Link>
        </div>
      </div>

      <div className='table-responsive mt-5 ms-5 me-5'>
        {/* <DataTable columns={columns} data={temp} pagination /> */}
        <DataTable
          columns={columns}
          data={temp}
          progressPending={loading}
          progressComponent={<LoadingAnimation />}
          pagination
          paginationTotalRows={totalRows}
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
