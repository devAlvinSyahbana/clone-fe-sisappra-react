/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, FC} from 'react'
import PieK from '../PieCharts/Status-Kepegawaian'
import PieTPT from '../PieCharts/Tingkat-Pendidikan-Terakhir'
import PieUP from '../PieCharts/Usia-Pensiun'
import PieU from '../PieCharts/Usia'
import PieG from '../PieCharts/Golongan'

const WasdakProtokolKesehatan: FC = () => {
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
    if (event.target.value === '7') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '8') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '9') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '10') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '11') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '12') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '13') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '14') {
      setShowResults({isShowed: true, val: event.target.value})
    }
    if (event.target.value === '15') {
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
                  <h3 className='card-title text-white'>Data Jumlah Penindakan Perorangan</h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
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
                    <div className='col-md-4 col-lg-4 col-sm-12'>
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
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header bg-primary'>
                  <h3 className='card-title text-center text-white'>
                    Data Jumlah Pengawasan dan Penindakan Warung Makan, Restoran, dan Kafe
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
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
                    <div className='col-md-4 col-lg-4 col-sm-12'>
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
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>Data Jumlah Penindakan Perkantoran</h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_status'
                        onChange={Find}
                      >
                        <option value='7'>Provinsi</option>
                        <option value='8'>Kabupaten</option>
                        <option value='9'>Kecamatan</option>
                      </select>
                    </div>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
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
                  {showResults.isShowed && showResults.val === '7' ? (
                    <>
                      <PieK chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '8') ? (
                    <>
                      <PieTPT chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '9') ? (
                    <>
                      <PieK chartID='pie-one' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Data Jumlah Penindakan Tempat Usaha Lainnya
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_status'
                        onChange={Find}
                      >
                        <option value='10'>Provinsi</option>
                        <option value='11'>Kabupaten</option>
                        <option value='12'>Kecamatan</option>
                      </select>
                    </div>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
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
                  {showResults.isShowed && showResults.val === '10' ? (
                    <>
                      <PieK chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '11') ? (
                    <>
                      <PieTPT chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '12') ? (
                    <>
                      <PieK chartID='pie-one' />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>
                    Data Jumlah Penindakan Area Publik dan Kerumunan
                  </h3>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        id='select_status'
                        onChange={Find}
                      >
                        <option value='13'>Provinsi</option>
                        <option value='14'>Kabupaten</option>
                        <option value='15'>Kecamatan</option>
                      </select>
                    </div>
                    <div className='col-md-4 col-lg-4 col-sm-12'>
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
                  {showResults.isShowed && showResults.val === '13' ? (
                    <>
                      <PieUP chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '14') ? (
                    <>
                      <PieU chartID='pie-one' />
                    </>
                  ) : null || (showResults.isShowed && showResults.val === '15') ? (
                    <>
                      <PieG chartID='pie-one' />
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

export {WasdakProtokolKesehatan}
