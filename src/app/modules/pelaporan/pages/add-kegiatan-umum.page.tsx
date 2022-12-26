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
} from '../../../redux/slices/pelaporan-kegiatan.slice'
import {Formik, Form, FormikValues, FormikContext} from 'formik'
import axios from 'axios'
import {ToFieldStateBNV, ToFieldStateCE} from '../components/fields.formikcto'
import {RootState} from '../../../redux/store'
import useMultistepForm from './steps/useMultistepForm'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'

export const API_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL

export const AddKegiatanUmumPage: FC = () => {
  const [currentSchema, setCurrentSchema] = useState(createSchemaPelaporanKegiatan[0])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allValues = useSelector((s: RootState) => s.pelaporanKegiatan)

  const listMasterJenisValue = () => {
    dispatch(updateJenisKegiatanList())
    dispatch(updateDetailJenisPasalList())
    dispatch(updateJenisPenyelesaianList())
    dispatch(updateJenisPenindakanList())
    dispatch(updateJenisUsahaList())
    dispatch(
      changedValue({
        target: {
          name: 'created_by',
          value: createdByHakAkses.data.hak_akses,
        },
      })
    )
  }

  let value: any = localStorage.getItem('kt-auth-react-v')
  let createdByHakAkses = JSON.parse(value)

  useEffect(() => {
    listMasterJenisValue()
  }, [])

  const submitPelaporanKegiatan = async (values: PelaporanKegiatanState, actions: FormikValues) => {
    let res
    try {
      if (isPengamanan(values)) {
        // alert(JSON.stringify(values, null, 2))
        res = await axios.post(`${API_URL}/kegiatan-pengamanan`, allValues)
      } else {
        res = await axios.post(`${API_URL}/kegiatan-umum`, allValues)
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

  console.log(allValues)

  return (
    <>
      <Formik
        validationSchema={currentSchema}
        initialValues={initialState}
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
                      />
                    </div>
                    <div className='tab-pane fade' id='kt_tab_pane_2' role='tabpanel'>
                      <StepTindaklanjut
                        values={values}
                        setFieldValue={setFieldValue}
                        allValues={allValues}
                      />
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
