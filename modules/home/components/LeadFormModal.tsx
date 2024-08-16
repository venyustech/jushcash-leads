'use client'

import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Flex,
  Text
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewLeadFormData, newLeadSchema } from '../validators'
import { NewLeadModalProps } from '../types'

export const LeadFormModal: React.FC<NewLeadModalProps> = ({ isOpen, onClose, onAddLead }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<NewLeadFormData>({
    resolver: zodResolver(newLeadSchema),
    defaultValues: {
      opportunities: ['Todos']
    }
  })

  const selectedOpportunities = watch('opportunities')
  const toast = useToast()

  const handleCheckboxChange = (value: string) => {
    const currentOpportunities = [...selectedOpportunities]

    if (value === 'Todos') {
      if (currentOpportunities.includes('Todos')) {
        setValue('opportunities', [])
      } else {
        setValue('opportunities', ['Todos'])
      }
    } else {
      if (currentOpportunities.includes('Todos')) {
        currentOpportunities.splice(currentOpportunities.indexOf('Todos'), 1)
      }

      if (currentOpportunities.includes(value)) {
        setValue(
          'opportunities',
          currentOpportunities.filter((opportunity) => opportunity !== value)
        )
      } else {
        setValue('opportunities', [...currentOpportunities, value])
      }
    }
  }

  const onSubmit = (data: NewLeadFormData) => {
    onAddLead(data)
    onClose()
    toast({
      title: 'Lead incluído com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={2}>
        <ModalHeader fontSize={22}> Novo Lead</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={18} fontWeight={500} pb={3} pl={3}>
            Dados do Lead
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.content} mb={3}>
              <FormLabel>
                Nome Completo{' '}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input placeholder="Nome Completo" {...register('content')} borderColor="#d2d4d5" borderRadius={2} />
              <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email} mb={3}>
              <FormLabel>
                Email{' '}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input placeholder="Email" {...register('email')} borderColor="#d2d4d5" borderRadius={2} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.phone} mb={3}>
              <FormLabel>
                Telefone{' '}
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input placeholder="Telefone" {...register('phone')} borderColor="#d2d4d5" borderRadius={2} />
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>

            <FormLabel>Oportunidades</FormLabel>
            <FormControl isInvalid={!!errors.opportunities}>
              <Flex flexDirection="column">
                <Checkbox
                  isChecked={selectedOpportunities.includes('Todos')}
                  onChange={() => handleCheckboxChange('Todos')}
                  mb={1}
                >
                  Todos
                </Checkbox>
                <Checkbox
                  isChecked={selectedOpportunities.includes('Honorários Sucumbencias')}
                  onChange={() => handleCheckboxChange('Honorários Sucumbencias')}
                  mb={1}
                >
                  Honorários Sucumbencias
                </Checkbox>
                <Checkbox
                  isChecked={selectedOpportunities.includes('Honorarios Contratuais')}
                  onChange={() => handleCheckboxChange('Honorarios Contratuais')}
                  mb={1}
                >
                  Honorarios Contratuais
                </Checkbox>
                <Checkbox
                  isChecked={selectedOpportunities.includes('Honorários Dativos')}
                  onChange={() => handleCheckboxChange('Honorários Dativos')}
                  mb={1}
                >
                  Honorários Dativos
                </Checkbox>
                <Checkbox
                  isChecked={selectedOpportunities.includes('Crédito do Autos')}
                  onChange={() => handleCheckboxChange('Crédito do Autos')}
                  mb={1}
                >
                  Crédito do Autos
                </Checkbox>
                <FormErrorMessage>{errors.opportunities?.message}</FormErrorMessage>
              </Flex>
            </FormControl>
            <ModalFooter>
              <Button
                variant="ghost"
                onClick={onClose}
                color="form.primary-button"
                borderWidth={1}
                borderColor="form.primary-button"
                bg="#fffff"
                borderRadius={5}
                paddingInline={6}
                _hover={{
                  borderWidth: `0px`,
                  color: '#fff',
                  backgroundColor: 'form.primary-button'
                }}
                mr={3}
              >
                Cancelar
              </Button>
              <Button
                mr={-3}
                type="submit"
                color="#FFFFFF"
                bg="form.primary-button"
                borderRadius={5}
                paddingInline={9}
                _hover={{
                  borderWidth: `1px`,
                  borderColor: 'form.primary-button',
                  color: 'form.primary-button',
                  backgroundColor: '#ffffff'
                }}
              >
                Salvar
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
