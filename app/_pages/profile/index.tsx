import { Routes } from 'routes'
import { Form } from 'app/components/ui/form'
import { Input, InputWrapper, Label } from 'app/components/ui/input'
import { Button } from 'app/components/ui/button'
import { GoBack } from 'app/components/goBack'
import { SubmitHandler, useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TEditProfile, TUser } from 'app/store/modules/profile/types'
import { Layout } from 'app/components/layout'
import styled from 'styled-components'
import { getUser } from 'app/store/modules/profile/selectors'
import { useRouter } from 'next/router'
import { editProfile } from 'app/store/modules/profile/actions'

const formDefaultValues = {
  email: '',
  name: '',
}

export const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<TUser>({
    defaultValues: formDefaultValues,
  })

  const onSubmit: SubmitHandler<TEditProfile> = (data) => {
    dispatch(editProfile(data))
  }

  useEffect(() => {
    if (user) {
      reset(user)
    } else {
      router.push(Routes.home)
    }
  }, [user])

  return (
    <Layout>
      <GoBack text="Home page" redirectTo={Routes.home} />
      <Form_mod onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="string"
            {...register('name', { required: true })}
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: true })}
          />
        </InputWrapper>

        <Button_mod>Save</Button_mod>
      </Form_mod>
    </Layout>
  )
}

const Button_mod = styled(Button)`
  align-self: flex-start;
`

const Form_mod = styled(Form)`
  border: none;
`
