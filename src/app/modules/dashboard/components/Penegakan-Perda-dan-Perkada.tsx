/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, FC} from 'react'
import PieK from '../PieCharts/Status-Kepegawaian'
import PieTPT from '../PieCharts/Tingkat-Pendidikan-Terakhir'

const PenegakanPerdadanPerkada: FC = () => {
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
    if (event.target.value === '4') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '5') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '6') {
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
                  <h3 className='card-title text-white'>Data Jumlah Kasus Per Wilayah</h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-2 col-lg-2 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_status'
                        onChange={Find}
                      >
                        <option value='1'>Provinsi</option>
                        <option value='2'>Kabupaten</option>
                        <option value='3'>Kecamatan</option>
                      </select>
                    </div>
                    <div className='col-md-2 col-lg-2 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_tahun'
                        onChange={Find}
                      >
                        <option value='a'>2018</option>
                        <option value='b'>2019</option>
                        <option value='c'>2020</option>
                        <option value='d'>2021</option>
                        <option value='e'>2022</option>
                      </select>
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '1' ? (
                    <>
                      <PieK chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '2') ? (
                    <>
                      <PieTPT chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '3') ? (
                    <>
                      <PieK chartID='pie-one' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-12 col-lg-12 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Data Jumlah Per Jenis Pelanggaran Perda / Perkada
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-2 col-lg-2 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_status'
                        onChange={Find}
                      >
                        <option value='4'>Provinsi</option>
                        <option value='5'>Kabupaten</option>
                        <option value='6'>Kecamatan</option>
                      </select>
                    </div>
                    <div className='col-md-2 col-lg-2 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_tahun'
                        onChange={Find}
                      >
                        <option value='a'>2018</option>
                        <option value='b'>2019</option>
                        <option value='c'>2020</option>
                        <option value='d'>2021</option>
                        <option value='e'>2022</option>
                      </select>
                    </div>
                  </div>
                  {showResults.isShowed && showResults.val === '4' ? (
                    <>
                      <PieK chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '5') ? (
                    <>
                      <PieTPT chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '6') ? (
                    <>
                      <PieK chartID='pie-one' />
                    </>
                  ) : null}
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

export {PenegakanPerdadanPerkada}
