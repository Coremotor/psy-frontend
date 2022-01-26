import styled, { css } from 'styled-components'
import { EScreen } from 'app/store/modules/screen/types'
import { useSelector } from 'react-redux'
import { getScreen } from 'app/store/modules/screen/selectors'

export const AdBlock = () => {
  const screen = useSelector(getScreen)

  return <Container $screen={screen}>Рекламный блок</Container>
}

type TStyledProps = {
  $screen: string
}

const Container = styled.aside`
  display: grid;
  place-items: center;
  background-color: antiquewhite;

  ${(props: TStyledProps) =>
    props.$screen !== EScreen.desktop &&
    css({
      height: 300,
    })};
`
