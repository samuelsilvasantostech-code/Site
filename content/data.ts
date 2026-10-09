/**
 * Todo o conteúdo do site SSNEX.
 *
 * Os componentes apenas leem este arquivo: para atualizar textos, links,
 * serviços ou projetos, edite aqui. Os tipos fazem um campo esquecido aparecer
 * como erro no editor e no build.
 *
 * Regras de conteúdo (estratégia do site): tudo em português do Brasil, sem
 * clientes, depoimentos, números ou certificações inventados, e sem promessas
 * de resultado. A marca SSNEX e a assinatura em inglês não são traduzidas.
 */

/* ================================================================== */
/* Tipos                                                               */
/* ================================================================== */

export type IconName =
  | "workflow"
  | "plug"
  | "sparkles"
  | "compass"
  | "repeat"
  | "unplug"
  | "database"
  | "network"
  | "target"
  | "file-check"
  | "shield"
  | "message";

export type Metric = { value: string; label: string };

/**
 * Origem de um projeto. Clientes da SSNEX, experiência do fundador e
 * demonstrações são sempre identificados de forma diferente.
 */
export type ProjectKind = "cliente" | "fundador" | "demonstracao";

export type CaseStudy = {
  kind: ProjectKind;
  slug: string;
  title: string;
  /** Caminho dos dados, da origem ao destino (2 a 4 sistemas). */
  flow: string[];
  /** Objetivo em uma frase. */
  summary: string;
  problem: string;
  solution: string;
  /** `true` exibe os passos numerados (use quando forem uma sequência). */
  stepsOrdered?: boolean;
  steps: string[];
  /** Só números verificáveis. Deixe vazio quando não houver. */
  metrics: Metric[];
  stack: string[];
};

export type IntegrationItem = { name: string; note: string };

export type IntegrationGroup =
  { name: string; items: IntegrationItem[] } | { name: string; chips: string[] };

export type ServiceSlug = "automacao" | "integracao" | "ia" | "consultoria";

export type Service = {
  slug: ServiceSlug;
  icon: IconName;
  name: string;
  description: string;
  examples: string[];
  cta: string;
  /** Detalhes da página /servicos. */
  problems: string[];
  deliverables: string[];
  included: string[];
  separate: string[];
};

/* ================================================================== */
/* Marca, contatos e identidade                                        */
/* ================================================================== */

export const brand = {
  name: "SSNEX",
  descriptor: "Technology & Business Solutions",
  /** Assinatura oficial: não traduzir. A segunda parte aparece em azul. */
  tagline: { lead: "Your systems.", highlight: "More possibilities." },
  taglineTranslation: "Seus sistemas. Mais possibilidades.",
  slogan: "Soluções tecnológicas para um futuro mais conectado.",
};

export const links = {
  email: "samuelsilvasantos.tech@gmail.com",
  /** Telefone para exibição e para o link "tel:". */
  phone: "(38) 99747-2560",
  phoneHref: "tel:+5538997472560",
  /** wa.me/ + 55 + DDD + número, só dígitos. Deixe "" para ocultar o WhatsApp. */
  whatsapp: "https://wa.me/5538997472560",
  linkedin: "https://www.linkedin.com/in/samuel-silva-santos-a73041191/",
  instagram: "https://www.instagram.com/samuelsilvasantoss/",
} as const;

/** Fundador. Usado na página Sobre, no currículo e nos dados estruturados. */
export const profile = {
  name: "Samuel Silva Santos",
  givenName: "Samuel",
  familyName: "Silva Santos",
  role: "Fundador e consultor de tecnologia",
  headline: "Fundador e consultor de tecnologia da SSNEX",
  city: "Montes Claros",
  region: "MG",
  country: "BR",
  worksFor: "Kentro Sistemas",
  alumniOf: "Universidade Cruzeiro do Sul",
};

