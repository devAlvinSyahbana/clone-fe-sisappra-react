import React, { useEffect, useState } from 'react';
import {KontakPICModel} from '../core/_models'
import axios from 'axios'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const KONTAK_PIC_URL = `${API_URL}/kontak-pic`

export function lupaKataSandi() {
  return axios.get<KontakPICModel>(KONTAK_PIC_URL + "/findone-status-pic/1")
}

export function ForgotPassword() {
  const [value, setValue] = useState({nama:"string", telepon:"string"});
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const {data: auth}  = await  lupaKataSandi();

      setValue({
        nama: auth.data.nama,
        telepon: auth.data.telepon,
      })
    }

    fetchData()
      // make sure to catch any error
      .catch(console.error);
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
          <h1 className='text-secondary mb-3 '>Lupa Kata Sandi</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>Untuk melakukan pengaturan ulang kata sandi dapat menghubungi Admin</div>
          {/* end::Link */}

          {/* begin::Link */}
            <div className='text-gray-400  fw-bold fs-1'>{value.nama}</div>
          {/* end::Link */}

          {/* begin::Link */}
            <div className='text-gray-400 fw-bold fs-4'>Nomor:</div>
          {/* end::Link */}

          {/* begin::Link */}
          <div className='text-gray-400  fw-bold fs-1'>{value.telepon}</div>
          {/* end::Link */}
        </div>
      </form>
    </>
  )
}
