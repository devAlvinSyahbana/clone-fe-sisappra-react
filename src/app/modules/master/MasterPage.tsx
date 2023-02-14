import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

import {Kota} from './components/Kota'
import {LihatKota} from './components/Lihat-master/LihatKota'
import {UpdateKota} from './components/Update-master/UpdateKota'
import {TambahKota} from './components/Tambah-master/TambahKota'

import {Kecamatan} from './components/Kecamatan'
import {LihatKecamatan} from './components/Lihat-master/LihatKecamatan'
import {UpdateKecamatan} from './components/Update-master/UpdateKecamatan'
import {TambahKecamatan} from './components/Tambah-master/TambahKecamatan'

import {Kelurahan} from './components/Kelurahan'
import {LihatKelurahan} from './components/Lihat-master/LihatKelurahan'
import {UpdateKelurahan} from './components/Update-master/UpdateKelurahan'
import {TambahKelurahan} from './components/Tambah-master/TambahKelurahan'

import {JenisKegiatan} from './components/JenisKegiatan'
import {LihatJenisKegiatan} from './components/Lihat-master/LihatJenisKegiatan'
import {UpdateJenisKegiatan} from './components/Update-master/UpdateJenisKegiatan'
import {TambahJenisKegiatan} from './components/Tambah-master/TambahJenisKegiatan'

import {JenisKejadian} from './components/JenisKejadian'
import {LihatJenisKejadian} from './components/Lihat-master/LihatJenisKejadian'
import {UpdateJenisKejadian} from './components/Update-master/UpdateJenisKejadian'
import {TambahJenisKejadian} from './components/Tambah-master/TambahJenisKejadian'

import {JenisPelanggaran} from './components/JenisPelanggaran'

import {JenisPertolongan} from './components/JenisPertolongan'
import {LihatJenisPertolongan} from './components/Lihat-master/LihatJenisPertolongan'
import {UpdateJenisPertolongan} from './components/Update-master/UpdateJenisPertolongan'

import {JenisPerdaPerkada} from './components/JenisPerdaPerkada'
import {LihatJenisPerdaPerkada} from './components/Lihat-master/LihatJenisPerdaPerkada'
import {UpdateJenisPerdaPerkada} from './components/Update-master/UpdateJenisPerdaPerkada'
import {TambahJenisPerdaPerkada} from './components/Tambah-master/TambahJenisPerdaPerkada'

import {JenisPenindakan} from './components/JenisPenindakan'
import {LihatJenisPenindakan} from './components/Lihat-master/LihatJenisPenindakan'
import {UpdateJenisPenindakan} from './components/Update-master/UpdateJenisPenindakan'

import {KorbanJiwa} from './components/KorbanJiwa'
import {LihatKorbanJiwa} from './components/Lihat-master/LihatKorbanJiwa'
import {UpdateKorbanJiwa} from './components/Update-master/UpdateKorbanJiwa'
import {TambahKorbanJiwa} from './components/Tambah-master/TambahKorbanJiwa'

import {KorbanMaterial} from './components/KorbanMaterial'
import {LihatKorbanMaterial} from './components/Lihat-master/LihatKorbanMaterial'
import {UpdateKorbanMaterial} from './components/Update-master/UpdateKorbanMaterial'

import {JenisBantuan} from './components/JenisBantuan'
import {LihatJenisBantuan} from './components/Lihat-master/LihatJenisBantuan'
import {UpdateJenisBantuan} from './components/Update-master/UpdateJenisBantuan'

import {InstansiTerkait} from './components/InstansiTerkait'

import {KondisiSaranaPrasarana} from './components/KondisiSaranaPrasarana'
import {LihatKondisiSaranaPrasarana} from './components/Lihat-master/LihatKondisiSaranaPrasarana'
import {UpdateKondisiSaranaPrasarana} from './components/Update-master/UpdateKondisiSaranaPrasarana'

import {StatusSaranaPrasarana} from './components/StatusSaranaPrasarana'
import {LihatStatusSaranaPrasarana} from './components/Lihat-master/LihatStatusSaranaPrasarana'
import {UpdateStatusSaranaPrasarana} from './components/Update-master/UpdateStatusSaranaPrasarana'

import {Agama} from './components/Agama'
import {LihatAgama} from './components/Lihat-master/LihatAgama'
import {UpdateAgama} from './components/Update-master/UpdateAgama'
import {TambahAgama} from './components/Tambah-master/TambahAgama'

