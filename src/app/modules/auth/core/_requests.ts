import axios from 'axios'
import {AuthModel, UserModel} from './_models'

// const API_URL = process.env.REACT_APP_API_URL

// export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
// export const LOGIN_URL = `${API_URL}/login`
// export const REGISTER_URL = `${API_URL}/register`
// export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL

export const LOGIN_URL = `${API_URL}/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(no_pegawai: string, kata_sandi: string) {
  return axios.post<AuthModel>(LOGIN_URL + '/sign-in', {
    no_pegawai,
    kata_sandi,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(LOGIN_URL + '/verify_token', {
    api_token: token,
  })
}
