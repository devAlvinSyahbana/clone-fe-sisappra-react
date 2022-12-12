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
} from '../../../redux/slices/pelaporan-kegiatan.slice'
import {Formik, Form, FormikValues, FormikContext} from 'formik'
import axios from 'axios'
import {ToFieldStateBNV} from '../components/fields.formikcto'
import {RootState} from '../../../redux/store'
import useMultistepForm from './steps/useMultistepForm'

const excludeJenisKegiatan = [
  'SIDANG TIPIRING',
  'PENERTIBAN BANGUNAN',
  'KEGIATAN PPKM',
  'LAPORAN MASYARAKAT',
  'PENERTIBAN MINUMAN BERALKOHOL',
  'PENGAMANAN',
]

export const AddTamuDaerahPage: FC = () => {
  const [currentSchema, setCurrentSchema] = useState(createSchemaPelaporanKegiatan[0])
  const [val, setVal] = useState<any>(initialState)

  const dispatch = useDispatch()
  const jenisKegiatanId = useSelector(
    (s: RootState) => s.pelaporanKegiatan.kegiatan__jenis_kegiatan_id
  )

  const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} = useMultistepForm([
    <StepDetailKegiatan values={val} setVal={setVal} />,
    ...(isApelRapat(val) ? [<StepDokumentasi />] : [<StepTindaklanjut />, <StepDokumentasi />]),
  ])

  const updateJenisKegiatanList = () => {
    axios.get(`http://localhost:3001/jenis-kegiatan/combobox?$orderby=nama`).then((res) => {
      const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
      // .filter((v: any) => !excludeJenisKegiatan.includes(v.label))
      dispatch(changedValue(ToFieldStateBNV('list_jenis_kegiatan', data)))
    })
  }

  const updateJenisUsahaList = () => {
    axios.get(`http://localhost:3001/jenis-usaha/combobox?$oderby=nama`).then((res) => {
      const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
      dispatch(changedValue(ToFieldStateBNV('list_jenis_usaha', data)))
    })
  }

  const updateJenisPenindakanList = () => {
    axios.get(`http://localhost:3001/jenis-penindakan/combobox?$oderby=nama`).then((res) => {
      const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
      dispatch(changedValue(ToFieldStateBNV('list_jenis_penindakan', data)))
    })
  }

  useEffect(() => {
    updateJenisKegiatanList()
    updateJenisUsahaList()
    updateJenisPenindakanList()
  }, [])

  // function onSubmit(e: FormEvent) {
  //   e.preventDefault()
  //   console.log('values')
  //   // console.log(values)
  //   if (!isLastStep) return next()
  //   // alert(JSON.stringify(values, null, 2))
  //   // alert('Your Account Succesfully Created')
  // }

  const submitPelaporanKegiatan = (values: PelaporanKegiatanState, actions: FormikValues) => {
    try {
      if (!isLastStep) {
        console.log('values')
        return next()
      }
      console.log('laststep', values)
      alert(JSON.stringify(values, null, 2))
      actions.setSubmitting(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Formik
        validationSchema={currentSchema}
        initialValues={initialState}
        onSubmit={submitPelaporanKegiatan}
      >
        {({handleReset, handleSubmit, errors, values}) => (
          <Form className='mx-auto w-100 pt-15 pb-10' id='pelaporan_kegiatan_form'>
            <div className='card'>
              <div className='card-body'>
                {/* <>{(values = {data})}</> */}
                {step.type.name === 'StepDetailKegiatan' ? (
                  <StepDetailKegiatan values={values} setVal={setVal} />
                ) : (
                  step
                )}
                <div className='card mt-5'>
                  <div className='card-body'>
                    <div className='row w-100'>
                      <div className='col'></div>
                      <div className='col'>
                        <div className='row d-flex justify-content-end'>
                          {!isFirstStep && (
                            <button
                              type='button'
                              className='col-5 btn btn-flex btn-secondary px-6 m-3'
                              onClick={back}
                            >
                              ``
                              <span className='svg-icon svg-icon-2x'>
                                <i className='fa-solid fa-arrow-left'></i>
                              </span>
                              <span className='d-flex flex-column align-items-start ms-2'>
                                <span className='fs-3 fw-bold'>Kembali</span>
                              </span>
                            </button>
                          )}

                          <button
                            type='submit'
                            className='col-5 btn btn-flex btn-primary px-6 m-3'
                            // onClick={next}
                          >
                            <span className='svg-icon svg-icon-2x'>
                              <i className='fa-solid fa-paper-plane'></i>
                            </span>
                            <span className='d-flex flex-column align-items-start ms-2'>
                              <span className='fs-3 fw-bold'>
                                {isLastStep ? 'Simpan' : 'Simpan dan Lanjut'}
                              </span>
                            </span>
                          </button>
                          {/* {!isLastStep ? (
                            <button
                              // type='button'
                              className='col-5 btn btn-flex btn-primary px-6 m-3'
                              onClick={next}
                            >
                              <span className='svg-icon svg-icon-2x'>
                                <i className='fa-solid fa-paper-plane'></i>
                              </span>
                              <span className='d-flex flex-column align-items-start ms-2'>
                                <span className='fs-3 fw-bold'>Simpan dan Lanjut</span>
                              </span>
                            </button>
                          ) : (
                            <button
                              type='submit'
                              className='col-5 btn btn-flex btn-primary px-6 m-3'
                            >
                              <span className='svg-icon svg-icon-2x'>
                                <i className='fa-solid fa-paper-plane'></i>
                              </span>
                              <span className='d-flex flex-column align-items-start ms-2'>
                                <span className='fs-3 fw-bold'>simpan</span>
                              </span>
                            </button>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <button type='submit'>{isLastStep ? 'Simpan' : 'Simpan dan Lanjut'}</button> */}
              </div>
            </div>

            {/* <>
              <div className='card'>
                <div className='card-body'>
                  <ul className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
                    <li className='nav-item'>
                      <a className='nav-link active' data-bs-toggle='tab' href='#kt_tab_pane_1'>
                        KEGIATAN
                      </a>
                    </li>
                    <li className='nav-item'>
                      <a className='nav-link' data-bs-toggle='tab' href='#kt_tab_pane_2'>
                        TINDAK LANJUT
                      </a>
                    </li>
                    <li className='nav-item'>
                      <a className='nav-link' data-bs-toggle='tab' href='#kt_tab_pane_3'>
                        DOKUMENTASI
                      </a>
                    </li>
                  </ul>

                  <div className='tab-content' id='myTabContent'>
                    <div className='tab-pane fade show active' id='kt_tab_pane_1' role='tabpanel'>
                      <StepDetailKegiatan values={values} />
                    </div>
                    <div className='tab-pane fade' id='kt_tab_pane_2' role='tabpanel'>
                      <StepTindaklanjut />
                    </div>
                    <div className='tab-pane fade' id='kt_tab_pane_3' role='tabpanel'>
                      <StepDokumentasi />
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
                        <a href='#' className='col-5 btn btn-flex btn-secondary px-6 m-3'>
                          <span className='svg-icon svg-icon-2x'>
                            <i className='fa-solid fa-arrow-left'></i>
                          </span>
                          <span className='d-flex flex-column align-items-start ms-2'>
                            <span className='fs-3 fw-bold'>Kembali</span>
                            <span className='fs-7'>Some description</span>
                          </span>
                        </a>
                        <button type='submit' className='col-5 btn btn-flex btn-primary px-6 m-3'>
                          <span className='svg-icon svg-icon-2x'>
                            <i className='fa-solid fa-paper-plane'></i>
                          </span>
                          <span className='d-flex flex-column align-items-start ms-2'>
                            <span className='fs-3 fw-bold'>Simpan</span>
                            <span className='fs-7'>Some description</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </> */}
          </Form>
        )}
      </Formik>
    </>
  )
}