import {Pangkat} from './components/Pangkat'
import {UpdatePangkat} from './components/Update-master/UpdatePangkat'
import {LihatPangkat} from './components/Lihat-master/LihatPangkat'
import {TambahPangkat} from './components/Tambah-master/TambahPangkat'

import {TempatPelaksanaan} from './components/TempatPelaksanaan'
import {UpdateTempatPelaksanaan} from './components/Update-master/UpdateTempatPelaksanaan'
import {LihatTempatPelaksanaan} from './components/Lihat-master/LihatTempatPelaksanaan'

import {SKPD} from './components/SKPD'
import {UpdateSKPD} from './components/Update-master/UpdateSKPD'
import {LihatSKPD} from './components/Lihat-master/LihatSKPD'

import {Pendidikan} from './components/Pendidikan'
import {LihatPendidikan} from './components/Lihat-master/LihatPendidikan'

import {JenisSaranaPrasarana} from './components/JenisSaranaPrasarana'
import {UpdateJenisSaranaPrasarana} from './components/Update-master/UpdateJenisSaranaPrasarana'
import {LihatJenisSaranaPrasarana} from './components/Lihat-master/LihatJenisSaranaPrasarana'

import {Golongan} from './components/Golongan'

import {Eselon} from './components/Eselon'
import {UpdateEselon} from './components/Update-master/UpdateEselon'
import {LihatEselon} from './components/Lihat-master/LihatEselon'

import {Jabatan} from './components/Jabatan'
import {LihatJabatan} from './components/Lihat-master/LihatJabatan'
import {TambahJabatan} from './components/Tambah-master/TambahJabatan'

import {SumberInformasi} from './components/SumberInformasi'
import {UpdateSumberInformasi} from './components/Update-master/UpdateSumberInformasi'
import {LihatSumberInformasi} from './components/Lihat-master/LihatSumberInformasi'

import {JenisKekerasan} from './components/JenisKekerasan'
import {UpdateJenisKekerasan} from './components/Update-master/UpdateJenisKekerasan'
import {LihatJenisKekerasan} from './components/Lihat-master/LihatJenisKekerasan'

// import {JenisPenertiban} from './components/JenisPenertiban'
// import {UpdateJenisPenertiban} from './components/Update-master/UpdateJenisPenertiban'
// import {LihatJenisPenertiban} from './components/Lihat-master/LihatJenisPenertiban'

import {JenisPenyelesaian} from './components/JenisPenyelesaian'

import {StatusKenaikanPangkat} from './components/StatusKenaikanPangkat'
import {LihatStatusKenaikanPangkat} from './components/Lihat-master/LihatStatusKenaikanPangkat'

