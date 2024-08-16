import { Box, Flex } from '@chakra-ui/react'
import { Header } from './Header'

export const RedirectingPage = () => {
  return (
    <Flex height="100vh" width="100vw" direction="column" background="#00B4D8">
      <Header />
      <Box>loading...</Box>
    </Flex>
  )
}
