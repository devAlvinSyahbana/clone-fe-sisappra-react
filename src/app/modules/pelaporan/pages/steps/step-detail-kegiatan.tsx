import React, {ChangeEvent, FC, useEffect} from 'react'
import Select, {OptionProps} from 'react-select'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../redux/store'
import {
  changedValue,
  reset,
  isLaporanMasyarakat,
  isPengamanan,
  updateJenisKegiatanList,
  updateDetailJenisPasalList,
  updateDetailJenisPasalKegiatanList,
  updateJenisAsalLaporanList,
  updateJenisPengamananList,
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
  handleReset?: (e?: React.SyntheticEvent<any>) => void
  listMasterJenisValue: any
}

export const StepDetailKegiatan: FC<StepDetailKegiatanProps> = ({
  handleChange,
  handleBlur,
  handleReset,
  values,
  listMasterJenisValue,
}) => {
  const dispatch = useDispatch()
  const jenisKegiatanList = useSelector((s: RootState) => s.pelaporanKegiatan.list_jenis_kegiatan)
  const allValues = useSelector((s: RootState) => s.pelaporanKegiatan)
  const jenisKegiatanSelect = values.kegiatan__jenis_kegiatan_selection?.label
  const asalLaporan = useSelector((s: RootState) => s.pelaporanKegiatan.list_jenis_asal_laporan)
  const jenisPengamanan = useSelector((s: RootState) => s.pelaporanKegiatan.list_jenis_pengamanan)

  useEffect(() => {
    listMasterJenisValue()
  }, [])

  useEffect(() => {
    if (isLaporanMasyarakat(values)) dispatch(updateJenisAsalLaporanList())
    if (isPengamanan(values)) dispatch(updateJenisPengamananList())
  }, [jenisKegiatanSelect])

  console.log(values)
  console.log(allValues)

  return (
    <div className='w-50'>
      <div className='pb-10 pb-lg-15'>
        <h1 className='fw-bolder text-dark mb-10'>Kegiatan</h1>
        <button
          type='button'
          onClick={() => {
            handleReset?.()
            dispatch(reset())
            listMasterJenisValue()
          }}
        >
          Hapus
        </button>
        <div className='mb-10'>
          <label className='required form-label'>Jenis Kegiatan</label>
          <Field
            name='kegiatan__jenis_kegiatan_selection'
            target='kegiatan__jenis_kegiatan_id'
            className='form-control'
            component={SelectField}
            options={jenisKegiatanList}
            onChange={(o: ChangeEvent<any>) => {
              const data = [o, allValues]
              dispatch(updateDetailJenisPasalKegiatanList(data))
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kegiatan__jenis_kegiatan_id' />
            <ErrorMessage name='kegiatan__jenis_kegiatan_selection' />
          </div>
        </div>
      </div>
      {/* Asal Laporan / Jenis Pengamanan */}
      {(isLaporanMasyarakat(values) || isPengamanan(values)) && (
        <div className='mb-10'>
          <label className='required form-label'>
            {isLaporanMasyarakat(values) ? 'Asal Laporan' : 'Jenis Pengamanan'}
          </label>
          <Field
            name={
              isLaporanMasyarakat(values)
                ? 'kegiatan__asal_laporan_selection'
                : 'kegiatan__jenis_pengamanan_selection'
            }
            target={
              isLaporanMasyarakat(values)
                ? 'kegiatan__asal_laporan_id'
                : 'kegiatan__jenis_pengamanan_id'
            }
            className='form-control'
            component={SelectField}
            options={isLaporanMasyarakat(values) ? asalLaporan : jenisPengamanan}
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            {isLaporanMasyarakat(values) && (
              <>
                <ErrorMessage name='kegiatan__asal_laporan_id' />
                <ErrorMessage name='kegiatan__asal_laporan_selection' />
              </>
            )}
          </div>
        </div>
      )}
      {/* Jumlah Personil */}
      <div className='mb-10'>
        <label className='required form-label'>Jumlah Personil</label>
        <Field
          type='number'
          min='0'
          name='kegiatan__jumlah_personil'
          className='form-control'
          onFocus={(e: any) => e.target.select()}
          onInput={(o: ChangeEvent<any>) => {
            dispatch(changedValue(ToFieldStateCE(o)))
          }}
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='kegiatan__jumlah_personil' />
        </div>
      </div>
      {/* Uraian Kegiatan */}
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
      {/* Pengamanan: masalah, pemecahan masalah, instansi terkait */}
      {isPengamanan(values) && (
        <>
          <div className='mb-10'>
            <label htmlFor='kegiatan__pengamanan_masalah' className='required form-label'>
              Masalah
            </label>
            <Field
              type='text'
              name='kegiatan__pengamanan_masalah'
              className='form-control'
              onKeyUp={(o: ChangeEvent<any>) => {
                dispatch(changedValue(ToFieldStateCE(o)))
              }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='kegiatan__pengamanan_masalah' />
            </div>
          </div>
          <div className='mb-10'>
            <label htmlFor='kegiatan__pengamanan_pemecahan_masalah' className='required form-label'>
              Pemecahan Masalah
            </label>
            <Field
              as='textarea'
              type='text'
              name='kegiatan__pengamanan_pemecahan_masalah'
              className='form-control'
              onKeyUp={(o: ChangeEvent<any>) => {
                dispatch(changedValue(ToFieldStateCE(o)))
              }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='kegiatan__pengamanan_pemecahan_masalah' />
            </div>
          </div>
          <div className='mb-10'>
            <label htmlFor='kegiatan__pengamanan_instansi_terkait' className='required form-label'>
              Instansi Terkait
            </label>
            <Field
              type='text'
              name='kegiatan__pengamanan_instansi_terkait'
              className='form-control'
              onKeyUp={(o: ChangeEvent<any>) => {
                dispatch(changedValue(ToFieldStateCE(o)))
              }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='kegiatan__pengamanan_instansi_terkait' />
            </div>
          </div>
        </>
      )}
      {/* Tanggal Kegiatan */}
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
      {/* Waktu Kegiatan */}
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
      {/* Lokasi Kegiatan */}
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
  )
}
