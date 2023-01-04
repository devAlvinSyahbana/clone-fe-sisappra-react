import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {LaporanSidangTipiring} from './components/LaporanSidangTipiring'
import {LaporanPenerbitanMinumBeralkohol} from './components/LaporanPenerbitanMinumBeralkohol'
import {RegisterPenegakanPerkaraPerdaPerda} from './components/RegisterPenegakanPerkaraPerdaPerda'
import {LaporanPenegakanPerdaPerkada} from './components/LaporanPenegakanPerdaPerkada'

const perda_perkadaBreadCrumbs: Array<PageLink> = [
  {
    title: 'Perda Perkada',
    path: '/perdaperkada/LaporanSidangTipiring',
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
              <LaporanPenerbitanMinumBeralkohol />
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
          path='LaporanPenegakanPerdaPerkada'
          element={
            <>
              <PageTitle breadcrumbs={perda_perkadaBreadCrumbs}>
                Laporan Penegakan Perda dan Perkada
              </PageTitle>
              <LaporanPenegakanPerdaPerkada />
            </>
          }
        />

        <Route index element={<Navigate to='/perdaperkada' />} />
      </Route>
    </Routes>
  )
}

export default PerdaPerkadaPage
