import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const LOGIN_URL = `${API_URL}/sarana-prasarana` //http://localhost:3000/sarana-prasarana

export function LaporanSaranaPrasarana() {

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
      name: 'Jenis Sarana & Prasarana',
      selector: (row: any) => row.first_name,
      sortable: true,
      sortField: 'jenis_sarana_prasarana',
    },
    {
      name: 'Status Sarana & Prasarana',
      selector: (row: any) => row.last_name,
      sortable: true,
      sortField: 'status_sarana_prasarana',
    },
    {
      name: 'Jumlah',
      selector: (row: any) => row.email,
      sortable: true,
      sortField: 'jumlah',
    },
    {
      name: 'Keterangan',
      selector: (row: any) => row.email,
      sortable: true,
      sortField: 'keterangan',
    },
    {
      name: 'Dokumentasi',
      selector: (row: any) => row.email,
      sortable: true,
      sortField: 'dokumentasi',
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
                      <Link to="/sarana_prasarana/LaporanSaranaPrasarana">
                        Detail
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Ubah</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Hapus</Dropdown.Item>
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

  const fetchUsers = async (page: any) => {
    setLoading(true);
    const {data} = await axios.get(`${LOGIN_URL}/find`);
    console.log('cek response api:',data)

    
    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);
    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
    return [data, setData] as const;
  };

  const handlePageChange = (page: any) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage: any, page: any) => {
    setLoading(true);

    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

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
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor="" className='mb-3'>Jenis Sarana & Prasarana</label>
            <select className="form-select form-select-solid" aria-label="Select example">
              <option>Pilih</option>
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
            </select>
          </div>
        </div>
      </div>
      <div className="row g-8 mt-2 ms-5 me-5">
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor="" className='mb-3'>Status Sarana & Prasarana</label>
            <select className="form-select form-select-solid" aria-label="Select example">
              <option>Pilih</option>
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
            </select>
          </div>
        </div>
      </div>
      <div className="row g-8 mt-2 ms-5 me-5">
        <div className='col-md-6'>
          <div className='form-group'>
            <label htmlFor="" className='mb-3'>Kondisi</label>
            <select className="form-select form-select-solid" aria-label="Select example">
              <option>Pilih</option>
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
            </select>
          </div>
        </div>
      </div>
      <div className="row g-8 mt-2 ms-5 me-5">
        <div className='col-md-6 col-lg-6 col-sm-12'>
          <Link to='#' className='me-2'>
            <button className='btn btn-primary'>
              <i className="fa-solid fa-filter"></i>
              Filter
            </button>
          </Link>
          <Link to='#i'>
            <button className='btn btn-primary'>
              <i className="fa-solid fa-arrows-rotate"></i>
              Reset
            </button>
          </Link>
        </div>
        <div className="d-flex justify-content-end col-md-6 col-lg-6 col-sm-12">
          <DropdownButton id="dropdown-basic-button" title="Unduh" variant="light">
            <Dropdown.Item href="#/action-1">Excel</Dropdown.Item>
            <Dropdown.Item href="#/action-2">PDF</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
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
  throw new Error('Function not implemented.');
}

function onEdit(record: any) {
  throw new Error('Function not implemented.');
}

