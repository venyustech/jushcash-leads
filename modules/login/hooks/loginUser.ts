import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { LoginFormData } from '../types'
import { fakeLoginUser } from '../services'
import { userLoginStore } from '../store'

/**
 * @name useCreateUser
 * @description Hook responsável por simular login de usuário
 */

export const useLoginUser = () => {
  const router = useRouter()
  const { setLoginData } = userLoginStore()
  return useMutation(['register/create'], (data: LoginFormData) => fakeLoginUser(data), {
    onSuccess: (data) => {
      setLoginData(data)
      localStorage.setItem('user-login', JSON.stringify(data))
      router.prefetch('/home')
      router.push('/home')
    },
    onError: (error) => {
      console.error('Erro ao fazen login:', error)
      alert('Erro ao fazer login, tente novamente.')
    }
  })
}
