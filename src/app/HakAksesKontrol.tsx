import React, {useEffect} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from './redux/store'
import {
  changedValue,
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
  let createdByHakAkses = JSON.parse(value)

  const initHaKAkses = async () => {
    dispatch(updateAksesKontrol())
    dispatch(updateModulPermission())
    dispatch(
      changedValue({
        target: {
          name: 'hakAksesData',
          value: createdByHakAkses.data,
        },
      })
    )
  }

  useEffect(() => {
    initHaKAkses()
  }, [])

  useEffect(() => {
    const data = [allValues.hakAksesData.hak_akses, allValues]
    if (allValues.hakAksesData.hak_akses) {
      dispatch(updateHakAksesByIdData(allValues.hakAksesData.hak_akses))
      dispatch(updateAksesKontrolMapping(data))
    }
  }, [allValues.listAksesKontrol.length, allValues.listModulPermission.length])

  console.log(allValues)

  return <></>
}
