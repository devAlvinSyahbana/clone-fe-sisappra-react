import React, {useEffect, Fragment, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import AsyncSelect from 'react-select/async'
import Swal from 'sweetalert2'
import DataTable, {createTheme} from 'react-data-table-component'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'

import {KTSVG} from '../../../../../_metronic/helpers'
import {useParams} from 'react-router-dom'
import {ButtonGroup, Dropdown, DropdownButton, Modal} from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'
import {useFormik, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL //http://localhost:3000
export const JABATAN_URL = `${API_URL}/master/jabatan` //http://localhost:3000/master/jabatan

// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme(
    'darkMetro',
    {
      text: {
        primary: '#92929f',
        secondary: '#92929f',
      },
      background: {
        default: '#1e1e2e',
      },
      context: {
        background: '#cb4b16',
        text: '#FFFFFF',
      },
      divider: {
        default: '#2b2c41',
      },
      action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
      },
    },
    'dark'
  )
  const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

export interface FormInput {
    jabatan?: string
    status?: string
    created_by?: number
}

// const validatorForm = Yup.object().shape({
//     hubungan: Yup.string().required('Wajib diisi'),
//     nama: Yup.string().required('Wajib diisi'),
//     jenis_kelamin: Yup.string().required('Wajib diisi'),
//   })

export function TambahJabatan() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [aksi, setAksi] = useState(0)
//   const [valuesFormik, setValuesFormik] = useState<FormInput>()
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})

  const handleChangeFormikSelect = (value: any, name: string) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }

  const formik = useFormik({
    initialValues: {
      jabatan: '',
      status: '',
    },
    onSubmit: async (values) => {
      console.log(selectedFile)
      let formData = new FormData()
      const bodyparam: FormInput = {
        jabatan: valuesFormik?.jabatan ? valuesFormik.jabatan : '',
        created_by: 0,
      }
      try {
        const response = await axios.post(`${JABATAN_URL}/create`, bodyparam)
        if (response) {
          if (selectedFile) {
            formData.append('file_dokumentasi', selectedFile)
            const responseFile = await axios.post(
              `${JABATAN_URL}/upload-file/${response.data.data.return_id}`,
              formData
            )
            if (responseFile) {
              console.log('File success uploaded!')
              Swal.fire({
                icon: 'success',
                title: 'Data berhasil disimpan',
                showConfirmButton: false,
                timer: 1500,
              })
              navigate('/master/jabatan', {replace: true})
            }
            return
          }
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/master/jabatan', {replace: true})
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
    },
  })

  const [selectedFile, setSelectedFile] = useState(null)

  return (
    <div>
        <Modal
            size='lg'
            show={show}
            onHide={handleClose}
            aria-labelledby='example-modal-sizes-title-lg'
            backdrop='static'
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id='example-modal-sizes-title-lg'>
                {aksi === 0 ? 'Tambah' : 'Ubah'} Jabatan
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className='form' onSubmit={formik.handleSubmit}>
                <div
                  className='d-flex flex-column scroll-y me-n7 pe-7'
                  id='kt_modal_add_user_scroll'
                  data-kt-scroll='true'
                  data-kt-scroll-activate='{default: false, lg: true}'
                  data-kt-scroll-max-height='auto'
                  data-kt-scroll-dependencies='#kt_modal_add_user_header'
                  data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
                  data-kt-scroll-offset='300px'
                >
                  <div className='fv-row mb-7'>
                    <label className='required fw-semibold fs-6 mb-2'>jabatan</label>
                    <input
                      type='text'
                      name='jabatan'
                      placeholder='Jabatan'
                      className={clsx(
                        'form-control form-control-solid mb-1',
                        {
                          'is-invalid': formik.touched.jabatan && formik.errors.jabatan,
                        },
                        {
                          'is-valid': formik.touched.jabatan && !formik.errors.jabatan,
                        }
                      )}
                      onChange={handleChangeFormik}
                      value={valuesFormik?.jabatan}
                    />
                    {formik.touched.jabatan && formik.errors.jabatan && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.jabatan}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='fv-row mb-7'>
                    <div id='kt_docs_repeater_basic'>
                      <div className='fv-row mb-7 mt-7'>
                        <label className='required fw-semibold fs-6 mb-2'>Status</label>
                        <select
                          data-control='select2'
                          data-placeholder='Status'
                          name='status'
                          className={clsx(
                            'form-control form-control-solid mb-1',
                            {
                              'is-invalid':
                                formik.touched.status && formik.errors.status,
                            },
                            {
                              'is-valid':
                                formik.touched.status && !formik.errors.status,
                            }
                          )}
                          onChange={handleChangeFormik}
                          value={valuesFormik?.status}
                        >
                          <option value=''>Pilih</option>
                          <option value='JFT'>JFT</option>
                          <option value='Non JFT'>Non JFT</option>
                        </select>
                        {formik.touched.status && formik.errors.status && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.status}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='p-0 mt-6'>
                  <div className='text-center'>
                    <button
                      type='button'
                      onClick={handleClose}
                      className='float-none btn btn-light align-self-center m-1'
                    >
                      Tutup
                    </button>
                    <button
                      type='submit'
                      className='float-none btn btn-primary align-self-center m-1'
                      disabled={formik.isSubmitting || !formik.isValid}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </Modal>
    </div>
  )
}
