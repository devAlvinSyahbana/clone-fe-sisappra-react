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
  kejadian__jenis_kejadian_id: number
  kejadian__tanggal: string
  kejadian__waktu_start: string
  kejadian__waktu_end: string
  kejadian__alamat: string
  kejadian__uraian_kejadian: string
  kejadian__jml_personil_satpolpp: number
  kejadian__jml_personil_instansilain: number
  kejadian__ketinggian_air: number
  kejadian__pengungsi: number
  kejadian__pengungsi_kk: number
  kejadian__lokasi_penampungan: string
  kejadian__lokasi_dapur_umum: string

  // Tindakan
  kejadian__kota_id: number
  kejadian__kecamatan_id: number
  kejadian__kelurahan_id: number

  // Kekerasan pada anak
  kejadian__sumber_informasi_id: number
  kejadian__jenis_kekerasan_id: number

  // Unjuk Rasa
  kejadian__jumlah_massa: number
  kejadian__tuntutan: string
  kejadian__penanggung_jawab_unras: string
}

export const initialState: PelaporanKejadianState = {
  list_jenis_kejadian: [],
  list_kota: [],
  list_kecamatan: [],
  list_kelurahan: [],
  list_sumber_informasi: [],
  list_jenis_kekerasan: [],
  list_jenis_bantuan_satpol_pp: [],
  list_jenis_bantuan_instansi_terkait: [],
  list_korban_jiwa: [],
  list_korban_material: [],

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

  // Tindak Lanjut
  kejadian__kota_id: 0,
  kejadian__kecamatan_id: 0,
  kejadian__kelurahan_id: 0,
  tindak__jenis_bantuan_satpolpp: [],
  tindak__jenis_bantuan_instansiterkait: [],
  tindak__korban_jiwa: [],
  tindak__korban_material: [],

  // Kekerasan pada anak
  kejadian__sumber_informasi_id: 0,
  kejadian__jenis_kekerasan_id: 0,

  // Unjuk Rasa
  kejadian__jumlah_massa: 0,
  kejadian__tuntutan: '',
  kejadian__penanggung_jawab_unras: '',
  tindak__dokumentasi: [
    {
      file_uploadResult: [
        {
          bucket: 'pelaporan',
          key: '',
        },
      ],
    },
  ],
}

