import styled from 'styled-components'
import { ArticleCard } from 'app/components/articleCard'
import { Routes } from 'routes'
import { IArticleInList } from 'app/store/modules/articles/types'
import { FC } from 'react'

type TProps = {
  articles: IArticleInList[]
}

export const ArticlesBlock: FC<TProps> = ({ articles }) => {
  return (
    <Container>
      {articles &&
        articles.map((a) => (
          <ArticleCard
            redirectRoute={Routes.articles}
            article={a}
            key={a._id}
          />
        ))}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: center;
  grid-gap: 20px;
  padding: 20px 0;
  margin-bottom: 40px;
`
