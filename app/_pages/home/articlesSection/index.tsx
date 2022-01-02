import styled from 'styled-components'
import { ArticleCard } from 'app/components/articleCard'
import { Routes } from 'routes'
import { IArticleInList } from 'app/store/modules/articles/types'
import { FC } from 'react'
import Slider from 'react-slick'

type TProps = {
  articles: IArticleInList[]
}

export const ArticlesSection: FC<TProps> = ({ articles }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    // nextArrow: <div>N</div>,
    // prevArrow: <div>P</div>,
  }

  return (
    <>
      <h3>Most popular articles</h3>
      <Slider {...settings}>
        {articles &&
          articles.map((a) => (
            <ArticleCard
              redirectRoute={Routes.articles}
              article={a}
              key={a._id}
            />
          ))}
      </Slider>
    </>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const SliderContainer = styled.section`
  display: flex;
  width: 800px;
  margin: 0 auto;
`
