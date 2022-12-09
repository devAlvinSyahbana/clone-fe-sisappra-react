import React, {ChangeEvent, FC, SyntheticEvent, useEffect} from 'react'
import Select, {OptionProps} from 'react-select'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../redux/store'
import {changedValue} from '../../../../redux/slices/pelaporan-kegiatan.slice'
import {ErrorMessage, Field, FormikValues} from 'formik'
import {
  DatePickerField,
  SelectField,
  TimePickerField,
  ToFieldStateBNV,
  ToFieldStateCE,
} from '../../components/fields.formikcto'
import axios from 'axios'

interface StepDetailKegiatanProps {
  handleChange?: {
    /** Classic React change handler, keyed by input name */
    (e: React.ChangeEvent<any>): void
    /** Preact-like linkState. Will return a handleChange function.  */
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void
  }
  // values: FormikValues;
  handleBlur?: {
    /** Classic React blur handler, keyed by input name */
    (e: React.FocusEvent<any>): void
    /** Preact-like linkState. Will return a handleBlur function. */
    <T = string | any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
  }
}

export const StepDetailKegiatan: FC<StepDetailKegiatanProps> = ({
  handleChange,
  //  values,
  handleBlur,
}) => {
  const dispatch = useDispatch()
  const jenisKegiatanList = useSelector((s: RootState) => s.pelaporanKegiatan.list_jenis_kegiatan)
  const jenisKegiatan = useSelector((s: RootState) =>
    Number(s.pelaporanKegiatan.kegiatan__jenis_kegiatan_selection)
  )

  const updateJenisPasalList = (value: any) => {
    axios
      .get(`http://localhost:3001/jenis-perda-perkada?$filter=${value}&$oderby=nama`)
      .then((res) => {
        const data = res.data.data.map((d: any) => ({label: d.judul, value: String(d.id)}))
        dispatch(changedValue(ToFieldStateBNV('list_jenis_pasal', data)))
        // console.log('pasal', res.data.data)
      })
  }

  const updateJenisPenyelesaianList = (value: any) => {
    axios
      .get(`http://localhost:3001/jenis-penyelesaian?$filter=${value}&$oderby=nama`)
      .then((res) => {
        const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
        dispatch(changedValue(ToFieldStateBNV('list_jenis_penyelesaian', data)))
        // console.log('penyelesaian', res.data.data)
      })
  }

  return (
    <div className='w-50'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Kegiatan</h2>
        <div className='mb-10'>
          <label className='required form-label'>Jenis Kegiatan</label>
          <Field
            name='kegiatan__jenis_kegiatan_selection'
            target='kegiatan__jenis_kegiatan_id'
            className='form-control'
            component={SelectField}
            options={jenisKegiatanList}
            onChange={(o: ChangeEvent<any>) => {
              //   console.log(ToFieldStateCE(o).target.value)
              dispatch(changedValue(ToFieldStateCE(o)))
              updateJenisPasalList(ToFieldStateCE(o).target.value)
              updateJenisPenyelesaianList(ToFieldStateCE(o).target.value)
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kegiatan__jenis_kegiatan_id' />
          </div>
        </div>

        {/* slice redux belum ada */}
        {jenisKegiatan === 1 && (
          <div className='mb-10'>
            <label htmlFor='kegiatan__uraian_kegiatan' className='required form-label'>
              Asal Laporan
            </label>
            <Field
              type='number'
              name=''
              className='form-control'
              // onKeyUp={(o: ChangeEvent<any>) => {
              //   dispatch(changedValue(ToFieldStateCE(o)))
              // }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='kegiatan__uraian_kegiatan' />
            </div>
          </div>
        )}
        {/* slice redux belum ada */}
        {jenisKegiatan === 7 && (
          <div className='mb-10'>
            <label htmlFor='kegiatan__uraian_kegiatan' className='required form-label'>
              Jenis Pengamanan
            </label>
            <Field
              type='number'
              name=''
              className='form-control'
              // onKeyUp={(o: ChangeEvent<any>) => {
              //   dispatch(changedValue(ToFieldStateCE(o)))
              // }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='kegiatan__uraian_kegiatan' />
            </div>
          </div>
        )}
        <div className='mb-10'>
          <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
            Jumlah Personil
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
        <div className='mb-10'>
          <label className='required form-label'>Uraian Kegiatan</label>
          <Field
            as='textarea'
            type='text'
            name='kegiatan__uraian_kegiatan'
            className='form-control'
            onKeyUp={(o: any) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kegiatan__uraian_kegiatan' />
          </div>
        </div>
        {jenisKegiatan === 7 && (
          <>
            <div className='mb-10'>
              <label htmlFor='kegiatan__uraian_kegiatan' className='required form-label'>
                Masalah
              </label>
              <Field
                type='number'
                name=''
                className='form-control'
                // onKeyUp={(o: ChangeEvent<any>) => {
                //   dispatch(changedValue(ToFieldStateCE(o)))
                // }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kegiatan__uraian_kegiatan' />
              </div>
            </div>
            <div className='mb-10'>
              <label htmlFor='kegiatan__uraian_kegiatan' className='required form-label'>
                Pemecahan Masalah
              </label>
              <Field
                type='number'
                name=''
                className='form-control'
                // onKeyUp={(o: ChangeEvent<any>) => {
                //   dispatch(changedValue(ToFieldStateCE(o)))
                // }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kegiatan__uraian_kegiatan' />
              </div>
            </div>
            <div className='mb-10'>
              <label htmlFor='kegiatan__uraian_kegiatan' className='required form-label'>
                Instansi Terkait
              </label>
              <Field
                type='number'
                name=''
                className='form-control'
                // onKeyUp={(o: ChangeEvent<any>) => {
                //   dispatch(changedValue(ToFieldStateCE(o)))
                // }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kegiatan__uraian_kegiatan' />
              </div>
            </div>
          </>
        )}
        <div className='mb-10'>
          <label className='required form-label'>Tanggal Kegiatan</label>
          <Field
            name='kegiatan__tanggal'
            className='form-control'
            component={DatePickerField}
            onChange={(o: any) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kegiatan__tanggal' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Waktu Kegiatan</label>
          <div className='row'>
            <div className='col'>
              <Field
                name='kegiatan__jam_start'
                className='form-control'
                component={TimePickerField}
                onChange={(o: any) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kegiatan__jam_start' />
              </div>
            </div>
            <div className='col'>
              <Field
                name='kegiatan__jam_end'
                className='form-control'
                component={TimePickerField}
                onChange={(o: any) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kegiatan__jam_end' />
              </div>
            </div>
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Lokasi Kegiatan</label>
          <Field
            type='text'
            name='kegiatan__lokasi'
            className='form-control'
            onKeyUp={(o: any) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kegiatan__lokasi' />
          </div>
        </div>
      </div>
    </div>
  )
}
