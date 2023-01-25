import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
  ThunkAction,
} from '@reduxjs/toolkit'
import * as Yup from 'yup'

export const API_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL
export const MASTERDATA_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL
export const PELAPORAN_URL = process.env.REACT_APP_SISAPPRA_PELAPORAN_API_URL

export interface PelaporanTamuDaerahState extends Record<string, any> {
  tanggal_kunjungan: string
  waktu_mulai_kunjungan: string
  waktu_selesai_kunjungan: string
  asal_instansi: string
  jml_pengunjung: number
  maksud_dan_tujuan: string
  pejabat_penerima_kunjungan: string
  tempat_kunjungan: string
}

export const initialState: PelaporanTamuDaerahState = {
  tanggal_kunjungan: '',
  waktu_mulai_kunjungan: '',
  waktu_selesai_kunjungan: '',
  asal_instansi: '',
  jml_pengunjung: 0,
  maksud_dan_tujuan: '',
  pejabat_penerima_kunjungan: '',
  tempat_kunjungan: '',
}

export const createSchemaPelaporanTamuDaerah = [
  Yup.object({
    tanggal_kunjungan: Yup.date().required().label('Tanggal Kunjungan'),
    waktu_mulai_kunjungan: Yup.string().required().label('Waktu Kunjungan'),
    waktu_selesai_kunjungan: Yup.string().required().label('Waktu Kunjungan'),
    asal_instansi: Yup.string().required().label('Asal Instansi'),
    jml_pengunjung: Yup.number().integer().moreThan(0).required().label('Jumlah Pengunjung'),
    maksud_dan_tujuan: Yup.string().required().label('Maksud dan Tujuan'),
    pejabat_penerima_kunjungan: Yup.string().required().label('Pejabat Penerima Kunjungan'),
    tempat_kunjungan: Yup.string().required().label('Tempat Kunjungan'),
  }),
  Yup.object({}),
]

// export const updateJenisKegiatanList: any = createAsyncThunk(
//   'pelaporanKegiatan/updateJenisKegiatanList',
//   async (thunkAPI) => {
//     const res = await axios.get(`${MASTERDATA_URL}/jenis-kegiatan/combobox?$orderby=nama`)
//     const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
//     return data
//   }
// )
//  axios.get(`${MASTERDATA_URL}/jenis-kegiatan/combobox?$orderby=nama`).then((res) => {
//    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
//    // .filter((v: any) => !excludeJenisKegiatan.includes(v.label))
//    dispatch(changedValue(ToFieldStateBNV('list_jenis_kegiatan', data)))
//  })

export const pelaporanTamuDaerahSlice = createSlice({
  name: 'pelaporanTamuDaerah',
  initialState,

  reducers: {
    changedValue: (
      state: PelaporanTamuDaerahState,
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
    editInitialState: (state: PelaporanTamuDaerahState, action: PayloadAction<any>) =>
      (state = action.payload),
  },
})

// Action creators are generated for each case reducer function

export const {changedValue, reset, editInitialState} = pelaporanTamuDaerahSlice.actions

export default pelaporanTamuDaerahSlice.reducer
