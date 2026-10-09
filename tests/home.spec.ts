import { expect, test } from "@playwright/test";
import { gotoReady } from "./utils";

test.describe("página inicial", () => {
  test("renderiza todas as seções no servidor", async ({ page }) => {
    await gotoReady(page, "/");
    await expect(
      page.getByRole("heading", { level: 1, name: "Samuel Silva Santos" }),
    ).toBeVisible();
    for (const title of [
      "Do atendimento para a tecnologia",
      "O que eu faço",
      "Integrações já realizadas",
      "Cases",
      "Experiência",
      "Vamos conversar",
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

  test("modal de case abre, fecha com Esc e devolve o foco", async ({ page }) => {
    await gotoReady(page, "/");
    const trigger = page.getByRole("button", { name: /Ver detalhes Régua de cobrança/ });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Régua de cobrança inteligente" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
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

test("menu móvel abre e fecha", async ({ page, isMobile }) => {
  test.skip(!isMobile, "menu hambúrguer só existe no celular");
  await gotoReady(page, "/");
  const toggle = page.locator("#menu-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation", { name: "Principal" })
    .getByRole("link", { name: "Cases" })
    .click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
