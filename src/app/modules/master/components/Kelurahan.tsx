import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import DataTable, {createTheme, ExpanderComponentProps} from 'react-data-table-component'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Swal from 'sweetalert2'
import {ThemeModeComponent} from '../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {Kecamatan} from './Kecamatan'

const API_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL //http://localhost:3000
export const KELURAHAN_URL = `${API_URL}/kelurahan` //http://localhost:3000/master/kelurahan

createTheme(
  'darkMetro',
  {
    text: {
      primary: '#92929f',
      secondary: '#92929f',
    },
    background: {
      default: '#1e1e2e',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#2b2c41',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  },
  'dark'
)

const customStyles = {
  rows: {
    style: {
      minHeight: '105px', // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: '14px', // override the cell padding for head cells
      paddingRight: '14px',
    },
  },
  cells: {
    style: {
      paddingLeft: '14px', // override the cell padding for data cells
      paddingRight: '14px',
    },
  },
}
const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

export function Kelurahan() {
  // STATE SECTION
  const navigate = useNavigate()
  const [valFilterKelurahan, setFilterKelurahan] = useState({val: ''})
  const [valFilterKecamatan, setFilterKecamatan] = useState({val: ''})
  const [qParamFind, setUriFind] = useState({strparam: ''})
  const [loading, setLoading] = useState(false)
  const [perPage, setPerPage] = useState(10)
  const [temp, setTemp] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  // const [data, setData] = useState([])

  // END STATE SECTION

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
    if (valFilterKecamatan.val !== '') {
      uriParam += `kecamatan=${valFilterKecamatan.val}`
    }
    if (valFilterKelurahan.val !== '') {
      uriParam += `&kelurahan=${valFilterKelurahan.val}`
    }
    setUriFind((prevState) => ({...prevState, strparam: uriParam}))
  }

  const handleChangeInputKelurahan = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setFilterKelurahan({val: event.target.value})
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
      selector: (row: any) => row.serial,
      sortable: true,
      sortField: 'no',
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      },
    },
    {
      name: 'Kode Kelurahan',
      selector: (row: any) => row.kode_kelurahan,
      sortable: true,
      sortField: 'kelurahan',
    },
    {
      name: 'Kelurahan',
      selector: (row: any) => row.kelurahan,
      sortable: true,
      sortField: 'kelurahan',
    },
    {
      name: 'Kode Kecamatan',
      selector: (row: any) => row.kode_kecamatan,
      sortable: true,
      sortField: 'Kode kecamatan',
    },
    {
      name: 'Kecamatan',
      selector: (row: any) => row.kecamatan,
      sortable: true,
      sortField: 'kecamatan',
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
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate('/master/Kelurahan/LihatKelurahan/' + record.id, {replace: true})
                      }
                    >
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item
                      href='#'
                      onClick={() =>
                        navigate('/master/Kelurahan/Updatekelurahan/' + record.id, {replace: true})
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

  useEffect(() => {
    fetchUsers(1)
  }, [])

  //if(valFilterKecamatan.val ? valFilterKecamatan.val : '' || valFilterKelurahan.val ? valFilterKelurahan.val : ''){
  useEffect(() => {
    async function fetchDT(page: number) {
      setLoading(true)
      console.log(qParamFind)
      const response = await axios.get(
        `${KELURAHAN_URL}/findone-by-kelurahan?${qParamFind.strparam}`
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
    const value = await axios.get(KELURAHAN_URL + '/find')
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

  // const handlePageChange = (page: any) => {
  //   fetchUsers(page)
  // }

  // const handlePerRowsChange = async (newPerPage: any, page: any) => {
  //   setLoading(true)

  //   const response = await axios.get(
  //     `https://reqres.in/api/users?page=${page}&per_page=${newPerPage}delay=1`
  //   )

  //   setData(response.data.data)
  //   setPerPage(newPerPage)
  //   setLoading(false)
  // }

  // const handleSort = (column: any, sortDirection: any) => {
  //   // simulate server sort
  //   console.log(column, sortDirection)
  //   setLoading(true)

  //   // instead of setTimeout this is where you would handle your API call.
  //   setTimeout(() => {
  //     setData(orderBy(data, column.sortField, sortDirection))
  //     setLoading(false)
  //   }, 100)
  // }

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
        const response = await axios.delete(`${KELURAHAN_URL}/delete/${id}`, bodyParam)
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
        {/* {valFilterKecamatan.val === 'PNS' || valFilterKecamatan.val === '' ? ( */}
        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
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
        {/* ) : null} */}
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        {/* {valFilterKelurahan.val === 'PNS' || valFilterKelurahan.val === '' ? ( */}
        <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
          <label htmlFor='' className='mb-3'>
            Kelurahan
          </label>
          <input
            type='text'
            className='form-control form-control form-control-solid'
            name='kelurahan'
            value={valFilterKelurahan.val}
            onChange={handleChangeInputKelurahan}
            placeholder='Kelurahan'
          />
        </div>
        {/* ) : null} */}
      </div>
      <div className='row g-8 mt-2 ms-5 me-5'>
        <div className='col-md-6 col-lg-6 col-sm-12'>
          <Link to='#'>
            <button onClick={handleFilter} className='btn btn-primary'>
              <i className='fa-solid fa-search'></i>
              Cari
            </button>
          </Link>
        </div>

        <div className='d-flex justify-content-end col-md-6 col-lg-6 col-sm-12'>
          <Link to='/master/Kelurahan/TambahKelurahan'>
            <button className='btn btn-primary me-5'>
              <i className='fa-solid fa-plus'></i>
              Tambah
            </button>
          </Link>
        </div>
      </div>

      <div className='table-responsive mt-5 ms-5 me-5'>
        {/* <DataTable columns={columns} data={temp} pagination /> */}
        {/* <DataTable
          columns={columns}
          data={temp}
          progressPending={loading}
          progressComponent={<LoadingAnimation />}
          pagination
          paginationTotalRows={totalRows}
        /> */}
        {temp?.length > 0 && temp && ( //urutan 4
          <DataTable
            columns={columns}
            data={temp}
            progressPending={loading}
            customStyles={customStyles}
            progressComponent={<LoadingAnimation />}
            pagination
            // paginationServer
            paginationTotalRows={totalRows}
            //    expandableRowsComponent={(row) => (
            //   <ExpandedComponent row={row} handleInputChange={handleInputChange} />
            // )}
            // expandableRowsComponent={ExpandedComponent}
            // onChangeRowsPerPage={handlePerRowsChange}
            // onChangePage={handlePageChange}
            theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
            noDataComponent={
              <div className='alert alert-primary d-flex align-items-center p-5 mt-10 mb-10'>
                <div className='d-flex flex-column'>
                  <h5 className='mb-1 text-center'>Data tidak ditemukan..!</h5>
                </div>
              </div>
            }
          />
        )}
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
