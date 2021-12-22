import Link from 'next/link'
import { Routes } from 'routes'
import { Form, FormWrapper } from 'app/components/ui/form'
import { Input, InputWrapper, Label } from 'app/components/ui/input'
import { Button } from 'app/components/ui/button'
import { A } from 'app/components/ui/link'
import { GoBack } from 'app/components/goBack'
import { Main } from 'app/components/ui/containers'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputErrorMessage } from 'app/components/ui/errors'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SignUpPopUp } from 'app/components/signUpPopUp'
import { TSignUpForm } from 'app/store/modules/profile/types'
import { signUp } from 'app/store/modules/profile/actions'

export const SignUp = () => {
  const dispatch = useDispatch()

  const [passwordRepeat, setPasswordRepeat] = useState('')
  const passwordRepeatHandler = (e: React.FormEvent<HTMLInputElement>) =>
    setPasswordRepeat(e.currentTarget.value)

  const [show, setShow] = useState(false)
  const showPopUp = () => setShow(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TSignUpForm>()

  const passwordsISEqual = watch('password') === passwordRepeat

  const onSubmit: SubmitHandler<TSignUpForm> = (data) => {
    dispatch(signUp(data, showPopUp))
  }

  return (
    <Main>
      {show && <SignUpPopUp />}
      <GoBack text="Home page" redirectTo={Routes.home} />
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { required: true })}
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="name">First name</Label>
            <Input
              id="name"
              type="string"
              {...register('name', { required: true })}
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password', { required: true, minLength: 8 })}
            />
            {errors.password && (
              <InputErrorMessage>Min length: 8</InputErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="repeat-password">Repeat password</Label>
            <Input
              id="repeat-password"
              name="repeat-password"
              type="password"
              onInput={passwordRepeatHandler}
              value={passwordRepeat}
            />
          </InputWrapper>

          <Button disabled={!passwordsISEqual}>Sign up</Button>

          <Link href={Routes.sign_in}>
            <A>Sing in</A>
          </Link>
        </Form>
      </FormWrapper>
    </Main>
  )
}
