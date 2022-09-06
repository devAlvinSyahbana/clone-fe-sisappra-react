import React from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'

import { InformasiDataPegawai } from './components/InformasiDataPegawai'
import { UpdateInformasiDataPegawai } from './components/UpdateInformasiDataPegawai'
import { DetailInformasiDataPegawai } from './components/DetailInformasiDataPegawai'
import { HirarkiPegawai } from './components/HirarkiPegawai'
import { LaporanRekapitulasiPegawai } from './components/LaporanRekapitulasiPegawai'
import { PenyidikPegawaiNegeriSipil } from './components/PenyidikPegawaiNegeriSipil'
import { KehadiranPegawai } from './components/KehadiranPegawai'
import { JadwalPiket } from './components/JadwalPiket'

import { DataPribadi } from './components/tabs/DataPribadi'
import { DataKeluarga } from './components/tabs/DataKeluarga'
import { Pendidikan } from './components/tabs/Pendidikan'
import { DataKepegawaian } from './components/tabs/DataKepegawaian'
import { HirarkiKepegawaian } from './components/tabs/HirarkiKepegawaian'

import { UpdateDataPribadi } from './components/update-tabs/UpdateDataPribadi'
import { UpdateDataKeluarga } from './components/update-tabs/UpdateDataKeluarga'
import { UpdatePendidikan } from './components/update-tabs/UpdatePendidikan'


const kepegawaianBreadCrumbs: Array<PageLink> = [
  {
    title: 'Kepegawaian',
    path: '/kepegawaian/InformasiDataPegawai',
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

const KepegawaianPage: React.FC = () => {
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
          path='InformasiDataPegawai'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Informasi Data Pegawai</PageTitle>
              <InformasiDataPegawai />
            </>
          }
        />
        <Route
          path='DetailInformasiDataPegawai'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Detail Informasi Data Pegawai</PageTitle>
              <DetailInformasiDataPegawai />
            </>
          }
        />
        <Route
          path='UpdateInformasiDataPegawai'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Update Informasi Data Pegawai</PageTitle>
              <UpdateInformasiDataPegawai />
            </>
          }
        />
        <Route
          path='HirarkiPegawai'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Hirarki Pegawai</PageTitle>
              <HirarkiPegawai />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Laporan Rekapitulasi Pegawai</PageTitle>
              <LaporanRekapitulasiPegawai />
            </>
          }
        />
        <Route
          path='PenyidikPegawaiNegeriSipil'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Penyidik Pegawai Negeri Sipil (PPNS)</PageTitle>
              <PenyidikPegawaiNegeriSipil />
            </>
          }
        />
        <Route
          path='KehadiranPegawai'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Kehadiran Pegawai</PageTitle>
              <KehadiranPegawai />
            </>
          }
        />
        <Route
          path='JadwalPiket'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Jadwal Piket</PageTitle>
              <JadwalPiket />
            </>
          }
        />
        <Route
          path='DataPribadi'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Data Pribadi</PageTitle>
              <DataPribadi />
            </>
          }
        />
        <Route
          path='DataKeluarga'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Data Keluarga</PageTitle>
              <DataKeluarga />
            </>
          }
        />
        <Route
          path='Pendidikan'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Pendidikan</PageTitle>
              <Pendidikan />
            </>
          }
        />
        <Route
          path='DataKepegawaian'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Data Kepegawaian</PageTitle>
              <DataKepegawaian />
            </>
          }
        />
        <Route
          path='HirarkiKepegawaian'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Hirarki Kepegawaian</PageTitle>
              <HirarkiKepegawaian />
            </>
          }
        />

        <Route
          path='UpdateDataPribadi'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data Pribadi</PageTitle>
              <UpdateDataPribadi />
            </>
          }
        />
        <Route
          path='UpdateDataKeluarga'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data Keluarga</PageTitle>
              <UpdateDataKeluarga />
            </>
          }
        />
        <Route
          path='UpdatePendidikan'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Pendidikan</PageTitle>
              <UpdatePendidikan />
            </>
          }
        />

        <Route index element={<Navigate to='/kepegawaian' />} />
      </Route>
    </Routes>
  )
}

export default KepegawaianPage
