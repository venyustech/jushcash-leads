import { http, UnexpectedError } from '@/config'
import { LoginFormData } from '../types'

export const fakeLoginUser = async (data: LoginFormData): Promise<LoginFormData> => {
  const url = `/users`
  try {
    const result = await http.post(url, {
      name: data.email,
      email: data.email,
      password: data.password
    })
    return { ...data, token: 'tokenfake' }
  } catch (err) {
    throw new UnexpectedError()
  }
}
