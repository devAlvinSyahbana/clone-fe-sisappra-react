import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import clsx from 'clsx'
import AsyncSelect from 'react-select/async'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import ReactCrop, {centerCrop, makeAspectCrop, Crop, PixelCrop} from 'react-image-crop'
import {canvasPreview} from '../handlerFotoP/canvasPreview'
import {useDebounceEffect} from '../handlerFotoP/useDebounceEffect'
import {Modal} from 'react-bootstrap'

const systemMode = ThemeModeComponent.getSystemMode() as 'light' | 'dark'

const reactSelectLightThem = {
  input: (base: object) => ({
    ...base,
    color: '#5e6278',
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
  container: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    color: '#cccccc',
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: '#cccccc',
  }),
  control: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
    boxShadow: '0 0 0 1px #f5f8fa',
  }),
  singleValue: (base: object) => ({
    ...base,
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
  }),
  option: (base: object) => ({
    ...base,
    height: '100%',
    backgroundColor: '#f5f8fa',
    color: '#5e6278',
    borderColor: 'hsl(204deg 33% 97%)',
  }),
}

const reactSelectDarkThem = {
  input: (base: object) => ({
    ...base,
    color: '#92929f',
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
  container: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    color: '#92929f',
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: '#92929f',
  }),
  control: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
    boxShadow: '0 0 0 1px #1b1b29',
  }),
  singleValue: (base: object) => ({
    ...base,
    backgroundColor: '#1b1b29',
    color: '#92929f',
  }),
  option: (base: object) => ({
    ...base,
    height: '100%',
    backgroundColor: '#1b1b29',
    color: '#92929f',
    borderColor: 'hsl(240deg 13% 13%)',
  }),
}

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
export function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: 'px',
        width: 350,
        height: 350,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

interface FileFotoInterface {
  croppedImage?: any
}

