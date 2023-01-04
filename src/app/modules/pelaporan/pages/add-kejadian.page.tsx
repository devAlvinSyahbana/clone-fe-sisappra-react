import React, {FC, useEffect, useState, FormEvent, useRef} from 'react'
import {StepDetailKejadian} from './steps/step-detail-kejadian'
import {StepTindakLanjutKejadian} from './steps/step-tindaklanjut-kejadian'
import {useDispatch, useSelector} from 'react-redux'
import {
  createSchemaPelaporanKejadian,
  initialState,
  PelaporanKejadianState,
  changedValue,
  isBanjir,
  isPendampinganKekerasanPadaPerempuan,
  isUnjukRasa,
  jenisKejadianList,
  reset,
  editInitialState,
  updateSumberInformasiList,
  updateKecamatanList,
  updateKotaList,
  updateKelurahanList,
  updateJenisBantuanInstansiTerkait,
  updateJenisBantuanSatpolPP,
  updateJenisKekerasan,
  updateKorbanJiwa,
  updateKorbanMaterial,
} from '../../../redux/slices/pelaporan-kejadian.slice'
import {Formik, Form, FormikValues, FormikContext} from 'formik'
import {RootState} from '../../../redux/store'
import {useNavigate, useParams, useLocation} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export const API_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL

export const AddKejadianPage: FC = () => {
  const [currentSchema, setCurrentSchema] = useState(createSchemaPelaporanKejadian[0])
  const [currentInitialState, setCurrentIntialState] = useState(initialState)
  const [loading, setLoading] = useState(true)

  const {id} = useParams()
  const allValues = useSelector((s: RootState) => s.pelaporanKejadian)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [detailState, setDetailState] = useState(false)

  const usePathname = () => {
    const location = useLocation()
    return location.pathname
  }
  const currentLocation = usePathname()

  let value: any = localStorage.getItem('kt-auth-react-v')
  let createdbyHakAkses = JSON.parse(value)

  const listMasterKejadianValue = () => {
    dispatch(jenisKejadianList())
    dispatch(updateKecamatanList())
    dispatch(updateKotaList())
    dispatch(updateKelurahanList())
    dispatch(updateSumberInformasiList())
    dispatch(updateJenisBantuanInstansiTerkait())
    dispatch(updateJenisBantuanSatpolPP())
    dispatch(updateJenisKekerasan())
    dispatch(updateKorbanJiwa())
    dispatch(updateKorbanMaterial())
  }

  const editPelaporanKejadian = async () => {
    const res = await axios.get(`${API_URL}/kejadian-umum/?%24filter=id%20eq%20${id}`)

    const filteredData = Object.fromEntries(
      Object.entries(res.data.data[0]).filter(
        ([key, value]) => value !== 0 && value !== '' && value !== '0'
      )
    )

    dispatch(editInitialState({...allValues, ...filteredData}))
    setCurrentIntialState({...allValues, ...filteredData})

    dispatch(
      changedValue({
        target: {
          name: 'updated_by',
          value: createdbyHakAkses.data.hak_akses,
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
    listMasterKejadianValue()
    if (currentLocation.indexOf('Detail') !== -1) setDetailState(true)
    if (id) {
      editPelaporanKejadian()
    }
    if (!id) {
      dispatch(
        changedValue({
          target: {
            name: 'created_by',
            value: createdbyHakAkses.data.hak_akses,
          },
        })
      )
    }
    if (!id) setLoading(false)
  }, [allValues.created_by])

  const submitPelaporanKejadian = async (values: PelaporanKejadianState, actions: FormikValues) => {
    let res
    try {
      if (id) {
        if (isBanjir(values)) {
          res = await axios.put(`${API_URL}/kejadian-banjir/${id}`, allValues)
        } else if (isUnjukRasa(values)) {
          res = await axios.put(`${API_URL}/kejadian-unjuk-rasa/${id}`, allValues)
        } else if (isPendampinganKekerasanPadaPerempuan(values)) {
          res = await axios.put(`${API_URL}/kejadian-kekerasan-perak/${id}`, allValues)
        } else {
          res = await axios.put(`${API_URL}/kejadian-umum/${id}`, allValues)
        }
      } else {
        if (isBanjir(values)) {
          res = await axios.post(`${API_URL}/kejadian-banjir`, allValues)
        } else if (isPendampinganKekerasanPadaPerempuan(values)) {
          res = await axios.post(`${API_URL}/kejadian-kekerasan-perak`, allValues)
        } else if (isUnjukRasa(values)) {
          res = await axios.post(`${API_URL}/kejadian-unjuk-rasa`, allValues)
        } else {
          res = await axios.post(`${API_URL}/kejadian-umum`, allValues)
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
          listMasterKejadianValue()
          navigate(-1)
        }
      }
      // alert(JSON.stringify(values, null, 2))
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

  return (
    <>
      {loading ? (
        loadingComponent
      ) : (
        <Formik
          validationSchema={currentSchema}
          initialValues={id ? currentInitialState : initialState}
          enableReinitialize={true}
          onSubmit={submitPelaporanKejadian}
        >
          {({handleReset, handleSubmit, errors, values, setFieldValue}) => (
            <Form className='mx-auto w-100 pt-15 pb-10' id='pelaporan_kejadian_form'>
              <>
                <div className='card'>
                  <div className='card-body'>
                    <ul className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
                      <li className='nav-item'>
                        <a className='nav-link active' data-bs-toggle='tab' href='#kt_tab_pane_1'>
                          KEJADIAN
                        </a>
                      </li>

                      <li className='nav-item'>
                        <a className='nav-link' data-bs-toggle='tab' href='#kt_tab_pane_2'>
                          TINDAK LANJUT
                        </a>
                      </li>
                    </ul>

                    <div className='tab-content' id='myTabContent'>
                      <div className='tab-pane fade show active' id='kt_tab_pane_1' role='tabpanel'>
                        <StepDetailKejadian
                          values={values}
                          handleReset={handleReset}
                          listMasterKejadianValue={listMasterKejadianValue}
                          allValues={allValues}
                          detailState={detailState}
                        />
                      </div>
                      <div className='tab-pane fade' id='kt_tab_pane_2' role='tabpanel'>
                        <StepTindakLanjutKejadian
                          values={values}
                          setFieldValue={setFieldValue}
                          detailState={detailState}
                        />
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
                          {!detailState && (
                            <button
                              type='submit'
                              className='col-5 btn btn-flex btn-primary px-6 m-3'
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
                          )}
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
