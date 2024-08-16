'use client'

import { Header } from '@/modules/shared/Header'
import { MainLayout } from '@/modules/shared/MainLayout'
import { RegisterForm } from './RegisterForm'

export const RegisterPage: React.FC = () => {
  return (
    <MainLayout>
      <Header />
      <RegisterForm />
    </MainLayout>
  )
}
