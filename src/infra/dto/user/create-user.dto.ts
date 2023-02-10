import { string, object } from 'zod'

export const createUserDto = object({
  email: string(),
  password: string(),
  passwordConfirmation: string(),
  name: string(),
  phone: string()
})
