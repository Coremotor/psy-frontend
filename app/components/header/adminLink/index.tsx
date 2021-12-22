import styled from 'styled-components'
import Link from 'next/link'
import { Routes } from 'routes'

export const AdminLink = () => {
  return (
    <Container>
      <Link href={Routes.admin} passHref>
        <A>
          <Text>Admin</Text>
        </A>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`
const A = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const Text = styled.span`
  margin-right: 20px;
`
