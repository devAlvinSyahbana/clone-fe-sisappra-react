/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import PieK from '../PieCharts/Status-Kepegawaian'
import PieTPT from '../PieCharts/Tingkat-Pendidikan-Terakhir'
import PieUP from '../PieCharts/Usia-Pensiun'
import PieU from '../PieCharts/Usia'
import PieG from '../PieCharts/Golongan'

const WasdakProtokolKesehatan: FC = () => {
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
                  <PieU chartID='pie-one' />
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12'>
              <div className='card card-bordered border-primary'>
                <div className='card-header bg-primary'>
                  <h3 className='card-title text-center text-white'>
                    Data Jumlah Pengawasan dan Penindakan Warung Makan, Restoran, dan Kafe
                  </h3>
                </div>
                <div className='card-body'>
                  <PieK chartID='pie-two' />
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 mb-6'>
              <div className='card card-bordered border-primary'>
                <div className='card-header justify-content-center bg-primary'>
                  <h3 className='card-title text-white'>Data Jumlah Penindakan Perkantoran</h3>
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
                    Data Jumlah Penindakan Tempat Usaha Lainnya
                  </h3>
                </div>
                <div className='card-body'>
                  <PieG chartID='pie-four' />
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
                  <PieUP chartID='pie-five' />
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