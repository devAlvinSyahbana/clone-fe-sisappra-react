/* eslint-disable jsx-a11y/anchor-is-valid */
import '../Layout.css'
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import jsonpetaTitikRawan from '../maps/peta-general.json'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import ToggleButton from 'react-bootstrap/ToggleButton'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const SUM_STATUS_KEPEGAWAIAN_URL = `${API_URL}`

function PetaTitikRawan() {
  const filterTempat = jsonpetaTitikRawan.filter(
    (petaTitikRawan) => petaTitikRawan.address.country === 'Italy'
  )
  const [checked, setChecked] = useState(false)

  return (
    <div className='card card-flush'>
      <div className='card-body'>
        <div className='tab-content' id='myTabContent'>
          <div className='tab-pane fade show active' id='kt_tab_pane_1' role='tabpanel'>
            <div className='row mt'>
              <div className='col-md-12 col-lg-12 col-sm-12'>
                <Link to='#'>
                  <ToggleButton
                    className='mb-2'
                    id='toggle-check'
                    type='checkbox'
                    variant='outline-primary'
                    checked={checked}
                    value='1'
                  >
                    Bencana
                  </ToggleButton>
                </Link>
                <Link to='#'>
                  <ToggleButton
                    className='mb-2'
                    id='toggle-check2'
                    type='checkbox'
                    variant='outline-primary'
                    checked={checked}
                    value='2'
                  >
                    Kebakaran
                  </ToggleButton>
                </Link>
                <Link to='#'>
                  <ToggleButton
                    className='mb-2'
                    id='toggle-check3'
                    type='checkbox'
                    variant='outline-primary'
                    checked={checked}
                    value='3'
                  >
                    PKL
                  </ToggleButton>
                </Link>
                <Link to='#'>
                  <ToggleButton
                    className='mb-2'
                    id='toggle-check4'
                    type='checkbox'
                    variant='outline-primary'
                    checked={checked}
                    value='4'
                  >
                    PMKS
                  </ToggleButton>
                </Link>
                <Link to='#'>
                  <ToggleButton
                    className='mb-2'
                    id='toggle-check5'
                    type='checkbox'
                    variant='outline-primary'
                    checked={checked}
                    value='5'
                  >
                    Politik
                  </ToggleButton>
                </Link>
                <Link to='#'>
                  <ToggleButton
                    className='mb-2'
                    id='toggle-check6'
                    type='checkbox'
                    variant='outline-primary'
                    checked={checked}
                    value='6'
                  >
                    Tramtibum
                  </ToggleButton>
                </Link>
              </div>
            </div>
            {/* axios({
  method: 'post', //you can set what request you want to be
  url: 'https://example.com/request',
  headers: {
    Authorization: 'Bearer ' + varToken
  }
}) */}
            <div className='row mt-5'>
              <div className='d-flex col-md-12 col-lg-12 col-sm-12 mb-4'>
                <MapContainer center={[43.437399, 11.777607]} zoom={5} scrollWheelZoom={true}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />

                  {filterTempat.map((petaTitikRawan) => (
                    <Marker
                      key={petaTitikRawan.id}
                      position={[petaTitikRawan.gps.latitude, petaTitikRawan.gps.longitude]}
                    >
                      <Popup position={[petaTitikRawan.gps.latitude, petaTitikRawan.gps.longitude]}>
                        <div>
                          <h2>{'Nama : ' + petaTitikRawan.name}</h2>
                          <p>{'Status : ' + petaTitikRawan.status}</p>
                          <p>{'Number of Charging Area : ' + petaTitikRawan.stallCount}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {PetaTitikRawan}
