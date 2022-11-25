/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, register} from '../core/_requests'
import {useAuth} from '../core/Auth'

const regSchema = Yup.object().shape({
  no_pegawai: Yup.string().min(5, 'Tidak Valid').required('Wajib diisi'),
  kata_sandi: Yup.string()
    .min(5, 'Minimum 5 karakter')
    .max(50, 'Maximum 50 karakter')
    .required('Wajib diisi'),
  email: Yup.string()
    .email('Periksa kembali, pastikan format email sesuai')
    .required('Wajib diisi'),
})

const initialValues = {
  no_pegawai: '12345',
  kata_sandi: 'qwerty',
  email: 'user@mail.com',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Registrasi() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: regSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await register(values.no_pegawai, values.kata_sandi, values.email)
        console.log(auth)
        if (auth.code === 208) {
          saveAuth(undefined)
          setStatus(
            <div className='mb-lg-8 alert alert-danger'>
              <div className='alert-text font-weight-bold'>
                Akun sudah terdaftar! Silahkan login
              </div>
            </div>
          )
          setSubmitting(false)
          return setLoading(false)
        }
        saveAuth(undefined)
        await getUserByToken(auth.api_token)
        // setCurrentUser(user.data)
        setStatus(
          <div className='mb-lg-8 alert alert-success'>
            <div className='alert-text font-weight-bold'>
              Akun anda berhasil teregistrasi! Silahkan{' '}
              <Link to='/auth/login' className='fw-bold'>
                Login
              </Link>
            </div>
          </div>
        )
        setSubmitting(false)
        return setLoading(false)
        // saveAuth(auth)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus(
          <div className='mb-lg-8 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              NRK/NPTT/NPJLP tidak ada dalam database mohon hubungi admin!
            </div>
          </div>
        )
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
      <div className='text-center mb-8'>
        <h1 className='text-white fw-bolder mb-3'>BUAT AKUN</h1>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <>{formik.status}</>
      ) : (
        // <div className='mb-lg-8 alert alert-danger'>
        //   <div className='alert-text font-weight-bold'></div>
        // </div>
        <div className='mb-lg-8 alert alert-info'>
          <div className='alert-text font-weight-bold'>Pastikan NRK/NPTT/NPJLP sudah terdaftar</div>
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
      <div className='fv-row mb-8'>
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

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fw-bolder text-white fs-6 mb-0'>Email</label>
        <input
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent text-white',
            {
              'is-invalid': formik.touched.email && formik.errors.email,
            },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container mb-n7'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}

      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label rounded-lg'>Buat Akun</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Harap tunggu...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      <hr />
      <div className='d-grid '>
        <Link to='/auth/login' className='btn btn-secondary'>
          Login
        </Link>
      </div>
      {/* end::Action */}
    </form>
  )
}
