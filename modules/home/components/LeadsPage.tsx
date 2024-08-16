'use client'

import React, { useState } from 'react'
import { Box, Heading, Flex, Button } from '@chakra-ui/react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { LeadFormModal } from './LeadFormModal'
import { ViewLeadModal } from './ViewLeadFormModal'
import { DroppableColumnProps, Lead, LeadsState } from '../types'

const initialLeads: LeadsState = {
  potential: [
    { id: 'lead-1', content: 'Lead 1', email: 'lead1@example.com', phone: '123456789', opportunities: ['Todos'] },
    {
      id: 'lead-2',
      content: 'Lead 2',
      email: 'lead2@example.com',
      phone: '987654321',
      opportunities: ['Honorários Sucumbencias']
    },
    {
      id: 'lead-3',
      content: 'Lead 3',
      email: 'lead3@example.com',
      phone: '123123123',
      opportunities: ['Crédito do Autos']
    }
  ],
  confirmed: [],
  analysis: []
}

const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<LeadsState>(initialLeads)
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false)
  const [isViewLeadModalOpen, setIsViewLeadModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination || source.droppableId === destination.droppableId) return
    if (
      (source.droppableId === 'potential' && destination.droppableId !== 'confirmed') ||
      (source.droppableId === 'confirmed' && destination.droppableId !== 'analysis') ||
      source.droppableId === 'analysis'
    )
      return
    const sourceColumn = Array.from(leads[source.droppableId as keyof LeadsState])
    const destColumn = Array.from(leads[destination.droppableId as keyof LeadsState])
    const [movedItem] = sourceColumn.splice(source.index, 1)
    destColumn.splice(destination.index, 0, movedItem)
    setLeads({
      ...leads,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn
    })
  }

  const handleAddLead = (data: Omit<Lead, 'id'>) => {
    const newLeadData: Lead = {
      id: `lead-${Date.now()}`,
      ...data
    }
    setLeads((prevLeads) => ({
      ...prevLeads,
      potential: [...prevLeads.potential, newLeadData]
    }))
  }

  const openNewLeadModal = () => setIsNewLeadModalOpen(true)
  const closeNewLeadModal = () => setIsNewLeadModalOpen(false)
  const openViewLeadModal = (lead: Lead) => {
    setSelectedLead(lead)
    setIsViewLeadModalOpen(true)
  }
  const closeViewLeadModal = () => {
    setSelectedLead(null)
    setIsViewLeadModalOpen(false)
  }

  return (
    <Box width="100%" p={4}>
      <Flex justifyContent="flex-end">
        <Button
          type="button"
          width="fit-content"
          mb={3}
          paddingInline={8}
          color="#FFFFFF"
          bg="form.primary-button"
          borderRadius="6px"
          onClick={openNewLeadModal}
          _hover={{
            borderWidth: `1px`,
            borderColor: 'form.primary-button',
            color: 'form.primary-button',
            backgroundColor: '#ffffff'
          }}
        >
          + Novo Lead
        </Button>
      </Flex>
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex>
          <DroppableColumn
            id="potential"
            title="Cliente Potencial"
            leads={leads.potential}
            onLeadClick={openViewLeadModal}
          />
          <DroppableColumn
            id="confirmed"
            title="Dados Confirmados"
            leads={leads.confirmed}
            onLeadClick={openViewLeadModal}
          />
          <DroppableColumn
            id="analysis"
            title="Análise do Lead"
            leads={leads.analysis}
            onLeadClick={openViewLeadModal}
          />
        </Flex>
      </DragDropContext>

      <LeadFormModal isOpen={isNewLeadModalOpen} onClose={closeNewLeadModal} onAddLead={handleAddLead} />
      <ViewLeadModal isOpen={isViewLeadModalOpen} onClose={closeViewLeadModal} lead={selectedLead} />
    </Box>
  )
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ id, title, leads, onLeadClick }) => (
  <Droppable droppableId={id}>
    {(provided) => (
      <Box
        ref={provided.innerRef}
        {...provided.droppableProps}
        width="100%"
        bg="linear-gradient(white 50%, #f7f7f7 50%)"
        bgSize="100% 76px"
        border="1px solid #d2d4d5"
        boxShadow="lg"
      >
        <Heading
          fontSize={{ base: '12px', md: '14px' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={'38px'}
        >
          {title}
        </Heading>
        <Box>
          {leads.map((lead, index) => (
            <Draggable key={lead.id} draggableId={lead.id} index={index}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  height={'38px'}
                  border="1px solid #d2d4d5"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={index % 2 ? 'white' : '#f7f7f7'}
                  onClick={() => onLeadClick(lead)}
                  cursor="pointer"
                  fontWeight={500}
                  fontSize={{ base: '12px', md: '14px' }}
                  boxShadow="lg"
                  _hover={{
                    borderWidth: `1px`,
                    borderColor: 'form.primary-button',
                    color: 'form.primary-button',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {lead.content}
                </Box>
              )}
            </Draggable>
          ))}
        </Box>
        {provided.placeholder}
      </Box>
    )}
  </Droppable>
)

export default LeadsPage
