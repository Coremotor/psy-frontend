import { NextPage } from 'next'
import Head from 'next/head'
import Articles from 'app/_pages/admin/articles'

const AdminArticlesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin articles</title>
      </Head>
      <Articles />
    </>
  )
}

export default AdminArticlesPage
