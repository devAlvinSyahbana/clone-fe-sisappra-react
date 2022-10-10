import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

import {InformasiDataPegawai} from './components/InformasiDataPegawai'
import {DetailInformasiDataPegawai} from './components/DetailInformasiDataPegawai'
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
import {TabDaftarUrutKepangkatan} from './components/laporanRekapPegawai-tabs/TabDaftarUrutKepangkatan'

import {TabRekapitulasiPPNS} from './components/laporanPPNS-tabs/TabRekapitulasiPPNS'
import {UnduhLaporanRekapitulasiPPNSPdf} from './components/laporanPPNS-unduh/UnduhLaporanRekapitulasiPPNSPdf'
import {TabDataPPNS} from './components/laporanPPNS-tabs/TabDataPPNS'
import {UpdateDataPPNS} from './components/update-tabs-ppns/UpdateDataPPNS'
import {AddDataPPNS} from './components/add-tabs-ppns/AddDataPPNS'
import {TabDataPegawaiYangNaikPangkat} from './components/laporanRekapPegawai-tabs/TabDataPegawaiYangNaikPangkat'
import {UpdateNaikPangkat} from './components/update-tabs/UpdateNaikPangkat'

import {DataPPNS} from './components/tabs-ppns/DataPPNS'

import {TabRekapitulasiDataPegawaiPensiun} from './components/laporanRekapPegawai-tabs/TabRekapitulasiDataPegawaiPensiun'

import {AddDataPribadiDUK} from './components/add-tabs-duk/AddDataPribadiDUK'
import {AddDataKeluargaDUK} from './components/add-tabs-duk/AddDataKeluargaDUK'
import {AddPendidikanDUK} from './components/add-tabs-duk/AddPendidikanDUK'
import {AddDataKepegawaianDUK} from './components/add-tabs-duk/AddDataKepegawaianDUK'
import {DataPribadiDUK} from './components/tabs-duk/DataPribadiDUK'
import {DataKeluargaDUK} from './components/tabs-duk/DataKeluargaDUK'
import {DataKepegawaianDUK} from './components/tabs-duk/DataKepegawaianDUK'
import {PendidikanDUK} from './components/tabs-duk/PendidikanDUK'
import {HirarkiKepegawaianDUK} from './components/tabs-duk/HirarkiKepegawaianDUK'

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
    path: '/kepegawaian/laporan-rekapitulasi-pegawai/tab-daftar-urut-kepangkatan',
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
          path='detail-informasi-data-pegawai'
          element={
            <>
              <PageTitle breadcrumbs={informasidatapegawaiBreadCrumbs}>
                Detail Informasi Data Pegawai
              </PageTitle>
              <DetailInformasiDataPegawai />
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
        {/* Tab Detail Rekapitulasi Data Pejabat Fungsional */}
        <Route
          path='LaporanRekapitulasiPegawai/TabRekapitulasiPejabatFungsional/PejabatFungsional_DataPribadi/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Data Pribadi</PageTitle>
              <PejabatFungsional_DataPribadi />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/TabRekapitulasiPejabatFungsional/PejabatFungsional_DataKeluarga/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Data Keluarga</PageTitle>
              <PejabatFungsional_DataKeluarga />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/TabRekapitulasiPejabatFungsional/PejabatFungsional_Pendidikan/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Pendidikan</PageTitle>
              <PejabatFungsional_Pendidikan />
            </>
          }
        />
        <Route
          path='LaporanRekapitulasiPegawai/TabRekapitulasiPejabatFungsional/PejabatFungsional_DataKepegawaian/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Data Kepegawaian</PageTitle>
              <PejabatFungsional_DataKepegawaian />
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
          path='tab-daftar-urut-kepangkatan/tambah-data-kepegawaian-duk/'
          element={
            <>
              <PageTitle breadcrumbs={daftarurutkepangkatanBreadCrumbs}>
                Tambah Data Kepegawaian DUK
              </PageTitle>
              <AddDataKepegawaianDUK />
            </>
          }
        />
        <Route
          path='tab-daftar-urut-kepangkatan/tambah-pendidikan-duk/'
          element={
            <>
              <PageTitle breadcrumbs={daftarurutkepangkatanBreadCrumbs}>
                Tambah Data Pendidikan DUK
              </PageTitle>
              <AddPendidikanDUK />
            </>
          }
        />
        <Route
          path='tab-daftar-urut-kepangkatan/tambah-data-keluarga-duk/'
          element={
            <>
              <PageTitle breadcrumbs={daftarurutkepangkatanBreadCrumbs}>
                Tambah Data Keluarga DUK
              </PageTitle>
              <AddDataKeluargaDUK />
            </>
          }
        />
        <Route
          path='tab-daftar-urut-kepangkatan/tambah-data-pribadi-duk/'
          element={
            <>
              <PageTitle breadcrumbs={daftarurutkepangkatanBreadCrumbs}>
                Tambah Data Pribadi DUK
              </PageTitle>
              <AddDataPribadiDUK />
            </>
          }
        />
        <Route
          path='tab-daftar-urut-kepangkatan/data-pribadi-duk/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Detail Data Pribadi DUK</PageTitle>
              <DataPribadiDUK />
            </>
          }
        />
        <Route
          path='tab-daftar-urut-kepangkatan/data-keluarga-duk/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Detail Data Keluarga DUK</PageTitle>
              <DataKeluargaDUK />
            </>
          }
        />
        <Route
          path='tab-daftar-urut-kepangkatan/data-kepegawaian-duk/:id/:status'
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
          path='tab-daftar-urut-kepangkatan/pendidikan-duk/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>Detail Data Pendidikan DUK</PageTitle>
              <PendidikanDUK />
            </>
          }
        />
        <Route
          path='tab-daftar-urut-kepangkatan/hirarki-kepegawaian-duk/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={kepegawaianBreadCrumbs}>
                Detail Hirarki Kepegawaian DUK
              </PageTitle>
              <HirarkiKepegawaianDUK />
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
          path='tab-data-ppns/ubah-data-ppns/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={penyidikpegawainegerisipilBreadCrumbs}>
                Ubah Data PPNS
              </PageTitle>
              <UpdateDataPPNS />
            </>
          }
        />
        <Route
          path='tab-data-ppns/data-ppns/:id/:status'
          element={
            <>
              <PageTitle breadcrumbs={penyidikpegawainegerisipilBreadCrumbs}>
                Detail Data PPNS
              </PageTitle>
              <DataPPNS />
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
