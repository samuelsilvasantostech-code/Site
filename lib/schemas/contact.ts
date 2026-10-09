import { z } from "zod";

import { CONTACT_LIMITS as L } from "@/lib/constants";

/**
 * Schema do formulário de contato. É usado no cliente (react-hook-form) e
 * no servidor (Server Action), então a validação é a mesma nos dois lados.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Informe o seu nome.")
    .min(L.nameMin, `O nome precisa ter pelo menos ${L.nameMin} caracteres.`)
    .max(L.nameMax, `O nome pode ter no máximo ${L.nameMax} caracteres.`),
  email: z
    .string()
    .trim()
    .min(1, "Informe o seu e-mail.")
    .max(L.emailMax, `O e-mail pode ter no máximo ${L.emailMax} caracteres.`)
    .pipe(z.email("Informe um e-mail válido, por exemplo nome@empresa.com.")),
  message: z
    .string()
    .trim()
    .min(1, "Escreva a sua mensagem.")
    .min(L.messageMin, `A mensagem precisa ter pelo menos ${L.messageMin} caracteres.`)
    .max(L.messageMax, `A mensagem pode ter no máximo ${L.messageMax} caracteres.`),
  /** Honeypot anti-spam: humanos não veem este campo, então ele deve ficar vazio. */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
