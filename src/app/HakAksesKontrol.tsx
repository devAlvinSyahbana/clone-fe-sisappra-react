import React, {useEffect} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from './redux/store'
import {
  changedValue,
  reset,
  updateAksesKontrol,
  updateAksesKontrolMapping,
  updateHakAksesByIdData,
  updateModulPermission,
} from './redux/slices/hak-akses-kontrol.slice'

export const HakAksesKontrol = () => {
  const dispatch = useDispatch()
  const usePathname = () => {
    const location = useLocation()
    return location.pathname
  }
  const currentLocation = usePathname()
  const allValues = useSelector((s: RootState) => s.hakAksesKontrol)

  let value: any = localStorage.getItem('kt-auth-react-v')
  let res = JSON.parse(value)
  console.log(res)
  if (!res) dispatch(reset())

  const initHaKAkses = async () => {
    dispatch(updateAksesKontrol())
    dispatch(updateModulPermission())
    dispatch(updateHakAksesByIdData(res?.data.hak_akses))
    dispatch(
      changedValue({
        target: {
          name: 'hakAksesData',
          value: res?.data,
        },
      })
    )
  }

  useEffect(() => {
    if (
      res &&
      (allValues.listAksesKontrol.length === 0 ||
        allValues.listModulPermission.length === 0 ||
        !allValues.hakAksesData)
    ) {
      initHaKAkses()
      //   console.log('lagi mlakuy')
    }
  }, [currentLocation])

  useEffect(() => {
    if (res && allValues.aksesKontrolMapping.length === 0) {
      //   console.log('lagi jalan')
      const data = [res?.data.hak_akses, allValues]
      dispatch(updateAksesKontrolMapping(data))
    }
  }, [allValues.listAksesKontrol.length, allValues.listModulPermission.length])

  console.log(allValues)

  return <></>
}
