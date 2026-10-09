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
  /** O que a solução automatiza ou melhora (benefício operacional, sem números). */
  benefit: string;
  /** Serviço da SSNEX relacionado, para os links entre páginas. */
  service: ServiceSlug;
  /** Aparece na página inicial (escolha 3 ou 4). */
  featured?: boolean;
  /** Números de resultado. Só são exibidos com `metricsVerified: true`. */
  metrics: Metric[];
  /**
   * Confirme que os números foram medidos, em que período, e que podem ser
   * publicados (sem dados de cliente) antes de marcar `true`.
   */
  metricsVerified: boolean;
  stack: string[];
};

/** Tecnologias agrupadas por finalidade (sem parcerias ou certificações implícitas). */
export type TechGroup = { name: string; purpose: string; items: string[] };

export type ServiceSlug = "automacao" | "integracao" | "ia" | "consultoria";

export type Service = {
  slug: ServiceSlug;
  /** Automação e integração são o foco; IA e consultoria complementam. */
  tier: "principal" | "complementar";
  icon: IconName;
  name: string;
  /** Uma frase curta para a página inicial. */
  summary: string;
  /** Problema que o serviço resolve e como a SSNEX ajuda (página /servicos). */
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
  phone: "+55 (38) 99747-2560",
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
  title: `${brand.name} | Automação de processos e integração de sistemas para empresas`,
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
  problem: "Problema de negócio",
  solution: "Solução",
  benefit: "O que melhora",
  flow: "Fluxo da integração",
  relatedService: "Serviço relacionado",
  relatedProjects: "Exemplos relacionados",
  implementation: "Implementação",
  results: "Resultado verificado",
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
  orWhatsapp: "Prefere conversar agora?",
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
  secondaryCta: { label: "Conhecer soluções", href: "/servicos" },
  /** Rótulos da ilustração de sistemas conectados (decorativa). */
  diagram: {
    hub: brand.name,
    nodes: ["CRM", "ERP", "WhatsApp", "Planilhas", "Dashboards", "IA"],
  },
};

export const problems = {
  headline: "Problemas que resolvemos",
  intro: "Reconhece algum destes cenários na sua operação? Cada um tem um caminho prático.",
  cards: [
    {
      icon: "repeat" as IconName,
      title: "Processos manuais e repetitivos",
      description:
        "A equipe repete tarefas que poderiam rodar sozinhas, com risco de erro e atraso.",
      solution: { label: "Automação de Processos", href: "/servicos#automacao" },
    },
    {
      icon: "unplug" as IconName,
      title: "Sistemas que não se comunicam",
      description: "O mesmo dado é digitado em mais de um sistema, e as informações não batem.",
      solution: { label: "Integração de Sistemas", href: "/servicos#integracao" },
    },
    {
      icon: "database" as IconName,
      title: "Informações espalhadas em diferentes plataformas",
      description: "Os dados existem, mas estão em lugares diferentes e dão trabalho para juntar.",
      solution: { label: "Integração de Sistemas", href: "/servicos#integracao" },
    },
    {
      icon: "network" as IconName,
      title: "Operações difíceis de acompanhar e controlar",
      description: "Falta visibilidade sobre o que acontece no processo e onde ele trava.",
      solution: { label: "Consultoria e Suporte Tecnológico", href: "/servicos#consultoria" },
    },
  ],
};

