import type { Page } from "@playwright/test";

/**
 * Abre a página e espera a rede ficar ociosa, para que o React já tenha
 * hidratado os componentes interativos (formulário, menu, modal) antes do teste agir.
 */
export async function gotoReady(page: Page, url: string) {
  await page.goto(url);
  await page.waitForLoadState("networkidle");
}
