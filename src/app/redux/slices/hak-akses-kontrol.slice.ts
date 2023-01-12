import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
  ThunkAction,
} from '@reduxjs/toolkit'
import * as Yup from 'yup'
import axios from 'axios'

export const API_URL = process.env.REACT_APP_SISAPPRA_API_URL

export interface HakAksesKontrolState extends Record<string, any> {}

export const initialState: HakAksesKontrolState = {
  hakAksesData: [],
  namaHakAkses: [],
  listAksesKontrol: [],
  listModulPermission: [],
  aksesKontrolMapping: [],
}

// export const createSchemaPelaporanPengawasan = [Yup.object({})]

export const updateHakAksesByIdData: any = createAsyncThunk(
  'hakAksesKontrol/updateHakAksesByIdData',
  async (id, thunkAPI) => {
    const res = await axios.get(`${API_URL}/manajemen-pengguna/hak-akses/findone/${id}`)
    // const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return res.data.data
  }
)
export const updateAksesKontrol: any = createAsyncThunk(
  'hakAksesKontrol/updateAksesKontrol',
  async (thunkAPI) => {
    const res = await axios.get(`${API_URL}/manajemen-pengguna/akses-kontrol/find-all`)

    return res.data.data
  }
)
export const updateModulPermission: any = createAsyncThunk(
  'hakAksesKontrol/updateModulPermission',
  async (thunkAPI) => {
    const res = await axios.get(`${API_URL}/manajemen-pengguna/modul-permission/find`)

    return res.data.data
  }
)
export const updateAksesKontrolMapping: any = createAsyncThunk(
  'hakAksesKontrol/updateAksesKontrolMapping',
  async (val: any, thunkAPI) => {
    const [id, objState] = val

    const res = await axios.get(
      `${API_URL}/manajemen-pengguna/akses-kontrol-mapping/filter/{id_hak_akses}?limit=500&offset=1&id_hak_akses=${id}`
    )

    let newMapping = res.data.data
    newMapping.forEach((permission: any) => {
      objState.listAksesKontrol.forEach((item: any) => {
        if (permission.id_akses_kontrol === item.id) {
          permission.id_akses_kontrol = item.modul
        }
      })
    })
    newMapping.forEach((permission: any) => {
      objState.listModulPermission.forEach((item: any) => {
        if (permission.id_permission === item.id) {
          permission.id_permission = item.nama_permission
        }
      })
    })

    return newMapping
  }
)

export const hakAksesKontrolSlice = createSlice({
  name: 'hakAksesKontrol',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateHakAksesByIdData.fulfilled, (state, action) => {
      state.namaHakAkses = action.payload
    })
    builder.addCase(updateAksesKontrol.fulfilled, (state, action) => {
      state.listAksesKontrol = action.payload
    })
    builder.addCase(updateModulPermission.fulfilled, (state, action) => {
      state.listModulPermission = action.payload
    })
    builder.addCase(updateAksesKontrolMapping.fulfilled, (state, action) => {
      state.aksesKontrolMapping = action.payload
    })
  },
  reducers: {
    changedValue: (
      state: HakAksesKontrolState,
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

// Action creators are generated for each case reducer function

export const {changedValue, reset} = hakAksesKontrolSlice.actions

export default hakAksesKontrolSlice.reducer
