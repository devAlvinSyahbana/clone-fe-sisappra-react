export interface JumlahSeluruhSatpol {
  jmlh_seluruh_pegawai_satpol?: number,
  jmlh_seluruh_pns?: number,
  jmlh_seluruh_cpns?: number,
  jmlh_seluruh_non_pns?: number,
  jmlh_seluruh_non_pns_ptt?: number,
  jmlh_seluruh_non_pns_pjlp?: number,
  jmlh_seluruh_ppns_satpolpp?: number,
  jmlh_seluruh_ppns_unit_kerja_lain?: number
}

export interface JumlahSatpolPendidikan {
  list?: [{
    pendidikan?: string,
    jumlah?: number
  }]
  jmlh_keseluruhan?: number,
}

export interface JumlahSatpolGolongan {
  list: [{
    golongan: string,
    jumlah: number
  }]
  jmlh_keseluruhan?: number,
}

export interface JumlahSatpolDiklat {
  diklat_pol_pp_dasar?: number,
  diklat_pol_pp_strutural?: number,
  diklat_pol_pp_ppns?: number,
  diklat_fungsional_pol_pp?: number,
  jmlh_keseluruhan?: number,
}

// Interface Rekapitulasi PPNS
export interface JumlahUnitSKPD {
  skpd?: string,
  jumlah?: number,
}
export interface JumlahPPNS {
  jumlah_ppns?: number,
  satpol_pp?: number,
  skpd_lain?: number,
}

export interface SelectOptionAutoCom {
  readonly value: string
  readonly label: string
}

export interface DataPegawaiJft {
  id?: number,
  nama?: string,
  nip?: string,
  nrk?: number,
  jabatan?: string,
  tempat_tugas?: string
}
