import { Layout } from 'app/components/layout'
import React, { FC, useEffect } from 'react'
import { LocalStorageTokenKey } from 'api/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from 'app/store/modules/profile/actions'
import { getUser } from 'app/store/modules/profile/selectors'
import { IArticleInList } from 'app/store/modules/articles/types'
import { ArticlesSection } from './articlesSection'
import { AboutSection } from 'app/_pages/home/aboutSection'
import { CreateOrderSection } from 'app/_pages/home/createOrderSection'
import { EScreen } from 'app/store/modules/screen/types'
import { getScreen } from 'app/store/modules/screen/selectors'
import { AdBlock } from 'app/components/adBlock'

type TProps = {
  articles: IArticleInList[]
}

export const Home: FC<TProps> = ({ articles }) => {
  const dispatch = useDispatch()
  const screen = useSelector(getScreen)
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
      <AboutSection />
      <ArticlesSection articles={articles} />
      {screen !== EScreen.desktop && <AdBlock />}
      <CreateOrderSection />
    </Layout>
  )
}
