import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';

export function InformasiDataPegawai() {

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users

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
      name: 'First Name',
      selector: (row: any) => row.first_name,
      sortable: true,
      sortField: 'first_name',
    },
    {
      name: 'Last Name',
      selector: (row: any) => row.last_name,
      sortable: true,
      sortField: 'last_name',
    },
    {
      name: 'Email',
      selector: (row: any) => row.email,
      sortable: true,
      sortField: 'email',
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchUsers = async (page: any) => {
    setLoading(true);


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
            <label htmlFor="" className='mb-3'>Status Kepegawaian</label>
            <select className="form-select form-select-solid" aria-label="Select example">
              <option>Pilih</option>
              <option value="1">PNS</option>
              <option value="2">PTT</option>
              <option value="3">PJLP</option>
            </select>
          </div>
        </div>
        <div className="col-xxl-6">
          <label htmlFor="" className='mb-3'>Nama</label>
          <input type="text" className="form-control form-control form-control-solid" name="tags" placeholder="Nama" />
        </div>
        <div className="col-xxl-6">
          <label htmlFor="" className='mb-3'>NIP</label>
          <input type="text" className="form-control form-control form-control-solid" name="tags" placeholder="NIP" />
        </div>
        <div className="col-xxl-6">
          <label htmlFor="" className='mb-3'>NRK</label>
          <input type="text" className="form-control form-control form-control-solid" name="tags" placeholder="NRK" />
        </div>
        <div className="col-xxl-6">
          <label htmlFor="" className='mb-3'>NPTT</label>
          <input type="text" className="form-control form-control form-control-solid" name="tags" placeholder="NPTT" />
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
        <div className='col-md-6 col-lg-6 col-sm-12 d-flex justify-content-end'>
          <Link to='/kepegawaian/DetailInformasiDataPegawai'>
            <button className='btn btn-secondary'>
              <i className="fa-solid fa-download"></i>
              Excel
            </button>
          </Link>
        </div>
      </div>

      <div className='table-responsive mt-5 ms-5 me-5'>
        <DataTable
          title="Users"
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

