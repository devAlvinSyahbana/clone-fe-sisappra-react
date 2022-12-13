
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../Layout.css'
import React, {FC, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import * as L from "leaflet";
import jsonpetaTitikRawan from '../maps/peta-general.json'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import ToggleButton from 'react-bootstrap/ToggleButton'
import fireIcon from '../../../../assets/fire.svg'
import ligtningIcon from '../../../../assets/cloud-lightning.svg'
import cartIcon from '../../../../assets/food-stall.png'
import homelessIcon from '../../../../assets/homeless.png'
import politicIcon from '../../../../assets/politic.png'
import handcuffsIcon from '../../../../assets/handcuffs.png'

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const SUM_TITIK_RAWAN_URL = `${API_URL}/dashboard/titik-rawan-by-kejadian`
export const SUM_STATUS_KEPEGAWAIAN_URL = `${API_URL}`

const PetaTitikRawan: FC = () => {
  const [filterTempat, setFilterTempat] = useState([])
  const [checked, setChecked] = useState(false)
  

  const LeafIcon = L.Icon.extend({
    options: {}
  });

  const iconKebakaran = new L.Icon({
    iconUrl:
        fireIcon,
    }),
   iconBencana = new L.Icon({
    iconUrl:
    ligtningIcon
    }
  ),
   iconPKL = new L.Icon({
    iconUrl:
        cartIcon
    }
  ),
   iconPMKS = new L.Icon({
    iconUrl:homelessIcon
    }
  ),
   iconPolitik = new L.Icon({
    iconUrl:politicIcon
    }
  ),
   iconTramtibum = new L.Icon({
    iconUrl: handcuffsIcon
    }
  )

  

  const [icon, setIcon] = useState(iconKebakaran);


  const fetchAPI = async (kejadian : any) => {
    if(filterTempat.length > 0){
      filterTempat.splice(1)
      const response = await axios.get(`${SUM_TITIK_RAWAN_URL}`,{
        params:{
          kejadian : kejadian
        }
      })
      setFilterTempat(response.data.data)
    } else{
      const response = await axios.get(`${SUM_TITIK_RAWAN_URL}`,{
        params:{
          kejadian : kejadian
        }
      })
      setFilterTempat(response.data.data)
      if (kejadian === 'Kebakaran'){
        setIcon((current : any) => current = iconKebakaran)
      } 
      else if(kejadian === 'Bencana'){
        setIcon((current : any) => current = iconBencana)
      }
      else if(kejadian === 'PKL'){
        setIcon((current : any) => current = iconPKL)
      }
      else if(kejadian === 'PMKS'){
        setIcon((current : any) => current = iconPMKS)
      }
      else if(kejadian === 'Politik'){
        setIcon((current : any) => current = iconPolitik)
      }
      else{
        setIcon((current : any) => current = iconTramtibum)
      }
    }
    // const filterTempat = responselayak.filter(
      //   (petaTitikRawan) => petaTitikRawan.address.country === 'Italy'
      // )
      return [filterTempat,setFilterTempat] as const
    }
    const handler = async (kejadian : any, icon : any) => {
      // Changing the state
      filterTempat.splice(1, filterTempat.length)
      const response = await axios.get(`${SUM_TITIK_RAWAN_URL}`,{
        params:{
          kejadian : kejadian
        }
      })
      setFilterTempat(response.data.data)
      if (kejadian === 'Kebakaran'){
        setIcon((current : any) => current = iconKebakaran)
      } 
      else if(kejadian === 'Bencana'){
        setIcon((current : any) => current = iconBencana)
      }
      else if(kejadian === 'PKL'){
        setIcon((current : any) => current = iconPKL)
      }
      else if(kejadian === 'PMKS'){
        setIcon((current : any) => current = iconPMKS)
      }
      else if(kejadian === 'Politik'){
        setIcon((current : any) => current = iconPolitik)
      }
      else{
        setIcon((current : any) => current = iconTramtibum)
      }
      return [filterTempat,setFilterTempat, icon, setIcon] as const
    };
  useEffect(() => {
    fetchAPI('Politik')
  }, [])
  

  return (
    <div className='card card-flush'>
      <div className='card-body'>
        <div className='tab-content' id='myTabContent'>
          <div className='tab-pane fade show active' id='kt_tab_pane_1' role='tabpanel'>
            <div className='row mt'>
              <div className='col-md-12 col-lg-12 col-sm-12'>
                  <ToggleButton
                    onClick={handler.bind(this, 'Bencana', icon)}
                    className='mb-2'
                    id='toggle-check'
                    type='checkbox'
                    variant='outline-primary'
                    checked={checked}
                    value='Bencana'
                  >
                    Bencana
                  </ToggleButton>
                  <ToggleButton
                    onClick={handler.bind(this, 'Kebakaran', icon)}
                    className='mb-2'
                    id='toggle-check2'
                    type='checkbox'
                    variant='outline-primary'
                    checked={checked}
                    value='Kebakaran'
                  >
                    Kebakaran
                  </ToggleButton>
                  <ToggleButton
                    onClick={handler.bind(this, 'PKL', icon)}
                    className='mb-2'
                    id='toggle-check3'
                    type='checkbox'
                    variant='outline-primary'
                    checked={checked}
                    value='PKL'
                  >
                    PKL
                  </ToggleButton>
                  <ToggleButton
                    onClick={handler.bind(this, 'PMKS', icon)}
                    className='mb-2'
                    id='toggle-check4'
                    type='checkbox'
                    variant='outline-primary'
                    checked={checked}
                    value='PMKS'
                  >
                    PMKS
                  </ToggleButton>
                  <ToggleButton
                    onClick={handler.bind(this, 'Politik', icon)}
                    className='mb-2'
                    id='toggle-check5'
                    type='checkbox'
                    variant='outline-primary'
                    checked={checked}
                    value='Politik'
                  >
                    Politik
                  </ToggleButton>
                  <ToggleButton
                    onClick={handler.bind(this, 'Tramtibum', icon)}
                    className='mb-2'
                    id='toggle-check6'
                    type='checkbox'
                    variant='outline-primary'
                    checked={checked}
                    value='Tramtibum'
                  >
                    Tramtibum
                  </ToggleButton>
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
                <MapContainer center={[-6.2088, 106.8456]} zoom={10} scrollWheelZoom={true}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />

                  {filterTempat.map((petaTitikRawan) => (
                    
                    <Marker
                      key={petaTitikRawan['id']}
                      position={[petaTitikRawan['lat'], petaTitikRawan['long']]}
                      icon={icon}
                    >

                      <Popup position={[petaTitikRawan['lat'], petaTitikRawan['long']]}>
                        <div>
                          <h2>{'Lokasi : ' + petaTitikRawan['lokasi'] +', '+ petaTitikRawan['nama_kel']}</h2>
                          <p>{'Kecamatan : ' + petaTitikRawan['nama_kec']}</p>
                          <p>{petaTitikRawan['nama_kota']}</p>
                          <p>{'Rawan Terhadap : ' + petaTitikRawan['rawan_terhadap']}</p>
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
