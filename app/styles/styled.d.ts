import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
      primary: string
    }
    text: {
      primary: string
    }
  }
}
