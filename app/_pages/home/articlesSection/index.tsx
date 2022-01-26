import styled from 'styled-components'
import { ArticleCard } from 'app/components/articleCard'
import { Routes } from 'routes'
import { IArticleInList } from 'app/store/modules/articles/types'
import { FC } from 'react'
import { motion } from 'framer-motion'

type TProps = {
  articles: IArticleInList[]
}

export const ArticlesSection: FC<TProps> = ({ articles }) => {
  return (
    <Section>
      <h3>Most popular articles</h3>
      <Articles>
        {articles &&
          articles.map((a) => (
            <Item
              key={a._id}
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
      </Articles>
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Articles = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -10px -10px;
`
const Item = styled(motion.div)`
  flex: 1 1 auto;
  margin: 0 10px 20px;
`
