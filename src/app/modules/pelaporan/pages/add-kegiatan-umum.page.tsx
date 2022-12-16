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
} from '../../../redux/slices/pelaporan-kegiatan.slice'
import {Formik, Form, FormikValues, FormikContext} from 'formik'
import axios from 'axios'
import {ToFieldStateBNV} from '../components/fields.formikcto'
import {RootState} from '../../../redux/store'
import useMultistepForm from './steps/useMultistepForm'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'

// const excludeJenisKegiatan = [
//   'SIDANG TIPIRING',
//   'PENERTIBAN BANGUNAN',
//   'KEGIATAN PPKM',
//   'LAPORAN MASYARAKAT',
//   'PENERTIBAN MINUMAN BERALKOHOL',
//   'PENGAMANAN',
// ]

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
  }

  useEffect(() => {
    listMasterJenisValue()
  }, [])

  const submitPelaporanKegiatan = async (values: PelaporanKegiatanState, actions: FormikValues) => {
    const bodyparam: PelaporanKegiatanState = {
      kegiatan__jenis_kegiatan_id: allValues.kegiatan__jenis_kegiatan_id,
      kegiatan__jumlah_personil: allValues.kegiatan__jumlah_personil,
      kegiatan__uraian_kegiatan: allValues.kegiatan__uraian_kegiatan,
      kegiatan__tanggal: allValues.kegiatan__tanggal,
      kegiatan__jam: allValues.kegiatan__jam,
      kegiatan__lokasi: allValues.kegiatan__lokasi,
      tindak_lanjut__administrasi__jenis_pasal_id:
        allValues.tindak_lanjut__administrasi__jenis_pasal_id,
      tindak_lanjut__administrasi__jenis_penertiban:
        allValues.tindak_lanjut__administrasi__jenis_penertiban,
      tindak_lanjut__administrasi__jenis_pelanggaran:
        allValues.tindak_lanjut__administrasi__jenis_pelanggaran,
      tindak_lanjut__administrasi__perda_perkada:
        allValues.tindak_lanjut__administrasi__perda_perkada,
      tindak_lanjut__administrasi__penyelesaian_id:
        allValues.tindak_lanjut__administrasi__penyelesaian_id,
      tindak_lanjut__identitas_pelanggar__no_bap:
        allValues.tindak_lanjut__identitas_pelanggar__no_bap,
      tindak_lanjut__identitas_pelanggar__nama_penanggung_jawab:
        allValues.tindak_lanjut__identitas_pelanggar__nama_penanggung_jawab,
      tindak_lanjut__identitas_pelanggar__nama_tempat_usaha:
        allValues.tindak_lanjut__identitas_pelanggar__nama_tempat_usaha,
      tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha:
        allValues.tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha,
      tindak_lanjut__identitas_pelanggar__nik: allValues.tindak_lanjut__identitas_pelanggar__nik,
      tindak_lanjut__identitas_pelanggar__alamat:
        allValues.tindak_lanjut__identitas_pelanggar__alamat,
      tindak_lanjut__identitas_pelanggar__jenis_usaha_id:
        allValues.tindak_lanjut__identitas_pelanggar__jenis_usaha_id,
      tindak_lanjut__jenis_penindakan_id: allValues.tindak_lanjut__jenis_penindakan_id,
      tindak_lanjut__jumlah_pelanggar: allValues.tindak_lanjut__jumlah_pelanggar,
      tindak_lanjut__denda__non_pengadilan: allValues.tindak_lanjut__denda__non_pengadilan,
      tindak_lanjut__denda__tanggal_setor: allValues.tindak_lanjut__denda__tanggal_setor,
      tindak_lanjut__denda__nama_bank: allValues.tindak_lanjut__denda__nama_bank,
      tindak_lanjut__denda__no_validasi_bank: allValues.tindak_lanjut__denda__no_validasi_bank,
      dokumentasi: [
        {
          file: null,
          keterangan: null,
        },
      ],
    }

    // }
    // const res = await axios.post(`http://127.0.0.1:3002/kegiatan-umum/`)
    try {
      const res = await axios.post(`${API_URL}/kegiatan-umum`, bodyparam)
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

  console.log(allValues)

  return (
    <>
      <Formik
        validationSchema={currentSchema}
        initialValues={initialState}
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

            {/* <div className='card'>
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
                  <div
                    className='tab-pane fade show active'
                    id={`kt_tab_pane_${currentStepIndex + 1}`}
                    role='tabpanel'
                  >
                    {step.type.name === 'StepDetailKegiatan' ? (
                      <StepDetailKegiatan
                        values={values}
                        setVal={setVal}
                        handleReset={handleReset}
                      />
                    ) : (
                      step
                    )}
                  </div>
                </div>
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
            </div> */}
          </Form>
        )}
      </Formik>
    </>
  )
}
