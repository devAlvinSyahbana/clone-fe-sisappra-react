import React from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { LaporanSaranaPrasarana } from './components/LaporanSaranaPrasarana'
import { TambahSaranaPrasarana } from './components/TambahSaranaPrasarana'
import { DetailSaranaPrasarana } from './components/DetailSaranaPrasarana'
import { UbahSaranaPrasarana } from './components/UbahSaranaPrasarana'

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
          path='TambahSaranaPrasarana'
          element={
            <>
              <PageTitle breadcrumbs={sarana_prasaranaBreadCrumbs}>Tambah Sarana & Prasarana</PageTitle>
              <TambahSaranaPrasarana />
            </>
          }
        />
        <Route
          path='DetailSaranaPrasarana'
          element={
            <>
              <PageTitle breadcrumbs={sarana_prasaranaBreadCrumbs}>Detail Sarana & Prasarana</PageTitle>
              <DetailSaranaPrasarana />
            </>
          }
        />
        <Route
          path='UbahSaranaPrasarana'
          element={
            <>
              <PageTitle breadcrumbs={sarana_prasaranaBreadCrumbs}>Ubah Sarana & Prasarana</PageTitle>
              <UbahSaranaPrasarana />
            </>
          }
        />
        
        
        <Route index element={<Navigate to='/sarana_prasarana' />} />
      </Route>
    </Routes>
  )
}

export default SaranaPrasaranaPage 
