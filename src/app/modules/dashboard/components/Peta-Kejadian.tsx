/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import '../Layout.css'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

function PetaKejadian() {
  return (
    <div className='card card-flush'>
      <div className='card-body'>
        <div className='tab-content' id='myTabContent'>
          <div className='tab-pane fade show active' id='kt_tab_pane_1' role='tabpanel'>
            <div className='row'>
              <div className='col-md-12 col-lg-12 col-sm-12 mb-4'>
                <div className='card card-bordered'>
                  <MapContainer center={[-6.183216, 106.830378]} zoom={50} scrollWheelZoom={true}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={[-6.2, 106.816666]}>
                      <Popup>
                        Peta Ploting <br /> Anggota
                      </Popup>
                    </Marker>
                    <Marker position={[-6.183339, 106.830137]}>
                      <Popup>
                        Peta Ploting <br /> Anggota2
                      </Popup>
                    </Marker>
                    <Marker position={[-6.182993, 106.830782]}>
                      <Popup>
                        Peta Ploting <br /> Anggota3
                      </Popup>
                    </Marker>
                  </MapContainer>
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

export {PetaKejadian}
