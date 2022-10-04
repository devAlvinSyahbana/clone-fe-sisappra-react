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
    .required('Wajib diisi'),
  kata_sandi: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Wajib diisi'),
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
        saveAuth(auth)
        const {data: user} = await getUserByToken(auth.api_token)
        setCurrentUser(user.data)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('Akun tidak terdaftar!')
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
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Login Aplikasi</h1>
        <div className='text-gray-500 fw-semibold fs-6'>Login untuk menggunakan aplikasi</div>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : null}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>NRK/NPTT/NPJLP</label>
        <input
          placeholder='NRK/NPTT/NPJLP'
          {...formik.getFieldProps('no_pegawai')}
          className={clsx(
            'form-control bg-transparent',
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
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('kata_sandi')}
          className={clsx(
            'form-control bg-transparent',
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
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          Lupa Password ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Masuk</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Harap tunggu...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  )
}
