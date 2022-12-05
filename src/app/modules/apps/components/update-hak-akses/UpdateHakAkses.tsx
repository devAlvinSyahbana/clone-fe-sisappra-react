import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import FileDownload from 'js-file-download'
import ReactCrop, {centerCrop, makeAspectCrop, Crop, PixelCrop} from 'react-image-crop'
import Modal from 'react-bootstrap/Modal'
import 'react-image-crop/dist/ReactCrop.css'
import clsx from 'clsx'
// import {DetailPegawaiInterface} from './KepegawaianInterface'
import {canvasPreview} from './handlerFoto/canvasPreview'
import {useDebounceEffect} from './handlerFoto/useDebounceEffect'

export interface FormInput {
  nama_lengkap?: string
  email?: string
  foto?: string
  kata_sandi?: string
  hak_akses?: number
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
  nama_lengkap?: string
  email?: string
  foto?: string
  kata_sandi?: string
  hak_akses?: number
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
  // const [data, setData] = useState<DetailPegawaiInterface>()
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
      const response = await axios.get(`${MANAJEMEN_PENGGUNA_URL}/find/${id}`)
      const jsonD: GetDataInterface = response.data.data
      const paramValue: FormInput = {
        email: jsonD.email,
        kata_sandi: jsonD.kata_sandi,
        hak_akses: jsonD.hak_akses,
        nama_lengkap: jsonD.nama_lengkap,
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

  const formik = useFormik({
    initialValues: {
      id: 0,
      nama_lengkap: '',
      email: '',
      foto: '',
      hak_akses: 0,
    },
    onSubmit: async (values) => {
      const bodyparam: FormInput = {
        nama_lengkap: valuesFormik?.nama_lengkap
          ? valuesFormik.nama_lengkap
          : valuesFormikExist?.nama_lengkap
          ? valuesFormikExist.nama_lengkap
          : '',
        kata_sandi: valuesFormik?.kata_sandi
          ? valuesFormik.kata_sandi
          : valuesFormikExist?.kata_sandi
          ? valuesFormikExist.kata_sandi
          : '',
        email: valuesFormik?.email
          ? valuesFormik.email
          : valuesFormikExist?.email
          ? valuesFormikExist.email
          : '',
        foto: valuesFormik?.foto
          ? valuesFormik.foto
          : valuesFormikExist?.foto
          ? valuesFormikExist.foto
          : '',
        hak_akses: valuesFormik?.hak_akses
          ? valuesFormik.hak_akses
          : valuesFormikExist?.hak_akses
          ? valuesFormikExist.hak_akses
          : 0,
        updated_by: 0,
      }
      try {
        const response = await axios.put(
          `${MANAJEMEN_PENGGUNA_URL}/hak-akses/findone/${id}`,
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
  //img
  // const doEditFoto = () => {
  //   setShow(true)
  //   setSelectedFile({croppedImage: null})
  //   setImgSrc('')
  //   setCrop(undefined)
  // }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
      reader.readAsDataURL(e.target.files[0])
    }
  }
  // const handleSubmitFoto = async (e: any) => {
  //   e.preventDefault()
  //   let formData = new FormData()
  //   try {
  //     if (selectedFile && selectedFile?.croppedImage) {
  //       formData.append('foto', selectedFile?.croppedImage)
  //       const responseFile = await axios.post(`${KEPEGAWAIAN_URL}/update-file/${id}`, formData)
  //       if (responseFile) {
  //         console.log('File success uploaded!')
  //         Swal.fire({
  //           icon: 'success',
  //           text: 'Data berhasil disimpan',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         })
  //         setSelectedFile({croppedImage: null})

  //         handleClose()
  //       }
  //       return
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       text: 'Data gagal disimpan, harap mencoba lagi',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     })
  //     console.error(error)
  //   }
  // }

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
    <div className='row row-cols-10 row-cols-md-20 row-cols-xl-30 g-50 g-xl-30'>
      <div className='flex-lg-row-fluid ms-lg-20'>
        <div className='tab-content' id='myTabContent'>
          <div
            className='tab-pane fade show active'
            id='kt_user_view_overview_security'
            role='tabpanel'
          >
            <div className='col-md-6 class="d-flex flex-center flex-column py-5'>
              <div className='card page-title d-flex flex-column justify-content-center flex-wrap me-3'>
                <div className='card-body'>
                  <div className='d-grid gap-2 d-md-flex justify-content-md'>
                    <Link to='/apps/detail-hak-akses/DetailHakAkses/'>
                      <button className='btn btn-secondary'>
                        <i className='fa-solid fa-arrow-left'></i>
                        Kembali
                      </button>
                    </Link>
                  </div>

                  <div className='col-md-6 class="d-flex flex-center  py-5 px-20 '>
                    <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative overlay overflow-hidden'>
                      <div className='overlay-wrapper'>
                        {/* {data && data?.foto !== '' ? (
                          <div className='symbol-label'>
                            <img
                              src={`${API_URL}/${data?.foto}`}
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
                        )} */}
                      </div>
                      <div className='overlay-layer bg-dark bg-opacity-10 align-items-end justify-content-center'></div>
                    </div>
                  </div>
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
                              readOnly
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>email</td>
                          <td>
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
                              readOnly
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Pasword</td>
                          <td>
                            <Form.Control
                              name='kata_sandi'
                              type='password'
                              className='form-control form-control-solid'
                              onChange={handleChangeFormik}
                              value={
                                valuesFormik?.kata_sandi || valuesFormik?.kata_sandi === ''
                                  ? valuesFormik?.kata_sandi
                                  : valuesFormikExist?.kata_sandi
                                  ? valuesFormikExist?.kata_sandi
                                  : ''
                              }
                              readOnly
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Hak Akses</td>
                          <td>
                            <Form.Control
                              name='hak_akses'
                              className='form-control form-control-solid'
                              onChange={handleChangeFormik}
                              value={
                                valuesFormik?.hak_akses || valuesFormik?.hak_akses === 0
                                  ? valuesFormik?.hak_akses
                                  : valuesFormikExist?.hak_akses
                                  ? valuesFormikExist?.hak_akses
                                  : 0
                              }
                              readOnly
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
