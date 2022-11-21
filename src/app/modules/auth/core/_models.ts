export interface AuthModel {
  code?: number
  api_token: string
  refreshToken?: string
  no_pegawai?: string
  kata_sandi?: string
  email?: string
}

export interface UserModel {
  data?: any
  token: string
  data_user?: {
    id?: number
    id_pegawai?: string
    no_pegawai?: string
    email?: string
    hak_akses?: number
    status_pengguna?: number
  }
  data_pegawai?: {
    id?: number
    foto?: string
    nama?: string
    no_pegawai?: string
  }
}

export interface KontakPICModel {
  code: string
  message: string
  data: {
    id: number
    email: string
    status_pic: number
  }
}
