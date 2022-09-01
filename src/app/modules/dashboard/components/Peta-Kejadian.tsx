/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import '../Layout.css'
import jsonPetaKejadian from '../maps/peta-general.json'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

function PetaKejadian() {
  const filterTempat = jsonPetaKejadian.filter(
    (petaKejadian) => petaKejadian.address.country === 'Italy'
  )

  return (
    <div className='card card-flush'>
      <div className='card-body'>
        <div className='tab-content' id='myTabContent'>
          <div className='tab-pane fade show active' id='kt_tab_pane_1' role='tabpanel'>
            <div className='row'>
              <div className='col-md-12 col-lg-12 col-sm-12 mb-4'>
                <div className='card card-bordered'>
                  <MapContainer center={[43.437399, 11.777607]} zoom={5} scrollWheelZoom={true}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />

                    {filterTempat.map((petaKejadian) => (
                      <Marker
                        key={petaKejadian.id}
                        position={[petaKejadian.gps.latitude, petaKejadian.gps.longitude]}
                      >
                        <Popup position={[petaKejadian.gps.latitude, petaKejadian.gps.longitude]}>
                          <div>
                            <h2>{'Nama : ' + petaKejadian.name}</h2>
                            <p>{'Status : ' + petaKejadian.status}</p>
                            <p>{'Number of Charging Area : ' + petaKejadian.stallCount}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
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
