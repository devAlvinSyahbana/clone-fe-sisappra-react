import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react'
import Select, {OptionProps} from 'react-select'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../redux/store'
import {
  changedValue,
  isBanjir,
  updateKotaList,
  updateKecamatanList,
  updateKelurahanList,
} from '../../../../redux/slices/pelaporan-kejadian.slice'
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
  listMasterKejadianValue: any
}

export const StepDetailKejadian: FC<StepDetailKejadianProps> = ({
  handleChange,
  values,
  handleBlur,
  handleReset,
  listMasterKejadianValue,
}) => {
  const dispatch = useDispatch()
  const jenisKejadianList = useSelector((s: RootState) => s.pelaporanKejadian.list_jenis_kejadian)
  const kotaList = useSelector((s: RootState) => s.pelaporanKejadian.list_kota)
  const kecamatanList = useSelector((s: RootState) => s.pelaporanKejadian.list_kecamatan)
  const kelurahanList = useSelector((s: RootState) => s.pelaporanKejadian.list_kelurahan)

  useEffect(() => {
    listMasterKejadianValue()
  }, [])

  return (
    <div className='w-50'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Kejadian</h2>
        <div className='mb-10'>
          <label className='required form-label'>Jenis Kejadian</label>
          <Field
            name='kejadian__jenis_kejadian_selection'
            target='kejadian__jenis_kejadian_id'
            className='form-control'
            component={SelectField}
            options={jenisKejadianList}
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kejadian__jenis_kejadian_id' />
            <ErrorMessage name='kejadian__jenis_kejadian_selection' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Tanggal Kejadian</label>
          <Field
            name='kejadian__tanggal'
            className='form-control'
            component={DatePickerField}
            onChange={(o: any) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kejadian__tanggal' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Waktu Kejadian</label>
          <div className='row'>
            <div className='col'>
              <Field
                name='kejadian__waktu_start'
                className='form-control'
                component={TimePickerField}
                onChange={(o: any) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kejadian__waktu_start' />
              </div>
            </div>
            <div className='col'>
              <Field
                name='kejadian__waktu_end'
                className='form-control'
                component={TimePickerField}
                onChange={(o: any) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kejadian__waktu_end' />
              </div>
            </div>
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Kota</label>
          <Field
            name='kota_selection'
            target='kejadian__kota_id'
            className='form-control'
            component={SelectField}
            options={kotaList}
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kejadian__kota_id' />
            <ErrorMessage name='kota_selection' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Kecamatan</label>
          <Field
            name='kecamatan_selection'
            target='kejadian__kecamatan_id'
            className='form-control'
            component={SelectField}
            options={kecamatanList}
            onChange={(o: ChangeEvent<any>) => {}}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kejadian__kecamatan_id' />
            <ErrorMessage name='kecamatan_selection' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Kelurahan</label>
          <Field
            name='kelurahan_selection'
            target='kejadian__kelurahan_id'
            className='form-control'
            component={SelectField}
            options={kelurahanList}
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kejadian__kelurahan_id' />
            <ErrorMessage name='kelurahan_selection' />
          </div>
        </div>
        <div className='mb-10 form-group'>
          <label className='required form-label'>Alamat Lengkap</label>
          <Field
            as='textarea'
            type='text'
            name='kejadian__alamat'
            className='form-control'
            placeholder='Masukkan Alamat Lengkap'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kejadian__alamat' />
          </div>
        </div>
        <div className='mb-10 form-group'>
          <label className='required form-label'>Uraian Kejadian</label>
          <Field
            as='textarea'
            type='text'
            name='kejadian__uraian_kejadian'
            className='form-control'
            placeholder='Masukkan Uraian Kejadian'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kejadian__uraian_kejadian' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Jumlah Personil Satpol PP</label>
          <Field
            type='number'
            name='kejadian__jml_personil_satpolpp'
            className='form-control'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kejadian__jml_personil_satpolpp' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Jumlah Personil Instansi Lain</label>
          <Field
            type='number'
            name='kejadian__jml_personil_instansilain'
            className='form-control'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kejadian__jml_personil_instansilain' />
          </div>
        </div>

        {/* Kejadian khusus untuk banjir */}
        {/* Belum dimasukkan inisialisasi value jenis kejadian berdasarkan banjir*/}
        {isBanjir(values) && (
          <>
            <div className='mb-10'>
              <label className='required form-label'>Ketinggian Air</label>
              <Field
                type='number'
                name='kejadian__ketinggian_air'
                className='form-control'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kejadian__ketinggian_air' />
              </div>
            </div>
            <div className='mb-10'>
              <label className='required form-label'>Jumlah Pengungsi</label>
              <Field
                type='number'
                name='kejadian__pengungsi'
                className='form-control'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kejadian__pengungsi' />
              </div>
            </div>
            <div className='mb-10'>
              <label className='required form-label'>Jumlah Pengungsi Per KK</label>
              <Field
                type='number'
                name='kejadian__pengungsi_kk'
                className='form-control'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kejadian__pengungsi_kk' />
              </div>
            </div>
            <div className='mb-10'>
              <label className='required form-label'>Lokasi Penampungan</label>
              <Field
                type='text'
                name='kejadian__lokasi_penampungan'
                className='form-control'
                placeholder='Masukkan Lokasi Penampungan'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kejadian__lokasi_penampungan' />
              </div>
            </div>
            <div className='mb-10'>
              <label className='required form-label'>Lokasi Dapur Umum</label>
              <Field
                type='text'
                name='kejadian__lokasi_dapur_umum'
                className='form-control'
                placeholder='Masukkan Lokasi Penampungan'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kejadian__lokasi_dapur_umum' />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
