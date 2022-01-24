import styled from 'styled-components'
import Link from 'next/link'
import { Routes } from 'routes'
import React from 'react'
import { useSelector } from 'react-redux'
import { getUser } from 'app/store/modules/profile/selectors'
import { roleGuard, roles } from 'app/guards'
import { CategoriesEnum } from 'app/store/modules/articles/types'
import { getScreen } from 'app/store/modules/screen/selectors'
import { EScreen } from 'app/store/modules/screen/types'
import { DefaultThemeProps } from 'app/styles/types'

const links = [
  { value: CategoriesEnum.aboutCats, title: 'О кошках' },
  { value: CategoriesEnum.aboutDogs, title: 'О собаках' },
  { value: CategoriesEnum.aboutFish, title: 'О рыбках' },
  { value: CategoriesEnum.aboutSpiders, title: 'О пауках' },
]

export const Navigation = () => {
  const user = useSelector(getUser)
  const screen = useSelector(getScreen)
  return (
    <Nav $screen={screen}>
      <Link href={Routes.home} passHref>
        <A>Главная</A>
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
          <A>{link.title}</A>
        </Link>
      ))}

      {roleGuard(user, [roles.ADMIN]) && (
        <Admin>
          <span>АДМИНКА</span>
          <Link href={Routes.admin_articles} passHref>
            <A>Статьи</A>
          </Link>
          <Link href={Routes.admin_article} passHref>
            <A>Создание статьи</A>
          </Link>
          <Link href={Routes.admin_users} passHref>
            <A>Список пользователей</A>
          </Link>
        </Admin>
      )}
    </Nav>
  )
}

type TStyledProps = {
  $screen: string
}

const Nav = styled.nav`
  display: flex;
  position: ${(props: TStyledProps) =>
    props.$screen === EScreen.mobile ? 'fixed' : 'static'};
  flex-direction: column;
  background-color: ${(props: TStyledProps & DefaultThemeProps) =>
    props.$screen === EScreen.mobile
      ? props.theme.background.primary
      : 'inherit'};
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
