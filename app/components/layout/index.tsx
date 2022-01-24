import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { Loader } from 'app/components/loader'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLoading } from 'app/store/modules/loading/selectors'
import { Header } from './header'
import { Footer } from './footer'
import { Navigation } from 'app/components/layout/navigation'
import { getScreen, getShowNav } from 'app/store/modules/screen/selectors'
import { setScreen, setShowNav } from 'app/store/modules/screen/reducer'
import { EScreen } from 'app/store/modules/screen/types'
import { DESKTOP, TABLE } from 'app/constants'

export const Layout: FC = ({ children }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsLoading)
  const screen = useSelector(getScreen)
  const showNav = useSelector(getShowNav)

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth >= DESKTOP) {
        dispatch(setScreen(EScreen.desktop))
        dispatch(setShowNav(true))
      }
      if (window.innerWidth < DESKTOP && window.innerWidth >= TABLE) {
        dispatch(setScreen(EScreen.tablet))
        dispatch(setShowNav(true))
      }
      if (window.innerWidth < TABLE) {
        dispatch(setScreen(EScreen.mobile))
        dispatch(setShowNav(false))
      }
    }
    window.addEventListener('resize', resizeHandler)

    return function () {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <Container>
      {isLoading && <Loader isLoading={isLoading} />}
      <Header />
      <Main $screen={screen}>
        {showNav && <Navigation />}
        <Content>{children}</Content>
        <Aside>Рекламный блок</Aside>
      </Main>
      <Footer />
    </Container>
  )
}

type TStyledProps = {
  $screen: string
}

const Container = styled.div`
  max-width: 1440px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin: 0 auto;
`

const Main = styled.main`
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: ${(props: TStyledProps) =>
    props.$screen === EScreen.mobile ? '1fr 200px' : '200px 1fr 200px'};
  column-gap: 20px;
  padding: 10px;
`

const Content = styled.section``
const Aside = styled.aside``