export const seo = {
  title: `${brand.name} | Consultoria de tecnologia, automação e integração de sistemas`,
  description:
    "Consultoria de tecnologia para pequenas e médias empresas: automação de processos, integração de sistemas e APIs, soluções com inteligência artificial e suporte tecnológico.",
  ogAlt: `${brand.name} ${brand.descriptor}: Your systems. More possibilities.`,
  knowsAbout: [
    "Automação de processos",
    "Integração de sistemas",
    "APIs REST",
    "Webhooks",
    "n8n",
    "Make",
    "CRM",
    "Atendimento omnichannel",
    "Inteligência artificial",
    "BigQuery",
    "Power BI",
    "SQL",
  ],
};

/* ================================================================== */
/* Navegação e textos de interface                                     */
/* ================================================================== */

export const nav = [
  { href: "/servicos", label: "Serviços" },
  { href: "/projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
] as const;

/** CTA principal, o mesmo em todo o site. */
export const primaryCta = { label: "Solicitar diagnóstico", href: "/contato" } as const;

export const ui = {
  skip: "Pular para o conteúdo",
  openMenu: "Abrir menu",
  closeMenu: "Fechar menu",
  toggleTheme: "Alternar tema claro e escuro",
  mainNav: "Navegação principal",
  footerNav: "Rodapé",
  social: "Redes e contato",
  home: "Página inicial",
  problem: "Problema",
  approach: "Abordagem",
  objective: "Objetivo",
  implementation: "Implementação",
  results: "Resultados",
  stack: "Tecnologias",
  allProjects: "Todos os projetos",
  previousProject: "Projeto anterior",
  nextProject: "Próximo projeto",
  viewProject: "Ver projeto",
  copyEmail: "Copiar e-mail",
  emailCopied: "E-mail copiado",
  emailCopyFailed: "Não foi possível copiar. O e-mail é",
  resume: "Ver currículo",
  printResume: "Imprimir ou salvar em PDF",
  backHome: "Voltar ao início",
  search: "Buscar",
  whatsapp: "Falar no WhatsApp",
  commandTitle: "Menu de comandos",
  commandDescription: "Navegue pelo site, abra um projeto ou entre em contato.",
  commandPlaceholder: "Digite um comando ou procure um projeto…",
  commandEmpty: "Nada encontrado com esse termo.",
  commandGroups: { pages: "Páginas", projects: "Projetos", actions: "Ações", links: "Links" },
};

/* ================================================================== */
/* Página inicial                                                      */
/* ================================================================== */

export const hero = {
  headline: "Sua empresa pode trabalhar melhor. A tecnologia precisa acompanhar.",
  description:
    "Conectamos sistemas, automatizamos processos e desenvolvemos soluções digitais para empresas que querem operar com mais eficiência.",
  secondaryCta: { label: "Conhecer soluções", href: "#servicos" },
  /** Rótulos da ilustração de sistemas conectados (decorativa). */
  diagram: {
    hub: brand.name,
    nodes: ["CRM", "ERP", "WhatsApp", "Planilhas", "Dashboards", "IA"],
  },
};

export const problems = {
  headline: "Tecnologia para resolver problemas reais.",
  intro: "Antes da ferramenta, vem o problema. Estes são os pontos em que a SSNEX costuma ajudar.",
  cards: [
    {
      icon: "repeat" as IconName,
      title: "Processos manuais",
      description: "Automatize tarefas repetitivas e reduza retrabalho.",
    },
    {
      icon: "unplug" as IconName,
      title: "Sistemas desconectados",
      description: "Integre plataformas e mantenha informações sincronizadas.",
    },
    {
      icon: "database" as IconName,
      title: "Dados dispersos",
      description: "Organize informações e facilite o acompanhamento dos indicadores.",
    },
    {
      icon: "network" as IconName,
      title: "Operações complexas",
      description: "Simplifique fluxos de trabalho e identifique oportunidades para aplicar IA.",
    },
  ],
};

export const services: { headline: string; intro: string; items: Service[] } = {
  headline: "Soluções tecnológicas para sua operação.",
  intro:
    "Quatro frentes que se combinam conforme a necessidade. O escopo é definido junto com você, antes de começar.",
  items: [
    {
      slug: "automacao",
      icon: "workflow",
      name: "Automação de Processos",
      description:
        "Desenvolvimento de fluxos automatizados para eliminar tarefas repetitivas e conectar etapas operacionais.",
      examples: [
        "Automação de tarefas administrativas.",
        "Workflows com ferramentas como n8n.",
        "Notificações e processamento de solicitações.",
        "Integração entre formulários, planilhas e sistemas.",
      ],
      cta: "Explorar automação",
      problems: [
        "A equipe repete as mesmas tarefas todos os dias, copiando dados de um lugar para outro.",
        "Etapas dependem de alguém lembrar de fazer, e atrasos viram retrabalho.",
        "Não há registro claro do que foi executado e do que falhou.",
      ],
      deliverables: [
        "Mapeamento do processo atual e do fluxo automatizado proposto.",
        "Workflows configurados e testados com dados reais.",
        "Registro das execuções e tratamento de falhas.",
        "Documentação de funcionamento e orientação à equipe.",
      ],
      included: [
        "Levantamento do processo dentro do escopo combinado.",
        "Desenvolvimento, testes e entrada em produção.",
        "Ajustes durante o período de acompanhamento acordado.",
      ],
      separate: [
        "Licenças de ferramentas e serviços de terceiros.",
        "Novos fluxos ou mudanças de escopo depois da entrega.",
        "Suporte contínuo, contratado à parte.",
      ],
    },
    {
      slug: "integracao",
      icon: "plug",
      name: "Integração de Sistemas",
      description:
        "Conexão entre aplicações e plataformas para reduzir operações duplicadas e melhorar a consistência dos dados.",
      examples: [
        "Integração de APIs.",
        "CRM e plataformas de atendimento.",
        "Sincronização de informações.",
        "Tratamento de falhas e documentação técnica.",
      ],
      cta: "Explorar integrações",
      problems: [
        "O mesmo dado é digitado em mais de um sistema, e as informações não batem.",
        "A equipe troca de tela o tempo todo para encontrar o que precisa.",
        "Integrações antigas param sem aviso e ninguém sabe onde está o erro.",
      ],
      deliverables: [
        "Análise das APIs e dos dados que precisam circular.",
        "Integração configurada, com autenticação, paginação e limites de uso tratados.",
        "Monitoramento de falhas e possibilidade de reprocessamento.",
        "Documentação técnica da integração.",
      ],
      included: [
        "Integração entre os sistemas definidos no escopo.",
        "Testes com dados reais antes da entrada em produção.",
        "Acompanhamento das primeiras execuções.",
      ],
      separate: [
        "Custos de API, planos ou licenças dos sistemas envolvidos.",
        "Desenvolvimento dentro dos sistemas de terceiros.",
        "Manutenção contínua, contratada à parte.",
      ],
    },
    {
      slug: "ia",
      icon: "sparkles",
      name: "Soluções com Inteligência Artificial",
      description:
        "Aplicação prática de IA em tarefas específicas, com atenção à confiabilidade, segurança e supervisão humana.",
      examples: [
        "Assistentes para tarefas empresariais.",
        "Classificação de solicitações.",
        "Extração e organização de informações.",
        "Apoio à equipe de atendimento.",
      ],
      cta: "Explorar soluções com IA",
      problems: [
        "Muitas solicitações chegam sem triagem e consomem o tempo da equipe.",
        "Informações importantes ficam presas em textos, e-mails e documentos.",
        "Há interesse em IA, mas não está claro onde ela traz valor real.",
      ],
      deliverables: [
        "Avaliação do caso de uso e dos riscos antes de implementar.",
        "Solução aplicada a uma tarefa específica, com pontos de revisão humana.",
        "Testes com exemplos reais da operação.",
        "Orientação sobre uso, limites e cuidados com dados.",
      ],
      included: [
        "Definição do caso de uso e dos critérios de qualidade.",
        "Implementação e testes dentro do escopo.",
        "Ajustes durante o período de acompanhamento acordado.",
      ],
      separate: [
        "Custos de uso de modelos e plataformas de IA.",
        "Novos casos de uso além do escopo combinado.",
        "Acompanhamento contínuo, contratado à parte.",
      ],
    },
    {
      slug: "consultoria",
      icon: "compass",
      name: "Consultoria e Suporte Tecnológico",
      description:
        "Análise de necessidades técnicas, planejamento de melhorias e acompanhamento de soluções implementadas.",
      examples: [
        "Diagnóstico de processos.",
        "Análise de arquitetura e integrações.",
        "Documentação técnica.",
        "Manutenção e evolução conforme contrato.",
      ],
      cta: "Conhecer consultoria",
      problems: [
        "Não está claro por onde começar a melhorar a operação com tecnologia.",
        "Soluções existentes funcionam, mas ninguém sabe exatamente como.",
        "Falta alguém técnico para acompanhar e evoluir o que já foi implantado.",
      ],
      deliverables: [
        "Diagnóstico com os pontos de melhoria priorizados.",
        "Recomendações de solução, com escopo e próximos passos.",
        "Documentação técnica do que existe hoje.",
        "Suporte e evolução nas condições contratadas.",
      ],
      included: [
        "Reuniões de levantamento e análise dentro do escopo.",
        "Relatório ou plano de ação combinado.",
      ],
      separate: [
        "Implementação das melhorias recomendadas.",
        "Suporte contínuo, com escopo e horas definidos em contrato.",
      ],
    },
  ],
};

export const howItWorks = {
  headline: "Do problema à solução, com clareza.",
  steps: [
    {
      title: "Entendimento",
      description: "Compreendemos o processo, os objetivos e as limitações da operação.",
    },
    {
      title: "Planejamento",
      description: "Definimos o escopo, a solução recomendada, o prazo e o investimento.",
    },
    {
      title: "Implementação",
      description: "Desenvolvemos, configuramos e testamos a solução acordada.",
    },
    {
      title: "Acompanhamento",
      description: "Documentamos a entrega e oferecemos suporte conforme as condições contratadas.",
    },
  ],
};

export const principles = {
  headline: "Soluções pensadas para funcionar na prática.",
  intro: "Os princípios que orientam cada projeto da SSNEX.",
  items: [
    {
      icon: "target" as IconName,
      title: "Foco nas necessidades reais da empresa",
      description: "A tecnologia entra para resolver um problema da operação, não por si só.",
    },
    {
      icon: "file-check" as IconName,
      title: "Escopo e entregas definidos com clareza",
      description: "Você sabe o que será entregue, em que prazo e o que fica fora.",
    },
    {
      icon: "plug" as IconName,
      title: "Integrações documentadas e testadas",
      description: "Cada integração é testada com dados reais e documentada.",
    },
    {
      icon: "shield" as IconName,
      title: "Atenção à segurança e à manutenção",
      description: "Credenciais protegidas, falhas tratadas e soluções fáceis de manter.",
    },
    {
      icon: "message" as IconName,
      title: "Comunicação técnica acessível",
      description: "Explicações claras, sem jargão desnecessário, para quem decide.",
    },
  ],
};

export const finalCta = {
  headline: "Vamos identificar oportunidades na sua operação?",
  description:
    "Conte um pouco sobre o desafio da sua empresa. Vamos avaliar o problema e entender se a SSNEX pode ajudar.",
  secondaryLabel: "Falar com a SSNEX",
  whatsappMessage:
    "Olá! Vim pelo site da SSNEX e quero conversar sobre um desafio da minha empresa.",
};

/* ================================================================== */
/* Projetos                                                            */
/* ================================================================== */

export const projectKinds: Record<ProjectKind, { label: string; description: string }> = {
  cliente: {
    label: "Projeto SSNEX",
    description: "Projeto entregue pela SSNEX, publicado com autorização do cliente.",
  },
  fundador: {
    label: "Experiência do fundador",
    description:
      "Projeto entregue em produção pelo fundador da SSNEX em sua atuação profissional anterior. O cliente não é identificado.",
  },
  demonstracao: {
    label: "Demonstração",
    description: "Protótipo ou demonstração técnica com dados fictícios.",
  },
};

export const projects: { headline: string; intro: string; items: CaseStudy[] } = {
  headline: "Tecnologia aplicada na prática.",
  intro:
    "Projetos de automação, integração e dados entregues em produção. Cada um mostra o problema, a abordagem, as tecnologias e, quando verificável, o resultado.",
  items: [
    {
      kind: "fundador",
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
      kind: "fundador",
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
      kind: "fundador",
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
      kind: "fundador",
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
      kind: "fundador",
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
      kind: "fundador",
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
      kind: "fundador",
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
      kind: "fundador",
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

/* ================================================================== */
/* Sobre                                                               */
/* ================================================================== */

export const about = {
  headline: "Tecnologia a serviço da operação.",
  intro:
    "A SSNEX é uma marca de consultoria em tecnologia focada em resolver problemas práticos de empresas: sistemas que não conversam, processos manuais e dados difíceis de acompanhar.",
  approachTitle: "Como pensamos tecnologia",
  approach: [
    {
      title: "Primeiro o processo, depois a ferramenta",
      description:
        "Entendemos quem usa o fluxo, quando e o que acontece quando ele falha. Só então escolhemos a tecnologia.",
    },
    {
      title: "Integrações que continuam funcionando",
      description:
        "Autenticação, limites de API, paginação e falhas são tratados desde o início, e tudo fica documentado.",
    },
    {
      title: "Melhoria contínua, sem complexidade desnecessária",
      description:
        "Começamos pelo que traz valor primeiro e evoluímos com base no uso real da solução.",
    },
  ],
  founderTitle: "Quem está por trás da SSNEX",
  founderParagraphs: [
    "A SSNEX foi fundada por Samuel Silva Santos. Ele começou no atendimento: foram dois anos na operação da AeC Contact Center, vendo de perto o que acontece quando um sistema não conversa com o outro.",
    "Depois foi para a tecnologia. Como Analista de Implantação na Kentro Sistemas, implanta plataformas de atendimento omnichannel e constrói integrações entre ERPs, CRMs, meios de pagamento e WhatsApp.",
    "Essa passagem pela operação define o jeito SSNEX de trabalhar: antes de escolher a ferramenta, entender quem vai usar o fluxo às 8h de uma segunda-feira.",
  ],
  /** Foto opcional em `public/` (ex.: "/samuel.webp", 600×600). `null` oculta. */
  photo: null as string | null,
  photoAlt: `Foto de ${profile.name}`,
};

export const integrations: { title: string; intro: string; groups: IntegrationGroup[] } = {
  title: "Plataformas com que o fundador já trabalhou",
  intro: "Sistemas integrados em projetos reais. Cada um tem a sua autenticação e os seus limites.",
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
      name: "Dados e infraestrutura",
      items: [
        { name: "Supabase", note: "PostgREST como camada de estado" },
        { name: "BigQuery", note: "Base analítica de atendimento e mídia" },
        { name: "Power BI", note: "Dashboards de gestão" },
      ],
    },
    {
      name: "Automação e desenvolvimento",
      chips: ["n8n", "Make", "Webhooks", "APIs REST", "Node.js", "Python", "SQL", "Postman", "Git"],
    },
  ],
};

export const experience = {
  title: "Trajetória do fundador",
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

/* ================================================================== */
/* Serviços (página)                                                   */
/* ================================================================== */

export const servicesPage = {
  headline: "Serviços",
  intro:
    "Explicamos cada serviço em linguagem de negócio: os problemas que resolve, o que é entregue e o que fica fora do escopo.",
  labels: {
    problems: "Problemas comuns",
    deliverables: "O que é entregue",
    included: "Incluído no projeto",
    separate: "Pode exigir contratação à parte",
    examples: "Exemplos",
  },
  scopeNote: {
    title: "Escopo, prazo e investimento",
    text: "Cada empresa tem sistemas e processos diferentes. Por isso, escopo, prazo e valor dependem da complexidade do projeto e são definidos na proposta, depois do diagnóstico. Não trabalhamos com preços genéricos nem prometemos economias específicas.",
  },
  faq: {
    title: "Dúvidas frequentes",
    items: [
      {
        question: "Que tipo de sistema vocês conseguem integrar?",
        answer:
          "Em geral, qualquer sistema que ofereça API ou webhooks: ERPs, CRMs, meios de pagamento, plataformas de atendimento e ferramentas de dados. A viabilidade de cada integração é confirmada no diagnóstico.",
      },
      {
        question: "Vocês trabalham com n8n ou com Make?",
        answer:
          "Com os dois. A escolha depende do volume, do orçamento e de onde a automação vai rodar. Quando a ferramenta não resolve, o trecho é desenvolvido em código.",
      },
      {
        question: "E se a integração parar de funcionar?",
        answer:
          "Os fluxos registram as execuções e permitem reprocessar o que falhou. O suporte depois da entrega segue as condições combinadas em contrato.",
      },
      {
        question: "Como é definido o valor de um projeto?",
        answer:
          "Depois de entender o problema, enviamos uma proposta com escopo, prazo e investimento. O valor depende da complexidade e dos sistemas envolvidos.",
      },
    ],
  },
};

/* ================================================================== */
/* Contato                                                             */
/* ================================================================== */

export const serviceOptions = [
  "Automação de processos",
  "Integração de sistemas e APIs",
  "Inteligência artificial",
  "Consultoria ou suporte tecnológico",
  "Ainda não sei; preciso de orientação",
] as const;

export const contactPage = {
  headline: "Solicite um diagnóstico.",
  intro:
    "Conte sobre o desafio da sua empresa. Vamos analisar o cenário e responder pelo canal que você indicar, com perguntas e um possível caminho.",
  nextStepsTitle: "Como funciona o primeiro contato",
  nextSteps: [
    "Você descreve o desafio pelo formulário ou pelos canais diretos.",
    "Analisamos a mensagem e, se precisar, pedimos mais detalhes.",
    "Combinamos uma conversa para entender o processo e os sistemas.",
    "Se a SSNEX puder ajudar, enviamos uma proposta com escopo, prazo e investimento.",
  ],
  channelsTitle: "Canais diretos",
  form: {
    name: "Seu nome",
    company: "Empresa",
    email: "E-mail profissional",
    contact: "WhatsApp ou telefone",
    service: "O que sua empresa precisa?",
    servicePlaceholder: "Selecione uma opção",
    message: "Conte brevemente sobre o desafio",
    messagePlaceholder:
      "Ex.: hoje copiamos os pedidos do e-commerce para o ERP manualmente, e isso gera erros.",
    optional: "opcional",
    consent: "Concordo com o uso destes dados para que a SSNEX responda ao meu contato, conforme a",
    privacyLink: "Política de Privacidade",
    submit: "Enviar solicitação",
    sending: "Enviando…",
    success:
      "Solicitação enviada. Recebemos as informações e vamos responder pelo canal que você indicou.",
    error: "Não foi possível enviar agora. Tente de novo em instantes ou escreva para",
    notConfigured:
      "O envio pelo formulário ainda não está ativo. Para falar com a SSNEX agora, escreva para",
  },
};

/* ================================================================== */
/* Política de Privacidade                                              */
/* ================================================================== */

export const privacy = {
  headline: "Política de Privacidade",
  updatedAt: "9 de outubro de 2026",
  /** Cada seção: título + parágrafos. Mantenha alinhado com o que o site realmente faz. */
  sections: [
    {
      title: "Quem é o responsável",
      paragraphs: [
        `Este site é da SSNEX, marca de consultoria em tecnologia de ${profile.name}. Para qualquer assunto sobre seus dados, escreva para ${links.email}.`,
      ],
    },
    {
      title: "Quais dados coletamos",
      paragraphs: [
        "Pelo formulário de contato: nome, empresa (opcional), e-mail profissional, WhatsApp ou telefone (opcional), o serviço de interesse e a mensagem que você escrever.",
        "Pelo funcionamento do site: dados técnicos de acesso registrados pela hospedagem (como endereço IP, navegador e páginas acessadas) e métricas agregadas de uso e de desempenho.",
        "Não pedimos dados sensíveis. Por favor, não os envie pela mensagem.",
      ],
    },
    {
      title: "Para que usamos",
      paragraphs: [
        "Os dados do formulário servem apenas para responder ao seu contato e, se fizer sentido, preparar uma proposta. A base legal é o seu consentimento, dado ao marcar a caixa no formulário.",
        "Os dados técnicos servem para manter o site seguro, funcionando e com bom desempenho.",
      ],
    },
    {
      title: "Com quem compartilhamos",
      paragraphs: [
        "O envio do formulário passa por um serviço de recebimento de formulários (Formspree), que entrega a mensagem por e-mail. O site é hospedado na Vercel, que também fornece as métricas de uso e de desempenho.",
        "Não vendemos nem cedemos seus dados para fins de marketing.",
      ],
    },
    {
      title: "Cookies e armazenamento local",
      paragraphs: [
        "O site não usa cookies de publicidade nem de rastreamento. As métricas de uso da Vercel são agregadas e não usam cookies.",
        "Sua preferência de tema (claro ou escuro) fica salva apenas no seu navegador.",
      ],
    },
    {
      title: "Por quanto tempo guardamos",
      paragraphs: [
        "As mensagens do formulário são mantidas pelo tempo necessário para tratar o seu contato e uma eventual proposta. Você pode pedir a exclusão a qualquer momento.",
      ],
    },
    {
      title: "Seus direitos",
      paragraphs: [
        `Pela Lei Geral de Proteção de Dados (LGPD), você pode pedir confirmação, acesso, correção ou exclusão dos seus dados e revogar o consentimento. Basta escrever para ${links.email}.`,
      ],
    },
    {
      title: "Alterações",
      paragraphs: [
        "Esta política pode ser atualizada quando o site mudar a forma de tratar dados. A data da última atualização aparece no topo da página.",
      ],
    },
  ],
};

/* ================================================================== */
/* Outros                                                              */
/* ================================================================== */

export const footer = {
  note: "Todos os direitos reservados.",
};

/** Página /curriculo (do fundador). */
export const resume = {
  title: "Currículo",
  summary:
    "Fundador da SSNEX e Analista de Implantação, com base em atendimento ao cliente. Integra ERPs, CRMs, meios de pagamento e WhatsApp por APIs REST, webhooks, n8n e Make, e implanta atendimento omnichannel do levantamento ao go-live.",
  sections: {
    experience: "Experiência",
    projects: "Projetos selecionados",
    skills: "Competências",
    education: "Formação",
  },
};

export const notFound = {
  title: "Esta página não existe",
  text: "O endereço pode ter mudado ou ter sido digitado errado. A requisição",
  textAfter: "voltou com 404.",
  cta: "Voltar para o início",
};
