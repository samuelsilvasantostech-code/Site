# SSNEX — Technology & Business Solutions

Site corporativo da SSNEX, consultoria de tecnologia para pequenas e médias empresas: automação de processos, integração de sistemas e APIs, soluções com inteligência artificial e suporte tecnológico.

> _Your systems. More possibilities._

**Produção:** https://site-samuel-rosy.vercel.app (deploy automático a cada push na `main`).

## Páginas

| Rota               | Conteúdo                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| `/`                | Proposta de valor, problemas, serviços, como funciona, projetos, princípios e CTA                 |
| `/servicos`        | Cada serviço: problemas, entregas, o que está incluído e o que é à parte, mais dúvidas frequentes |
| `/projetos`        | Lista de projetos, com a origem identificada (cliente, fundador ou demonstração)                  |
| `/projetos/[slug]` | Objetivo, problema, abordagem, implementação, tecnologias e resultados verificáveis               |
| `/sobre`           | Abordagem da SSNEX, fundador, trajetória, princípios e plataformas                                |
| `/contato`         | Formulário de diagnóstico e canais diretos                                                        |
| `/privacidade`     | Política de Privacidade (LGPD), alinhada ao que o site realmente coleta                           |
| `/curriculo`       | Currículo do fundador, imprimível em PDF (fora do índice de busca)                                |

Endereços antigos `/cases/*` redirecionam para `/projetos/*`.

## Stack

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript strict · Tailwind CSS 4 · shadcn/ui · GSAP · react-hook-form + zod · Lucide · Vercel Analytics e Speed Insights · Playwright + axe-core · ESLint, Prettier, Husky, lint-staged, commitlint.

## Rodar localmente

Requisitos: Node.js 20.9+ (recomendado 22, ver `.nvmrc`).

```bash
npm install                  # dependências + git hooks
cp .env.example .env.local   # preencha as variáveis
npm run dev                  # http://localhost:3000
```

| Comando            | O que faz                                   |
| ------------------ | ------------------------------------------- |
| `npm run dev`      | Servidor de desenvolvimento                 |
| `npm run build`    | Build de produção                           |
| `npm run start`    | Serve o build                               |
| `npm run check`    | Tipos + lint + formatação                   |
| `npm run format`   | Formata o projeto com Prettier              |
| `npm run test:e2e` | Testes Playwright e de acessibilidade (axe) |

Na primeira vez, instale o navegador dos testes: `npx playwright install chromium`.

## Configuração

### Variáveis de ambiente (`.env.example`)

| Variável               | Para quê                                                    | Obrigatória              |
| ---------------------- | ----------------------------------------------------------- | ------------------------ |
| `NEXT_PUBLIC_SITE_URL` | canonical, Open Graph, sitemap, robots e dados estruturados | Em produção              |
| `FORMSPREE_ENDPOINT`   | Entrega do formulário por e-mail (só no servidor)           | Para o formulário enviar |

Sem `FORMSPREE_ENDPOINT`, o formulário **não finge que enviou**: avisa que o envio não está ativo e mostra o e-mail.

### Ativar o formulário

1. Crie uma conta em https://formspree.io e um formulário (**New Form**) com o e-mail que vai receber as solicitações.
2. Copie o endpoint (`https://formspree.io/f/xxxx`).
3. Na Vercel: **Project → Settings → Environment Variables** → `FORMSPREE_ENDPOINT` = endpoint → **Redeploy**.
4. Envie uma solicitação de teste. No primeiro envio, o Formspree pede para confirmar o e-mail.

Proteções do formulário: validação no navegador e no servidor (mesmo schema zod), aceite LGPD obrigatório, campo honeypot e descarte de envios feitos em menos de 3 segundos. Nenhum dado é armazenado pelo site.

### Métricas

Ative **Analytics** e **Speed Insights** no painel da Vercel. O site registra os eventos `contact_form_start`, `contact_form_submit`, `whatsapp_click` e `service_cta_click` (`lib/analytics.ts`); eventos personalizados aparecem no painel em planos que os suportam. Não há cookies de rastreamento.

## Editar o conteúdo

Todo o texto fica em [`content/data.ts`](content/data.ts), organizado por página. Os tipos acusam campo faltando no editor e no build.

- **Contatos:** objeto `links` (e-mail, telefone, WhatsApp, LinkedIn, Instagram). `whatsapp: ""` oculta todos os botões de WhatsApp.
- **Serviços:** `services.items`, com problemas, entregas, incluído e à parte.
- **Projetos:** `projects.items`. Cada projeto tem `kind`:
  - `cliente`: projeto da SSNEX, **só com autorização do cliente**;
  - `fundador`: experiência profissional anterior do fundador, cliente não identificado;
  - `demonstracao`: protótipo com dados fictícios.
  - Em `metrics`, use **apenas números verificáveis**.
- **Fundador:** `about.founderParagraphs`, `experience` e `profile`. Foto opcional em `about.photo`.
- **Privacidade:** `privacy.sections`. Atualize sempre que mudar a forma de coletar dados.

**Regras de conteúdo:** tudo em português do Brasil; a marca SSNEX e a assinatura em inglês não são traduzidas; sem clientes, depoimentos, números, certificações ou endereço inventados.

## Estrutura

```
app/
├── (site)/              Páginas com header e rodapé compartilhados
│   ├── page.tsx         Home
│   ├── servicos/ projetos/ sobre/ contato/ privacidade/ curriculo/
│   └── layout.tsx
├── actions/contact.ts   Server Action do formulário
├── layout.tsx           Fontes (Montserrat e Inter), metadata, tema, métricas
├── globals.css          Tokens da marca, temas e utilitários
├── opengraph-image.tsx  Imagem de preview gerada a partir da marca
└── sitemap.ts robots.ts manifest.ts not-found.tsx
components/
├── ui/                  Primitives do shadcn (não editar à mão)
├── sections/            Seções das páginas
├── shared/              Cards de serviço e projeto, CTAs, seção, links rastreados
├── layout/              Header, rodapé, logo, menu de comandos, tema
└── motion/              GSAP (fade-in no scroll, movimento reduzido)
content/data.ts          Todo o conteúdo
lib/                     Constantes, schema zod, analytics, utilitários
tests/                   Playwright + axe
```

## Deploy

O projeto `site-samuel` na Vercel está ligado ao repositório: cada push na `main` publica em produção, e pull requests ganham um link de prévia. Cabeçalhos de segurança e redirecionamentos ficam em `next.config.ts`.

**Domínio próprio:** em **Project → Settings → Domains**, adicione o domínio e siga os registros DNS indicados. Depois, atualize `NEXT_PUBLIC_SITE_URL`.

## Convenções

- Commits em [Conventional Commits](https://www.conventionalcommits.org/pt-br/), validados pelo commitlint.
- O pre-commit roda ESLint e Prettier nos arquivos alterados.
- Imports com o alias `@/`.
- Toda animação respeita `prefers-reduced-motion`; o CI falha se o axe encontrar violações de acessibilidade.
