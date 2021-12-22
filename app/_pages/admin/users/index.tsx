import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from 'app/store/modules/admin/actions'
import { getUsersFromState } from 'app/store/modules/admin/selectors'
import styled from 'styled-components'

export const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(getUsersFromState)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <Container>
      {users.map((u) => (
        <User key={u.email}>
          <Text>Email: {u.email}</Text>
          <Text>Name: {u.name}</Text>
        </User>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const User = styled.div`
  border: 1px solid black;
  padding: 5px;
  margin: 10px;
`

const Text = styled.div`
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`
