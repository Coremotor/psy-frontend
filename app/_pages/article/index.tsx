import { Layout } from 'app/components/layout'
import { IArticle } from 'app/store/modules/articles/types'
import DOMPurify from 'isomorphic-dompurify'
import React, { FC } from 'react'
import styled from 'styled-components'
import { EScreen } from 'app/store/modules/screen/types'
import { useSelector } from 'react-redux'
import { getScreen } from 'app/store/modules/screen/selectors'
import { AdBlock } from 'app/components/adBlock'

type TProps = { article: IArticle }

export const ArticlePage: FC<TProps> = ({ article }) => {
  const screen = useSelector(getScreen)

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
      {screen !== EScreen.desktop && <AdBlock />}
    </Layout>
  )
}

const Text = styled.div``
