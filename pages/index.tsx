import type { NextPage } from 'next'
import Head from 'next/head'
import { Home } from 'app/_pages/home'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>OKC web portal</title>
      </Head>
      <Home />
    </>
  )
}

export default HomePage
