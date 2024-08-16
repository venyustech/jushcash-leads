import { z } from 'zod'

export const newLeadSchema = z.object({
  content: z.string().min(1, 'Nome Completo é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  opportunities: z.array(z.string()).min(1, 'Pelo menos uma oportunidade deve ser selecionada')
})

export type NewLeadFormData = z.infer<typeof newLeadSchema>
