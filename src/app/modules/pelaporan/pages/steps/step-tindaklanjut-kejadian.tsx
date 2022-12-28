import React, {ChangeEvent, FC, useState} from 'react'
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
  allValues: any
}

export const StepTindakLanjutKejadian: FC<StepDetailKejadianProps> = ({values}) => {
  const dispatch = useDispatch()
  const dokumentasi = useSelector((s: RootState) => s.pelaporanKejadian.tindak__dokumentasi[0])

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

  const [inputJenisBantuanSatpolPP, setInputJenisBantuanSatpolPP] = useState([
    {kejadian__jenis_bantuan_satpolpp_selection: ''},
  ])
  const addFields = () => {
    let newField = {kejadian__jenis_bantuan_satpolpp_selection: ''}
    setInputJenisBantuanSatpolPP([...inputJenisBantuanSatpolPP, newField])
  }
  const removeFields = (index: number) => {
    let data = [...inputJenisBantuanSatpolPP]
    data.splice(index, 1)
    setInputJenisBantuanSatpolPP(data)
  }

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark mb-10'>Tindak Lanjut</h2>

        {/* Tindak Lanjut Khusus Kekerasan Perempuan dan Anak */}
        {isPendampinganKekerasanPadaPerempuan(values) && (
          <>
            <div className='row'>
              <div className='col-6 mb-10 form-group'>
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
              <div className='col-6 mb-10 form-group'>
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
              <div className='col-6 mb-10 form-group'>
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
              <div className='col-6 mb-10 form-group'>
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
              <div className='col-6 mb-10 form-group'>
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
          <div className='col-6 mb-10 form-group'>
            <label className='required form-label'>Jenis Bantuan Satpol PP</label>
            {inputJenisBantuanSatpolPP.map((input, index) => [
              <div key={index}>
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
                <div className='text-danger mt-2'>
                  <ErrorMessage name='tindak__jenis_bantuan_satpolpp' />
                </div>
                <button
                  type='button'
                  onClick={() => removeFields(index)}
                  className='btn btn-sm btn-danger mb-2'
                >
                  <i className='fa-solid fa-minus'></i>
                </button>
              </div>,
            ])}
          </div>
          <div className='col-6 mt-10'>
            <button type='button' onClick={addFields} className='btn btn-sm btn-primary'>
              <i className='fa-solid fa-plus'></i>
            </button>
          </div>
        </div>

        <div className='row'>
          <div className='col-6 mb-10 form-group'>
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
        </div>

        <div className='row'>
          <div className='col-6 form-group'>
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
              <Field
                type='number'
                min='0'
                name='kejadian__jml_korban_pria'
                className='form-control'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kejadian__jml_korban_pria' />
              </div>
            </div>
          </div>
          <div className='col-3 form-group'>
            <div className='mb-10'>
              <label className='required form-label'>Jumlah Korban Wanita</label>
              <Field
                type='number'
                min='0'
                name='kejadian__jml_korban_wanita'
                className='form-control'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='kejadian__jml_korban_wanita' />
              </div>
            </div>
          </div>
        </div>
        {!isUnjukRasa(values) && !isPendampinganKekerasanPadaPerempuan(values) && (
          <>
            <div className='row mt-2'>
              <div className='col-6 form-group'>
                <div className='mb-10 form-group'>
                  <label className='required form-label'>Korban Material</label>
                  <Field
                    name='kejadian__korban_material_selection'
                    target='tindak__korban_material'
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
                    name='tindak__korban_material'
                    className='form-control'
                    onKeyUp={(o: ChangeEvent<any>) => {
                      dispatch(changedValue(ToFieldStateCE(o)))
                    }}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='tindak__korban_material' />
                  </div>
                </div>
              </div>
            </div>
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
