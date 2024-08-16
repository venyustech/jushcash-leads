'use client'

import React, { useState } from 'react'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  IconButton,
  Text,
  Link,
  Flex
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { LoginFormData } from '../types/indes'
import { useLoginUser } from '../hooks/loginUser'

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>()
  const useLogin = useLoginUser()
  const onSubmit = (data: LoginFormData) => useLogin.mutate(data)

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      mt={4}
      p={4}
      h="100%"
      w="100%"
      flex="1"
      flexDirection="column"
      justifyContent="center"
    >
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.email}>
          <FormLabel color="form.label" htmlFor="email">
            E-mail
            <Text as="span" color="red">
              *
            </Text>
          </FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            {...register('email', { required: 'E-mail é obrigatório' })}
            bg="transparent"
            borderColor="form.label"
            _hover={{ boxShadow: 'none', borderWidth: `1px`, borderColor: 'form.label-selected' }}
            _focus={{ boxShadow: 'none', borderWidth: `1px`, borderColor: 'form.label-selected' }}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel color="form.label" htmlFor="password">
            Senha
            <Text as="span" color="red">
              *
            </Text>
          </FormLabel>
          <InputGroup size="md">
            <Input
              id="password"
              pr="4.5rem"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              {...register('password', { required: 'Senha é obrigatória' })}
              bg="transparent"
              borderColor="form.label"
              _hover={{ boxShadow: 'none', borderWidth: `1px`, borderColor: 'form.label-selected' }}
              _focus={{ boxShadow: 'none', borderWidth: `1px`, borderColor: 'form.label-selected' }}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                icon={
                  showPassword ? (
                    <ViewOffIcon color="form.label" bg={'transparent'} />
                  ) : (
                    <ViewIcon color="form.label" bg={'transparent'} />
                  )
                }
                aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormLabel
          color="form.label"
          alignSelf="end"
          textDecoration="underline"
          width="fit-content"
          _hover={{ cursor: 'pointer' }}
        >
          <Link href="/register">Não possui conta? Inscreva-se</Link>
        </FormLabel>
        <Button
          type="submit"
          width="fit-content"
          alignSelf="center"
          mt={3}
          color="#FFFFFF"
          bg="form.secundary-button"
          _hover={{
            borderWidth: `1px`,
            borderColor: 'form.secundary-button-selected',
            color: 'form.secundary-button-selected',
            backgroundColor: '#ffffff'
          }}
        >
          Fazer login
        </Button>
      </VStack>

      {Object.keys(errors).length > 0 && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          Antes de prosseguir, insira corretamente os dados
        </Alert>
      )}
    </Flex>
  )
}

export default LoginForm