export const createSchemaPelaporanKejadian = [
  Yup.object({
    kejadian__jenis_kejadian_id: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Pelaporan Pengawasan'),
    kejadian__jenis_kejadian_selection: Yup.object().required(),
    kejadian__kota_id: Yup.number().integer().moreThan(0).required().label('Kota'),
    kota_selection: Yup.object().required(),
    kejadian__kecamatan_id: Yup.number().integer().moreThan(0).required().label('Kecamatan'),
    kecamatan_selection: Yup.object().required(),
    kejadian__kelurahan_id: Yup.number().integer().moreThan(0).required().label('Kelurahan'),
    kelurahan_selection: Yup.object().required(),
    // tindak__jenis_bantuan_satpolpp: Yup.number()
    //   .integer()
    //   .moreThan(0)
    //   .required()
    //   .label('Jenis Bantuan Satpol PP'),
    // kejadian__jenis_bantuan_satpolpp_selection: Yup.object().required(),
    // tindak__jenis_bantuan_instansiterkait: Yup.number()
    //   .integer()
    //   .moreThan(0)
    //   .required()
    //   .label('Jenis Bantuan Instansi Terkait'),
    // kejadian__jenis_bantuan_instansi_terkait_selection: Yup.object().required(),
    kejadian__tanggal: Yup.date().required().label('Tanggal Kejadian'),
    kejadian__waktu_start: Yup.string().required().label('Waktu Start'),
    kejadian__waktu_end: Yup.string().required().label('Waktu End'),
    kejadian__alamat: Yup.string().min(10).max(1000).required().label('Alamat Kejadian'),
    kejadian__uraian_kejadian: Yup.string().min(10).max(1000).required().label('Uraian Kejadian'),
    kejadian__jml_personil_satpolpp: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Jumlah Personil Satpol PP'),
    kejadian__jml_personil_instansilain: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Jumlah Personil Instansi Lain'),

    // Banjir
    kejadian__ketinggian_air: Yup.number().when('kejadian__jenis_kejadian_selection', {
      is: (val: any) => val?.label !== 'BANJIR',
      then: Yup.number().notRequired(),
      otherwise: Yup.number().integer().moreThan(0).required().label('Ketinggian Air'),
    }),
    kejadian__pengungsi: Yup.number().when('kejadian__jenis_kejadian_selection', {
      is: (val: any) => val?.label !== 'BANJIR',
      then: Yup.number().notRequired(),
      otherwise: Yup.number().integer().moreThan(0).required().label('Pengungsi'),
    }),
    kejadian__pengungsi_kk: Yup.number().when('kejadian__jenis_kejadian_selection', {
      is: (val: any) => val?.label !== 'BANJIR',
      then: Yup.number().notRequired(),
      otherwise: Yup.number().integer().moreThan(0).required().label('Pengungsi KK'),
    }),
    kejadian__lokasi_penampungan: Yup.string().when('kejadian__jenis_kejadian_selection', {
      is: (val: any) => val?.label !== 'BANJIR',
      then: Yup.string().notRequired(),
      otherwise: Yup.string().required().label('Lokasi Penampungan'),
    }),
    kejadian__lokasi_dapur_umum: Yup.string().when('kejadian__jenis_kejadian_selection', {
      is: (val: any) => val?.label !== 'BANJIR',
      then: Yup.string().notRequired(),
      otherwise: Yup.string().required().label('Lokasi Dapur Umum'),
    }),

    // Tindak Lanjut - Kekerasan Pada Anak
    kejadian__sumber_informasi_selection: Yup.object().when('kejadian__jenis_kejadian_selection', {
      is: (val: any) => val?.label !== 'PENDAMPINGAN KEKERASAN PADA PEREMPUAN',
      then: Yup.object().notRequired(),
      otherwise: Yup.object().required(),
    }),
    kejadian__sumber_informasi_id: Yup.number().when('kejadian__jenis_kejadian_selection', {
      is: (val: any) => val?.label !== 'PENDAMPINGAN KEKERASAN PADA PEREMPUAN',
      then: Yup.number().notRequired(),
      otherwise: Yup.number().integer().moreThan(0).required().label('Sumber Informasi'),
    }),
    kejadian__jenis_kekerasan_selection: Yup.object().when('kejadian__jenis_kejadian_selection', {
      is: (val: any) => val?.label !== 'PENDAMPINGAN KEKERASAN PADA PEREMPUAN',
      then: Yup.object().notRequired(),
      otherwise: Yup.object().required(),
    }),
    kejadian__jenis_kekerasan_id: Yup.number().when('kejadian__jenis_kejadian_selection', {
      is: (val: any) => val?.label !== 'PENDAMPINGAN KEKERASAN PADA PEREMPUAN',
      then: Yup.number().notRequired(),
      otherwise: Yup.number().integer().moreThan(0).required().label('Jenis Kekerasan '),
    }),

    // Tindak Lanjut - Unjuk Rasa
    kejadian__jumlah_massa: Yup.number().when('kejadian__jenis_kejadian_selection', {
      is: (val: any) => val?.label !== 'UNJUK RASA',
      then: Yup.number().notRequired(),
      otherwise: Yup.number().integer().moreThan(0).required().label('Jumlah Massa'),
    }),
    kejadian__tuntutan: Yup.string().when('kejadian__jenis_kejadian_selection', {
      is: (val: any) => val?.label !== 'UNJUK RASA',
      then: Yup.string().notRequired(),
      otherwise: Yup.string().min(5).max(500).required().label('Tuntutan'),
    }),
    kejadian__penanggung_jawab_unras: Yup.string().when('kejadian__jenis_kejadian_selection', {
      is: (val: any) => val?.label !== 'UNJUK RASA',
      then: Yup.string().notRequired(),
      otherwise: Yup.string().min(5).max(500).required().label('Penanggung Jawab Unjuk Rasa'),
    }),
  }),
  Yup.object({}),
]

