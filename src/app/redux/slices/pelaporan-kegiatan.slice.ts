import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
  ThunkAction,
} from '@reduxjs/toolkit'
import * as Yup from 'yup'
import axios from 'axios'

export const MASTER_URL = process.env.REACT_APP_SISAPPRA_MASTERDATA_API_URL

export interface PelaporanKegiatanState extends Record<string, any> {
  // value: number
  kegiatan__jenis_kegiatan_id: number
  kegiatan__jumlah_personil: number
  kegiatan__uraian_kegiatan: string
  kegiatan__tanggal: string
  kegiatan__jam_start: string
  kegiatan__jam_end: string
  kegiatan__lokasi: string

  kegiatan__kota_id: number
  // kegiatan__kecamatan_id: number
  // kegiatan__kelurahan_id: number

  tindak_lanjut__administrasi__jenis_pasal_id: number
  // tindak_lanjut__administrasi__jenis_penertiban: string
  // tindak_lanjut__administrasi__jenis_pelanggaran: string
  // tindak_lanjut__administrasi__perda_perkada: string
  tindak_lanjut__administrasi__penyelesaian_id: number

  // tindak_lanjut__identitas_pelanggar__no_bap: string
  // tindak_lanjut__identitas_pelanggar__nama_penanggung_jawab: string
  // tindak_lanjut__identitas_pelanggar__nama_tempat_usaha: string
  // tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha: string
  // tindak_lanjut__identitas_pelanggar__nik: string
  // tindak_lanjut__identitas_pelanggar__alamat: string
  tindak_lanjut__identitas_pelanggar__jenis_usaha_id: number

  tindak_lanjut__jenis_penindakan_id: number
  tindak_lanjut__jumlah_pelanggar: number
  // tindak_lanjut__jumlah_penindakan: number
  // tindak_lanjut__denda__non_pengadilan: number
  // tindak_lanjut__denda__tanggal_setor: string
  // tindak_lanjut__denda__nama_bank: string
  // tindak_lanjut__denda__no_validasi_bank: string
}

