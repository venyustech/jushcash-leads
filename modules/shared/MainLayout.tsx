import React from 'react'
import { Box } from '@chakra-ui/react'
import { Header } from './Header'

export const MainLayout: React.FC = () => {
  return (
    <Box
      height="100vh"
      width="100vw"
      backgroundColor="main.primary"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width={{ base: '100vw', md: 'xl' }}
        minHeight={{ base: '100vh', md: 'xl' }}
        backgroundColor="main.secundary"
        alignItems="center"
        boxShadow="lg"
      >
        <Header />
      </Box>
    </Box>
  )
}
