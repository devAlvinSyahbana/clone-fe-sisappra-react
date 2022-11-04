import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

import {InformasiDataPegawai} from './components/InformasiDataPegawai'
import {HirarkiPegawai} from './components/HirarkiPegawai'
import {PenyidikPegawaiNegeriSipil} from './components/PenyidikPegawaiNegeriSipil'
import {KehadiranPegawai} from './components/KehadiranPegawai'

import {JadwalPiket} from './components/JadwalPiket'
import {TabRekapitulasiPiketPegawai} from './components/jadwalPiket-tabs/TabRekapitulasiPiketPegawai'

import {DataPribadi} from './components/tabs/DataPribadi'
import {DataKeluarga} from './components/tabs/DataKeluarga'
import {Pendidikan} from './components/tabs/Pendidikan'
import {DataKepegawaian} from './components/tabs/DataKepegawaian'
import {HirarkiKepegawaian} from './components/tabs/HirarkiKepegawaian'

import {UpdateDataPribadi} from './components/update-tabs/UpdateDataPribadi'
import {UpdateDataKeluarga} from './components/update-tabs/UpdateDataKeluarga'
import {UpdatePendidikan} from './components/update-tabs/UpdatePendidikan'
import {UpdateDataKepegawaian} from './components/update-tabs/UpdateDataKepegawaian'
import {TabLaporanRekapitulasiPegawai} from './components/laporanRekapPegawai-tabs/TabLaporanRekapitulasiPegawai'

import {TabRekapitulasiPPNS} from './components/laporanPPNS-tabs/TabRekapitulasiPPNS'
import {UnduhLaporanRekapitulasiPPNSPdf} from './components/laporanPPNS-unduh/UnduhLaporanRekapitulasiPPNSPdf'
import {TabDataPPNS} from './components/laporanPPNS-tabs/TabDataPPNS'
import {UpdateDataPPNS} from './components/update-tabs-ppns/UpdateDataPPNS'
import {AddDataPPNS} from './components/add-tabs-ppns/AddDataPPNS'
import {TabDataPegawaiYangNaikPangkat} from './components/laporanRekapPegawai-tabs/TabDataPegawaiYangNaikPangkat'
import {UpdateNaikPangkat} from './components/update-naik-pangkat/UpdateNaikPangkat'
import {UnduhNaikPangkatPdf} from './components/unduh-naik-pangkat/UnduhNaikPangkatPdf'

import {TabRekapitulasiDataPegawaiPensiun} from './components/laporanRekapPegawai-tabs/TabRekapitulasiDataPegawaiPensiun'

import {DataPribadiDUK} from './components/tabs-duk/DataPribadiDUK'
import {DataKeluargaDUK} from './components/tabs-duk/DataKeluargaDUK'
import {DataKepegawaianDUK} from './components/tabs-duk/DataKepegawaianDUK'
import {PendidikanDUK} from './components/tabs-duk/PendidikanDUK'
import {HirarkiKepegawaianDUK} from './components/tabs-duk/HirarkiKepegawaianDUK'
import {TabDaftarUrutKepangkatan} from './components/laporanRekapPegawai-tabs/TabDaftarUrutKepangkatan'
import {TambahDaftarUrutKepangkatan} from './components/add-tabs-duk/TambahDaftarUrutKepangkatan'

import {UnduhLaporanRekapitulasiPegawai} from './components/laporanRekapPegawai-unduh/UnduhLaporanRekapitulasiPegawaiPdf'
import {TabRekapitulasiPejabatStruktural} from './components/laporanRekapPegawai-tabs/TabRekapitulasiPejabatStruktural'

import {TabRekapitulasiPejabatFungsional} from './components/laporanRekapPegawai-tabs/TabRekapitulasiPejabatFungsional'
import {PejabatFungsional_DataKeluarga} from './components/laporanRekapPegawai-tabs/DetailTabRekapDataPejabatFungsional/PejabatFungsional_DataKeluarga'
import {PejabatFungsional_DataPribadi} from './components/laporanRekapPegawai-tabs/DetailTabRekapDataPejabatFungsional/PejabatFungsional_DataPribadi'
import {PejabatFungsional_Pendidikan} from './components/laporanRekapPegawai-tabs/DetailTabRekapDataPejabatFungsional/PejabatFungsional_Pendidikan'
import {PejabatFungsional_DataKepegawaian} from './components/laporanRekapPegawai-tabs/DetailTabRekapDataPejabatFungsional/PejabatFungsional_DataKepegawaian'

