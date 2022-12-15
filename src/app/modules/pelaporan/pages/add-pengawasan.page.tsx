import React, {FC, useEffect, useState, FormEvent, useRef} from 'react'
import {StepDetailKejadian} from './steps/step-detail-kejadian'
import {StepTindakLanjutKejadian} from './steps/step-tindaklanjut-kejadian'
import {StepDokumentasi} from './steps/step-dokumentasi'
import {useDispatch, useSelector} from 'react-redux'
import {
  createSchemaPelaporanPengawasan,
  initialState,
  PelaporanPengawasanState,
  changedValue,
} from '../../../redux/slices/pelaporan-pengawasan-reklame.slice'
import {Formik, Form, FormikValues, FormikContext} from 'formik'
import axios from 'axios'
import {ToFieldStateBNV} from '../components/fields.formikcto'
import {RootState} from '../../../redux/store'
import useMultistepForm from './steps/useMultistepForm'
import {StepDetailPengawasan} from './steps/step-detail-pengawasan'
import {StepTindakLanjutPengawasan} from './steps/step-tindaklanjut-pengawasan'

export const AddPengawasanPage: FC = () => {
  const [currentSchema, setCurrentSchema] = useState(createSchemaPelaporanPengawasan[0])
  const [val, setVal] = useState<any>(initialState)

  const dispatch = useDispatch()
  const jenisKegiatanId = useSelector(
    (s: RootState) => s.pelaporanPengawasan.kejadian__jenis_pengawasan_id
  )

  // const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} = useMultistepForm([
  //   <StepDetailKejadian values={val} setVal={setVal} />,
  //   ...(isApelRapat(val) ? [<StepDokumentasi />] : [<StepTindakLanjutKejadian />]),
  // ])

  const updateJenisKejadianList = () => {
    axios.get(`http://localhost:3001/jenis-kejadian/combobox?$orderby=nama`).then((res) => {
      const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
      dispatch(changedValue(ToFieldStateBNV('list_jenis_kejadian', data)))
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
    updateJenisKejadianList()
    updateJenisUsahaList()
    updateJenisPenindakanList()
  }, [])

  const submitPelaporanPengawasan = (values: PelaporanPengawasanState, actions: FormikValues) => {
    try {
      // if (!isLastStep) {
      //   console.log('values')
      //   return next()
      // }
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
        onSubmit={submitPelaporanPengawasan}
      >
        {({handleReset, handleSubmit, errors, values}) => (
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
                      <StepDetailPengawasan values={values} handleReset={handleReset} />
                    </div>
                    <div className='tab-pane fade' id='kt_tab_pane_2' role='tabpanel'>
                      <StepTindakLanjutPengawasan />
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
                            <span className='fs-7'>ke Halaman Utama</span>
                          </span>
                        </a>
                        <button type='submit' className='col-5 btn btn-flex btn-primary px-6 m-3'>
                          <span className='svg-icon svg-icon-2x'>
                            <i className='fa-solid fa-paper-plane'></i>
                          </span>
                          <span className='d-flex flex-column align-items-start ms-2'>
                            <span className='fs-3 fw-bold'>Simpan</span>
                            <span className='fs-7'>dan Selanjutnya</span>
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
    </>
  )
}
