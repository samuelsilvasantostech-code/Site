import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { gotoReady } from "./utils";

/** Regras WCAG 2.2 níveis A e AA. */
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function expectNoViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  const summary = results.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    nodes: v.nodes.map((n) => n.target.join(" ")),
  }));
  expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
}

async function setTheme(page: Page, theme: "dark" | "light") {
  await page.addInitScript((value) => window.localStorage.setItem("theme", value), theme);
}

test.describe("acessibilidade (axe)", () => {
  for (const theme of ["dark", "light"] as const) {
    test(`página inicial no tema ${theme === "dark" ? "escuro" : "claro"}`, async ({ page }) => {
      await setTheme(page, theme);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await gotoReady(page, "/");
      await expect(page.locator("html")).toHaveClass(new RegExp(theme));
      await expectNoViolations(page);
    });
  }

  test("modal de case aberto", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoReady(page, "/");
    await page.getByRole("button", { name: /Ver detalhes Disparo automatizado/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expectNoViolations(page);
  });

  test("formulário com erros de validação", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoReady(page, "/#contato");
    await page.getByRole("button", { name: "Enviar mensagem" }).click();
    await expect(page.getByText("Informe o seu nome.")).toBeVisible();
    await expectNoViolations(page);
  });

  test("página 404", async ({ page }) => {
    await gotoReady(page, "/pagina-que-nao-existe");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Esta página não existe");
    await expectNoViolations(page);
  });
});
