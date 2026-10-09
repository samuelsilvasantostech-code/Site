import { expect, test } from "@playwright/test";

import { gotoReady } from "./utils";

test.describe("página inicial", () => {
  test("renderiza a identidade e todas as seções", async ({ page }) => {
    await gotoReady(page, "/");
    await expect(
      page.getByRole("heading", { level: 1, name: /Integrações que fazem/ }),
    ).toBeVisible();
    for (const title of [
      "Serviços",
      "Integração que aguenta a segunda-feira às 8h",
      "Como trabalho",
      "Cases",
      "Do atendimento para a tecnologia",
      "Dúvidas frequentes",
      "Vamos tirar a sua operação da planilha?",
    ]) {
      await expect(page.getByRole("heading", { level: 2, name: title })).toBeAttached();
    }
  });

  test("tema escuro é o padrão e o botão alterna para o claro", async ({ page }) => {
    await gotoReady(page, "/");
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);
    await page.getByRole("button", { name: "Alternar tema claro e escuro" }).click();
    await expect(html).toHaveClass(/light/);
  });

  test("copiar e-mail confirma com um aviso", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await gotoReady(page, "/");
    await page.getByRole("button", { name: "Copiar e-mail" }).first().click();
    await expect(page.getByText("E-mail copiado")).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("@");
  });

  test("case abre em página própria e volta para a lista", async ({ page }) => {
    await gotoReady(page, "/");
    await page.getByRole("link", { name: /Régua de cobrança inteligente/ }).click();
    await expect(page).toHaveURL(/\/cases\/regua-cobranca$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Régua de cobrança inteligente",
    );
    await page.getByRole("link", { name: /Próximo case/ }).click();
    await expect(page).toHaveURL(/\/cases\/vendas-automaticas$/);
    await page.getByRole("link", { name: "Todos os cases" }).click();
    await expect(page).toHaveURL(/\/#cases$/);
  });

  test("menu de comandos abre com Ctrl+K e leva a um case", async ({ page }) => {
    await gotoReady(page, "/");
    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "Menu de comandos" });
    await expect(dialog).toBeVisible();
    await dialog.getByPlaceholder(/Digite um comando/).fill("Cielo");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/cases\/integracao-cielo$/);
  });

  test("formulário valida os campos em português", async ({ page }) => {
    await gotoReady(page, "/#contato");
    await page.getByLabel("E-mail", { exact: true }).fill("email-invalido");
    await page.getByLabel("Mensagem").fill("Oi");
    await page.getByRole("button", { name: "Enviar mensagem" }).click();

    await expect(page.getByText("Informe o seu nome.")).toBeVisible();
    await expect(
      page.getByText("Informe um e-mail válido, por exemplo nome@empresa.com."),
    ).toBeVisible();
    await expect(page.getByText("A mensagem precisa ter pelo menos 10 caracteres.")).toBeVisible();
    await expect(page.getByLabel("Nome")).toHaveAttribute("aria-invalid", "true");
  });
});

test("dúvidas frequentes abrem e fecham", async ({ page }) => {
  await gotoReady(page, "/#faq");
  const question = page.getByRole("button", { name: "Como começamos?" });
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/Eu respondo em até dois dias úteis/)).toBeVisible();
});

test("menu do celular abre e leva à seção", async ({ page, isMobile }) => {
  test.skip(!isMobile, "o menu sanduíche só existe no celular");
  await gotoReady(page, "/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("navigation", { name: "Seções da página" })
    .getByRole("link", { name: "Cases" })
    .click();
  await expect(page).toHaveURL(/#cases$/);
  await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("currículo tem o botão de imprimir", async ({ page }) => {
  await gotoReady(page, "/curriculo");
  await expect(page.getByRole("heading", { level: 1, name: "Samuel Silva Santos" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Imprimir ou salvar em PDF" })).toBeVisible();
});
