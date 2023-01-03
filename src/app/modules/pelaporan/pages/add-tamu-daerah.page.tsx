import React, {FC, useEffect, useState} from 'react'
import {StepDetailTamuDaerah} from './steps/step-detail-tamu-daerah'
import {useDispatch, useSelector} from 'react-redux'
import {
  changedValue,
  createSchemaPelaporanTamuDaerah,
  editInitialState,
  initialState,
  PelaporanTamuDaerahState,
  reset,
} from '../../../redux/slices/pelaporan-tamu-daerah.slice'
import {Formik, Form, FormikValues} from 'formik'
import {RootState} from '../../../redux/store'
import {useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export const API_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL

export const AddTamuDaerahPage: FC = () => {
  const [currentSchema, setCurrentSchema] = useState(createSchemaPelaporanTamuDaerah[0])
  const [currentIntialState, setCurrentIntialState] = useState(initialState)
  // const [filteredObject, setFilteredObject] = useState({})
  const [loading, setLoading] = useState(true)

  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allValues = useSelector((s: RootState) => s.pelaporanTamuDaerah)

  let value: any = localStorage.getItem('kt-auth-react-v')
  let createdByHakAkses = JSON.parse(value)

  const editPelaporanTamuDaerah = async () => {
    const res = await axios.get(`${API_URL}/tamu-daerah/?%24filter=id%20eq%20${id}`)
    // const data = res.data.data[0]
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
    if (id) {
      editPelaporanTamuDaerah()
    }
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

  // console.log(allValues)

  const submitPelaporanTamuDaerah = async (
    values: PelaporanTamuDaerahState,
    actions: FormikValues
  ) => {
    try {
      let res
      if (id) {
        res = await axios.put(`${API_URL}/tamu-daerah/${id}`, allValues)
      } else {
        res = await axios.post(`${API_URL}/tamu-daerah`, allValues)
      }
      if (res) {
        actions.setSubmitting(false)
        if (!id) {
          actions.resetForm(initialState)
          dispatch(reset())
        }
        Swal.fire({
          icon: 'success',
          text: 'Data berhasil disubmit',
          showConfirmButton: false,
          timer: 1500,
          color: '#000000',
        })
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
          onSubmit={submitPelaporanTamuDaerah}
        >
          {({handleReset, handleSubmit, errors, values, setFieldValue}) => (
            <Form className='mx-auto w-100 pt-15 pb-10' id='pelaporan_tamu_daerah_form'>
              <>
                <div className='card'>
                  <div className='card-body'>
                    <ul className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
                      <li className='nav-item'>
                        <a className='nav-link active' data-bs-toggle='tab' href='#kt_tab_pane_1'>
                          TAMU DAERAH
                        </a>
                      </li>
                    </ul>

                    <div className='tab-content' id='myTabContent'>
                      <div className='tab-pane fade show active' id='kt_tab_pane_1' role='tabpanel'>
                        <StepDetailTamuDaerah
                          values={values}
                          handleReset={handleReset}
                          allValues={allValues}
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
