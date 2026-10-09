/** URL pública do site, sem barra final. Usada em metadata, sitemap, robots e JSON-LD. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

/** Cor de fundo do tema escuro (padrão). Usada em `theme-color` e no manifest. */
export const THEME_COLOR_DARK = "#0B0F14";
export const THEME_COLOR_LIGHT = "#FFFFFF";

/** Data da última atualização relevante do conteúdo, para o sitemap. */
export const CONTENT_UPDATED_AT = "2026-10-09";

/** Limites do formulário de contato (compartilhados pelo schema e pelos campos). */
export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  companyMax: 120,
  contactMax: 30,
  emailMax: 120,
  messageMin: 10,
  messageMax: 2000,
} as const;

/** Envios mais rápidos que isto (desde a abertura do formulário) são tratados como robô. */
export const CONTACT_MIN_FILL_MS = 3000;
