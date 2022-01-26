import styled from 'styled-components'
import Image from 'next/image'
import logo from 'app/assets/sample-logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'app/store/modules/profile/selectors'
import { ProfileLink } from 'app/components/layout/header/profileLink'
import { SignInLink } from 'app/components/layout/header/signInLink'
import { getScreen, getShowNav } from 'app/store/modules/screen/selectors'
import { setShowNav } from 'app/store/modules/screen/reducer'
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu'
import { GrClose } from '@react-icons/all-files/gr/GrClose'
import { EScreen } from 'app/store/modules/screen/types'

export const Header = () => {
  const user = useSelector(getUser)
  const dispatch = useDispatch()
  const showNav = useSelector(getShowNav)
  const screen = useSelector(getScreen)

  const showHideNav = () => {
    dispatch(setShowNav(!showNav))
  }

  return (
    <Container>
      {screen === EScreen.mobile && (
        <>
          {!showNav ? (
            <SGiHamburgerMenu onClick={showHideNav} />
          ) : (
            <SGrClose onClick={showHideNav} />
          )}
        </>
      )}
      <Logo>
        <Image src={logo} alt="logo" height={64} width={128} />
      </Logo>
      {user ? <ProfileLink /> : <SignInLink />}
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  align-items: center;
`

const Logo = styled.div`
  margin-right: auto;
`

const SGiHamburgerMenu = styled(GiHamburgerMenu)`
  cursor: pointer;
  width: 24px;
  height: 24px;
`

const SGrClose = styled(GrClose)`
  cursor: pointer;
  width: 24px;
  height: 24px;
`
