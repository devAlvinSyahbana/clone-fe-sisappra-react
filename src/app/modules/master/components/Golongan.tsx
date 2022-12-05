import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const GOLONGAN_URL = `${API_URL}/master/golongan` //http://localhost:3000/sarana-prasarana

export function Golongan() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
      name: 'Golongan',
      selector: (row: any) => row.golongan,
      sortable: true,
      sortField: 'golongan',
    },
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
   
  const [temp, setTemp] = useState([]);

  const fetchUsers = async (page: any) => {
    setLoading(true);
    const value = await axios.get( GOLONGAN_URL + "/find");

    setTemp(value.data.data);
    console.log('cek response api:',temp);

    
    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);
    setData(response.data.data);
   
    setTotalRows(response.data.total);
    setLoading(false);
    console.log('cek ahhh :' ,data);
    return [data, setData] as const;
  };

  const handlePageChange = (page: any) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage: any, page: any) => {
    setLoading(true);

    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}delay=1`);

    setData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  const handleSort = (column: any, sortDirection: any) => {
    // simulate server sort
    console.log(column, sortDirection);
    setLoading(true);

    // instead of setTimeout this is where you would handle your API call.
    setTimeout(() => {
      setData(orderBy(data, column.sortField, sortDirection));
      setLoading(false);
    }, 100);
  };


  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className="row g-8 mt-2 ms-5 me-5">
          <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-10'>
            <label htmlFor='' className='mb-3'>
              Golongan
            </label>
            <input
              type='text' className='form-control form-control form-control-solid' name='tags'/>
          </div>
      </div>
      <div className="row g-8 mt-2 ms-5 me-5">
        <div className='col-md-6 col-lg-6 col-sm-12'>
        <Link to='#'>
            <button className='btn btn-primary'>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Golongan</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group className="mb-3 form-control-solid">
            <Form.Label>Golongan</Form.Label>
            <Form.Control type="text" placeholder="Golongan" />
        </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
          <i className="fa-solid fa-paper-plane"></i>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
      </>

      <div className='table-responsive mt-5 ms-5 me-5'>
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
function orderBy(data: never[], sortField: any, sortDirection: any): React.SetStateAction<never[]> {
  throw new Error('Function not implemented.');
}

function onEdit(record: any) {
  throw new Error('Function not implemented.');
}

