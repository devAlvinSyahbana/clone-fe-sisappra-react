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

export const StepDetailPengawasan: FC<StepDetailKegiatanProps> = ({
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
        <h2 className='fw-bolder text-dark mb-10'>Reklame</h2>
        <div className='mb-10'>
          <label className='required form-label'>Tanggal Pengawasan</label>
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
          <label className='required form-label'>Waktu Pengawasan</label>
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
          <label className='required form-label'>Kota</label>
          <Field
            name='kegiatan__jenis_kegiatan_selection'
            target='kegiatan__jenis_kegiatan_id'
            className='form-control'
            component={SelectField}
            options={jenisKegiatanList}
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
              dispatch(updateJenisPenyelesaianList(o.target.value))
              if (!isLaporanMasyarakat(values) || !isPengamanan(values)) {
                values.kegiatan__jenis_pengamanan_selection = null
              }
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kegiatan__jenis_kegiatan_id' />
            <ErrorMessage name='kegiatan__jenis_kegiatan_selection' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Kecamatan</label>
          <Field
            name='kegiatan__jenis_kegiatan_selection'
            target='kegiatan__jenis_kegiatan_id'
            className='form-control'
            component={SelectField}
            options={jenisKegiatanList}
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
              dispatch(updateJenisPenyelesaianList(o.target.value))
              if (!isLaporanMasyarakat(values) || !isPengamanan(values)) {
                values.kegiatan__jenis_pengamanan_selection = null
              }
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kegiatan__jenis_kegiatan_id' />
            <ErrorMessage name='kegiatan__jenis_kegiatan_selection' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Kelurahan</label>
          <Field
            name='kegiatan__jenis_kegiatan_selection'
            target='kegiatan__jenis_kegiatan_id'
            className='form-control'
            component={SelectField}
            options={jenisKegiatanList}
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
              dispatch(updateJenisPenyelesaianList(o.target.value))
              if (!isLaporanMasyarakat(values) || !isPengamanan(values)) {
                values.kegiatan__jenis_pengamanan_selection = null
              }
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kegiatan__jenis_kegiatan_id' />
            <ErrorMessage name='kegiatan__jenis_kegiatan_selection' />
          </div>
        </div>
        <div className='mb-10 form-group'>
          <label className='required form-label'>Alamat Lengkap</label>
          <Field
            as='textarea'
            type='text'
            name='null'
            className='form-control'
            placeholder='Masukkan Alamat Lengkap'
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
