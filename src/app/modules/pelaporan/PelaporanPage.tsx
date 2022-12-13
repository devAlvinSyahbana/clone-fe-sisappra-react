import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {LaporanKegiatan} from './pages/LaporanKegiatan'
import {LaporanKejadian} from './pages/LaporanKejadian'
import {AddKejadianPage} from './pages/add-kejadian.page'
import {LaporanPengawasan} from './pages/LaporanPengawasan'
import {LaporanTamuDaerah} from './pages/LaporanTamuDaerah'
import {TambahTamuDaerah} from './pages/TambahTamuDaerah'
import {DetailLaporanKegiatan} from './pages/DetailLaporanKegiatan'
import {AddKegiatanUmumPage} from './pages/add-kegiatan-umum.page'
import {ListKegiatanPage} from './pages/list-kegiatan.page'

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
              <ListKegiatanPage />
            </>
          }
        />
        <Route
          path='TambahLaporanKegiatan'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Tambah Laporan Kegiatan</PageTitle>
              <AddKegiatanUmumPage />
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
          path='tambah-laporan-kejadian'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Tambah Laporan Kejadian</PageTitle>
              <AddKejadianPage />
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
