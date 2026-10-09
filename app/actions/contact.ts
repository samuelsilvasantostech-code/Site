"use server";

import { contactSchema, type ContactInput } from "@/lib/schemas/contact";

export type ContactResult =
  | { status: "ok" }
  | { status: "invalid"; fieldErrors: Partial<Record<keyof ContactInput, string>> }
  | { status: "not-configured" }
  | { status: "error" };

/**
 * Recebe o formulário de contato, valida no servidor e encaminha ao Formspree.
 * O endpoint fica em `FORMSPREE_ENDPOINT` (variável de servidor, nunca exposta ao navegador).
 */
export async function sendContact(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      fieldErrors[key] ??= issue.message;
    }
    return { status: "invalid", fieldErrors };
  }

  // Honeypot preenchido: responde como sucesso para não dar pistas ao robô.
  if (parsed.data.company) return { status: "ok" };

  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) return { status: "not-configured" };

  const { name, email, message } = parsed.data;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, _replyto: email }),
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok ? { status: "ok" } : { status: "error" };
  } catch {
    return { status: "error" };
  }
}
