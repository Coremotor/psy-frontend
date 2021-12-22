import styled from 'styled-components'
import { DefaultThemeProps } from 'app/styles/types'
import Image from 'next/image'
import logo from 'app/assets/sample-logo.png'
import { SignInLink } from 'app/components/header/signInLink'
import { ProfileLink } from 'app/components/header/profileLink'
import { useSelector } from 'react-redux'
import { getUser } from 'app/store/modules/profile/selectors'
import { roleGuard, roles } from 'app/guards'
import { AdminLink } from 'app/components/header/adminLink'

export const Header = () => {
  const user = useSelector(getUser)

  return (
    <Container>
      <Image src={logo} alt="logo" height={64} width={128} />
      {roleGuard(user, [roles.ADMIN]) && <AdminLink />}
      {user ? <ProfileLink /> : <SignInLink />}
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid
    ${(props: DefaultThemeProps) => props.theme.text.primary};
`
