import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form'
import clsx from 'clsx'
import AsyncSelect from 'react-select/async'
import { useFormik } from 'formik'

export interface FormInput {
  nama?: string
  kategori?: string
  created_by?: number
}
export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
//export const name_URL = `${API_URL}/master/tempat-pelaksanaan` //http://localhost:3000/master/kota
export const BIDANG_WILAYAH_URL = `${API_URL}/master/bidang-wilayah`

export function TempatPelaksanaan() {
  const navigate = useNavigate()
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})
  const [show, setShow] = useState(false)
  const handleKataClose = () => setShowKata(false)
  const [showKata, setShowKata] = useState(false)
  const [qParamFind, setUriFind] = useState({ strparam: '' })
  const [valFilterTempatPelaksanaan, setFilterTempatPelaksanaan] = useState({ val: '' })
  const handleKataShow = () => setShowKata(true)
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [inputValTugas, setDataTugas] = useState({ label: '', value: null })

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
  const formik = useFormik({
    initialValues: {
      nama: '',
      kategori: '',
    },
    onSubmit: async (values) => {
      let formData = new FormData()
      const bodyparam: FormInput = {
        nama: valuesFormik?.nama ? valuesFormik.nama : '',
        kategori: valuesFormik?.kategori ? valuesFormik.kategori : '',
        created_by: 0,
      }
      try {
        const response = await axios.post(`${BIDANG_WILAYAH_URL}/create`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/master/TempatPelaksanaan', { replace: true })
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
        const response = await axios.delete(`${BIDANG_WILAYAH_URL}/delete/${id}`, bodyParam)
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
  var num = 1;
  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.id,
      sortable: true,
      sortField: 'no',
      wrap: true,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.nama !== 'Jumlah Keseluruhan' ? num++ : ''}</div>
      },
    },
    {
      name: 'Wilayah/Bidang',
      selector: (row: any) => row.nama,
      sortable: true,
      sortField: 'name',
      width: '400px',
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
      name: 'Kategori',
      selector: (row: any) => row.kategori,
      sortable: true,
      sortField: 'kategori',
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
            <div className='mb-2  mt-2'>
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
                        navigate('/master/TempatPelaksanaan/LihatTempatPelaksanaan/' + record.id, { replace: true })
                      }
                    >
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate('/master/TempatPelaksanaan/UpdateTempatPelaksanaan/' + record.id, { replace: true })
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

  const handleChangeInputTempatPelaksana = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setFilterTempatPelaksanaan({ val: event.target.value })
  }

  const handleChangeFormikSelect = (value: any, name: string) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }))
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
  
  const filterTugas = async (inputValue: string) => {
    const response = await axios.get(`${BIDANG_WILAYAH_URL}/filter/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({ label: i.nama, value: i.id }))
  }
  const loadOptionsTugas = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterTugas(inputValue))
    }, 1000)
  }
  const handleInputTugas = async (newValue: any) => {
    setDataTugas((prevstate: any) => ({ ...prevstate, ...newValue }))
  }

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

  const [temp, setTemp] = useState([])

  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      const response = await axios.get(`${BIDANG_WILAYAH_URL}/filter/${qParamFind.strparam}`)
      setTemp(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchUsers(1)
    fetchDT(1)
  }, [qParamFind, perPage])

  const handleFilter = async () => {
    let uriParam = ''
    if (valFilterTempatPelaksanaan.val !== '') {
      uriParam += `${valFilterTempatPelaksanaan.val}`
    }
    setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
  }

  const fetchUsers = async (page: any) => {
    setLoading(true)
    const value = await axios.get(`${BIDANG_WILAYAH_URL}/find`)

    setTemp(value.data.data)
    console.log('cek kota:', temp)

    return [data, setTemp] as const
  }

  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-10'>
          <label htmlFor='' className='mb-3'>
            Wilayah/Bidang
          </label>
          <input
            type='text'
            className='form-control form-control form-control-solid'
            name='q'
            value={valFilterTempatPelaksanaan.val}
            onChange={handleChangeInputTempatPelaksana}
            placeholder='TempatPelaksana'
          />
        </div>
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6 col-lg-6 col-sm-12'>
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
            <Modal.Title>Tambah Wilayah/Bidang</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <div className='row mt-2'>
                <div className='col-12 mb-6'>
                  <div className='form-group'>
                    <Form.Label>Wilayah/Bidang</Form.Label>
                    <br />
                    <Form.Control
                      name='nama'
                      className='form-control form-control-solid'
                      onChange={handleChangeFormik}
                      value={valuesFormik?.nama}
                    />
                    <Form.Label>Kategori</Form.Label>
                    <br />
                    <Form.Control
                      name='kategori'
                      className='form-control form-control-solid'
                      onChange={handleChangeFormik}
                      value={valuesFormik?.kategori}
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
