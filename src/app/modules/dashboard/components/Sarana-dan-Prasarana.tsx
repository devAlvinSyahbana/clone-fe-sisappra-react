/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, FC} from 'react'
import PieC from '../chart/piechart/piechart'

const SaranadanPrasarana: FC = () => {
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
                  <h3 className='card-title text-white'>
                    Data Sebaran Sarana dan Prasarana Per Kota / Kabupaten
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
                      <PieC chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '2') ? (
                    <>
                      <PieC chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '3') ? (
                    <>
                      <PieC chartID='pie-one' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-12 col-lg-12 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Data Jumlah Sarana dan Prasarana Per Jenis
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
                      <PieC chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '5') ? (
                    <>
                      <PieC chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '6') ? (
                    <>
                      <PieC chartID='pie-one' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {SaranadanPrasarana}
