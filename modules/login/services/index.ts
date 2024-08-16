import { http, UnexpectedError } from '@/config'
import { LoginFormData } from '../types/indes'

export const fakeLoginUser = async (data: LoginFormData): Promise<LoginFormData> => {
  const url = `/users`
  console.log(`Fake route for login user data: ${data}`)
  try {
    const result = await http.post(url, {
      name: data.email,
      email: data.email,
      password: data.password
    })
    console.log('fake result', result)
    return { ...data, token: 'tokenfake' }
  } catch (err) {
    throw new UnexpectedError()
  }
}
