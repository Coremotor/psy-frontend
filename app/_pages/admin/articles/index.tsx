import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticlesFromState } from 'app/store/modules/articles/selectors'
import { getArticles } from 'app/store/modules/articles/actions'
import styled from 'styled-components'
import { Layout } from 'app/components/layout'
import { Routes } from 'routes'
import { ArticleCardInAdmin } from 'app/components/articleCardInAdmin'
import { useRouter } from 'next/router'

const Articles = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const articles = useSelector(getArticlesFromState)

  const redirectToArticle = (id: string) => {
    router.push(
      {
        pathname: `${Routes.admin_article}`,
        query: {
          id: id,
        },
      },
      undefined,
      {
        shallow: true,
      }
    )
  }

  useEffect(() => {
    dispatch(getArticles())
  }, [])

  return (
    <Layout>
      <Container>
        {articles &&
          articles.map((a) => (
            <ArticleCardInAdmin
              article={a}
              key={a._id}
              redirectTo={redirectToArticle}
            />
          ))}
      </Container>
    </Layout>
  )
}

export default Articles

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: center;
  grid-gap: 20px;
  padding: 20px 0;
  margin-bottom: 40px;
`
