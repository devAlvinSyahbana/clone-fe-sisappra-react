import {useState, useEffect} from 'react'
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
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Lupa Kata Sandi ?</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>
            Untuk melakukan pengaturan ulang kata sandi dapat menghubungi Admin melalui email
            berikut:
          </div>
          {/* end::Link */}
        </div>

        {/* begin::Form group */}
        <div className='fv-row mb-10 text-center'>
          {/* begin::Title */}
          <a href={`mailto:${value.email}`}><h1 className='text-dark mb-3'>{value.email}</h1></a>
          {/* end::Title */}
        </div>
        {/* end::Form group */}
      </form>
    </>
  )
}
