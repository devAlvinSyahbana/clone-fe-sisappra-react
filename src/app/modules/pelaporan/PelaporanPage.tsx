import React from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { LaporanKegiatan } from './components/LaporanKegiatan'
import { TambahLaporanKegiatan } from './components/TambahLaporanKegiatan'
import { LaporanKejadian } from './components/LaporanKejadian'
import { TambahLaporanKejadian } from './components/TambahLaporanKejadian'
import { LaporanPengawasan } from './components/LaporanPengawasan'
import { LaporanTamuDaerah } from './components/LaporanTamuDaerah'
import { TambahTamuDaerah } from './components/TambahTamuDaerah'
import { DetailLaporanKegiatan } from './components/DetailLaporanKegiatan'


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
          path='TambahLaporanKegiatan'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Tambah Laporan Kegiatan</PageTitle>
              <TambahLaporanKegiatan />
            </>
          }
        />
        <Route
          path='DetailLaporanKegiatan'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Detail Laporan Kegiatan</PageTitle>
              <DetailLaporanKegiatan />
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
          path='TambahLaporanKejadian'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Tambah Laporan Kejadian</PageTitle>
              <TambahLaporanKejadian />
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
          path='TambahTamuDaerah'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Tambah Tamu Daerah</PageTitle>
              <TambahTamuDaerah />
            </>
          }
        />
        
        <Route index element={<Navigate to='/pelaporan' />} />
      </Route>
    </Routes>
  )
}

export default PelaporanPage
