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
  share_location: string
  lokasi_tiang: string

  kota: number
  kecamatan: number
  kelurahan: number
  
  alamat: string
  tgl_pengecekan: string
  waktu_pengawasan: string
  konten_iklan: string
  ukuran: number
  status_reklame: number
  jenis_reklame: number
  kawasan_kendali: number
  pemilik_reklame: string
  konstruksi_reklame: string
  longtitude: string
}

export const initialState: PelaporanPengawasanState = {
  list_kota: [],
  list_kecamatan: [],
  list_kelurahan: [],
  list_kawasan_kendali: [],
  list_status_reklame: [],
  list_jenis_reklame: [],

  tgl_pengecekan: '',
  waktu_pengawasan: '',

  kecamatan: 0,
  kelurahan: 0,
  kota: 0,
  
  alamat: '',
  share_location: '',
  lokasi_tiang: '',
  kawasan_kendali: 0,
  ukuran: 0,
  pemilik_reklame: '',
  konstruksi_reklame: '',
  konten_iklan: '',
  longtitude: '',
  status_reklame: 0,
  jenis_reklame: 0,
  tindak_dokumentasi: [
    {
      file_uploadResult: [
        {
          bucket: 'pelaporan',
          key: '',
        },
      ],
      keterangan: '',
    },
  ],
}

export const createSchemaFilterPelaporaPengawasan = [
  Yup.object({
    filter_kota: Yup.number().integer().moreThan(0).label('Kota'),
    filter_kota_selection: Yup.object().required(),
    filter_kecamatan: Yup.number().integer().moreThan(0).label('Kecamatan'),
    filter_kecamatan_selection: Yup.object().required(),
    filter_kelurahan: Yup.number().integer().moreThan(0).label('Kelurahan'),
    filter_kelurahan_selection: Yup.object().required(),
  }),
]

export const createSchemaPelaporanPengawasan = [
  Yup.object({
    // alamat: Yup.string().required().label('Alamat'),
    // tgl_pengecekan: Yup.string().required().label('Tanggal Pengecekan'),
    // waktu_pengawasan: Yup.string().required().label('Waktu Pengawasan'),
    // kawasan_kendali: Yup.string().required().label('Kawasan Kendali'),
    // ukuran: Yup.number().required().label('Ukuran'),
    // status_reklame: Yup.number().required().label('Status Reklame'),
    // jenis_reklame: Yup.number().required().label('Jenis Reklame'),
    // latitude: Yup.number().required().label('Latitude'),
    // longtitude: Yup.number().required().label('Longtitude'),
    // status: Yup.string().required().label('Status'),
    // pemilik_reklame: Yup.string().required().label('Pemilik Reklame'),
    // konstruksi_reklame: Yup.string().required().label('Konstruksi Reklame'),
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
    const res = await axios.get(`${API_URL}/kecamatan/?%24top=100&%24select=id%2C%20nama%2C%20kode%2C%20kode_kota`)
    const data = res.data.data.map((d: any) => ({label: d.nama, value: String(d.id), kodeKota: d.kode_kota}))
    return data
  }
)
export const updateKelurahanList: any = createAsyncThunk(
  'pelaporanPengawasan/updateKelurahanList',
  async (thunkAPI) => {
    const res = await axios.get(`${API_URL}/kelurahan/?%24top=300&%24select=id%2C%20nama%2C%20kode%2C%20kode_kecamatan`)
    const data = res.data.data.map((d: any) => ({label: d.nama, value: String(d.id), kodeKecamatan: d.kode_kecamatan}))
    return data
  }
)
export const updateKawasanKendaliList: any = createAsyncThunk(
  'pelaporanKegiatan/updateKawasanKendaliList',
  async () => {
    const res = await axios.get(`${API_URL}/jenis-kendali/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))

    return data
  }
)
export const updateJenisReklameList: any = createAsyncThunk(
  'pelaporanPengawasan/updateJenisReklameList',
  async (thunkAPI) => {
    const res = await axios.get(`${API_URL}/jenis-reklame/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)

export const updateStatusReklameList: any = createAsyncThunk(
  'pelaporanPengawasan/updateStatusReklameList',
  async (thunkAPI) => {
    const res = await axios.get(`${API_URL}/status-reklame/combobox`)
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
    builder.addCase(updateKawasanKendaliList.fulfilled, (state, action) => {
      state.list_kawasan_kendali = action.payload
    })
    builder.addCase(updateJenisReklameList.fulfilled, (state, action) => {
      state.list_jenis_reklame = action.payload
    })
    builder.addCase(updateStatusReklameList.fulfilled, (state, action) => {
      state.list_status_reklame = action.payload
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
    reset: () => initialState,
    editInitialState: (state: PelaporanPengawasanState, action: PayloadAction<any>) =>
      (state = action.payload),
  },
})

// Action creators are generated for each case reducer function

export const {changedValue, editInitialState, reset} = pelaporanPengawasanSlice.actions

export default pelaporanPengawasanSlice.reducer
