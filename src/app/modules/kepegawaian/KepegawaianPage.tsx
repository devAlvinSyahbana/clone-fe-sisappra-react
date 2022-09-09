import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

import {InformasiDataPegawai} from './components/InformasiDataPegawai'
import { TabUpdateHeader } from './components/TabUpdateHeader'
import {UpdateInformasiDataPegawai} from './components/UpdateInformasiDataPegawai'
import {DetailInformasiDataPegawai} from './components/DetailInformasiDataPegawai'
import {HirarkiPegawai} from './components/HirarkiPegawai'
import {LaporanRekapitulasiPegawai} from './components/LaporanRekapitulasiPegawai'
import {PenyidikPegawaiNegeriSipil} from './components/PenyidikPegawaiNegeriSipil'
import {KehadiranPegawai} from './components/KehadiranPegawai'
import {JadwalPiket} from './components/JadwalPiket'

import {DataPribadi} from './components/tabs/DataPribadi'
import {DataKeluarga} from './components/tabs/DataKeluarga'
import {Pendidikan} from './components/tabs/Pendidikan'
import {DataKepegawaian} from './components/tabs/DataKepegawaian'
import {HirarkiKepegawaian} from './components/tabs/HirarkiKepegawaian'

import {UpdateDataPribadi} from './components/update-tabs/UpdateDataPribadi'
import {UpdateDataKeluarga} from './components/update-tabs/UpdateDataKeluarga'
import {UpdatePendidikan} from './components/update-tabs/UpdatePendidikan'
import {UpdateDataKepegawaian} from './components/update-tabs/UpdateDataKepegawaian'

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
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Detail Informasi Data Pegawai
              </PageTitle>
              <DetailInformasiDataPegawai />
            </>
          }
        />
        <Route
          path='UpdateInformasiDataPegawai'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Update Informasi Data Pegawai
              </PageTitle>
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
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Laporan Rekapitulasi Pegawai
              </PageTitle>
              <LaporanRekapitulasiPegawai />
            </>
          }
        />
        <Route
          path='PenyidikPegawaiNegeriSipil'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Penyidik Pegawai Negeri Sipil (PPNS)
              </PageTitle>
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
          path='DataPribadi/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Data Pribadi</PageTitle>
              <TabHeader />
              <DataPribadi />
            </>
          }
        />
        <Route
          path='DataKeluarga/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Data Keluarga</PageTitle>
              <TabHeader />
              <DataKeluarga />
            </>
          }
        />
        <Route
          path='Pendidikan/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Pendidikan</PageTitle>
              <TabHeader />
              <Pendidikan />
            </>
          }
        />
        <Route
          path='DataKepegawaian/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Data Kepegawaian</PageTitle>
              <TabHeader />
              <DataKepegawaian />
            </>
          }
        />
        <Route
          path='HirarkiKepegawaian/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Hirarki Kepegawaian</PageTitle>
              <TabHeader />
              <HirarkiKepegawaian />
            </>
          }
        />

        <Route
          path='UpdateDataPribadi'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data Pribadi</PageTitle>
              <TabUpdateHeader />
              <UpdateDataPribadi />
            </>
          }
        />
        <Route
          path='UpdateDataKeluarga'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data Keluarga</PageTitle>
              <TabUpdateHeader />
              <UpdateDataKeluarga />
            </>
          }
        />
        <Route
          path='UpdatePendidikan'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Pendidikan</PageTitle>
              <TabUpdateHeader />
              <UpdatePendidikan />
            </>
          }
        />
        <Route
          path='UpdateDataKepegawaian'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data Kepegawaian</PageTitle>
              <TabUpdateHeader />
              <UpdateDataKepegawaian />
            </>
          }
        />

        <Route index element={<Navigate to='/kepegawaian' />} />
      </Route>
    </Routes>
  )
}

export default KepegawaianPage
