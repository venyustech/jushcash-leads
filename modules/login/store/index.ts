import { create } from 'zustand'
import { LoginFormData } from '../types/indes'

interface ILoginFormData {
  loginData?: LoginFormData
  setLoginData: (data: LoginFormData) => void
}

export const userLoginStore = create<ILoginFormData>((set) => {
  return {
    loginData: undefined,
    setLoginData: (data: LoginFormData) => set(() => ({ loginData: data }))
  }
})
