/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, FC} from 'react'
import PieK from '../PieCharts/Status-Kepegawaian'
import PieTPT from '../PieCharts/Tingkat-Pendidikan-Terakhir'
import PieUP from '../PieCharts/Usia-Pensiun'
import PieU from '../PieCharts/Usia'
import PieG from '../PieCharts/Golongan'
import PieJE from '../PieCharts/Jenis-Eselon'
import PieJK from '../PieCharts/Jenis-Kediklatan'
import PieW from '../PieCharts/Wilayah'
import PiePPNS from '../PieCharts/PPNS'
import Dropdown from 'react-bootstrap/Dropdown'

export const Kepegawaian: FC = () => {
  const [showResults, setShowResults] = useState({isShowed: false, val: ''})
  const Find = (event: {preventDefault: () => void; target: {value: string}}) => {
    console.log(typeof event.target.value)

    if (event.target.value === '1') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '2') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '3') {
      setShowResults({isShowed: true, val: event.target.value})
    }
  }

  return (
    <div className=' card card-body'>
      <div className='tab-content' id='myTabContent'>
        <div className='tab-pane fade show active' id='kt_tab_pane_1' role='tabpanel'>
          <div className='row'>
            <div className='col-md-12 col-lg-12 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>Jumlah Personil Satpol PP Per Wilayah</h3>
                  <div className='card-title dropdown'>
                    <select
                      className='form-select form-select-solid'
                      aria-label='Select example'
                      id='select_status'
                      onChange={Find}
                    >
                      <option>Pilih</option>
                      <option value='1'>PNS</option>
                      <option value='2'>PTT</option>
                      <option value='3'>PJLP</option>
                    </select>
                  </div>
                </div>
                <div className='card-body'>
                  <PieW chartID='pie-one' />
                </div>
              </div>
              {showResults.isShowed && showResults.val === '1' ? (
                <>
                  <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12' id='fil_nip'>
                    <label htmlFor='' className='mb-3'>
                      NIP
                    </label>
                    <input
                      type='text'
                      className='form-control form-control form-control-solid'
                      name='tags'
                      placeholder='NIP'
                    />
                  </div>
                </>
              ) : null || (showResults.isShowed && showResults.val === '2') ? (
                <>
                  <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12' id='fil_nptt'>
                    <label htmlFor='' className='mb-3'>
                      NPTT
                    </label>
                    <input
                      type='text'
                      className='form-control form-control form-control-solid'
                      name='tags'
                      placeholder='NPTT'
                    />
                  </div>
                </>
              ) : null || (showResults.isShowed && showResults.val === '3') ? (
                <>
                  <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12' id='fil_npjlp'>
                    <label htmlFor='' className='mb-3'>
                      NPJLP
                    </label>
                    <input
                      type='text'
                      className='form-control form-control form-control-solid'
                      name='tags'
                      placeholder='NPJLP'
                    />
                  </div>
                </>
              ) : null}
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12'>
              <div className='card card-bordered border-primary'>
                <div className='card-header bg-primary'>
                  <h3 className='card-title text-center text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Status Kepegawaian (PNS, PTT, PJLP)
                  </h3>
                </div>
                <div className='card-body'>
                  <PieK chartID='pie-two' />
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header bg-primary'>
                  <h3 className='card-title text-center text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Tingkat Pendidikan Terakhir (SMA, S1, S2,
                    S3)
                  </h3>
                </div>
                <div className='card-body'>
                  <PieTPT chartID='pie-three' />
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Golongan
                  </h3>
                </div>
                <div className='card-body'>
                  <PieG chartID='pie-four' />
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header bg-primary'>
                  <h3 className='card-title text-center text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Jenis Eselon
                  </h3>
                </div>
                <div className='card-body'>
                  <PieJE chartID='pie-five' />
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Jenis Kediklatan
                  </h3>
                </div>
                <div className='card-body'>
                  <PieJK chartID='pie-six' />
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Usia
                  </h3>
                </div>
                <div className='card-body'>
                  <PieU chartID='pie-seven' />
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Jumlah Personil Satpol PP Berdasarkan PPNS
                  </h3>
                </div>
                <div className='card-body'>
                  <PiePPNS chartID='pie-eight' />
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Jumlah Personil Satpol PP Berdasarkan Usia Pensiun
                  </h3>
                </div>
                <div className='card-body'>
                  <PieUP chartID='pie-nine' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='tab-pane fade' id='kt_tab_pane_2' role='tabpanel'>
          <h1 className='fw-bolder text-gray-900 text-center mb-7'>COMING SOON</h1>
          <p className='fw-bolder text-gray-900 text-center mb-7'>
            We are currently working on our website.
          </p>
        </div>
      </div>
    </div>
  )
}
