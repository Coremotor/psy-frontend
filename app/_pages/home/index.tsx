import { Layout } from 'app/components/layout'
import { FC, useEffect } from 'react'
import { LocalStorageTokenKey } from 'api/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from 'app/store/modules/profile/actions'
import { getUser } from 'app/store/modules/profile/selectors'
import { IArticleInList } from 'app/store/modules/articles/types'
import { ArticlesBlock } from './articlesBlock'

type TProps = {
  articles: IArticleInList[]
}

export const Home: FC<TProps> = ({ articles }) => {
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
      <ArticlesBlock articles={articles} />
    </Layout>
  )
}
