import { z } from "zod";

import { serviceOptions } from "@/content/data";
import { CONTACT_LIMITS as L } from "@/lib/constants";

/**
 * Schema do formulário de contato. É usado no navegador (react-hook-form) e
 * no servidor (Server Action), então a validação é a mesma nos dois lados.
 * Coleta só o necessário para responder à solicitação.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Informe o seu nome.")
    .min(L.nameMin, `O nome precisa ter pelo menos ${L.nameMin} caracteres.`)
    .max(L.nameMax, `O nome pode ter no máximo ${L.nameMax} caracteres.`),
  company: z
    .string()
    .trim()
    .max(L.companyMax, `O nome da empresa pode ter no máximo ${L.companyMax} caracteres.`),
  email: z
    .string()
    .trim()
    .min(1, "Informe o seu e-mail.")
    .max(L.emailMax, `O e-mail pode ter no máximo ${L.emailMax} caracteres.`)
    .pipe(z.email("Informe um e-mail válido, por exemplo nome@empresa.com.br.")),
  contact: z
    .string()
    .trim()
    .max(L.contactMax, `O telefone pode ter no máximo ${L.contactMax} caracteres.`)
    .refine(
      (value) => value === "" || /^[\d\s()+-]{8,}$/.test(value),
      "Informe um telefone válido, com DDD. Ex.: (38) 99999-9999.",
    ),
  // Entrada aceita "" (nada escolhido); a saída é sempre uma das opções.
  service: z
    .string()
    .pipe(z.enum(serviceOptions, { error: "Escolha o que a sua empresa precisa." })),
  message: z
    .string()
    .trim()
    .min(1, "Conte brevemente sobre o desafio.")
    .min(L.messageMin, `A mensagem precisa ter pelo menos ${L.messageMin} caracteres.`)
    .max(L.messageMax, `A mensagem pode ter no máximo ${L.messageMax} caracteres.`),
  consent: z
    .boolean()
    .refine(
      (value) => value,
      "Para enviar, é preciso concordar com o uso dos dados para responder ao contato.",
    ),
  /** Honeypot anti-spam: invisível para pessoas, então deve ficar vazio. */
  website: z.string().max(0).optional(),
  /** Momento em que o formulário foi aberto (ms), para descartar envios automáticos. */
  startedAt: z.number().int().nonnegative(),
});

/** Dados validados (saída do schema). */
export type ContactInput = z.output<typeof contactSchema>;

/** Valores do formulário antes da validação (o serviço começa vazio, o aceite desmarcado). */
export type ContactFormValues = z.input<typeof contactSchema>;
