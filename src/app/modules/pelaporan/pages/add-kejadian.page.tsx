import React, {FC, useEffect, useState, FormEvent, useRef} from 'react'
import {StepDetailKegiatan} from './steps/step-detail-kejadian'
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

export const AddKejadianPage: FC = () => {
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
