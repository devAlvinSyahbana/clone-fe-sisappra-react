import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import Select from 'react-select'
import {ErrorMessage, Field, FormikValues} from 'formik'
import {DatePickerField, SelectField, ToFieldStateCE} from '../../components/fields.formikcto'
import {
  changedValue,
  isBanjir,
  isPendampinganKekerasanPadaPerempuan,
  isUnjukRasa,
} from '../../../../redux/slices/pelaporan-kejadian.slice'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../redux/store'
import DragDropImageUploader from '../../components/DragDropImageUploader'

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
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const StepTindakLanjutKejadian: FC<StepDetailKejadianProps> = ({values, setFieldValue}) => {
  const dispatch = useDispatch()
  const dokumentasi = useSelector((s: RootState) => s.pelaporanKejadian.tindak__dokumentasi[0])
  const [valueKJ, setValueKJ] = useState(0)
  const [valueP, setValueP] = useState(0)
  const [valueW, setValueW] = useState(0)
  const [valueM, setValueM] = useState(0)
  const [valueKM, setValueKM] = useState(0)
  const [valueJBS, setValueJBS] = useState(0)
  const [valueJBI, setValueJBI] = useState(0)

  const listSumberInformasi = useSelector(
    (s: RootState) => s.pelaporanKejadian.list_sumber_informasi
  )
  const listJenisKekerasan = useSelector((s: RootState) => s.pelaporanKejadian.list_jenis_kekerasan)
  const listJenisBantuanSatpolPP = useSelector(
    (s: RootState) => s.pelaporanKejadian.list_jenis_bantuan_satpol_pp
  )
  const listJenisBantuanInstansiTerkait = useSelector(
    (s: RootState) => s.pelaporanKejadian.list_jenis_bantuan_instansi_terkait
  )
  const listKorbanJiwa = useSelector((s: RootState) => s.pelaporanKejadian.list_korban_jiwa)
  const listKorbanmaterial = useSelector((s: RootState) => s.pelaporanKejadian.list_korban_material)

  const tindakKorbanJiwaItems = values?.tindak__korban_jiwa
  const tindakKorbanMaterialItems = values?.tindak__korban_material
  const jenisBantuanSatpolItems = values?.tindak__jenis_bantuan_satpolpp
  const jenisBantuanInstansiItems = values?.tindak__jenis_bantuan_instansiterkait

  useEffect(() => {
    dispatch(
      changedValue({
        target: {
          name: 'tindak__korban_jiwa',
          value: tindakKorbanJiwaItems,
        },
      })
    )
    dispatch(
      changedValue({
        target: {
          name: 'tindak__korban_material',
          value: tindakKorbanMaterialItems,
        },
      })
    )
    dispatch(
      changedValue({
        target: {
          name: 'tindak__jenis_bantuan_satpolpp',
          value: jenisBantuanSatpolItems,
        },
      })
    )
    dispatch(
      changedValue({
        target: {
          name: 'tindak__jenis_bantuan_instansiterkait',
          value: jenisBantuanInstansiItems,
        },
      })
    )
  }, [
    tindakKorbanJiwaItems.length,
    tindakKorbanMaterialItems.length,
    jenisBantuanSatpolItems.length,
    jenisBantuanInstansiItems.length,
  ])

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Tindak Lanjut</h2>

        {/* Tindak Lanjut Khusus Kekerasan Perempuan dan Anak */}
        {isPendampinganKekerasanPadaPerempuan(values) && (
          <>
            <div className='row'>
              <div className='col-5 mb-10 form-group'>
                <label className='required form-label'>Sumber Informasi</label>
                <Field
                  name='kejadian__sumber_informasi_selection'
                  target='kejadian__sumber_informasi_id'
                  className='form-control'
                  component={SelectField}
                  options={listSumberInformasi}
                  onChange={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='kejadian__sumber_informasi_id' />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-5 mb-10 form-group'>
                <label className='required form-label'>Jenis Kekerasan</label>
                <Field
                  name='kejadian__jenis_kekerasan_selection'
                  target='kejadian__jenis_kekerasan_id'
                  className='form-control'
                  component={SelectField}
                  options={listJenisKekerasan}
                  onChange={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='kejadian__jenis_kekerasan_id' />
                  <ErrorMessage name='kejadian__jenis_kekerasan_selection' />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Tindak Lanjut Khsusus Pada Unjuk Rasa */}
        {isUnjukRasa(values) && (
          <>
            <div className='row'>
              <div className='col-5 mb-10 form-group'>
                <label className='required form-label'>Jumlah Massa</label>
                <Field
                  type='number'
                  min='0'
                  name='kejadian__jumlah_massa'
                  className='form-control'
                  onKeyUp={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                  placeholder='Masukkan Jumlah Massa'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='kejadian__jumlah_massa' />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-5 mb-10 form-group'>
                <label className='required form-label'>Tuntutan</label>
                <Field
                  type='text'
                  name='kejadian__tuntutan'
                  className='form-control'
                  onKeyUp={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                  placeholder='Masukkan Tuntutan'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='kejadian__tuntutan' />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-5 mb-10 form-group'>
                <label className='required form-label'>Penanggung Jawab Unras</label>
                <Field
                  type='text'
                  name='kejadian__penanggung_jawab_unras'
                  className='form-control'
                  onKeyUp={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                  placeholder='Masukkan Penanggung Jawab Unras'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='kejadian__penanggung_jawab_unras' />
                </div>
              </div>
            </div>
          </>
        )}

        <div className='row'>
          <div className='col-5 mb-10 form-group'>
            <label className='required form-label'>Jenis Bantuan Satpol PP</label>
            <Field
              name='kejadian__jenis_bantuan_satpolpp_selection'
              target='tindak__jenis_bantuan_satpolpp'
              className='form-control'
              component={SelectField}
              options={listJenisBantuanSatpolPP}
              onChange={(o: ChangeEvent<any>) => {
                dispatch(changedValue(ToFieldStateCE(o)))
              }}
            />
          </div>
          <div className='col-1 mt-8'>
            <button
              className='btn btn-secondary fw-bold'
              type='button'
              onClick={(e) => {
                e.preventDefault()
                setFieldValue(
                  `tindak__jenis_bantuan_satpolpp[${jenisBantuanSatpolItems.length}].id`,
                  valueJBS
                )
                setValueJBS(0)
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-plus'
              >
                <line x1={12} y1={5} x2={12} y2={19} />
                <line x1={5} y1={12} x2={19} y2={12} />
              </svg>
            </button>
          </div>
        </div>

        {jenisBantuanSatpolItems.map((d: any, i: any) => (
          <div className='row' key={i}>
            <div className='col-5 mb-10 form-group'>
              <label className='required form-label'>Jenis Bantuan Satpol PP</label>
              <Field
                name='kejadian__jenis_bantuan_satpolpp_selection'
                target={`tindak__jenis_bantuan_satpolpp[${i}]`}
                className='form-control'
                disabled
                component={SelectField}
                options={listJenisBantuanSatpolPP}
                onChange={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='tindak__jenis_bantuan_satpolpp' />
              </div>
            </div>
            <div className='col-1 mt-8'>
              <button
                className='btn btn-danger fw-bold'
                type='button'
                onClick={() => {
                  const updatedItems = [...jenisBantuanSatpolItems]
                  updatedItems.splice(i, 1)
                  setFieldValue('tindak__jenis_bantuan_satpolpp', updatedItems)
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-minus'
                >
                  <line x1={5} y1={12} x2={19} y2={12} />
                </svg>
              </button>
            </div>
          </div>
        ))}

        <div className='row'>
          <div className='col-5 mb-10 form-group'>
            <label className='required form-label'>Jenis Bantuan Instansi Terkait</label>
            <Field
              name='kejadian__jenis_bantuan_instansi_terkait_selection'
              target='tindak__jenis_bantuan_instansiterkait'
              className='form-control'
              component={SelectField}
              options={listJenisBantuanInstansiTerkait}
              onChange={(o: ChangeEvent<any>) => {
                dispatch(changedValue(ToFieldStateCE(o)))
              }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='tindak__jenis_bantuan_instansiterkait' />
            </div>
          </div>
          <div className='col-1 mt-8'>
            <button
              className='btn btn-secondary fw-bold'
              type='button'
              onClick={(e) => {
                e.preventDefault()
                setFieldValue(
                  `tindak__jenis_bantuan_instansiterkait[${jenisBantuanInstansiItems.length}].id`,
                  valueJBI
                )
                setValueJBI(0)
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-plus'
              >
                <line x1={12} y1={5} x2={12} y2={19} />
                <line x1={5} y1={12} x2={19} y2={12} />
              </svg>
            </button>
          </div>
        </div>

        {jenisBantuanInstansiItems.map((d: any, i: any) => (
          <div className='row' key={i}>
            <div className='col-5 mb-10 form-group'>
              <label className='required form-label'>Jenis Bantuan Instansi Terkait</label>
              <Field
                name='kejadian__jenis_bantuan_instansi_terkait_selection'
                target={`tindak__jenis_bantuan_instansiterkait[${i}]`}
                className='form-control'
                component={SelectField}
                options={listJenisBantuanInstansiTerkait}
                onChange={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='tindak__jenis_bantuan_instansiterkait' />
              </div>
            </div>
            <div className='col-1 mt-8'>
              <button
                className='btn btn-danger fw-bold'
                type='button'
                onClick={() => {
                  const updatedItems = [...jenisBantuanInstansiItems]
                  updatedItems.splice(i, 1)
                  setFieldValue('tindak__jenis_bantuan_instansiterkait', updatedItems)
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-minus'
                >
                  <line x1={5} y1={12} x2={19} y2={12} />
                </svg>
              </button>
            </div>
          </div>
        ))}

        <div className='row'>
          <div className='col-5 form-group'>
            <div className='mb-10 form-group'>
              <label className='required form-label'>Korban Jiwa</label>
              <Field
                name='kejadian__korban_jiwa_selection'
                target='tindak__korban_jiwa'
                className='form-control'
                component={SelectField}
                options={listKorbanJiwa}
                onChange={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='tindak__korban_jiwa' />
              </div>
            </div>
          </div>
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label className='required form-label'>Jumlah Korban Pria</label>
              <input
                type='number'
                min='0'
                value={valueP}
                className='form-control'
                onFocus={(e: any) => e.target.select()}
                onChange={(e) => setValueP(Number(e.target.value))}
              />
            </div>
          </div>
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label className='required form-label'>Jumlah Korban Wanita</label>
              <input
                type='number'
                min='0'
                value={valueW}
                className='form-control'
                onFocus={(e: any) => e.target.select()}
                onChange={(e) => setValueW(Number(e.target.value))}
              />
            </div>
          </div>
          <div className='col-1 mt-8'>
            <button
              className='btn btn-secondary fw-bold'
              type='button'
              onClick={(e) => {
                e.preventDefault()
                setFieldValue(`tindak__korban_jiwa[${tindakKorbanJiwaItems.length}].id`, valueKJ)
                setFieldValue(`tindak__korban_jiwa[${tindakKorbanJiwaItems.length}].pria`, valueP)
                setFieldValue(`tindak__korban_jiwa[${tindakKorbanJiwaItems.length}].wanita`, valueW)
                setValueKJ(0)
                setValueP(0)
                setValueW(0)
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-plus'
              >
                <line x1={12} y1={5} x2={12} y2={19} />
                <line x1={5} y1={12} x2={19} y2={12} />
              </svg>
            </button>
          </div>
          <div className='text-danger mt-2'>
            <ErrorMessage name='tindak__korban_jiwa' />
          </div>
        </div>
        {tindakKorbanJiwaItems.map((d: any, i: any) => (
          <div className='row' key={i}>
            <div className='col-5 form-group'>
              <div className='mb-10 form-group'>
                <label className='required form-label'>Korban Jiwa</label>
                <Field
                  name={`kejadian__korban_jiwa_selection[${i}].id`}
                  target='tindak__korban_jiwa'
                  className='form-control'
                  disabled
                  component={SelectField}
                  options={listKorbanJiwa}
                  onChange={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
              </div>
            </div>
            <div className='col-3 form-group'>
              <div className='mb-10'>
                <label className='required form-label'>Jumlah Korban Pria</label>
                <Field
                  type='number'
                  min='0'
                  name={`tindak__korban_jiwa[${i}].pria`}
                  className='form-control'
                  onFocus={(e: any) => e.target.select()}
                  onInput={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
              </div>
            </div>
            <div className='col-3 form-group'>
              <div className='mb-10'>
                <label className='required form-label'>Jumlah Korban Wanita</label>
                <Field
                  type='number'
                  min='0'
                  name={`tindak__korban_jiwa[${i}].wanita`}
                  className='form-control'
                  onInput={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
              </div>
            </div>
            <div className='col-1 mt-8'>
              <button
                className='btn btn-danger fw-bold'
                type='button'
                onClick={() => {
                  const updatedItems = [...tindakKorbanJiwaItems]
                  updatedItems.splice(i, 1)
                  setFieldValue('tindak__korban_jiwa', updatedItems)
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-minus'
                >
                  <line x1={5} y1={12} x2={19} y2={12} />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {!isUnjukRasa(values) && !isPendampinganKekerasanPadaPerempuan(values) && (
          <>
            <div className='row mt-2'>
              <div className='col-5 form-group'>
                <div className='mb-10 form-group'>
                  <label className='required form-label'>Korban Material</label>
                  <Field
                    type='number'
                    name='kejadian__korban_material_selection'
                    target='tindak__korban_material'
                    min='0'
                    className='form-control'
                    component={SelectField}
                    options={listKorbanmaterial}
                    onChange={(o: ChangeEvent<any>) => {
                      dispatch(changedValue(ToFieldStateCE(o)))
                    }}
                  />
                </div>
              </div>
              <div className='col-3 form-group'>
                <div className='mb-10'>
                  <label className='required form-label'>Jumlah Korban Material</label>
                  <input
                    type='number'
                    min='0'
                    value={valueKM}
                    className='form-control'
                    onFocus={(e: any) => e.target.select()}
                    onChange={(e) => setValueKM(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className='col-1 mt-8'>
                <button
                  className='btn btn-secondary fw-bold'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault()
                    setFieldValue(
                      `tindak__korban_material[${tindakKorbanMaterialItems.length}].id`,
                      valueM
                    )
                    setFieldValue(
                      `tindak__korban_material[${tindakKorbanMaterialItems.length}].jml`,
                      valueKM
                    )
                    setValueM(0)
                    setValueKM(0)
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='feather feather-plus'
                  >
                    <line x1={12} y1={5} x2={12} y2={19} />
                    <line x1={5} y1={12} x2={19} y2={12} />
                  </svg>
                </button>
              </div>
              <div className='text-danger mt-2'>
                <ErrorMessage name='tindak__korban_material' />
              </div>
            </div>

            {tindakKorbanMaterialItems.map((d: any, i: any) => (
              <div className='row mt-2' key={i}>
                <div className='col-5 form-group'>
                  <div className='mb-10 form-group'>
                    <label className='required form-label'>Korban Material</label>
                    <Field
                      type='number'
                      name={`kejadian__korban_material_selection[${i}].id`}
                      target='tindak__korban_material'
                      min='0'
                      disabled
                      className='form-control'
                      component={SelectField}
                      options={listKorbanmaterial}
                      onChange={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak__korban_material' />
                    </div>
                  </div>
                </div>
                <div className='col-3 form-group'>
                  <div className='mb-10'>
                    <label htmlFor='kegiatan__jumlah_personil' className='required form-label'>
                      Jumlah Korban Material
                    </label>
                    <Field
                      type='number'
                      min='0'
                      name={`tindak__korban_material[${i}].jml`}
                      className='form-control'
                      onFocus={(e: any) => e.target.select()}
                      onInput={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak__korban_material' />
                    </div>
                  </div>
                </div>
                <div className='col-1 mt-8'>
                  <button
                    className='btn btn-danger fw-bold'
                    type='button'
                    onClick={() => {
                      const updatedItems = [...tindakKorbanMaterialItems]
                      updatedItems.splice(i, 1)
                      setFieldValue('tindak__korban_material', updatedItems)
                    }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={24}
                      height={24}
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='feather feather-minus'
                    >
                      <line x1={5} y1={12} x2={19} y2={12} />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        <div className='row mt-2'>
          <label className='required form-label'>Dokumentasi</label>
          <div className='col'>
            <DragDropImageUploader
              maxFile={4}
              path='kejadian'
              slice={dokumentasi}
              change={(e: any) => {
                dispatch(
                  changedValue({
                    target: {
                      name: 'tindak__dokumentasi',
                      value: e,
                    },
                  })
                )
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
