import { z } from 'zod'

export const CreateSecretSchema = z.object({
  siteName: z.string()
  .min(2, { error: "Este campo deve conter pelo menos 2 caracteres" })
  .max(30, { error: "Este campo deve conter no máximo 30 caracteres" }),
  identifier: z.string()
  .min(3, { error: "Este campo deve conter pelo menos 3 caracteres" })
  .max(30, { error: "Este campo deve conter no máximo 30 caracteres" }),
  password: z.string()
  .min(8, { error: "Este campo deve conter pelo menos 3 caracteres" })
  .max(20, { error: "Este campo deve conter no máximo 30 caracteres" }),
})

export const SelectSecretQuerySchema = z.object({
  siteName: z.string()
  .min(1, { error: "Não pode estar vazio" })
})

export const UpdateSecretSchema = z.object({
  params: z.object({
    id: z.uuid()
  }),
  body: z.object({
    identifier: z.string()
    .min(3, { error: "Não pode conter menos de 3 caracteres "})
    .max(20, { error: "Não pode conter mais de 20 caracteres" })
    .optional(),
    password: z.string()
    .min(8, { error: "Não pode conter menos de 8 caracteres "})
    .max(20, { error: "Não pode conter mais de 20 caracteres" })
    .optional(),
  })
})

export const DeleteSecretSchema = z.object({
  params: z.object({
    id: z.uuid()
  })
})