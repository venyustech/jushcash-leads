import React, { useState, useEffect } from 'react'
import { Box, Heading, Flex, Button } from '@chakra-ui/react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { LeadFormModal } from './LeadFormModal'
import { ViewLeadModal } from './ViewLeadFormModal'
import { DroppableColumnProps, Lead, LeadsState } from '../types'

const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<LeadsState>(() => {
    const storedLeads = localStorage.getItem('leads')
    return storedLeads ? JSON.parse(storedLeads) : { potential: [], confirmed: [], analysis: [] }
  })
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false)
  const [isViewLeadModalOpen, setIsViewLeadModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  useEffect(() => {
    localStorage.setItem('leads', JSON.stringify(leads))
  }, [leads])

  const onDragEnd = dragReverseBlock(leads, setLeads)

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
      <NewLeadButton openNewLeadModal={openNewLeadModal} />
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
          fontSize={{ base: '10px', md: '14px' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={'38px'}
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {title}
        </Heading>
        <Box>
          {leads.map((lead, index) => (
            <Draggable key={lead.id} draggableId={lead.id} index={index}>
              {(provided) => (
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
                  overflow="hidden"
                  whiteSpace="nowrap"
                  _hover={{
                    borderWidth: `1px`,
                    borderColor: 'form.primary-button',
                    color: 'form.primary-button',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {truncateString(lead.content, 15)}
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
const NewLeadButton: React.FC<{ openNewLeadModal: () => void }> = ({ openNewLeadModal }) => {
  return (
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
  )
}

function dragReverseBlock(leads: LeadsState, setLeads: React.Dispatch<React.SetStateAction<LeadsState>>) {
  return (result: DropResult) => {
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
}

const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str
  }
  return str.slice(0, maxLength) + '...'
}

export default LeadsPage
