import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
  ThunkAction,
} from '@reduxjs/toolkit'
import * as Yup from 'yup'
import axios from 'axios'

export interface PelaporanKegiatanState extends Record<string, any> {
  value: number
  kegiatan__jenis_kegiatan_id: number
  kegiatan__jumlah_personil: number
  kegiatan__uraian_kegiatan: string
  kegiatan__tanggal: string
  kegiatan__jam: string
  kegiatan__lokasi: string

  tindak_lanjut__administrasi__jenis_pasal_id: number
  tindak_lanjut__administrasi__jenis_penertiban: string
  tindak_lanjut__administrasi__jenis_pelanggaran: string
  tindak_lanjut__administrasi__perda_perkada: string
  tindak_lanjut__administrasi__penyelesaian_id: number

  tindak_lanjut__identitas_pelanggar__no_bap: string
  tindak_lanjut__identitas_pelanggar__nama_penanggung_jawab: string
  tindak_lanjut__identitas_pelanggar__nama_tempat_usaha: string
  tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha: string
  tindak_lanjut__identitas_pelanggar__nik: string
  tindak_lanjut__identitas_pelanggar__alamat: string
  tindak_lanjut__identitas_pelanggar__jenis_usaha_id: number

  tindak_lanjut__jenis_penindakan_id: number
  tindak_lanjut__jumlah_pelanggar: number
  tindak_lanjut__denda__non_pengadilan: number
  tindak_lanjut__denda__tanggal_setor: string
  tindak_lanjut__denda__nama_bank: string
  tindak_lanjut__denda__no_validasi_bank: string
}

export const initialState: PelaporanKegiatanState = {
  value: 0,
  list_jenis_kegiatan: [],
  list_jenis_pasal: [],
  list_jenis_penindakan: [],
  list_jenis_penyelesaian: [],
  list_jenis_usaha: [],

  filter_jenis_kegiatan_id: 0,

  kegiatan__jenis_kegiatan_id: 0,
  kegiatan__jumlah_personil: 0,
  kegiatan__uraian_kegiatan: '',
  kegiatan__tanggal: '2022-01-23',
  kegiatan__jam: '08:00:00',
  kegiatan__lokasi: '',
  //   kegiatan__asal_laporan: "",

  tindak_lanjut__administrasi__jenis_pasal_id: 0,
  tindak_lanjut__administrasi__jenis_penertiban: '',
  tindak_lanjut__administrasi__jenis_pelanggaran: '',
  tindak_lanjut__administrasi__perda_perkada: '',
  tindak_lanjut__administrasi__penyelesaian_id: 0,

  tindak_lanjut__identitas_pelanggar__no_bap: '3232323',
  tindak_lanjut__identitas_pelanggar__nama_penanggung_jawab: '3232323',
  tindak_lanjut__identitas_pelanggar__nama_tempat_usaha: '3232323',
  tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha: '3232323',
  tindak_lanjut__identitas_pelanggar__nik: '3232323',
  tindak_lanjut__identitas_pelanggar__alamat: '3232323',
  tindak_lanjut__identitas_pelanggar__jenis_usaha_id: 0,

  tindak_lanjut__jenis_penindakan_id: 0,
  tindak_lanjut__jumlah_pelanggar: 0,
  tindak_lanjut__denda__non_pengadilan: 50000,
  tindak_lanjut__denda__tanggal_setor: '2022-11-01',
  tindak_lanjut__denda__nama_bank: 'BCA',
  tindak_lanjut__denda__no_validasi_bank: '23423423',
}

export const createSchemaFilterPelaporanKegiatan = [
  Yup.object({
    filter_jenis_kegiatan_id: Yup.number().integer().moreThan(0).label('Jenis Kegiatan'),
    filter_jenis_kegiatan_id_selection: Yup.object(),
  }),
]

