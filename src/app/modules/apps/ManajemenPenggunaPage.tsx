import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {DataPengguna} from './components/DataPengguna'
import {Group} from './components/Group'

import {AksesKontrol} from './components/AksesKontrol'
import {ManajemenPermission} from './components/manajemen-permission/ManajemenPermission'
import {ManajemenSubModul} from './components/manajemen-sub-modul/ManajemenSubModul'

import {AddDataPengguna} from './components/add-data-pengguna/AddDataPengguna'
import {UpdateDataPengguna} from './components/update-data-pengguna/UpdateDataPengguna'
import {DetailDataPengguna} from './components/detail-data-pengguna/DetailDataPengguna'

import {HakAkses} from './components/HakAkses'
import {DetailHakAkses} from './components/detail-hak-akses/DetailHakAkses'
import {UpdateHakAkses} from './components/update-hak-akses/UpdateHakAkses'

const dataPenggunaBreadcrumbs: Array<PageLink> = [
  {
    title: 'Data Pengguna',
    path: '/apps/manajemen-pengguna/pengguna',
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

const ManajemenPenggunaPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='data-pengguna'
          element={
            <>
              <PageTitle breadcrumbs={dataPenggunaBreadcrumbs}>Manajemen Pengguna</PageTitle>
              <DataPengguna />
            </>
          }
        />
        <Route
          path='data-pengguna/tambah-data-pengguna'
          element={
            <>
              <PageTitle breadcrumbs={dataPenggunaBreadcrumbs}>Tambah Data Pengguna</PageTitle>
              <AddDataPengguna />
            </>
          }
        />
        <Route
          path='data-pengguna/update-data-pengguna/:id'
          element={
            <>
              <PageTitle breadcrumbs={dataPenggunaBreadcrumbs}>Ubah Data Pengguna</PageTitle>
              <UpdateDataPengguna />
            </>
          }
        />
        <Route
          path='data-pengguna/detail-data-pengguna/:id'
          element={
            <>
              <PageTitle breadcrumbs={dataPenggunaBreadcrumbs}>Lihat Jenis Kegiatan</PageTitle>
              <DetailDataPengguna />
            </>
          }
        />
        <Route
          path='group-chat'
          element={
            <>
              <PageTitle breadcrumbs={dataPenggunaBreadcrumbs}>Group chat</PageTitle>
              <Group />
            </>
          }
        />

        <Route
          path='akses-kontrol'
          element={
            <>
              <PageTitle breadcrumbs={dataPenggunaBreadcrumbs}>Akses Kontrol</PageTitle>
              <AksesKontrol />
            </>
          }
        />
        <Route
          // path='akses-kontrol/manajemen-permission'
          path='akses-kontrol/manajemen-permission/:id'
          element={
            <>
              <PageTitle breadcrumbs={dataPenggunaBreadcrumbs}>Manajemen Permission</PageTitle>
              <ManajemenPermission />
            </>
          }
        />
        <Route
          // path='akses-kontrol/manajemen-sub-modul'
          path='akses-kontrol/manajemen-sub-modul/:id'
          element={
            <>
              <PageTitle breadcrumbs={dataPenggunaBreadcrumbs}>Manajemen Sub Modul</PageTitle>
              <ManajemenSubModul />
            </>
          }
        />

        <Route
          path='hak-akses'
          element={
            <>
              <PageTitle breadcrumbs={dataPenggunaBreadcrumbs}>Hak Akses</PageTitle>
              <HakAkses />
            </>
          }
        />
        <Route
          path='detail-hak-akses/DetailHakAkses/:id'
          element={
            <>
              <PageTitle breadcrumbs={dataPenggunaBreadcrumbs}>Detail Hak Akses</PageTitle>
              <DetailHakAkses />
            </>
          }
        />
        <Route
          path='update-hak-akses/UpdateHakAkses/:id'
          element={
            <>
              <PageTitle breadcrumbs={dataPenggunaBreadcrumbs}>Detail Hak Akses</PageTitle>
              <UpdateHakAkses />
            </>
          }
        />
        <Route index element={<Navigate to='/data-pengguna' />} />
      </Route>
    </Routes>
  )
}

export default ManajemenPenggunaPage
