import { useMutation } from '@tanstack/react-query'
import { RegisterFormData } from '../validators'
import { fakeRegisterUser } from '../services'
import { userInfoStore } from '../store'
import { useRouter } from 'next/navigation'

/**
 * @name useCreateUser
 * @description Hook responsável por simular registro de usuário
 */

export const useCreateUser = () => {
  const router = useRouter()
  const { setUser } = userInfoStore()
  return useMutation(['register/create'], (data: RegisterFormData) => fakeRegisterUser(data), {
    onSuccess: (data) => {
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      router.prefetch('/login')
      router.push('/login')
    },
    onError: (error) => {
      console.error('Erro ao criar usuário:', error)
      alert('Erro ao criar usuário, tente novamente.')
    }
  })
}
