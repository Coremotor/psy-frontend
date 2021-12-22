import { NextPage } from 'next'
import Head from 'next/head'
import { SignIn } from 'app/_pages/signIn'

const SignInPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <SignIn />
    </>
  )
}

export default SignInPage
