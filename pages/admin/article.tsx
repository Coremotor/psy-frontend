import { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const AdminArticleDynamicComponent = dynamic(
  () => import('app/_pages/admin/article'),
  {
    ssr: false,
  }
)

const AdminPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <AdminArticleDynamicComponent />
    </>
  )
}

export default AdminPage
