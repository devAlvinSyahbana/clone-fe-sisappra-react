export interface DetailPegawaiInterface {
  id?: number
  nama?: string
  tempat_lahir?: string
  tgl_lahir?: string | undefined
  jenis_kelamin?: any
  jenis_kelamin_value?: any
  agama_id?: string
  agama_name?: string
  agama?: any
  nik?: string
  no_kk?: string
  status_perkawinan?: any
  no_hp?: string
  sesuai_ktp_alamat?: string
  sesuai_ktp_rtrw?: string
  sesuai_ktp_provinsi?: any
  sesuai_ktp_kabkota?: any
  sesuai_ktp_kecamatan?: any
  sesuai_ktp_kelurahan?: any
  domisili_alamat?: string
  domisili_rtrw?: string
  domisili_provinsi?: any
  domisili_kabkota?: any
  domisili_kecamatan?: any
  domisili_kelurahan?: any
  kepegawaian_nrk?: string
  kepegawaian_nip?: string
  kepegawaian_golongan?: any
  kepegawaian_golongan_id?: any
  kepegawaian_tmtpangkat?: string
  kepegawaian_pendidikan_pada_sk?: any
  kepegawaian_pendidikan_pada_sk_id?: any
  kepegawaian_jabatan?: any
  kepegawaian_jabatan_id?: any
  kepegawaian_eselon?: any
  kepegawaian_eselon_id?: any
  kepegawaian_tempat_tugas?: string
  kepegawaian_subbag_seksi_kecamatan?: string
  kepegawaian_status_pegawai?: string
  kepegawaian_no_rekening?: string
  kepegawaian_no_karpeg?: string
  kepegawaian_no_kasirkasur?: string
  kepegawaian_no_taspen?: string
  kepegawaian_npwp?: string
  kepegawaian_no_bpjs_askes?: string
  kepegawaian_tmt_cpns?: string
  kepegawaian_sk_cpns?: string
  kepegawaian_tmt_pns?: string
  kepegawaian_tgl_sk_pns?: string | undefined
  kepegawaian_sk_pns?: string
  kepegawaian_no_sk_pangkat_terakhir?: string
  kepegawaian_tgl_sk_pangkat_terakhir?: string | undefined
  kepegawaian_sk_pangkat_terakhir?: string
  kepegawaian_diklat_pol_pp_dasar?: string
  kepegawaian_diklat_pol_pp_dasar_no_sertifikat?: string
  kepegawaian_diklat_pol_pp_dasar_tgl_sertifikat?: string | undefined
  kepegawaian_diklat_pol_pp_dasar_file_sertifikat?: string
  kepegawaian_diklat_pol_pp_strutural?: string
  kepegawaian_diklat_pol_pp_strutural_no_sertifikat?: string
  kepegawaian_diklat_pol_pp_strutural_tgl_sertifikat?: string
  kepegawaian_diklat_pol_pp_strutural_file_sertifikat?: string
  kepegawaian_diklat_pol_pp_ppns?: string
  kepegawaian_diklat_pol_pp_ppns_no_sertifikat?: string
  kepegawaian_diklat_pol_pp_ppns_tgl_sertifikat?: string | undefined
  kepegawaian_diklat_pol_pp_ppns_file_sertifikat?: string
  kepegawaian_diklat_fungsional_pol_pp?: string
  kepegawaian_diklat_fungsional_pol_pp_no_sertifikat?: string
  kepegawaian_diklat_fungsional_pol_pp_tgl_sertifikat?: string | undefined
  kepegawaian_diklat_fungsional_pol_pp_file_sertifikat?: string
  foto?: string
  kepegawaian_pangkat?: any
  kepegawaian_pangkat_id?: string
  kepegawaian_pangkat_name?: string
  kepegawaian_kelurahan?: string
}

export interface JumlahKeluargaInterface {
  total?: number
}

export interface PendidikanInterface {
  jenis_pendidikan?: string
}

export interface SelectOptionAutoCom {
  readonly value: string
  readonly label: string
}

export interface ListPendidikanInterface {
  id?: number
  hubungan?: string
  nama?: string
  tempat_lahir?: string
  tgl_lahir?: string
  jenis_kelamin?: string
}

export interface DetailMasterJabatan {
  id?: number
  jabatan?: string
  kode?: string
  status?: string
}