export const initialState: PelaporanKegiatanState = {
  // value: 0,
  list_jenis_kegiatan: [],
  list_jenis_asal_laporan: [],
  list_jenis_pengamanan: [],
  list_detail_jenis_pasal: [],
  list_detail_jenis_pasal_kegiatan: [],
  list_detail_jenis_pasal_penyelesaian: [],
  list_jenis_pasal: [],
  list_jenis_penindakan: [],
  list_jenis_penyelesaian: [],
  list_jenis_usaha: [],
  list_jenis_proses_khusus: [],
  list_jenis_pelanggaran_bangunan: [],

  filter_jenis_kegiatan_id: 0,

  kegiatan__kota_id: 0,
  // kegiatan__kecamatan_id: 0,
  // kegiatan__kelurahan_id: 0,

  kegiatan__jenis_kegiatan_id: 0,
  kegiatan__jumlah_personil: 0,
  kegiatan__uraian_kegiatan: '',
  kegiatan__tanggal: '',
  kegiatan__jam_start: '',
  kegiatan__jam_end: '',
  kegiatan__lokasi: '',
  // kegiatan__asal_laporan_selection: [],
  kegiatan__asal_laporan_id: 0,
  // kegiatan__jenis_pengamanan_selection: [],
  kegiatan__jenis_pengamanan_id: 0,
  // kegiatan__masalah: '',
  // kegiatan__pemecahan_masalah: '',
  // kegiatan__instansi_terkait: '',

  tindak_lanjut__administrasi__jenis_pasal_id: 0,
  tindak_lanjut__administrasi__jenis_penertiban: '',
  tindak_lanjut__administrasi__jenis_pelanggaran: '',
  tindak_lanjut__administrasi__perda_perkada: '',
  tindak_lanjut__administrasi__penyelesaian_id: 0,
  tindak_lanjut__administrasi__penyelesaian_khusus_id: 0,

  tindak_lanjut__identitas_pelanggar__no_bap: '',
  tindak_lanjut__identitas_pelanggar__nama_penanggung_jawab: '',
  tindak_lanjut__identitas_pelanggar__nama_pemilik: '',
  tindak_lanjut__identitas_pelanggar__nama_tempat_usaha: '',
  tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha: '',
  tindak_lanjut__identitas_pelanggar__nik: '',
  tindak_lanjut__identitas_pelanggar__alamat: '',
  tindak_lanjut__identitas_pelanggar__jenis_usaha_id: 0,
  tindak_lanjut__identitas_pelanggar__luas_bongkaran: 0,

  tindak_lanjut__jenis_penindakan_id: 0,
  tindak_lanjut__jumlah_pelanggar: 0,
  // tindak_lanjut__sidang__tanggal: '',
  tindak_lanjut__sidang__jumlah_pelanggar_hadir: 0,
  tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir: 0,
  tindak_lanjut__sidang__jumlah_pelanggar_verstek: 0,
  // tindak_lanjut__jumlah_penindakan: 0,
  tindak_lanjut__denda__pengadilan: 0,
  tindak_lanjut__denda__non_pengadilan: 0,
  // tindak_lanjut__denda__tanggal_setor: '',
  tindak_lanjut__denda__nama_bank: '',
  tindak_lanjut__denda__no_validasi_bank: '',

  tindak_lanjut__rekom_citata__jenis_pelanggaran_id: 0,
  tindak_lanjut__rekom_citata__no_sp: '',
  // tindak_lanjut__rekom_citata__tanggal_no_sp: '',
  tindak_lanjut__rekom_citata__no_segel: '',
  // tindak_lanjut__rekom_citata__tanggal_segel: '',
  tindak_lanjut__rekom_citata__no_spb: '',
  // tindak_lanjut__rekom_citata__tanggal_spb: '',
  tindak_lanjut__rekom_citata__no_rekomtek: '',
  // tindak_lanjut__rekom_citata__tanggal_rekomtek: '',
  // tindak_lanjut__rekom_citata__tanggal_peninjauan_lapangan: '',

  tindak_lanjut__jumlah_minol_merk: [],

  dokumentasi: [
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

export const createSchemaFilterPelaporanKegiatan = [
  Yup.object({
    filter_jenis_kegiatan_id: Yup.number().integer().moreThan(0).label('Jenis Kegiatan'),
    filter_jenis_kegiatan_id_selection: Yup.object(),
  }),
]

export const createSchemaPelaporanKegiatan = [
  Yup.object({
    kegiatan__jenis_kegiatan_id: Yup.number()
      .integer()
      .required()
      .label('Jenis Kegiatan'),
    kegiatan__jenis_kegiatan_selection: Yup.object().required(),
    kegiatan__kota_id: Yup.number().integer().moreThan(0).required().label('Kota'),
    kota_selection: Yup.object().required(),
    // kegiatan__kecamatan_id: Yup.number().integer().moreThan(0).required().label('Kecamatan'),
    // kecamatan_selection: Yup.object().required(),
    // kegiatan__kelurahan_id: Yup.number().integer().moreThan(0).required().label('Kelurahan'),
    // kegiatan_selection: Yup.object().required(),
    kegiatan__jumlah_personil: Yup.number()
      .integer()
      .moreThan(0)
      .required()
      .label('Jumlah Personil'),
    kegiatan__uraian_kegiatan: Yup.string().min(10).max(1000).required().label('Uraian Kegiatan'),
    kegiatan__tanggal: Yup.date().required().label('Tanggal Kegiatan'),
    kegiatan__jam_start: Yup.string().required().label('Waktu Kegiatan'),
    kegiatan__jam_end: Yup.string().required().label('Waktu Kegiatan'),
    kegiatan__lokasi: Yup.string().min(3).max(64).required().label('Lokasi Kegiatan'),

    kegiatan__asal_laporan_id: Yup.number().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'LAPORAN MASYARAKAT',
      then: Yup.number().notRequired(),
      otherwise: Yup.number().integer().moreThan(0).required().label('Laporan Masyarakat'),
    }),
    kegiatan__asal_laporan_selection: Yup.object().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'LAPORAN MASYARAKAT',
      then: Yup.object().notRequired(),
      otherwise: Yup.object().required(),
    }),
    kegiatan__jenis_pengamanan_id: Yup.number().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'PENGAMANAN',
      then: Yup.number().notRequired(),
      otherwise: Yup.number().integer().moreThan(0).required().label('Jenis Pengamanan'),
    }),
    kegiatan__jenis_pengamanan_selection: Yup.object().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'PENGAMANAN',
      then: Yup.object().notRequired(),
      otherwise: Yup.object().required(),
    }),
    kegiatan__masalah: Yup.string().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'PENGAMANAN',
      then: Yup.string().notRequired(),
      otherwise: Yup.string().min(5).max(500).required().label('Uraian Masalah'),
    }),
    kegiatan__pemecahan_masalah: Yup.string().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'PENGAMANAN',
      then: Yup.string().notRequired(),
      otherwise: Yup.string().min(10).max(1000).required().label('Uraian Pemecahan Masalah'),
    }),
    kegiatan__instansi_terkait: Yup.string().when('kegiatan__jenis_kegiatan_selection', {
      is: (val: any) => val?.label !== 'PENGAMANAN',
      then: Yup.string().notRequired(),
      otherwise: Yup.string().min(2).max(32).required().label('Instansi Terkait'),
    }),

    // tindak_lanjut__administrasi__jenis_pasal_id: Yup.number().when(
    //   'kegiatan__jenis_kegiatan_selection',
    //   {
    //     is: (val: any) => NoPasalPenyelesaian.includes(val?.label),
    //     then: Yup.number().notRequired(),
    //     otherwise: Yup.number().integer().notRequired().label('Jenis Pasal'),
    //   }
    // ),
    // tindak_lanjut__administrasi__jenis_pasal_selection: Yup.object().when(
    //   'kegiatan__jenis_kegiatan_selection',
    //   {
    //     is: (val: any) => NoPasalPenyelesaian.includes(val?.label),
    //     then: Yup.object().notRequired(),
    //     otherwise: Yup.object().notRequired(),
    //   }
    // ),
    // tindak_lanjut__administrasi__jenis_penertiban: Yup.string()
    //   .min(3)
    //   .max(256)
    //   .notRequired()
    //   .label('Jenis Penertiban'),
    // tindak_lanjut__administrasi__jenis_pelanggaran: Yup.string()
    //   .min(3)
    //   .max(256)
    //   .notRequired()
    //   .label('Jenis Pelanggaran'),
    // tindak_lanjut__administrasi__perda_perkada: Yup.string()
    //   .min(3)
    //   .max(256)
    //   .notRequired()
    //   .label('Perda Perkada'),

    // tindak_lanjut__administrasi__penyelesaian_id: Yup.number().notRequired(),
    // tindak_lanjut__administrasi__penyelesaian_selection: Yup.object(),
    // tindak_lanjut__administrasi__penyelesaian_khusus_id: Yup.number().when(
    //   'kegiatan__jenis_kegiatan_selection',
    //   {
    //     is: (val: any) => val?.label !== 'SIDANG TIPIRING',
    //     then: Yup.number().notRequired(),
    //     otherwise: Yup.number().integer().notRequired().label('Proses Khusus'),
    //   }
    // ),
    // tindak_lanjut__administrasi__penyelesaian_khusus_selection: Yup.object(),

    // tindak_lanjut__identitas_pelanggar__no_bap: Yup.string().max(32).notRequired().label('NO BAP'),
    // tindak_lanjut__identitas_pelanggar__nama_penanggung_jawab: Yup.string()
    //   .max(64)
    //   .notRequired()
    //   .label('Nama Penanggung Jawab'),
    // tindak_lanjut__identitas_pelanggar__nama_tempat_usaha: Yup.string()
    //   .max(64)
    //   .notRequired()
    //   .label('Nama Tempat Usaha'),
    // tindak_lanjut__identitas_pelanggar__alamat_tempat_usaha: Yup.string()
    //   .max(256)
    //   .notRequired()
    //   .label('Alamat Tempat Usaha'),
    // tindak_lanjut__identitas_pelanggar__nik: Yup.string()
    //   .max(32)
    //   .notRequired()
    //   .label('NIK/Pasport Pelanggar'),
    // tindak_lanjut__identitas_pelanggar__alamat: Yup.string()
    //   .max(128)
    //   .notRequired()
    //   .label('Alamat Pelanggar'),
    // tindak_lanjut__identitas_pelanggar__jenis_usaha_id: Yup.number().when(
    //   'kegiatan__jenis_kegiatan_selection',
    //   {
    //     is: (val: any) =>
    //       val?.label === 'APEL' ||
    //       val?.label === 'RAPAT' ||
    //       val?.label === 'PENERTIBAN MINUMAN BERALKOHOL',
    //     then: Yup.number().notRequired(),
    //     otherwise: Yup.number().integer().notRequired().label('Jenis Usaha'),
    //   }
    // ),
    // tindak_lanjut__identitas_pelanggar__jenis_usaha_selection: Yup.object(),
    // tindak_lanjut__identitas_pelanggar__luas_bongkaran: Yup.number().when(
    //   'kegiatan__jenis_kegiatan_selection',
    //   {
    //     is: (val: any) => val?.label !== 'PENERTIBAN BANGUNAN',
    //     then: Yup.number().notRequired(),
    //     otherwise: Yup.number().integer().notRequired().label('Luas Bongkaran'),
    //   }
    // ),

    // tindak_lanjut__jenis_penindakan_id: Yup.number().when('kegiatan__jenis_kegiatan_selection', {
    //   is: (val: any) => NoPenindakan.includes(val?.label),
    //   then: Yup.number().notRequired(),
    //   otherwise: Yup.number().integer().notRequired().label('Penindakan'),
    // }),
    // tindak_lanjut__jenis_penindakan_selection: Yup.object(),

    // tindak_lanjut__jumlah_pelanggar: Yup.number().when('kegiatan__jenis_kegiatan_selection', {
    //   is: (val: any) =>
    //     NoPenindakan.includes(val?.label) || val?.label === 'PENERTIBAN MINUMAN BERALKOHOL',
    //   then: Yup.number().notRequired(),
    //   otherwise: Yup.number().integer().notRequired().label('Jumlah Pelanggar'),
    // }),

    // tindak_lanjut__sidang__tanggal: Yup.date().when('kegiatan__jenis_kegiatan_selection', {
    //   is: (val: any) => val?.label !== 'SIDANG TIPIRING',
    //   then: Yup.date().notRequired(),
    //   otherwise: Yup.date().notRequired().label('Tanggal Sidang'),
    // }),
    // tindak_lanjut__sidang__jumlah_pelanggar_hadir: Yup.number().when(
    //   'kegiatan__jenis_kegiatan_selection',
    //   {
    //     is: (val: any) => val?.label !== 'SIDANG TIPIRING',
    //     then: Yup.number().notRequired(),
    //     otherwise: Yup.number().integer().notRequired().label('Jumlah Pelanggar Hadir'),
    //   }
    // ),
    // tindak_lanjut__sidang__jumlah_pelanggar_tidak_hadir: Yup.number().when(
    //   'kegiatan__jenis_kegiatan_selection',
    //   {
    //     is: (val: any) => val?.label !== 'SIDANG TIPIRING',
    //     then: Yup.number().notRequired(),
    //     otherwise: Yup.number().integer().notRequired().label('Jumlah Pelanggar Tidak Hadir'),
    //   }
    // ),
    // tindak_lanjut__sidang__jumlah_pelanggar_verstek: Yup.number().when(
    //   'kegiatan__jenis_kegiatan_selection',
    //   {
    //     is: (val: any) => val?.label !== 'SIDANG TIPIRING',
    //     then: Yup.number().notRequired(),
    //     otherwise: Yup.number().integer().notRequired().label('Jumlah Pelanggar Verstek'),
    //   }
    // ),

    // tindak_lanjut__denda__pengadilan: Yup.number()
    //   .integer()
    //   .notRequired()
    //   .label('Jumlah Denda Pengadilan'),
    // tindak_lanjut__denda__non_pengadilan: Yup.number()
    //   .integer()
    //   .notRequired()
    //   .label('Jumlah Denda Non Pengadilan'),
    // tindak_lanjut__denda__tanggal_setor: Yup.date().notRequired().label('Tanggal Setor Denda'),
    // tindak_lanjut__denda__nama_bank: Yup.string().min(3).max(64).notRequired().label('Nama Bank'),
    // tindak_lanjut__denda__no_validasi_bank: Yup.string()
    //   .min(3)
    //   .max(32)
    //   .notRequired()
    //   .label('No Validasi Bank'),

    // tindak_lanjut__rekom_citata__jenis_pelanggaran_id: Yup.number().when(
    //   'kegiatan__jenis_kegiatan_selection',
    //   {
    //     is: (val: any) => val?.label !== 'PENERTIBAN BANGUNAN',
    //     then: Yup.number().notRequired(),
    //     otherwise: Yup.number().integer().notRequired().label('Jenis Pelanggaran'),
    //   }
    // ),
    // tindak_lanjut__rekom_citata__jenis_pelanggaran_selection: Yup.object(),
  }),
  Yup.object({}),
]

