import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {LaporanSaranaPrasarana} from './components/LaporanSaranaPrasarana'
import {TambahLaporanSarana} from './components/TambahLaporanSarana'
import {UbahLaporanSarana} from './components/UbahLaporanSarana'
import {LihatLaporanSarana} from './components/LihatLaporanSarana'

const sarana_prasaranaBreadCrumbs: Array<PageLink> = [
  {
    title: 'Sarana & Prasarana',
    path: '/sarana-prasarana/LaporanSaranaPrasarana',
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
              <PageTitle breadcrumbs={sarana_prasaranaBreadCrumbs}>
                Laporan Sarana & Prasarana
              </PageTitle>
              <LaporanSaranaPrasarana />
            </>
          }
        />
        <Route
          path='LaporanSaranaPrasarana/TambahLaporanSarana'
          element={
            <>
              <PageTitle breadcrumbs={sarana_prasaranaBreadCrumbs}>Tambah Laporan Sarana</PageTitle>
              <TambahLaporanSarana />
            </>
          }
        />
        <Route
          path='LaporanSaranaPrasarana/UbahLaporanSarana/:id'
          element={
            <>
              <PageTitle breadcrumbs={sarana_prasaranaBreadCrumbs}>Ubah Laporan Sarana</PageTitle>
              <UbahLaporanSarana />
            </>
          }
        />
        <Route
          path='LaporanSaranaPrasarana/LihatLaporanSarana/:id'
          element={
            <>
              <PageTitle breadcrumbs={sarana_prasaranaBreadCrumbs}>Lihat Laporan Sarana</PageTitle>
              <LihatLaporanSarana />
            </>
          }
        />

        <Route index element={<Navigate to='/sarana-prasarana' />} />
      </Route>
    </Routes>
  )
}

export default SaranaPrasaranaPage
