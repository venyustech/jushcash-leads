import { http, UnexpectedError } from '@/config'
import { RegisterFormData } from '../validators'

export const fakeRegisterUser = async (data: RegisterFormData): Promise<RegisterFormData> => {
  const url = `/users`
  try {
    const result = await http.post(url, {
      name: data.fullName,
      email: data.email,
      password: data.password
    })
    return data
  } catch (err) {
    throw new UnexpectedError()
  }
}
