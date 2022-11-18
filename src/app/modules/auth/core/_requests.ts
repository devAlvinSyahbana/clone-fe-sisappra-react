import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL

export const LOGIN_URL = `${API_URL}/login`
// export const REGISTER_URL = `${API_URL}/login`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(no_pegawai: string, kata_sandi: string) {
  return axios.post<AuthModel>(LOGIN_URL + '/sign-in', {
    no_pegawai,
    kata_sandi,
  })
}

export function register(no_pegawai: string, kata_sandi: string, email: string) {
  return axios.post<AuthModel>(LOGIN_URL + '/create', {
    no_pegawai,
    kata_sandi,
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(LOGIN_URL + '/verify_token', {
    api_token: token,
  })
}
