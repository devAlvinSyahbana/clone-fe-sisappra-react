import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {LaporanKegiatan} from './pages/LaporanKegiatan'
import {LaporanKejadian} from './pages/LaporanKejadian'
import {AddKejadianPage} from './pages/add-kejadian.page'
import {AddPengawasanPage} from './pages/add-pengawasan.page'
import {LaporanPengawasan} from './pages/LaporanPengawasan'
import {LaporanTamuDaerah} from './pages/LaporanTamuDaerah'
import {AddTamuDaerahPage} from './pages/add-tamu-daerah.page'
import {DetailLaporanKegiatan} from './pages/DetailLaporanKegiatan'
import {AddKegiatanUmumPage} from './pages/add-kegiatan-umum.page'
import {ListKegiatanPage} from './pages/list-kegiatan.page'
import {ListKejadianPage} from './pages/list-kejadian.page'
import {ListPengawasPage} from './pages/list-pengawas.page'
import {ListTamuDaerahPage} from './pages/list-tamu-daerah.page'

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
              <ListKejadianPage />
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
              <ListPengawasPage />
            </>
          }
        />
        <Route
          path='tambah-laporan-pengawasan'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Tambah Laporan Pengawasan</PageTitle>
              <AddPengawasanPage />
            </>
          }
        />
        <Route
          path='LaporanTamuDaerah'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Laporan Tamu Daerah</PageTitle>
              <ListTamuDaerahPage />
            </>
          }
        />
        <Route
          path='tambah-laporan-tamu-daerah'
          element={
            <>
              <PageTitle breadcrumbs={pelaporanBreadCrumbs}>Tambah Tamu Daerah</PageTitle>
              <AddTamuDaerahPage />
            </>
          }
        />
        <Route index element={<Navigate to='/pelaporan' />} />
      </Route>
    </Routes>
  )
}

export default PelaporanPage
