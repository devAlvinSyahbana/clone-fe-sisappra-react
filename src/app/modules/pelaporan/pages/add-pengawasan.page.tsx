import React, {FC, useEffect, useState, FormEvent, useRef} from 'react'
import {StepDetailPengawasan} from './steps/step-detail-pengawasan'
import {StepTindakLanjutPengawasan} from './steps/step-tindaklanjut-pengawasan'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../redux/store'
import axios from 'axios'
import {
  createSchemaPelaporanPengawasan,
  initialState,
  PelaporanPengawasanState,
  changedValue,
  updateKecamatanList,
  updateKotaList,
  updateKelurahanList,
} from '../../../redux/slices/pelaporan-pengawasan-reklame.slice'

import {Formik, Form, FormikValues} from 'formik'
import Swal from 'sweetalert2'

export const API_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL

export const AddPengawasanPage: FC = () => {
  const [currentSchema, setCurrentSchema] = useState(createSchemaPelaporanPengawasan[0])

  const dispatch = useDispatch()
  const allValues = useSelector((s: RootState) => s.pelaporanPengawasan)

  const listMasterPengawasanValue = () => {
    dispatch(updateKecamatanList())
    dispatch(updateKotaList())
    dispatch(updateKelurahanList())
  }

  useEffect(() => {
    listMasterPengawasanValue()
  }, [])
  console.log(allValues)
  // const submitPelaporanPengawasan = (values: PelaporanPengawasanState, actions: FormikValues) => {
  //   try {
  //     alert(JSON.stringify(values, null, 2))
  //     actions.setSubmitting(false)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const submitPelaporanPengawasan = async (
    values: PelaporanPengawasanState,
    actions: FormikValues
  ) => {
    const bodyParam: PelaporanPengawasanState = {
      nrk: allValues.nrk,
      nama: allValues.nama,
      share_location: allValues.share_location,
      alamat: allValues.alamat,
      lokasi_tiang: allValues.lokasi_tiang,
      kawasan_kendali: allValues.kawasan_kendali,
      status: allValues.status,
      ukuran: allValues.ukuran,
      pemilik_reklame: allValues.pemilik_reklame,
      konstruksi_reklame: allValues.konstruksi_reklame,
      konten_iklan: allValues.konten_iklan,
      tgl_pengecekan: allValues.tgl_pengecekan,
      waktu_pengawasan: allValues.waktu_pengawasan,
      kota: allValues.kota,
      kecamatan: allValues.kecamatan,
      kelurahan: allValues.kelurahan,
      waktu_pengesahan: allValues.waktu_pengesahan,
    }

    // }
    // const res = await axios.post(`http://127.0.0.1:3002/kegiatan-umum/`)
    try {
      // const res = await axios.post(`http://localhost:3002/reklame`, bodyParam)
      // if (res) {
      //   console.log('laststep', values)
      //   actions.setSubmitting(false)
      //   Swal.fire({
      //     icon: 'success',
      //     text: 'Data berhasil disubmit',
      //     showConfirmButton: false,
      //     timer: 1500,
      //     color: '#000000',
      //   })
      // }
      alert(JSON.stringify(values, null, 2))
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
                      <StepDetailPengawasan
                        values={values}
                        handleReset={handleReset}
                        listMasterPengawasanValue={listMasterPengawasanValue}
                      />
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
