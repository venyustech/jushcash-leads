import { create } from 'zustand'
import { LoginFormData } from '../types'

interface ILoginFormData {
  loginData?: LoginFormData
  setLoginData: (data: LoginFormData) => void
  resetLoginData: () => void
}

export const userLoginStore = create<ILoginFormData>((set) => ({
  loginData: undefined,
  setLoginData: (data: LoginFormData) => set({ loginData: data }),
  resetLoginData: () => set({ loginData: undefined })
}))
