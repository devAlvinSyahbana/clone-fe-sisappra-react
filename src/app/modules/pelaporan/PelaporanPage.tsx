import React from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { LaporanKegiatan } from './components/LaporanKegiatan'
import { LaporanKejadian } from './components/LaporanKejadian'
import { LaporanPengawasan } from './components/LaporanPengawasan'
import { LaporanTamuDaerah } from './components/LaporanTamuDaerah'
import { LaporanPPNS } from './components/LaporanPPNS'


const pelaporanBreadCrumbs: Array<PageLink> = [
  {
    title: ' Pelaporan ',
    path: '/pelaporan/LaporanKegiatan',
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

const PelaporanPage: React.FC = () => {
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
          path='LaporanKegiatan'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Laporan Kegiatan</PageTitle>
              <LaporanKegiatan />
            </>
          }
        />
        <Route
          path='LaporanKejadian'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Laporan Kejadian</PageTitle>
              <LaporanKejadian />
            </>
          }
        />
        <Route
          path='LaporanPengawasan'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Laporan Pengawasan</PageTitle>
              <LaporanPengawasan />
            </>
          }
        />
        <Route
          path='LaporanTamuDaerah'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Laporan Tamu Daerah</PageTitle>
              <LaporanTamuDaerah />
            </>
          }
        />
        <Route
          path='LaporanPPNS'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Laporan PPNS</PageTitle>
              <LaporanPPNS />
            </>
          }
        />
        
        <Route index element={<Navigate to='/pelaporan' />} />
      </Route>
    </Routes>
  )
}

export default PelaporanPage
