import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {KontakPICModel} from '../core/_models'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KONTAK_PIC_URL = `${API_URL}/kontak-pic`

export function lupaKataSandi() {
  return axios.get<KontakPICModel>(KONTAK_PIC_URL + '/findone-status-pic/1')
}

export function ForgotPassword() {
  const [value, setValue] = useState({email: 'string'})
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const {data: auth} = await lupaKataSandi()

      setValue({
        email: auth.data.email,
      })
    }

    fetchData()
      // make sure to catch any error
      .catch(console.error)
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_password_reset_form'
    >
      <div className='text-center mb-10'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>Lupa Password ?</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-500 fw-semibold fs-6'>
          Untuk melakukan pengaturan ulang kata sandi dapat menghubungi Admin melalui email berikut:
        </div>
        {/* end::Link */}
      </div>
      <div className='mb-10 p-8 rounded alert alert-primary text-center'>
        <div className='alert-text font-weight-bold'>
          {value.email && <a href={`mailto:${value.email}`}>{value.email}</a>}
        </div>
      </div>
      <div className='text-center'>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Kembali
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
