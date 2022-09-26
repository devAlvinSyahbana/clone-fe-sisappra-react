import React from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'

import { InformasiDataPegawai } from './components/InformasiDataPegawai'
import { DetailInformasiDataPegawai } from './components/DetailInformasiDataPegawai'
import { HirarkiPegawai } from './components/HirarkiPegawai'
import { LaporanRekapitulasiPegawai } from './components/LaporanRekapitulasiPegawai'
import { PenyidikPegawaiNegeriSipil } from './components/PenyidikPegawaiNegeriSipil'
import { KehadiranPegawai } from './components/KehadiranPegawai'

import { JadwalPiket } from './components/JadwalPiket'
import { TabRekapitulasiPiketPegawai } from './components/jadwalPiket-tabs/TabRekapitulasiPiketPegawai'

import { DataPribadi } from './components/tabs/DataPribadi'
import { DataKeluarga } from './components/tabs/DataKeluarga'
import { Pendidikan } from './components/tabs/Pendidikan'
import { DataKepegawaian } from './components/tabs/DataKepegawaian'
import { HirarkiKepegawaian } from './components/tabs/HirarkiKepegawaian'

import { UpdateDataPribadi } from './components/update-tabs/UpdateDataPribadi'
import { UpdateDataKeluarga } from './components/update-tabs/UpdateDataKeluarga'
import { UpdatePendidikan } from './components/update-tabs/UpdatePendidikan'
import { UpdateDataKepegawaian } from './components/update-tabs/UpdateDataKepegawaian'
import { TabLaporanRekapitulasiPegawai } from './components/laporanRekapPegawai-tabs/TabLaporanRekapitulasiPegawai'
import { TabDaftarUrutKepangkatan } from './components/laporanRekapPegawai-tabs/TabDaftarUrutKepangkatan'
import { TabDataPPNS } from './components/laporanPPNS-tabs/TabDataPPNS'
import { UpdateDataPPNS } from './components/update-tabs-ppns/UpdateDataPPNS'
import { AddDataPPNS } from './components/add-tabs-ppns/AddDataPPNS'
import { TabDataPegawaiYangNaikPangkat } from './components/laporanRekapPegawai-tabs/TabDataPegawaiYangNaikPangkat'
import { UpdateNaikPangkat } from './components/update-tabs/UpdateNaikPangkat'

import { TabRekapitulasiDataPegawaiPensiun } from './components/laporanRekapPegawai-tabs/TabRekapitulasiDataPegawaiPensiun'
import { TambahPegawaiPensiun } from './components/Tambah-tabs/TambahPegawaiPensiun'

