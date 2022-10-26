import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { DataPengguna } from './components/DataPengguna'
import { Group } from './components/Group'
import { AksesKontrol } from './components/AksesKontrol'

import { AddDataPengguna } from './components/add-data-pengguna/AddDataPengguna'

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
        <Route index element={<Navigate to='/data-pengguna' />} />
      </Route>
    </Routes>
  )
}

export default ManajemenPenggunaPage
