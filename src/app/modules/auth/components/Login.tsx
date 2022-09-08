/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {useAuth} from '../core/Auth'

const loginSchema = Yup.object().shape({
  no_pegawai: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  kata_sandi: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('kata_sandi is required'),
})

const initialValues = {
  no_pegawai: '12345',
  kata_sandi: 'qwerty',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await login(values.no_pegawai, values.kata_sandi)
        console.log(auth)
        saveAuth(auth)
        const {data: user} = await getUserByToken(auth.api_token)
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login detail is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-secondary mb-3'>Masuk ke Sisappra</h1>
        <div className='text-gray-400 fw-bold fs-4'>Silahkan masuk menggunakan akun anda</div>
      </div>
      {/* begin::Heading */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-secondary'>NRK/NPTT/NPJLP</label>
        <input
          placeholder='NRK/NPTT/NPJLP'
          {...formik.getFieldProps('no_pegawai')}
          className={clsx(
            'form-control form-control-lg form-control-solid bg-transparent',
            {'is-invalid': formik.touched.no_pegawai && formik.errors.no_pegawai},
            {
              'is-valid': formik.touched.no_pegawai && !formik.errors.no_pegawai,
            }
          )}
          type='text'
          name='no_pegawai'
          autoComplete='off'
        />
        {formik.touched.no_pegawai && formik.errors.no_pegawai && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.no_pegawai}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-2'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-secondary fs-6 mb-0'>Kata Sandi</label>
            {/* end::Label */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('kata_sandi')}
          className={clsx(
            'form-control form-control-lg form-control-solid bg-transparent',
            {
              'is-invalid': formik.touched.kata_sandi && formik.errors.kata_sandi,
            },
            {
              'is-valid': formik.touched.kata_sandi && !formik.errors.kata_sandi,
            }
          )}
        />
        {formik.touched.kata_sandi && formik.errors.kata_sandi && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.kata_sandi}</span>
            </div>
          </div>
        )}
      </div>

      <div className='mb-12'>
        {/* begin::Link */}
        <Link
          to='/auth/forgot-password'
          className='link-primary fs-6 fw-bolder'
          style={{marginLeft: '5px'}}
        >
          Lupa Kata Sandi ?
        </Link>
      {/* end::Link */}

      </div>

     
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Lanjut</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Mohon Tunggu...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

      </div>
      {/* end::Action */}
    </form>
  )
}
