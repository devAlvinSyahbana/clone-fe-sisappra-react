import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react'
import Select, {OptionProps} from 'react-select'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../redux/store'
import {
  changedValue,
  reset,
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
  ToFieldStateCE,
} from '../../components/fields.formikcto'
import Swal from 'sweetalert2'
import axios from 'axios'
import AsyncSelect from 'react-select/async'
import {ThemeModeComponent} from '../../../../../_metronic/assets/ts/layout'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

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
  allValues: any
  detailState: boolean
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const API_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL
export const StepDetailKejadian: FC<StepDetailKejadianProps> = ({
  handleChange,
  handleBlur,
  handleReset,
  setFieldValue,
  values,
  detailState,
  listMasterKejadianValue,
}) => {
  const dispatch = useDispatch()
  const jenisKejadianList = useSelector((s: RootState) => s.pelaporanKejadian.list_jenis_kejadian)
  const jenisKejadianId = useSelector(
    (s: RootState) => s.pelaporanKejadian.kejadian__jenis_kejadian_id
  )
  const allValues = useSelector((s: RootState) => s.pelaporanKejadian)
  const jenisKejadianSelect = values.kejadian__jenis_kejadian_selection?.label
  const kota = values.kejadian__kota_id
  const kecamatan = values.kejadian__kecamatan_id
  const kotaList = useSelector((s: RootState) => s.pelaporanKejadian.list_kota)
  const kecamatanList = useSelector((s: RootState) => s.pelaporanKejadian.list_kecamatan)
  const kelurahanList = useSelector((s: RootState) => s.pelaporanKejadian.list_kelurahan)

  console.log('kejadian', allValues)
  console.log('kejadian val', values)

  useEffect(() => {
    dispatch(updateKotaList())
    dispatch(updateKecamatanList())
    dispatch(updateKelurahanList())
  }, [jenisKejadianSelect])

  // GET DATA
  interface SelectOptionAutoCom {
    readonly value: string
    readonly label: string
    readonly color: string
    readonly isFixed?: boolean
    readonly isDisabled?: boolean
  }
  
  // GET Kota
  const [valKota, setValKota] = useState({value: null, label: ''})
  const filterKota = async (inputValue: string) => {
    const response = await axios.get(API_URL + `/kota/` + inputValue)
    const json = await response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsKota = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKota(inputValue))
    }, 1000)
  }
  const handleChangeInputKota = (newValue: any) => {
    setValKota((prevstate: any) => ({...prevstate, ...newValue}))
    setIdKota((prevstate) => ({
      ...prevstate,
      id: newValue.value,
    }))
  }
  const [kejadian__kota_id, setIdKota] = useState({id: ''})

  // GET Kecamatan
  const [valKecamatan, setValKecamatan] = useState({value: null, label: ''})
  const filterKecamatan = async (inputValue: string) => {
    const response = await axios.get(
      `${API_URL}/kecamatan?kejadian__kecamatan_id=${parseInt(kejadian__kota_id.id)}${
        inputValue !== '' && `&nama=${inputValue}`
      }`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsKecamatan = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKecamatan(inputValue))
    }, 1000)
  }
  const handleChangeInputKecamatan = (newValue: any) => {
    setValKecamatan((prevstate: any) => ({...prevstate, ...newValue}))
    setIdKecamatan((prevstate) => ({
      ...prevstate,
      id: newValue.value,
    }))
  }
  const [kejadian__kecamatan_id, setIdKecamatan] = useState({id: ''})
  
  // GET Kelurahan
  const [valKelurahan, setValKelurahan] = useState({value: null, label: ''})
  const filterKelurahan = async (inputValue: string) => {
    const response = await axios.get(
      `${API_URL}/kelurahan?kejadian__kelurahan_id=${parseInt(kejadian__kecamatan_id.id)}${
        inputValue !== '' && `&nama=${inputValue}`
      }`
    )
    const json = await response.data.data
    return json.map((i: any) => ({label: i.nama, value: i.id}))
  }
  const loadOptionsKelurahan = (
    inputValue: string,
    callback: (options: SelectOptionAutoCom[]) => void
  ) => {
    setTimeout(async () => {
      callback(await filterKelurahan(inputValue))
    }, 1000)
  }
  const handleChangeInputKelurahan = (newValue: any) => {
    setValKelurahan((prevstate: any) => ({...prevstate, ...newValue}))
  }

  return (
    <div className='w-50'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Kejadian</h2>
        <div className='mb-10'>
          <label className='required form-label'>Jenis Kejadian</label>
          <div className='d-flex'>
            <div className='w-100 me-2'>
              <Field
                name='kejadian__jenis_kejadian_selection'
                target='kejadian__jenis_kejadian_id'
                className='form-control'
                disabled={values.id || jenisKejadianId !== 0}
                component={SelectField}
                options={jenisKejadianList}
                onChange={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
            </div>
            <button
              className={`btn ${
                values.id || jenisKejadianId === 0
                  ? 'btn-secondary'
                  : 'btn-outline-danger btn-outline'
              }  btn-sm`}
              type='reset'
              disabled={values.id || jenisKejadianId === 0}
              onClick={() => {
                Swal.fire({
                  title: 'Apakah anda yakin?',
                  text: 'Anda akan mereset seluruh form yang telah anda isi di halaman ini!',
                  icon: 'warning',
                  showCancelButton: true,
                  cancelButtonText: 'Tidak, kembali',
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Ya, lanjut!',
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleReset?.()
                    dispatch(reset())
                    listMasterKejadianValue()
                    Swal.fire('Silahkan mengisi kembali!')
                  }
                })
              }}
            >
              Reset
            </button>
          </div>

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
            disabled={detailState}
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
                disabled={detailState}
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
                disabled={detailState}
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
            disabled={detailState}
            component={SelectField}
            options={kotaList}
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
              setFieldValue('kecamatan_selection', [])
              setFieldValue('kelurahan_selection', [])
              dispatch(
                changedValue({
                  target: {
                    name: 'kecamatan_selection',
                    value: 0,
                  },
                })
              )
              dispatch(
                changedValue({
                  target: {
                    name: 'kelurahan_selection',
                    value: 0,
                  },
                })
              )
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
            disabled={detailState}
            options={
              kota !== 0
                ? kecamatanList.filter((obj: any) => obj.kodeKota === 'KOBA' + kota)
                : kecamatanList
            }
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
              setFieldValue('kelurahan_selection', [])

              dispatch(
                changedValue({
                  target: {
                    name: 'kelurahan_selection',
                    value: 0,
                  },
                })
              )
            }}
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
            disabled={detailState}
            options={
              kota !== 0
                ? kelurahanList.filter((obj: any) => obj.kodeKecamatan === 'KEC' + kecamatan)
                : kelurahanList
            }
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
            name='kejadian__alamat'
            disabled={detailState}
            className='form-control'
            placeholder='Masukkan Alamat Kejadian'
            onKeyUp={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kejadian__alamat' />
          </div>
        </div>
        <div className='form-group mb-10'>
          <label className='required form-label'>Uraian Kejadian</label>
          <Field
            as='textarea'
            type='text'
            disabled={detailState}
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
            min='0'
            disabled={detailState}
            name='kejadian__jml_personil_satpolpp'
            className='form-control'
            onFocus={(e: any) => e.target.select()}
            onInput={(o: ChangeEvent<any>) => {
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
            min='0'
            disabled={detailState}
            name='kejadian__jml_personil_instansilain'
            className='form-control'
            onFocus={(e: any) => e.target.select()}
            onInput={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='kejadian__jml_personil_instansilain' />
          </div>
        </div>

        {/* Kejadian khusus untuk banjir */}
        {isBanjir(values) && (
          <>
            <div className='mb-10'>
              <label htmlFor='kejadian__ketinggian_air' className='required form-label'>
                Ketinggian Air
              </label>
              <Field
                type='number'
                disabled={detailState}
                min='0'
                name='kejadian__ketinggian_air'
                className='form-control'
                onFocus={(e: any) => e.target.select()}
                onInput={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kejadian__ketinggian_air' />
              </div>
            </div>
            <div className='mb-10'>
              <label htmlFor='kejadian__pengungsi' className='required form-label'>
                Jumlah Pengungsi
              </label>
              <Field
                type='number'
                min='0'
                disabled={detailState}
                name='kejadian__pengungsi'
                className='form-control'
                onFocus={(e: any) => e.target.select()}
                onInput={(o: ChangeEvent<any>) => {
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
                min='0'
                disabled={detailState}
                name='kejadian__pengungsi_kk'
                className='form-control'
                onFocus={(e: any) => e.target.select()}
                onInput={(o: ChangeEvent<any>) => {
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
                disabled={detailState}
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
                disabled={detailState}
                className='form-control'
                placeholder='Masukkan Lokasi Dapur Umum'
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
