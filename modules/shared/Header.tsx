import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'

export const Header: React.FC = () => {
  return (
    <Flex justifyContent="center" padding={3}>
      <Image src="/img/logo-white.svg" width={400} height={400} alt="JushCash image" />
    </Flex>
  )
}
