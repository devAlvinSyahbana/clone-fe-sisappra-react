import React, {useEffect, useState, useRef} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useLocation, useParams} from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'
import {Modal, Tooltip, OverlayTrigger} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Swal from 'sweetalert2'
import ReactCrop, {centerCrop, makeAspectCrop, Crop, PixelCrop} from 'react-image-crop'
import {canvasPreview} from './handlerFoto/canvasPreview'
import {useDebounceEffect} from './handlerFoto/useDebounceEffect'
import 'react-image-crop/dist/ReactCrop.css'
import {
  DetailPegawaiInterface,
  JumlahKeluargaInterface,
  PendidikanInterface,
  DetailMasterJabatan,
} from '../KepegawaianInterface'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KEPEGAWAIAN_URL = `${API_URL}/informasi-data-pegawai`
export const MASTER_URL = `${API_URL}/master`

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

const UpdateHeaderDetail = () => {
  const location = useLocation()
  const {id, status} = useParams()
  const [data, setData] = useState<DetailPegawaiInterface>()
  const [jkeluarga, setJkeluarga] = useState<JumlahKeluargaInterface>()
  const [pendidikan, setPendidikan] = useState<PendidikanInterface>()
  const [show, setShow] = useState(false)
  const [showFullBody, setShowFullBody] = useState(false)
  const handleClose = () => setShow(false)
  const [selectedFile, setSelectedFile] = useState<FileFotoInterface>()
  const [selectedFileFullBody, setSelectedFileFullBody] = useState<FileFotoInterface>()

  // handler croping foto
  const [imgSrc, setImgSrc] = useState('')
  const [imgSrcFullBody, setImgSrcFullBody] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const previewCanvasRefFullBody = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const imgRefFullBody = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [cropFullBody, setCropFullBody] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [completedCropFullBody, setCompletedCropFullBody] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [scaleFullBody, setScaleFullBody] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [rotateFullBody, setRotateFullBody] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)
  const [aspectFullBody, setAspectFullBody] = useState<number | undefined>(16 / 9)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${KEPEGAWAIAN_URL}/findone/${id}/${status}`)
      const keluarga = await axios.get(`${KEPEGAWAIAN_URL}/count-keluarga/${id}/${status}`)
      const pendidikan = await axios.get(
        `${KEPEGAWAIAN_URL}/get-pendidikan-terakhir/${id}/${status}`
      )
      setJkeluarga(keluarga.data.data)
      if (pendidikan.data.data) {
        const {data} = await axios.get(
          `${MASTER_URL}/pendidikan/findone/${pendidikan.data.data.jenis_pendidikan}`
        )
        setPendidikan((prevstate) => ({...prevstate, jenis_pendidikan: data.data.pendidikan}))
      }
      setData(response.data.data)
      getDetailJabatan(response.data.data.kepegawaian_jabatan)
    }
    fetchData()
  }, [id, status])

  const fetchDT = async () => {
    const response = await axios.get(`${KEPEGAWAIAN_URL}/findone/${id}/${status}`)
    const keluarga = await axios.get(`${KEPEGAWAIAN_URL}/count-keluarga/${id}/${status}`)
    const pendidikan = await axios.get(`${KEPEGAWAIAN_URL}/get-pendidikan-terakhir/${id}/${status}`)
    setJkeluarga(keluarga.data.data)
    if (pendidikan.data.data) {
      const {data} = await axios.get(
        `${MASTER_URL}/pendidikan/findone/${pendidikan.data.data.jenis_pendidikan}`
      )
      setPendidikan((prevstate) => ({...prevstate, jenis_pendidikan: data.data.pendidikan}))
    }
    setData(response.data.data)
    getDetailJabatan(response.data.data.kepegawaian_jabatan)
  }

  const [detailJabatan, setDetailJabatan] = useState<DetailMasterJabatan>()
  const getDetailJabatan = async (id: number) => {
    if (id) {
      const response = await axios.get(`${MASTER_URL}/jabatan/findone/${id}`)
      setDetailJabatan((prevstate) => ({...prevstate, ...response.data.data}))
    }
  }

  const handleSubmitFoto = async (e: any) => {
    e.preventDefault()
    let formData = new FormData()
    try {
      if (selectedFile && selectedFile?.croppedImage) {
        formData.append('foto', selectedFile?.croppedImage)
        const responseFile = await axios.post(
          `${KEPEGAWAIAN_URL}/update-file/${id}/${status}`,
          formData
        )
        if (responseFile) {
          console.log('File success uploaded!')
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          setSelectedFile({croppedImage: null})
          fetchDT()
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
  const handleSubmitFotoFullBody = async (e: any) => {
    e.preventDefault()
    let formData = new FormData()
    try {
      if (selectedFileFullBody && selectedFileFullBody?.croppedImage) {
        formData.append('foto_full_body', selectedFileFullBody?.croppedImage)
        const responseFile = await axios.post(
          `${KEPEGAWAIAN_URL}/update-file/${id}/${status}`,
          formData
        )
        if (responseFile) {
          console.log('File success uploaded!')
          Swal.fire({
            icon: 'success',
            text: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
          })
          setSelectedFileFullBody({croppedImage: null})
          fetchDT()
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
    setSelectedFileFullBody({croppedImage: null})
    setImgSrcFullBody('')
    setCropFullBody(undefined)
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
      reader.readAsDataURL(e.target.files[0])
    }
  }
  const onSelectFileFullBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCropFullBody(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrcFullBody(reader.result?.toString() || ''))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const {width, height} = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }
  const onImageLoadFullBody = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const {width, height} = e.currentTarget
      setCropFullBody(centerAspectCrop(width, height, aspect))
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
      if (
        completedCropFullBody?.width &&
        completedCropFullBody?.height &&
        imgRefFullBody.current &&
        previewCanvasRefFullBody.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRefFullBody.current,
          previewCanvasRefFullBody.current,
          completedCropFullBody,
          scaleFullBody,
          rotateFullBody
        )
      }
    },
    100,
    [completedCrop, scale, rotate, completedCropFullBody, scaleFullBody, rotateFullBody]
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
  const handleToggleAspectClickFullBody = () => {
    if (aspectFullBody) {
      setAspectFullBody(undefined)
    } else if (imgRefFullBody.current) {
      const {width, height} = imgRefFullBody.current
      setAspectFullBody(16 / 9)
      setCropFullBody(centerAspectCrop(width, height, 16 / 9))
    }
  }

  const onCropComplete = (crop: any) => {
    if (imgRef && crop.width && crop.height) {
      getCroppedImg(imgRef.current, crop)
    }
  }
  const onCropCompleteFullBody = (crop: any) => {
    if (imgRefFullBody && crop.width && crop.height) {
      getCroppedImgFullBody(imgRefFullBody.current, crop)
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
  const getCroppedImgFullBody = (image: any, crop: any) => {
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
        dataURLtoFileFullBody(reader.result, 'cropped_foto.png')
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
  const dataURLtoFileFullBody = (dataurl: any, filename: string) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    let croppedImage = new File([u8arr], filename, {type: mime})
    setSelectedFileFullBody((prev) => ({...prev, croppedImage: croppedImage}))
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='row'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-160px symbol-lg-160px symbol-fixed position-relative overlay overflow-hidden'>
                  <div className='overlay-wrapper'>
                    {data && data?.foto !== '' ? (
                      <div className='symbol-label'>
                        <img src={`${API_URL}/${data?.foto}`} alt={data?.nama} className='w-100' />
                      </div>
                    ) : (
                      <div
                        className={clsx(
                          'symbol-label fs-1',
                          `bg-light-secondary`,
                          `text-dark-secondary`
                        )}
                      >
                        {data?.nama?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className='overlay-layer bg-dark bg-opacity-10 align-items-end justify-content-center'>
                    {data && data?.foto_full_body && data?.foto_full_body !== '' && (
                      <OverlayTrigger
                        key={'bottom'}
                        placement={'bottom'}
                        overlay={<Tooltip id={`tooltip-bottom`}>Lihat Foto Seluruh Tubuh.</Tooltip>}
                      >
                        <button
                          type='button'
                          className='btn btn-sm btn-icon btn-secondary btn-shadow mb-2'
                          onClick={() => setShowFullBody(true)}
                        >
                          <i className='bi bi-fullscreen'></i>
                        </button>
                      </OverlayTrigger>
                    )}
                    <button
                      type='button'
                      onClick={() => doEditFoto()}
                      className='btn btn-sm btn-primary btn-shadow mb-2'
                    >
                      Ubah Foto
                    </button>
                  </div>
                </div>
                <Modal show={showFullBody} fullscreen={true} onHide={() => setShowFullBody(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Foto Seluruh Tubuh</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <img
                      src={`${API_URL}/${data?.foto_full_body}`}
                      alt={data?.nama}
                      className='w-100'
                    />
                  </Modal.Body>
                </Modal>
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
                    <ul className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
                      <li className='nav-item'>
                        <a className='nav-link active' data-bs-toggle='tab' href='#kt_tab_pane_1'>
                          Setengah Badan
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a className='nav-link' data-bs-toggle='tab' href='#kt_tab_pane_2'>
                          Seluruh Tubuh
                        </a>
                      </li>
                    </ul>
                    <div className='tab-content' id='myTabContent'>
                      <div className='tab-pane fade active show' id='kt_tab_pane_1' role='tabpanel'>
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
                                            Math.min(180, Math.max(-180, Number(e.target.value)))
                                          )
                                        }
                                        className='form-control form-control-solid'
                                      />
                                    </div>
                                  </div>
                                </>
                              )}
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
                      </div>
                      <div className='tab-pane fade' id='kt_tab_pane_2' role='tabpanel'>
                        <form className='form' onSubmit={handleSubmitFotoFullBody}>
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
                                  onChange={onSelectFileFullBody}
                                  accept='image/jpeg,image/png'
                                />
                                <small className='mt-4'>
                                  *File yang dapat di upload berformat (.jpeg, .png)
                                </small>
                              </div>
                              {!!imgSrcFullBody && (
                                <>
                                  <div className='separator border-3 my-10'></div>
                                  <h5 className='mt-6 fs-5'>Cropping Foto</h5>
                                  <ReactCrop
                                    crop={cropFullBody}
                                    onChange={(_, percentCrop) => setCropFullBody(percentCrop)}
                                    onComplete={(c) => {
                                      onCropCompleteFullBody(c)
                                      setCompletedCropFullBody(c)
                                    }}
                                    aspect={aspectFullBody}
                                    className='mt-4'
                                  >
                                    <img
                                      ref={imgRefFullBody}
                                      alt='Crop me'
                                      src={imgSrcFullBody}
                                      style={{
                                        transform: `scale(${scaleFullBody}) rotate(${rotateFullBody}deg)`,
                                      }}
                                      onLoad={onImageLoadFullBody}
                                    />
                                  </ReactCrop>
                                  <div className='row mt-4'>
                                    <div className='col-12 mb-4'>
                                      <div className='form-check form-check-custom form-check-solid'>
                                        <input
                                          className='form-check-input'
                                          type='checkbox'
                                          value=''
                                          id='flexCheckDefault1'
                                          onChange={handleToggleAspectClickFullBody}
                                        />
                                        <label
                                          className='form-check-label'
                                          htmlFor='flexCheckDefault1'
                                        >
                                          Toggle aspect {aspectFullBody ? 'off' : 'on'}
                                        </label>
                                      </div>
                                    </div>
                                    <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 mb-4'>
                                      <label htmlFor='scale-input'>Scale: </label>
                                      <input
                                        id='scale-input'
                                        type='number'
                                        step='0.1'
                                        value={scaleFullBody}
                                        disabled={!imgSrcFullBody}
                                        onChange={(e) => setScaleFullBody(Number(e.target.value))}
                                        className='form-control form-control-solid'
                                      />
                                    </div>
                                    <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 mb-4'>
                                      <label htmlFor='rotate-input'>Rotate: </label>
                                      <input
                                        id='rotate-input'
                                        type='number'
                                        value={rotateFullBody}
                                        disabled={!imgSrcFullBody}
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
                                disabled={!selectedFileFullBody?.croppedImage}
                              >
                                Simpan
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  {data && data?.foto !== '' ? (
                    <div className='symbol-label'>
                      <img
                        src={`${API_URL}/${data?.foto_full_body}`}
                        alt={data?.nama}
                        className='w-100'
                      />
                    </div>
                  ) : (
                    <div
                      className={clsx(
                        'symbol-label fs-1',
                        `bg-light-secondary`,
                        `text-dark-secondary`
                      )}
                    >
                      {data?.nama?.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='mb-2'>
                  <div className='d-flex align-items-center mb-2'>
                    <div className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {data?.nama !== '' ? data?.nama : '-'}
                    </div>
                  </div>
                  <div className='row fw-bold fs-6 mb-4 pe-2'>
                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                      <div className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                        <KTSVG
                          path='/media/icons/duotune/communication/com006.svg'
                          className='svg-icon-4 me-1'
                        />
                        {data?.kepegawaian_status_pegawai !== ''
                          ? data?.kepegawaian_status_pegawai
                          : '-'}
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                      <div className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                        <KTSVG
                          path='/media/icons/duotune/communication/com005.svg'
                          className='svg-icon-4 me-1'
                        />
                        {data?.no_hp !== '' ? data?.no_hp : '-'}
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                      <div className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                        <KTSVG
                          path='/media/icons/duotune/communication/com011.svg'
                          className='svg-icon-4 me-1'
                        />
                        -
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                      <div className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                        <i className='fa-solid fa-address-card me-1'></i>
                        {detailJabatan?.jabatan ? detailJabatan?.jabatan : '-'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='d-flex flex-wrap flex-stack'>
                  <div className='d-flex flex-column flex-grow-1 pe-8'>
                    <div className='d-flex flex-wrap'>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>
                            {jkeluarga?.total !== 0 ? jkeluarga?.total : '-'}
                          </div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>Jumlah Anggota Keluarga</div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <div className='fs-2 fw-bolder'>
                            {pendidikan?.jenis_pendidikan ? pendidikan?.jenis_pendidikan : '-'}
                          </div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>Pendidikan Terakhir</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='d-flex overflow-auto h-55px'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('ubah-data-pribadi') && 'active')
                    }
                    to={`/kepegawaian/informasi-data-pegawai/ubah-data-pribadi/${id}/${status}`}
                  >
                    Data Pribadi
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('ubah-data-keluarga') && 'active')
                    }
                    to={`/kepegawaian/informasi-data-pegawai/ubah-data-keluarga/${id}/${status}`}
                  >
                    Data Keluarga
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('ubah-data-pendidikan') && 'active')
                    }
                    to={`/kepegawaian/informasi-data-pegawai/ubah-data-pendidikan/${id}/${status}`}
                  >
                    Pendidikan
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname.includes('ubah-data-kepegawaian') && 'active')
                    }
                    to={`/kepegawaian/informasi-data-pegawai/ubah-data-kepegawaian/${id}/${status}`}
                  >
                    Data Kepegawaian
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </>
  )
}

export {UpdateHeaderDetail}
