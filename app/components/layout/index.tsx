import React, { FC } from 'react'
import styled from 'styled-components'
import { Loader } from 'app/components/loader'
import { useSelector } from 'react-redux'
import { getIsLoading } from 'app/store/modules/loading/selectors'
import { Header } from './header'
import { Footer } from './footer'
import { Navigation } from 'app/components/layout/navigation'

export const Layout: FC = ({ children }) => {
  const isLoading = useSelector(getIsLoading)
  return (
    <Container>
      {isLoading && <Loader isLoading={isLoading} />}
      <Header />
      <Main>
        <Navigation />
        <Content>{children}</Content>
        <Aside>Рекламный блок</Aside>
      </Main>
      <Footer />
    </Container>
  )
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
  grid-template-columns: 200px 1fr 200px;
  column-gap: 20px;
  padding: 10px;
`

const Content = styled.section``
const Aside = styled.aside``
