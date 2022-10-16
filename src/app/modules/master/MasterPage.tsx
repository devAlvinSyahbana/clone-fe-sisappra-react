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
import {JenisPelanggaran} from './components/JenisPelanggaran'
import {JenisPertolongan} from './components/JenisPertolongan'
import {JenisPerdaPerkada} from './components/JenisPerdaPerkada'
import {JenisPenindakan} from './components/JenisPenindakan'

import {KorbanJiwa} from './components/KorbanJiwa'
import {LihatKorbanJiwa} from './components/Lihat-master/LihatKorbanJiwa'
import {UpdateKorbanJiwa} from './components/Update-master/UpdateKorbanJiwa'
import {TambahKorbanJiwa} from './components/Tambah-master/TambahKorbanJiwa'

import {KorbanMaterial} from './components/KorbanMaterial'
import {JenisBantuan} from './components/JenisBantuan'
import {InstansiTerkait} from './components/InstansiTerkait'

import {Agama} from './components/Agama'
import {LihatAgama} from './components/Lihat-master/LihatAgama'
import {UpdateAgama} from './components/Update-master/UpdateAgama'
import {TambahAgama} from './components/Tambah-master/TambahAgama'

import {Pangkat} from './components/Pangkat'
import {UpdatePangkat} from './components/Update-master/UpdatePangkat'
import {LihatPangkat} from './components/Lihat-master/LihatPangkat'
import {TambahPangkat} from './components/Tambah-master/TambahPangkat'

import {TempatPelaksana} from './components/TempatPelaksana'
import {SKPD} from './components/SKPD'
import {Pendidikan} from './components/Pendidikan'
import {JenisSaranaPrasarana} from './components/JenisSaranaPrasarana'
import {Golongan} from './components/Golongan'
import {Eselon} from './components/Eselon'
import {Jabatan} from './components/Jabatan'
import {SumberInformasi} from './components/SumberInformasi'
import {JenisKekerasan} from './components/JenisKekerasan'
import {JenisPenerbitan} from './components/JenisPenerbitan'
import {JenisPenyelesaian} from './components/JenisPenyelesaian'

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
          path='TempatPelaksana'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Tempat Pelaksana</PageTitle>
              <TempatPelaksana />
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
          path='Eselon'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Eselon </PageTitle>
              <Eselon />
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
          path='JenisPenindakan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Penindakan</PageTitle>
              <JenisPenindakan />
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
          path='JenisKekerasan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Kekerasan</PageTitle>
              <JenisKekerasan />
            </>
          }
        />
        <Route
          path='JenisPenerbitan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Penerbitan</PageTitle>
              <JenisPenerbitan />
            </>
          }
        />
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
          path='JenisBantuan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Bantuan</PageTitle>
              <JenisBantuan />
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
