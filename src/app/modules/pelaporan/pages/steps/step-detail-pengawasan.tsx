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
import AsyncSelect from 'react-select/async'

interface StepDetailPengawasanProps {
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
  allValues: any
  detailState: boolean
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const API_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL
export const StepDetailPengawasan: FC<StepDetailPengawasanProps> = ({
  handleChange,
  handleBlur,
  handleReset,
  setFieldValue,
  values,
  detailState,
  listMasterPengawasanValue,
}) => {
  const dispatch = useDispatch()
  // const jenisPengawasanList = useSelector((s: RootState) => s.pelaporanPengawasan.list_jenis_pengawasan)
  // const jenisPengawasanId = useSelector(
  //   (s: RootState) => s.pelaporanPengawasan.filter_kota
  // )
  const allValues = useSelector((s: RootState) => s.pelaporanPengawasan)
  const kota = values.filter_kota
  const kecamatan = values.filter_kecamatan
  const kotaList = useSelector((s: RootState) => s.pelaporanPengawasan.list_kota)
  const kecamatanList = useSelector((s: RootState) => s.pelaporanPengawasan.list_kecamatan)
  const kelurahanList = useSelector((s: RootState) => s.pelaporanPengawasan.list_kelurahan)

  console.log('pengawasan', allValues)
  console.log('pengawasan val', values)

  useEffect(() => {
    dispatch(updateKotaList())
    dispatch(updateKecamatanList())
    dispatch(updateKelurahanList())
    listMasterPengawasanValue()
  }, [])
  // console.log(values)

    // GET DATA
    interface SelectOptionAutoCom {
      readonly value: string
      readonly label: string
      readonly color: string
      readonly isFixed?: boolean
      readonly isDisabled?: boolean
    }

    // GET Kota
    const [valMasterKota, setValMasterKota] = useState({value: null, label: ''})
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
      setValMasterKota((prevstate: any) => ({...prevstate, ...newValue}))
      setIdKota((prevstate) => ({
        ...prevstate,
        id: newValue.value,
      }))
    }
    const [filter_kota, setIdKota] = useState({id: ''})

    // GET Kecamatan
    const [valKecamatan, setValKecamatan] = useState({value: null, label: ''})
    const filterKecamatan = async (inputValue: string) => {
      const response = await axios.get(
        `${API_URL}/kecamatan?kecamatan=${parseInt(filter_kota.id)}${
          inputValue !== '' && `&nama=${inputValue}`
        }`
      )
      const json = await response.data.data
      return json.map((i: any) => ({label: i.nama, value: i.id}))
    }
    const loadOptionsKecamatan = (
      inputValue: string,
      callback: (otions: SelectOptionAutoCom[]) => void
    ) => {
      setTimeout(async () => {
        callback(await filterKecamatan(inputValue))
      }, 1000)
    }
    const handleChangeInputKecamatan = (newValue: any) => {
      setValKecamatan((prevstate: any) => ({...prevstate, ...newValue}))
      setIdKecamatan((prevstate) => ({
        ...prevstate,
        id: newValue.value
      })) 
    }
    const [filter_kecamatan, setIdKecamatan] = useState({id: ''})

    // GET Kecamatan
    const [valKelurahan, setValKelurahan] = useState({value: null, label: ''})
    const filterKelurahan = async (inputValue: string) => {
      const response = await axios.get(
        `${API_URL}/kelurahan?kelurahan=${parseInt(filter_kecamatan.id)}${
          inputValue !== '' && `&nama=${inputValue}`
        }`
      )
      const json = await response.data.data
      return json.map((i: any) => ({label: i.nama, value: i.id}))
    }
    const loadOptionsKelurahan = (
      inputValue: string,
      callback: (otions: SelectOptionAutoCom[]) => void
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
        <h2 className='fw-bolder text-dark mb-10'>Reklame</h2>
        <div className='mb-10'>
          <label className='required form-label'>Tanggal Pengawasan</label>
          <Field
            name='tgl_pengecekan'
            className='form-control'
            disabled={detailState}
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
                disabled={detailState}
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
            name='filter_kota_selection'
            target='filter_kota'
            className='form-control'
            disabled={detailState}
            component={SelectField}
            options={kotaList}
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
              setFieldValue('filter_kecamatan_selection', [])
              setFieldValue('filter_kelurahan_selection', [])
              dispatch(
                changedValue({
                  target: {
                    name: 'filter_kecamatan_selection',
                    value: 0,
                  },
                })
              )
              dispatch(
                changedValue({
                  target: {
                    name: 'filter_kelurahan_selection',
                    value: 0,
                  },
                })
              )
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='filter_kota' />
            <ErrorMessage name='filter_kota_selection' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Kecamatan</label>
          <Field
            name='filter_kecamatan_selection'
            target='filter_kecamatan'
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
              setFieldValue('filter_kelurahan_selection', [])

              dispatch(
                changedValue({
                  target: {
                    name: 'filter_kelurahan_selection',
                    value: 0,
                  },
                })
              )
            }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='filter_kecamatan' />
            <ErrorMessage name='filter_kecamatan_selection' />
          </div>
        </div>
        <div className='mb-10'>
          <label className='required form-label'>Kelurahan</label>
          <Field
            name='filter_kelurahan_selection'
            target='filter_kelurahan'
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
            <ErrorMessage name='filter_kelurahan' />
            <ErrorMessage name='filter_kelurahan_selection' />
          </div>
        </div>
        <div className='mb-10 form-group'>
          <label className='required form-label'>Alamat Lengkap</label>
          <Field
            as='textarea'
            type='text'
            name='alamat'
            className='form-control'
            disabled={detailState}
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
