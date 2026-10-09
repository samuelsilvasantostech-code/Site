/**
 * Todo o conteúdo do site.
 *
 * Edite textos, links e cases aqui. Os componentes em `components/sections/`
 * apenas leem este arquivo, então não é preciso mexer neles para atualizar o site.
 * Os tipos garantem que um campo esquecido apareça como erro no editor e no build.
 */

export type NavItem = { id: SectionId; label: string };

export type SectionId = "sobre" | "servicos" | "integracoes" | "cases" | "experiencia" | "contato";

export type Metric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  /** Mini fluxo exibido no card (2 a 4 itens). */
  flow: string[];
  summary: string;
  problem: string;
  solution: string;
  /** `true` exibe os passos numerados (use quando forem uma sequência). */
  stepsOrdered?: boolean;
  steps: string[];
  metrics: Metric[];
  stack: string[];
};

export type IntegrationItem = { name: string; note: string; logo?: string };

export type IntegrationGroup =
  { name: string; items: IntegrationItem[] } | { name: string; chips: string[] };

export type ContactChannel = { key: keyof typeof links; label: string };

/* ------------------------------------------------------------------ */
/* Links e contatos                                                    */
/* ------------------------------------------------------------------ */

export const links = {
  email: "seu@email.com", // TODO: seu e-mail
  linkedin: "https://www.linkedin.com/in/seu-perfil", // TODO: URL do LinkedIn
  github: "https://github.com/seu-usuario", // TODO: URL do GitHub
  whatsapp: "https://wa.me/5538999999999", // TODO: wa.me/55 + DDD + número
} as const;

/* ------------------------------------------------------------------ */
/* Identidade e SEO                                                    */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Samuel Silva Santos",
  shortName: "Samuel Santos",
  givenName: "Samuel",
  familyName: "Silva Santos",
  role: "Analista de Tecnologia | Integrações, Automação e CRM Omnichannel",
  city: "Montes Claros",
  region: "MG",
  country: "BR",
  worksFor: "Kentro Sistemas",
  alumniOf: "Universidade Cruzeiro do Sul",
};

export const seo = {
  title: `${profile.name} | Integrações, Automação e CRM Omnichannel`,
  description:
    "Analista de Tecnologia em Montes Claros, MG. Integro ERP, CRM, meios de pagamento e WhatsApp com n8n, Make e APIs REST, e implanto atendimento omnichannel. Disponível para trabalho remoto.",
  shareDescription:
    "Integro ERP, CRM, meios de pagamento e WhatsApp para que cobranças, vendas e atendimentos rodem sozinhos.",
  ogAlt: `${profile.name}, Analista de Tecnologia. Diagrama ligando ERP, n8n e WhatsApp.`,
  personDescription:
    "Analista de Implantação especializado em integração entre sistemas (ERP, CRM, bancos e meios de pagamento), automação com n8n e Make, APIs REST e atendimento omnichannel.",
  knowsAbout: [
    "Integração de sistemas",
    "APIs REST",
    "Webhooks",
    "n8n",
    "Make",
    "CRM",
    "Atendimento omnichannel",
    "WhatsApp",
    "BigQuery",
    "Power BI",
    "Supabase",
    "SQL",
    "Python",
    "Node.js",
  ],
};

/* ------------------------------------------------------------------ */
/* Textos de interface                                                 */
/* ------------------------------------------------------------------ */

export const ui = {
  skip: "Pular para o conteúdo",
  menu: "Abrir menu",
  closeMenu: "Fechar menu",
  toggleTheme: "Alternar tema claro e escuro",
  viewDetails: "Ver detalhes",
  close: "Fechar",
  problem: "Problema",
  solution: "Solução",
  howItWorks: "Como funciona",
  stack: "Tecnologias",
  backToTop: "Voltar ao topo",
  mainNav: "Principal",
  diagramLabel:
    "Diagrama animado: dados saem do ERP e do meio de pagamento, passam por um workflow no n8n e chegam ao WhatsApp e ao CRM.",
};

