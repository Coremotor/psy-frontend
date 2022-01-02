import styled from 'styled-components'
import { FC } from 'react'
import { IArticleInList } from 'app/store/modules/articles/types'
import Image from 'next/image'
import { GrFormView } from '@react-icons/all-files/gr/GrFormView'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

type TProps = {
  article: IArticleInList
  redirectTo: (id: string) => void
}

export const ArticleCardInAdmin: FC<TProps> = (props: TProps) => {
  const redirect = () => props.redirectTo(props.article._id)
  return (
    <Article key={props.article._id} onClick={redirect}>
      {props.article.categories &&
        props.article.categories.map((c) => <small key={c}>{c}</small>)}
      <StyledImage
        layout="fill"
        src={props.article.previewImage || 'https://via.placeholder.com/150'}
      />
      <Title>{props.article.title}</Title>
      <Description>{props.article.description}</Description>
      <Header>
        <CreatedAt>
          {format(new Date(props.article.createdAt), 'dd MMMM yyyy', {
            locale: ru,
          })}
        </CreatedAt>
        <ViewsWrapper>
          <GrFormView />
          <Views>{props.article.views}</Views>
        </ViewsWrapper>
      </Header>
    </Article>
  )
}

const Article = styled.article`
  cursor: pointer;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid black;
  padding: 10px;
  &:hover {
    box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
  }
`
const Title = styled.h3``
const Description = styled.span`
  margin-bottom: auto;
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ViewsWrapper = styled.div`
  align-self: flex-end;
  display: flex;
  align-items: center;
`
const Views = styled.span``
const CreatedAt = styled.small``
const StyledImage = styled(Image)`
  opacity: 0.5;
  z-index: -1;
`
