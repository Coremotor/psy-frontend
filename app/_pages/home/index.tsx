import { Layout } from 'app/components/layout'
import { useEffect } from 'react'
import { LocalStorageTokenKey } from 'api/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from 'app/store/modules/profile/actions'
import { getUser } from 'app/store/modules/profile/selectors'

export const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem(LocalStorageTokenKey)
      if (token) {
        dispatch(getProfile())
      }
    }
  }, [user])

  return (
    <Layout>
      <div>Главная</div>
    </Layout>
  )
}
