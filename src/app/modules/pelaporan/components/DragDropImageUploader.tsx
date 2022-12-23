import {useState, FC} from 'react'
import 'antd/dist/antd.css'
import {InboxOutlined} from '@ant-design/icons'
import type {RcFile, UploadProps} from 'antd/es/upload'
import type {UploadFile} from 'antd/es/upload/interface'
import type {UploadChangeParam} from 'antd/es/upload'
import {message, Upload, Image} from 'antd'
import './imgUploader.css'

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
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
}

const DragDropImageUploader: FC<any> = ({maxFile, postEndpoint, change}) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    const {status} = info.file
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
    change(info)
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

  return (
    <div className='parent mb-8'>
      <Dragger
        {...props}
        onPreview={handlePreview}
        onChange={handleChange}
        action={postEndpoint}
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
