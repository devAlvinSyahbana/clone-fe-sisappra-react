import {ChangeEvent, useState, FC, useEffect, useRef} from 'react'
import {ErrorMessage, Field} from 'formik'
import {ToFieldStateCE} from '../../components/fields.formikcto'
import {changedValue} from '../../../../redux/slices/pelaporan-kegiatan.slice'
import {useDispatch, useSelector} from 'react-redux'
import DragDropImageUploader from '../../components/DragDropImageUploader'

export const StepDokumentasi: FC = () => {
  const dispatch = useDispatch()

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Dokumentasi</h2>

        <DragDropImageUploader
          maxFile={4}
          postEndpoint={`https://run.mocky.io/v3/b5b74b60-e7d5-44b8-8f53-1c1ccb9a20b3`}
          change={(e: any) => console.log(e.file)}
        />

        <div className='mb-10 form-group'>
          <label className='required form-label'>Keterangan</label>
          <Field
            as='textarea'
            type='text'
            name='null'
            className='form-control'
            placeholder='Masukkan Keterangan'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='keterangan' />
          </div>
        </div>
      </div>
    </div>
  )
}
