import { expect, test, type Page } from "@playwright/test";

import { gotoReady } from "./utils";

test.describe("página inicial", () => {
  test("segue o fluxo problema, solução, evidência, processo e contato", async ({ page }) => {
    await gotoReady(page, "/");
    await expect(
      page.getByRole("heading", { level: 1, name: /Sua empresa pode trabalhar melhor/ }),
    ).toBeVisible();
    for (const title of [
      "Problemas que resolvemos",
      "Soluções tecnológicas para sua operação",
      "Projetos e aplicações reais",
      "Como trabalhamos",
      "Vamos identificar onde a tecnologia pode melhorar sua operação?",
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
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Vamos conversar sobre o que sua empresa precisa melhorar?",
    );
  });

  test("CTA secundário leva à página de serviços", async ({ page }) => {
    await gotoReady(page, "/");
    await page.getByRole("link", { name: "Conhecer soluções" }).click();
    await expect(page).toHaveURL(/\/servicos$/);
  });

  test("mostra o aviso de origem dos projetos e nenhuma métrica não verificada", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    await expect(page.getByText(/Nem todos representam projetos contratados/)).toBeVisible();
    await expect(page.getByText("450–600")).toHaveCount(0);
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
    ["/privacidade", /^Aviso de Privacidade/],
  ];
  for (const [path, title] of pages) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("projeto mostra origem, fluxo e serviço relacionado, sem métricas não verificadas", async ({
  page,
}) => {
  await gotoReady(page, "/projetos");
  await expect(page.getByText(/Nem todos representam projetos contratados/)).toBeVisible();
  await page.getByRole("link", { name: /Régua de cobrança automatizada/ }).click();
  await expect(page).toHaveURL(/\/projetos\/regua-cobranca$/);
  const article = page.getByRole("article");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Régua de cobrança automatizada",
  );
  await expect(article.getByText("Experiência profissional do fundador")).toBeVisible();
  await expect(article.getByRole("heading", { name: "Fluxo da integração" })).toBeVisible();
  await expect(article.getByRole("heading", { name: "Resultado verificado" })).toHaveCount(0);
  await article.getByRole("link", { name: /Automação de Processos/ }).click();
  await expect(page).toHaveURL(/\/servicos#automacao$/);
});

test("navega entre projetos e volta para a lista", async ({ page }) => {
  await gotoReady(page, "/projetos/regua-cobranca");
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

test("dúvidas frequentes abrem e fecham pelo teclado", async ({ page }) => {
  await gotoReady(page, "/servicos");
  const question = page.getByRole("button", { name: "Como é definido o valor de um projeto?" });
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText(/enviamos uma proposta com escopo, prazo e investimento/),
  ).toBeVisible();
  await page.keyboard.press("Space");
  await expect(question).toHaveAttribute("aria-expanded", "false");
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
    await expect(page.getByLabel("Nome", { exact: true })).toHaveAttribute("aria-invalid", "true");
  });

  async function fillValidForm(page: Page) {
    await page.getByLabel("Nome", { exact: true }).fill("Maria Teste");
    await page.getByLabel("E-mail profissional").fill("Maria@Empresa.com.br");
    await page.getByLabel("O que sua empresa precisa?").selectOption("Integração de sistemas");
    await page
      .getByLabel("Conte brevemente sobre o desafio")
      .fill("Queremos ligar o CRM ao ERP para não recadastrar vendas.");
    await page.getByRole("checkbox").check();
  }

  test("envio rápido demais pede nova tentativa, sem fingir sucesso", async ({ page }) => {
    await gotoReady(page, "/contato");
    await fillValidForm(page);
    await page.getByRole("button", { name: "Enviar solicitação" }).click();
    await expect(page.getByRole("status")).toContainText(/aguarde alguns segundos/);
    await expect(page.getByRole("status")).not.toContainText(/enviada com sucesso/);
  });

  test("sem o envio configurado, avisa e mantém os dados preenchidos", async ({ page }) => {
    await gotoReady(page, "/contato");
    await fillValidForm(page);
    // O servidor recusa envios feitos menos de 3 s depois de abrir o formulário.
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: "Enviar solicitação" }).click();

    await expect(page.getByRole("status")).toContainText(/ainda não está ativo/);
    await expect(page.getByRole("status")).not.toContainText(/enviada com sucesso/);
    await expect(page.getByLabel("Nome", { exact: true })).toHaveValue("Maria Teste");
  });
});

test("copiar e-mail confirma com um aviso", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await gotoReady(page, "/contato");
  await page.getByRole("button", { name: "Copiar e-mail" }).click();
  await expect(page.getByText("E-mail copiado")).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "samuelsilvasantos.tech@gmail.com",
  );
});

test("links de contato usam o protocolo certo", async ({ page }) => {
  await gotoReady(page, "/contato");
  const main = page.getByRole("main");
  await expect(main.locator('a[href^="mailto:samuelsilvasantos.tech@gmail.com"]')).toHaveCount(1);
  await expect(main.locator('a[href="tel:+5538997472560"]')).toHaveCount(1);
  await expect(main.locator('a[href^="https://wa.me/5538997472560?text="]').first()).toBeVisible();
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
