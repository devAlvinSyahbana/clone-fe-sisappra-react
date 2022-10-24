import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {DataPengguna} from './components/DataPengguna'
import {Group} from './components/Group'
import {Drawer} from './components/Drawer'

import {AddDataPengguna} from './components/add-data-pengguna/AddDataPengguna'
import {UpdateDataPengguna} from './components/update-data-pengguna/UpdateDataPengguna'
import {DetailDataPengguna} from './components/detail-data-pengguna/DetailDataPengguna'

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
          path='drawer-chat'
          element={
            <>
              <PageTitle breadcrumbs={dataPenggunaBreadcrumbs}>Drawer chat</PageTitle>
              <Drawer />
            </>
          }
        />
        <Route index element={<Navigate to='/data-pengguna' />} />
      </Route>
    </Routes>
  )
}

export default ManajemenPenggunaPage
