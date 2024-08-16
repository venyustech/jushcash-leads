import React from 'react'
import { MainLayout } from '@/modules/shared/MainLayout'
import { Header } from '@/modules/shared/Header'

export const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <Header />
      home page
    </MainLayout>
  )
}
