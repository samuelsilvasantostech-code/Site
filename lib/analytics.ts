import { track as vercelTrack } from "@vercel/analytics";

/**
 * Eventos de conversão do site. Vão para o Vercel Web Analytics, que é
 * agregado e não usa cookies. Eventos personalizados só aparecem no painel
 * em planos que os suportam; nos demais, as chamadas são ignoradas sem erro.
 */
export type AnalyticsEvent =
  "contact_form_start" | "contact_form_submit" | "whatsapp_click" | "service_cta_click";

export function track(event: AnalyticsEvent, data?: Record<string, string>) {
  try {
    vercelTrack(event, data);
  } catch {
    // Métricas nunca podem quebrar a navegação.
  }
}
