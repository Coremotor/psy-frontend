import styled from 'styled-components'
import { FC } from 'react'

export const AboutSection: FC = () => {
  return (
    <Container>
      <h3>About me and portal section</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium
        aspernatur deleniti doloribus eaque harum laudantium, maiores molestiae
        nam nesciunt obcaecati odio omnis perspiciatis quaerat quas qui
        reprehenderit, voluptas. Sit.
      </p>
      <p>
        Aliquam at dolores explicabo labore laborum nisi nulla optio pariatur
        repellat sunt! A alias at delectus eveniet impedit labore laudantium
        natus necessitatibus possimus provident quia quisquam recusandae,
        repellat, soluta voluptatum.
      </p>
      <p>
        Accusantium consectetur debitis dolore dolores dolorum excepturi
        incidunt iste magnam natus neque nisi possimus, rem, tempora, tempore
        voluptas! Animi assumenda ducimus fuga fugit modi possimus quidem
        repellendus sapiente vero voluptatibus?
      </p>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`
