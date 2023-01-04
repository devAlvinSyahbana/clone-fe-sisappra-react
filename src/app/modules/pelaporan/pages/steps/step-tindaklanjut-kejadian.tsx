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
import {number} from 'yup'

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
  detailState: boolean
}

export const StepTindakLanjutKejadian: FC<StepDetailKejadianProps> = ({
  values,
  setFieldValue,
  detailState,
}) => {
  const dispatch = useDispatch()
  const dokumentasi = useSelector((s: RootState) => s.pelaporanKejadian.tindak__dokumentasi[0])
  const [valueKJ, setValueKJ] = useState<any>()
  const [valueP, setValueP] = useState(0)
  const [valueW, setValueW] = useState(0)
  const [valueM, setValueM] = useState<any>()
  const [valueKM, setValueKM] = useState(0)
  const [valueJBS, setValueJBS] = useState<any>()
  const [valueJBI, setValueJBI] = useState<any>()
  const [valuekjlabel, setvaluekjlabel] = useState('')
  const [valuemlabel, setvaluemlabel] = useState('')

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
  const jenisBantuanSatpolItems = useSelector(
    (s: RootState) => s.pelaporanKejadian.tindak__jenis_bantuan_satpolpp
  )
  const jenisBantuanInstansiItems = useSelector(
    (s: RootState) => s.pelaporanKejadian.tindak__jenis_bantuan_instansiterkait
  )

  const handleChange = (e: any) => {
    let array = []
    if (e.length > 0) {
      for (let index = 0; index < e.length; index++) {
        array.push(Number(e[index].value))
      }
      setValueJBI(array)
      dispatch(
        changedValue({
          target: {
            name: 'tindak__jenis_bantuan_instansiterkait',
            value: array,
          },
        })
      )
    }
  }
  const handleChangeJBS = (e: any) => {
    let array = []
    if (e.length > 0) {
      for (let index = 0; index < e.length; index++) {
        array.push(Number(e[index].value))
      }
      setValueJBS(array)
      dispatch(
        changedValue({
          target: {
            name: 'tindak__jenis_bantuan_satpolpp',
            value: array,
          },
        })
      )
    }
  }

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
                  disabled={detailState}
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
                  disabled={detailState}
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
                  disabled={detailState}
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
                  disabled={detailState}
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
                  disabled={detailState}
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
            <Select
              name='tindak__jenis_bantuan_satpolpp'
              isMulti
              isDisabled={detailState}
              options={listJenisBantuanSatpolPP}
              value={listJenisBantuanSatpolPP.filter((d: any) =>
                jenisBantuanSatpolItems.some((item: any) => item === Number(d.value))
              )}
              className='basic-multi-select'
              onChange={(e) => {
                handleChangeJBS(e)
              }}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-5 mb-10 form-group'>
            <label className='required form-label'>Jenis Bantuan Instansi Terkait</label>
            <Select
              name='tindak__jenis_bantuan_instansiterkait'
              isMulti
              isDisabled={detailState}
              className='basic-multi-select'
              value={listJenisBantuanInstansiTerkait.filter((d: any) =>
                jenisBantuanInstansiItems.some((item: any) => item === Number(d.value))
              )}
              options={listJenisBantuanInstansiTerkait}
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-5 form-group'>
            <div className='mb-10 form-group'>
              <label className='required form-label'>Korban Jiwa</label>
              <Select
                // name='tindak__korban_jiwa'
                defaultValue={valuekjlabel}
                isDisabled={detailState}
                className='basic-single'
                classNamePrefix='select'
                options={listKorbanJiwa.filter(
                  (d: any) =>
                    !tindakKorbanJiwaItems.some((item: any) => Number(item.id) === Number(d.value))
                )}
                onChange={(e: any) => {
                  setValueKJ(e.value)
                  setvaluekjlabel(e.label)
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
                disabled={detailState}
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
                disabled={detailState}
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
              disabled={!valuekjlabel}
              type='button'
              onClick={(e) => {
                e.preventDefault()
                setFieldValue(`tindak__korban_jiwa[${tindakKorbanJiwaItems.length}].id`, valueKJ)
                setFieldValue(`tindak__korban_jiwa[${tindakKorbanJiwaItems.length}].pria`, valueP)
                setFieldValue(`tindak__korban_jiwa[${tindakKorbanJiwaItems.length}].wanita`, valueW)
                setValueKJ(null)
                setvaluekjlabel('')
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
                  name={`tindak__korban_jiwa[${i}].id`}
                  className='form-control'
                  disabled={detailState}
                  value={
                    listKorbanJiwa?.find(
                      (d: any) => Number(d.value) === Number(tindakKorbanJiwaItems[i].id)
                    )?.label
                  }
                />
              </div>
            </div>
            <div className='col-3 form-group'>
              <div className='mb-10'>
                <label className='required form-label'>Jumlah Korban Pria</label>
                <Field
                  type='number'
                  min='0'
                  disabled={detailState}
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
                  disabled={detailState}
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
                disabled={detailState}
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
                  <Select
                    defaultValue={valuemlabel}
                    className='basic-single'
                    classNamePrefix='select'
                    isDisabled={detailState}
                    options={listKorbanmaterial.filter(
                      (d: any) =>
                        !tindakKorbanMaterialItems.some((item: any) => item.id === d.value)
                    )}
                    onChange={(e: any) => {
                      setValueM(e.value)
                      setvaluemlabel(e.label)
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
                    disabled={detailState}
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
                  disabled={!valuemlabel}
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
                    setValueM(null)
                    setvaluemlabel('')
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
                      name={`tindak__korban_material[${i}].id`}
                      className='form-control'
                      disabled={detailState}
                      value={
                        listKorbanmaterial?.find(
                          (d: any) => Number(d.value) === Number(tindakKorbanMaterialItems[i].id)
                        )?.label
                      }
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
                      disabled={detailState}
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
                    disabled={detailState}
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
              sourceFile={dokumentasi.file_uploadResult}
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
