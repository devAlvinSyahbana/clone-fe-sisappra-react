import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react'
import Select, {OptionProps} from 'react-select'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../redux/store'
import {changedValue} from '../../../../redux/slices/pelaporan-tamu-daerah.slice'
import {ErrorMessage, Field, FormikValues} from 'formik'
import {
  DatePickerField,
  SelectField,
  TimePickerField,
  ToFieldStateBNV,
  ToFieldStateCE,
} from '../../components/fields.formikcto'
import axios from 'axios'

interface StepDetailTamuDaeraehProps {
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
  handleReset?: (e?: React.SyntheticEvent<any>) => void
  allValues: any
  detailState: boolean
}

export const StepDetailTamuDaerah: FC<StepDetailTamuDaeraehProps> = ({
  handleChange,
  values,
  handleBlur,
  handleReset,
  allValues,
  detailState,
}) => {
  const dispatch = useDispatch()

  return (
    <div className='w-50'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Tamu Daerah</h2>
        {/* Tanggal Kunjungan */}
        <div className='mb-10'>
          <label className='required form-label'>Tanggal Kunjungan</label>
          <Field
            name='tanggal_kunjungan'
            className='form-control'
            component={DatePickerField}
            onChange={(o: any) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='tanggal_kunjungan' />
          </div>
        </div>
        {/* Waktu Mulai Kunjungan */}
        <div className='mb-10'>
          <label className='required form-label'>Waktu Kunjungan</label>
          <div className='row'>
            <div className='col'>
              <Field
                name='waktu_mulai_kunjungan'
                className='form-control'
                component={TimePickerField}
                onChange={(o: any) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='waktu_mulai_kunjungan' />
              </div>
            </div>
            <div className='col'>
              <Field
                name='waktu_selesai_kunjungan'
                className='form-control'
                component={TimePickerField}
                onChange={(o: any) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='waktu_selesai_kunjungan' />
              </div>
            </div>
          </div>
        </div>
        {/* Asal Instansi */}
        <div className='mb-10'>
          <label className='required form-label'>Asal Instansi</label>
          <Field
            type='text'
            name='asal_instansi'
            className='form-control'
            disabled={detailState}
            placeholder='Masukkan asal instansi'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='asal_instansi' />
          </div>
        </div>
        {/* Jumlah Pengunjung */}
        <div className='mb-10'>
          <label className='required form-label'>Jumlah Pengunjung</label>
          <Field
            type='number'
            min='0'
            name='jml_pengunjung'
            className='form-control'
            disabled={detailState}
            placeholder='Masukkan Jumlah Pengunjung'
            onFocus={(e: any) => e.target.select()}
            onInput={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='jml_pengunjung' />
          </div>
        </div>
        {/* Maksud dan Tujuan */}
        <div className='mb-10'>
          <label className='required form-label'>Maksud dan Tujuan</label>
          <Field
            type='text'
            name='maksud_dan_tujuan'
            className='form-control'
            disabled={detailState}
            placeholder='Masukkan Maksud dan Tujuan'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='maksud_dan_tujuan' />
          </div>
        </div>
        {/* Pejabat Penerima Kunjungan */}
        <div className='mb-10'>
          <label className='required form-label'>Pejabat Penerima Kunjungan</label>
          <Field
            type='text'
            name='pejabat_penerima_kunjungan'
            className='form-control'
            disabled={detailState}
            placeholder='Masukkan Pejabat Penerima Kunjungan'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='pejabat_penerima_kunjungan' />
          </div>
        </div>
        {/* Tempat Kunjungan */}
        <div className='mb-10'>
          <label className='required form-label'>Tempat Kunjungan</label>
          <Field
            type='text'
            name='tempat_kunjungan'
            className='form-control'
            disabled={detailState}
            placeholder='Masukkan Tempat Kunjungan'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='tempat_kunjungan' />
          </div>
        </div>
      </div>
    </div>
  )
}
