import styled from 'styled-components'
import { BiArrowBack } from '@react-icons/all-files/bi/BiArrowBack'
import { FC } from 'react'
import Link from 'next/link'

type TProps = {
  text: string
  redirectTo: string
}

export const GoBack: FC<TProps> = (props: TProps) => {
  return (
    <Link href={props.redirectTo}>
      <Container>
        <StyledBiArrowBack />
        <Text>{props.text}</Text>
      </Container>
    </Link>
  )
}

const Container = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
`
const StyledBiArrowBack = styled(BiArrowBack)`
  width: 24px;
  height: 24px;
`
const Text = styled.span`
  margin-left: 10px;
`
