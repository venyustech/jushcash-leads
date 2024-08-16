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
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Flex,
  Text
} from '@chakra-ui/react'
import { ViewLeadModalProps } from '../types'

export const ViewLeadModal: React.FC<ViewLeadModalProps> = ({ isOpen, onClose, lead }) => {
  if (!lead) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={2}>
        <ModalHeader fontSize={22}>Lead</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={18} fontWeight={500} pb={3} pl={3}>
            Dados do Lead
          </Text>
          <FormControl mb={3}>
            <FormLabel>Nome Completo</FormLabel>
            <Input value={lead.content} isDisabled borderColor="#d2d4d5" borderRadius={2} />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Email</FormLabel>
            <Input value={lead.email} isDisabled borderColor="#d2d4d5" borderRadius={2} />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Telefone</FormLabel>
            <Input value={lead.phone} isDisabled borderColor="#d2d4d5" borderRadius={2} />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Oportunidades</FormLabel>
            <Flex flexDirection={'column'}>
              <Checkbox isChecked={lead.opportunities.includes('Todos')} isDisabled>
                Todos
              </Checkbox>
              <Checkbox isChecked={lead.opportunities.includes('Honorários Sucumbencias')} isDisabled>
                Honorários Sucumbencias
              </Checkbox>
              <Checkbox isChecked={lead.opportunities.includes('Honorarios Contratuais')} isDisabled>
                Honorarios Contratuais
              </Checkbox>
              <Checkbox isChecked={lead.opportunities.includes('Honorários Dativos')} isDisabled>
                Honorários Dativos
              </Checkbox>
              <Checkbox isChecked={lead.opportunities.includes('Crédito do Autos')} isDisabled>
                Crédito do Autos
              </Checkbox>
            </Flex>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
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
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
