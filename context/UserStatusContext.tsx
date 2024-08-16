import { createContext, useContext, ReactNode, useState } from 'react'

interface UserStatusContextType {
  userStatus: string | null
  setUserStatus: (value: string | null) => void
}

const userStatusContext = createContext<UserStatusContextType | undefined>(undefined)

export const useUserStatusContext = () => {
  const context = useContext(userStatusContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export const UserStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userStatus, setUserStatus] = useState<string | null>(null)

  return <userStatusContext.Provider value={{ userStatus, setUserStatus }}>{children}</userStatusContext.Provider>
}
