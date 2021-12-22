import { NextPage } from 'next'
import Head from 'next/head'
import { Admin } from 'app/_pages/admin'

const AdminPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Admin />
    </>
  )
}

export default AdminPage
