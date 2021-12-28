import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import { Articles } from 'app/_pages/articles'
import { server_request } from 'api'
import { IArticleInList } from 'app/store/modules/articles/types'

const ArticlesPage: NextPage = ({
  articles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Все статьи</title>
      </Head>
      <Articles articles={articles} />
    </>
  )
}

export default ArticlesPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await server_request.get('/articles', {
    params: {
      category: context.query.category,
    },
  })
  const articles: IArticleInList[] = response.data
  return {
    props: {
      articles: articles,
    },
  }
}
