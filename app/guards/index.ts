import { TUser } from 'app/store/modules/profile/types'

export const roles = {
  USER: "USER",
  ADMIN: "ADMIN"
}

export const roleGuard = (user: TUser | null, roles: string[]) => {
  if (user) {
    const coincidence = user.roles.filter(role => roles.includes(role));
    return coincidence.length > 0;
  } else return false
}
