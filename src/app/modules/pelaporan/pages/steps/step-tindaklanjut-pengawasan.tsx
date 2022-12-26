import React, {ChangeEvent, FC, useEffect} from 'react'
import Select from 'react-select'
import {ErrorMessage, Field} from 'formik'
import {DatePickerField, SelectField, ToFieldStateCE} from '../../components/fields.formikcto'
import {
  createSchemaPelaporanPengawasan,
  initialState,
  PelaporanPengawasanState,
  changedValue,
  updateKawasanKendaliList,
  updateJenisReklameList,
  updateStatusReklameList,
} from '../../../../redux/slices/pelaporan-pengawasan-reklame.slice'

import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../redux/store'
import DragDropImageUploader from '../../components/DragDropImageUploader'

export const StepTindakLanjutPengawasan: FC = ({}) => {
  const dispatch = useDispatch()
  const KawasanKendaliList = useSelector(
    (s: RootState) => s.pelaporanPengawasan.list_kawasan_kendali
  )
  const JenisReklameList = useSelector((s: RootState) => s.pelaporanPengawasan.list_jenis_reklame)
  const StatusReklameList = useSelector((s: RootState) => s.pelaporanPengawasan.list_status_reklame)

  const listMasterPengawasanValue = () => {
    dispatch(updateKawasanKendaliList())
    dispatch(updateStatusReklameList())
    dispatch(updateJenisReklameList())
  }

  useEffect(() => {
    listMasterPengawasanValue()
  }, [])

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Tindak Lanjut</h2>

        <div className='row'>
          <div className='col-6 form-group'>
            <div className='mb-10 form-group'>
              <div className='mb-10'>
                <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
                  Posisi Reklame
                </label>
                <Field
                  type='text'
                  name='posisi_reklame'
                  className='form-control'
                  onKeyUp={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='posisi_reklame' />
                </div>
              </div>
            </div>
          </div>
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
                Latitude
              </label>
              <Field
                type='number'
                name='latitude'
                className='form-control'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='latitude' />
              </div>
            </div>
          </div>
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
                Longtitude
              </label>
              <Field
                type='number'
                name='longtitude'
                className='form-control'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='longtitude' />
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-6 mb-10 form-group'>
            <label className='required form-label'>Kawasan Kendali</label>
            <Field
              name='kawasan_kendali_selection'
              target='kawasan_kendali'
              className='form-control'
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
            <label className='required form-label'>Jenis Reklame</label>
            <Field
              name='jenis_reklame_selection'
              target='jenis_reklame'
              className='form-control'
              component={SelectField}
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
              <label className='required form-label'>Status Reklame</label>
              <Field
                name='status_reklame_selection'
                target='status_reklame'
                className='form-control'
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
              <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
                Pemilik Reklame
              </label>
              <Field
                type='text'
                name='pemilik_reklame'
                className='form-control'
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
              <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
                Pemilik Kontruksi
              </label>
              <Field
                type='text'
                name='konstruksi_reklame'
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
              <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
                Konten Iklan
              </label>
              <Field
                type='text'
                name='konten_iklan'
                className='form-control'
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
              <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
                Ukuran
              </label>
              <Field
                type='number'
                name='ukuran'
                className='form-control'
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
          <label className='required form-label'>Dokumentasi</label>
          <DragDropImageUploader
            maxFile={4}
            postEndpoint={`https://run.mocky.io/v3/b5b74b60-e7d5-44b8-8f53-1c1ccb9a20b3`}
            change={(e: any) => console.log(e.file)}
          />
        </div>
      </div>
    </div>
  )
}
