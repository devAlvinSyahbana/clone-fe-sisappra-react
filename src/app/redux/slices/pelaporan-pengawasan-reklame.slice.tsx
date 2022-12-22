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
  // nrk: number
  // nama: string
  // share_location: string
  alamat: string
  // lokasi_tiang: string
  // kawasan_kendali: string
  // status: string
  // ukuran: string
  // pemilik_reklame: string
  // konstruksi_reklame: string
  // konten_iklan: string
  tgl_pengecekan: string
  waktu_pengawasan: string
  kota: number
  kecamatan: number
  kelurahan: number
}

export const initialState: PelaporanPengawasanState = {
  list_kota: [],
  list_kecamatan: [],
  list_kelurahan: [],
  tgl_pengecekan: '',
  waktu_pengawasan: '',
  kecamatan: 0,
  kelurahan: 0,
  kota: 0,
  alamat: '',
  // nrk: 0,
  // nama: '',
  // share_location: '',

  // lokasi_tiang: '',
  // kawasan_kendali: '',
  // status: '',
  // ukuran: '',
  // pemilik_reklame: '',
  // konstruksi_reklame: '',
  // konten_iklan: '',

  // kecamatan_selection: [],
  // kota_selection: [],
  // kelurahan_selection: [],
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
    alamat: Yup.string().required().label('Alamat'),
    tgl_pengecekan: Yup.string().required().label('Tanggal Pengecekan'),
    waktu_pengawasan: Yup.string().required().label('Waktu Pengawasan'),
    // lokasi_tiang: Yup.string().required().label('Lokasi Tiang'),
    // kawasan_kendali: Yup.string().required().label('Kawasan Kendali'),
    // status: Yup.string().required().label('Status'),
    // ukuran: Yup.string().required().label('Ukuran'),
    // pemilik_reklame: Yup.string().required().label('Pemilik Reklame'),
    // konstruksi_reklame: Yup.string().required().label('Konstruksi Reklame'),
    // konten_iklan: Yup.string().required().label('Konten Iklan'),
    // nrk: Yup.number().integer().moreThan(0).required().label('NRK'),
    // nama: Yup.string().required().label('Nama'),
    // share_location: Yup.string().min(10).max(1000).required().label('Share Location'),
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
