import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
  ThunkAction,
} from '@reduxjs/toolkit'
import * as Yup from 'yup'

export const API_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL

export interface PelaporanTamuDaerahState extends Record<string, any> {
  value: number
  id: number
  tanggal_kunjungan: string
  waktu_mulai_kunjungan: string
  waktu_selesai_kunjungan: string
  asal_instansi: string
  jml_pengunjung: string
  maksud_dan_tujuan: string
  pejabat_penerima_kunjungan: string
  tempat_kunjungan: string
}

export const initialState: PelaporanTamuDaerahState = {
  value: 0,

  id: 0,
  tanggal_kunjungan: '2022-01-23',
  waktu_mulai_kunjungan: '08:00:00',
  waktu_selesai_kunjungan: '08:00:00',
  asal_instansi: '',
  jml_pengunjung: '',
  maksud_dan_tujuan: '',
  pejabat_penerima_kunjungan: '',
  tempat_kunjungan: '',
}

export const createSchemaPelaporanTamuDaerah = [
  Yup.object({
    id: Yup.number().integer().moreThan(0).required().label('Tamu Daerah'),
    tanggal_kunjungan: Yup.date().required().label('Tanggal Kunjungan'),
    waktu_mulai_kunjungan: Yup.string().required().label('Waktu Kunjungan'),
    waktu_selesai_kunjungan: Yup.string().required().label('Waktu Kunjungan'),
    asal_instansi: Yup.string().required().label('Asal Instansi'),
    jml_pengunjung: Yup.string().required().label('Jumlah Pengunjung'),
    maksud_dan_tujuan: Yup.string().required().label('Maksud dan Tujuan'),
    pejabat_penerima_kunjungan: Yup.string().required().label('Pejabat Penerima Kunjungan'),
    tempat_kunjungan: Yup.string().required().label('Tempat Kunjungan'),
  }),
  Yup.object({}),
]

// export const updateJenisKegiatanList: any = createAsyncThunk(
//   'pelaporanKegiatan/updateJenisKegiatanList',
//   async (thunkAPI) => {
//     const res = await axios.get(`http://localhost:3001/jenis-kegiatan/combobox?$orderby=nama`)
//     const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
//     return data
//   }
// )
//  axios.get(`http://localhost:3001/jenis-kegiatan/combobox?$orderby=nama`).then((res) => {
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
  },
})

// Action creators are generated for each case reducer function

export const {changedValue} = pelaporanTamuDaerahSlice.actions

export default pelaporanTamuDaerahSlice.reducer
