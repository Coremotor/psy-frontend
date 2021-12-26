import { Layout } from 'app/components/layout'
import { FC } from 'react'
import { IArticleInList } from 'app/store/modules/articles/types'
import { ArticleCard } from 'app/components/articleCard'
import styled from 'styled-components'
import { Routes } from 'routes'

type TProps = {
  articles: IArticleInList[]
}

export const Articles: FC<TProps> = ({ articles }) => {
  return (
    <Layout>
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
    </Layout>
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
