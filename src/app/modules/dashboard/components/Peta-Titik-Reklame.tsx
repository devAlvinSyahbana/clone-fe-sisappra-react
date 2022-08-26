/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

const PetaTitikReklame: FC = () => {
  return (
    <div className='card card-flush'>
      <div className='card-body'>
        <div className='tab-content' id='myTabContent'>
          <div className='tab-pane fade show active' id='kt_tab_pane_1' role='tabpanel'>
            <div className='row'>
              <div className='col-md-6 col-lg-6 col-sm-12 mb-4'>
                <div className='card card-bordered'>
                  {/* <div className='card-header'>
                    <h3 className='card-title text-center'>
                      Jumlah Personil Satpol PP Per Wilayah
                    </h3>
                  </div>
                  <div className='card-body'>
                    <PieW chartID='pie-one' />
                  </div> */}
                </div>
              </div>
              <div className='col-md-6 col-lg-6 col-sm-12'>
                <div className='card card-bordered'>
                  {/* <div className='card-header'>
                    <h3 className='card-title text-center'>
                      Jumlah Personil Satpol PP Berdasarkan Status Kepegawaian (PNS, PTT, PJLP)
                    </h3>
                  </div>
                  <div className='card-body'>
                    <PieK chartID='pie-two' />
                  </div> */}
                </div>
              </div>
              <div className='col-md-6 col-lg-6 col-sm-12 mb-4'>
                <div className='card card-bordered'>
                  {/* <div className='card-header'>
                    <h3 className='card-title text-center'>
                      Jumlah Personil Satpol PP Berdasarkan Tingkat Pendidikan Terakhir (SMA, S1,
                      S2, S3)
                    </h3>
                  </div>
                  <div className='card-body'>
                    <PieTPT chartID='pie-three' />
                  </div> */}
                </div>
              </div>
              <div className='col-md-6 col-lg-6 col-sm-12'>
                <div className='card card-bordered'>
                  {/* <div className='card-header'>
                    <h3 className='card-title text-center'>
                      Jumlah Personil Satpol PP Berdasarkan Golongan
                    </h3>
                  </div>
                  <div className='card-body'>
                    <PieG chartID='pie-four' />
                  </div> */}
                </div>
              </div>
              <div className='col-md-6 col-lg-6 col-sm-12 mb-4'>
                <div className='card card-bordered'>
                  {/* <div className='card-header'>
                    <h3 className='card-title text-center'>
                      Jumlah Personil Satpol PP Berdasarkan Jenis Eselon
                    </h3>
                  </div>
                  <div className='card-body'>
                    <PieJE chartID='pie-five' />
                  </div> */}
                </div>
              </div>
              <div className='col-md-6 col-lg-6 col-sm-12'>
                <div className='card card-bordered'>
                  {/* <div className='card-header'>
                    <h3 className='card-title text-center'>
                      Jumlah Personil Satpol PP Berdasarkan Jenis Kediklatan
                    </h3>
                  </div>
                  <div className='card-body'>
                    <PieJK chartID='pie-six' />
                  </div> */}
                </div>
              </div>
              <div className='col-md-6 col-lg-6 col-sm-12 mb-4'>
                <div className='card card-bordered'>
                  {/* <div className='card-header'>
                    <h3 className='card-title text-center'>
                      Jumlah Personil Satpol PP Berdasarkan Usia
                    </h3>
                  </div>
                  <div className='card-body'>
                    <PieU chartID='pie-seven' />
                  </div> */}
                </div>
              </div>
              <div className='col-md-6 col-lg-6 col-sm-12'>
                <div className='card card-bordered'>
                  {/* <div className='card-header'>
                    <h3 className='card-title text-center'>
                      Jumlah Personil Satpol PP Berdasarkan PPNS
                    </h3>
                  </div>
                  <div className='card-body'>
                    <PiePPNS chartID='pie-eight' />
                  </div> */}
                </div>
              </div>
              <div className='col-md-6 col-lg-6 col-sm-12'>
                <div className='card card-bordered'>
                  {/* <div className='card-header justify-content-center'>
                    <h3 className='card-title text-center'>
                      Jumlah Personil Satpol PP Berdasarkan Usia Pensiun
                    </h3>
                  </div>
                  <div className='card-body'>
                    <PieUP chartID='pie-nine' />
                  </div> */}
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
    </div>
  )
}

export {PetaTitikReklame}