export const nav: NavItem[] = [
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "O que eu faço" },
  { id: "integracoes", label: "Integrações" },
  { id: "cases", label: "Cases" },
  { id: "experiencia", label: "Experiência" },
  { id: "contato", label: "Contato" },
];

/* ------------------------------------------------------------------ */
/* Seções                                                              */
/* ------------------------------------------------------------------ */

export const hero = {
  name: profile.name,
  role: profile.role,
  value:
    "Conecto ERP, CRM, meios de pagamento e WhatsApp para que cobranças, vendas e atendimentos rodem sozinhos, sem planilha no meio e sem retrabalho.",
  ctaPrimary: "Ver projetos",
  ctaSecondary: "Falar comigo",
  status: "Analista de Implantação na Kentro Sistemas. Disponível para trabalho remoto.",
  diagram: {
    sources: [
      { title: "ERP", detail: "Conta Azul / Omie" },
      { title: "Pagamentos", detail: "Cielo" },
    ],
    hub: { title: "n8n", detail: "workflow" },
    targets: [
      { title: "WhatsApp", detail: "cobrança enviada" },
      { title: "CRM", detail: "venda criada" },
    ],
    log: [
      { time: "07:00:01", text: "trigger agendado", status: "ok" },
      { time: "07:00:02", text: "GET /cobrancas?pagina=1", status: "200" },
      { time: "07:00:04", text: "lote 1/12, 50 itens", status: "ok" },
      { time: "07:00:05", text: "rate limit: aguardando 1s", status: "wait", warn: true },
      { time: "07:00:06", text: "POST /mensagens", status: "201" },
      { time: "07:00:07", text: "webhook venda.fechada", status: "200" },
      { time: "07:00:08", text: "POST /vendas", status: "201" },
    ],
  },
};

export const about = {
  title: "Do atendimento para a tecnologia",
  paragraphs: [
    "Comecei no atendimento. Foram dois anos na operação da AeC Contact Center, vendo de perto o que acontece quando um sistema não conversa com o outro: cliente esperando, informação digitada duas vezes, fila que não anda.",
    "Hoje trabalho do outro lado. Como Analista de Implantação na Kentro Sistemas, implanto plataformas de atendimento omnichannel e construo as integrações que ligam ERP, CRM, bancos e WhatsApp.",
    "A passagem pela operação mudou a forma como eu projeto. Antes de escolher a ferramenta, quero saber quem vai usar o fluxo às 8h de uma segunda-feira e o que acontece quando ele falha.",
  ],
  /** Foto opcional em `public/` (ex.: "/samuel.webp", 600×600). `null` oculta. */
  photo: null as string | null,
  photoAlt: `Foto de ${profile.name}`,
  facts: [
    { term: "Hoje", value: "Analista de Implantação, Kentro Sistemas" },
    { term: "Base", value: "Montes Claros, MG. Trabalho remoto" },
    { term: "Formação", value: "Análise e Desenvolvimento de Sistemas, em andamento" },
  ],
};

export const services = {
  title: "O que eu faço",
  intro:
    "Cinco frentes que se complementam: a integração só gera resultado quando o processo e as pessoas acompanham.",
  items: [
    {
      title: "Integrações & APIs",
      text: "Conecto ERPs, CRMs, bancos e meios de pagamento por API REST e webhooks, com autenticação, paginação e tratamento de erro desde o primeiro dia.",
      tags: ["REST", "Webhooks", "OAuth 2.0"],
    },
    {
      title: "Automação",
      text: "Transformo tarefas repetitivas em workflows no n8n e no Make: cobranças, criação de vendas, sincronização de cadastros. Com logs e reprocessamento quando algo falha.",
      tags: ["n8n", "Make", "Agendamentos"],
    },
    {
      title: "Omnichannel & CRM",
      text: "Organizo WhatsApp, chat e e-mail em uma só plataforma, com filas, departamentos e roteamento, integrada ao CRM para o atendente ver o histórico completo.",
      tags: ["WhatsApp", "Chat", "E-mail"],
    },
    {
      title: "Dados & BI",
      text: "Levo dados de atendimento, CRM, leads e mídia para o BigQuery e entrego dashboards no Power BI que a gestão consegue usar para decidir.",
      tags: ["BigQuery", "SQL", "Power BI"],
    },
    {
      title: "Implantação",
      text: "Conduzo a implantação do levantamento ao go-live: mapeamento de processos, configuração, treinamento da equipe e acompanhamento depois da entrada.",
      tags: ["Processos", "Treinamento", "Go-live"],
    },
  ],
};

