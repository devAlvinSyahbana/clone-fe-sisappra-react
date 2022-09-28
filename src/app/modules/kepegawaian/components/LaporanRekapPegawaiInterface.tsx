export interface JumlahSeluruhSatpol {
  jmlh_seluruh_pegawai_satpol?: number | undefined,
  jmlh_seluruh_pns?: number,
  jmlh_seluruh_cpns?: number,
  jmlh_seluruh_non_pns?: number,
  jmlh_seluruh_non_pns_ptt?: number,
  jmlh_seluruh_non_pns_pjlp?: number,
  jmlh_seluruh_ppns_satpolpp?: number,
  jmlh_seluruh_ppns_unit_kerja_lain?: number
}

export interface JumlahSatpolDiklat {
  diklat_pol_pp_dasar?: number,
  diklat_pol_pp_strutural?: number,
  diklat_pol_pp_ppns?: number,
  diklat_fungsional_pol_pp?: number
}