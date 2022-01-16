import styled from 'styled-components'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input, InputWrapper, Label } from 'app/components/ui/input'
import { Button } from 'app/components/ui/button'

type TOrderForm = {
  name: string
  email: string
  description: string
}

export const CreateOrderSection: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TOrderForm>()

  const onSubmit: SubmitHandler<TOrderForm> = (data) => {
    console.log(data)
  }
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <h3>Get a consultation</h3>
      <InputWrapper>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="name"
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
      <InputWrapper>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description', { required: true })}
        />
      </InputWrapper>
      <Button>Send</Button>
    </Container>
  )
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`
const Textarea = styled.textarea`
  height: 300px;
  resize: none;
`
