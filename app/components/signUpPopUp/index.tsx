import styled from 'styled-components'
import { DefaultThemeProps } from 'app/styles/types'
import { GoBack } from 'app/components/goBack'
import { Routes } from 'routes'

export const SignUpPopUp = () => {
  return (
    <Container>
      <Window>
        <Text>Registration complete</Text>
        <GoBack text="Back to sign in page" redirectTo={Routes.sign_in} />
      </Window>
    </Container>
  )
}

const Container = styled.footer`
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  backdrop-filter: blur(5px);
`

const Window = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.background.primary};
  border: 1px solid ${(props: DefaultThemeProps) => props.theme.text.primary};
  padding: 20px;
`

const Text = styled.p``
