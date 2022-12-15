import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
  ThunkAction,
} from '@reduxjs/toolkit'
import * as Yup from 'yup'
import axios from 'axios'

export interface PelaporanKejadianState extends Record<string, any> {
  value: number

  kejadian__jenis_kejadian_id: number
  kejadian__tanggal: string
  kejadian__waktu_start: string
  kejadian__waktu_end: string
  kejadian__kota_id: number
  kejadian__kecamatan_id: number
  kejadian__kelurahan_id: number
  kejadian__alamat: string
  kejadian__uraian_kejadian: string
  kejadian__jml_personil_satpolpp: number
  kejadian__jml_personil_instansilain: number
  kejadian__ketinggian_air: number
  kejadian__pengungsi: number
  kejadian__pengungsi_kk: number
  kejadian__lokasi_penampungan: string
  kejadian__lokasi_dapur_umum: string
}

export const initialState: PelaporanKejadianState = {
  value: 0,
  list_jenis_kejadian: [],
  list_jenis_pasal: [],
  list_jenis_penindakan: [],
  list_jenis_penyelesaian: [],
  list_jenis_usaha: [],

  filter_jenis_kegiatan_id: 0,

  kejadian__jenis_kejadian_id: 0,
  kejadian__tanggal: '2022-01-23',
  kejadian__waktu_start: '08:00:00',
  kejadian__waktu_end: '08:00:00',
  kejadian__kota_id: 0,
  kejadian__kecamatan_id: 0,
  kejadian__kelurahan_id: 0,
  kejadian__alamat: '',
  kejadian__uraian_kejadian: '',
  kejadian__jml_personil_satpolpp: 0,
  kejadian__jml_personil_instansilain: 0,
  kejadian__ketinggian_air: 0,
  kejadian__pengungsi: 0,
  kejadian__pengungsi_kk: 0,
  kejadian__lokasi_penampungan: '',
  kejadian__lokasi_dapur_umum: '',
}

// export const createSchemaFilterPelaporanKegiatan = [
//   Yup.object({
//     filter_jenis_kegiatan_id: Yup.number().integer().moreThan(0).label('Jenis Kegiatan'),
//     filter_jenis_kegiatan_id_selection: Yup.object(),
//   }),
// ]

export const createSchemaPelaporanKejadian = [
  Yup.object({
    kegiatan__jenis_kejadian_id: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Jenis Kegiatan'),
    kegiatan__jenis_kejadian_selection: Yup.object().required(),
    kejadian__kota_id: Yup.number().integer().moreThan(0).required().label('Kota'),

    kegiatan__lokasi: Yup.string().min(3).max(64).required().label('Lokasi Kegiatan'),
    kegiatan__uraian_kegiatan: Yup.string().min(10).max(1000).required().label('Uraian Kegiatan'),
    kegiatan__tanggal: Yup.date().required().label('Tanggal Kegiatan'),
    kegiatan__jam_start: Yup.string().required().label('Waktu Kegiatan'),
    kegiatan__jam_end: Yup.string().required().label('Waktu Kegiatan'),

    kegiatan__asal_laporan_id: Yup.number().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'LAPORAN MASYARAKAT',
      then: Yup.number().notRequired(),
      otherwise: Yup.number().integer().moreThan(0).required().label('Laporan Masyarakat'),
    }),
    kegiatan__asal_laporan_selection: Yup.object().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'LAPORAN MASYARAKAT',
      then: Yup.object().notRequired(),
      otherwise: Yup.object().required(),
    }),
    kegiatan__jenis_pengamanan_id: Yup.number().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'PENGAMANAN',
      then: Yup.number().notRequired(),
      otherwise: Yup.number().integer().moreThan(0).required().label('Jenis Pengamanan'),
    }),
    kegiatan__jenis_pengamanan_selection: Yup.object().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'PENGAMANAN',
      then: Yup.object().notRequired(),
      otherwise: Yup.object().required(),
    }),
    kegiatan__pengamanan_masalah: Yup.string().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'PENGAMANAN',
      then: Yup.string().notRequired(),
      otherwise: Yup.string().min(5).max(500).required().label('Uraian Masalah'),
    }),
    kegiatan__pengamanan_pemecahan_masalah: Yup.string().when(
      'kegiatan__jenis_kegiatan_selection',
      {
        is: (val: any) => val?.label !== 'PENGAMANAN',
        then: Yup.string().notRequired(),
        otherwise: Yup.string().min(10).max(1000).required().label('Uraian Pemecahan Masalah'),
      }
    ),
    kegiatan__pengamanan_instansi_terkait: Yup.string().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'PENGAMANAN',
      then: Yup.string().notRequired(),
      otherwise: Yup.string().min(2).max(32).required().label('Instansi Terkait'),
    }),
  }),
  Yup.object({}),
]

export const updateJenisKegiatanList: any = createAsyncThunk(
  'pelaporanKegiatan/updateJenisKegiatanList',
  async (thunkAPI) => {
    const res = await axios.get(`http://localhost:3001/jenis-kegiatan/combobox?$orderby=nama`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)

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

export const pelaporanKejadianSlice = createSlice({
  name: 'pelaporanKejadian',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateJenisKegiatanList.fulfilled, (state, action) => {
      state.list_jenis_kegiatan = action.payload
    })
    builder.addCase(updateJenisPasalList.fulfilled, (state, action) => {
      state.list_jenis_pasal = action.payload
    })
    builder.addCase(updateJenisPenyelesaianList.fulfilled, (state, action) => {
      state.list_jenis_penyelesaian = action.payload
    })
  },
  reducers: {
    changedValue: (
      state: PelaporanKejadianState,
      action: PayloadAction<{target: {name: string; value: any}}>
    ) => {
      if (typeof state[action.payload.target.name] === 'number') {
        state[action.payload.target.name] = Number(action.payload.target.value)
      } else {
        state[action.payload.target.name] = action.payload.target.value
      }
    },
    reset: () => initialState,
  },
})

// export const {reset} = pelaporanKegiatanSlice.actions

// Action creators are generated for each case reducer function

export const isBanjir = (formikValues: any) =>
  formikValues.kegiatan__jenis_kejadian_selection?.label === 'BANJIR'
export const isPendampinganKekerasanPadaPerempuan = (formikValues: any) =>
  formikValues.kegiatan__jenis_kegiatan_selection?.label === 'PENDAMPINGAN KEKERASAN PADA PEREMPUAN'
export const isUnjukRasa = (formikValues: any) =>
  formikValues.kegiatan__jenis_kegiatan_selection?.label === 'UNJUK RASA'

export const {changedValue, reset} = pelaporanKejadianSlice.actions

export default pelaporanKejadianSlice.reducer
