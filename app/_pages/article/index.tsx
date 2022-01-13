import { Layout } from 'app/components/layout'
import { IArticle } from 'app/store/modules/articles/types'
import DOMPurify from 'isomorphic-dompurify'
import { FC } from 'react'
import styled from 'styled-components'

type TProps = { article: IArticle }

export const ArticlePage: FC<TProps> = ({ article }) => {
  return (
    <Layout>
      {article && (
        <>
          <h2>{article.title}</h2>
          <Text
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.textHTML),
            }}
          />
        </>
      )}
    </Layout>
  )
}

const Text = styled.div``