export interface FormInput {
  id?: number
  nama_lengkap?: string
  id_pegawai?: number
  no_pegawai?: number
  email?: string
  kata_sandi?: string
  hak_akses?: number
  status_pengguna?: number
  updated_by?: number
  foto?: any
}

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}
interface GetDataInterface {
  id?: number
  nama_lengkap?: string
  id_pegawai?: number
  no_pegawai?: number
  email?: string
  kata_sandi?: string
  hak_akses?: number
  status_pengguna?: number
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`
export const MASTER_HAK_AKSES = `${API_URL}/manajemen-pengguna/hak-akses`

export function UpdateDataPengguna() {
  const {mode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const navigate = useNavigate()
  const {id} = useParams()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})
  const [selectedFile, setSelectedFile] = useState<FileFotoInterface>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/find/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        nama_lengkap: jsonD.nama_lengkap,
        id_pegawai: jsonD.id_pegawai,
        no_pegawai: jsonD.no_pegawai,
        email: jsonD.email,
        kata_sandi: jsonD.kata_sandi,
        hak_akses: jsonD.hak_akses,
        status_pengguna: jsonD.status_pengguna,
        updated_by: 0,
      }
      setValuesFormikExist((prevstate) => ({...prevstate, ...paramValue}))
    }
    fetchData()
  }, [valuesFormik, id])

  // handler croping foto
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)

  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }

  const handleChangeFormikSelect = (value: any, name: string) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  // GET VALUE HAK AKSES
  const [valHakAkses, setValHakAkses] = useState({value: '', label: ''})
  const getHakAksesVal = async (params: any) => {
    if (params)
      return await axios
        .get(`${MASTER_HAK_AKSES}/findone/${parseInt(params)}`)
        .then((response) => {
          setValHakAkses((prevstate) => ({
            ...prevstate,
            value: response?.data?.data?.id,
            label: response?.data?.data?.hak_akses,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  // AUTOCOMPLETE HAK AKSES
  const filterHakAkses = async (inputValue: string) => {
    const response = await axios.get(`${MASTER_HAK_AKSES}/fitler-nama_hak_akses/${inputValue}`)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.hak_akses, value: i.id}))
  }
  const loadOptionsHakAkses = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    setTimeout(async () => {
      callback(await filterHakAkses(inputValue))
    }, 1000)
  }

  const formik = useFormik({
    initialValues: {
      nama_lengkap: '',
      id_pegawai: 0,
      no_pegawai: 0,
      email: '',
      kata_sandi: '',
      hak_akses: {value: '', label: 'Pilih Hak Akses'},
      status_pengguna: 0,
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        nama_lengkap: valuesFormik?.nama_lengkap
          ? valuesFormik.nama_lengkap
          : valuesFormikExist?.nama_lengkap
          ? valuesFormikExist.nama_lengkap
          : '',
        email: valuesFormik?.email
          ? valuesFormik.email
          : valuesFormikExist?.email
          ? valuesFormikExist.email
          : '',
        kata_sandi: valuesFormik?.kata_sandi
          ? valuesFormik.kata_sandi
          : valuesFormikExist?.kata_sandi
          ? valuesFormikExist.kata_sandi
          : '',
        hak_akses: valuesFormik?.hak_akses
          ? valuesFormik.hak_akses
          : valuesFormikExist?.hak_akses
          ? valuesFormikExist.hak_akses
          : 0,
        updated_by: 0,
      }
      try {
        const response = await axios.put(`${MANAJEMEN_PENGGUNA_URL}/update/${id}`, bodyparam)
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/apps/data-pengguna', {
            replace: true,
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
    },
  })

  const handleSubmitFoto = async (e: any) => {
    e.preventDefault()
    let formData = new FormData()
    try {
      if (selectedFile && selectedFile?.croppedImage) {
        formData.append('foto', selectedFile?.croppedImage)
        const responseFile = await axios.post(`${MANAJEMEN_PENGGUNA_URL}/update`, formData)
        if (responseFile) {
          console.log('File success uploaded!')
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          setSelectedFile({croppedImage: null})
          // fetchDT()
          handleClose()
        }
        return
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Data gagal disimpan, harap mencoba lagi',
        showConfirmButton: false,
        timer: 1500,
      })
      console.error(error)
    }
  }

  const doEditFoto = () => {
    setShow(true)
    setSelectedFile({croppedImage: null})
    setImgSrc('')
    setCrop(undefined)
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const {width, height} = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate)
      }
    },
    100,
    [completedCrop, scale, rotate]
  )

  const handleToggleAspectClick = () => {
    if (aspect) {
      setAspect(undefined)
    } else if (imgRef.current) {
      const {width, height} = imgRef.current
      setAspect(16 / 9)
      setCrop(centerAspectCrop(width, height, 16 / 9))
    }
  }

  const onCropComplete = (crop: any) => {
    if (imgRef && crop.width && crop.height) {
      getCroppedImg(imgRef.current, crop)
    }
  }

  const getCroppedImg = (image: any, crop: any) => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    const reader = new FileReader()
    canvas.toBlob((blob: any) => {
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        dataURLtoFile(reader.result, 'cropped_foto.png')
      }
    })
  }

  const dataURLtoFile = (dataurl: any, filename: string) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    let croppedImage = new File([u8arr], filename, {type: mime})
    setSelectedFile((prev) => ({...prev, croppedImage: croppedImage}))
  }

  return (
    <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
      <div className='d-flex flex-column flex-column-fluid'>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card mb-2 mb-xl-1'>
              <div className='card-body'>
                <form onSubmit={formik.handleSubmit}>
                  <div className='row mt-2'>
                    <div className='col-12 mb-6 text-center'>
                      <div className='me-7 mb-4'>
                        <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative overlay overflow-hidden'>
                          <div className='overlay-wrapper'>
                            {valuesFormik && valuesFormik?.foto !== '' ? (
                              <div className='symbol-label'>
                                <img src={`${API_URL}/${valuesFormik?.foto}`} className='w-100' />
                              </div>
                            ) : (
                              <div
                                className={clsx(
                                  'symbol-label fs-1',
                                  `bg-light-secondary`,
                                  `text-dark-secondary`
                                )}
                              ></div>
                            )}
                          </div>
                          <div className='overlay-layer bg-dark bg-opacity-10 align-items-end justify-content-center'>
                            <button
                              type='button'
                              onClick={() => doEditFoto()}
                              className='btn btn-sm btn-primary btn-shadow mb-2'
                            >
                              Ubah Foto
                            </button>
                          </div>
                          <Form.Label>Upload Foto</Form.Label>
                        </div>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          aria-labelledby='example-modal-sizes-title-md'
                          backdrop='static'
                          keyboard={false}
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id='example-modal-sizes-title-md'>Ubah Foto</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form className='form' onSubmit={handleSubmitFoto}>
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
                                  <div className='form-group'>
                                    <Form.Label>File Foto</Form.Label>
                                    <Form.Control
                                      type='file'
                                      className='form-control form-control-solid'
                                      id='firstimg'
                                      onChange={onSelectFile}
                                      accept='image/jpeg,image/png'
                                    />
                                    <small className='mt-4'>
                                      *File yang dapat di upload berformat (.jpeg, .png)
                                    </small>
                                  </div>
                                  {!!imgSrc && (
                                    <>
                                      <div className='separator border-3 my-10'></div>
                                      <h5 className='mt-6 fs-5'>Cropping Foto</h5>
                                      <ReactCrop
                                        crop={crop}
                                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                                        onComplete={(c) => {
                                          onCropComplete(c)
                                          setCompletedCrop(c)
                                        }}
                                        aspect={aspect}
                                        className='mt-4'
                                      >
                                        <img
                                          ref={imgRef}
                                          alt='Crop me'
                                          src={imgSrc}
                                          style={{
                                            transform: `scale(${scale}) rotate(${rotate}deg)`,
                                          }}
                                          onLoad={onImageLoad}
                                        />
                                      </ReactCrop>
                                      <div className='row mt-4'>
                                        <div className='col-12 mb-4'>
                                          <div className='form-check form-check-custom form-check-solid'>
                                            <input
                                              className='form-check-input'
                                              type='checkbox'
                                              value=''
                                              id='flexCheckDefault'
                                              onChange={handleToggleAspectClick}
                                            />
                                            <label
                                              className='form-check-label'
                                              htmlFor='flexCheckDefault'
                                            >
                                              Toggle aspect {aspect ? 'off' : 'on'}
                                            </label>
                                          </div>
                                        </div>
                                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 mb-4'>
                                          <label htmlFor='scale-input'>Scale: </label>
                                          <input
                                            id='scale-input'
                                            type='number'
                                            step='0.1'
                                            value={scale}
                                            disabled={!imgSrc}
                                            onChange={(e) => setScale(Number(e.target.value))}
                                            className='form-control form-control-solid'
                                          />
                                        </div>
                                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 mb-4'>
                                          <label htmlFor='rotate-input'>Rotate: </label>
                                          <input
                                            id='rotate-input'
                                            type='number'
                                            value={rotate}
                                            disabled={!imgSrc}
                                            onChange={(e) =>
                                              setRotate(
                                                Math.min(
                                                  180,
                                                  Math.max(-180, Number(e.target.value))
                                                )
                                              )
                                            }
                                            className='form-control form-control-solid'
                                          />
                                        </div>
                                      </div>
                                    </>
                                  )}
                                  {/* <div>
                            {!!completedCrop && (
                              <canvas
                                ref={previewCanvasRef}
                                style={{
                                  border: '1px solid black',
                                  objectFit: 'contain',
                                  width: completedCrop.width,
                                  height: completedCrop.height,
                                }}
                              />
                            )}
                          </div> */}
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
                                    disabled={!selectedFile?.croppedImage}
                                  >
                                    Simpan
                                  </button>
                                </div>
                              </div>
                            </form>
                          </Modal.Body>
                        </Modal>
                      </div>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col-6 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Nama Lengkap</Form.Label>
                        <Form.Control
                          name='nama_lengkap'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.nama_lengkap || valuesFormik?.nama_lengkap === ''
                              ? valuesFormik?.nama_lengkap
                              : valuesFormikExist?.nama_lengkap
                              ? valuesFormikExist?.nama_lengkap
                              : ''
                          }
                          placeholder='Ubah nama lengkap'
                        />
                      </div>
                    </div>
                    <div className='col-6 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name='email'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.email || valuesFormik?.email === ''
                              ? valuesFormik?.email
                              : valuesFormikExist?.email
                              ? valuesFormikExist?.email
                              : ''
                          }
                        />
                      </div>
                    </div>
                    <div className='col-6 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type='password'
                          name='status_pengguna'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.status_pengguna || valuesFormik?.status_pengguna === 0
                              ? valuesFormik?.status_pengguna
                              : valuesFormikExist?.status_pengguna
                              ? valuesFormikExist?.status_pengguna
                              : ''
                          }
                          placeholder='Ubah password'
                        />
                      </div>
                    </div>
                    <div className='col-6 mb-6'>
                      <div className='form-group'>
                        <Form.Label>Hak Akses</Form.Label>
                        <AsyncSelect
                          cacheOptions
                          loadOptions={loadOptionsHakAkses}
                          defaultOptions
                          onChange={(e) => handleChangeFormikSelect(e, 'hak_akses')}
                          value={
                            valuesFormik?.hak_akses && typeof valuesFormik?.hak_akses === 'object'
                              ? valuesFormik?.hak_akses
                              : valHakAkses && valHakAkses.label !== ''
                              ? valHakAkses
                              : {value: '', label: 'Pilih'}
                          }
                          name='hak_akses'
                          placeholder={'Pilih'}
                          styles={
                            calculatedMode === 'dark' ? reactSelectDarkThem : reactSelectLightThem
                          }
                          loadingMessage={() => 'Sedang mencari pilihan...'}
                          noOptionsMessage={() => 'Ketik untuk mencari pilihan'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <Link to='/apps/data-pengguna'>
                      <button className='btn btn-secondary'>
                        <i className='fa fa-close'></i>
                        Batal
                      </button>
                    </Link>
                    <button className='btn btn-primary' type='submit'>
                      <i className='fa-solid fa-paper-plane'></i>
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
