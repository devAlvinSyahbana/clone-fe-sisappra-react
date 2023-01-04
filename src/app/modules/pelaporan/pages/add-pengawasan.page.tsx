import React, {FC, useEffect, useState, FormEvent, useRef} from 'react'
import {StepDetailPengawasan} from './steps/step-detail-pengawasan'
import {StepTindakLanjutPengawasan} from './steps/step-tindaklanjut-pengawasan'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../redux/store'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {
  createSchemaPelaporanPengawasan,
  initialState,
  PelaporanPengawasanState,
  changedValue,
  updateKecamatanList,
  updateKotaList,
  updateKelurahanList,
  updateKawasanKendaliList,
  updateJenisReklameList,
  updateStatusReklameList,
  reset,
  editInitialState,
} from '../../../redux/slices/pelaporan-pengawasan-reklame.slice'

import {Formik, Form, FormikValues} from 'formik'
import Swal from 'sweetalert2'

export const API_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL

export const AddPengawasanPage: FC = () => {
  const [currentSchema, setCurrentSchema] = useState(createSchemaPelaporanPengawasan[0])
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allValues = useSelector((s: RootState) => s.pelaporanPengawasan)
  const [loading, setLoading] = useState(true)
  const [currentIntialState, setCurrentIntialState] = useState(initialState)
  const [detailState, setDetailState] = useState(false)

  const usePathname = () => {
    const location = useLocation()
    return location.pathname
  }
  const currentLocation = usePathname()

  const listMasterPengawasanValue = async () => {
    dispatch(updateKecamatanList())
    dispatch(updateKotaList())
    dispatch(updateKelurahanList())
    dispatch(updateKawasanKendaliList())
    dispatch(updateStatusReklameList())
    dispatch(updateJenisReklameList())
  }

  let value: any = localStorage.getItem('kt-auth-react-v')
  let createdByHakAkses = JSON.parse(value)

  const editPelaporanPengawasan = async () => {
    const res = await axios.get(`${API_URL}/reklame/?%24filter=id%20eq%20${id}`)
    // const data = res.data.data[0]
    const filteredData = Object.fromEntries(
      Object.entries(res.data.data[0]).filter(
        ([key, value]) => value !== 0 && value !== '' && value !== '0'
      )
    )

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
    listMasterPengawasanValue()
    if (currentLocation.indexOf('Detail') !== -1) setDetailState(true)
    if (!id) setLoading(false)
  }, [])
  useEffect(() => {
    if (
      id &&
      allValues.list_kota.length > 0 &&
      allValues.list_kecamatan.length > 0 &&
      allValues.list_kelurahan.length > 0
    ) {
      editPelaporanPengawasan()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allValues.list_kecamatan.length, allValues.list_kota.length, allValues.list_kelurahan.length])

  useEffect(() => {
    // if (id) {
    //   editPelaporanPengawasan()
    // }
    if (!id) {
      dispatch(
        changedValue({
          target: {
            name: 'created_by',
            value: createdByHakAkses.data.hak_akses,
          },
        })
      )
      setLoading(false)
    }
  }, [allValues.created_by])

  const submitPelaporanPengawasan = async (
    values: PelaporanPengawasanState,
    actions: FormikValues
  ) => {
    let res
    try {
      if (id) {
        res = await axios.put(`${API_URL}/reklame/${id}`, allValues)
      } else {
        res = await axios.post(`${API_URL}/reklame/`, allValues)
      }
      if (res) {
        console.log('laststep', values)
        actions.setSubmitting(false)
        Swal.fire({
          icon: 'success',
          text: 'Data berhasil disubmit',
          showConfirmButton: false,
          timer: 1500,
          color: '#000000',
        })
        actions.resetForm(initialState)
        dispatch(reset())
        listMasterPengawasanValue()
        navigate(-1)
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

  return (
    <>
      {loading ? (
        loadingComponent
      ) : (
        <Formik
          validationSchema={currentSchema}
          initialValues={id ? currentIntialState : initialState}
          enableReinitialize={true}
          onSubmit={submitPelaporanPengawasan}
        >
          {({handleReset, handleSubmit, errors, values, setFieldValue}) => (
            <Form className='mx-auto w-100 pt-15 pb-10' id='pelaporan_pengawasan_form'>
              <>
                <div className='card'>
                  <div className='card-body'>
                    <ul className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
                      <li className='nav-item'>
                        <a className='nav-link active' data-bs-toggle='tab' href='#kt_tab_pane_1'>
                          REKLAME
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
                        <StepDetailPengawasan
                          values={values}
                          handleReset={handleReset}
                          listMasterPengawasanValue={listMasterPengawasanValue}
                          detailState={detailState}
                        />
                      </div>
                      <div className='tab-pane fade' id='kt_tab_pane_2' role='tabpanel'>
                        <StepTindakLanjutPengawasan
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
                          <button type='submit' className='col-5 btn btn-flex btn-primary px-6 m-3'>
                            <span className='svg-icon svg-icon-2x'>
                              <i className='fa-solid fa-paper-plane'></i>
                            </span>
                            <span className='d-flex flex-column align-items-start ms-2'>
                              <span className='fs-3 fw-bold'>Simpan</span>
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
