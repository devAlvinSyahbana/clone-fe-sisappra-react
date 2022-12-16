import React, {FC, useEffect, useState, FormEvent, useRef} from 'react'
import {StepDetailTamuDaerah} from './steps/step-detail-tamu-daerah'
import {useDispatch, useSelector} from 'react-redux'
import {
  createSchemaPelaporanTamuDaerah,
  initialState,
  PelaporanTamuDaerahState,
} from '../../../redux/slices/pelaporan-tamu-daerah.slice'
import {Formik, Form, FormikValues} from 'formik'
import {RootState} from '../../../redux/store'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export const AddTamuDaerahPage: FC = () => {
  const [currentSchema, setCurrentSchema] = useState(createSchemaPelaporanTamuDaerah[0])

  const navigate = useNavigate()
  const allValues = useSelector((s: RootState) => s.pelaporanTamuDaerah)

  const submitPelaporanTamuDaerah = async (
    values: PelaporanTamuDaerahState,
    actions: FormikValues
  ) => {
    const bodyParam: PelaporanTamuDaerahState = {
      tanggal_kunjungan: allValues.tanggal_kunjungan,
      waktu_mulai_kunjungan: allValues.waktu_mulai_kunjungan,
      waktu_selesai_kunjungan: allValues.waktu_selesai_kunjungan,
      asal_instansi: allValues.asal_instansi,
      jml_pengunjung: allValues.jml_pengunjung,
      maksud_dan_tujuan: allValues.maksud_dan_tujuan,
      pejabat_penerima_kunjungan: allValues.pejabat_penerima_kunjungan,
      tempat_kunjungan: allValues.tempat_kunjungan,
    }
    try {
      const res = await axios.post(`http://localhost:3002/tamu-daerah`, bodyParam)
      // alert(JSON.stringify(values, null, 2))

      if (res) {
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

  console.log('Ini values', allValues)

  return (
    <>
      <Formik
        validationSchema={currentSchema}
        initialValues={initialState}
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
    </>
  )
}
