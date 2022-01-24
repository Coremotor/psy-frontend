import styled from 'styled-components'
import { DefaultThemeProps } from 'app/styles/types'
import Image from 'next/image'
import logo from 'app/assets/sample-logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'app/store/modules/profile/selectors'
import { ProfileLink } from 'app/components/layout/header/profileLink'
import { SignInLink } from 'app/components/layout/header/signInLink'
import { getShowNav } from 'app/store/modules/screen/selectors'
import { setShowNav } from 'app/store/modules/screen/reducer'

export const Header = () => {
  const user = useSelector(getUser)
  const dispatch = useDispatch()
  const showNav = useSelector(getShowNav)

  const showHideNav = () => {
    dispatch(setShowNav(!showNav))
  }

  return (
    <Container>
      {!showNav && <button onClick={showHideNav}>showNav</button>}
      <Image src={logo} alt="logo" height={64} width={128} />
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
