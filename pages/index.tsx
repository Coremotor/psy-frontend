import type { NextPage } from 'next'
import Head from 'next/head'
import { Home } from 'app/_pages/home'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { server_request } from 'api'
import { IArticleInList } from 'app/store/modules/articles/types'

const HomePage: NextPage = ({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>PSY portal</title>
      </Head>
      <Home articles={articles} />
    </>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
  const response = await server_request.get('/articles', {
    params: {
      sortByViews: 'desc',
      limit: 10,
    },
  })
  const articles: IArticleInList[] = response.data
  return {
    props: {
      articles,
    },
    revalidate: 60,
  }
}
