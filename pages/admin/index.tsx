import { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const AdminDynamicComponent = dynamic(() => import('app/_pages/admin'), {
  ssr: false,
})

const AdminPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <AdminDynamicComponent />
    </>
  )
}

export default AdminPage
