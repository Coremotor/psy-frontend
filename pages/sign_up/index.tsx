import { SignUp } from 'app/_pages/signUp'
import { NextPage } from 'next'
import Head from 'next/head'

const SignUpPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <SignUp />
    </>
  )
}

export default SignUpPage
