import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Articles } from 'app/_pages/articles'
import { server_request } from 'api'
import { IArticleInList } from 'app/store/modules/articles/types'

const ArticlesPage: NextPage = ({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export const getStaticProps: GetStaticProps = async () => {
  const response = await server_request.get('/articles')
  const articles: IArticleInList[] = response.data
  return {
    props: {
      articles,
    },
    revalidate: 60,
  }
}