export const services: { headline: string; intro: string; items: Service[] } = {
  headline: "Soluções tecnológicas para sua operação",
  intro:
    "Automação e integração são o centro do trabalho. Inteligência artificial e consultoria entram quando agregam valor real.",
  items: [
    {
      slug: "automacao",
      tier: "principal",
      icon: "workflow",
      name: "Automação de Processos",
      summary: "Rotinas, notificações e fluxos que hoje dependem de alguém lembrar de fazer.",
      description:
        "Tarefas repetitivas consomem tempo da equipe e abrem espaço para erros. Automatizamos atividades operacionais, notificações, fluxos de trabalho e rotinas de dados, com registro do que foi executado.",
      examples: [
        "Lembretes de cobrança automatizados.",
        "Distribuição e qualificação de leads.",
        "Comunicação automática com clientes.",
        "Fluxos operacionais e notificações.",
        "Sincronização de dados e tarefas agendadas.",
      ],
      cta: "Explorar automação",
      problems: [
        "A equipe repete as mesmas tarefas todos os dias, copiando dados de um lugar para outro.",
        "Etapas dependem de alguém lembrar de fazer, e atrasos viram retrabalho.",
        "Não há registro claro do que foi executado e do que falhou.",
      ],
      deliverables: [
        "Mapeamento do processo atual e do fluxo automatizado proposto.",
        "Fluxos configurados e testados com dados reais.",
        "Registro das execuções e tratamento de falhas.",
        "Documentação de funcionamento e orientação à equipe.",
      ],
      included: [
        "Levantamento do processo dentro do escopo combinado.",
        "Desenvolvimento, testes e entrada em produção.",
        "Ajustes durante o acompanhamento combinado na proposta.",
      ],
      separate: [
        "Licenças de ferramentas e serviços de terceiros.",
        "Novos fluxos ou mudanças de escopo depois da entrega.",
        "Suporte contínuo, quando contratado.",
      ],
    },
    {
      slug: "integracao",
      tier: "principal",
      icon: "plug",
      name: "Integração de Sistemas",
      summary: "ERP, CRM, WhatsApp, pagamentos e bancos de dados trocando informações sozinhos.",
      description:
        "Quando os sistemas não conversam, a equipe vira a ponte entre eles. Conectamos ERPs, CRMs, plataformas de mensagens, meios de pagamento, bancos de dados e aplicações por APIs, webhooks e plataformas de automação.",
      examples: [
        "Integração entre ERP e CRM.",
        "WhatsApp integrado aos sistemas da empresa.",
        "Sincronização do status de pagamentos.",
        "Criação e atualização automática de registros.",
        "Centralização de dados de diferentes plataformas.",
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
        "Manutenção contínua, quando contratada.",
      ],
    },
    {
      slug: "ia",
      tier: "complementar",
      icon: "sparkles",
      name: "Soluções com Inteligência Artificial",
      summary: "IA aplicada a tarefas específicas, quando ela traz valor de negócio.",
      description:
        "Nem todo projeto precisa de IA. Quando faz sentido, aplicamos inteligência artificial ao processamento de informações, ao atendimento assistido e à classificação de demandas, integrada aos sistemas que a empresa já usa e com supervisão humana.",
      examples: [
        "Processamento de informações com apoio de IA.",
        "Classificação e encaminhamento de solicitações.",
        "Fluxos de atendimento apoiados por IA.",
        "IA integrada aos sistemas existentes.",
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
        "Ajustes durante o acompanhamento combinado na proposta.",
      ],
      separate: [
        "Custos de uso de modelos e plataformas de IA.",
        "Novos casos de uso além do escopo combinado.",
        "Acompanhamento contínuo, quando contratado.",
      ],
    },
    {
      slug: "consultoria",
      tier: "complementar",
      icon: "compass",
      name: "Consultoria e Suporte Tecnológico",
      summary: "Diagnóstico, planejamento e evolução da tecnologia que a empresa já tem.",
      description:
        "Antes de implementar, é preciso saber onde está o gargalo. Identificamos pontos de melhoria, avaliamos requisitos técnicos, recomendamos soluções e apoiamos a evolução da tecnologia da empresa.",
      examples: [
        "Diagnóstico técnico.",
        "Avaliação de processos e integrações.",
        "Planejamento de arquitetura e implementação.",
        "Melhoria contínua e suporte técnico.",
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
        "Suporte e evolução nas condições combinadas.",
      ],
      included: [
        "Reuniões de levantamento e análise dentro do escopo.",
        "Relatório ou plano de ação combinado.",
      ],
      separate: [
        "Implementação das melhorias recomendadas.",
        "Suporte contínuo, com escopo definido em contrato.",
      ],
    },
  ],
};

