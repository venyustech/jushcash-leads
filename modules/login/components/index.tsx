'use client'

import { Header } from '@/modules/shared/Header'
import { MainLayout } from '@/modules/shared/MainLayout'
import LoginForm from './LoginForm'

export const LoginPage: React.FC = () => {
  return (
    <MainLayout>
      <Header />
       <LoginForm/>
    </MainLayout>
  )
}
