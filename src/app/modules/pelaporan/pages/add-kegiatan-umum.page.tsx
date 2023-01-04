import React, {FC, useEffect, useState, FormEvent, useRef} from 'react'
import {StepDetailKegiatan} from './steps/step-detail-kegiatan'
import {StepTindaklanjut} from './steps/step-tindaklanjut'
import {StepDokumentasi} from './steps/step-dokumentasi'
import {useDispatch, useSelector} from 'react-redux'
import {
  createSchemaPelaporanKegiatan,
  initialState,
  PelaporanKegiatanState,
  changedValue,
  isApelRapat,
  updateJenisKegiatanList,
  updateDetailJenisPasalList,
  updateJenisPenindakanList,
  updateJenisUsahaList,
  updateJenisPenyelesaianList,
  isPengamanan,
  isTipiring,
  isLaporanMasyarakat,
  isPPKM,
  isPenertibanBangunan,
  isPenertibanMinol,
  reset,
  editInitialState,
  updateDetailJenisPasalKegiatanList,
  updateDetailJenisPasalPenyelesaianList,
} from '../../../redux/slices/pelaporan-kegiatan.slice'
import {Formik, Form, FormikValues, FormikContext} from 'formik'
import axios from 'axios'
import {ToFieldStateBNV, ToFieldStateCE} from '../components/fields.formikcto'
import {RootState} from '../../../redux/store'
import Swal from 'sweetalert2'
import {useLocation, useNavigate, useParams} from 'react-router-dom'

export const API_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL

