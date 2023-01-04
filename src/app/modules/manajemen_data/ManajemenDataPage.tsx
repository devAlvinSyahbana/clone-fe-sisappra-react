import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

import {DataTitikRawanPKL} from './components/DataTitikRawanPKL'
import {DataTitikPlotingAnggota} from './components/DataTitikPlotingAnggota'
import {DataTempatIbadah} from './components/DataTempatIbadah'
import {DataPolitik} from './components/DataPolitik'
import {DataTitikRawanKebakaran} from './components/DataTitikRawanKebakaran'
import {DataTitikRawanTramtibum} from './components/DataTitikRawanTramtibum'
import {DataHalte} from './components/DataHalte'
import {DataTrotoar} from './components/DataTrotoar'
import {DataJPO} from './components/DataJPO'
import {DataTitikRawanPMKS} from './components/DataTitikRawanPMKS'
import {DataTitikRawanBencanaBanjir} from './components/DataTitikRawanBencanaBanjir'

const manajemen_dataBreadCrumbs: Array<PageLink> = [
  {
    title: 'Manajemen Data',
    path: '/manajemendata/DataTitikRawanPKL',
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
const ManajemenDataPage: React.FC = () => {
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
          path='DataTitikRawanPKL'
          element={
            <>
              <PageTitle breadcrumbs={manajemen_dataBreadCrumbs}>Data Titik Rawan PKL</PageTitle>
              <DataTitikRawanPKL />
            </>
          }
        />
        <Route
          path='DataTitikPlotingAnggota'
          element={
            <>
              <PageTitle breadcrumbs={manajemen_dataBreadCrumbs}>
                Data Titik Ploting Anggota
              </PageTitle>
              <DataTitikPlotingAnggota />
            </>
          }
        />
        <Route
          path='DataTempatIbadah'
          element={
            <>
              <PageTitle breadcrumbs={manajemen_dataBreadCrumbs}>Data Tempat Ibadah</PageTitle>
              <DataTempatIbadah />
            </>
          }
        />
        <Route
          path='DataPolitik'
          element={
            <>
              <PageTitle breadcrumbs={manajemen_dataBreadCrumbs}>Data Politik</PageTitle>
              <DataPolitik />
            </>
          }
        />
        <Route
          path='DataTitikRawanKebakaran'
          element={
            <>
              <PageTitle breadcrumbs={manajemen_dataBreadCrumbs}>
                Data Titik Rawan Kebakaran
              </PageTitle>
              <DataTitikRawanKebakaran />
            </>
          }
        />
        <Route
          path='DataTitikRawanTramtibum'
          element={
            <>
              <PageTitle breadcrumbs={manajemen_dataBreadCrumbs}>
                Data Titik Rawan Tramtibum
              </PageTitle>
              <DataTitikRawanTramtibum />
            </>
          }
        />
        <Route
          path='DataHalte'
          element={
            <>
              <PageTitle breadcrumbs={manajemen_dataBreadCrumbs}>Data Halte</PageTitle>
              <DataHalte />
            </>
          }
        />
        <Route
          path='DataTrotoar'
          element={
            <>
              <PageTitle breadcrumbs={manajemen_dataBreadCrumbs}>Data Trotoar</PageTitle>
              <DataTrotoar />
            </>
          }
        />
        <Route
          path='DataJPO'
          element={
            <>
              <PageTitle breadcrumbs={manajemen_dataBreadCrumbs}>Data JPO</PageTitle>
              <DataJPO />
            </>
          }
        />
        <Route
          path='DataTitikRawanPMKS'
          element={
            <>
              <PageTitle breadcrumbs={manajemen_dataBreadCrumbs}>Data Titik Rawan PMKS</PageTitle>
              <DataTitikRawanPMKS />
            </>
          }
        />
        <Route
          path='DataTitikRawanBencanaBanjir'
          element={
            <>
              <PageTitle breadcrumbs={manajemen_dataBreadCrumbs}>
                Data Titik Rawan Bencana / Banjir
              </PageTitle>
              <DataTitikRawanBencanaBanjir />
            </>
          }
        />

        <Route index element={<Navigate to='/manajemendata' />} />
      </Route>
    </Routes>
  )
}

export default ManajemenDataPage
