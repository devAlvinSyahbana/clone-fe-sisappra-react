import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import {useFormik} from 'formik'
import SweetAlert from 'react-bootstrap-sweetalert'

export interface FormInput {
  jenis_sarana_prasarana?: any
  status_sarana_prasarana?: any
  jumlah?: number
  kondisi?: any
  keterangan?: string
  file_dokumentasi?: string
}

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const SARANA_PRASARANA_URL = `${API_URL}/sarana-prasarana` //http://localhost:3000/sarana-prasarana

export function LaporanSaranaPrasarana() {
  const [show, setShow] = useState(false)
  const [showOtherAlert, setStateAlert] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [inputValJenis, setDataJenis] = useState({label: '', value: null})
  const [inputValStatus, setDataStatus] = useState({label: '', value: null})
  const [inputValKondisi, setDataKondisi] = useState({label: '', value: null})

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [qParamFind, setUriFind] = useState({strparam: ''})

  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      const response = await axios.get(
        `${SARANA_PRASARANA_URL}/filter?limit=${perPage}&offset=${page}${qParamFind.strparam}`
      )
      setData(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchDT(1)
  }, [qParamFind, perPage])

  const LoadingAnimation = (props: any) => {
    return (
      <>
        <div className='alert alert-primary d-flex align-items-center p-5 mb-10'>
          <span className='spinner-border spinner-border-xl align-middle me-3'></span>
          <div className='d-flex flex-column'>
            <h5 className='mb-1'>Sedang mengambil data...</h5>
          </div>
        </div>
      </>
    )
  }

  
  const mostrarAlerta=()=>{
    alert("Are you sure");
  }

  const columns = [
    {
      name: 'Jenis Sarana & Prasarana',
      selector: (row: any) => row.jenis_sarana_prasarana,
      sortable: true,
      sortField: 'jenis_sarana_prasarana',
    },
    {
      name: 'Status Sarana & Prasarana',
      selector: (row: any) => row.status_sarana_prasarana,
      sortable: true,
      sortField: 'status_sarana_prasarana',
    },
    {
      name: 'Jumlah',
      selector: (row: any) => row.jumlah,
      sortable: true,
      sortField: 'jumlah',
    },
    {
      name: 'Kondisi',
      selector: (row: any) => row.kondisi,
      sortable: true,
      sortField: 'kondisi',
    },
    {
      name: 'Keterangan',
      selector: (row: any) => row.keterangan,
      sortable: true,
      sortField: 'keterangan',
    },
    {
      name: 'Dokumentasi',
      selector: (row: any) => row.dokumentasi,
      sortable: true,
      sortField: 'dokumentasi',
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
                    <Dropdown.Item>
                      <Link to={"/sarana_prasarana/LihatLaporanSarana/"+record.id}>Detail</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to={"/sarana_prasarana/UbahLaporanSarana/"+record.id}>Ubah</Link>
                    </Dropdown.Item>
                    <Dropdown.Item href='#'onClick={()=>mostrarAlerta()}>Hapus</Dropdown.Item>
                  </DropdownType>
                </>
              ))}
            </div>
          </Fragment>
        )
      },
    },
  ]


  const fetchUsers = async (page: any) => {
    setLoading(true)
    const response = await axios.get(
      `${SARANA_PRASARANA_URL}/filter?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )
    setData(response.data.data)

    setTotalRows(response.data.total_data)
    setLoading(false)
    return [data, setData] as const
  }

  const handlePageChange = (page: any) => {
    fetchUsers(page)
  }

  const handlePerRowsChange = async (newPerPage: any, page: any) => {
    setLoading(true)

    const response = await axios.get(
      `${SARANA_PRASARANA_URL}/filter?limit=${perPage}&offset=${page}${qParamFind.strparam}`
    )

    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  // AUTOCOMPLITE JENIS SARANA & PRASANAN
  const filterSapra = async (inputValue: string) => {
    const response = await axios.get(`${SARANA_PRASARANA_URL}/findjenis/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.jenis_sarana_prasarana, value: i.id}))
  }
  const loadOptionsSapra = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterSapra(inputValue))
    }, 1000)
  }
  const handleInputChange = (newValue: any) => {
    setDataJenis((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // AUTOCOMPLITE STATUS SARANA & PRASANAN
  const filterStapra = async (inputValue: string) => {
    const response = await axios.get(`${SARANA_PRASARANA_URL}/findstatus/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.status_sarana_prasarana, value: i.id}))
  }
  const loadOptionsStapra = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterStapra(inputValue))
    }, 1000)
  }
  const handleInputStapra = (newValue: any) => {
    setDataStatus((prevstate: any) => ({...prevstate, ...newValue}))
  }

  // AUTOCOMPLITE KONDISI SARANA & PRASANAN
  const filterKonpra = async (inputValue: string) => {
    const response = await axios.get(`${SARANA_PRASARANA_URL}/findkondisi/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.kondisi_sarana_prasarana, value: i.id}))
  }
  const loadOptionsKonpra = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterKonpra(inputValue))
    }, 1000)
  }
  const handleInputKonpra = (newValue: any) => {
    setDataKondisi((prevstate: any) => ({...prevstate, ...newValue}))
  }

  const handleFilterReset = () => {
    setDataJenis({label: '', value: null})
    setDataStatus({label: '', value: null})
    setDataKondisi({label: '', value: null})
    setUriFind((prevState) => ({...prevState, strparam: ''}))
  }

  const handleFilter = async () => {
    let uriParam = ''
    if (inputValJenis.value) {
      uriParam += `&jenis_sarana_prasarana=${inputValJenis.value}`
    }
    if (inputValStatus.value) {
      uriParam += `&status_sarana_prasarana=${inputValStatus.value}`
    }
    if (inputValKondisi.value) {
      uriParam += `&kondisi_sarana_prasarana=${inputValKondisi.value}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})

  const handleChangeFormikSelect = (value: any, name: string) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }))
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

  const formik = useFormik({
    initialValues: {
      jenis_sarana_prasarana: {value: '', label: 'Pilih'},
      status_sarana_prasarana: {value: '', label: 'Pilih'},
      jumlah: 0,
      kondisi: {value: '', label: 'Pilih'},
      keterangan: '',
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {}
      valuesFormik?.jenis_sarana_prasarana?.value
        ? (bodyparam.jenis_sarana_prasarana = valuesFormik.jenis_sarana_prasarana.value)
        : delete bodyparam.jenis_sarana_prasarana
      valuesFormik?.status_sarana_prasarana?.value
        ? (bodyparam.status_sarana_prasarana = valuesFormik.status_sarana_prasarana.value)
        : delete bodyparam.status_sarana_prasarana
      valuesFormik?.kondisi?.value
        ? (bodyparam.kondisi = valuesFormik.kondisi.value)
        : delete bodyparam.kondisi
      valuesFormik?.keterangan
        ? (bodyparam.keterangan = valuesFormik.keterangan)
        : delete bodyparam.keterangan
      valuesFormik?.jumlah ? (bodyparam.jumlah = valuesFormik.jumlah) : delete bodyparam.jumlah

      try {
        const response = await axios.post(`${SARANA_PRASARANA_URL}/create`, bodyparam)
        if (response) {
          fetchUsers(1)
          handleClose()
          setValuesFormik({})
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
  return (
    <> 
    <div className={`card`}>
      {/* begin::Body */}
      {/* {showOtherAlert &&
          <SweetAlert
            type='success'
            title='Good job!'
            onConfirm={() => setStateAlert(false)}
            onCancel={() => setStateAlert(false)}
            showCancel={true}
            focusCancelBtn={true}
          >
            You clicked the button!
          </SweetAlert>
      } */}
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor='' className='mb-3'>
              Jenis Sarana & Prasarana
            </label>
            <AsyncSelect
              cacheOptions
              value={inputValJenis.value ? inputValJenis : {value: '', label: 'Pilih'}}
              loadOptions={loadOptionsSapra}
              defaultOptions
              onChange={handleInputChange}
              placeholder={'Pilih'}
            />
          </div>
        </div>
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor='' className='mb-3'>
              Status Sarana & Prasarana
            </label>
            <AsyncSelect
              cacheOptions
              value={inputValStatus.value ? inputValStatus : {value: '', label: 'Pilih'}}
              loadOptions={loadOptionsStapra}
              defaultOptions
              onChange={handleInputStapra}
              placeholder={'Pilih'}
            />
          </div>
        </div>
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor='' className='mb-3'>
              Kondisi
            </label>
            <AsyncSelect
              cacheOptions
              value={inputValKondisi.value ? inputValKondisi : {value: '', label: 'Pilih'}}
              loadOptions={loadOptionsKonpra}
              defaultOptions
              onChange={handleInputKonpra}
              placeholder={'Pilih'}
            />
          </div>
        </div>
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6 col-lg-6 col-sm-12'>
          <Link to='#' onClick={handleFilter} className='me-2'>
            <button className='btn btn-primary me-2'>
              <i className='fa-solid fa-search'></i>
              Cari
            </button>
          </Link>
          <Link to='#' onClick={handleFilterReset}>
            <button className='btn btn-primary'>
              <i className='fa-solid fa-arrows-rotate'></i>
              Reset
            </button>
          </Link>
        </div>

        <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
          <Link to='#'>
            <Button variant='primary' onClick={handleShow}>
              <span className='svg-icon svg-icon-2'>
                <svg
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    opacity='0.5'
                    x='11.364'
                    y='20.364'
                    width={16}
                    height={2}
                    rx={1}
                    transform='rotate(-90 11.364 20.364)'
                    fill='currentColor'
                  />
                  <rect x='4.36396' y='11.364' width={16} height={2} rx={1} fill='currentColor' />
                </svg>
              </span>
              Tambah Sarana
            </Button>
          </Link>
          &nbsp;
          <DropdownButton id='dropdown-basic-button' title='Unduh' variant='light'>
            <Dropdown.Item href={`${SARANA_PRASARANA_URL}/unduh?q=1${qParamFind.strparam}`}>
              Excel
            </Dropdown.Item>
            <Dropdown.Item href='#'>PDF</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Sarana & Prasarana</Modal.Title>
          </Modal.Header>
          <form onSubmit={formik.handleSubmit}>
            <Modal.Body>
              <div className='row g-6 mt-2 ms-5 me-5'>
                <div className='col-md-15'>
                  <div className='form-group'>
                    <label htmlFor='' className='mb-3'>
                      Jenis Sarana & Prasarana
                    </label>
                    <AsyncSelect
                      cacheOptions
                      loadOptions={loadOptionsSapra}
                      defaultOptions
                      onChange={(e) => handleChangeFormikSelect(e, 'jenis_sarana_prasarana')}
                      value={
                        valuesFormik?.jenis_sarana_prasarana
                          ? valuesFormik?.jenis_sarana_prasarana
                          : {value: '', label: 'Pilih'}
                      }
                      placeholder={'Pilih'}
                    />
                  </div>
                </div>
              </div>
              <div className='row g-6 mt-2 ms-5 me-5'>
                <div className='col-md-15'>
                  <div className='form-group'>
                    <label htmlFor='' className='mb-3'>
                      Status Sarana & Prasarana
                    </label>
                    <AsyncSelect
                      cacheOptions
                      loadOptions={loadOptionsStapra}
                      defaultOptions
                      onChange={(e) => handleChangeFormikSelect(e, 'status_sarana_prasarana')}
                      value={
                        valuesFormik?.status_sarana_prasarana
                          ? valuesFormik?.status_sarana_prasarana
                          : {value: '', label: 'Pilih'}
                      }
                      placeholder={'Pilih'}
                    />
                  </div>
                </div>
              </div>
              <div className='row g-6 mt-2 ms-5 me-5'>
                <div className='col-md-15'>
                  <div className='form-group'>
                    <label htmlFor='' className='mb-3'>
                      Jumlah
                    </label>
                    <input
                      className='form-control form-control form-control-solid'
                      name='jumlah'
                      type='number'
                      min='0'
                      onChange={handleChangeFormik}
                      onBlur={formik.handleBlur}
                      value={valuesFormik?.jumlah}
                    />
                  </div>
                </div>
              </div>
              <div className='row g-6 mt-2 ms-5 me-5'>
                <div className='col-md-15'>
                  <div className='form-group'>
                    Kondisi
                    <AsyncSelect
                      cacheOptions
                      loadOptions={loadOptionsKonpra}
                      defaultOptions
                      onChange={(e) => handleChangeFormikSelect(e, 'kondisi')}
                      value={
                        valuesFormik?.kondisi ? valuesFormik?.kondisi : {value: '', label: 'Pilih'}
                      }
                      placeholder={'Pilih'}
                    />
                  </div>
                </div>
              </div>
              <div className='row g-6 mt-2 ms-5 me-5'>
                <div className='col-md-15'>
                  <div className='form-group'>
                    <Form.Label>Keterangan</Form.Label>
                    <Form.Control
                      as='textarea'
                      name='keterangan'
                      onChange={handleChangeFormik}
                      value={valuesFormik?.keterangan}
                    />
                  </div>
                </div>
              </div>
              <div className='row g-6 mt-2 ms-5 me-5'>
                <div className='col-md-15'>
                  <div className='form-group'>
                    <Form.Label>File Dokumentasi</Form.Label>
                    <Form.Control type='file' id='firstimg' />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button type='submit'>
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
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
      {/* end::Body */}
    </div>
    </>
  )
}
