import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form'


export function InformasiDataPegawai() {

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
                      <Link className="text-reset" to="/kepegawaian/DetailInformasiDataPegawai">
                        Detail
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link className="text-reset" to="/kepegawaian/UpdateInformasiDataPegawai">
                        Ubah
                      </Link>
                    </Dropdown.Item>
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

  const [showResults, setShowResults] = useState({ isShowed: false, val: "" })
  const Find = (event: { preventDefault: () => void; target: { value: string; }; }) => {
    console.log(typeof event.target.value)

    if (event.target.value === "1") {
      setShowResults({ isShowed: true, val: event.target.value })

    } if (event.target.value === "2") {
      setShowResults({ isShowed: true, val: event.target.value })

    } if (event.target.value === "3") {
      setShowResults({ isShowed: true, val: event.target.value })
    }

  };

  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div id="kt_advanced_search_form">
        <div className="row g-8 mt-2 ms-5 me-5">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="" className="mb-3"
              >Status Kepegawaian</label
              >
              <select
                className="form-select form-select-solid"
                aria-label="Select example"
                id="select_status"
                onChange={Find}
              >
                <option>Pilih</option>
                <option value="1">PNS</option>
                <option value="2">PTT</option>
                <option value="3">PJLP</option>
              </select>
            </div>
          </div>
          <div className="col-xxl-6 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="" className="mb-3">Nama</label>
            <input
              type="text"
              className="form-control form-control form-control-solid"
              name="tags"
              placeholder="Nama"
            />
          </div>
          <div className="col-xxl-6 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="" className="mb-3">NRK</label>
            <input
              type="text"
              className="form-control form-control form-control-solid"
              name="tags"
              placeholder="NRK"
            />
          </div>

          {showResults.isShowed && showResults.val === "1" ? (<>
            <div
              className="col-xxl-6 col-lg-6 col-md-6 col-sm-12"
              id="fil_nip"
            >
              <label htmlFor="" className="mb-3">NIP</label>
              <input
                type="text"
                className="form-control form-control form-control-solid"
                name="tags"
                placeholder="NIP"
              />
            </div>
          </>) : null
            ||
            showResults.isShowed && showResults.val === "2" ? (<>
              <div
                className="col-xxl-6 col-lg-6 col-md-6 col-sm-12"
                id="fil_nptt"
              >
                <label htmlFor="" className="mb-3">NPTT</label>
                <input
                  type="text"
                  className="form-control form-control form-control-solid"
                  name="tags"
                  placeholder="NPTT"
                />
              </div>
            </>) : null
              ||
              showResults.isShowed && showResults.val === "3" ? (<>
                <div
                  className="col-xxl-6 col-lg-6 col-md-6 col-sm-12"
                  id="fil_npjlp"
                >
                  <label htmlFor="" className="mb-3">NPJLP</label>
                  <input
                    type="text"
                    className="form-control form-control form-control-solid"
                    name="tags"
                    placeholder="NPJLP"
                  />
                </div>
              </>) : null
          }

          <div className="col-xxl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
              <label htmlFor="" className="mb-3"
              >Mendekati Pensiun</label
              >
              <select
                className="form-select form-select-solid"
                aria-label="Select example"
              >
                <option>Pilih</option>
                <option value="1">Ya</option>
                <option value="2">Tidak</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-8 mt-2 ms-5 me-5">
        <div className='col-md-6 col-lg-6 col-sm-12'>
          <Link to='#' className='me-2'>
            <button className='btn btn-primary'>
              <i className="fa-solid fa-arrows-rotate"></i>
              Reset
            </button>
          </Link>
          <Link to='#'>
            <button className='btn btn-primary'>
              <i className="fa-solid fa-search"></i>
              Cari
            </button>
          </Link>
        </div>
        <div className="d-flex justify-content-end col-md-6 col-lg-6 col-sm-12">
          <DropdownButton id="dropdown-basic-button" title="Unduh" variant="light">
            <Dropdown.Item href="/#/action-1">Excel</Dropdown.Item>
            <Dropdown.Item href="/#/action-2">PDF</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>

      <div className='table-responsive mt-5 ms-5 me-5'>
        <DataTable
          title="Data Kepegawaian"
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