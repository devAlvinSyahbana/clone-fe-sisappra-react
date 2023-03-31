import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {LaporanSidangTipiring} from './components/LaporanSidangTipiring'
import {LaporanMinol} from './components/LaporanMinol'
import {RegisterPerdaPerkada} from './components/RegisterPerdaPerkada'
import {LaporanPerdaPerkada} from './components/LaporanPerdaPerkada'
import {PerdaPerkada_Pelaksana} from './components/PerdaPerkada-Pelaksana'

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
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Laporan Sidang Tipiring
              </PageTitle>
              <LaporanSidangTipiring />
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
                Laporan Perda dan Perkada
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

        <Route index element={<Navigate to='/perdaperkada' />} />
      </Route>
    </Routes>
  )
}

export default PerdaPerkadaPage
