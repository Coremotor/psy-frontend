export type TProfileState = {
  user: TUser | null
}

export type TUser = {
  id: string
  email: string
  name: string
  roles: string[]
}

export type TSignInForm = {
  email: string
  password: string
}

export type TSignUpForm = {
  email: string
  password: string
  name: string
}

export type TEditProfile = {
  email: string
  name: string
}
