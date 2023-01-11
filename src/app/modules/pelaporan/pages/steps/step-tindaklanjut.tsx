import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import Select from 'react-select'
import {ErrorMessage, Field, FormikValues} from 'formik'
import {DatePickerField, SelectField, ToFieldStateCE} from '../../components/fields.formikcto'
import {
  changedValue,
  isPenertibanBangunan,
  isPenertibanMinol,
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
  detailState: boolean
}

export const StepTindaklanjut: FC<StepTindakLanjutProps> = ({
  values,
  setFieldValue,
  allValues,
  detailState,
}) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [value, setValue] = useState(0)
  const [totalMinol, setTotalMinol] = useState(0)

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
  const listJenisPelanggaranBangunan = useSelector(
    (s: RootState) => s.pelaporanKegiatan.list_jenis_pelanggaran_bangunan
  )
  const jenisPenindakan = useSelector(
    (s: RootState) => s.pelaporanKegiatan.tindak_lanjut__jenis_penindakan_id
  )
  const denda = useSelector((s: RootState) => {
    if (isTipiring(values)) return s.pelaporanKegiatan.tindak_lanjut__denda__pengadilan
    return s.pelaporanKegiatan.tindak_lanjut__denda__non_pengadilan
  })
  const minolItems = values?.tindak_lanjut__jumlah_minol_merk

  // console.log(minolItems.length, name, value)

  useEffect(() => {
    // setItems(minolItems)
    if (minolItems.length > 0) {
      const total = minolItems
        .map((obj: any) => obj.jumlah)
        .reduce((sum: any, current: any) => sum + current)
      setTotalMinol(total)
    }
    dispatch(
      changedValue({
        target: {
          name: 'tindak_lanjut__jumlah_minol_merk',
          value: minolItems,
        },
      })
    )
  }, [minolItems])

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
              disabled={detailState}
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
                  disabled={detailState}
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
                    disabled={detailState}
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
              {!isPenertibanBangunan(values) && (
                <>
                  {isTipiring(values) ? (
                    <div className='mb-10 form-group'>
                      <label className='required form-label'>Tanggal Sidang</label>
                      <Field
                        name='tindak_lanjut__sidang__tanggal'
                        className='form-control'
                        disabled={detailState}
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
                        disabled={detailState}
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

                  {/* Baris: Sidang Tipiring */}
                  {isTipiring(values) ? (
                    <>
                      <div className='mb-10 form-group'>
                        <label className='required form-label'>Jumlah Pelanggar Hadir Sidang</label>
                        <Field
                          type='number'
                          min='0'
                          name='tindak_lanjut__sidang__jumlah_pelanggar_hadir'
                          className='form-control'
                          disabled={detailState}
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
                          disabled={detailState}
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
                          disabled={detailState}
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
                  ) : !isPenertibanMinol(values) ? (
                    <>
                      <div className='mb-10 form-group'>
                        <label className='required form-label'>Jumlah Pelanggar / Penindakan</label>
                        <Field
                          type='number'
                          min='0'
                          name='tindak_lanjut__jumlah_pelanggar'
                          className='form-control'
                          disabled={detailState}
                          onFocus={(e: any) => e.target.select()}
                          onInput={(o: ChangeEvent<any>) => {
                            dispatch(changedValue(ToFieldStateCE(o)))
                          }}
                        />
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='tindak_lanjut__jumlah_pelanggar' />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className='mb-10 form-group'>
                      <label className='form-label'>Volume Minol</label>
                      <div className='input-group'>
                        <input type='number' value={totalMinol} className='form-control' disabled />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>

        {/* Baris: Identitas Nama Usaha dan Denda / dll */}
        <>
          <div className='row mt-5'>
            <div className='col'>
              <h3 className='fw-bolder text-dark'>IDENTITAS NAMA / USAHA</h3>
              {!isPenertibanBangunan(values) ? (
                <>
                  <div className='form-group mb-10'>
                    <label className='required form-label'>Nomor BAP</label>
                    <Field
                      type='text'
                      name='tindak_lanjut__identitas_pelanggar__no_bap'
                      className='form-control'
                      disabled={detailState}
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
                      disabled={detailState}
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
                      disabled={detailState}
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
                      disabled={detailState}
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
                      disabled={detailState}
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
                      disabled={detailState}
                      onKeyUp={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__identitas_pelanggar__alamat' />
                    </div>
                  </div>
                  {!isPenertibanMinol(values) && (
                    <div className='form-group mb-10'>
                      <label className=' form-label'>Jenis Usaha / Tempat</label>
                      <Field
                        name='tindak_lanjut__identitas_pelanggar__jenis_usaha_selection'
                        target='tindak_lanjut__identitas_pelanggar__jenis_usaha_id'
                        className='form-control'
                        disabled={detailState}
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
                  )}
                </>
              ) : (
                <>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Nama Pemilik</label>
                    <Field
                      type='text'
                      name='tindak_lanjut__identitas_pelanggar__nama_pemilik'
                      className='form-control'
                      disabled={detailState}
                      onKeyUp={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__identitas_pelanggar__nama_pemilik' />
                    </div>
                  </div>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>NIK / Paspport</label>
                    <Field
                      type='text'
                      name='tindak_lanjut__identitas_pelanggar__nik'
                      className='form-control'
                      disabled={detailState}
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
                      disabled={detailState}
                      onKeyUp={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__identitas_pelanggar__alamat' />
                    </div>
                  </div>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Luas Bongkaran</label>
                    <div className='input-group'>
                      <Field
                        type='number'
                        min='0'
                        name='tindak_lanjut__identitas_pelanggar__luas_bongkaran'
                        className='form-control'
                        disabled={detailState}
                        onFocus={(e: any) => e.target.select()}
                        onInput={(o: ChangeEvent<any>) => {
                          dispatch(changedValue(ToFieldStateCE(o)))
                        }}
                      />
                      <span className='input-group-text'>M2</span>
                    </div>
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__identitas_pelanggar__luas_bongkaran' />
                    </div>
                  </div>

                  <div className='form-group mb-10'>
                    <label className=' form-label'>Jenis Usaha / Tempat</label>
                    <Field
                      name='tindak_lanjut__identitas_pelanggar__jenis_usaha_selection'
                      target='tindak_lanjut__identitas_pelanggar__jenis_usaha_id'
                      className='form-control'
                      disabled={detailState}
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
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Alamat Usaha / Tempat</label>
                    <Field
                      as='textarea'
                      type='text'
                      name='tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha'
                      className='form-control'
                      disabled={detailState}
                      onKeyUp={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha' />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className='col'>
              {!(isPenertibanBangunan(values) || isPenertibanMinol(values)) && (
                <>
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
                        disabled={detailState}
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
                      disabled={detailState}
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
                      disabled={detailState}
                      onBlur={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                      onChange={(o: ChangeEvent<any>) => {
                        // dispatch(changedValue(ToFieldStateCE(o)))
                        setFieldValue(
                          'tindak_lanjut__denda__nama_bank',
                          o.target.value.toUpperCase()
                        )
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
                      disabled={detailState}
                      onKeyUp={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__denda__no_validasi_bank' />
                    </div>
                  </div>
                </>
              )}
              {isPenertibanBangunan(values) && (
                <>
                  <div className='form-group'>
                    <h3 className='fw-bolder text-dark'>REKOMENDASI CITATA</h3>
                  </div>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Jenis Pelanggaran Bangunan</label>
                    <Field
                      name='tindak_lanjut__rekom_citata__jenis_pelanggaran_selection'
                      target='tindak_lanjut__rekom_citata__jenis_pelanggaran_id'
                      className='form-control'
                      disabled={detailState}
                      component={SelectField}
                      options={listJenisPelanggaranBangunan}
                      onChange={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__rekom_citata__jenis_pelanggaran_id' />
                    </div>
                  </div>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Nomor SP</label>
                    <Field
                      type='text'
                      name='tindak_lanjut__rekom_citata__no_sp'
                      className='form-control'
                      disabled={detailState}
                      onKeyUp={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__rekom_citata__no_sp' />
                    </div>
                  </div>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Tanggal SP</label>
                    <Field
                      name='tindak_lanjut__rekom_citata__tanggal_no_sp'
                      className='form-control'
                      disabled={detailState}
                      component={DatePickerField}
                      onChange={(o: any) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__rekom_citata__tanggal_no_sp' />
                    </div>
                  </div>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Nomor Segel</label>
                    <Field
                      type='text'
                      name='tindak_lanjut__rekom_citata__no_segel'
                      className='form-control'
                      disabled={detailState}
                      onKeyUp={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__rekom_citata__no_segel' />
                    </div>
                  </div>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Tanggal Segel</label>
                    <Field
                      name='tindak_lanjut__rekom_citata__tanggal_segel'
                      className='form-control'
                      disabled={detailState}
                      component={DatePickerField}
                      onChange={(o: any) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__rekom_citata__tanggal_segel' />
                    </div>
                  </div>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Nomor SPB</label>
                    <Field
                      type='text'
                      name='tindak_lanjut__rekom_citata__no_spb'
                      className='form-control'
                      disabled={detailState}
                      onKeyUp={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__rekom_citata__no_spb' />
                    </div>
                  </div>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Tanggal SPB</label>
                    <Field
                      name='tindak_lanjut__rekom_citata__tanggal_spb'
                      className='form-control'
                      disabled={detailState}
                      component={DatePickerField}
                      onChange={(o: any) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__rekom_citata__tanggal_spb' />
                    </div>
                  </div>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Nomor Rekomtek</label>
                    <Field
                      type='text'
                      name='tindak_lanjut__rekom_citata__no_rekomtek'
                      className='form-control'
                      disabled={detailState}
                      onKeyUp={(o: ChangeEvent<any>) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__rekom_citata__no_rekomtek' />
                    </div>
                  </div>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Tanggal Rekomtek</label>
                    <Field
                      name='tindak_lanjut__rekom_citata__tanggal_rekomtek'
                      className='form-control'
                      disabled={detailState}
                      component={DatePickerField}
                      onChange={(o: any) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__rekom_citata__tanggal_rekomtek' />
                    </div>
                  </div>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Tanggal Peninjauan Lapangan</label>
                    <Field
                      name='tindak_lanjut__rekom_citata__tanggal_peninjauan_lapangan'
                      className='form-control'
                      disabled={detailState}
                      component={DatePickerField}
                      onChange={(o: any) => {
                        dispatch(changedValue(ToFieldStateCE(o)))
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='tindak_lanjut__rekom_citata__tanggal_peninjauan_lapangan' />
                    </div>
                  </div>
                </>
              )}
              {isPenertibanMinol(values) && (
                <>
                  <h3 className='fw-bolder text-dark'>Jenis Merk Minol</h3>
                  <div className='form-group mb-10'>
                    <label className=' form-label'>Nama dan jumlah minol</label>
                    <div className='input-group'>
                      <input
                        type='text'
                        value={name}
                        className='form-control w-50 me-4'
                        onChange={(e) => setName(e.target.value)}
                      />
                      <input
                        type='number'
                        min='0'
                        value={value}
                        className='form-control '
                        onFocus={(e: any) => e.target.select()}
                        onChange={(e) => setValue(Number(e.target.value))}
                      />
                      <button
                        className='btn btn-secondary fw-bold'
                        disabled={value === 0 || !name}
                        type='button'
                        onClick={(e) => {
                          e.preventDefault()
                          setFieldValue(
                            `tindak_lanjut__jumlah_minol_merk[${minolItems.length}].merk`,
                            name
                          )
                          setFieldValue(
                            `tindak_lanjut__jumlah_minol_merk[${minolItems.length}].jumlah`,
                            value
                          )
                          setName('')
                          setValue(0)
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
                      <ErrorMessage name='tindak_lanjut__jumlah_minol_merk' />
                    </div>
                  </div>
                  {minolItems.map((d: any, i: any) => (
                    <div className='form-group mb-10' key={i}>
                      <div className='input-group'>
                        <Field
                          type='text'
                          name={`tindak_lanjut__jumlah_minol_merk[${i}].merk`}
                          className='form-control w-50 me-4'
                          disabled
                          onKeyUp={(o: ChangeEvent<any>) => {
                            dispatch(changedValue(ToFieldStateCE(o)))
                          }}
                        />
                        <Field
                          type='number'
                          min='0'
                          name={`tindak_lanjut__jumlah_minol_merk[${i}].jumlah`}
                          className='form-control '
                          onFocus={(e: any) => e.target.select()}
                          onInput={(o: ChangeEvent<any>) => {
                            dispatch(changedValue(ToFieldStateCE(o)))
                          }}
                        />
                        <button
                          className='btn btn-danger fw-bold'
                          type='button'
                          onClick={() => {
                            const updatedItems = [...minolItems]
                            updatedItems.splice(i, 1)
                            setFieldValue('tindak_lanjut__jumlah_minol_merk', updatedItems)
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
            </div>
          </div>
        </>
      </div>
    </div>
  )
}
