import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import {KTSVG} from '../../../../../_metronic/helpers'
import FileDownload from 'js-file-download'
import ReactCrop, {centerCrop, makeAspectCrop, Crop, PixelCrop} from 'react-image-crop'
import Modal from 'react-bootstrap/Modal'
import 'react-image-crop/dist/ReactCrop.css'
// import {canvasPreview} from './handlerFoto/canvasPreview'
// import {useDebounceEffect} from './handlerFoto/useDebounceEffect'

export interface FormInput {
  nama_hak_akses?: string
  id_modul_permission?: number
  updated_by?: number
}

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}
interface GetDataInterface {
  nama_hak_akses?: string
  id_modul_permission?: number
}

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const MANAJEMEN_PENGGUNA_URL = `${API_URL}/manajemen-pengguna`
export const KEPEGAWAIAN_URL = `${API_URL}/kepegawaian`

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

export function UpdateHakAkses() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [valuesFormik, setValuesFormik] = React.useState<FormInput>({})
  const [valuesFormikExist, setValuesFormikExist] = React.useState<FormInput>({})
  const [qParamFind, setUriFind] = useState({strparam: ''})
  const [btnLoadingUnduh, setbtnLoadingUnduh] = useState(false)
  const [showKata, setShowKata] = useState(false)
  const [showHak, setShowHak] = useState(false)
  const handleKataClose = () => setShowKata(false)
  const handleKataShow = () => setShowKata(true)
  const handleHakClose = () => setShowHak(false)
  const handleHakShow = () => setShowHak(true)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [selectedFile, setSelectedFile] = useState<FileFotoInterface>()

  // handler croping foto
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/hak-akses/findone/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        id_modul_permission: jsonD.id_modul_permission,
        nama_hak_akses: jsonD.nama_hak_akses,
        updated_by: 0,
      }
      setValuesFormikExist((prevstate) => ({...prevstate, ...paramValue}))
    }
    fetchData()
  }, [valuesFormik, id])

  const handleChangeFormik = (event: {
    preventDefault: () => void
    target: {value: any; name: any}
  }) => {
    setValuesFormik((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }
  // useDebounceEffect(
  //   async () => {
  //     if (
  //       completedCrop?.width &&
  //       completedCrop?.height &&
  //       imgRef.current &&
  //       previewCanvasRef.current
  //     ) {
  //       // We use canvasPreview as it's much faster than imgPreview.
  //       canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate)
  //     }
  //   },
  //   100,
  //   [completedCrop, scale, rotate]
  // )

  const formik = useFormik({
    initialValues: {
      id: 0,
      nama_hak_akses: '',
      id_modul_permission: 0,
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        nama_hak_akses: valuesFormik?.nama_hak_akses
          ? valuesFormik.nama_hak_akses
          : valuesFormikExist?.nama_hak_akses
          ? valuesFormikExist.nama_hak_akses
          : '',
        id_modul_permission: valuesFormik?.id_modul_permission
          ? valuesFormik.id_modul_permission
          : valuesFormikExist?.id_modul_permission
          ? valuesFormikExist.id_modul_permission
          : 0,
        updated_by: 0,
      }
      try {
        const response = await axios.put(
          `${MANAJEMEN_PENGGUNA_URL}/hak-akses/update/${id}`,
          bodyparam
        )
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/apps/detail-hak-akses/DetailHakAkses', {
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
  //unduh
  const handleUnduh = async () => {
    setbtnLoadingUnduh(true)
    await axios({
      url: `${MANAJEMEN_PENGGUNA_URL}/hak-akses/unduh?status=${qParamFind.strparam}`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      FileDownload(response.data, 'DATA Hak Akses.xlsx')
      setbtnLoadingUnduh(false)
    })
  }
  //end unduh
  //img
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
  const handleSubmitFoto = async (e: any) => {
    e.preventDefault()
    let formData = new FormData()
    try {
      if (selectedFile && selectedFile?.croppedImage) {
        formData.append('foto', selectedFile?.croppedImage)
        const responseFile = await axios.post(`${KEPEGAWAIAN_URL}/update-file/${id}`, formData)
        if (responseFile) {
          console.log('File success uploaded!')
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          setSelectedFile({croppedImage: null})

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

  //end img
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
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const {width, height} = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }
  const handleToggleAspectClick = () => {
    if (aspect) {
      setAspect(undefined)
    } else if (imgRef.current) {
      const {width, height} = imgRef.current
      setAspect(16 / 9)
      setCrop(centerAspectCrop(width, height, 16 / 9))
    }
  }

  return (
    <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-3'>
      <div className='flex-lg-row-fluid ms-lg-15'>
        <ul
          className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8'
          role='tablist'
        >
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link text-active-primary pb-4 active'
              data-kt-countup-tabs='true'
              data-bs-toggle='tab'
              href='#kt_user_view_overview_security'
              data-kt-initialized='1'
              aria-selected='true'
              role='tab'
            >
              <h2>Profile</h2>
            </a>
          </li>
        </ul>

        <div className='tab-content' id='myTabContent'>
          <div
            className='tab-pane fade show active'
            id='kt_user_view_overview_security'
            role='tabpanel'
          >
            <div className='card card-flush h-md-100'>
              <div className='card-body'>
                <div className='d-grid gap-2 d-md-flex justify-content-md'>
                  <Link to='/apps/detail-hak-akses/DetailHakAkses'>
                    <button className='btn btn-secondary'>
                      <i className='fa-solid fa-arrow-left'></i>
                      Kembali
                    </button>
                  </Link>
                </div>
                <div className='d-flex flex-center flex-column py-5'>
                  <div className='symbol symbol-100px symbol-circle mb-7'>
                    <img src='assets/media/avatars/300-6.jpg' alt='image'></img>
                  </div>
                </div>

                <div className='d-flex flex-center flex-column py-5'>
                  <div className='overlay-layer bg-dark bg-opacity-10 align-items-end justify-content-center'>
                    <button
                      type='button'
                      onClick={() => doEditFoto()}
                      className='btn btn-sm btn-primary btn-shadow mb-2'
                    >
                      Ubah Foto
                    </button>
                  </div>
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
                                  style={{transform: `scale(${scale}) rotate(${rotate}deg)`}}
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
                                    <label className='form-check-label' htmlFor='flexCheckDefault'>
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
                                        Math.min(180, Math.max(-180, Number(e.target.value)))
                                      )
                                    }
                                    className='form-control form-control-solid'
                                  />
                                </div>
                              </div>
                            </>
                          )}
                          <div>
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
              <div className='card-body pt-0 pb-5'>
                <div className='table-responsive'>
                  <table
                    className='table align-middle table-row-dashed gy-5'
                    id='kt_table_users_login_session'
                  >
                    <tbody className='fs-6 fw-semibold text-gray-600'>
                      <tr>
                        <td>Nama Lengkap</td>
                        <td>
                          <Form.Control
                            name='nama_hak_akses'
                            className='form-control form-control-solid'
                            onChange={handleChangeFormik}
                            // value={
                            //   valuesFormik?.nama_hak_akses || valuesFormik?.nama_hak_akses === ''
                            //     ? valuesFormik?.nama_hak_akses
                            //     : valuesFormikExist?.nama_hak_akses
                            //     ? valuesFormikExist?.nama_hak_akses
                            //     : ''
                            // }
                            readOnly
                          />
                        </td>
                        <td className='text-end'>
                          <button
                            type='button'
                            className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_update_email'
                            onClick={handleHakShow}
                          >
                            <span className='svg-icon svg-icon-3'>
                              <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  opacity='0.3'
                                  d='M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z'
                                  fill='currentColor'
                                ></path>
                                <path
                                  d='M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z'
                                  fill='currentColor'
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>
                          <Form.Control
                            name='id_modul_permission'
                            className='form-control form-control-solid'
                            onChange={handleChangeFormik}
                            // value={
                            //   valuesFormik?.id_modul_permission ||
                            //   valuesFormik?.id_modul_permission === 0
                            //     ? valuesFormik?.id_modul_permission
                            //     : valuesFormikExist?.id_modul_permission
                            //     ? valuesFormikExist?.id_modul_permission
                            //     : 0
                            // }
                            readOnly
                          />
                        </td>
                        <td className='text-end'>
                          <button
                            type='button'
                            className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_update_role'
                            onClick={handleKataShow}
                          >
                            <span className='svg-icon svg-icon-3'>
                              <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  opacity='0.3'
                                  d='M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z'
                                  fill='currentColor'
                                ></path>
                                <path
                                  d='M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z'
                                  fill='currentColor'
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Pasword</td>
                        <td>
                          <Form.Control
                            name='nama_hak_akses'
                            className='form-control form-control-solid'
                            onChange={handleChangeFormik}
                            // value={
                            //   valuesFormik?.nama_hak_akses || valuesFormik?.nama_hak_akses === ''
                            //     ? valuesFormik?.nama_hak_akses
                            //     : valuesFormikExist?.nama_hak_akses
                            //     ? valuesFormikExist?.nama_hak_akses
                            //     : ''
                            // }
                            readOnly
                          />
                        </td>
                        <td className='text-end'>
                          <button
                            type='button'
                            className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_update_email'
                            onClick={handleHakShow}
                          >
                            <span className='svg-icon svg-icon-3'>
                              <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  opacity='0.3'
                                  d='M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z'
                                  fill='currentColor'
                                ></path>
                                <path
                                  d='M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z'
                                  fill='currentColor'
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Nama Permission</td>
                        <td>
                          <Form.Control
                            name='id_modul_permission'
                            className='form-control form-control-solid'
                            onChange={handleChangeFormik}
                            value={
                              valuesFormik?.id_modul_permission ||
                              valuesFormik?.id_modul_permission === 0
                                ? valuesFormik?.id_modul_permission
                                : valuesFormikExist?.id_modul_permission
                                ? valuesFormikExist?.id_modul_permission
                                : 0
                            }
                            readOnly
                          />
                        </td>
                        <td className='text-end'>
                          <button
                            type='button'
                            className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_update_role'
                            onClick={handleKataShow}
                          >
                            <span className='svg-icon svg-icon-3'>
                              <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  opacity='0.3'
                                  d='M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z'
                                  fill='currentColor'
                                ></path>
                                <path
                                  d='M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z'
                                  fill='currentColor'
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <>
            <Modal show={showKata} onHide={handleKataClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ubah Nama Permission</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                  <div className='row mt-2'>
                    <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-10 col-sm-20 mb-4'>
                      <div className='form-group'>
                        <Form.Label>Nama Permission</Form.Label>
                        <Form.Control
                          name='id_modul_permission'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.id_modul_permission ||
                            valuesFormik?.id_modul_permission === 0
                              ? valuesFormik?.id_modul_permission
                              : valuesFormikExist?.id_modul_permission
                              ? valuesFormikExist?.id_modul_permission
                              : 0
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <button
                      type='button'
                      onClick={handleKataClose}
                      className='float-none btn btn-light align-self-center m-1'
                    >
                      Tutup
                    </button>
                    <button className='btn btn-primary' type='submit'>
                      <i className='fa-solid fa-paper-plane'></i>
                      Simpan
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </>
          <>
            <Modal show={showHak} onHide={handleHakClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ubah Nama Hak Akses</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                  <div className='row mt-2'>
                    <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-10 col-sm-20 mb-4'>
                      <div className='form-group'>
                        <Form.Label>Nama Hak Akses</Form.Label>
                        <Form.Control
                          name='nama_hak_akses'
                          className='form-control form-control-solid'
                          onChange={handleChangeFormik}
                          value={
                            valuesFormik?.nama_hak_akses || valuesFormik?.nama_hak_akses === ''
                              ? valuesFormik?.nama_hak_akses
                              : valuesFormikExist?.nama_hak_akses
                              ? valuesFormikExist?.nama_hak_akses
                              : ''
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <button
                      type='button'
                      onClick={handleHakClose}
                      className='float-none btn btn-light align-self-center m-1'
                    >
                      Tutup
                    </button>
                    <button className='btn btn-primary' type='submit'>
                      <i className='fa-solid fa-paper-plane'></i>
                      Simpan
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </>
        </div>
      </div>
    </div>
  )
}