const kepegawaianBreadCrumbs: Array<PageLink> = [
  {
    title: 'Kepegawaian',
    path: '/kepegawaian/informasi-data-pegawai',
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

const informasidatapegawaiBreadCrumbs: Array<PageLink> = [
  {
    title: 'Kepegawaian',
    path: '/kepegawaian/informasi-data-pegawai',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
  {
    title: 'Informasi Data Pegawai',
    path: '/kepegawaian/informasi-data-pegawai',
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

const daftarurutkepangkatanBreadCrumbs: Array<PageLink> = [
  {
    title: 'Kepegawaian',
    path: '/kepegawaian/informasi-data-pegawai',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
  {
    title: 'Daftar Urut Kepangkatan',
    path: '/kepegawaian/add-tabs-duk/tambah-daftar-urut-kepangkatan',
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

const penyidikpegawainegerisipilBreadCrumbs: Array<PageLink> = [
  {
    title: 'Kepegawaian',
    path: '/kepegawaian/informasi-data-pegawai',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
  {
    title: 'Penyidik Pegawai Negeri Sipil',
    path: '/kepegawaian/penyidik-pegawai-negeri-sipil/tab-data-ppns',
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

const rekapitulasiPegawaiBreadCrumbs: Array<PageLink> = [
  {
    title: 'Kepegawaian',
    path: '/kepegawaian/informasi-data-pegawai',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
  {
    title: 'Laporan Rekapitulasi Pegawai',
    path: '/kepegawaian/laporan-rekapitulasi-pegawai',
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
        {/* Start Routes informasi data pegawai */}
        <Route
          path='informasi-data-pegawai'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Informasi Data Pegawai</PageTitle>
              <InformasiDataPegawai />
            </>
          }
        />
        <Route
          path='informasi-data-pegawai/detail-data-pribadi/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={informasidatapegawaiBreadCrumbs}>
                Detail Data Pribadi
              </PageTitle>
              <DataPribadi />
            </>
          }
        />
        <Route
          path='informasi-data-pegawai/detail-data-keluarga/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={informasidatapegawaiBreadCrumbs}>
                Detail Data Keluarga
              </PageTitle>
              <DataKeluarga />
            </>
          }
        />
        <Route
          path='informasi-data-pegawai/detail-data-pendidikan/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={informasidatapegawaiBreadCrumbs}>Detail Pendidikan</PageTitle>
              <Pendidikan />
            </>
          }
        />
        <Route
          path='informasi-data-pegawai/detail-data-kepegawaian/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={informasidatapegawaiBreadCrumbs}>
                Detail Data Kepegawaian
              </PageTitle>
              <DataKepegawaian />
            </>
          }
        />
        <Route
          path='informasi-data-pegawai/detail-hirarki-kepegawaian/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={informasidatapegawaiBreadCrumbs}>
                Detail Hirarki Kepegawaian
              </PageTitle>
              <HirarkiKepegawaian />
            </>
          }
        />
        <Route
          path='informasi-data-pegawai/ubah-data-pribadi/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={informasidatapegawaiBreadCrumbs}>Ubah Data Pribadi</PageTitle>
              <UpdateDataPribadi />
            </>
          }
        />
        <Route
          path='informasi-data-pegawai/ubah-data-keluarga/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={informasidatapegawaiBreadCrumbs}>
                Ubah Data Keluarga
              </PageTitle>
              <UpdateDataKeluarga />
            </>
          }
        />
        <Route
          path='informasi-data-pegawai/ubah-data-pendidikan/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={informasidatapegawaiBreadCrumbs}>Ubah Pendidikan</PageTitle>
              <UpdatePendidikan />
            </>
          }
        />
        <Route
          path='informasi-data-pegawai/ubah-data-kepegawaian/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={informasidatapegawaiBreadCrumbs}>
                Ubah Data Kepegawaian
              </PageTitle>
              <UpdateDataKepegawaian />
            </>
          }
        />
        {/* End Routes informasi data pegawai */}

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
          path='laporan-rekapitulasi-pegawai'
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
          path='laporan-rekapitulasi-pegawai/unduh-laporan-rekapitulasi-pegawai'
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
          path='laporan-rekapitulasi-pegawai/tab-rekapitulasi-data-pegawai-pensiun'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Rekapitulasi Pegawai Pensiun
              </PageTitle>
              <TabRekapitulasiDataPegawaiPensiun />
            </>
          }
        />
        <Route
          path='laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Daftar Urut Kepangkatan</PageTitle>
              <TabDaftarUrutKepangkatan />
            </>
          }
        />
        <Route
          path='PenyidikPegawaiNegeriSipil/TabRekapitulasiPPNS'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Rekapitulasi Penyidik Pegawai Negeri Sipil
              </PageTitle>
              <TabRekapitulasiPPNS />
            </>
          }
        />
        <Route
          path='PenyidikPegawaiNegeriSipil/TabRekapitulasiPPNS/UnduhLaporanRekapitulasiPPNSPdf'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Download Laporan Rekapitulasi PPNS
              </PageTitle>
              <UnduhLaporanRekapitulasiPPNSPdf />
            </>
          }
        />
        <Route
          path='penyidik-pegawai-negeri-sipil/tab-data-ppns'
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
        {/*Naik Pangkat*/}
        <Route
          path='LaporanRekapitulasiPegawai/TabDataPegawaiYangNaikPangkat'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Data Pegawai Yang Naik Pangkat
              </PageTitle>
              <TabDataPegawaiYangNaikPangkat />
            </>
          }
        />
        <Route
          path='update-naik-pangkat/UpdateNaikPangkat/:id'
          element={
            <>
              <PageTitle breadcrumbs={informasidatapegawaiBreadCrumbs}>
                Update Naik Pangkat
              </PageTitle>
              <UpdateNaikPangkat />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/UnduhNaikPangkatPdf'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Unduh Naik Pangkat PDF</PageTitle>
              <UnduhNaikPangkatPdf />
            </>
          }
        />
        {/*End Naik Pngkat*/}
        <Route
          path='laporan-rekapitulasi-pegawai/tab-rekapitulasi-pejabat-fungsional'
          element={
            <>
              <PageTitle breadcrumbs={rekapitulasiPegawaiBreadCrumbs}>
                Rekapitulasi Data Pejabat Fungsional Pol PP (JFT)
              </PageTitle>
              <TabRekapitulasiPejabatFungsional />
            </>
          }
        />
        {/* Tab Detail Rekapitulasi Data Pejabat Fungsional */}
        <Route
          path='laporan-rekapitulasi-pegawai/tab-rekapitulasi-pejabat-fungsional/PejabatFungsional_DataPribadi/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={rekapitulasiPegawaiBreadCrumbs}>Data Pribadi</PageTitle>
              <PejabatFungsional_DataPribadi />
            </>
          }
        />
        <Route
          path='laporan-rekapitulasi-pegawai/tab-rekapitulasi-pejabat-fungsional/PejabatFungsional_DataKeluarga/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={rekapitulasiPegawaiBreadCrumbs}>Data Keluarga</PageTitle>
              <PejabatFungsional_DataKeluarga />
            </>
          }
        />
        <Route
          path='laporan-rekapitulasi-pegawai/tab-rekapitulasi-pejabat-fungsional/PejabatFungsional_Pendidikan/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={rekapitulasiPegawaiBreadCrumbs}>Pendidikan</PageTitle>
              <PejabatFungsional_Pendidikan />
            </>
          }
        />
        <Route
          path='laporan-rekapitulasi-pegawai/tab-rekapitulasi-pejabat-fungsional/PejabatFungsional_DataKepegawaian/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={rekapitulasiPegawaiBreadCrumbs}>Data Kepegawaian</PageTitle>
              <PejabatFungsional_DataKepegawaian />
            </>
          }
        />
        <Route
          path='penyidik-pegawai-negeri-sipil'
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
          path='laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan/detail-data-pribadi-duk/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Detail Data Pribadi DUK</PageTitle>
              <DataPribadiDUK />
            </>
          }
        />
        <Route
          path='laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan/detail-data-keluarga-duk/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Detail Data Keluarga DUK</PageTitle>
              <DataKeluargaDUK />
            </>
          }
        />
        <Route
          path='laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan/detail-data-kepegawaian-duk/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Detail Data Kepegawaian DUK
              </PageTitle>
              <DataKepegawaianDUK />
            </>
          }
        />
        <Route
          path='laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan/detail-pendidikan-duk/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Detail Data Pendidikan DUK</PageTitle>
              <PendidikanDUK />
            </>
          }
        />
        <Route
          path='laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan/detail-hirarki-kepegawaian-duk/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Detail Hirarki Kepegawaian DUK
              </PageTitle>
              <HirarkiKepegawaianDUK />
            </>
          }
        />
        <Route
          path='laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan/tambah-daftar-urut-kepangkatan'
          element={
            <>
              <PageTitle breadcrumbs={daftarurutkepangkatanBreadCrumbs}>
                Tambah Data Daftar Urut Kepangkatan
              </PageTitle>
              <TambahDaftarUrutKepangkatan />
            </>
          }
        />
        {/* End DUK */}

        {/* PPNS */}
        <Route
          path='tab-data-ppns/tambah-data-ppns/'
          element={
            <>
              <PageTitle breadcrumbs={penyidikpegawainegerisipilBreadCrumbs}>
                Tambah Data PPNS
              </PageTitle>
              <AddDataPPNS />
            </>
          }
        />
        <Route
          path='tab-data-ppns/ubah-data-ppns/:id'
          element={
            <>
              <PageTitle breadcrumbs={penyidikpegawainegerisipilBreadCrumbs}>
                Ubah Data PPNS
              </PageTitle>
              <UpdateDataPPNS />
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
