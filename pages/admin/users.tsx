import { NextPage } from 'next'
import Head from 'next/head'
import Users from 'app/_pages/admin/users'

const AdminUsersPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin users</title>
      </Head>
      <Users />
    </>
  )
}

export default AdminUsersPage
