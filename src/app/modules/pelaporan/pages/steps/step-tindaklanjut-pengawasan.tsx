import React, {ChangeEvent, FC, useEffect} from 'react'
import {ErrorMessage, Field, FormikValues} from 'formik'
import {DatePickerField, SelectField, ToFieldStateCE} from '../../components/fields.formikcto'
import {
  createSchemaPelaporanPengawasan,
  initialState,
  PelaporanPengawasanState,
  changedValue,
} from '../../../../redux/slices/pelaporan-pengawasan-reklame.slice'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../redux/store'
import DragDropImageUploader from '../../components/DragDropImageUploader'
interface StepTindakLanjutPengawasanProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  detailState: boolean
}

export const StepTindakLanjutPengawasan: FC<StepTindakLanjutPengawasanProps> = ({detailState}) => {
  const dispatch = useDispatch()
  const KawasanKendaliList = useSelector(
    (s: RootState) => s.pelaporanPengawasan.list_kawasan_kendali
  )
  const JenisReklameList = useSelector((s: RootState) => s.pelaporanPengawasan.list_jenis_reklame)
  const StatusReklameList = useSelector((s: RootState) => s.pelaporanPengawasan.list_status_reklame)
  const dokumentasi = useSelector((s: RootState) => s.pelaporanPengawasan.tindak_dokumentasi[0])

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Tindak Lanjut</h2>

        <div className='row'>
          <div className='col-6 form-group'>
            <div className='mb-10 form-group'>
              <div className='mb-10'>
                <label htmlFor='kegiatan__jumlah_personil' className=' form-label'>
                  Posisi Reklame
                </label>
                <Field
                  type='text'
                  name='share_location'
                  disabled={detailState}
                  className='form-control'
                  onKeyUp={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='lokasi_tiang' />
                </div>
              </div>
            </div>
          </div>
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label htmlFor='kegiatan__jumlah_personil' className=' form-label'>
                Latitude
              </label>
              <Field
                type='number'
                name='lokasi_tiang'
                className='form-control'
                disabled={detailState}
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='lokasi_tiang' />
              </div>
            </div>
          </div>
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label htmlFor='kegiatan__jumlah_personil' className=' form-label'>
                Longtitude
              </label>
              <Field
                type='number'
                name='longtitude'
                disabled={detailState}
                className='form-control'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='lokasi_tiang' />
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-6 mb-10 form-group'>
            <label className=' form-label'>Kawasan Kendali</label>
            <Field
              name='kawasan_kendali_selection'
              target='kawasan_kendali'
              className='form-control'
              disabled={detailState}
              component={SelectField}
              options={KawasanKendaliList}
              onChange={(o: ChangeEvent<any>) => {
                console.log(o)
                dispatch(changedValue(ToFieldStateCE(o)))
              }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='kawasan_kendali_selection' />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-6 mb-10 form-group'>
            <label className=' form-label'>Jenis Reklame</label>
            <Field
              name='jenis_reklame_selection'
              target='jenis_reklame'
              className='form-control'
              component={SelectField}
              disabled={detailState}
              options={JenisReklameList}
              onChange={(o: ChangeEvent<any>) => {
                dispatch(changedValue(ToFieldStateCE(o)))
              }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='jenis_reklame_selection' />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-6 form-group'>
            <div className='mb-10 form-group'>
              <label className=' form-label'>Status Reklame</label>
              <Field
                name='status_reklame_selection'
                target='status_reklame'
                className='form-control'
                disabled={detailState}
                component={SelectField}
                options={StatusReklameList}
                onChange={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='status_reklame_selection' />
              </div>
            </div>
          </div>
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label htmlFor='kegiatan__jumlah_personil' className=' form-label'>
                Pemilik Reklame
              </label>
              <Field
                type='text'
                name='pemilik_reklame'
                className='form-control'
                disabled={detailState}
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='pemilik_reklame' />
              </div>
            </div>
          </div>
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label htmlFor='kegiatan__jumlah_personil' className=' form-label'>
                Pemilik Kontruksi
              </label>
              <Field
                type='text'
                name='konstruksi_reklame'
                disabled={detailState}
                className='form-control'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kegiatan__jumlah_personil' />
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-6 form-group'>
            <div className='mb-10'>
              <label htmlFor='kegiatan__jumlah_personil' className=' form-label'>
                Konten Iklan
              </label>
              <Field
                type='text'
                name='konten_iklan'
                className='form-control'
                disabled={detailState}
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='konten_iklan' />
              </div>
            </div>
          </div>
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label htmlFor='kegiatan__jumlah_personil' className=' form-label'>
                Ukuran
              </label>
              <Field
                type='number'
                name='ukuran'
                className='form-control'
                disabled={detailState}
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='ukuran' />
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='pb-10 pb-lg-15'>
            <h2 className='fw-bolder text-dark mb-10'>Dokumentasi</h2>
            <DragDropImageUploader
              maxFile={4}
              path='pengawasan' // GANTI path ini dengan path laporan (kegiatan, kejadian, pengawasan, tamu daerah)
              slice={dokumentasi} // cek di inisiasi file ini, slice dari redux pelaporan
              sourceFile={dokumentasi.file_uploadResult}
              disabled={detailState}
              change={(e: any) => {
                // console.log(e)
                dispatch(
                  changedValue({
                    target: {
                      name: 'tindak_dokumentasi',
                      value: e,
                    },
                  })
                )
                // gunakan dispatch dokumentasi disini
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
