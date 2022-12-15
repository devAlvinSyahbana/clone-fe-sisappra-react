import React, {ChangeEvent, FC} from 'react'
import Select from 'react-select'
import {ErrorMessage, Field} from 'formik'
import {DatePickerField, SelectField, ToFieldStateCE} from '../../components/fields.formikcto'
import {changedValue} from '../../../../redux/slices/pelaporan-kegiatan.slice'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../redux/store'

export const StepTindakLanjutPengawasan: FC = () => {
  const dispatch = useDispatch()

  const listJenisPasal = useSelector((s: RootState) => s.pelaporanKegiatan.list_jenis_pasal)
  const listJenisPenindakan = useSelector(
    (s: RootState) => s.pelaporanKegiatan.list_jenis_penindakan
  )
  const listJenisPenyelesaian = useSelector(
    (s: RootState) => s.pelaporanKegiatan.list_jenis_penyelesaian
  )
  const listJenisUsaha = useSelector((s: RootState) => s.pelaporanKegiatan.list_jenis_usaha)

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
                  name='kegiatan__jumlah_personil'
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
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
                Latitude
              </label>
              <Field
                type='number'
                name='kegiatan__jumlah_personil'
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
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
                Longtitude
              </label>
              <Field
                type='number'
                name='kegiatan__jumlah_personil'
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
          <div className='col-6 mb-10 form-group'>
            <label className='required form-label'>Kawasan Kendali</label>
            <Field
              name='tindak_lanjut__administrasi__jenis_pasal_selection'
              target='tindak_lanjut__administrasi__jenis_pasal_id'
              className='form-control'
              component={SelectField}
              options={listJenisPasal}
              onChange={(o: ChangeEvent<any>) => {
                dispatch(changedValue(ToFieldStateCE(o)))
              }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='tindak_lanjut__administrasi__jenis_pasal_id' />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-6 mb-10 form-group'>
            <label className='required form-label'>Jenis Reklame</label>
            <Field
              name='tindak_lanjut__administrasi__jenis_pasal_selection'
              target='tindak_lanjut__administrasi__jenis_pasal_id'
              className='form-control'
              component={SelectField}
              options={listJenisPasal}
              onChange={(o: ChangeEvent<any>) => {
                dispatch(changedValue(ToFieldStateCE(o)))
              }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='tindak_lanjut__administrasi__jenis_pasal_id' />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-6 form-group'>
            <div className='mb-10 form-group'>
              <label className='required form-label'>Status Reklame</label>
              <Field
                name='tindak_lanjut__administrasi__jenis_pasal_selection'
                target='tindak_lanjut__administrasi__jenis_pasal_id'
                className='form-control'
                component={SelectField}
                options={listJenisPasal}
                onChange={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='tindak_lanjut__administrasi__jenis_pasal_id' />
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
                name='kegiatan__jumlah_personil'
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
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
                Pemilik Kontruksi
              </label>
              <Field
                type='text'
                name='kegiatan__jumlah_personil'
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
                name='kegiatan__jumlah_personil'
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
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
                Ukuran
              </label>
              <Field
                type='text'
                name='kegiatan__jumlah_personil'
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
          <label className='required form-label'>Dokumentasi</label>
          <div className='col-3'>
            <img src='https://fakeimg.pl/195x100/' alt='' />
            <input type='file' className='form-control' id='formFile' accept='image/*' />
          </div>
          <div className='col-3'>
            <img src='https://fakeimg.pl/195x100/' alt='' />
            <input type='file' className='form-control' id='formFile' accept='image/*' />
          </div>
          <div className='col-3'>
            <img src='https://fakeimg.pl/195x100/' alt='' />
            <input type='file' className='form-control' id='formFile' accept='image/*' />
          </div>
          <div className='col-3'>
            <img src='https://fakeimg.pl/195x100/' alt='' />
            <input type='file' className='form-control' id='formFile' accept='image/*' />
          </div>
        </div>
      </div>
    </div>
  )
}