const NoPasalPenyelesaian = [
  'APEL',
  'RAPAT',
  'PENGATURAN LALU LINTAS',
  'PENGAWALAN',
  'SOSIALISASI P4GN(NARKOBA)',
  'SOSIALISASI PERDA / PERKADA',
  'PENERTIBAN MINUMAN BERALKOHOL',
]

const NoPenindakan = ['PENERTIBAN BANGUNAN', 'SIDANG TIPIRING', 'APEL', 'RAPAT']

export const updateJenisKegiatanList: any = createAsyncThunk(
  'pelaporanKegiatan/updateJenisKegiatanList',
  async (thunkAPI) => {
    const res = await axios.get(`${MASTER_URL}/jenis-kegiatan/combobox?$orderby=nama`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)

export const updateKotaList: any = createAsyncThunk(
  'pelaporanKegiatan/updateKotaList',
  async (thunkAPI) => {
    const res = await axios.get(`${MASTER_URL}/kota/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)
// export const updateKecamatanList: any = createAsyncThunk(
//   'pelaporanKegiatan/updateKecamatanList',
//   async (thunkAPI) => {
//     const res = await axios.get(
//       `${MASTER_URL}/kecamatan/?%24top=100&%24select=id%2C%20nama%2C%20kode%2C%20kode_kota`
//     )
//     const data = res.data.data.map((d: any) => ({
//       label: d.nama,
//       value: String(d.id),
//       kodeKota: d.kode_kota,
//     }))
//     return data
//   }
// )
// export const updateKelurahanList: any = createAsyncThunk(
//   'pelaporanKegiatan/updateKelurahanList',
//   async () => {
//     const res = await axios.get(
//       `${MASTER_URL}/kelurahan/?%24top=300&%24select=id%2C%20nama%2C%20kode%2C%20kode_kecamatan`
//     )
//     const data = res.data.data.map((d: any) => ({
//       label: d.nama,
//       value: String(d.id),
//       kodeKecamatan: d.kode_kecamatan,
//     }))
//     return data
//   }
// )

export const updateJenisAsalLaporanList: any = createAsyncThunk(
  'pelaporanKegiatan/updateJenisAsalLaporanList',
  async (thunkAPI) => {
    const res = await axios.get(`${MASTER_URL}/jenis-asal-laporan/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)
export const updateJenisPengamananList: any = createAsyncThunk(
  'pelaporanKegiatan/updateJenisPengamananList',
  async (thunkAPI) => {
    const res = await axios.get(`${MASTER_URL}/jenis-pengamanan/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))
    return data
  }
)
export const updateDetailJenisPasalList: any = createAsyncThunk(
  'pelaporanKegiatan/updateDetailJenisPasalList',
  async (thunkAPI) => {
    const res = await axios.get(`${MASTER_URL}/jenis-perda-perkada/?%24top=300`)

    return res.data.data
  }
)
export const updateDetailJenisPasalKegiatanList: any = createAsyncThunk(
  'pelaporanKegiatan/updateDetailJenisPasalKegiatanList',
  async (val: any, thunkAPI) => {
    const [objKegiatan, objState] = val
    const jenisKegiatan = objKegiatan
    const reduxState = objState.list_detail_jenis_pasal
    const res = await axios.get(
      `${MASTER_URL}/map-master-perda/jenis-kegiatan?%24filter=jenis_kegiatan_id%20eq%20${jenisKegiatan}&%24top=300`
    )

    let filteredArr = reduxState.filter((obj1: any) =>
      res.data.data.some((obj2: any) => obj2.perda_id === obj1.id)
    )
    const data = filteredArr.map((d: any) => ({
      label: d.pasal + " (" + d.judul + ")",
      value: String(d.id),
      penertiban: d.jenis_penertiban,
      pelanggaran: d.jenis_pelanggaran,
      perda: d.judul,
    }))

    return data
  }
)

export const updateDetailJenisPasalPenyelesaianList: any = createAsyncThunk(
  'pelaporanKegiatan/updateDetailJenisPasalPenyelesaianList',
  async (val: any, thunkAPI) => {
    const [jenisPasal, objState] = val
    const reduxState = objState.list_jenis_penyelesaian
    const res = await axios.get(
      `${MASTER_URL}/map-master-perda/jenis-penyelesaian?%24filter=perda_id%20eq%20${jenisPasal}&%24top=100`
    )

    let filteredArr = reduxState.filter((obj1: any) =>
      res.data.data.some((obj2: any) => obj2.jenis_penyelesaian_id === obj1.id)
    )
    const data = filteredArr.map((d: any) => ({label: d.nama, value: String(d.id)}))

    return data
  }
)

export const updateJenisPenyelesaianList: any = createAsyncThunk(
  'pelaporanKegiatan/updateJenisPenyelesaianList',
  async (thunkAPI) => {
    const res = await axios.get(`${MASTER_URL}/jenis-penyelesaian/?%24top=40&%24select=nama%2C%20id`)

    return res.data.data
  }
)
export const updateJenisPenindakanList: any = createAsyncThunk(
  'pelaporanKegiatan/updateJenisPenindakanList',
  async (thunkAPI) => {
    const res = await axios.get(`${MASTER_URL}/jenis-penindakan/combobox`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))

    return data
  }
)
export const updateJenisUsahaList: any = createAsyncThunk(
  'pelaporanKegiatan/updateJenisUsahaList',
  async (thunkAPI) => {
    const res = await axios.get(`${MASTER_URL}/jenis-usaha/combobox?%24orderby=nama
`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))

    return data
  }
)
export const updateJenisProsesKhusus: any = createAsyncThunk(
  'pelaporanKegiatan/updateJenisProsesKhusus',
  async (thunkAPI) => {
    const res = await axios.get(`${MASTER_URL}/jenis-proses-khusus/combobox?%24orderby=nama
`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))

    return data
  }
)
export const updateJenisPelanggaranBangunan: any = createAsyncThunk(
  'pelaporanKegiatan/updateJenisPelanggaranBangunan',
  async (thunkAPI) => {
    const res = await axios.get(`${MASTER_URL}/jenis-pelanggaran-bangunan/combobox?%24orderby=nama
`)
    const data = res.data.data.map((d: any) => ({label: d.text, value: String(d.value)}))

    return data
  }
)

export const pelaporanKegiatanSlice = createSlice({
  name: 'pelaporanKegiatan',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateJenisKegiatanList.fulfilled, (state, action) => {
      state.list_jenis_kegiatan = action.payload
    })
    builder.addCase(updateKotaList.fulfilled, (state, action) => {
      state.list_kota = action.payload
    })
    // builder.addCase(updateKecamatanList.fulfilled, (state, action) => {
    //   state.list_kecamatan = action.payload
    // })
    // builder.addCase(updateKelurahanList.fulfilled, (state, action) => {
    //   state.list_kelurahan = action.payload
    // })
    builder.addCase(updateJenisAsalLaporanList.fulfilled, (state, action) => {
      state.list_jenis_asal_laporan = action.payload
    })
    builder.addCase(updateJenisPengamananList.fulfilled, (state, action) => {
      state.list_jenis_pengamanan = action.payload
    })
    builder.addCase(updateDetailJenisPasalList.fulfilled, (state, action) => {
      state.list_detail_jenis_pasal = action.payload
    })
    builder.addCase(updateDetailJenisPasalKegiatanList.fulfilled, (state, action) => {
      state.list_detail_jenis_pasal_kegiatan = action.payload
    })
    builder.addCase(updateDetailJenisPasalPenyelesaianList.fulfilled, (state, action) => {
      state.list_detail_jenis_pasal_penyelesaian = action.payload
    })
    builder.addCase(updateJenisPenyelesaianList.fulfilled, (state, action) => {
      state.list_jenis_penyelesaian = action.payload
    })
    builder.addCase(updateJenisPenindakanList.fulfilled, (state, action) => {
      state.list_jenis_penindakan = action.payload
    })
    builder.addCase(updateJenisUsahaList.fulfilled, (state, action) => {
      state.list_jenis_usaha = action.payload
    })
    builder.addCase(updateJenisProsesKhusus.fulfilled, (state, action) => {
      state.list_jenis_proses_khusus = action.payload
    })
    builder.addCase(updateJenisPelanggaranBangunan.fulfilled, (state, action) => {
      state.list_jenis_pelanggaran_bangunan = action.payload
    })
  },
  reducers: {
    changedValue: (
      state: PelaporanKegiatanState,
      action: PayloadAction<{target: {name: string; value: any}}>
    ) => {
      if (typeof state[action.payload.target.name] === 'number') {
        state[action.payload.target.name] = Number(action.payload.target.value)
      } else {
        state[action.payload.target.name] = action.payload.target.value
      }
    },
    reset: () => initialState,
    editInitialState: (state: PelaporanKegiatanState, action: PayloadAction<any>) =>
      (state = action.payload),
  },
})

// export const {reset} = pelaporanKegiatanSlice.actions

// Action creators are generated for each case reducer function

// lAPORAN MASYARAKAT bukan jumlah pelanggar tapi jumlah penindakan

//  !== jenis usaha
// PENERTIBAN MINUMAN BERALKOHOL
//  !== penindakan
// PENERTIBAN BANGUNAN, SIDANG TIPIRING
//  !== pasal id
// APEL, RAPAT, PENGATURAN LALU LINTAS, PENGAWALAN, SOSIALISASI P4GN (NARKOBA), SOSIALISASI PERDA/PERKADA
//  !== penyelesaian
// APEL, RAPAT, PENGATURAN LALU LINTAS, PENGAWALAN, SOSIALISASI P4GN (NARKOBA), SOSIALISASI PERDA/PERKADA

export const isTipiring = (formikValues: any) =>
  formikValues.kegiatan__jenis_kegiatan_selection?.label === 'SIDANG TIPIRING'
export const isLaporanMasyarakat = (formikValues: any) =>
  formikValues.kegiatan__jenis_kegiatan_selection?.label === 'LAPORAN MASYARAKAT'
export const isPPKM = (formikValues: any) =>
  formikValues.kegiatan__jenis_kegiatan_selection?.label === 'KEGIATAN PPKM'
export const isPengamanan = (formikValues: any) =>
  formikValues.kegiatan__jenis_kegiatan_selection?.label === 'PENGAMANAN'
export const isPenertibanBangunan = (formikValues: any) =>
  formikValues.kegiatan__jenis_kegiatan_selection?.label === 'PENERTIBAN BANGUNAN'
export const isPenertibanMinol = (formikValues: any) =>
  formikValues.kegiatan__jenis_kegiatan_selection?.label === 'PENERTIBAN MINUMAN BERALKOHOL'
export const isApelRapat = (formikValues: any) =>
  formikValues.kegiatan__jenis_kegiatan_selection?.label === 'APEL' ||
  formikValues.kegiatan__jenis_kegiatan_selection?.label === 'RAPAT'

export const {changedValue, reset, editInitialState} = pelaporanKegiatanSlice.actions

export default pelaporanKegiatanSlice.reducer
