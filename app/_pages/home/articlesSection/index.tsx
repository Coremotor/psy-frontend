import styled from 'styled-components'
import { ArticleCard } from 'app/components/articleCard'
import { Routes } from 'routes'
import { IArticleInList } from 'app/store/modules/articles/types'
import { FC } from 'react'
import Slider from 'react-slick'
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward'
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack'

type TProps = {
  articles: IArticleInList[]
}

export const ArticlesSection: FC<TProps> = ({ articles }) => {
  const settings = {
    dots: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    slidesToShow: 4,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
  }

  return (
    <Container>
      <h3>Most popular articles</h3>
      <SliderContainer>
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
      </SliderContainer>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const SliderContainer = styled.section`
  width: 860px;
  margin: 0 auto;
`

const NextArrow = styled(IoIosArrowForward)`
  fill: black;
`
const PrevArrow = styled(IoIosArrowBack)`
  fill: black;
`
