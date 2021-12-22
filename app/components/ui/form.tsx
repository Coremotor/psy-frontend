import styled from 'styled-components'
import { DefaultThemeProps } from 'app/styles/types'

export const FormWrapper = styled.div`
  display: grid;
  place-items: center;
  flex: 1 1 auto;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 25%;
  border: 1px solid ${(props: DefaultThemeProps) => props.theme.text.primary};
  padding: 20px;
`
