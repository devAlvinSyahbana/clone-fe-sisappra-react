import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react'
import Select, {OptionProps} from 'react-select'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../redux/store'
import {
  changedValue,
  reset,
  updateKotaList,
  updateKecamatanList,
  updateKelurahanList,
} from '../../../../redux/slices/pelaporan-pengawasan-reklame.slice'
import {ErrorMessage, Field, FormikValues} from 'formik'
import {
  DatePickerField,
  SelectField,
  TimePickerField,
  ToFieldStateBNV,
  ToFieldStateCE,
} from '../../components/fields.formikcto'
import axios from 'axios'

interface StepDetailKejadianProps {
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
  listMasterPengawasanValue: any
}

export const StepDetailPengawasan: FC<StepDetailKejadianProps> = ({
  handleChange,
  values,
  handleBlur,
  handleReset,
  listMasterPengawasanValue,
}) => {
  const dispatch = useDispatch()
  const kotaList = useSelector((s: RootState) => s.pelaporanPengawasan.list_kota)
  const kecamatanList = useSelector((s: RootState) => s.pelaporanPengawasan.list_kecamatan)
  const kelurahanList = useSelector((s: RootState) => s.pelaporanPengawasan.list_kelurahan)

  useEffect(() => {
    listMasterPengawasanValue()
  }, [])
  console.log(values)
  return (
    <div className='w-50'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Reklame</h2>
        <button
          type='button'
          onClick={() => {
            handleReset?.()
            dispatch(reset())
          }}
        >
          Hapus
        </button>
        <div className='mb-10'>
          <label className='required form-label'>Tanggal Pengawasan</label>
          <Field
            name='tgl_pengecekan'
            className='form-control'
            component={DatePickerField}
            onChange={(o: any) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='tgl_pengecekan' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Waktu Pengawasan</label>
          <div className='row'>
            <div className='col'>
              <Field
                name='waktu_pengawasan'
                className='form-control'
                component={TimePickerField}
                onChange={(o: any) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='waktu_pengawasan' />
              </div>
            </div>
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Kota</label>
          <Field
            name='kota_selection'
            target='kota'
            className='form-control'
            component={SelectField}
            options={kotaList}
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kota' />
            <ErrorMessage name='kota_selection' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Kecamatan</label>
          <Field
            name='kecamatan_selection'
            target='kecamatan'
            className='form-control'
            component={SelectField}
            options={kecamatanList}
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kecamatan' />
            <ErrorMessage name='kecamatan_selection' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Kelurahan</label>
          <Field
            name='kelurahan_selection'
            target='kelurahan'
            className='form-control'
            component={SelectField}
            options={kelurahanList}
            onChange={(o: ChangeEvent<any>) => {
              console.log(o)
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kelurahan' />
            <ErrorMessage name='kelurahan_selection' />
          </div>
        </div>
        <div className='mb-10 form-group'>
          <label className='required form-label'>Alamat Lengkap</label>
          <Field
            as='textarea'
            type='text'
            name='alamat'
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
