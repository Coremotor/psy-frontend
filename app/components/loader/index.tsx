import { css } from '@emotion/react'
import ClipLoader from 'react-spinners/ClipLoader'
import styled from 'styled-components'
import { FC } from 'react'

type TProps = { isLoading: boolean }

export const Loader: FC<TProps> = ({ isLoading }) => {
  const override = css`
    display: block;
  `
  return (
    <Container>
      <ClipLoader
        color={'blue'}
        loading={isLoading}
        css={override}
        size={150}
      />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
