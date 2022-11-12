import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PelaporanState {
    value: number,
    jenis_kegiatan_list: Array<{label: string, value: string}>,
    kegiatan__jenis_kegiatan_id: number,
    kegiatan__jumlah_personil: number,
    kegiatan__uraian_kegiatan: string,
    kegiatan__tanggal: string,
    kegiatan__jam: string,
    kegiatan__lokasi: string,

    tindak_lanjut__administrasi__jenis_pasal_id: number,
    tindak_lanjut__administrasi__jenis_penertiban: string,
    tindak_lanjut__administrasi__jenis_pelanggaran: string,
    tindak_lanjut__administrasi__perda_perkada: string,
    tindak_lanjut__administrasi__penyelesaian_id: number,

    tindak_lanjut__identitas_pelanggar__no_bap: string,
    tindak_lanjut__identitas_pelanggar__nama_penanggung_jawab: string,
    tindak_lanjut__identitas_pelanggar__nama_tempat_usaha: string,
    tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha: string,
    tindak_lanjut__identitas_pelanggar__nik: string,
    tindak_lanjut__identitas_pelanggar__alamat: string,
    tindak_lanjut__identitas_pelanggar__jenis_usaha_id: number,

    tindak_lanjut__jenis_penindakan_id: number,
    tindak_lanjut__jumlah_pelanggar: number,
    tindak_lanjut__denda__non_pengadilan: number,
    tindak_lanjut__denda__tanggal_setor: string,
    tindak_lanjut__denda__nama_bank: string,
    tindak_lanjut__denda__no_validasi_bank: string
}

export interface ApiResponse {
    data: any,
    success: boolean
}

const initialState: PelaporanState = {
    value: 0,
    jenis_kegiatan_list: [],
    kegiatan__jenis_kegiatan_id: 0,
    kegiatan__jumlah_personil: 1,
    kegiatan__uraian_kegiatan: "",
    kegiatan__tanggal: "2022-01-23",
    kegiatan__jam: "20:20:39+00:00",
    kegiatan__lokasi: "",

    tindak_lanjut__administrasi__jenis_pasal_id: 81,
    tindak_lanjut__administrasi__jenis_penertiban: "",
    tindak_lanjut__administrasi__jenis_pelanggaran: "",
    tindak_lanjut__administrasi__perda_perkada: "",
    tindak_lanjut__administrasi__penyelesaian_id: 52,

    tindak_lanjut__identitas_pelanggar__no_bap: "3232323",
    tindak_lanjut__identitas_pelanggar__nama_penanggung_jawab: "3232323",
    tindak_lanjut__identitas_pelanggar__nama_tempat_usaha: "3232323",
    tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha: "3232323",
    tindak_lanjut__identitas_pelanggar__nik: "3232323",
    tindak_lanjut__identitas_pelanggar__alamat: "3232323",
    tindak_lanjut__identitas_pelanggar__jenis_usaha_id: 2,

    tindak_lanjut__jenis_penindakan_id: 1,
    tindak_lanjut__jumlah_pelanggar: 1,
    tindak_lanjut__denda__non_pengadilan: 50000,
    tindak_lanjut__denda__tanggal_setor: "2022-11-01",
    tindak_lanjut__denda__nama_bank: "BCA",
    tindak_lanjut__denda__no_validasi_bank: "23423423",
}

export const pelaporanKegiatanSlice = createSlice({
    name: 'pelaporanKegiatan',
    initialState,
    reducers: {
        setJenisKegiatanList: (state: PelaporanState, action:PayloadAction<Array<{label: string, value: string}>>)  => {
            state.jenis_kegiatan_list = action.payload
        },
        jenisKegiatanIdChanged: (state: PelaporanState, action:PayloadAction<string | undefined>) => {
            state.kegiatan__jenis_kegiatan_id = Number(action.payload)
        },
        jumlahPersonilChanged: (state: PelaporanState, action:PayloadAction<number>) => {
            state.kegiatan__jumlah_personil = action.payload
        },
        uraianKegiatanChanged: (state: PelaporanState, action:PayloadAction<string>) => {
            state.kegiatan__uraian_kegiatan = action.payload
        },
        increment: (state: PelaporanState) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state: PelaporanState) => {
            state.value -= 1
        },
        incrementByAmount: (state: PelaporanState, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setJenisKegiatanList, jenisKegiatanIdChanged, jumlahPersonilChanged, uraianKegiatanChanged } = pelaporanKegiatanSlice.actions

export default pelaporanKegiatanSlice.reducer