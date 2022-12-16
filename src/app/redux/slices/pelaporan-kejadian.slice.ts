import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
  ThunkAction,
} from '@reduxjs/toolkit'
import * as Yup from 'yup'
import axios from 'axios'

export const API_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL

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
  list_kota: [],
  list_kecamatan: [],
  list_kelurahan: [],

  kejadian__jenis_kejadian_id: 0,
  kejadian__tanggal: '2022-01-23',
  kejadian__waktu_start: '08:00:00',
  kejadian__waktu_end: '08:00:00',
  kejadian__alamat: '',
  kejadian__uraian_kejadian: '',
  kejadian__jml_personil_satpolpp: 0,
  kejadian__jml_personil_instansilain: 0,
  kejadian__ketinggian_air: 0,
  kejadian__pengungsi: 0,
  kejadian__pengungsi_kk: 0,
  kejadian__lokasi_penampungan: '',
  kejadian__lokasi_dapur_umum: '',

  kota_selection: [],
  kejadian__kota_id: 0,
  kecamatan_selection: [],
  kejadian__kecamatan_id: 0,
  kelurahan_selection: [],
  kejadian__kelurahan_id: 0,
}

export const createSchemaPelaporanKejadian = [
  Yup.object({
    kejadian__jenis_kejadian_id: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Pelaporan Pengawasan'),

    kota_selection: Yup.object().required(),
    kecamatan_selection: Yup.object().required(),
    kelurahan_selection: Yup.object().required(),

    kejadian__tanggal: Yup.date().required().label('Tanggal Kejadian'),
    kejadian__waktu_start: Yup.string().required().label('Waktu Kejadian'),
    kejadian__waktu_end: Yup.string().required().label('Waktu Kejadian'),
    kejadian__alamat: Yup.string().min(10).max(1000).required().label('Alamat Kejadian'),
    kejadian__uraian_kejadian: Yup.string().min(10).max(1000).required().label('Uraian Kejadian'),
    kejadian__lokasi_penampungan: Yup.string()
      .min(10)
      .max(1000)
      .required()
      .label('Lokasi Penampungan'),
    kejadian__lokasi_dapur_umum: Yup.string()
      .min(10)
      .max(1000)
      .required()
      .label('Lokasi Dapur Umum'),
  }),
  Yup.object({}),
]
export const updateKotaList: any = createAsyncThunk(
  'pelaporanKejadian/updateKotaList',
  async (thunkAPI) => {
    const res = await axios.get(`${API_URL}/kota/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)
export const updateKecamatanList: any = createAsyncThunk(
  'pelaporanKejadian/updateKecamatanList',
  async (thunkAPI) => {
    const res = await axios.get(`${API_URL}/kecamatan/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)
export const updateKelurahanList: any = createAsyncThunk(
  'pelaporanKejadian/updateKelurahanList',
  async () => {
    const res = await axios.get(`${API_URL}/kelurahan/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)

export const pelaporanKejadianSlice = createSlice({
  name: 'pelaporanKejadian',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateKotaList.fulfilled, (state, action) => {
      state.list_kota = action.payload
    })
    builder.addCase(updateKecamatanList.fulfilled, (state, action) => {
      state.list_kecaamatan = action.payload
    })
    builder.addCase(updateKelurahanList.fulfilled, (state, action) => {
      state.list_kelurahan = action.payload
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
    reset: () => {
      return initialState
    },
  },
})

// Action creators are generated for each case reducer function

export const isBanjir = (formikValues: any) =>
  formikValues.kejadian__jenis_kejadian_selection?.label === 'BANJIR'
export const isPendampinganKekerasanPadaPerempuan = (formikValues: any) =>
  formikValues.kejadian__jenis_kejadian_selection?.label === 'PENDAMPINGAN KEKERASAN PADA PEREMPUAN'
export const isUnjukRasa = (formikValues: any) =>
  formikValues.kejadian__jenis_kejadian_selection?.label === 'UNJUK RASA'

export const {changedValue, reset} = pelaporanKejadianSlice.actions

export default pelaporanKejadianSlice.reducer
