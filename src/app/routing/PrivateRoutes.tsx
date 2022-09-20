import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'

const PrivateRoutes = () => {
  const PelaporanPage = lazy(() => import('../modules/pelaporan/PelaporanPage'))
  const KepegawaianPage = lazy(() => import('../modules/kepegawaian/KepegawaianPage'))
  const SaranaPrasaranaPage = lazy(() => import('../modules/sarana_prasarana/SaranaPrasaranaPage'))
  const MasterPage = lazy(() => import('../modules/master/MasterPage'))
  const DashboardPage = lazy(() => import('../modules/dashboard/DashboardPage'))

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
        <Route
          path='pelaporan/*'
          element={
            <SuspensedView>
              <PelaporanPage />
            </SuspensedView>
          }
        />
        <Route
          path='kepegawaian/*'
          element={
            <SuspensedView>
              <KepegawaianPage />
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
          path='/*'
          element={
            <SuspensedView>
              <SaranaPrasaranaPage />
            </SuspensedView>
          }
        />
        <Route
          path='dashboard/*'
          element={
            <SuspensedView>
              <DashboardPage />
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
