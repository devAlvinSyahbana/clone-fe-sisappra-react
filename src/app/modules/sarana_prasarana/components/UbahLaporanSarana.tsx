import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link,useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import {useFormik} from 'formik'


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

export function UbahLaporanSarana() {
  const [show, setShow] = useState(false)
  const [showOtherAlert, setStateAlert] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const {id} = useParams()
  console.log(id)

  const [inputValJenis, setDataJenis] = useState({label: '', value: null})
  const [inputValStatus, setDataStatus] = useState({label: '', value: null})
  const [inputValKondisi, setDataKondisi] = useState({label: '', value: null})

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [qParamFind, setUriFind] = useState({strparam: ''})
  
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

  var [value, onChange] = useState(new Date()); /* Date Picker */

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
        const response = await axios.put(`${SARANA_PRASARANA_URL}/update`, bodyparam)
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
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_content" className="app-content flex-column-fluid">
          <div id="kt_app_content_container" className="app-container container-xxl">
            <div className="card mb-3 mb-xl-2">
              <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
              <div className='row g-6 mt-2 ms-5 me-5 justify-content-md-center'>
                <div className='col-md-5'>
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
              <div className='row g-6 mt-2 ms-5 me-5 justify-content-md-center'>
                <div className='col-md-5'>
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
              <div className='row g-6 mt-2 ms-5 me-5 justify-content-md-center'>
                <div className='col-md-5'>
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
              <div className='row g-6 mt-2 ms-5 me-5 justify-content-md-center'>
                <div className='col-md-5'>
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
              <div className='row g-6 mt-2 ms-5 me-5 justify-content-md-center'>
                <div className='col-md-5'>
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
              <div className='row g-6 mt-2 ms-5 me-5 justify-content-md-center'>
                <div className='col-md-5'>
                  <div className='form-group'>
                    <Form.Label>File Dokumentasi</Form.Label>
                    <Form.Control type='file' id='firstimg' />
                  </div>
                </div>
              </div>
              </form>
              <div className="card-footer">
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link to="#">
                    <button className="btn btn-secondary" onClick={handleClose}><i
                      className="fa-solid fa-arrow-left"></i> 
                      Kembali
                    </button>
                  </Link>
                  <Link to="#">
                    <button className="btn btn-primary" type="submit">
                      <i className="fa-solid fa-paper-plane"></i> 
                      Simpan
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
    </div>
  )
}