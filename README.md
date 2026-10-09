# SSNEX Technology Consulting

Site pessoal one-page: integrações, automação e CRM omnichannel.

**Identidade visual:** SSNEX ("Your systems. More possibilities."). Grafite #0B0F14 com faixas brancas, azul #2563EB, ciano #06B6D4 e cinza #E5E7EB; Montserrat nos títulos e Inter no texto. O símbolo é um SVG em `components/layout/logo.tsx`, reaproveitado nos ícones e na imagem de preview.

**Seções:** hero com painel do fluxo, faixa de plataformas e números, serviços, diferenciais (bento grid), como trabalho, cases, sobre, dúvidas (acordeão) e contato.

**Funções:** menu de comandos (Ctrl/⌘ + K), copiar e-mail com aviso, WhatsApp com mensagem pronta, página própria para cada case e currículo imprimível em `/curriculo`.

## Stack

| Área       | Ferramenta                                                             |
| ---------- | ---------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Cache Components), React 19, TypeScript strict |
| Estilo     | Tailwind CSS 4, shadcn/ui (Radix), next-themes (escuro por padrão)     |
| Animação   | GSAP (ScrollTrigger, MotionPath) com `@gsap/react`                     |
| Formulário | react-hook-form + zod + Server Action → Formspree                      |
| Métricas   | Vercel Analytics e Speed Insights                                      |
| Qualidade  | ESLint, Prettier (+ plugin Tailwind), Husky, lint-staged, commitlint   |
| Testes     | Playwright + axe-core (WCAG 2.2 AA)                                    |
| CI         | GitHub Actions (`.github/workflows/ci.yml`)                            |

## Começando

Requisitos: Node.js 20.9+ (recomendado 22, ver `.nvmrc`) e npm.

```bash
npm install            # instala dependências e ativa os git hooks
cp .env.example .env.local   # preencha as variáveis
npm run dev            # http://localhost:3000
```

### Variáveis de ambiente

Documentadas em [`.env.example`](.env.example):

| Variável               | Onde é usada                                    | Obrigatória              |
| ---------------------- | ----------------------------------------------- | ------------------------ |
| `NEXT_PUBLIC_SITE_URL` | canonical, Open Graph, sitemap, robots, JSON-LD | Em produção              |
| `FORMSPREE_ENDPOINT`   | Server Action do contato (só no servidor)       | Para o formulário enviar |

Sem `FORMSPREE_ENDPOINT`, o formulário avisa que não está configurado e oferece o e-mail.

## Scripts

| Comando               | O que faz                                              |
| --------------------- | ------------------------------------------------------ |
| `npm run dev`         | Servidor de desenvolvimento                            |
| `npm run build`       | Build de produção                                      |
| `npm run start`       | Serve o build                                          |
| `npm run lint`        | ESLint (`lint:fix` corrige o que der)                  |
| `npm run format`      | Prettier em todo o projeto (`format:check` só confere) |
| `npm run typecheck`   | TypeScript sem emitir arquivos                         |
| `npm run check`       | typecheck + lint + format:check                        |
| `npm run test:e2e`    | Playwright + axe (sobe o servidor sozinho)             |
| `npm run test:e2e:ui` | Playwright em modo interativo                          |

Na primeira vez, instale o navegador dos testes: `npx playwright install chromium`.

## Estrutura

```
app/                    Rotas e arquivos especiais do Next.js
├── layout.tsx          Layout raiz: fontes, metadata, tema, Analytics, Speed Insights
├── page.tsx            Página inicial + JSON-LD (schema.org/Person)
├── cases/[slug]/       Página de cada case (gerada no build a partir de content/data.ts)
├── curriculo/          Currículo imprimível (Imprimir → Salvar como PDF)
├── not-found.tsx       Página 404
├── opengraph-image.tsx Imagem de preview gerada a partir do conteúdo
├── sitemap.ts, robots.ts, manifest.ts
├── actions/contact.ts  Server Action do formulário
├── globals.css         Tokens de cor, tema claro/escuro e estilos de impressão
├── fonts/              og/ guarda os .ttf da Plus Jakarta Sans usados na imagem OG (a fonte do site vem do next/font)
└── icon.png, apple-icon.png, favicon.ico
components/
├── ui/                 Primitives do shadcn — NÃO editar à mão (use `npx shadcn add`)
├── sections/           Hero, Integrations (plataformas e números), Services, Differentiators, Process, Cases, About + Experience, Faq, Contact
├── motion/             GSAP: registro de plugins, fade-in no scroll, seção ativa e movimento reduzido
├── layout/             Header com vidro, menu de comandos, copiar e-mail, links sociais, tema, rodapé
└── shared/             Peças reutilizadas pelas seções (seção, tags, fluxo de dados, métricas)
content/data.ts         TODO o conteúdo do site (textos, links, cases), tipado
lib/                    utils, constantes e schemas zod
tests/                  Testes Playwright e de acessibilidade (axe)
```

