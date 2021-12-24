import { Routes } from 'routes'
import { GoBack } from 'app/components/goBack'
import { Layout } from 'app/components/layout'
import { useEffect, useState } from 'react'
import { Users } from 'app/_pages/admin/users'
import { Articles } from 'app/_pages/admin/articles'
import styled from 'styled-components'
import { roleGuard, roles } from 'app/guards'
import { useSelector } from 'react-redux'
import { getUser } from 'app/store/modules/profile/selectors'
import { useRouter } from 'next/router'
import { Article } from 'app/_pages/admin/article'

const tabs = {
  users: 'users',
  articles: 'articles',
  article: 'article',
}

const Admin = () => {
  const user = useSelector(getUser)
  const [tab, setTab] = useState(tabs.users)
  const router = useRouter()

  useEffect(() => {
    if (!roleGuard(user, [roles.ADMIN])) {
      router.push(Routes.home)
    }
  }, [])

  return (
    <Layout>
      <GoBack text="Home page" redirectTo={Routes.home} />
      <Tabs>
        <Tab activeTab={tab === tabs.users} onClick={() => setTab(tabs.users)}>
          Users
        </Tab>
        <Tab
          activeTab={tab === tabs.articles}
          onClick={() => setTab(tabs.articles)}
        >
          Articles
        </Tab>
        <Tab
          activeTab={tab === tabs.article}
          onClick={() => setTab(tabs.article)}
        >
          Article
        </Tab>
      </Tabs>
      {tab === tabs.users && <Users />}
      {tab === tabs.articles && <Articles />}
      {tab === tabs.article && <Article />}
    </Layout>
  )
}

const Tabs = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
`
type TStyledTabs = {
  activeTab: boolean
}
const Tab = styled.div`
  border-bottom: ${(props: TStyledTabs) =>
    props.activeTab ? '2px solid black' : '2px solid transparent'};
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
`

export default Admin
