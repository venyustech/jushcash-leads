import { NewLeadFormData } from '../validators'

export interface Lead {
  id: string
  content: string
  email: string
  phone: string
  opportunities: string[]
}

export interface LeadsState {
  potential: Lead[]
  confirmed: Lead[]
  analysis: Lead[]
}

export interface DroppableColumnProps {
  id: keyof LeadsState
  title: string
  leads: Lead[]
  onLeadClick: (lead: Lead) => void
}

export interface ViewLeadModalProps {
  isOpen: boolean
  onClose: () => void
  lead: Lead | null
}

export interface NewLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onAddLead: (data: NewLeadFormData) => void
}
