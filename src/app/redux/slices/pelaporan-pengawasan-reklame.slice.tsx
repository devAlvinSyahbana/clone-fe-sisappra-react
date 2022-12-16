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

export interface PelaporanPengawasanState extends Record<string, any> {
  value: number
  id: number
  nrk: number
  nama: string
  share_location: string
  alamat: string
  lokasi_tiang: string
  kawasan_kendali: string
  status: string
  ukuran: string
  pemilik_reklame: string
  konstruksi_reklame: string
  konten_iklan: string
}

export const initialState: PelaporanPengawasanState = {
  value: 0,
  list_kota: [],
  list_kecamatan: [],
  list_kelurahan: [],

  id: 0,
  nrk: 0,
  nama: '',
  share_location: '',
  alamat: '',
  lokasi_tiang: '',
  kawasan_kendali: '',
  status: '',
  ukuran: '',
  pemilik_reklame: '',
  konstruksi_reklame: '',
  konten_iklan: '',

  kota_selection: [],
  kota_id: 0,
  kecamatan_selection: [],
  kecamatan_id: 0,
  kelurahan_selection: [],
  kelurahan_id: 0,
}

export const createSchemaFilterPelaporaPengawasan = [
  Yup.object({
    filter_kota_id: Yup.number().integer().moreThan(0).label('Kota'),
    filter_kota_id_selection: Yup.object(),
    filter_kecamatan_id: Yup.number().integer().moreThan(0).label('kecamatan'),
    filter_kecamatan_id_selection: Yup.object(),
    filter_kelurahan_id: Yup.number().integer().moreThan(0).label('kelurahan'),
    filter_kelurahan_id_selection: Yup.object(),
  }),
]

export const createSchemaPelaporanPengawasan = [
  Yup.object({
    id: Yup.number().integer().moreThan(0).required().label('Pengawasan'),
    nrk: Yup.number().integer().moreThan(0).required().label('Pengawasan'),

    kota_selection: Yup.object().required(),
    kecamatan_selection: Yup.object().required(),
    kelurahan_selection: Yup.object().required(),

    nama: Yup.string().min(10).max(1000).required().label('Nama'),
    share_location: Yup.string().min(10).max(1000).required().label('Share Location'),
    alamat: Yup.string().min(10).max(1000).required().label('Alamat'),
    lokasi_tiang: Yup.string().min(10).max(1000).required().label('Lokasi Tiang'),
    kawasan_kendali: Yup.string().min(10).max(1000).required().label('Kawasan Kendali'),
    status: Yup.string().min(10).max(1000).required().label('Status'),
    ukuran: Yup.string().min(10).max(1000).required().label('Ukuran'),
    pemilik_reklame: Yup.string().min(10).max(1000).required().label('Pemilik Reklame'),
    konstruksi_reklame: Yup.string().min(10).max(1000).required().label('Konstruksi Reklame'),
    konten_iklan: Yup.string().min(10).max(1000).required().label('Konten Iklan'),
  }),
  Yup.object({}),
]

export const updateKotaList: any = createAsyncThunk(
  'pelaporanPengawasan/updateKotaList',
  async (thunkAPI) => {
    const res = await axios.get(`${API_URL}/kota/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)
export const updateKecamatanList: any = createAsyncThunk(
  'pelaporanPengawasan/updateKecamatanList',
  async (thunkAPI) => {
    const res = await axios.get(`${API_URL}/kecamatan/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)
export const updateKelurahanList: any = createAsyncThunk(
  'pelaporanPengawasan/updateKelurahanList',
  async () => {
    const res = await axios.get(`${API_URL}/kelurahan/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)

export const pelaporanPengawasanSlice = createSlice({
  name: 'pelaporanPengawasan',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateKotaList.fulfilled, (state, action) => {
      state.list_kota = action.payload
    })
    builder.addCase(updateKecamatanList.fulfilled, (state, action) => {
      state.list_kecamatan = action.payload
    })
    builder.addCase(updateKelurahanList.fulfilled, (state, action) => {
      state.list_kelurahan = action.payload
    })
  },
  reducers: {
    changedValue: (
      state: PelaporanPengawasanState,
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

export const {changedValue, reset} = pelaporanPengawasanSlice.actions

export default pelaporanPengawasanSlice.reducer
