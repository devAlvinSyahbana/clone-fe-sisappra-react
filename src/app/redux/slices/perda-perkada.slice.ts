import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import axios from 'axios'
import * as Yup from 'yup'

export const MASTER_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL

export interface PerdaPerkadaState extends Record<string, any> {
    perda_id: number
    perda_judul: string
    perda_pasal: string
    jenis_pelanggaran: string
    jenis_penertiban: string
}

export const initialState: PerdaPerkadaState = {
    list_jenis_pasal: [],
    list_jenis_kegiatan: [],
    list_jenis_penertiban: [],
    list_jenis_pelanggaran: [],
    list_jenis_perda_perkada: [],

    perda_id: 0,
    perda_judul: '',
    perda_pasal: '',
    jenis_pelanggaran: '',
    jenis_penertiban: '',
}

export const createSchemaPerda = [
    Yup.object({
        perda_judul: Yup.string().required().label('Jenis Perda / Perkada'),
        perda_pasal: Yup.string().required().label('Jenis Pasal'),
        jenis_penertiban: Yup.string().required().label('Jenis Penertiban'),
        jenis_pelanggaran: Yup.string().required().label('Jenis Pelanggaran'),
    }),
    Yup.object({}),
]

export const updateJenisPerdaPerkadaList: any = createAsyncThunk(
    'mapPerdaPerkada/updateJenisPerdaPerkadaList',
    async (thunkAPI) => {
        const res = await axios.get(`${MASTER_URL}/jenis-perda-perkada/?$orderby=judul`)
        const data = res.data.data.map((d: any) => ({ label: d.text, value: String(d.value) }))
        return data
    }
)

export const updateJenisPasalList: any = createAsyncThunk(
    'mapPerdaPerkada/updateJenisPasalList',
    async (thunkAPI) => {
        const res = await axios.get(`${MASTER_URL}/jenis-perda-perkada/?$orderby=pasal`)
        const data = res.data.data.map((d: any) => ({ label: d.text, value: String(d.value) }))
        return data
    }
)

export const updateJenisPenertibanList: any = createAsyncThunk(
    'mapPerdaPerkada/updateJenisPenertibanList',
    async (thunkAPI) => {
        const res = await axios.get(`${MASTER_URL}/jenis-perda-perkada/?$orderby=jenis_penertiban`)
        const data = res.data.data.map((d: any) => ({ label: d.text, value: String(d.value) }))
        return data
    }
)

export const updateJenisPelanggaranList: any = createAsyncThunk(
    'mapPerdaPerkada/updateJenisPelanggaranList',
    async (thunkAPI) => {
        const res = await axios.get(`${MASTER_URL}/jenis-perda-perkada/?$orderby=jenis_pelanggaran`)
        const data = res.data.data.map((d: any) => ({ label: d.text, value: String(d.value) }))
        return data
    }
)

export const perdaPerkadaSlice = createSlice({
    name: 'mapPerdaPerkada',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(updateJenisPerdaPerkadaList.fulfilled, (state, action) => {
            state.list_jenis_perda_perkada = action.payload
        })
        builder.addCase(updateJenisPasalList.fulfilled, (state, action) => {
            state.list_jenis_pasal = action.payload
        })
        builder.addCase(updateJenisPenertibanList.fulfilled, (state, action) => {
            state.list_jenis_penertiban = action.payload
        })
        builder.addCase(updateJenisPelanggaranList.fulfilled, (state, action) => {
            state.list_jenis_pelanggaran = action.payload
        })
    },
    reducers: {
        changedValue: (
            state: PerdaPerkadaState,
            action: PayloadAction<{ target: { name: string; value: any } }>
        ) => {
            if (typeof state[action.payload.target.name] === 'number') {
                state[action.payload.target.name] = Number(action.payload.target.value)
            } else {
                state[action.payload.target.name] = action.payload.target.value
            }
        },
        reset: () => initialState,
        editInitialState: (state: PerdaPerkadaState, action: PayloadAction<any>) =>
            (state = action.payload),
    },
})

export const { changedValue, reset, editInitialState } = perdaPerkadaSlice.actions

export default perdaPerkadaSlice.reducer