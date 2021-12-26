import styled from 'styled-components'
import { AiOutlineLogout } from '@react-icons/all-files/ai/AiOutlineLogout'
import Link from 'next/link'
import { Routes } from 'routes'
import { useDispatch } from 'react-redux'
import { deactivateToken } from 'app/store/modules/profile/actions'
import { setUser } from 'app/store/modules/profile/reducer'

export const ProfileLink = () => {
  const dispatch = useDispatch()

  const clearUser = () => dispatch(setUser(null))
  const logout = () => dispatch(deactivateToken(clearUser))

  return (
    <Container>
      <Link href={Routes.profile} passHref>
        <A>
          <Text>Profile</Text>
        </A>
      </Link>
      <StyledAiOutlineLogout onClick={logout} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const StyledAiOutlineLogout = styled(AiOutlineLogout)`
  cursor: pointer;
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
