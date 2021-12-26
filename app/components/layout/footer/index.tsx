import styled from 'styled-components'
import { DefaultThemeProps } from 'app/styles/types'

export const Footer = () => {
  return <Container>Footer</Container>
}

const Container = styled.footer`
  border-top: 1px solid
    ${(props: DefaultThemeProps) => props.theme.text.primary};
  padding: 20px 0;
`