export const howItWorks = {
  headline: "Como trabalhamos",
  intro: "Um caminho claro do problema à solução em funcionamento.",
  steps: [
    {
      title: "Entendimento",
      description: "Entendemos o processo, os desafios e o resultado que a empresa espera.",
    },
    {
      title: "Planejamento",
      description:
        "Definimos a solução adequada, o escopo técnico, os requisitos e o plano de implementação.",
    },
    {
      title: "Implementação",
      description: "Desenvolvemos, configuramos, integramos e testamos a solução combinada.",
    },
    {
      title: "Acompanhamento",
      description:
        "Validamos o resultado, documentamos a solução e avaliamos o suporte ou as melhorias combinadas.",
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
  headline: "Vamos identificar onde a tecnologia pode melhorar sua operação?",
  description:
    "Conte um pouco sobre o processo que deseja melhorar. A partir disso, podemos avaliar os próximos passos.",
  secondaryLabel: "Falar com a SSNEX",
  whatsappMessage:
    "Olá! Vim pelo site da SSNEX e quero conversar sobre um desafio da minha empresa.",
};

/* ================================================================== */
/* Projetos                                                            */
/* ================================================================== */

/** Aviso de origem exibido junto dos projetos. Ajuste se a autoria for mais específica. */
export const portfolioDisclaimer =
  "Os exemplos apresentados demonstram experiências e soluções técnicas desenvolvidas pelo fundador ao longo de sua trajetória profissional. Nem todos representam projetos contratados diretamente pela SSNEX. Informações confidenciais e dados de clientes não são divulgados.";

export const projectKinds: Record<ProjectKind, { label: string; description: string }> = {
  cliente: {
    label: "Projeto SSNEX",
    description: "Projeto contratado e entregue diretamente pela SSNEX, publicado com autorização.",
  },
  fundador: {
    label: "Experiência profissional do fundador",
    description:
      "Solução desenvolvida pelo fundador em atuação profissional anterior à SSNEX. Clientes e dados confidenciais não são identificados.",
  },
  demonstracao: {
    label: "Demonstração",
    description: "Protótipo ou demonstração técnica com dados fictícios.",
  },
};

export const projects: { headline: string; intro: string; items: CaseStudy[] } = {
  headline: "Projetos e aplicações reais",
  intro:
    "Exemplos de automação, integração e dados em produção: o problema, a solução, o fluxo entre os sistemas e o que melhorou na operação.",
  items: [
    {
      kind: "fundador",
      slug: "disparo-boletos",
      title: "Automação de cobranças via WhatsApp",
      service: "automacao",
      featured: true,
      benefit:
        "Elimina o envio manual de boletos, um a um, e reduz erros de digitação no processo de cobrança.",
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
      metricsVerified: false,
      stack: ["n8n", "API Conta Azul", "WhatsApp", "JavaScript"],
    },
    {
      kind: "fundador",
      slug: "regua-cobranca",
      title: "Régua de cobrança automatizada",
      service: "automacao",
      featured: true,
      benefit:
        "Organiza o envio das mensagens conforme a situação de cada cobrança, evitando mensagens duplicadas.",
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
      metricsVerified: false,
      stack: ["n8n", "Supabase (PostgREST)", "OAuth 2.0", "SQL", "WhatsApp"],
    },
    {
      kind: "fundador",
      slug: "vendas-automaticas",
      title: "Criação automática de vendas",
      service: "integracao",
      featured: true,
      benefit:
        "Dispensa o recadastro manual de vendas no ERP e reduz divergências entre os sistemas.",
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
      metricsVerified: false,
      stack: ["Webhooks", "n8n", "API REST", "ERP"],
    },
    {
      kind: "fundador",
      slug: "integracao-omie",
      title: "Integração de ERP com atendimento",
      service: "integracao",
      benefit: "Leva as informações do ERP para o contexto do atendimento, sem troca de tela.",
      flow: ["Omie", "API", "Plataforma de atendimento"],
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
      metricsVerified: false,
      stack: ["API Omie", "API REST", "Plataforma de atendimento", "n8n"],
    },
    {
      kind: "fundador",
      slug: "integracao-cielo",
      title: "Integração de pagamentos",
      service: "integracao",
      benefit: "Substitui a conferência e o repasse manual de informações de vendas e pagamentos.",
      flow: ["Cielo", "n8n", "Sistemas integrados"],
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
      metricsVerified: false,
      stack: ["API Cielo", "API REST", "n8n"],
    },
    {
      kind: "fundador",
      slug: "leads-tempo-real",
      title: "Integração de leads",
      service: "integracao",
      featured: true,
      benefit: "Leva cada lead ao CRM assim que o formulário é preenchido, sem exportar planilhas.",
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
      metricsVerified: false,
      stack: ["Facebook Lead Ads", "Webhooks", "Graph API", "CRM"],
    },
    {
      kind: "fundador",
      slug: "bi-atendimento",
      title: "Centralização de dados e dashboards",
      service: "integracao",
      benefit: "Reúne em uma só visão dados que estavam espalhados em fontes diferentes.",
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
      metricsVerified: false,
      stack: ["BigQuery", "SQL", "Power BI", "Meta Ads"],
    },
    {
      kind: "fundador",
      slug: "scripts-manutencao",
      title: "Integração por API para manutenção de CRM",
      service: "integracao",
      benefit:
        "Permite corrigir e carregar dados em massa com mais segurança, simulando as alterações antes de executá-las.",
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
      metricsVerified: false,
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
    "A SSNEX nasceu da experiência prática com operações, implantação de tecnologia e integração de sistemas. O objetivo é transformar necessidades operacionais em soluções digitais úteis, sustentáveis e alinhadas à realidade de cada negócio.",
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
    "A SSNEX foi fundada por Samuel Silva Santos. A trajetória começou na operação de atendimento ao cliente, vendo de perto o efeito de sistemas que não se comunicam: cliente esperando, informação digitada duas vezes, fila que não anda.",
    "Depois veio a tecnologia: implantação de plataformas de atendimento omnichannel e desenvolvimento de integrações entre ERPs, CRMs, meios de pagamento e WhatsApp, como Analista de Implantação.",
    "Essa combinação de operação e tecnologia define o jeito SSNEX de trabalhar: antes de escolher a ferramenta, entender quem usa o processo no dia a dia e o que acontece quando algo falha.",
  ],
  /** Foto opcional em `public/` (ex.: "/samuel.webp", 600×600). `null` oculta. */
  photo: null as string | null,
  photoAlt: `Foto de ${profile.name}`,
};

export const integrations: { title: string; intro: string; groups: TechGroup[] } = {
  title: "Ferramentas e tecnologias",
  intro:
    "Usadas em projetos reais, conforme a necessidade de cada solução. Nenhuma delas é obrigatória, e nenhuma indica parceria formal com o fornecedor.",
  groups: [
    { name: "Automação", purpose: "Fluxos e rotinas automatizadas", items: ["n8n", "Make"] },
    {
      name: "Integração",
      purpose: "Conexão entre sistemas",
      items: ["APIs REST", "Webhooks", "Postman"],
    },
    {
      name: "Dados",
      purpose: "Armazenamento, análise e relatórios",
      items: ["SQL", "Supabase", "BigQuery", "Power BI"],
    },
    {
      name: "Desenvolvimento",
      purpose: "Scripts e ajustes sob medida",
      items: ["Python", "Node.js", "Git"],
    },
    {
      name: "Sistemas de negócio",
      purpose: "Onde as integrações acontecem",
      items: ["ERPs", "CRMs", "Plataformas de atendimento", "WhatsApp"],
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
    problems: "Problemas que o serviço resolve",
    deliverables: "Possíveis entregas",
    included: "Normalmente incluído",
    separate: "Pode exigir contratação à parte",
    examples: "Casos de uso",
  },
  complementaryTitle: "Serviços complementares",
  complementaryIntro:
    "Entram quando agregam valor ao processo, sozinhos ou junto com automação e integração.",
  hiring: {
    title: "Como funciona a contratação",
    items: [
      "Cada projeto é dimensionado conforme as necessidades da operação e os requisitos técnicos.",
      "A implementação pode ser contratada como um projeto com escopo definido.",
      "Suporte contínuo, monitoramento e melhorias podem ser combinados à parte, quando fizer sentido.",
      "Escopo, prazo, entregas e investimento finais dependem do diagnóstico.",
    ],
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
          "Quando faz sentido, os fluxos registram as execuções e permitem reprocessar o que falhou. O suporte depois da entrega, se contratado, segue as condições combinadas.",
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
  "Integração de sistemas",
  "Soluções com inteligência artificial",
  "Consultoria e suporte tecnológico",
  "Ainda preciso entender a melhor solução",
] as const;

export const contactPage = {
  headline: "Vamos conversar sobre o que sua empresa precisa melhorar?",
  intro:
    "Conte um pouco sobre sua operação e o desafio que deseja resolver. Vamos entender o contexto e avaliar os próximos passos.",
  firstTalkTitle: "O que a primeira conversa esclarece",
  firstTalk: [
    "Como o processo funciona hoje e onde ele trava.",
    "Quais sistemas estão envolvidos.",
    "Se a solução é tecnicamente viável.",
    "Quais seriam os próximos passos.",
  ],
  nextStepsTitle: "Como funciona o primeiro contato",
  nextSteps: [
    "Você descreve o desafio pelo formulário ou pelos canais diretos.",
    "Analisamos a mensagem e, se precisar, pedimos mais detalhes.",
    "Combinamos uma conversa para entender o processo e os sistemas.",
    "Se a SSNEX puder ajudar, enviamos uma proposta com escopo, entregas, prazo e investimento.",
  ],
  channelsTitle: "Canais diretos",
  form: {
    name: "Nome",
    company: "Empresa",
    email: "E-mail profissional",
    contact: "WhatsApp ou telefone",
    service: "O que sua empresa precisa?",
    servicePlaceholder: "Selecione uma opção",
    message: "Conte brevemente sobre o desafio",
    messagePlaceholder:
      "Ex.: hoje copiamos os pedidos do e-commerce para o ERP manualmente, e isso gera erros.",
    optional: "opcional",
    consent: "Li e estou de acordo com o",
    privacyLink: "Aviso de Privacidade",
    submit: "Enviar solicitação",
    sending: "Enviando…",
    success:
      "Mensagem enviada com sucesso! Obrigado pelo contato. Vamos analisar as informações e retornar assim que possível.",
    error:
      "Não foi possível enviar sua mensagem agora. Tente novamente ou entre em contato diretamente pelo WhatsApp ou e-mail:",
    tooFast: "Por segurança, aguarde alguns segundos e envie novamente.",
    notConfigured:
      "O envio pelo formulário ainda não está ativo. Para falar com a SSNEX agora, escreva para",
  },
};

/* ================================================================== */
/* Política de Privacidade                                              */
/* ================================================================== */

export const privacy = {
  headline: "Aviso de Privacidade",
  updatedAt: "9 de outubro de 2026",
  /** Mantenha alinhado com o que o site realmente faz. Revisão por profissional de privacidade é recomendada. */
  sections: [
    {
      title: "Quem é o responsável",
      paragraphs: [
        `Este site é da SSNEX, marca de consultoria em tecnologia de ${profile.name}. Para qualquer assunto sobre seus dados pessoais, escreva para ${links.email}.`,
      ],
    },
    {
      title: "Quais dados coletamos e por quê",
      paragraphs: [
        "Formulário de contato: nome, empresa (opcional), e-mail profissional, WhatsApp ou telefone (opcional), o serviço de interesse e a mensagem. Esses dados servem apenas para responder ao seu contato e, se fizer sentido, preparar uma proposta. A base legal é o seu consentimento, dado ao marcar a caixa no formulário.",
        "Contato direto: se você escrever por e-mail ou WhatsApp, recebemos as informações que você enviar por esses canais, com a mesma finalidade.",
        "Uso do site: a hospedagem registra dados técnicos de acesso (como endereço IP, navegador e páginas acessadas) para segurança e funcionamento. Também coletamos métricas agregadas de visitas e de desempenho, e eventos de uso (como o início e o envio do formulário e cliques em botões de contato), sem identificar você.",
        "Não pedimos dados sensíveis. Por favor, não os envie pela mensagem.",
      ],
    },
    {
      title: "Serviços de terceiros",
      paragraphs: [
        "Hospedagem, métricas de visitas (Vercel Web Analytics) e de desempenho (Vercel Speed Insights): Vercel Inc.",
        "Recebimento do formulário, quando ativo: Formspree, que entrega a mensagem por e-mail. As mensagens chegam à caixa de e-mail do responsável.",
        "WhatsApp, LinkedIn e Instagram: só quando você clica nos links para esses serviços, que têm políticas próprias.",
        "Alguns desses fornecedores processam dados fora do Brasil, especialmente nos Estados Unidos. Não vendemos nem cedemos seus dados para fins de marketing.",
      ],
    },
    {
      title: "Cookies e armazenamento local",
      paragraphs: [
        "O site não usa cookies de publicidade. As métricas da Vercel são agregadas e, segundo o fornecedor, não usam cookies.",
        "Sua preferência de tema (claro ou escuro) fica salva apenas no seu navegador, no armazenamento local.",
      ],
    },
    {
      title: "Por quanto tempo guardamos",
      paragraphs: [
        "As mensagens de contato são mantidas pelo tempo necessário para tratar a solicitação e uma eventual proposta. Você pode pedir a exclusão a qualquer momento. Os prazos de retenção dos fornecedores seguem as políticas de cada um.",
      ],
    },
    {
      title: "Seus direitos",
      paragraphs: [
        `Pela Lei Geral de Proteção de Dados (LGPD), você pode pedir confirmação de tratamento, acesso, correção, anonimização ou exclusão dos seus dados, informações sobre compartilhamento e a revogação do consentimento. Basta escrever para ${links.email}.`,
      ],
    },
    {
      title: "Alterações",
      paragraphs: [
        "Este aviso é atualizado quando o site muda a forma de tratar dados. A data da última atualização aparece no topo da página.",
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
