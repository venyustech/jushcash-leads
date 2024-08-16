import { create } from 'zustand'
import { RegisterFormData } from '../validators'

interface IUserRegisterStore {
  user?: RegisterFormData
  setUser: (data: RegisterFormData) => void
}

export const userInfoStore = create<IUserRegisterStore>((set) => {
  return {
    user: undefined,
    setUser: (data: RegisterFormData) => set(() => ({ user: data }))
  }
})