export const integrations: { title: string; intro: string; groups: IntegrationGroup[] } = {
  title: "Integrações já realizadas",
  intro:
    "Sistemas que já conectei em projetos reais. Cada um tem a sua autenticação, os seus limites de API e as suas armadilhas.",
  groups: [
    {
      name: "ERPs",
      items: [
        { name: "Conta Azul", note: "Cobranças, vendas avulsas e recorrentes" },
        { name: "Omie", note: "Sincronização com a plataforma de atendimento" },
      ],
    },
    {
      name: "Pagamentos e bancos",
      items: [{ name: "Cielo", note: "Informações de vendas e pagamentos via API" }],
    },
    {
      name: "Atendimento e CRM",
      items: [
        { name: "Kentro / atenderbem", note: "Plataforma omnichannel" },
        { name: "WhatsApp", note: "Envio de cobranças e notificações" },
        { name: "Facebook Lead Ads", note: "Leads em tempo real no CRM" },
      ],
    },
    {
      name: "Dados e infra",
      items: [
        { name: "Supabase", note: "PostgREST como camada de estado" },
        { name: "BigQuery", note: "Base analítica de atendimento e mídia" },
        { name: "Power BI", note: "Dashboards de gestão" },
      ],
    },
    {
      name: "Automação e dev",
      chips: [
        "n8n",
        "Make",
        "Webhooks",
        "APIs REST",
        "Node.js",
        "Python",
        "SQL",
        "Postman",
        "Git/GitHub",
      ],
    },
  ],
};

