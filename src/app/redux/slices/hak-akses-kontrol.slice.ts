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

export const hakAksesKontrolSlice = createSlice({
  name: 'hakAksesKontrol',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateHakAksesByIdData.fulfilled, (state, action) => {
      state.namaHakAkses = action.payload
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
