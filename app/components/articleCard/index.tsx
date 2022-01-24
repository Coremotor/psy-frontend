import styled from 'styled-components'
import { FC } from 'react'
import { IArticleInList } from 'app/store/modules/articles/types'
import Image from 'next/image'
import { GrFormView } from '@react-icons/all-files/gr/GrFormView'
import Link from 'next/link'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

type TProps = {
  article: IArticleInList
  redirectRoute: string
}

export const ArticleCard: FC<TProps> = (props: TProps) => {
  return (
    <Link href={props.redirectRoute + '/' + props.article._id} passHref>
      <Article key={props.article._id}>
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
    </Link>
  )
}

const Article = styled.article`
  cursor: pointer;
  min-width: 200px;
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
  display: flex;
  align-items: center;
`
const Views = styled.span``
const CreatedAt = styled.small``
const StyledImage = styled(Image)`
  opacity: 0.5;
  z-index: -1;
`
