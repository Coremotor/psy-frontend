import Link from 'next/link'
import { Routes } from 'routes'
import { Form, FormWrapper } from 'app/components/ui/form'
import { Input, InputWrapper, Label } from 'app/components/ui/input'
import { Button } from 'app/components/ui/button'
import { A } from 'app/components/ui/link'
import { GoBack } from 'app/components/goBack'
import { useForm, SubmitHandler } from 'react-hook-form'
import { InputErrorMessage } from 'app/components/ui/errors'
import { Main } from 'app/components/ui/containers'
import { TSignInForm } from 'app/store/modules/profile/types'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from 'app/store/modules/profile/actions'
import { useRouter } from 'next/router'
import { getIsLoading } from 'app/store/modules/loading/selectors'
import { Loader } from 'app/components/loader'

export const SignIn = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsLoading)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInForm>()

  const goHome = () => router.push(Routes.home)

  const onSubmit: SubmitHandler<TSignInForm> = (data) => {
    dispatch(signIn(data, goHome))
  }

  return (
    <Main>
      {isLoading && <Loader isLoading={isLoading} />}
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

          <Button>Sign in</Button>

          <Link href={Routes.sign_up}>
            <A>Sing up</A>
          </Link>
        </Form>
      </FormWrapper>
    </Main>
  )
}
