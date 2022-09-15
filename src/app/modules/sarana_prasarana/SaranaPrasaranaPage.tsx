import React from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { LaporanSaranaPrasarana } from './components/LaporanSaranaPrasarana'
import { UbahLaporanSarana } from './components/UbahLaporanSarana'
import { LihatLaporanSarana } from './components/LihatLaporanSarana'



const sarana_prasaranaBreadCrumbs: Array<PageLink> = [
  {
    title: 'Sarana & Prasarana',
    path: '/sarana_prasarana/LaporanSaranaPrasarana',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const SaranaPrasaranaPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>          
            <Outlet />
          </>
        }
      >
        <Route
          path='LaporanSaranaPrasarana'
          element={
            <>
              <PageTitle breadcrumbs={sarana_prasaranaBreadCrumbs}>Laporan Sarana & Prasarana</PageTitle>
              <LaporanSaranaPrasarana />
            </>
          }
        />     
        <Route
          path='UbahLaporanSarana/:id'
          element={
            <>
              <PageTitle breadcrumbs={sarana_prasaranaBreadCrumbs}>Ubah Laporan Sarana</PageTitle>
              <UbahLaporanSarana />
            </>
          }
        />
        <Route
          path='LihatLaporanSarana/:id'
          element={
            <>
              <PageTitle breadcrumbs={sarana_prasaranaBreadCrumbs}>Lihat Laporan Sarana</PageTitle>
              <LihatLaporanSarana />
            </>
          }
        />
        
        <Route index element={<Navigate to='/sarana_prasarana' />} />
      </Route>
    </Routes>
  )
}

export default SaranaPrasaranaPage 
