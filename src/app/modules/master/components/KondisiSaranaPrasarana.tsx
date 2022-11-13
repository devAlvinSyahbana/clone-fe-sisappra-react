import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import { useFormik } from 'formik'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const KONDISI_SARANA_PRASARANA_URL = `${API_URL}/master/kondisi-sarana-prasarana` //http://localhost:3000/kondisi-sarana-prasarana

export interface FormInput {
  kondisi_sarana_prasarana?: string
  created_by?: number
}


export function KondisiSaranaPrasarana() {
  const navigate = useNavigate()
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})
  const [show, setShow] = useState(false)
  const handleKataClose = () => setShowKata(false)
  const [showKata, setShowKata] = useState(false)
  const [qParamFind, setUriFind] = useState({ strparam: '' })
  const [valFilterKondisiSaranaPrasarana, setFilterKondisiSaranaPrasarana] = useState({ val: '' }) //3
  const handleKataShow = () => setShowKata(true)
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [perPage, setPerPage] = useState(10);

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

  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }
 
  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      const response = await axios.get(`${KONDISI_SARANA_PRASARANA_URL}/filter/${qParamFind.strparam}`)
      setTemp(response.data.data)
      setTotalRows(response.data.total_data)
      setLoading(false)
    }
    fetchUsers(1)
    fetchDT(1)
  }, [qParamFind, perPage])

  const formik = useFormik({
    initialValues: {
      kondisi_sarana_prasarana: '',
      id_modul_permission: 0,
    },
    onSubmit: async (values) => {
      let formData = new FormData()
      const bodyparam: FormInput = {
        kondisi_sarana_prasarana: valuesFormik?.kondisi_sarana_prasarana ? valuesFormik.kondisi_sarana_prasarana : '',
        created_by: 0,
      }
      try {
        const response = await axios.post(`${KONDISI_SARANA_PRASARANA_URL}/create`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/master/KondisiSaranaPrasarana', { replace: true })
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
  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.id,
      sortable: true,
      sortField: 'id',
    },
    {
    },
    {
      name: 'kondisi SaranaPrasarana',
      selector: (row: any) => row.kondisi_sarana_prasarana,
      sortable: true,
      sortField: 'kondisi_sarana_prasarana',
    },
    {
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
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate('/master/KondisiSaranaPrasarana/LihatKondisiSaranaPrasarana/' + record.id, { replace: true })
                      }
                    >
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate('/master/KondisiSaranaPrasarana/UpdateKondisiSaranaPrasarana/' + record.id, { replace: true })
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
        );
      },
    },

  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  
   
  const [temp, setTemp] = useState([]);

  const fetchUsers = async (page: any) => {
    setLoading(true);
    const value = await axios.get(KONDISI_SARANA_PRASARANA_URL + "/find");

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
        const response = await axios.delete(`${KONDISI_SARANA_PRASARANA_URL}/delete/${id}`, bodyParam)
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

  const handleFilter = async () => {
    let uriParam = ''
    if (valFilterKondisiSaranaPrasarana.val !== '') {
      uriParam += `${valFilterKondisiSaranaPrasarana.val}`
    }
    setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
  }
  const handleChangeInputKondisiSaranaPrasarana = (event: {
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setFilterKondisiSaranaPrasarana({ val: event.target.value })
  } //4

  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className="row g-8 mt-2 ms-5 me-5">
          <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-10'>
            <label htmlFor='' className='mb-3'>
              Kondisi Sarana Prasarana
            </label>
            <input
            type='text'
            className='form-control form-control form-control-solid'
            name='q'
            value={valFilterKondisiSaranaPrasarana.val}
            onChange={handleChangeInputKondisiSaranaPrasarana} //5
            placeholder='KondisiSaranaPrasarana'
          />
          </div>
      </div>
      <div className="row g-8 mt-2 ms-5 me-5">
        <div className='col-md-6 col-lg-6 col-sm-12'>
        <Link to='#' onClick={handleFilter}> 
            <button className='btn btn-primary'>
              <i className='fa-solid fa-search'></i>
              Cari
            </button>
          </Link>
        </div>
        
        <div className="d-flex justify-content-end col-md-6 col-lg-6 col-sm-12">
          <Link to='#i'>
            <button className='btn btn-primary me-5' onClick={handleKataShow}>
              <i className="fa-solid fa-plus"></i>
              Tambah
            </button>
          </Link>
        </div>
      </div>
      <>
      <Modal show={showKata} onHide={handleKataClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Kondisi Sarana Prasarana</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <div className='row mt-2'>
                <div className='col-12 mb-6'>
                  <div className='form-group'>
                    <Form.Label>Kondisi Sarana Prasarana</Form.Label>
                    <br />
                    <Form.Control
                      name='kondisi_sarana_prasarana'
                      className='form-control form-control-solid'
                      onChange={handleChangeFormik}
                      value={valuesFormik?.kondisi_sarana_prasarana}
                    />
                  </div>
                </div>
              </div>
              <Modal.Footer>
              <div className='d-grid gap-2 d-md-flex justify-content-md-left'>
                <Link to='master/KondisiSaranaPrasarana' >
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
