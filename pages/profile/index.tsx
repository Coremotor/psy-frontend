import { NextPage } from 'next'
import Head from 'next/head'
import { Profile } from 'app/_pages/profile'

const ProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Profile />
    </>
  )
}

export default ProfilePage