export const AddKegiatanUmumPage: FC = () => {
  const [currentSchema, setCurrentSchema] = useState(createSchemaPelaporanKegiatan[0])
  const [currentIntialState, setCurrentIntialState] = useState(initialState)
  // const [filteredObject, setFilteredObject] = useState({})
  const [loading, setLoading] = useState(true)
  const [detailState, setDetailState] = useState(false)

  const {id} = useParams()
  const usePathname = () => {
    const location = useLocation()
    return location.pathname
  }
  const currentLocation = usePathname()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allValues = useSelector((s: RootState) => s.pelaporanKegiatan)

  const listMasterJenisValue = async () => {
    dispatch(updateJenisKegiatanList())
    dispatch(updateDetailJenisPasalList())
    dispatch(updateJenisPenyelesaianList())
    dispatch(updateJenisPenindakanList())
    dispatch(updateJenisUsahaList())
    if (!id) {
      dispatch(
        changedValue({
          target: {
            name: 'created_by',
            value: createdByHakAkses.data.hak_akses,
          },
        })
      )
    }
  }

  let value: any = localStorage.getItem('kt-auth-react-v')
  let createdByHakAkses = JSON.parse(value)

  const editPelaporanKegiatan = async () => {
    const res = await axios.get(`${API_URL}/kegiatan-umum/?%24filter=id%20eq%20${id}`)
    // const data = res.data.data[0]
    const filteredData = Object.fromEntries(
      Object.entries(res.data.data[0]).filter(
        ([key, value]) => value !== 0 && value !== '' && value !== '0'
      )
    )
    // setFilteredObject({...initialState, ...filter})
    // const filteredObject = {...initialState, ...filter}
    // console.log(filteredData)

    dispatch(editInitialState({...allValues, ...filteredData}))
    setCurrentIntialState({...allValues, ...filteredData})
    // const currentDate = new Date()
    // const formattedCurrentDate = currentDate.toISOString()

    dispatch(
      changedValue({
        target: {
          name: 'updated_by',
          value: createdByHakAkses.data.hak_akses,
        },
      })
    )

    setLoading(false)
  }

  const loadingComponent = (
    <div className='btn btn-primary d-flex align-items-center'>
      <span className='spinner-border spinner-border me-5' role='status' aria-hidden='true'></span>
      Loading...
    </div>
  )

  useEffect(() => {
    listMasterJenisValue()
    if (currentLocation.indexOf('Detail') !== -1) {
      //  console.log('The string was found!')
      setDetailState(true)
    } else {
      // console.log('The string was not found.')
      setDetailState(false)
    }
    if (!id) setLoading(false)
  }, [])

  // useeffect untuk fungsi ubah
  useEffect(() => {
    if (
      id &&
      allValues.list_jenis_kegiatan.length > 0 &&
      allValues.list_detail_jenis_pasal.length > 0 &&
      allValues.list_jenis_penyelesaian.length > 0
    ) {
      editPelaporanKegiatan()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allValues.list_detail_jenis_pasal.length,
    allValues.list_jenis_kegiatan.length,
    allValues.list_jenis_penyelesaian.length,
  ])

  useEffect(() => {
    if (allValues.kegiatan__jenis_kegiatan_id > 0 && allValues.list_detail_jenis_pasal.length > 0) {
      dispatch(
        updateDetailJenisPasalKegiatanList([allValues.kegiatan__jenis_kegiatan_id, allValues])
      )
      dispatch(
        updateDetailJenisPasalPenyelesaianList([
          allValues.tindak_lanjut__administrasi__jenis_pasal_id,
          allValues,
        ])
      )
    }
  }, [allValues.kegiatan__jenis_kegiatan_id])

  const submitPelaporanKegiatan = async (values: PelaporanKegiatanState, actions: FormikValues) => {
    let res
    try {
      // alert(JSON.stringify(values, null, 2))
      if (id) {
        if (isPengamanan(values)) {
          res = await axios.put(`${API_URL}/kegiatan-pengamanan/${id}`, allValues)
        } else if (isLaporanMasyarakat(values)) {
          res = await axios.put(`${API_URL}/kegiatan-masyarakat/${id}`, allValues)
        } else if (isPPKM(values)) {
          res = await axios.put(`${API_URL}/kegiatan-ppkm/${id}`, allValues)
        } else if (isTipiring(values)) {
          res = await axios.put(`${API_URL}/kegiatan-sidang-tipiring/${id}`, allValues)
        } else if (isPenertibanBangunan(values)) {
          res = await axios.put(`${API_URL}/kegiatan-penertiban-bangunan/${id}`, allValues)
        } else if (isPenertibanMinol(values)) {
          res = await axios.put(`${API_URL}/kegiatan-penertiban-minol/${id}`, allValues)
        } else {
          res = await axios.put(`${API_URL}/kegiatan-umum/${id}`, allValues)
        }
      } else {
        if (isPengamanan(values)) {
          res = await axios.post(`${API_URL}/kegiatan-pengamanan`, allValues)
        } else if (isLaporanMasyarakat(values)) {
          res = await axios.post(`${API_URL}/kegiatan-masyarakat`, allValues)
        } else if (isPPKM(values)) {
          res = await axios.post(`${API_URL}/kegiatan-ppkm`, allValues)
        } else if (isTipiring(values)) {
          res = await axios.post(`${API_URL}/kegiatan-sidang-tipiring`, allValues)
        } else if (isPenertibanBangunan(values)) {
          res = await axios.post(`${API_URL}/kegiatan-penertiban-bangunan`, allValues)
        } else if (isPenertibanMinol(values)) {
          res = await axios.post(`${API_URL}/kegiatan-penertiban-minol`, allValues)
        } else {
          res = await axios.post(`${API_URL}/kegiatan-umum`, allValues)
        }
      }
      if (res) {
        actions.setSubmitting(false)
        Swal.fire({
          icon: 'success',
          text: 'Data berhasil disubmit',
          showConfirmButton: false,
          timer: 1500,
          color: '#000000',
        })
        if (!id) {
          actions.resetForm(initialState)
          dispatch(reset())
          listMasterJenisValue()
        }
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
  }

  // console.log(allValues)

  return (
    <>
      {loading ? (
        loadingComponent
      ) : (
        <Formik
          validationSchema={currentSchema}
          initialValues={id ? currentIntialState : initialState}
          enableReinitialize={true}
          onSubmit={submitPelaporanKegiatan}
        >
          {({handleReset, handleSubmit, errors, values, setFieldValue}) => (
            <Form className='mx-auto w-100 pt-15 pb-10' id='pelaporan_kegiatan_form'>
              <>
                <div className='card'>
                  <div className='card-body'>
                    <ul className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
                      <li className='nav-item'>
                        <a className='nav-link active' data-bs-toggle='tab' href='#kt_tab_pane_1'>
                          KEGIATAN
                        </a>
                      </li>
                      {!isApelRapat(values) && (
                        <li className='nav-item'>
                          <a className='nav-link' data-bs-toggle='tab' href='#kt_tab_pane_2'>
                            TINDAK LANJUT
                          </a>
                        </li>
                      )}
                      <li className='nav-item'>
                        <a className='nav-link' data-bs-toggle='tab' href='#kt_tab_pane_3'>
                          DOKUMENTASI
                        </a>
                      </li>
                    </ul>

                    <div className='tab-content' id='myTabContent'>
                      <div className='tab-pane fade show active' id='kt_tab_pane_1' role='tabpanel'>
                        <StepDetailKegiatan
                          values={values}
                          handleReset={handleReset}
                          listMasterJenisValue={listMasterJenisValue}
                          allValues={allValues}
                          detailState={detailState}
                        />
                      </div>
                      <div className='tab-pane fade' id='kt_tab_pane_2' role='tabpanel'>
                        <StepTindaklanjut
                          values={values}
                          setFieldValue={setFieldValue}
                          allValues={allValues}
                          detailState={detailState}
                        />
                      </div>
                      <div className='tab-pane fade' id='kt_tab_pane_3' role='tabpanel'>
                        <StepDokumentasi detailState={detailState} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card mt-5'>
                  <div className='card-body'>
                    <div className='row w-100'>
                      <div className='col'></div>
                      <div className='col'>
                        <div className='row'>
                          <button
                            type='button'
                            onClick={() => navigate(-1)}
                            className='col-5 btn btn-flex btn-secondary px-6 m-3'
                          >
                            <span className='svg-icon svg-icon-2x'>
                              <i className='fa-solid fa-arrow-left'></i>
                            </span>
                            <span className='d-flex flex-column align-items-start ms-2'>
                              <span className='fs-3 fw-bold'>Kembali</span>
                              <span className='fs-7'>ke Halaman Utama</span>
                            </span>
                          </button>
                          <button
                            type='submit'
                            className='col-5 btn btn-flex btn-primary px-6 m-3'
                            disabled={detailState}
                          >
                            <span className='svg-icon svg-icon-2x'>
                              <i className='fa-solid fa-paper-plane'></i>
                            </span>
                            <span className='d-flex flex-column align-items-start ms-2'>
                              {!id ? (
                                <span className='fs-3 fw-bold'>Kirim Laporan</span>
                              ) : (
                                <>
                                  <span className='fs-3 fw-bold'>Simpan</span>
                                  <span className='fs-7'>Perubahan</span>
                                </>
                              )}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}