export const jenisKejadianList: any = createAsyncThunk(
  'pelaporanKejadian/jenisKejadianList',
  async (thunkAPI) => {
    const res = await axios.get(`${API_URL}/jenis-kejadian/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)

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
export const updateSumberInformasiList: any = createAsyncThunk(
  'pelaporanKejadian/updateSumberInformasiList',
  async () => {
    const res = await axios.get(`${API_URL}/sumber-informasi/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)
export const updateJenisKekerasan: any = createAsyncThunk(
  'pelaporanKejadian/updateJenisKekerasan',
  async () => {
    const res = await axios.get(`${API_URL}/jenis-kekerasan/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)
export const updateJenisBantuanSatpolPP: any = createAsyncThunk(
  'pelaporanKejadian/updateJenisBantuanSatpolPP',
  async () => {
    const res = await axios.get(`${API_URL}/jenis-bantuan/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)
export const updateJenisBantuanInstansiTerkait: any = createAsyncThunk(
  'pelaporanKejadian/updateJenisBantuanInstansiTerkait',
  async () => {
    const res = await axios.get(`${API_URL}/jenis-bantuan/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)
export const updateKorbanJiwa: any = createAsyncThunk(
  'pelaporanKejadian/updateKorbanJiwa',
  async () => {
    const res = await axios.get(`${API_URL}/jenis-korban-jiwa/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)
export const updateKorbanMaterial: any = createAsyncThunk(
  'pelaporanKejadian/updateKorbanMaterial',
  async () => {
    const res = await axios.get(`${API_URL}/jenis-korban-material/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)

export const pelaporanKejadianSlice = createSlice({
  name: 'pelaporanKejadian',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(jenisKejadianList.fulfilled, (state, action) => {
      state.list_jenis_kejadian = action.payload
    })
    builder.addCase(updateKotaList.fulfilled, (state, action) => {
      state.list_kota = action.payload
    })
    builder.addCase(updateKecamatanList.fulfilled, (state, action) => {
      state.list_kecamatan = action.payload
    })
    builder.addCase(updateKelurahanList.fulfilled, (state, action) => {
      state.list_kelurahan = action.payload
    })
    builder.addCase(updateSumberInformasiList.fulfilled, (state, action) => {
      state.list_sumber_informasi = action.payload
    })
    builder.addCase(updateJenisKekerasan.fulfilled, (state, action) => {
      state.list_jenis_kekerasan = action.payload
    })
    builder.addCase(updateJenisBantuanSatpolPP.fulfilled, (state, action) => {
      state.list_jenis_bantuan_satpol_pp = action.payload
    })
    builder.addCase(updateJenisBantuanInstansiTerkait.fulfilled, (state, action) => {
      state.list_jenis_bantuan_instansi_terkait = action.payload
    })
    builder.addCase(updateKorbanJiwa.fulfilled, (state, action) => {
      state.list_korban_jiwa = action.payload
    })
    builder.addCase(updateKorbanMaterial.fulfilled, (state, action) => {
      state.list_korban_material = action.payload
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
    editInitialState: (state: PelaporanKejadianState, action: PayloadAction<any>) =>
      (state = action.payload),
  },
})

// Action creators are generated for each case reducer function
export const isBanjir = (formikValues: any) =>
  formikValues.kejadian__jenis_kejadian_selection?.label === 'BANJIR'
export const isPendampinganKekerasanPadaPerempuan = (formikValues: any) =>
  formikValues.kejadian__jenis_kejadian_selection?.label === 'PENDAMPINGAN KEKERASAN PADA PEREMPUAN'
export const isUnjukRasa = (formikValues: any) =>
  formikValues.kejadian__jenis_kejadian_selection?.label === 'UNJUK RASA'

export const {changedValue, reset, editInitialState} = pelaporanKejadianSlice.actions

export default pelaporanKejadianSlice.reducer
