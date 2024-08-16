import React from 'react'
import { Box } from '@chakra-ui/react'
import { Header } from './Header'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      minHeight="100vh"
      height="100%"
      width="100vw"
      backgroundColor="main.primary"
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddingBottom={20}
    >
      <Box
        width={{ base: '100vw', md: 'xl' }}
        minHeight={{ base: '100vh', md: 'xl' }}
        backgroundColor="main.secundary"
        alignItems="center"
        boxShadow="lg"
        display="flex"
        flexDirection="column"
      >
        {children}
      </Box>
    </Box>
  )
}
