import {ChangeEvent, useState, FC, useEffect, useRef} from 'react'
import {ErrorMessage, Field} from 'formik'
import {ToFieldStateCE} from '../../components/fields.formikcto'
import {changedValue} from '../../../../redux/slices/pelaporan-kegiatan.slice'
import {useDispatch, useSelector} from 'react-redux'
import DragDropImageUploader from '../../components/DragDropImageUploader'
import {RootState} from '../../../../redux/store'

export const StepDokumentasi: FC = () => {
  const dispatch = useDispatch()
  const dokumentasi = useSelector((s: RootState) => s.pelaporanKegiatan.dokumentasi[0])

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Dokumentasi</h2>
        <DragDropImageUploader
          maxFile={4}
          path='kegiatan' // GANTI path ini dengan path laporan (kegiatan, kejadian, pengawasan, tamu daerah)
          slice={dokumentasi} // cek di inisiasi file ini, slice dari redux pelaporan
          change={(e: any) => {
            // console.log(e)
            dispatch(
              changedValue({
                target: {
                  name: 'dokumentasi',
                  value: e,
                },
              })
            )
            // gunakan dispatch dokumentasi disini
          }}
        />

        <div className='mb-10 form-group'>
          <label className='required form-label'>Keterangan</label>
          <Field
            as='textarea'
            type='text'
            name='dokumentasi[0].keterangan'
            className='form-control'
            placeholder='Masukkan Keterangan'
            onKeyUp={(o: ChangeEvent<any>) => {
              ToFieldStateCE(o)
              dispatch(
                changedValue({
                  target: {
                    name: 'dokumentasi',
                    value: [
                      {
                        file_uploadResult: dokumentasi.file_uploadResult,
                        keterangan: o.target.value,
                      },
                    ],
                  },
                })
              )
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
