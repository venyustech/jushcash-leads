import { createContext, useContext, ReactNode, useState } from 'react'

interface AuthContextType {
  sessionCookie: string | null
  setSessionCookie: (value: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessionCookie, setSessionCookie] = useState<string | null>(null)

  return <AuthContext.Provider value={{ sessionCookie, setSessionCookie }}>{children}</AuthContext.Provider>
}
