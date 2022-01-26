import styled, { css } from 'styled-components'
import Link from 'next/link'
import { Routes } from 'routes'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'app/store/modules/profile/selectors'
import { roleGuard, roles } from 'app/guards'
import { CategoriesEnum } from 'app/store/modules/articles/types'
import { getScreen } from 'app/store/modules/screen/selectors'
import { EScreen } from 'app/store/modules/screen/types'
import { DefaultThemeProps } from 'app/styles/types'
import { motion } from 'framer-motion'
import { setShowNav } from 'app/store/modules/screen/reducer'

const links = [
  { value: CategoriesEnum.aboutCats, title: 'О кошках' },
  { value: CategoriesEnum.aboutDogs, title: 'О собаках' },
  { value: CategoriesEnum.aboutFish, title: 'О рыбках' },
  { value: CategoriesEnum.aboutSpiders, title: 'О пауках' },
]

export const Navigation = () => {
  const user = useSelector(getUser)
  const screen = useSelector(getScreen)
  const dispatch = useDispatch()

  const onLinkClick = () => {
    if (screen === EScreen.mobile) {
      dispatch(setShowNav(false))
    }
  }

  return (
    <Nav
      $isMobile={screen === EScreen.mobile}
      initial={screen === EScreen.mobile && { y: -300 }}
      animate={{ y: 0 }}
    >
      <Link href={Routes.home} passHref>
        <A onClick={onLinkClick}>Главная</A>
      </Link>

      {links.map((link) => (
        <Link
          key={link.value}
          href={{
            pathname: `${Routes.articles}`,
            query: { category: link.value },
          }}
          passHref
        >
          <A onClick={onLinkClick}>{link.title}</A>
        </Link>
      ))}

      {roleGuard(user, [roles.ADMIN]) && (
        <Admin>
          <span>АДМИНКА</span>
          <Link href={Routes.admin_articles} passHref>
            <A onClick={onLinkClick}>Статьи</A>
          </Link>
          <Link href={Routes.admin_article} passHref>
            <A onClick={onLinkClick}>Создание статьи</A>
          </Link>
          <Link href={Routes.admin_users} passHref>
            <A onClick={onLinkClick}>Список пользователей</A>
          </Link>
        </Admin>
      )}
    </Nav>
  )
}

type TStyledProps = {
  $isMobile: boolean
}

const Nav = styled(motion.nav)`
  display: flex;
  position: ${(props: TStyledProps) => (props.$isMobile ? 'fixed' : 'static')};
  flex-direction: column;
  background-color: ${(props: TStyledProps & DefaultThemeProps) =>
    props.$isMobile ? props.theme.background.primary : 'inherit'};
  z-index: 100;

  ${(props: TStyledProps) =>
    props.$isMobile &&
    css({
      width: '100%',
      alignItems: 'center',
    })};
`
const A = styled.a`
  cursor: pointer;
  padding: 10px;
`
const Admin = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`
