import React from 'react'
import { MainLayout } from '@/modules/shared/MainLayout'
import { Header } from '@/modules/shared/Header'
import LeadsPage from './LeadsPage'

export const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <Header />
      <LeadsPage />
    </MainLayout>
  )
}
