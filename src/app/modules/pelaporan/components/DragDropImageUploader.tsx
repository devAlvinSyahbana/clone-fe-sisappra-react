import {useState, FC} from 'react'
import 'antd/dist/antd.css'
import {InboxOutlined} from '@ant-design/icons'
import type {RcFile, UploadProps} from 'antd/es/upload'
import type {UploadFile} from 'antd/es/upload/interface'
import type {UploadChangeParam} from 'antd/es/upload'
import {message, Upload, Image} from 'antd'
import './imgUploader.css'

export const API_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_UPLOAD_URL
export const UPLOAD_TOKEN = process.env.REACT_APP_SISAPPRA_PELAPORAN_UPLOAD_TOKEN

const {Dragger} = Upload

const generateUid = () => {
  const date = new Date()
  const year = date.getFullYear().toString().substring(2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const today = year + month + day

  return 'sisappra.' + today + '.' + Math.floor(Math.random() * 100000)
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const props: UploadProps = {
  name: 'file',
  multiple: true,
  accept: 'image/*',
  listType: 'picture',
  beforeUpload: (file) => {
    const isPNG = file.type !== 'image/gif'
    if (!isPNG) {
      message.error(`${file.name} is not a png / jpg file`)
    }
    return isPNG || Upload.LIST_IGNORE
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
}

const DragDropImageUploader: FC<any> = ({maxFile, path, change, slice}) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    const {status} = info.file
    const formData = new FormData()
    formData.append('bucket', 'pelaporan')
    formData.append('path', path)
    formData.append('file', info.file.originFileObj as RcFile)
    const allFilesDone = info.fileList.every((file) => file.status === 'done')
    if (allFilesDone) {
      let files = slice
      files = []
      if (info.fileList.length > 0) {
        for (let i = 0; i < info.fileList.length; i++) {
          files.push({bucket: 'pelaporan', key: info.fileList[i].response.Key})
        }
      } else {
        files = [{bucket: 'pelaporan', key: ''}]
      }
      change([{file_uploadResult: files, keterangan: slice.keterangan}])
      console.log(info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      console.log(info.fileList)
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewTitle(
      generateUid() + file.name ||
        generateUid() + file.url!.substring(file.url!.lastIndexOf('/') + 1)
    )
    setPreviewVisible(!previewVisible)
  }

  const handleUpload = ({file, onSuccess, onError}: any) => {
    file.status = 'uploading'

    const formData = new FormData()
    formData.append('bucket', 'pelaporan')
    formData.append('path', path)
    formData.append('file', file as RcFile)

    fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${UPLOAD_TOKEN}`,
      },
    })
      .then((res) => {
        if (res.status >= 200 && res.status <= 250) {
          file.status = 'done'
          return res.json()
        }
        file.status = 'error'
        const newRes = new Response(res.body, {
          statusText: 'Upload error, coba kembali',
        })
        onError(newRes)
      })
      .then((data) => {
        onSuccess(data.minioResult)
      })
      .catch((error) => {
        console.error(error)
        onError(error)
      })

    return false // Prevent the default upload behavior
  }

  const handleDelete = (file: any) => {
    if (file.status === 'done') {
      fetch(`${API_URL}/pelaporan/${file.response.Key}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${UPLOAD_TOKEN}`,
        },
      })
    } else {
      console.log(file.uid, 'file is deleted')
    }
  }

  return (
    <div className='parent mb-8'>
      <Dragger
        {...props}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleDelete}
        customRequest={handleUpload}
        maxCount={maxFile}
      >
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag files to this area to upload</p>
        <p className='ant-upload-hint'>Maximum file to upload is {maxFile}</p>
      </Dragger>
      <Image
        hidden
        // width={200}
        alt={previewTitle}
        src={previewImage}
        preview={{
          visible: previewVisible,
          onVisibleChange: (visible, prevVisible) => setPreviewVisible(visible),
        }}
      />
    </div>
  )
}

export default DragDropImageUploader
