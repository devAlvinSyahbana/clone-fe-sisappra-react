import React from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { LaporanSidangTipiring } from './components/LaporanSidangTipiring'
import { LaporanMinol } from './components/LaporanMinol'
import { Minol_Pelanggaran } from './components/Minol-Pelanggaran'
import { RegisterPerdaPerkada } from './components/RegisterPerdaPerkada'
import { LaporanPerdaPerkada } from './components/LaporanPerdaPerkada'
import { PerdaPerkada_Pelaksana } from './components/PerdaPerkada-Pelaksana'
import { LaporanPenertibanBangunan } from './components/LaporanPenertibanBangunan'
import { LaporanPPKMPKL } from './components/LaporanPPKM-PKL'
import { LaporanPPKMMasker } from './components/LaporanPPKM-Masker'
import { LaporanPPKMBangunan } from './components/LaporanPPKM-Bangunan'
import { LaporanPPKMKerumunan } from './components/LaporanPPKM-Kerumunan'
import { LaporanPPKMRumahMakan } from './components/LaporanPPKM-RumahMakan'
import { SidangTipiringPerda } from './components/SidangTipiringPerda'


const perda_perkadaBreadCrumbs: Array<PageLink> = [
  {
    title: 'Perda Perkada',
    path: '/perdaperkada/LaporanPerdaPerkada',
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

const PerdaPerkadaPage: React.FC = () => {
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
          path='LaporanSidangTipiring'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>Laporan Sidang Tipiring</PageTitle>
              <LaporanSidangTipiring />
            </>
          }
        />
        <Route
          path='SidangTipiringPerda'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>Laporan Sidang Tipiring</PageTitle>
              <SidangTipiringPerda />
            </>
          }
        />

        <Route
          path='LaporanMinol'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Laporan Penertiban Minum Beralkohol
              </PageTitle>
              <LaporanMinol />
            </>
          }
        />
        <Route
          path='Minol_Pelanggaran'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Laporan Penertiban Minum Beralkohol
              </PageTitle>
              <Minol_Pelanggaran />
            </>
          }
        />

        <Route
          path='RegisterPerdaPerkada'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Register Penegakan Perda dan Perkada
              </PageTitle>
              <RegisterPerdaPerkada />
            </>
          }
        />
        <Route
          path='LaporanPerdaPerkada'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Laporan Penegakan Perda dan Perkada
              </PageTitle>
              <LaporanPerdaPerkada />
            </>
          }
        />
        <Route
          path='PerdaPerkada_Pelaksana'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Laporan Penegakan Perda dan Perkada
              </PageTitle>
              <PerdaPerkada_Pelaksana />
            </>
          }
        />
        <Route
          path='LaporanPenertibanBangunan'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Laporan Penertiban Bangunan
              </PageTitle>
              <LaporanPenertibanBangunan />
            </>
          }
        />
        <Route
          path='LaporanPPKM-Masker'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}> Penindakan Perorangan Tidak Menggunakan Masker</PageTitle>
              <LaporanPPKMMasker />
            </>
          }
        />
        <Route
          path='LaporanPPKM-Bangunan'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}> Pengawasan dan Penindakan Tempat Kerja, Usaha, Industri, Perhotelan</PageTitle>
              <LaporanPPKMBangunan />
            </>
          }
        />
        <Route
          path='LaporanPPKM-RumahMakan'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}> Pengawasan dan Penindakan Warung Makan, Restoran Atau Kafe</PageTitle>
              <LaporanPPKMRumahMakan />
            </>
          }
        />
        <Route
          path='LaporanPPKM-PKL'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}> Pengawasan dan Penindakan Pedagang Kaki Lima</PageTitle>
              <LaporanPPKMPKL />
            </>
          }
        />
        <Route
          path='LaporanPPKM-Kerumunan'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}> Pengawasan dan Penindakan Area Publik dan Kerumunan (PPKM)</PageTitle>
              <LaporanPPKMKerumunan />
            </>
          }
        />

        <Route index element={<Navigate to='/perdaperkada' />} />
      </Route>
    </Routes>
  )
}

export default PerdaPerkadaPage
