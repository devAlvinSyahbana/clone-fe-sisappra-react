import {configureStore} from '@reduxjs/toolkit'
import pelaporanKegiatanReducer from './slices/pelaporan-kegiatan.slice'
import pelaporanKejadianReducer from './slices/pelaporan-kejadian.slice'
import pelaporanPengawasanReklameReducer from './slices/pelaporan-pengawasan-reklame.slice'
import pelaporanTamuDaerahReducer from './slices/pelaporan-tamu-daerah.slice'

export const store = configureStore({
  reducer: {
    pelaporanKegiatan: pelaporanKegiatanReducer,
    pelaporanKejadian: pelaporanKejadianReducer,
    pelaporanPengawasan: pelaporanPengawasanReklameReducer,
    pelaporanTamuDaerah: pelaporanTamuDaerahReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
