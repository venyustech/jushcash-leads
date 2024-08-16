'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MainLayout } from '@/modules/shared/MainLayout'
import { Header } from '@/modules/shared/Header'
import LeadsPage from './LeadsPage'
import { useRouter } from 'next/navigation'
import { userLoginStore } from '@/modules/login/store'
import { LoginFormData } from '@/modules/login/types'
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Flex
} from '@chakra-ui/react'
import { userInfoStore } from '@/modules/register/store'
import { RedirectingPage } from '@/modules/shared/RedirectindPage'

export const HomePage: React.FC = () => {
  const router = useRouter()
  const { loginData, setLoginData, resetLoginData } = userLoginStore()
  const { resetUser } = userInfoStore()

  useEffect(() => {
    if (!loginData?.token) {
      const loginStorage = localStorage.getItem('user-login')
      if (!loginStorage) {
        router.push('/register')
      } else {
        setLoginData(JSON.parse(loginStorage as string) as LoginFormData)
      }
    }
  }, [loginData, router, setLoginData])

  const handleLogout = () => {
    localStorage.removeItem('user-login')
    localStorage.removeItem('user')
    localStorage.removeItem('leads')
    resetLoginData()
    resetUser()
    router.push('/register')
  }

  if (!loginData) return <RedirectingPage />

  return (
    <MainLayout>
      <Header />
      <LeadsPage />
      <LogoutDialog onLogoutConfirm={handleLogout} />
    </MainLayout>
  )
}

const LogoutDialog: React.FC<{
  onLogoutConfirm: () => void
}> = ({ onLogoutConfirm }) => {
  const [isOpen, setIsOpen] = useState(false)
  const cancelRef = useRef<HTMLButtonElement>(null)

  const openDialog = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const handleLogoutConfirm = () => {
    onClose()
    onLogoutConfirm()
  }

  return (
    <Flex flexGrow={1} w="100%">
      <Button
        alignSelf="flex-end"
        mb={-16}
        onClick={openDialog}
        color="white"
        bg="#E53E3E"
        _hover={{
          borderWidth: `1px`,
          borderColor: '#E53E3E',
          color: '#E53E3E',
          backgroundColor: 'transparent'
        }}
      >
        Finalizar gestão
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirme finalização de gestão
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja sair?{' '}
              <Box color="red" fontWeight={500}>
                Todos os seus dados serão perdidos
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                onClick={handleLogoutConfirm}
                color="white"
                bg="#E53E3E"
                _hover={{
                  borderWidth: `1px`,
                  borderColor: '#E53E3E',
                  color: '#E53E3E',
                  backgroundColor: 'transparent'
                }}
              >
                Sim, quero sair
              </Button>

              <Button
                ref={cancelRef}
                onClick={onClose}
                ml={3}
                color="#FFFFFF"
                paddingInline={10}
                bg="form.primary-button"
                _hover={{
                  borderWidth: `1px`,
                  borderColor: 'form.primary-button',
                  color: 'form.primary-button',
                  backgroundColor: '#ffffff'
                }}
              >
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  )
}

export default HomePage
