import styled from 'styled-components'
import Link from 'next/link'
import { Routes } from 'routes'
import React from 'react'
import { useSelector } from 'react-redux'
import { getUser } from 'app/store/modules/profile/selectors'
import { roleGuard, roles } from 'app/guards'

export const Navigation = () => {
  const user = useSelector(getUser)
  return (
    <Nav>
      <Link href={Routes.home} passHref>
        <A>Главная</A>
      </Link>
      <Link href={Routes.articles} passHref>
        <A>Все статьи</A>
      </Link>
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

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
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
