import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import AsyncSelect from 'react-select/async'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const JENIS_KEJADIAN_URL = `${API_URL}/master/jenis-kejadian` //http://localhost:3000/master/jenis-kejadian

const validatorForm = Yup.object().shape({
  jenis_kejadian: Yup.string().required('Wajib diisi'),
})

export function JenisKejadian() {
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
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

  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.id,
      sortable: true,
      sortField: 'no',
    },
    {},
    {
      name: 'Jenis Kejadian',
      selector: (row: any) => row.jenis_kejadian,
      sortable: true,
      sortField: 'Jenis Kejadian',
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
                        navigate('/master/JenisKejadian/LihatJenisKejadian/' + record.id, {
                          replace: true,
                        })
                      }
                    >
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate('/master/JenisKejadian/UpdateJenisKejadian/' + record.id, {
                          replace: true,
                        })
                      }
                    >
                      Ubah
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => konfirDel(record?.id)}>Hapus</Dropdown.Item>
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
  const [perPage, setPerPage] = useState(10)

  const [temp, setTemp] = useState([])

  const fetchUsers = async (page: number) => {
    setLoading(true)
    const value = await axios.get(JENIS_KEJADIAN_URL + '/find')

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
        const response = await axios.delete(`${JENIS_KEJADIAN_URL}/delete/${id},{deleted_by}`)
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
            Jenis Kejaidan
          </label>
          <input type='text' className='form-control form-control form-control-solid' name='tags' />
        </div>
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6 col-lg-6 col-sm-12'>
          <Link to='#'>
            <button className='btn btn-primary'>
              <i className='fa-solid fa-search'></i>
              Cari
            </button>
          </Link>
        </div>

        <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
          <Link to='/master/JenisKejadian/TambahJenisKejadian'>
            <button className='btn btn-primary me-5'>
              <i className='fa-solid fa-plus'></i>
              Tambah
            </button>
          </Link>
        </div>
      </div>

      <div className='table-responsive mt-5 ms-5 me-5'>
        <DataTable columns={columns} data={temp} pagination />
      </div>
      {/* end::Body */}
    </div>
  )
}