export const createSchemaPelaporanKegiatan = [
  Yup.object({
    kegiatan__jenis_kegiatan_id: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Jenis Kegiatan'),
    kegiatan__jenis_kegiatan_selection: Yup.object().required(),
    kegiatan__jumlah_personil: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Jumlah Personil'),
    kegiatan__uraian_kegiatan: Yup.string().min(10).max(1000).required().label('Uraian Kegiatan'),
    kegiatan__tanggal: Yup.date().required().label('Tanggal Kegiatan'),
    kegiatan__jam_start: Yup.string().required().label('Waktu Kegiatan'),
    kegiatan__jam_end: Yup.string().required().label('Waktu Kegiatan'),
    kegiatan__lokasi: Yup.string().min(3).max(64).required().label('Lokasi Kegiatan'),

    tindak_lanjut__administrasi__jenis_pasal_id: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Jenis Pasal'),
    tindak_lanjut__administrasi__jenis_pasal_selection: Yup.object().required(),
    tindak_lanjut__administrasi__jenis_penertiban: Yup.string()
      .min(3)
      .max(64)
      .required()
      .label('Jenis Penertiban'),
    tindak_lanjut__administrasi__jenis_pelanggaran: Yup.string()
      .min(3)
      .max(256)
      .required()
      .label('Jenis Pelanggaran'),
    tindak_lanjut__administrasi__perda_perkada: Yup.string()
      .min(3)
      .max(64)
      .required()
      .label('Perda Perkada'),
    tindak_lanjut__administrasi__penyelesaian_id: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Penyelesaian'),
    tindak_lanjut__administrasi__penyelesaian_selection: Yup.object().required(),

    tindak_lanjut__identitas_pelanggar__no_bap: Yup.string()
      .min(3)
      .max(16)
      .required()
      .label('NO BAP'),
    tindak_lanjut__identitas_pelanggar__nama_penanggung_jawab: Yup.string()
      .min(3)
      .max(64)
      .required()
      .label('Nama Penanggung Jawab'),
    tindak_lanjut__identitas_pelanggar__nama_tempat_usaha: Yup.string()
      .min(3)
      .max(64)
      .required()
      .label('Nama Tempat Usaha'),
    tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha: Yup.string()
      .min(3)
      .max(256)
      .required()
      .label('Alamat Tempat Usaha'),
    tindak_lanjut__identitas_pelanggar__nik: Yup.string()
      .min(3)
      .max(32)
      .required()
      .label('NIK/Pasport Pelanggar'),
    tindak_lanjut__identitas_pelanggar__alamat: Yup.string()
      .min(3)
      .max(32)
      .required()
      .label('Alamat Pelanggar'),
    tindak_lanjut__identitas_pelanggar__jenis_usaha_id: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Jenis Usaha'),
    tindak_lanjut__identitas_pelanggar__jenis_usaha_selection: Yup.object().required(),

    tindak_lanjut__jenis_penindakan_id: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Penindakan'),
    tindak_lanjut__jenis_penindakan_selection: Yup.object().required(),
    tindak_lanjut__jumlah_pelanggar: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Jumlah Pelanggar'),
    tindak_lanjut__denda__non_pengadilan: Yup.number()
      .integer()
      .moreThan(1000)
      .required()
      .label('Jumlah Denda Non Pengadilan'),
    tindak_lanjut__denda__tanggal_setor: Yup.date().required().label('Tanggal Setor Denda'),
    tindak_lanjut__denda__nama_bank: Yup.string().min(3).max(32).required().label('Nama Bank'),
    tindak_lanjut__denda__no_validasi_bank: Yup.string()
      .min(3)
      .max(32)
      .required()
      .label('NO Validasi Bank'),
  }),
  Yup.object({}),
]

const excludeJenisKegiatan = [
  'SIDANG TIPIRING',
  'PENERTIBAN BANGUNAN',
  'KEGIATAN PPKM',
  'LAPORAN MASYARAKAT',
  'PENERTIBAN MINUMAN BERALKOHOL',
  'PENGAMANAN',
]

export const updateJenisPasalList: any = createAsyncThunk(
  'pelaporanKegiatan/updateJenisPasalList',
  async (jenisKegiatan: number, thunkAPI) => {
    const res = await axios.get(
      `http://localhost:3001/jenis-perda-perkada/combobox?%24filter=${jenisKegiatan}&%24orderby=nama`
    )
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))

    return data
  }
)

export const updateJenisPenyelesaianList: any = createAsyncThunk(
  'pelaporanKegiatan/updateJenisPenyelesaianList',
  async (jenisKegiatan: number, thunkAPI) => {
    const res = await axios.get(
      `http://localhost:3001/jenis-penyelesaian/combobox?%24filter=${jenisKegiatan}&%24orderby=nama`
    )
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))

    return data
  }
)

export const pelaporanKegiatanSlice = createSlice({
  name: 'pelaporanKegiatan',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateJenisPasalList.fulfilled, (state, action) => {
      state.list_jenis_pasal = action.payload
    })
    builder.addCase(updateJenisPenyelesaianList.fulfilled, (state, action) => {
      state.list_jenis_penyelesaian = action.payload
    })
  },
  reducers: {
    changedValue: (
      state: PelaporanKegiatanState,
      action: PayloadAction<{target: {name: string; value: any}}>
    ) => {
      if (typeof state[action.payload.target.name] === 'number') {
        state[action.payload.target.name] = Number(action.payload.target.value)
      } else {
        state[action.payload.target.name] = action.payload.target.value
      }
    },
  },
})

// Action creators are generated for each case reducer function

export const isTipiring = (formikValues: any) =>
  formikValues.kegiatan__jenis_kegiatan_selection?.label === 'SIDANG TIPIRING'
export const isApel = (formikValues: any) =>
  formikValues.kegiatan__jenis_kegiatan_selection?.label === 'APEL'

export const {changedValue} = pelaporanKegiatanSlice.actions

export default pelaporanKegiatanSlice.reducer