## Editar o conteúdo

Tudo fica em [`content/data.ts`](content/data.ts). Os tipos avisam no editor (e no build) se faltar algum campo.

**Antes de publicar, troque os dados de exemplo** (procure por `TODO`):

- `links` → e-mail, telefone, WhatsApp, LinkedIn, Instagram
- `experience.jobs[0].period` → período na AeC
- Revise o texto de **Problema** de cada case

### Adicionar um case

Copie um item de `cases.items` e ajuste. A ordem no arquivo é a ordem no site.

```ts
{
  slug: "nome-curto-sem-espacos",
  title: "Título do projeto",
  flow: ["Origem", "n8n", "Destino"],     // mini fluxo do card (2 a 4 itens)
  summary: "Uma frase sobre o resultado.",
  problem: "Qual era a dor do cliente.",
  solution: "O que foi construído.",
  stepsOrdered: false,                     // true numera os passos
  steps: ["Passo 1", "Passo 2"],
  metrics: [{ value: "300", label: "leads por mês" }], // pode ser []
  stack: ["n8n", "API REST"],
},
```

### Outras edições comuns

- **Foto no "Sobre":** salve `public/samuel.webp` (600×600) e preencha `about.photo: "/samuel.webp"`.
- **Logos nas integrações:** adicione `logo: "/logos/omie.svg"` ao item (arquivo em `public/logos/`). Use apenas logos que você tenha permissão de usar.
- **Cores:** tokens no topo de `app/globals.css`. Seções com `tone="invert"` usam o tema oposto (faixas brancas no tema escuro).
- **Números de impacto:** `impact` em `content/data.ts`. Use só dados reais.
- **Componentes do shadcn:** `npx shadcn@latest add <componente>`.

## Convenções

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/pt-br/), validados pelo commitlint no hook `commit-msg`.
  Ex.: `feat: adiciona case de BI`, `fix(contato): corrige validação do e-mail`, `docs: atualiza README`.
- **Pre-commit:** lint-staged roda ESLint e Prettier só nos arquivos alterados.
- **Imports:** sempre com o alias `@/` a partir da raiz.
- **Movimento:** toda animação respeita `prefers-reduced-motion` (via `gsap.matchMedia`).
- **Acessibilidade:** HTML semântico, foco visível, alvos de toque de 44px, contraste AA nos dois temas. O CI falha se o axe encontrar violações.

## Deploy (Vercel)

1. Suba o repositório para o GitHub.
2. Na Vercel: **Add New → Project** → importe o repositório (o preset Next.js é detectado sozinho).
3. Em **Settings → Environment Variables**, defina `NEXT_PUBLIC_SITE_URL` e `FORMSPREE_ENDPOINT`.
4. Em **Analytics** e **Speed Insights**, ative os dois (os componentes já estão no layout).
5. A cada push na `main`, a Vercel publica de novo. Cabeçalhos de segurança ficam em `next.config.ts`.

Para o LinkedIn atualizar o preview de um link já compartilhado: https://www.linkedin.com/post-inspector/.

### Domínio próprio

Em **Project → Settings → Domains**, adicione o domínio e o `www`. A Vercel mostra os registros DNS exatos (normalmente `A @ 76.76.21.21` e `CNAME www cname.vercel-dns.com`). No Registro.br, crie-os em **DNS → Editar zona**. Depois, atualize `NEXT_PUBLIC_SITE_URL`.