import { AddDataPribadiDUK } from './components/add-tabs-duk/AddDataPribadiDUK'
import { AddDataKeluargaDUK } from './components/add-tabs-duk/AddDataKeluargaDUK'
import { AddPendidikanDUK } from './components/add-tabs-duk/AddPendidikanDUK'
import { AddDataKepegawaianDUK } from './components/add-tabs-duk/AddDataKepegawaianDUK'
import { UpdateDataPribadiDUK } from './components/update-tabs-duk/UpdateDataPribadiDUK'
import { UpdateDataKeluargaDUK } from './components/update-tabs-duk/UpdateDataKeluargaDUK'
import { UpdatePendidikanDUK } from './components/update-tabs-duk/UpdatePendidikanDUK'
import { UpdateDataKepegawaianDUK } from './components/update-tabs-duk/UpdateDataKepegawaianDUK'
import { UnduhLaporanRekapitulasiPegawai } from './components/laporanRekapPegawai-unduh/UnduhLaporanRekapitulasiPegawaiPdf'
import { TabRekapitulasiDataPegawaiPejabatStruktural } from './components/laporanRekapPegawai-tabs/TabRekapitulasiDataPegawaiPejabatStruktural'
import { TabRekapitulasiPejabatStruktural } from './components/laporanRekapPegawai-tabs/TabRekapitulasiPejabatStruktural'
import { TabRekapitulasiPejabatFungsional } from './components/laporanRekapPegawai-tabs/TabRekapitulasiPejabatFungsional'

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
              {/* <UpdateInformasiDataPegawai /> */}
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
          path='LaporanRekapitulasiPegawai/TabLaporanRekapitulasiPegawai'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Laporan Rekapitulasi Pegawai
              </PageTitle>
              <TabLaporanRekapitulasiPegawai />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/TabLaporanRekapitulasiPegawai/UnduhLaporanRekapitulasiPegawai'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Laporan Rekapitulasi Pegawai
              </PageTitle>
              <UnduhLaporanRekapitulasiPegawai />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/TabLaporanRekapitulasiPegawai'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Laporan Rekapitulasi Pegawai
              </PageTitle>
              <TabLaporanRekapitulasiPegawai />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/TabRekapitulasiDataPegawaiPensiun'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Laporan Rekapitulasi Pegawai
              </PageTitle>
              <TabRekapitulasiDataPegawaiPensiun />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/TabDaftarUrutKepangkatan'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Daftar Urut Kepangkatan</PageTitle>
              <TabDaftarUrutKepangkatan />
            </>
          }
        />
        <Route
          path='PenyidikPegawaiNegeriSipil/TabDataPPNS'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Penyidik Pegawai Negeri Sipil
              </PageTitle>
              <TabDataPPNS />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/TabRekapitulasiDataPegawaiPejabatStruktural'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Laporan Rekapitulasi Pegawai
              </PageTitle>
              <TabRekapitulasiDataPegawaiPejabatStruktural />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/TabRekapitulasiPejabatStruktural'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Rekapitulasi Pejabat Struktural
              </PageTitle>
              <TabRekapitulasiPejabatStruktural />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/TabDataPegawaiYangNaikPangkat'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                TabData Pegawai Yang Naik Pangkat
              </PageTitle>
              <TabDataPegawaiYangNaikPangkat />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/TabRekapitulasiPejabatFungsional'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Rekapitulasi Data Pejabat Fungsional Pol PP (JFT)
              </PageTitle>
              <TabRekapitulasiPejabatFungsional />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/TabRekapitulasiPejabatFungsional'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Rekapitulasi Data Pejabat Fungsional Pol PP (JFT)
              </PageTitle>
              <TabRekapitulasiPejabatFungsional />
            </>
          }
        />
        <Route
          path='TabDataPegawaiYangNaikPangkat/UpdateNaikPangkat/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Update Naik Pangkat</PageTitle>
              <UpdateNaikPangkat />
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
          path='JadwalPiket/TabRekapitulasiPiketPegawai'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Rekapitulasi Piket Pegawai</PageTitle>
              <TabRekapitulasiPiketPegawai />
            </>
          }
        />
        <Route
          path='InformasiDataPegawai/DataPribadi/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Data Pribadi</PageTitle>
              <DataPribadi />
            </>
          }
        />
        <Route
          path='InformasiDataPegawai/DataKeluarga/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Data Keluarga</PageTitle>
              <DataKeluarga />
            </>
          }
        />
        <Route
          path='InformasiDataPegawai/Pendidikan/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Pendidikan</PageTitle>
              <Pendidikan />
            </>
          }
        />
        <Route
          path='InformasiDataPegawai/DataKepegawaian/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Data Kepegawaian</PageTitle>
              <DataKepegawaian />
            </>
          }
        />
        <Route
          path='InformasiDataPegawai/HirarkiKepegawaian/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Hirarki Kepegawaian</PageTitle>
              <HirarkiKepegawaian />
            </>
          }
        />

        <Route
          path='InformasiDataPegawai/UpdateDataPribadi/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data Pribadi</PageTitle>
              <UpdateDataPribadi />
            </>
          }
        />
        <Route
          path='InformasiDataPegawai/UpdateDataKeluarga/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data Keluarga</PageTitle>
              <UpdateDataKeluarga />
            </>
          }
        />
        <Route
          path='InformasiDataPegawai/UpdatePendidikan/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Pendidikan</PageTitle>
              <UpdatePendidikan />
            </>
          }
        />
        <Route
          path='InformasiDataPegawai/UpdateDataKepegawaian/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data Kepegawaian</PageTitle>
              <UpdateDataKepegawaian />
            </>
          }
        />

        {/* Tambah Piket */}
        <Route
          path='LaporanRekapitulasiPegawai/TambahPegawaiPensiun'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Tambah Data Pegawai Pensiun
              </PageTitle>
              <TambahPegawaiPensiun />
            </>
          }
        />

        {/* Daftar Urut Kepangkatan */}
        <Route
          path='TabDaftarUrutKepangkatan/UpdateDataPribadiDUK/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data Kepegawaian DUK</PageTitle>
              <UpdateDataPribadiDUK />
            </>
          }
        />
        <Route
          path='TabDaftarUrutKepangkatan/UpdateDataKeluargaDUK/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data Kepegawaian DUK</PageTitle>
              <UpdateDataKeluargaDUK />
            </>
          }
        />
        <Route
          path='TabDaftarUrutKepangkatan/UpdatePendidikanDUK/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data Kepegawaian DUK</PageTitle>
              <UpdatePendidikanDUK />
            </>
          }
        />
        <Route
          path='TabDaftarUrutKepangkatan/UpdateDataKepegawaianDUK/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data Kepegawaian DUK</PageTitle>
              <UpdateDataKepegawaianDUK />
            </>
          }
        />
        <Route
          path='TabDaftarUrutKepangkatan/AddDataKepegawaianDUK/'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Tambah Data Kepegawaian DUK
              </PageTitle>
              <AddDataKepegawaianDUK />
            </>
          }
        />
        <Route
          path='TabDaftarUrutKepangkatan/AddDataPendidikanDUK/'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Tambah Data Pendidikan DUK</PageTitle>
              <AddPendidikanDUK />
            </>
          }
        />
        <Route
          path='TabDaftarUrutKepangkatan/AddDataKeluargaDUK/'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Tambah Data Keluarga DUK</PageTitle>
              <AddDataKeluargaDUK />
            </>
          }
        />
        <Route
          path='TabDaftarUrutKepangkatan/AddDataPribadiDUK/'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Tambah Data Pribadi DUK</PageTitle>
              <AddDataPribadiDUK />
            </>
          }
        />
        {/* End DUK */}

        {/* PPNS */}
        <Route
          path='TabDataPPNS/UpdateDataPPNS/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Ubah Data PPNS</PageTitle>
              <UpdateDataPPNS />
            </>
          }
        />
        <Route
          path='TabDataPPNS/AddDataPPNS/'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Tambah Data PPNS</PageTitle>
              <AddDataPPNS />
            </>
          }
        />
        {/* End PPNS */}

        <Route index element={<Navigate to='/kepegawaian' />} />
      </Route>
    </Routes>
  )
}

export default KepegawaianPage
