import { z } from 'zod';
import { DISTRICTS, WORK_CATEGORIES } from './constants';

const districtValues = DISTRICTS as unknown as [string, ...string[]];
const categoryIds = WORK_CATEGORIES.map(c => c.id) as unknown as [string, ...string[]];

export const locationSchema = z.object({
  district: z.enum(districtValues, {
    errorMap: () => ({ message: 'Selecione um distrito válido' }),
  }),
  city: z.string().min(2, 'Cidade é obrigatória'),
});

export const ratingsSchema = z.object({
  qualidadeTrabalho: z.number().min(1).max(5),
  cumprimentoPrazos: z.number().min(1).max(5),
  comunicacao: z.number().min(1).max(5),
  resolucaoProblemas: z.number().min(1).max(5),
  qualidadePreco: z.number().min(1).max(5),
  profissionalismo: z.number().min(1).max(5),
});

export const reviewFormSchema = z.object({
  companyName: z.string()
    .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres')
    .max(100, 'Nome da empresa muito longo'),
  companyLocation: locationSchema,
  workType: z.array(z.enum(categoryIds))
    .min(1, 'Selecione pelo menos um tipo de trabalho'),
  ratings: ratingsSchema,
  title: z.string()
    .min(5, 'Título deve ter pelo menos 5 caracteres')
    .max(100, 'Título muito longo'),
  content: z.string()
    .min(100, 'A avaliação deve ter pelo menos 100 caracteres')
    .max(5000, 'A avaliação é muito longa'),
  serviceDate: z.date({
    required_error: 'Data do serviço é obrigatória',
  }).max(new Date(), 'Data não pode ser no futuro'),
  wouldRecommend: z.enum(['yes', 'no', 'with-reservations'], {
    errorMap: () => ({ message: 'Selecione uma opção' }),
  }),
  isAnonymous: z.boolean(),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const signUpSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
  confirmPassword: z.string(),
  displayName: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome muito longo'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
