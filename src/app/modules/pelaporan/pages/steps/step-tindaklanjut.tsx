import React, {ChangeEvent, FC} from 'react'
import Select from 'react-select'
import {ErrorMessage, Field, FormikValues} from 'formik'
import {DatePickerField, SelectField, ToFieldStateCE} from '../../components/fields.formikcto'
import {changedValue} from '../../../../redux/slices/pelaporan-kegiatan.slice'
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
}

export const StepTindaklanjut: FC<StepTindakLanjutProps> = ({values, setFieldValue}) => {
  const dispatch = useDispatch()

  const listJenisPasal = useSelector(
    (s: RootState) => s.pelaporanKegiatan.list_detail_jenis_pasal_kegiatan
  )
  const listJenisPenindakan = useSelector(
    (s: RootState) => s.pelaporanKegiatan.list_jenis_penindakan
  )
  const listJenisPenyelesaian = useSelector(
    (s: RootState) => s.pelaporanKegiatan.list_jenis_penyelesaian
  )
  const listJenisUsaha = useSelector((s: RootState) => s.pelaporanKegiatan.list_jenis_usaha)

  // console.log(pasalSelect)

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h1 className='fw-bolder text-dark mb-10'>Tindak Lanjut</h1>

        <h3 className='fw-bolder text-dark'>ADMINISTRASI</h3>

        <div className='mb-10 form-group'>
          <label className='required form-label'>Jenis Pasal</label>
          <Field
            name='tindak_lanjut__administrasi__jenis_pasal_selection'
            target='tindak_lanjut__administrasi__jenis_pasal_id'
            className='form-control'
            component={SelectField}
            options={listJenisPasal}
            onChange={(o: ChangeEvent<any>) => {
              dispatch(changedValue(ToFieldStateCE(o)))
              let filterPasal = listJenisPasal.filter((obj: any) => obj.value === o.target.value)
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
            type='text'
            name='tindak_lanjut__administrasi__jenis_penertiban'
            className='form-control'
            placeholder='Pilih Jenis Pasal di Dropdown diatas'
            // value={pasalSelect?.penertiban ? pasalSelect?.penertiban : ''}
            // onChange={(o: ChangeEvent<any>) => {
            //   console.log(o.target.value)
            //   setFieldValue('tindak_lanjut__administrasi__jenis_penertiban', o.target.value)
            //   dispatch(changedValue(ToFieldStateCE(o)))
            // }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='tindak_lanjut__administrasi__jenis_penertiban' />
          </div>
        </div>

        <div className='mb-10 form-group'>
          <label className='required form-label'>Jenis Pelanggaran</label>
          <Field
            type='text'
            name='tindak_lanjut__administrasi__jenis_pelanggaran'
            className='form-control'
            placeholder='Pilih Jenis Pasal di Dropdown diatas'
            // value={pasalSelect?.pelanggaran ? pasalSelect?.pelanggaran : ''}
            // onKeyUp={(o: ChangeEvent<any>) => {
            //   dispatch(changedValue(ToFieldStateCE(o)))
            // }}
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
            className='form-control'
            placeholder='Pilih Jenis Pasal di Dropdown diatas'
            // value={pasalSelect?.perda ? pasalSelect?.perda : ''}
            // onKeyUp={(o: ChangeEvent<any>) => {
            //   dispatch(changedValue(ToFieldStateCE(o)))
            // }}
          />
          <div className='text-danger mt-2'>
            <ErrorMessage name='tindak_lanjut__administrasi__perda_perkada' />
          </div>
        </div>

        <div className='row'>
          <div className='col form-group'>
            <label className='required form-label'>Penyelesaian</label>
            <Field
              name='tindak_lanjut__administrasi__penyelesaian_selection'
              target='tindak_lanjut__administrasi__penyelesaian_id'
              className='form-control'
              component={SelectField}
              options={listJenisPenyelesaian}
              onChange={(o: ChangeEvent<any>) => {
                dispatch(changedValue(ToFieldStateCE(o)))
              }}
            />
            <div className='text-danger mt-2'>
              <ErrorMessage name='tindak_lanjut__administrasi__penyelesaian_id' />
            </div>
          </div>
          <div className='col form-group'>
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
        </div>

        <div className='row mt-5'>
          <div className='col'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h3 className='fw-bolder text-dark'>IDENTITAS NAMA / USAHA</h3>
            <div className='form-group'>
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
              <label className='required form-label'>Nama/Penanggungjawab</label>
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
              <label className='required form-label'>Nama Usaha/Tempat</label>
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
              <label className='required form-label'>Alamat Usaha/Tempat</label>
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
              <label className='required form-label'>Alamat Pelanggar</label>
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
              <label className='required form-label'>NIK/Paspport</label>
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
              <label className='required form-label'>Jenis Usaha/Tempat</label>
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
              <label className='required form-label'>Jumlah Pelanggar</label>
              <Field
                type='number'
                name='tindak_lanjut__jumlah_pelanggar'
                className='form-control'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='tindak_lanjut__jumlah_pelanggar' />
              </div>
            </div>

            <div className='form-group'>
              <h3 className='fw-bolder text-dark mt-12'>JUMLAH DENDA</h3>
            </div>

            <div className='form-group mb-10'>
              <label className='required form-label'>Non Pengadilan</label>
              <Field
                type='number'
                name='tindak_lanjut__denda__non_pengadilan'
                className='form-control'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='tindak_lanjut__denda__non_pengadilan' />
              </div>
            </div>

            <div className='form-group mb-10'>
              <label className='required form-label'>Tanggal Setor</label>
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
              <label className='required form-label'>Nama Bank</label>
              <Field
                type='text'
                name='tindak_lanjut__denda__nama_bank'
                className='form-control'
                onKeyUp={(o: ChangeEvent<any>) => {
                  dispatch(changedValue(ToFieldStateCE(o)))
                }}
              />
              <div className='text-danger mt-2'>
                <ErrorMessage name='tindak_lanjut__denda__nama_bank' />
              </div>
            </div>

            <div className='form-group mb-10'>
              <label className='required form-label'>No Validasi Bank</label>
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
      </div>
    </div>
  )
}
