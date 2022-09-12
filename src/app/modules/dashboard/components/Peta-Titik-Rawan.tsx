/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import '../Layout.css'
import {Link} from 'react-router-dom'
import jsonpetaTitikRawan from '../maps/peta-general.json'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

function PetaTitikRawan() {
  const filterTempat = jsonpetaTitikRawan.filter(
    (petaTitikRawan) => petaTitikRawan.address.country === 'Italy'
  )

  return (
    <div className='card card-flush'>
      <div className='card-body'>
        <div className='tab-content' id='myTabContent'>
          <div className='tab-pane fade show active' id='kt_tab_pane_1' role='tabpanel'>
            <div className='row'>
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <div className='form-group'>
                  <label htmlFor='' className='mb-3'>
                    Provinsi
                  </label>
                  <select
                    className='form-select form-select-solid'
                    aria-label='Select example'
                    // value={}
                    // onChange={}
                    name='val'
                  >
                    <option value=''>Pilih</option>
                  </select>
                </div>
              </div>
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <div className='form-group'>
                  <label htmlFor='' className='mb-3'>
                    Kota
                  </label>
                  <select
                    className='form-select form-select-solid'
                    aria-label='Select example'
                    // value={}
                    // onChange={}
                    name='val'
                  >
                    <option value=''>Pilih</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <div className='form-group'>
                  <label htmlFor='' className='mb-3'>
                    Kecamatan
                  </label>
                  <select
                    className='form-select form-select-solid'
                    aria-label='Select example'
                    // value={}
                    // onChange={}
                    name='val'
                  >
                    <option value=''>Pilih</option>
                  </select>
                </div>
              </div>
              <div className='col-xxl-6 col-lg-6 col-md-6 col-sm-12'>
                <div className='form-group'>
                  <label htmlFor='' className='mb-3'>
                    Kelurahan
                  </label>
                  <select
                    className='form-select form-select-solid'
                    aria-label='Select example'
                    // value={}
                    // onChange={}
                    name='val'
                  >
                    <option value=''>Pilih</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-md-6 col-lg-6 col-sm-12'>
                <Link to='#'>
                  <button className='btn btn-primary'>
                    <i className='fa-solid fa-search'></i>
                    Cari
                  </button>
                </Link>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-md-12 col-lg-12 col-sm-12 mb-4'>
                <div className='card card-bordered'>
                  <MapContainer center={[-6.1554057, 106.8926634]} zoom={5} scrollWheelZoom={true}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />

                    {filterTempat.map((petaTitikRawan) => (
                      <Marker
                        key={petaTitikRawan.id}
                        position={[petaTitikRawan.gps.latitude, petaTitikRawan.gps.longitude]}
                      >
                        <Popup
                          position={[petaTitikRawan.gps.latitude, petaTitikRawan.gps.longitude]}
                        >
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

export {PetaTitikRawan}
