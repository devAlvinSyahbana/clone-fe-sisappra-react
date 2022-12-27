import React, {ChangeEvent, FC} from 'react'
import Select from 'react-select'
import {ErrorMessage, Field, FormikValues} from 'formik'
import {DatePickerField, SelectField, ToFieldStateCE} from '../../components/fields.formikcto'
import {
  changedValue,
  isTipiring,
  updateDetailJenisPasalPenyelesaianList,
} from '../../../../redux/slices/pelaporan-kegiatan.slice'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../redux/store'

interface StepTindakLanjutProps {
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
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  allValues: any
}

export const StepTindaklanjut: FC<StepTindakLanjutProps> = ({values, setFieldValue, allValues}) => {
  const dispatch = useDispatch()

  const listJenisPasal = useSelector(
    (s: RootState) => s.pelaporanKegiatan.list_detail_jenis_pasal_kegiatan
  )
  const listJenisPenyelesaian = useSelector(
    (s: RootState) => s.pelaporanKegiatan.list_detail_jenis_pasal_penyelesaian
  )
  const listJenisPenindakan = useSelector(
    (s: RootState) => s.pelaporanKegiatan.list_jenis_penindakan
  )
  const listJenisProsesKhusus = useSelector(
    (s: RootState) => s.pelaporanKegiatan.list_jenis_proses_khusus
  )
  const listJenisUsaha = useSelector((s: RootState) => s.pelaporanKegiatan.list_jenis_usaha)
  const jenisPenindakan = useSelector(
    (s: RootState) => s.pelaporanKegiatan.tindak_lanjut__jenis_penindakan_id
  )
  const denda = useSelector((s: RootState) => {
    if (isTipiring(values)) return s.pelaporanKegiatan.tindak_lanjut__denda__pengadilan
    return s.pelaporanKegiatan.tindak_lanjut__denda__non_pengadilan
  })

  // console.log(pasalSelect)

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h1 className='fw-bolder text-dark mb-10'>Tindak Lanjut</h1>
        <h3 className='fw-bolder text-dark'>ADMINISTRASI</h3>
        <>
          <div className='mb-10 form-group'>
            <label className='required form-label'>Jenis Pasal</label>
            <Field
              name='tindak_lanjut__administrasi__jenis_pasal_selection'
              target='tindak_lanjut__administrasi__jenis_pasal_id'
              className='form-control'
              component={SelectField}
              options={listJenisPasal.length > 0 ? listJenisPasal : ''}
              onChange={(o: ChangeEvent<any>) => {
                const data = [o.target.value, allValues]
                let filterPasal = listJenisPasal.filter((obj: any) => obj.value === o.target.value)
                dispatch(updateDetailJenisPasalPenyelesaianList(data))
                dispatch(changedValue(ToFieldStateCE(o)))
                setFieldValue(
                  'tindak_lanjut__administrasi__jenis_penertiban',
                  filterPasal[0].penertiban
                )
                setFieldValue(
                  'tindak_lanjut__administrasi__jenis_pelanggaran',
                  filterPasal[0].pelanggaran
                )
                setFieldValue('tindak_lanjut__administrasi__perda_perkada', filterPasal[0].perda)
                dispatch(
                  changedValue({
                    target: {
                      name: 'tindak_lanjut__administrasi__jenis_penertiban',
                      value: filterPasal[0].penertiban,
                    },
                  })
                )
                dispatch(
                  changedValue({
                    target: {
                      name: 'tindak_lanjut__administrasi__jenis_pelanggaran',
                      value: filterPasal[0].pelanggaran,
                    },
                  })
                )
                dispatch(
                  changedValue({
                    target: {
                      name: 'tindak_lanjut__administrasi__perda_perkada',
                      value: filterPasal[0].perda,
                    },
                  })
                )
              }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='tindak_lanjut__administrasi__jenis_pasal_id' />
            </div>
          </div>

          <div className='mb-10 form-group'>
            <label className='required form-label'>Jenis Penertiban</label>
            <Field
              as='textarea'
              type='text'
              name='tindak_lanjut__administrasi__jenis_penertiban'
              className='form-control'
              placeholder='Pilih Jenis Pasal di Dropdown diatas'
              disabled
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='tindak_lanjut__administrasi__jenis_penertiban' />
            </div>
          </div>

          <div className='mb-10 form-group'>
            <label className='required form-label'>Jenis Pelanggaran</label>
            <Field
              as='textarea'
              type='text'
              name='tindak_lanjut__administrasi__jenis_pelanggaran'
              className='form-control text-wrap'
              placeholder='Pilih Jenis Pasal di Dropdown diatas'
              disabled
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='tindak_lanjut__administrasi__jenis_pelanggaran' />
            </div>
          </div>

          <div className='mb-10 form-group'>
            <label className='required form-label'>PERDA / PERKADA yang dilanggar</label>
            <Field
              type='text'
              name='tindak_lanjut__administrasi__perda_perkada'
              className='form-control text-wrap'
              placeholder='Pilih Jenis Pasal di Dropdown diatas'
              disabled
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='tindak_lanjut__administrasi__perda_perkada' />
            </div>
          </div>
        </>

        {/* Baris: penyelesaian dan Penindakan */}
        <>
          <div className='row'>
            <div className='col'>
              <div className='mb-10 form-group'>
                <label className='required form-label'>Penyelesaian</label>
                <Field
                  name='tindak_lanjut__administrasi__penyelesaian_selection'
                  target='tindak_lanjut__administrasi__penyelesaian_id'
                  className='form-control'
                  component={SelectField}
                  options={listJenisPenyelesaian.length > 0 ? listJenisPenyelesaian : ''}
                  onChange={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='tindak_lanjut__administrasi__penyelesaian_id' />
                </div>
              </div>
              {isTipiring(values) && (
                <div className='mb-10 form-group'>
                  <label className='required form-label'>Proses Khusus</label>
                  <Field
                    name='tindak_lanjut__administrasi__penyelesaian_khusus_selection'
                    target='tindak_lanjut__administrasi__penyelesaian_khusus_id'
                    className='form-control'
                    component={SelectField}
                    options={listJenisProsesKhusus.length > 0 ? listJenisProsesKhusus : ''}
                    onChange={(o: ChangeEvent<any>) => {
                      dispatch(changedValue(ToFieldStateCE(o)))
                    }}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='tindak_lanjut__administrasi__penyelesaian_khusus_id' />
                  </div>
                </div>
              )}
            </div>

            <div className='col'>
              {isTipiring(values) ? (
                <div className='mb-10 form-group'>
                  <label className='required form-label'>Tanggal Sidang</label>
                  <Field
                    name='tindak_lanjut__sidang__tanggal'
                    className='form-control'
                    component={DatePickerField}
                    onChange={(o: any) => {
                      dispatch(changedValue(ToFieldStateCE(o)))
                    }}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='tindak_lanjut__sidang__tanggal' />
                  </div>
                </div>
              ) : (
                <div className='mb-10 form-group'>
                  <label className='required form-label'>Penindakan</label>
                  <Field
                    name='tindak_lanjut__jenis_penindakan_selection'
                    target='tindak_lanjut__jenis_penindakan_id'
                    className='form-control'
                    component={SelectField}
                    options={listJenisPenindakan}
                    onChange={(o: ChangeEvent<any>) => {
                      dispatch(changedValue(ToFieldStateCE(o)))
                    }}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='tindak_lanjut__jenis_penindakan_id' />
                  </div>
                </div>
              )}

              {isTipiring(values) ? (
                <>
                  <div className='mb-10 form-group'>
                    <label className='required form-label'>Jumlah Pelanggar Hadir Sidang</label>
                    <Field
                      type='number'
                      min='0'
                      name='tindak_lanjut__sidang__jumlah_pelanggar_hadir'
                      className='form-control'
                      onFocus={(e: any) => e.target.select()}
                      onInput={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__sidang__jumlah_pelanggar_hadir' />
                    </div>
                  </div>
                  <div className='mb-10 form-group'>
                    <label className='required form-label'>
                      Jumlah Pelanggar Tidak Hadir Sidang
                    </label>
                    <Field
                      type='number'
                      min='0'
                      name='tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir'
                      className='form-control'
                      onFocus={(e: any) => e.target.select()}
                      onInput={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir' />
                    </div>
                  </div>
                  <div className='mb-10 form-group'>
                    <label className='required form-label'>Jumlah Pelanggar Verstek</label>
                    <Field
                      type='number'
                      min='0'
                      name='tindak_lanjut__sidang__jumlah_pelanggar_verstek'
                      className='form-control'
                      onFocus={(e: any) => e.target.select()}
                      onInput={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__sidang__jumlah_pelanggar_verstek' />
                    </div>
                  </div>
                </>
              ) : (
                <div className='mb-10 form-group'>
                  <label className='required form-label'>Jumlah Pelanggar / Penindakan</label>
                  <Field
                    type='number'
                    min='0'
                    name='tindak_lanjut__jumlah_pelanggar'
                    className='form-control'
                    onFocus={(e: any) => e.target.select()}
                    onInput={(o: ChangeEvent<any>) => {
                      dispatch(changedValue(ToFieldStateCE(o)))
                    }}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='tindak_lanjut__jumlah_pelanggar' />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>

        {/* Baris: Identitas Nama Usaha dan Denda / dll */}
        <>
          <div className='row mt-5'>
            <div className='col'>
              <h3 className='fw-bolder text-dark'>IDENTITAS NAMA / USAHA</h3>
              <div className='form-group mb-10'>
                <label className='required form-label'>Nomor BAP</label>
                <Field
                  type='text'
                  name='tindak_lanjut__identitas_pelanggar__no_bap'
                  className='form-control'
                  onKeyUp={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='tindak_lanjut__identitas_pelanggar__no_bap' />
                </div>
              </div>
              <div className='form-group mb-10'>
                <label className=' form-label'>Nama / Penanggungjawab</label>
                <Field
                  type='text'
                  name='tindak_lanjut__identitas_pelanggar__nama_penanggung_jawab'
                  className='form-control'
                  onKeyUp={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='tindak_lanjut__identitas_pelanggar__nama_penanggung_jawab' />
                </div>
              </div>
              <div className='form-group mb-10'>
                <label className=' form-label'>Nama Usaha / Tempat</label>
                <Field
                  type='text'
                  name='tindak_lanjut__identitas_pelanggar__nama_tempat_usaha'
                  className='form-control'
                  onKeyUp={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='tindak_lanjut__identitas_pelanggar__nama_tempat_usaha' />
                </div>
              </div>
              <div className='form-group mb-10'>
                <label className=' form-label'>Alamat Usaha / Tempat</label>
                <Field
                  as='textarea'
                  type='text'
                  name='tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha'
                  className='form-control'
                  onKeyUp={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha' />
                </div>
              </div>
              <div className='form-group mb-10'>
                <label className=' form-label'>NIK / Paspport</label>
                <Field
                  type='text'
                  name='tindak_lanjut__identitas_pelanggar__nik'
                  className='form-control'
                  onKeyUp={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='tindak_lanjut__identitas_pelanggar__nik' />
                </div>
              </div>
              <div className='form-group mb-10'>
                <label className=' form-label'>Alamat Pelanggar</label>
                <Field
                  as='textarea'
                  type='text'
                  name='tindak_lanjut__identitas_pelanggar__alamat'
                  className='form-control'
                  onKeyUp={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='tindak_lanjut__identitas_pelanggar__alamat' />
                </div>
              </div>
              <div className='form-group mb-10'>
                <label className=' form-label'>Jenis Usaha / Tempat</label>
                <Field
                  name='tindak_lanjut__identitas_pelanggar__jenis_usaha_selection'
                  target='tindak_lanjut__identitas_pelanggar__jenis_usaha_id'
                  className='form-control'
                  component={SelectField}
                  options={listJenisUsaha}
                  onChange={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='tindak_lanjut__identitas_pelanggar__jenis_usaha_id' />
                </div>
              </div>
            </div>

            <div className='col'>
              <div className='form-group'>
                <h3 className='fw-bolder text-dark'>JUMLAH DENDA</h3>
              </div>

              <div className='form-group mb-10'>
                <label className='form-label'>
                  {isTipiring(values) || jenisPenindakan === 1
                    ? 'Denda Pengadilan'
                    : 'Denda Non Pengadilan'}
                </label>
                <div className='input-group'>
                  <span className='input-group-text w-50'>
                    {denda.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}
                  </span>
                  <Field
                    type='number'
                    name={
                      isTipiring(values) || jenisPenindakan === 1
                        ? 'tindak_lanjut__denda__pengadilan'
                        : 'tindak_lanjut__denda__non_pengadilan'
                    }
                    className='form-control w-50'
                    step='500'
                    onFocus={(e: any) => e.target.select()}
                    onInput={(o: ChangeEvent<any>) => {
                      dispatch(changedValue(ToFieldStateCE(o)))
                    }}
                  />
                </div>
                <div className='text-danger mt-2'>
                  <ErrorMessage
                    name={
                      isTipiring(values) || jenisPenindakan === 1
                        ? 'tindak_lanjut__denda__pengadilan'
                        : 'tindak_lanjut__denda__non_pengadilan'
                    }
                  />
                </div>
              </div>

              <div className='form-group mb-10'>
                <label className=' form-label'>Tanggal Setor</label>
                <Field
                  name='tindak_lanjut__denda__tanggal_setor'
                  className='form-control'
                  component={DatePickerField}
                  onChange={(o: any) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='tindak_lanjut__denda__tanggal_setor' />
                </div>
              </div>

              <div className='form-group mb-10'>
                <label className=' form-label'>Nama Bank</label>
                <Field
                  type='text'
                  name='tindak_lanjut__denda__nama_bank'
                  className='form-control'
                  onBlur={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                  onChange={(o: ChangeEvent<any>) => {
                    // dispatch(changedValue(ToFieldStateCE(o)))
                    setFieldValue('tindak_lanjut__denda__nama_bank', o.target.value.toUpperCase())
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='tindak_lanjut__denda__nama_bank' />
                </div>
              </div>

              <div className='form-group mb-10'>
                <label className=' form-label'>No Validasi Bank</label>
                <Field
                  type='text'
                  name='tindak_lanjut__denda__no_validasi_bank'
                  className='form-control'
                  onKeyUp={(o: ChangeEvent<any>) => {
                    dispatch(changedValue(ToFieldStateCE(o)))
                  }}
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='tindak_lanjut__denda__no_validasi_bank' />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}
