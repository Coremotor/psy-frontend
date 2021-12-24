import { TUser } from 'app/store/modules/profile/types'

export const roles = {
  USER: 'USER',
  ADMIN: 'ADMIN',
}

export const roleGuard = (user: TUser | null, roles: string[]) => {
  let access = false

  if (user) {
    user.roles.forEach((role) => {
      if (roles.includes(role)) {
        access = true
      }
    })

    return access
  }
}
