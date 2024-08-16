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
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { RegisterFormData, registerValidator } from '../validators'

export const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerValidator)
  })

  const onSubmit = (data: RegisterFormData) => {
    console.log(data)
    // router.push('/login');
  }

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
        <FormControl isInvalid={!!errors.fullName}>
          <FormLabel color="form.label" htmlFor="fullName">
            Seu Nome Completo
            <Text as="span" color="red">
              *
            </Text>
          </FormLabel>
          <Input
            id="fullName"
            placeholder="Digite seu nome completo"
            {...register('fullName')}
            bg="transparent"
            borderColor="form.label"
            _hover={{ boxShadow: 'none', borderWidth: `2px`, borderColor: 'form.label-selected' }}
            _focus={{ boxShadow: 'none', borderWidth: `2px`, borderColor: 'form.label-selected' }}
          />
          <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
        </FormControl>

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
            {...register('email')}
            bg="transparent"
            borderColor="form.label"
            _hover={{ boxShadow: 'none', borderWidth: `2px`, borderColor: 'form.label-selected' }}
            _focus={{ boxShadow: 'none', borderWidth: `2px`, borderColor: 'form.label-selected' }}
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
              {...register('password')}
              bg="transparent"
              borderColor="form.label"
              _hover={{ boxShadow: 'none', borderWidth: `2px`, borderColor: 'form.label-selected' }}
              _focus={{ boxShadow: 'none', borderWidth: `2px`, borderColor: 'form.label-selected' }}
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

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel color="form.label" htmlFor="confirmPassword">
            Confirme sua Senha
            <Text as="span" color="red">
              *
            </Text>
          </FormLabel>
          <InputGroup size="md">
            <Input
              id="confirmPassword"
              pr="4.5rem"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirme sua senha"
              {...register('confirmPassword')}
              bg="transparent"
              borderColor="form.label"
              _hover={{ boxShadow: 'none', borderWidth: `2px`, borderColor: 'form.label-selected' }}
              _focus={{ boxShadow: 'none', borderWidth: `2px`, borderColor: 'form.label-selected' }}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                icon={
                  showConfirmPassword ? (
                    <ViewOffIcon bg={'transparent'} color="form.label" />
                  ) : (
                    <ViewIcon bg={'transparent'} color="form.label" />
                  )
                }
                aria-label={showConfirmPassword ? 'Esconder senha' : 'Mostrar senha'}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>
        <FormLabel
          color="form.label"
          alignSelf="end"
          textDecoration="underline"
          width="fit-content"
          _hover={{ cursor: 'pointer' }}
        >
          <Link href="/login">Já possui uma conta? Fazer o login</Link>
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
          Criar conta
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