export const cases: { title: string; intro: string; items: CaseStudy[] } = {
  title: "Cases",
  intro: "Projetos entregues em produção. Os nomes dos clientes foram omitidos.",
  items: [
    {
      slug: "disparo-boletos",
      title: "Disparo automatizado de boletos",
      flow: ["Conta Azul", "n8n", "WhatsApp"],
      summary:
        "O ERP gera as cobranças e o WhatsApp entrega, sem ninguém copiar boleto por boleto.",
      problem:
        "O financeiro enviava os boletos um a um pelo WhatsApp, a partir do ERP. Com centenas de cobranças por mês, o envio atrasava e erros de digitação geravam retrabalho.",
      solution:
        "Workflow no n8n que consulta as cobranças no Conta Azul, monta a mensagem com o boleto e envia pelo WhatsApp em duas execuções diárias.",
      steps: [
        "Consulta paginada às cobranças do ERP, sem perder registros entre páginas",
        "Processamento em lotes, com pausas para respeitar o rate limit das APIs",
        "Envio da mensagem com o boleto e registro do resultado de cada disparo",
        "Duas execuções agendadas por dia",
      ],
      metrics: [
        { value: "450–600", label: "cobranças por mês" },
        { value: "2", label: "execuções diárias" },
      ],
      stack: ["n8n", "API Conta Azul", "WhatsApp", "JavaScript"],
    },
    {
      slug: "regua-cobranca",
      title: "Régua de cobrança inteligente",
      flow: ["ERP", "n8n", "Supabase", "WhatsApp"],
      summary: "Cinco workflows coordenados decidem quem recebe qual mensagem, e quando.",
      problem:
        "Cobrar no dia certo, com a mensagem certa, exige saber o estado de cada cobrança. Sem guardar esse estado, cada execução recomeçava do zero e o risco de mensagem duplicada era alto.",
      solution:
        "Arquitetura com cinco workflows independentes no n8n, cada um com uma responsabilidade, e o Supabase guardando o estado entre as execuções.",
      stepsOrdered: true,
      steps: [
        "Gestão de tokens OAuth: renova o acesso ao ERP antes de expirar",
        "Sincronização incremental: traz só o que mudou desde a última execução",
        "Resolução de cobranças: identifica o que está pago, em aberto ou vencido",
        "Motor de regras: decide quem recebe qual mensagem e em que momento",
        "Envio em lote: dispara as mensagens e grava o resultado no Supabase",
      ],
      metrics: [{ value: "5", label: "workflows coordenados" }],
      stack: ["n8n", "Supabase (PostgREST)", "OAuth 2.0", "SQL", "WhatsApp"],
    },
    {
      slug: "vendas-automaticas",
      title: "Criação automática de vendas",
      flow: ["CRM", "Webhook", "n8n", "ERP"],
      summary: "Venda fechada no CRM vira venda no ERP, sem recadastro.",
      problem:
        "Cada venda fechada no CRM precisava ser cadastrada de novo no ERP, à mão. Isso atrasava o faturamento e abria espaço para divergência entre os dois sistemas.",
      solution:
        "Webhooks do CRM disparam workflows que criam a venda no ERP automaticamente, com fluxos separados para vendas avulsas e recorrentes, porque cada tipo tem regras próprias de cobrança.",
      steps: [
        "Gatilho por webhook no momento em que a venda é fechada",
        "Fluxo para vendas avulsas",
        "Fluxo para vendas recorrentes, com contrato e periodicidade",
        "Validação de cliente e produto antes de gravar no ERP",
      ],
      metrics: [],
      stack: ["Webhooks", "n8n", "API REST", "ERP"],
    },
    {
      slug: "integracao-omie",
      title: "Integração com o ERP Omie",
      flow: ["Omie", "API", "Atendimento"],
      summary: "Dados do ERP disponíveis para quem está atendendo o cliente.",
      problem:
        "A equipe de atendimento precisava consultar o ERP em outra tela para responder dúvidas de cadastro, pedidos e financeiro, o que deixava o cliente esperando.",
      solution:
        "Sincronização via API entre o Omie e a plataforma de atendimento, levando os dados do ERP para o contexto da conversa.",
      steps: [
        "Autenticação e consumo da API do Omie",
        "Mapeamento dos campos entre o ERP e a plataforma de atendimento",
        "Sincronização dos dados para consulta durante o atendimento",
      ],
      metrics: [],
      stack: ["API Omie", "API REST", "Kentro", "n8n"],
    },
    {
      slug: "integracao-cielo",
      title: "Integração com a Cielo",
      flow: ["Cielo", "n8n", "Sistemas"],
      summary: "Vendas e pagamentos saem do portal e entram no processo automaticamente.",
      problem:
        "As informações de vendas e pagamentos ficavam no portal do meio de pagamento e eram conferidas e repassadas manualmente.",
      solution:
        "Conexão com a API da Cielo para automatizar a coleta de informações de vendas e pagamentos e entregá-las aos sistemas que precisam delas.",
      steps: [
        "Autenticação e consulta à API da Cielo",
        "Tratamento dos dados de vendas e pagamentos",
        "Envio das informações para os sistemas de destino",
      ],
      metrics: [],
      stack: ["API Cielo", "API REST", "n8n"],
    },
    {
      slug: "leads-tempo-real",
      title: "Captura de leads em tempo real",
      flow: ["Lead Ads", "Webhook", "CRM"],
      summary: "Formulário preenchido no Facebook vira lead no CRM na mesma hora.",
      problem:
        "Os leads das campanhas no Facebook chegavam ao time comercial com atraso, exportados em planilha, e esfriavam antes do primeiro contato.",
      solution:
        "Integração do Facebook Lead Ads com o CRM: cada formulário preenchido cria um lead no CRM em tempo real, pronto para o atendimento.",
      steps: [
        "Assinatura do webhook de leads da Meta",
        "Busca dos dados completos do formulário",
        "Criação do lead no CRM com origem e campanha identificadas",
      ],
      metrics: [],
      stack: ["Facebook Lead Ads", "Webhooks", "Graph API", "CRM"],
    },
    {
      slug: "bi-atendimento",
      title: "BI de atendimento",
      flow: ["Atendimento", "BigQuery", "Power BI"],
      summary: "Atendimento, CRM, leads e Meta Ads na mesma visão.",
      problem:
        "Dados de atendimento, CRM, leads e Meta Ads estavam espalhados em fontes diferentes, e a gestão não tinha uma visão única para decidir.",
      solution:
        "Consolidação dos dados no BigQuery e dashboards com indicadores de atendimento, funil do CRM, origem dos leads e desempenho de mídia.",
      steps: [
        "Carga dos dados de atendimento, CRM, leads e Meta Ads no BigQuery",
        "Modelagem e consultas em SQL",
        "Dashboards com os indicadores de cada área",
      ],
      metrics: [],
      stack: ["BigQuery", "SQL", "Power BI", "Meta Ads"],
    },
    {
      slug: "scripts-manutencao",
      title: "Scripts de manutenção de CRM",
      flow: ["Script", "API", "CRM"],
      summary: "Limpeza em massa com simulação antes de qualquer alteração.",
      problem:
        "Bases de CRM acumulam oportunidades antigas e duplicadas. Corrigir isso pela interface, registro a registro, é inviável e arriscado.",
      solution:
        "Scripts de limpeza em massa de oportunidades com modo de simulação (dry-run): primeiro mostram o que seria alterado, depois executam. E upload em lote via API para cargas de dados.",
      steps: [
        "Modo dry-run que lista as alterações sem gravar nada",
        "Execução em lote, com log de cada registro",
        "Upload em massa via API para cargas iniciais e correções",
      ],
      metrics: [],
      stack: ["Python", "Node.js", "API REST", "Postman"],
    },
  ],
};

