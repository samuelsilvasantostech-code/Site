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

/** Área do projeto, usada nos filtros da página /projetos. */
export type ProjectArea = "automacao" | "integracao" | "dados";

export type CaseStudy = {
  kind: ProjectKind;
  area: ProjectArea;
  slug: string;
  title: string;
  /**
   * Caminho da informação, da origem ao destino (2 a 4 etapas), em linguagem
   * de negócio: sem nomes de ferramentas.
   */
  flow: string[];
  /** Objetivo em uma frase. */
  summary: string;
  problem: string;
  solution: string;
  /** `true` exibe os passos numerados (use quando forem uma sequência). */
  stepsOrdered?: boolean;
  /** O que a solução faz pelo cliente (benefícios, não detalhes técnicos). */
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
  problem: "O desafio",
  solution: "O que fizemos",
  benefit: "Resultado para o negócio",
  flow: "Como funciona",
  relatedService: "Serviço relacionado",
  relatedProjects: "Exemplos relacionados",
  implementation: "O que a solução faz",
  results: "Resultado verificado",
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

/** Filtros da página /projetos. */
export const projectAreas: Record<ProjectArea, string> = {
  automacao: "Automação",
  integracao: "Integração",
  dados: "Dados",
};

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
  headline: "Soluções que já funcionam na prática",
  intro:
    "Veja como automação e integração tiram o trabalho manual das mãos da equipe e deixam a operação mais ágil, em empresas com desafios parecidos com os seus.",
  items: [
    {
      kind: "fundador",
      slug: "disparo-boletos",
      area: "automacao",
      title: "Cobranças enviadas pelo WhatsApp, sem trabalho manual",
      service: "automacao",
      featured: true,
      benefit:
        "Equipe financeira livre do envio manual, cobranças entregues no prazo e menos erros no contato com o cliente.",
      flow: ["Sistema financeiro", "Automação SSNEX", "WhatsApp do cliente"],
      summary:
        "O financeiro deixou de enviar boleto por boleto. As cobranças chegam ao cliente no canal que ele mais usa.",
      problem:
        "O financeiro enviava cada boleto à mão pelo WhatsApp. Com centenas de cobranças por mês, o envio atrasava, tomava horas da equipe e qualquer erro de digitação virava retrabalho.",
      solution:
        "Criamos uma rotina de cobrança que trabalha sozinha: todos os dias, em horários definidos, ela reúne as cobranças do sistema financeiro, prepara a mensagem com o boleto e entrega ao cliente pelo WhatsApp.",
      steps: [
        "Reúne todas as cobranças do período, sem deixar nenhuma de fora",
        "Envia cada boleto com uma mensagem clara e personalizada",
        "Registra cada envio, para o financeiro acompanhar o que foi entregue",
        "Funciona todos os dias, em horários definidos, sem ninguém precisar lembrar",
      ],
      metrics: [
        { value: "450–600", label: "cobranças por mês" },
        { value: "2", label: "execuções diárias" },
      ],
      metricsVerified: false,
    },
    {
      kind: "fundador",
      slug: "regua-cobranca",
      area: "automacao",
      title: "Régua de cobrança inteligente",
      service: "automacao",
      featured: true,
      benefit:
        "Cobrança organizada e profissional, sem mensagens duplicadas e sem constranger quem já pagou.",
      flow: ["Sistema financeiro", "Régua SSNEX", "WhatsApp do cliente"],
      summary:
        "Cada cliente recebe a mensagem certa, no momento certo, conforme a situação da sua cobrança.",
      problem:
        "Cobrar no dia certo e com o tom certo exige saber em que pé está cada cobrança. Sem esse controle, quem já tinha pago podia receber lembrete, e quem estava em atraso podia ficar sem contato.",
      solution:
        "Desenvolvemos uma régua de cobrança que acompanha cada título do vencimento ao pagamento e decide sozinha quem deve ser lembrado, quando e com qual mensagem.",
      stepsOrdered: true,
      steps: [
        "Acompanha a situação de cada cobrança: em aberto, vencida ou paga",
        "Aplica as regras de contato definidas junto com o financeiro",
        "Envia lembretes antes e depois do vencimento, no tom adequado",
        "Evita mensagens repetidas e não cobra quem já pagou",
        "Guarda o histórico de cada contato realizado",
      ],
      metrics: [{ value: "5", label: "etapas coordenadas" }],
      metricsVerified: false,
    },
    {
      kind: "fundador",
      slug: "vendas-automaticas",
      area: "integracao",
      title: "Vendas do CRM direto no ERP",
      service: "integracao",
      featured: true,
      benefit:
        "Faturamento mais ágil, fim do recadastro e comercial e financeiro trabalhando com os mesmos dados.",
      flow: ["CRM", "Integração SSNEX", "ERP"],
      summary: "Negócio fechado pelo comercial já nasce no sistema de gestão, sem digitar de novo.",
      problem:
        "Cada venda fechada no CRM precisava ser cadastrada outra vez no ERP, à mão. O faturamento atrasava e os dois sistemas mostravam informações diferentes.",
      solution:
        "Conectamos o CRM ao ERP: quando o vendedor fecha o negócio, a venda é criada automaticamente no sistema de gestão, já seguindo as regras de cobrança de vendas avulsas e de contratos recorrentes.",
      steps: [
        "Venda registrada no ERP no momento em que o negócio é fechado",
        "Tratamento próprio para vendas avulsas e para contratos recorrentes",
        "Conferência de cliente e produto antes de registrar, para evitar erros",
      ],
      metrics: [],
      metricsVerified: false,
    },
    {
      kind: "fundador",
      slug: "erp-no-atendimento",
      area: "integracao",
      title: "Dados do ERP dentro do atendimento",
      service: "integracao",
      benefit:
        "Atendimento mais ágil e seguro, com a informação certa na tela de quem está falando com o cliente.",
      flow: ["ERP", "Integração SSNEX", "Atendimento"],
      summary:
        "Quem atende vê cadastro, pedidos e financeiro do cliente na mesma tela da conversa.",
      problem:
        "Para responder dúvidas sobre pedidos e pagamentos, a equipe de atendimento precisava consultar o ERP em outra tela. O cliente ficava esperando e a conversa perdia o ritmo.",
      solution:
        "Integramos o ERP à plataforma de atendimento: as informações do cliente aparecem junto da conversa, prontas para a resposta.",
      steps: [
        "Cadastro, pedidos e situação financeira visíveis durante o atendimento",
        "Informações sempre atualizadas com o sistema de gestão",
        "Respostas sem precisar sair da conversa nem trocar de tela",
      ],
      metrics: [],
      metricsVerified: false,
    },
    {
      kind: "fundador",
      slug: "pagamentos-integrados",
      area: "integracao",
      title: "Pagamentos integrados à gestão",
      service: "integracao",
      benefit:
        "Fechamento financeiro com menos trabalho manual e informações de pagamento sempre à mão.",
      flow: ["Operadora de cartão", "Integração SSNEX", "Gestão financeira"],
      summary: "Vendas e recebimentos chegam aos sistemas da empresa sem conferência manual.",
      problem:
        "As informações de vendas e pagamentos ficavam no portal da operadora de cartão e eram conferidas e repassadas à mão, com risco de erro e atraso no fechamento.",
      solution:
        "Conectamos a operadora de pagamentos aos sistemas da empresa: vendas e recebimentos são coletados e entregues automaticamente a quem precisa deles.",
      steps: [
        "Coleta automática das vendas e dos recebimentos",
        "Informações organizadas e prontas para conferência",
        "Dados entregues aos sistemas que usam essa informação no dia a dia",
      ],
      metrics: [],
      metricsVerified: false,
    },
    {
      kind: "fundador",
      slug: "leads-tempo-real",
      area: "integracao",
      title: "Leads das campanhas direto no CRM",
      service: "integracao",
      featured: true,
      benefit: "Comercial falando com o lead enquanto o interesse ainda está quente.",
      flow: ["Anúncios", "Integração SSNEX", "CRM"],
      summary: "Quem preenche o formulário do anúncio aparece para o comercial na mesma hora.",
      problem:
        "Os leads das campanhas no Facebook e no Instagram chegavam ao comercial com atraso, em planilhas exportadas, e esfriavam antes do primeiro contato.",
      solution:
        "Integramos os formulários dos anúncios ao CRM: cada contato entra no funil em tempo real, com a campanha de origem identificada e pronto para o vendedor agir.",
      steps: [
        "Lead criado no CRM assim que o formulário é enviado",
        "Origem e campanha identificadas em cada contato",
        "Fim das planilhas exportadas e importadas à mão",
      ],
      metrics: [],
      metricsVerified: false,
    },
    {
      kind: "fundador",
      slug: "bi-atendimento",
      area: "dados",
      title: "Indicadores do negócio em um só painel",
      service: "integracao",
      benefit: "Decisões tomadas com base em dados, com a operação inteira visível em um só lugar.",
      flow: ["Atendimento e vendas", "Dados SSNEX", "Painéis de gestão"],
      summary: "Atendimento, vendas, leads e anúncios reunidos em uma única visão para decidir.",
      problem:
        "Os dados de atendimento, vendas, leads e anúncios estavam espalhados em fontes diferentes. Montar um relatório dava trabalho, e a gestão decidia sem enxergar o todo.",
      solution:
        "Centralizamos as informações em uma base única e criamos painéis com os indicadores que a gestão acompanha: atendimento, funil de vendas, origem dos leads e desempenho dos anúncios.",
      steps: [
        "Dados de diferentes áreas reunidos em um só lugar",
        "Indicadores definidos junto com a gestão",
        "Painéis sempre atualizados, sem montar planilhas à mão",
      ],
      metrics: [],
      metricsVerified: false,
    },
    {
      kind: "fundador",
      slug: "scripts-manutencao",
      area: "integracao",
      title: "CRM limpo e confiável",
      service: "integracao",
      benefit:
        "CRM organizado, relatórios em que dá para confiar e equipe trabalhando sobre dados corretos.",
      flow: ["Base desorganizada", "Revisão SSNEX", "CRM confiável"],
      summary: "Correção e carga de dados em massa, com conferência antes de qualquer alteração.",
      problem:
        "Com o tempo, o CRM acumulou oportunidades antigas e duplicadas. Corrigir registro por registro pela tela era inviável e arriscado, e os relatórios perdiam a confiabilidade.",
      solution:
        "Criamos rotinas de limpeza e carga de dados em massa que primeiro mostram tudo o que será alterado e só executam depois da aprovação.",
      steps: [
        "Simulação que mostra cada alteração antes de gravar",
        "Correções em massa, com registro de cada item alterado",
        "Carga de dados para implantações e grandes ajustes",
      ],
      metrics: [],
      metricsVerified: false,
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
    /** Etapas visuais do formulário (todas na mesma tela). */
    steps: ["Sobre você", "O desafio", "Confirmação"],
    progress: (done: number, total: number) => `${done} de ${total} campos obrigatórios`,
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
