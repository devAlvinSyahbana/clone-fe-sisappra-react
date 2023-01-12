import {lazy, FC, Suspense, useState, useEffect} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'

const PrivateRoutes = () => {
  const DashboardPage = lazy(() => import('../modules/dashboard/DashboardPage'))
  const SaranaPrasaranaPage = lazy(() => import('../modules/sarana_prasarana/SaranaPrasaranaPage'))
  const KepegawaianPage = lazy(() => import('../modules/kepegawaian/KepegawaianPage'))
  const MasterPage = lazy(() => import('../modules/master/MasterPage'))
  const PelaporanPage = lazy(() => import('../modules/pelaporan/PelaporanPage'))
  const ManajemenDataPage = lazy(() => import('../modules/manajemen_data/ManajemenDataPage'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const PerdaPerkadaPage = lazy(() => import('../modules/perda_perkada/PerdaPerkadaPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ManajemenPenggunaPage = lazy(() => import('../modules/apps/ManajemenPenggunaPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  const [publicAkses, setPublicAkses] = useState(false)
  const hakAksesValues = useSelector((s: RootState) => s.hakAksesKontrol)
  useEffect(() => {
    if (!hakAksesValues.namaHakAkses.nama_hak_akses?.toLowerCase().includes('public'))
      setPublicAkses(true)
  }, [])
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        {publicAkses && (
          <>
            <Route
              path='dashboard/*'
              element={
                <SuspensedView>
                  <DashboardPage />
                </SuspensedView>
              }
            />
            <Route
              path='sarana-prasarana/*'
              element={
                <SuspensedView>
                  <SaranaPrasaranaPage />
                </SuspensedView>
              }
            />
          </>
        )}
        <Route
          path='kepegawaian/*'
          element={
            <SuspensedView>
              <KepegawaianPage />
            </SuspensedView>
          }
        />
        <Route
          path='manajemendata/*'
          element={
            <SuspensedView>
              <ManajemenDataPage />
            </SuspensedView>
          }
        />
        <Route
          path='perdaperkada/*'
          element={
            <SuspensedView>
              <PerdaPerkadaPage />
            </SuspensedView>
          }
        />
        <Route
          path='pelaporan/*'
          element={
            <SuspensedView>
              <PelaporanPage />
            </SuspensedView>
          }
        />
        <Route
          path='master/*'
          element={
            <SuspensedView>
              <MasterPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/*'
          element={
            <SuspensedView>
              <ManajemenPenggunaPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
