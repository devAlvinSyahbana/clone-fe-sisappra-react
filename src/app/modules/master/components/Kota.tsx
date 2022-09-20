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


export interface FormInput {
  kota?: string
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const KOTA_URL = `${API_URL}/master/kota` //http://localhost:3000/master/kota

export function Kota() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [qParamFind, setUriFind] = useState({strparam: ''})

  const [valFilterKota, setFilterKota] = useState({val: ''})
  

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const LoadingAnimation = (props: any) => {
    return (
      <>
        <div className="alert alert-primary d-flex align-items-center p-5 mb-10">
          {/* <span className="svg-icon svg-icon-2hx svg-icon-primary me-3">...</span> */}
          <span className="spinner-border spinner-border-xl align-middle me-3"></span>
          <div className="d-flex flex-column">
            <h5 className="mb-1">Sedang mengambil data...</h5>
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
    {     
      name: 'Kota',
      selector: (row: any) => row.kota,
      sortable: true,
      sortField: 'kota',    
    },
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
      text: "Action",
      className: "action",
      align: "left",
      cell: (record: any) => {
        return (
          <Fragment>

            <div className="mb-2">
              {[DropdownButton].map((DropdownType, idx) => (
                <>
                  <DropdownType
                    as={ButtonGroup}
                    key={idx}
                    id={`dropdown-button-drop-${idx}`}
                    size="sm"
                    variant="light"
                    title="Aksi">
                    <Dropdown.Item>
                      <Link to="/sarana-prasarana/LaporanSaranaPrasarana">
                        Detail
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item href="#">Ubah</Dropdown.Item>
                    <Dropdown.Item href="#">Hapus</Dropdown.Item>
                  </DropdownType>
                </>
              ))}
            </div>
          </Fragment>
        );
      },
    },

  ];

  const handleFilter = async () => {
    let uriParam = ''
    if (valFilterKota.val !== '') {
      uriParam += `&kota=${valFilterKota.val}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }
  const handleChangeInputKota = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterKota({val: event.target.value})
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


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
   
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      const response = await axios.get(
        `${KOTA_URL}/findone-by-kota`
      )
      console.log('cek kot:',temp);
      setData(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchDT(1)
  }, [qParamFind, perPage])

  const fetchUsers = async (page: any) => {
    setLoading(true);
    const value = await axios.get(KOTA_URL + "/find");

    setTemp(value.data.data);
    console.log('cek kota:',temp);

    
    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);
    setData(response.data.data);
   
    setTotalRows(response.data.total);
    setLoading(false);
    console.log('cek ahhh :' ,data);
    return [data, setData] as const;
  };

   return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className="row g-8 mt-2 ms-5 me-5">
          <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-10'>
            <label htmlFor='' className='mb-3'>
              Kota
            </label>
            <input
              type='text'
              className='form-control form-control form-control-solid'
              name='kota'
              value={valFilterKota.val}
              onChange={handleChangeInputKota}
              placeholder='Kota'
            />
          </div>
      </div>
      <div className="row g-8 mt-2 ms-5 me-5">
        <div className='col-md-6 col-lg-6 col-sm-12'>
        <Link to='#'>
            <button className='btn btn-primary'onClick={handleFilter} >
              <i className='fa-solid fa-search'></i>
              Cari
            </button>
          </Link>
        </div>
        
        <div className="d-flex justify-content-end col-md-6 col-lg-6 col-sm-12">
          <Link to='#'>
            <button className='btn btn-primary me-5' onClick={handleShow}>
              <i className="fa-solid fa-plus"></i>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kota</Modal.Title>
        </Modal.Header>
        <form>
            <Modal.Body>            
              <div className='row g-6 mt-2 ms-5 me-5'>
                <div className='col-md-15'>
                  <div className='form-group'>
                    <label htmlFor='' className='mb-3'>
                      Kota
                    </label>
                    <input
                      className='form-control form-control form-control-solid'
                      name='jumlah'
                      type='number'
                      min='0'
                      onChange={handleChangeFormik}
                      // onBlur={formik.handleBlur}
                      // value={valuesFormik?.Kota}
                    />
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

      <div className='table-responsive mt-30 ms-30 me-1'>
      <DataTable
            columns={columns}
            data={temp}
            pagination
        />
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


