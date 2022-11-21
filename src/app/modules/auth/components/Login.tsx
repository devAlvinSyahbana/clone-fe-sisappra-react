/* eslint-disable jsx-a11y/anchor-is-valid */
import {useRef, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {useAuth} from '../core/Auth'
import ReCAPTCHA from 'react-google-recaptcha'

const loginSchema = Yup.object().shape({
  no_pegawai: Yup.string().min(5, 'Tidak Valid').required('Wajib diisi'),
  kata_sandi: Yup.string()
    .min(5, 'Minimum 5 karakter')
    .max(50, 'Maximum 50 karakter')
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
  const [captcha, setCaptcha] = useState<string | null>(null)
  const captchaRef = useRef<ReCAPTCHA>(null)

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        if (captcha) {
          const {data: auth} = await login(values.no_pegawai, values.kata_sandi)
          saveAuth(auth)
          const {data: user} = await getUserByToken(auth.api_token)
          setCurrentUser(user.data)
        }
        saveAuth(undefined)
        setSubmitting(false)
        setLoading(false)
        setStatus('Cek captcha terlebih dahulu!')
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('Login gagal, pastikan NRP atau password sudah benar!')
        setSubmitting(false)
        setLoading(false)
        setCaptcha(null)
        captchaRef.current?.reset()
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
      <div className='text-center mb-8'>
        <h1 className='text-white fw-bolder mb-3'>LOGIN</h1>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-8 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-lg-8 alert alert-info'>
          <div className='alert-text font-weight-bold'>Masukkan NRK/NPTT/NPJLP dan password</div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-white'>NRK/NPTT/NPJLP</label>
        <input
          placeholder='NRK / NPTT / NPJLP'
          {...formik.getFieldProps('no_pegawai')}
          className={clsx(
            'form-control bg-transparent text-white',
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
          <div className='fv-plugins-message-container mb-n7'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.no_pegawai}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-white fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('kata_sandi')}
          className={clsx(
            'form-control bg-transparent text-white',
            {
              'is-invalid': formik.touched.kata_sandi && formik.errors.kata_sandi,
            },
            {
              'is-valid': formik.touched.kata_sandi && !formik.errors.kata_sandi,
            }
          )}
        />
        {formik.touched.kata_sandi && formik.errors.kata_sandi && (
          <div className='fv-plugins-message-container mb-n7'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.kata_sandi}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-6'>
        <div />
        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          Lupa Password ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Recaptcha Wrapper */}
      <div className='d-flex justify-content-center w-md-100 mb-lg-5 mb-3'>
        <ReCAPTCHA
          sitekey='6LeY5hAjAAAAANRE7la_kwyyzR3cyyFvre6sKvBn' // real test key
          // sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // unlimited test key from google
          onChange={(value) => {
            setCaptcha(value)
          }}
          ref={captchaRef}
        />
      </div>
      {/* end::Recaptcha Wrapper */}

      {/* begin::Action */}
      <div className='d-grid'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label rounded-lg'>Masuk</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Harap tunggu...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      <hr className='border' />
      <div className='d-grid '>
        <Link to='/auth/registrasi' className='btn btn-secondary'>
          Resgistrasi Baru
        </Link>
      </div>
      {/* end::Action */}
    </form>
  )
}
