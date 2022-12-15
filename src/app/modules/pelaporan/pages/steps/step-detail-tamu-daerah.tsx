import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react'
import Select, {OptionProps} from 'react-select'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../redux/store'
import {
  changedValue,
  isApelRapat,
  isLaporanMasyarakat,
  isPengamanan,
  isTipiring,
  updateJenisPenyelesaianList,
} from '../../../../redux/slices/pelaporan-kegiatan.slice'
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
  values: FormikValues
  handleBlur?: {
    /** Classic React blur handler, keyed by input name */
    (e: React.FocusEvent<any>): void
    /** Preact-like linkState. Will return a handleBlur function. */
    <T = string | any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
  }
  setVal: any
}

export const StepDetailTamuDaerah: FC<StepDetailKegiatanProps> = ({
  handleChange,
  values,
  handleBlur,
  setVal,
}) => {
  const dispatch = useDispatch()
  const jenisKegiatanList = useSelector((s: RootState) => s.pelaporanKegiatan.list_jenis_kegiatan)
  const jenisKegiatanSelect = values.kegiatan__jenis_kegiatan_selection?.label
  const asalLaporanSelect = values.kegiatan__asal_laporan_selection?.label

  useEffect(() => {
    setVal(values)
  }, [dispatch])

  return (
    <div className='w-50'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Tamu Daerah</h2>
        <div className='mb-10'>
          <label className='required form-label'>Tanggal Kunjungan</label>
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
          <label className='required form-label'>Waktu Mulai Kunjungan</label>
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
        <div className='mb-10'>
          <label className='required form-label'>Waktu Selesai Kunjungan</label>
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
        <div className='mb-10'>
          <label className='required form-label'>Asal Instansi</label>
          <Field
            type='text'
            name='null'
            className='form-control'
            placeholder='Masukkan Asal Instansi'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='keterangan' />
          </div>
        </div>
        <div className='mb-10'>
          <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
            Jumlah Pengunjung
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
          <label className='required form-label'>Maksud dan Tujuan</label>
          <Field
            type='text'
            name='null'
            className='form-control'
            placeholder='Masukkan Maksud dan Tujuan'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='keterangan' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Pejabat Penerima Kunjungan</label>
          <Field
            type='text'
            name='null'
            className='form-control'
            placeholder='Masukkan Pejabat Penerima Kunjungan'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='keterangan' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Tempat Kunjungan</label>
          <Field
            type='text'
            name='null'
            className='form-control'
            placeholder='Masukkan Tempat Kunjungan'
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
