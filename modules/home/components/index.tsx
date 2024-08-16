'use client'
import React, { useEffect } from 'react'
import { MainLayout } from '@/modules/shared/MainLayout'
import { Header } from '@/modules/shared/Header'
import LeadsPage from './LeadsPage'
import { useRouter } from 'next/navigation'
import { userLoginStore } from '@/modules/login/store'
import { LoginFormData } from '@/modules/login/types/indes'
import { RedirectingPage } from '@/modules/shared/RedirectindPage'

export const HomePage: React.FC = () => {
  const router = useRouter()
  const { loginData, setLoginData } = userLoginStore()
  useEffect(() => {
    if (!loginData?.token) {
      const loginStorage = localStorage.getItem('user-login')
      if (!loginStorage) router.push('/register')
      setLoginData(JSON.parse(loginStorage as string) as LoginFormData)
    }
  }, [])
  if (!loginData) return <RedirectingPage />
  return (
    <MainLayout>
      <Header />
      <LeadsPage />
    </MainLayout>
  )
}

export default HomePage
