import { create } from 'zustand'
import { RegisterFormData } from '../validators'

interface IUserRegisterStore {
  user?: RegisterFormData
  setUser: (data: RegisterFormData) => void
  resetUser: () => void
}

export const userInfoStore = create<IUserRegisterStore>((set) => ({
  user: undefined,
  setUser: (data: RegisterFormData) => set({ user: data }),
  resetUser: () => set({ user: undefined })
}))
