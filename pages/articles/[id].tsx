import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import Head from 'next/head'
import { ArticlePage } from 'app/_pages/article'
import { IArticle, IArticleInList } from 'app/store/modules/articles/types'
import { server_request } from 'api'

const Article: NextPage = ({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Статья</title>
      </Head>
      <ArticlePage article={article} />
    </>
  )
}

export default Article

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await server_request.get('/articles')
  const articles: IArticleInList[] = response.data

  const paths = articles.map((article) => ({
    params: { id: article._id },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string }
  const response = await server_request.get(`/articles/${id}`, {
    params: { withView: true },
  })
  const article: IArticle = response.data

  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article,
    },
    revalidate: 10,
  }
}
