import axios from 'axios'
import { Button } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { KTSVG } from '../../../../_metronic/helpers'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DataTable, { createTheme } from 'react-data-table-component'
import { ThemeModeComponent } from '../../../../_metronic/assets/ts/layout'
import { useThemeMode } from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import Swal from 'sweetalert2'

export const MASTER_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL //http://localhost:3001
export const JENIS_PERDA_PERKADA_URL = `${MASTER_URL}/jenis-perda-perkada` //http://localhost:3001/jenis-perda-perkada

// Theme for dark or light interface
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
const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

const reactSelectLightThem = {
  input: (base: object) => ({
    ...base,
    color: '#5e6278',
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
  container: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    color: '#cccccc',
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: '#cccccc',
  }),
  control: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
    boxShadow: '0 0 0 1px #f5f8fa',
  }),
  singleValue: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
  }),
  option: (base: object) => ({
    ...base,
    height: '100%',
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
}

const reactSelectDarkThem = {
  input: (base: object) => ({
    ...base,
    color: '#92929f',
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
  container: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    color: '#92929f',
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: '#92929f',
  }),
  control: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
    boxShadow: '0 0 0 1px #1b1b29',
  }),
  singleValue: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
  }),
  option: (base: object) => ({
    ...base,
    height: '100%',
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
}
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

export interface FormInput {
  id?: number
  judul?: string
  pasal?: string
  jenis_pelanggaran?: string
  jenis_penertiban?: string
}

export function MapPerdaPerkada() {
  const { mode } = useThemeMode()
  const navigate = useNavigate();
  const calculatedMode = mode === 'system' ? systemMode : mode

  const [valFilterJudul, setFilterJudul] = useState({ val: '' })
  const [valFilterPasal, setFilterPasal] = useState({ val: '' })

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [qParamFind, setUriFind] = useState({ strparam: '' })
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

  const handleChangeInputJenisPerdaPerkada = (event: { //5
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setFilterJudul({ val: event.target.value })
  }
  const handleChangeInputPasal = (event: { //5
    preventDefault: () => void
    target: { value: any; name: any }
  }) => {
    setFilterPasal({ val: event.target.value })
  }

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

  const handleFilter = async () => {
    let uriParam = ''
    if (valFilterJudul.val !== '') {
      uriParam += `judul=${valFilterJudul.val}`
    }
    if (valFilterPasal.val !== '') {
      uriParam += `&pasal=${valFilterPasal.val}`
    }

    setUriFind((prevState) => ({ ...prevState, strparam: uriParam }))
  }

  const handleFilterReset = () => {
    setFilterJudul({ val: '' })
    setFilterPasal({ val: '' })
    setUriFind((prevState) => ({ ...prevState, strparam: '' }))
  }

  const dataPerdaPerkada = (page: number) => {
    axios
      .get(
        `${JENIS_PERDA_PERKADA_URL}/?%24filter=${qParamFind.strparam}&%24top=${perPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          judul: d.judul,
          pasal: d.pasal,
          j_pelanggaran: d.jenis_pelanggaran,
          j_penertiban: d.jenis_penertiban,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        setData(data)
        setTotalRows(res.data.total_items)
        setLoading(false)

        return [data, setData] as const
      })
  }

  useEffect(() => {
    dataPerdaPerkada(0)
  }, [qParamFind, perPage])

  const handlePageChange = (page: number) => {
    dataPerdaPerkada(page - 1)
    console.log('Ini page', page)
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true)
    axios
      .get(
        `${JENIS_PERDA_PERKADA_URL}/?%24filter=${qParamFind.strparam}&%24top=${newPerPage}&%24page=${page}`
      )
      .then((res) => {
        const data = res.data.data.map((d: any) => ({
          id: d.id,
          judul: d.judul,
          pasal: d.pasal,
          j_pelanggaran: d.jenis_pelanggaran,
          j_penertiban: d.jenis_penertiban,
        }))
        Array.from(data).forEach((item: any, index: any) => {
          item.serial = index + 1
        })
        setData(data)
        setPerPage(newPerPage)
        setLoading(false)
      })
  }

  const columns = [
    {
      name: 'No',
      width: '200px',
      sortable: true,
      selector: (row: any) => row.serial,
      cell: (row: any) => {
        return <div className='mb-2 mt-2'>{row.serial}</div>
      }
    },
    {
      name: 'Jenis Perda / Perkada',
      width: '300px',
      sortable: true,
      sortField: 'judul',
      selector: (row: any) => row.judul,
    },
    {
      name: 'Jenis Pasal',
      width: '280px',
      sortable: true,
      sortField: 'pasal',
      selector: (row: any) => row.pasal,
    },
    {
      name: 'Aksi',
      fixed: true,
      center: true,
      sortable: false,
      allowOverflow: true,
      className: 'action',
      cell: (record: any) => {
        return (
          <Fragment>
            <div className='d-flex mb-2 mt-2 flex-end'>
              {[DropdownButton].map((DropdownType, idx) => (
                  <DropdownType
                    as={ButtonGroup}
                    key={idx}
                    id={`dropdown-button-drop-${idx}`}
                    size="sm"
                    variant="light"
                    title="Aksi">
                    <Dropdown.Item
                      onClick={() =>
                        navigate('/master/MapPerdaPerkada/LihatMapPerdaPerkada/' + record.id)}
                    >
                      Detail
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        navigate('/master/MapPerdaPerkada/UpdateMapPerdaPerkada/' + record.id)}
                    >
                      Ubah
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => konfirDel(record.id)}>
                      Hapus
                    </Dropdown.Item>
                  </DropdownType>
              ))}
            </div>
          </Fragment>
        );
      },
    },
  ]

  // DELETE
  const konfirDel = (id: number) => {
    Swal.fire({
      text: 'Anda yakin ingin menghapus data ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya!',
      cancelButtonText: 'Tidak!',
      color: '#000000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const bodyParam = {
          data: {
            deleted_by: 0,
          },
        }
        const response = await axios.delete(`${JENIS_PERDA_PERKADA_URL}/${id}`, bodyParam)
        if (response) {
          dataPerdaPerkada(0)
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil dihapus',
            showConfirmButton: false,
            timer: 1500,
            color: '#000000',
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Data gagal dihapus, harap mencoba lagi',
            showConfirmButton: false,
            timer: 1500,
            color: '#000000',
          })
        }
      }
    })
  }
  // END::DELETE

  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className="row g-8 mt-2 ms-5 me-5">
        <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-6'>
          <label htmlFor='' className='mb-3'>
            <h3>Jenis Perda / Perkada</h3>
          </label>
          <input
            type='text'
            className='form-control form-control form-control-solid'
            name='q'
            value={valFilterJudul.val}
            onChange={handleChangeInputJenisPerdaPerkada}
            placeholder='Jenis Perda / Perkada'
          />
        </div>
        <div className='col-xxl-6 col-lg-6 col-md-3 col-sm-6'>
          <label htmlFor='' className='mb-3'>
            <h3>Jenis Pasal</h3>
          </label>
          <input
            type='text'
            className='form-control form-control form-control-solid'
            name='q'
            value={valFilterPasal.val}
            onChange={handleChangeInputPasal}
            placeholder='Jenis Pasal'
          />
        </div>
      </div>

      <div className="row g-8 mt-2 ms-5 me-5">
        <div className='col-md-6 col-lg-6 col-sm-12'>
          <Button
            className='btn btn-light-primary me-2'
            onClick={handleFilter}
          >
            <KTSVG
              path='/media/icons/duotune/general/gen021.svg'
              className='svg-icon-2'
            />
            Cari
          </Button>
          <Button
            className='btn btn-light-primary me-2'
            onClick={handleFilterReset}
          >
            <i className='fa-solid fa-arrows-rotate svg-icon-2'></i>
            Reset
          </Button>
        </div>

        <div className="d-flex justify-content-end col-md-6 col-lg-6 col-sm-12">
          <Link to='/master/MapPerdaPerkada/TambahMapPerdaPerkada'>
            <button className='btn btn-primary me-5'>
              <i className="fa-solid fa-plus"></i>
              Tambah
            </button>
          </Link>
        </div>
      </div>
      <div className='table-responsive mt-5 ms-5 me-5'>
        <DataTable
          pagination
          data={data}
          paginationServer
          columns={columns}
          progressPending={loading}
          customStyles={customStyles}
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
          progressComponent={<LoadingAnimation />}
          theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
          noDataComponent={
            <div className='alert alert-primary d-flex align-items-center p-5 mt-10 mb-10'>
              <div className='d-flex flex-column'>
                <h5 className='mb-1 text-center'>Data tidak ditemukan..!</h5>
              </div>
            </div>
          }
        />
      </div>
      {/* end::Body */}
    </div>
  )
}


