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
import { JenisPerda } from './components/JenisPerda'
import { JenisPerkada } from './components/JenisPerkada'
import { JenisPenindakan } from './components/JenisPenindakan'
import { KorbanJiwa } from './components/KorbanJiwa'
import { KorbanMaterial } from './components/KorbanMaterial'
import { JenisBantuan } from './components/JenisBantuan'
import { InstansiTerkait } from './components/InstansiTerkait'


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
          path='Kecamtana'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Kecamatan</PageTitle>
              <Kecamatan />
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
          path='JenisPerda'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Perda</PageTitle>
              <JenisPerda/>
            </>
          }
        />
        <Route
          path='JenisPerkada'
          element={
            <>
              <PageTitle breadcrumbs={masterBreadCrumbs}>Jenis Perkada</PageTitle>
              <JenisPerkada />
            </>
          }
        />
        <Route
          path='KorbanJiwa '
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