export const experience = {
  title: "Experiência",
  intro: "Da operação de atendimento à implantação de sistemas.",
  jobs: [
    {
      company: "AeC Contact Center",
      role: "Operação de atendimento",
      period: "2 anos", // TODO: troque por datas, ex.: "2022 – 2024"
      current: false,
      text: "Atendimento ao cliente na linha de frente. Aprendi como filas, scripts e sistemas afetam o tempo de resposta e a experiência de quem está do outro lado.",
    },
    {
      company: "Kentro Sistemas",
      role: "Analista de Implantação",
      period: "dez 2024 – atual",
      current: true,
      text: "Implantação da plataforma omnichannel (WhatsApp, chat e e-mail) e desenvolvimento de integrações com ERPs, CRMs, meios de pagamento e ferramentas de dados.",
    },
  ],
  educationTitle: "Formação",
  education: [
    {
      course: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      school: "Universidade Cruzeiro do Sul",
      period: "Em andamento",
    },
  ],
};

export const contact = {
  title: "Vamos conversar",
  intro:
    "Precisa integrar sistemas, automatizar um processo ou estruturar o atendimento? Conte o cenário e eu respondo com um caminho possível.",
  channels: [
    { key: "email", label: "E-mail" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "github", label: "GitHub" },
    { key: "whatsapp", label: "WhatsApp" },
  ] satisfies ContactChannel[],
  form: {
    name: "Nome",
    email: "E-mail",
    message: "Mensagem",
    messagePlaceholder: "Ex.: quero enviar cobranças do ERP pelo WhatsApp automaticamente.",
    submit: "Enviar mensagem",
    sending: "Enviando…",
    success: "Mensagem enviada. Respondo em até dois dias úteis.",
    error: "Não foi possível enviar agora. Tente de novo ou escreva para",
    notConfigured: "O formulário ainda não está configurado. Escreva para",
  },
};

export const footer = {
  note: "Montes Claros, MG. Feito com Next.js, Tailwind CSS e GSAP.",
};

export const notFound = {
  title: "Esta página não existe",
  text: "O endereço pode ter mudado ou ter sido digitado errado. A requisição",
  textAfter: "voltou com 404.",
  cta: "Voltar para o início",
};
