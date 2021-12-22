import styled from 'styled-components'
import { AiOutlineLogin } from '@react-icons/all-files/ai/AiOutlineLogin'
import Link from 'next/link'
import { Routes } from 'routes'

export const SignInLink = () => {
  return (
    <Link href={Routes.sign_in} passHref>
      <A>
        <Text>Sing in</Text>
        <StyledAiOutlineLogin />
      </A>
    </Link>
  )
}

const StyledAiOutlineLogin = styled(AiOutlineLogin)`
  height: 32px;
  width: 32px;
`
const A = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const Text = styled.span`
  margin-right: 20px;
`
