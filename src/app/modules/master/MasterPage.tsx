import React from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { Kota } from './components/Kota'
import { Kecamatan } from './components/Kecamatan'
import { Kelurahan } from './components/Kelurahan'
import { JenisKegiatan } from './components/JenisKegiatan'
import { JenisKejadian } from './components/JenisKejadian'
import { JenisPelanggaran } from './components/JenisPelanggaran'
import { JenisPertolongan } from './components/JenisPertolongan'
import { JenisPerdaPerkada } from './components/JenisPerdaPerkada'
import { JenisPenindakan } from './components/JenisPenindakan'
import { KorbanJiwa } from './components/KorbanJiwa'
import { KorbanMaterial } from './components/KorbanMaterial'
import { JenisBantuan } from './components/JenisBantuan'
import { InstansiTerkait } from './components/InstansiTerkait'
import { Agama } from './components/Agama'
import { Pangkat } from './components/Pangkat'
import { TempatPelaksana } from './components/TempatPelaksana'
import { SKPD } from './components/SKPD'
import { Pendidikan } from './components/Pendidikan'
import { JenisSaranaPrasarana } from './components/JenisSaranaPrasarana'
import { Golongan } from './components/Golongan'
import { Eselon } from './components/Eselon'
import { Jabatan } from './components/Jabatan'
import { SumberInformasi } from './components/SumberInformasi'
import { JenisKekerasan } from './components/JenisKekerasan'
import { JenisPenerbitan } from './components/JenisPenerbitan'
import { JenisPenyelesaian } from './components/JenisPenyelesaian'

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
              <Kecamatan/>
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
          path='JenisKegiatan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Kegiatan </PageTitle>
              <JenisKegiatan  />
            </>
          }
        />
        <Route
          path='JenisKejadian'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Kejadian </PageTitle>
              <JenisKejadian  />
            </>
          }
        />
        <Route
          path='Agama'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Agama</PageTitle>
              <Agama  />
            </>
          }
        />
        <Route
          path='Jabatan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Jabatan </PageTitle>
              <Jabatan/>
            </>
          }
        />
        <Route
          path='Eselon'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Eselon </PageTitle>
              <Eselon/>
            </>
          }
        />
         <Route
          path='Pendidikan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}> Pendidikan </PageTitle>
              <Pendidikan/>
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
              <JenisPelanggaran/>
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
              <JenisPerdaPerkada/>
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
              <KorbanJiwa  />
            </>
          }
        />
        <Route
          path='KorbanMaterial'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Korban Material</PageTitle>
              <KorbanMaterial/>
            </>
          }
        />
        <Route
          path='JenisBantuan'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Bantuan</PageTitle>
              <JenisBantuan/>
            </>
          }
        />
        <Route
          path='InstansiTerkait'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Instansi Terkait</PageTitle>
              <InstansiTerkait/>
            </>
          }
        />
        

        <Route index element={<Navigate to='/master' />} />
      </Route>
    </Routes>
  )
}

export default MasterPage
