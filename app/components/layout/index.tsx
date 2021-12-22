import React, { FC } from 'react'
import styled from 'styled-components'
import { Header } from 'app/components/header'
import { Footer } from 'app/components/footer'
import { Loader } from 'app/components/loader'
import { useSelector } from 'react-redux'
import { getIsLoading } from 'app/store/modules/loading/selectors'

export const Layout: FC = ({ children }) => {
  const isLoading = useSelector(getIsLoading)
  return (
    <Container>
      {isLoading && <Loader isLoading={isLoading} />}
      <Header />
      <Main>{children}</Main>
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
`