const masterBreadCrumbs: Array<PageLink> = [
  {
    title: 'Master',
    path: '/master/InformasiDataMaster',
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

const MasterPage: React.FC = () => {
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
          path='Kota'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Kota</PageTitle>
              <Kota />
            </>
          }
        />
        <Route
          path='Kecamatan/UpdateKecamatan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Kecamatan</PageTitle>
              <UpdateKecamatan />
            </>
          }
        />
        <Route
          path='Kecamatan/LihatKecamatan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Kecamatan</PageTitle>
              <LihatKecamatan />
            </>
          }
        />
        <Route
          path='Kecamatan/TambahKecamatan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Tambah Kecamatan</PageTitle>
              <TambahKecamatan />
            </>
          }
        />
        <Route
          path='SKPD'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>SKPD</PageTitle>
              <SKPD />
            </>
          }
        />
        <Route
          path='SKPD/UpdateSKPD/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update SKPD</PageTitle>
              <UpdateSKPD />
            </>
          }
        />
        <Route
          path='SKPD/LihatSKPD/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat SKPD</PageTitle>
              <LihatSKPD />
            </>
          }
        />
        <Route
          path='Pendidikan/LihatPendidikan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Pendidikan</PageTitle>
              <LihatPendidikan />
            </>
          }
        />
        <Route
          path='Pangkat'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Pangkat</PageTitle>
              <Pangkat />
            </>
          }
        />
        <Route
          path='Pangkat/UpdatePangkat/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Pangkat</PageTitle>
              <UpdatePangkat />
            </>
          }
        />
        <Route
          path='Pangkat/LihatPangkat/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Pangkat</PageTitle>
              <LihatPangkat />
            </>
          }
        />
        <Route
          path='Pangkat/TambahPangkat'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Tambah Pangkat</PageTitle>
              <TambahPangkat />
            </>
          }
        />

        <Route
          path='TempatPelaksanaan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Tempat Pelaksanaan</PageTitle>
              <TempatPelaksanaan />
            </>
          }
        />

        <Route
          path='TempatPelaksanaan/UpdateTempatPelaksanaan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update TempatPelaksanaan</PageTitle>
              <UpdateTempatPelaksanaan />
            </>
          }
        />
        <Route
          path='TempatPelaksanaan/LihatTempatPelaksanaan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat TempatPelaksanaan</PageTitle>
              <LihatTempatPelaksanaan />
            </>
          }
        />

        <Route
          path='Golongan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Golongan </PageTitle>
              <Golongan />
            </>
          }
        />
        <Route
          path='JenisSaranaPrasarana'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Jenis Sarana Prasarana </PageTitle>
              <JenisSaranaPrasarana />
            </>
          }
        />
        <Route
          path='JenisSaranaPrasarana/UpdateJenisSaranaPrasarana/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Jenis Sarana Prasarana</PageTitle>
              <UpdateJenisSaranaPrasarana />
            </>
          }
        />
        <Route
          path='JenisSaranaPrasarana/LihatJenisSaranaPrasarana/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Jenis Sarana Prasarana</PageTitle>
              <LihatJenisSaranaPrasarana />
            </>
          }
        />
        <Route
          path='KondisiSaranaPrasarana'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Kondisi Sarana Prasarana </PageTitle>
              <KondisiSaranaPrasarana />
            </>
          }
        />
        <Route
          path='KondisiSaranaPrasarana/UpdateKondisiSaranaPrasarana/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Kondisi Sarana Prasarana</PageTitle>
              <UpdateKondisiSaranaPrasarana />
            </>
          }
        />
        <Route
          path='KondisiSaranaPrasarana/LihatKondisiSaranaPrasarana/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Kondisi Sarana Prasarana</PageTitle>
              <LihatKondisiSaranaPrasarana />
            </>
          }
        />
        <Route
          path='StatusSaranaPrasarana'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Status Sarana Prasarana </PageTitle>
              <StatusSaranaPrasarana />
            </>
          }
        />
        <Route
          path='StatusSaranaPrasarana/UpdateStatusSaranaPrasarana/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Status Sarana Prasarana</PageTitle>
              <UpdateStatusSaranaPrasarana />
            </>
          }
        />
        <Route
          path='StatusSaranaPrasarana/LihatStatusSaranaPrasarana/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Status Sarana Prasarana</PageTitle>
              <LihatStatusSaranaPrasarana />
            </>
          }
        />
        <Route
          path='Kecamatan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Kecamatan</PageTitle>
              <Kecamatan />
            </>
          }
        />
        <Route
          path='Kota/UpdateKota/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Kota</PageTitle>
              <UpdateKota />
            </>
          }
        />
        <Route
          path='Kota/LihatKota/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Kota</PageTitle>
              <LihatKota />
            </>
          }
        />
        <Route
          path='Kota/TambahKota'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Tambah Kota</PageTitle>
              <TambahKota />
            </>
          }
        />
        <Route
          path='Kelurahan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Kelurahan</PageTitle>
              <Kelurahan />
            </>
          }
        />
        <Route
          path='Kelurahan/UpdateKelurahan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Kelurahan</PageTitle>
              <UpdateKelurahan />
            </>
          }
        />
        <Route
          path='Kelurahan/TambahKelurahan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Tambah Kelurahan</PageTitle>
              <TambahKelurahan />
            </>
          }
        />
        <Route
          path='Kelurahan/LihatKelurahan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Kelurahan</PageTitle>
              <LihatKelurahan />
            </>
          }
        />
        <Route
          path='JenisKegiatan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Kegiatan </PageTitle>
              <JenisKegiatan />
            </>
          }
        />
        <Route
          path='JenisKegiatan/UpdateJenisKegiatan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update JenisKegiatan</PageTitle>
              <UpdateJenisKegiatan />
            </>
          }
        />
        <Route
          path='JenisKegiatan/TambahJenisKegiatan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Tambah Jenis Kegiatan</PageTitle>
              <TambahJenisKegiatan />
            </>
          }
        />
        <Route
          path='JenisKegiatan/LihatJenisKegiatan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Jenis Kegiatan</PageTitle>
              <LihatJenisKegiatan />
            </>
          }
        />
        <Route
          path='JenisKejadian'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Kejadian </PageTitle>
              <JenisKejadian />
            </>
          }
        />
        <Route
          path='JenisKejadian/UpdateJenisKejadian/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Jenis Kejadian</PageTitle>
              <UpdateJenisKejadian />
            </>
          }
        />
        <Route
          path='JenisKejadian/LihatJenisKejadian/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Jenis Kejadian</PageTitle>
              <LihatJenisKejadian />
            </>
          }
        />
        <Route
          path='JenisKejadian/TambahJenisKejadian'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Tambah Jenis Kejadian</PageTitle>
              <TambahJenisKejadian />
            </>
          }
        />
        <Route
          path='Agama'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Agama</PageTitle>
              <Agama />
            </>
          }
        />
        <Route
          path='Agama/UpdateAgama/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Agama</PageTitle>
              <UpdateAgama />
            </>
          }
        />
        <Route
          path='Agama/LihatAgama/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Agama</PageTitle>
              <LihatAgama />
            </>
          }
        />
        <Route
          path='Agama/TambahAgama'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Tambah Agama</PageTitle>
              <TambahAgama />
            </>
          }
        />
        <Route
          path='Jabatan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Jabatan </PageTitle>
              <Jabatan />
            </>
          }
        />
        <Route
          path='Jabatan/TambahJabatan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Jabatan </PageTitle>
              <TambahJabatan />
            </>
          }
        />
        <Route
          path='jabatan/update-jabatan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Agama</PageTitle>
              <UpdateAgama />
            </>
          }
        />
        <Route
          path='jabatan/lihat-jabatan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Jabatan</PageTitle>
              <LihatJabatan />
            </>
          }
        />
        <Route
          path='StatusKenaikanPangkat'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Status Kenaikan Pangkat </PageTitle>
              <StatusKenaikanPangkat />
            </>
          }
        />
        <Route
          path='statuskenaikanpangkat/lihat-status-kenaikan-pangkat/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat StatusKenaikanPangkat</PageTitle>
              <LihatStatusKenaikanPangkat />
            </>
          }
        />
        <Route
          path='Eselon'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Eselon </PageTitle>
              <Eselon />
            </>
          }
        />
        <Route
          path='Eselon/UpdateEselon/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Eselon</PageTitle>
              <UpdateEselon />
            </>
          }
        />
        <Route
          path='Eselon/LihatEselon/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Eselon</PageTitle>
              <LihatEselon />
            </>
          }
        />

        <Route
          path='Pendidikan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Pendidikan </PageTitle>
              <Pendidikan />
            </>
          }
        />
        <Route
          path='SumberInformasi'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Sumber Informasi </PageTitle>
              <SumberInformasi />
            </>
          }
        />
        <Route
          path='SumberInformasi/UpdateSumberInformasi/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Sumber Informasi</PageTitle>
              <UpdateSumberInformasi />
            </>
          }
        />
        <Route
          path='SumberInformasi/LihatSumberInformasi/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Sumber Informasi</PageTitle>
              <LihatSumberInformasi />
            </>
          }
        />
        {/* <Route
          path='SumberInformasi/TambahSumberInformasi/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Tambah Sumber Informasi</PageTitle>
              <TambahSumberInformasi />
            </>
          }
        /> */}
        <Route
          path='JenisPelanggaran'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Pelanggaran</PageTitle>
              <JenisPelanggaran />
            </>
          }
        />
        <Route
          path='JenisPertolongan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Pertolongan</PageTitle>
              <JenisPertolongan />
            </>
          }
        />
        <Route
          path='JenisPertolongan/UpdateJenisPertolongan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Jenis Pertolongan</PageTitle>
              <UpdateJenisPertolongan />
            </>
          }
        />
        <Route
          path='JenisPertolongan/LihatJenisPertolongan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Jenis Pertolongan</PageTitle>
              <LihatJenisPertolongan />
            </>
          }
        />
        <Route
          path='JenisPenindakan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Penindakan</PageTitle>
              <JenisPenindakan />
            </>
          }
        />
        <Route
          path='JenisPenindakan/UpdateJenisPenindakan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Jenis Penindakan</PageTitle>
              <UpdateJenisPenindakan />
            </>
          }
        />
        <Route
          path='JenisPenindakan/LihatJenisPenindakan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Jenis Penindakan</PageTitle>
              <LihatJenisPenindakan />
            </>
          }
        />
        <Route
          path='JenisPerdaPerkada'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Perda / Perkada</PageTitle>
              <JenisPerdaPerkada />
            </>
          }
        />
        <Route
          path='JenisPerdaPerkada/LihatJenisPerdaPerkada/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Jenis Perda / Perkada</PageTitle>
              <LihatJenisPerdaPerkada />
            </>
          }
        />
        <Route
          path='JenisPerdaPerkada/UpdateJenisPerdaPerkada/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Jenis Perda / Perkada</PageTitle>
              <UpdateJenisPerdaPerkada />
            </>
          }
        />
        <Route
          path='JenisPerdaPerkada/TambahJenisPerdaPerkada'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Tambah Jenis Perda / Perkada</PageTitle>
              <TambahJenisPerdaPerkada />
            </>
          }
        />
        <Route
          path='JenisKekerasan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Kekerasan</PageTitle>
              <JenisKekerasan />
            </>
          }
        />
        <Route
          path='JenisKekerasan/UpdateJenisKekerasan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update JenisKekerasan</PageTitle>
              <UpdateJenisKekerasan />
            </>
          }
        />
        <Route
          path='JenisKekerasan/LihatJenisKekerasan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat JenisKekerasan</PageTitle>
              <LihatJenisKekerasan />
            </>
          }
        />
        {/* <Route
          path='JenisPenertiban'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Penertiban</PageTitle>
              <JenisPenertiban />
            </>
          }
        />
        <Route
          path='JenisPenertiban/UpdateJenisPenertiban/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update Jenis Penertiban</PageTitle>
              <UpdateJenisPenertiban />
            </>
          }
        />
        <Route
          path='JenisPenertiban/LihatJenisPenertiban/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat Jenis Penertiban</PageTitle>
              <LihatJenisPenertiban />
            </>
          }
        /> */}
        <Route
          path='JenisPenyelesaian'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Penyelesaian</PageTitle>
              <JenisPenyelesaian />
            </>
          }
        />
        <Route
          path='KorbanJiwa'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Korban Jiwa </PageTitle>
              <KorbanJiwa />
            </>
          }
        />
        <Route
          path='KorbanJiwa/UpdateKorbanJiwa/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update KorbanJiwa</PageTitle>
              <UpdateKorbanJiwa />
            </>
          }
        />
        <Route
          path='KorbanJiwa/LihatKorbanJiwa/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat KorbanJiwa</PageTitle>
              <LihatKorbanJiwa />
            </>
          }
        />
        <Route
          path='KorbanJiwa/TambahKorbanJiwa'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Tambah KorbanJiwa</PageTitle>
              <TambahKorbanJiwa />
            </>
          }
        />
        <Route
          path='KorbanMaterial'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Korban Material</PageTitle>
              <KorbanMaterial />
            </>
          }
        />
        <Route
          path='KorbanMaterial/UpdateKorbanMaterial/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update KorbanMaterial</PageTitle>
              <UpdateKorbanMaterial />
            </>
          }
        />
        <Route
          path='KorbanMaterial/LihatKorbanMaterial/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat KorbanMaterial</PageTitle>
              <LihatKorbanMaterial />
            </>
          }
        />
        <Route
          path='JenisBantuan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Bantuan</PageTitle>
              <JenisBantuan />
            </>
          }
        />
        <Route
          path='JenisBantuan/UpdateJenisBantuan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Update JenisBantuan</PageTitle>
              <UpdateJenisBantuan />
            </>
          }
        />
        <Route
          path='JenisBantuan/LihatJenisBantuan/:id'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Lihat JenisBantuan</PageTitle>
              <LihatJenisBantuan />
            </>
          }
        />
        <Route
          path='InstansiTerkait'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Instansi Terkait</PageTitle>
              <InstansiTerkait />
            </>
          }
        />

        <Route index element={<Navigate to='/master' />} />
      </Route>
    </Routes>
  )
}

export default MasterPage
