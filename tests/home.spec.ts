import { expect, test } from "@playwright/test";

import { gotoReady } from "./utils";

test.describe("página inicial", () => {
  test("comunica a proposta e mostra as seções da estratégia", async ({ page }) => {
    await gotoReady(page, "/");
    await expect(
      page.getByRole("heading", { level: 1, name: /Sua empresa pode trabalhar melhor/ }),
    ).toBeVisible();
    for (const title of [
      "Tecnologia para resolver problemas reais.",
      "Soluções tecnológicas para sua operação.",
      "Do problema à solução, com clareza.",
      "Tecnologia aplicada na prática.",
      "Soluções pensadas para funcionar na prática.",
      "Vamos identificar oportunidades na sua operação?",
    ]) {
      await expect(page.getByRole("heading", { level: 2, name: title })).toBeAttached();
    }
  });

  test("CTA principal leva ao formulário de contato", async ({ page }) => {
    await gotoReady(page, "/");
    await page
      .getByRole("main")
      .getByRole("link", { name: /Solicitar diagnóstico/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/contato$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Solicite um diagnóstico.");
  });

  test("tema escuro é o padrão e o botão alterna para o claro", async ({ page }) => {
    await gotoReady(page, "/");
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);
    await page.getByRole("button", { name: "Alternar tema claro e escuro" }).click();
    await expect(html).toHaveClass(/light/);
  });
});

test("todas as páginas abrem com título próprio", async ({ page }) => {
  const pages: [string, RegExp][] = [
    ["/servicos", /^Serviços/],
    ["/projetos", /^Projetos/],
    ["/sobre", /^Sobre a SSNEX/],
    ["/contato", /^Contato/],
    ["/privacidade", /^Política de Privacidade/],
  ];
  for (const [path, title] of pages) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("projeto abre em página própria com identificação da origem", async ({ page }) => {
  await gotoReady(page, "/projetos");
  await page.getByRole("link", { name: /Régua de cobrança inteligente/ }).click();
  await expect(page).toHaveURL(/\/projetos\/regua-cobranca$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Régua de cobrança inteligente");
  await expect(page.getByRole("article").getByText("Experiência do fundador")).toBeVisible();
  await page.getByRole("link", { name: /Próximo projeto/ }).click();
  await expect(page).toHaveURL(/\/projetos\/vendas-automaticas$/);
  await page.getByRole("main").getByRole("link", { name: "Todos os projetos" }).click();
  await expect(page).toHaveURL(/\/projetos$/);
});

test("endereço antigo de case redireciona para o projeto", async ({ page }) => {
  await page.goto("/cases/regua-cobranca");
  await expect(page).toHaveURL(/\/projetos\/regua-cobranca$/);
});

test("menu de comandos abre com Ctrl+K e leva a um projeto", async ({ page }) => {
  await gotoReady(page, "/");
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", { name: "Menu de comandos" });
  await expect(dialog).toBeVisible();
  await dialog.getByPlaceholder(/Digite um comando/).fill("Cielo");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projetos\/integracao-cielo$/);
});

test("dúvidas frequentes abrem e fecham", async ({ page }) => {
  await gotoReady(page, "/servicos");
  const question = page.getByRole("button", { name: "Como é definido o valor de um projeto?" });
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText(/enviamos uma proposta com escopo, prazo e investimento/),
  ).toBeVisible();
});

test.describe("formulário de contato", () => {
  test("valida os campos obrigatórios em português", async ({ page }) => {
    await gotoReady(page, "/contato");
    await page.getByLabel("E-mail profissional").fill("email-invalido");
    await page.getByLabel("Conte brevemente sobre o desafio").fill("Oi");
    await page.getByRole("button", { name: "Enviar solicitação" }).click();

    await expect(page.getByText("Informe o seu nome.")).toBeVisible();
    await expect(page.getByText(/Informe um e-mail válido/)).toBeVisible();
    await expect(page.getByText("Escolha o que a sua empresa precisa.")).toBeVisible();
    await expect(page.getByText(/A mensagem precisa ter pelo menos 10 caracteres/)).toBeVisible();
    await expect(page.getByText(/é preciso concordar com o uso dos dados/)).toBeVisible();
    await expect(page.getByLabel("Seu nome")).toHaveAttribute("aria-invalid", "true");
  });

  test("sem o envio configurado, avisa em vez de fingir que enviou", async ({ page }) => {
    await gotoReady(page, "/contato");
    await page.getByLabel("Seu nome").fill("Maria Teste");
    await page.getByLabel("E-mail profissional").fill("maria@empresa.com.br");
    await page.getByLabel("O que sua empresa precisa?").selectOption("Automação de processos");
    await page
      .getByLabel("Conte brevemente sobre o desafio")
      .fill("Copiamos pedidos do e-commerce para o ERP à mão todos os dias.");
    await page.getByRole("checkbox").check();
    // O servidor descarta envios feitos menos de 3 s depois de abrir o formulário.
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: "Enviar solicitação" }).click();

    await expect(page.getByRole("status")).toContainText(/ainda não está ativo/);
    await expect(page.getByRole("status")).not.toContainText(/Solicitação enviada/);
  });
});

test("copiar e-mail confirma com um aviso", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await gotoReady(page, "/contato");
  await page.getByRole("button", { name: "Copiar e-mail" }).click();
  await expect(page.getByText("E-mail copiado")).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("@");
});

test("menu do celular abre e leva à página", async ({ page, isMobile }) => {
  test.skip(!isMobile, "o menu sanduíche só existe no celular");
  await gotoReady(page, "/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Projetos" })
    .click();
  await expect(page).toHaveURL(/\/projetos$/);
});

test("currículo tem o botão de imprimir", async ({ page }) => {
  await gotoReady(page, "/curriculo");
  await expect(page.getByRole("heading", { level: 1, name: "Samuel Silva Santos" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Imprimir ou salvar em PDF" })).toBeVisible();
});
