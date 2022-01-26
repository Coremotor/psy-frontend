import { Layout } from 'app/components/layout'
import React, { FC } from 'react'
import { IArticleInList } from 'app/store/modules/articles/types'
import { ArticleCard } from 'app/components/articleCard'
import styled from 'styled-components'
import { Routes } from 'routes'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { getScreen } from 'app/store/modules/screen/selectors'
import { EScreen } from 'app/store/modules/screen/types'
import { AdBlock } from 'app/components/adBlock'

const animation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

type TProps = {
  articles: IArticleInList[]
}

export const Articles: FC<TProps> = ({ articles }) => {
  const screen = useSelector(getScreen)

  return (
    <Layout>
      <Container>
        {articles &&
          articles.map((a) => (
            <Item
              key={a._id}
              variants={animation}
              initial="hidden"
              animate="visible"
              whileHover={{
                position: 'relative',
                zIndex: 1,
                background: 'white',
                scale: 1.1,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              <ArticleCard redirectRoute={Routes.articles} article={a} />
            </Item>
          ))}
      </Container>
      {screen !== EScreen.desktop && <AdBlock />}
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -10px -10px;
  margin-bottom: 40px;
`

const Item = styled(motion.div)`
  flex: 1 1 auto;
  margin: 0 10px 20px;
`
