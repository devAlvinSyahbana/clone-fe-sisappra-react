import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider, setupAxios} from './app/modules/auth'
import {Provider} from "react-redux";
import {store} from "./app/redux/store";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios)
Chart.register(...registerables)
const container = document.getElementById('root')
const queryClient = new QueryClient()
if (container) {
    createRoot(container).render(
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <MetronicI18nProvider>
                    <AuthProvider>
                        <AppRoutes/>
                    </AuthProvider>
                </MetronicI18nProvider>
            </Provider>
        </QueryClientProvider>
    )
}
