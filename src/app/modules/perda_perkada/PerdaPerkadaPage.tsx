import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {LaporanSidangTipiring} from './components/LaporanSidangTipiring'
import {LaporanMinol} from './components/LaporanMinol'
import {RegisterPerkaraPerdaPerda} from './components/RegisterPerkaraPerdaPerda'
import {LaporanPerdaPerkada} from './components/LaporanPerdaPerkada'

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
          path='LaporanPenerbitanMinumBeralkohol'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Laporan Penerbitan Minum Beralkohol
              </PageTitle>
              <LaporanMinol />
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
              <RegisterPerkaraPerdaPerda />
            </>
          }
        />
        <Route
          path='LaporanPenegakanPerdaPerkada'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Laporan Penegakan Perda dan Perkada
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
