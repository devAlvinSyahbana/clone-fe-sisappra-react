import {Link} from 'react-router-dom'
import {useLocation, useParams} from 'react-router-dom'
import {HeaderWidget} from './HeaderWidget'

const UpdateHeaderDetail = () => {
  const location = useLocation()
  const {id, status} = useParams()

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='row'>
            <div className='col-12'>
              <HeaderWidget className='card-xl-stretch mb-xl-8' color='secondary' />
            </div>
            <div className='col-12'>
              <div className='d-flex overflow-auto h-55px'>
                <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname.includes('ubah-data-pribadi') && 'active')
                      }
                      to={`/kepegawaian/informasi-data-pegawai/ubah-data-pribadi/${id}/${status}`}
                    >
                      Data Pribadi
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname.includes('ubah-data-keluarga') && 'active')
                      }
                      to={`/kepegawaian/informasi-data-pegawai/ubah-data-keluarga/${id}/${status}`}
                    >
                      Data Keluarga
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname.includes('ubah-data-pendidikan') && 'active')
                      }
                      to={`/kepegawaian/informasi-data-pegawai/ubah-data-pendidikan/${id}/${status}`}
                    >
                      Pendidikan
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname.includes('ubah-data-kepegawaian') && 'active')
                      }
                      to={`/kepegawaian/informasi-data-pegawai/ubah-data-kepegawaian/${id}/${status}`}
                    >
                      Data Kepegawaian
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end::Body */}
    </>
  )
}

export {UpdateHeaderDetail}
