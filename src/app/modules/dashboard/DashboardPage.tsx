import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Kepegawaian} from './components/Kepegawaian'
import {SaranadanPrasarana} from './components/Sarana-dan-Prasarana'
import {PenegakanPerdadanPerkada} from './components/Penegakan-Perda-dan-Perkada'
import {KetentramandanKetertibanUmum} from './components/Ketentraman-dan-Ketertiban-Umum'
import {WasdakProtokolKesehatan} from './components/Wasdak-Protokol-Kesehatan'
import {PetaTitikRawan} from './components/Peta-Titik-Rawan'
import {PetaTitikReklame} from './components/Peta-Titik-Reklame'
import {PetaKejadian} from './components/Peta-Kejadian'
import {PetaPlotingAnggota} from './components/Peta-Ploting-Anggota'

const dashboardBreadCrumbs: Array<PageLink> = [
  {
    title: 'Dashboard',
    path: '/dashboard/dashboard-kepegawaian',
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

const DashboardPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='dashboard-kepegawaian'
          element={
            <>
              <PageTitle breadcrumbs={dashboardBreadCrumbs}>Dashboard Kepegawaian</PageTitle>
              <Kepegawaian />
            </>
          }
        />
        <Route
          path='dashboard-sarana-dan-prasarana'
          element={
            <>
              <PageTitle breadcrumbs={dashboardBreadCrumbs}>
                Dashboard Sarana dan Prasarana
              </PageTitle>
              <SaranadanPrasarana />
            </>
          }
        />
        <Route
          path='dashboard-penegakan-perda-dan-perkada'
          element={
            <>
              <PageTitle breadcrumbs={dashboardBreadCrumbs}>
                Dashboard Penegakan Perda dan Perkada
              </PageTitle>
              <PenegakanPerdadanPerkada />
            </>
          }
        />
        <Route
          path='dashboard-ketentraman-dan-ketertiban-umum'
          element={
            <>
              <PageTitle breadcrumbs={dashboardBreadCrumbs}>
                Dashboard Ketentraman dan Ketertiban Umum
              </PageTitle>
              <KetentramandanKetertibanUmum />
            </>
          }
        />
        <Route
          path='dashboard-wasdak-protokol-kesehatan'
          element={
            <>
              <PageTitle breadcrumbs={dashboardBreadCrumbs}>
                Dashboard Wasdak Protokol Kesehatan
              </PageTitle>
              <WasdakProtokolKesehatan />
            </>
          }
        />
        <Route
          path='peta-titik-rawan'
          element={
            <>
              <PageTitle breadcrumbs={dashboardBreadCrumbs}>Peta Titik Rawan</PageTitle>
              <PetaTitikRawan />
            </>
          }
        />
        <Route
          path='peta-titik-reklame'
          element={
            <>
              <PageTitle breadcrumbs={dashboardBreadCrumbs}>Peta Titik Reklame</PageTitle>
              <PetaTitikReklame />
            </>
          }
        />
        <Route
          path='peta-kejadian'
          element={
            <>
              <PageTitle breadcrumbs={dashboardBreadCrumbs}>Peta Kejadian</PageTitle>
              <PetaKejadian />
            </>
          }
        />
        <Route
          path='peta-ploting-anggota'
          element={
            <>
              <PageTitle breadcrumbs={dashboardBreadCrumbs}>Peta Ploting Anggota</PageTitle>
              <PetaPlotingAnggota />
            </>
          }
        />
        <Route index element={<Navigate to='/dashboard/kepegawaian' />} />
      </Route>
    </Routes>
  )
}

export default DashboardPage
