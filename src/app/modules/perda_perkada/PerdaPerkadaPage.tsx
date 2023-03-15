import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {LaporanSidangTipiring} from './components/LaporanSidangTipiring'
import {LaporanPenertibanMinumBeralkohol} from './components/LaporanPenertibanMinumBeralkohol'
import {RegisterPenegakanPerkaraPerdaPerda} from './components/RegisterPenegakanPerkaraPerdaPerda'
import {LaporanPerdaPerkada} from './components/LaporanPerdaPerkada'

const perda_perkadaBreadCrumbs: Array<PageLink> = [
  {
    title: 'Perda Perkada',
    path: '/perdaperkada/LaporanPenegakanPerdaPerkada',
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
          path='LaporanPenertibanMinumBeralkohol'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Laporan Penertiban Minum Beralkohol
              </PageTitle>
              <LaporanPenertibanMinumBeralkohol />
            </>
          }
        />
        <Route
          path='RegisterPenegakanPerkaraPerdaPerda'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Register Penegakan Perkara Perda / Perda
              </PageTitle>
              <RegisterPenegakanPerkaraPerdaPerda />
            </>
          }
        />
        <Route
          path='LaporanPerdaPerkada'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Laporan Perda dan Perkada
              </PageTitle>
              <LaporanPerdaPerkada />
            </>
          }
        />

        <Route index element={<Navigate to='/perdaperkada' />} />
      </Route>
    </Routes>
  )
}

export default PerdaPerkadaPage
