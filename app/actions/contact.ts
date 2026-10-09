"use server";

import { CONTACT_MIN_FILL_MS } from "@/lib/constants";
import { contactSchema, type ContactInput } from "@/lib/schemas/contact";

export type ContactResult =
  | { status: "ok" }
  | { status: "invalid"; fieldErrors: Partial<Record<keyof ContactInput, string>> }
  | { status: "not-configured" }
  | { status: "too-fast" }
  | { status: "error" };

/**
 * Recebe a solicitação de diagnóstico, valida no servidor e encaminha ao
 * endpoint de formulários (Formspree), que entrega por e-mail.
 *
 * O endpoint fica em `FORMSPREE_ENDPOINT`, variável de servidor nunca exposta
 * ao navegador. Sem ela, a função responde "not-configured" e o site avisa a
 * pessoa, em vez de fingir que a mensagem foi enviada. Nada é armazenado aqui.
 */
export async function sendContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      fieldErrors[key] ??= issue.message;
    }
    return { status: "invalid", fieldErrors };
  }

  const { website, startedAt, consent: _consent, ...lead } = parsed.data;

  // Honeypot preenchido: robô. Responde como sucesso para não dar pistas,
  // mas não encaminha nada (pessoas não veem esse campo).
  if (website) return { status: "ok" };

  // Envio rápido demais: provável robô, mas pode ser alguém com preenchimento
  // automático. Nunca fingimos sucesso: pedimos para tentar de novo.
  if (Date.now() - startedAt < CONTACT_MIN_FILL_MS) return { status: "too-fast" };

  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) return { status: "not-configured" };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        _replyto: lead.email,
        _subject: `Solicitação de diagnóstico: ${lead.service}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok ? { status: "ok" } : { status: "error" };
  } catch {
    return { status: "error" };
  }
}
