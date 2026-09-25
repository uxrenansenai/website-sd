export type CaseVisual = 'lab' | 'edtechLab' | 'audio' | 'commerce' | 'ecommerce' | 'habilita' | 'logosGrid' | 'generic';

export type CaseItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  visual: CaseVisual;
  image?: string;
  logo?: string;
  background?: string;
  illustration?: string;
  logos?: string[];
  imageAlt: string;
};

export const caseFilters = [
  'EdTech & HealthTech',
  'Realidade Estendida',
  'Web',
  'Big Data & Analytics',
  'E muito mais',
] as const;

export const caseItems: CaseItem[] = [
  {
    id: 'senai-lab', title: 'Audio XP', category: 'Realidade Estendida',
    description: 'Aplicativo em Realidade Virtual e Mista (VR/MR), onde o usuário estuda a composição e funcionamento do aparelho auditivo humano.',
    tags: ['Realidade Virtual', 'App', 'Web'], visual: 'audio', logo: '/figma/cases-v2/audioxp-logo.svg', background: '/figma/cases-v2/audioxp-background.png', illustration: '/figma/cases-v2/audioxp-ear.png', image: '/figma/cases-v2/audioxp-ear.png', imageAlt: 'Ilustração do aparelho auditivo do AudioXP',
  },
  {
    id: 'industria', title: 'E-Commerce', category: 'Web',
    description: 'Plataforma para divulgação e comercialização de cursos SENAI/SESI, integrada aos sistemas corporativos para permitir compra, inscrição e matrícula online em todo o estado.',
    tags: ['Web', 'Cloud', 'APIs'], visual: 'ecommerce', background: '/figma/cases-v2/ecommerce-background.png', imageAlt: 'Plataforma E-Commerce com experiência digital e dispositivos conectados',
  },
  {
    id: 'mobile', title: 'E muito mais', category: 'E muito mais',
    description: 'Soluções digitais desenvolvidas para diferentes desafios, setores e jornadas de inovação.',
    tags: [], visual: 'logosGrid', logos: [
      '/figma/cases-v2/more/01-ee.svg', '/figma/cases-v2/more/02-space.svg', '/figma/cases-v2/more/03-lab.svg', '/figma/cases-v2/more/04-nr10.svg', '/figma/cases-v2/more/05-sin.svg',
      '/figma/cases-v2/more/06-seif.svg', '/figma/cases-v2/more/07-saepia.svg', '/figma/cases-v2/more/08-ava-senai.svg', '/figma/cases-v2/more/09-eleva.svg', '/figma/cases-v2/more/10-orbie.svg',
      '/figma/cases-v2/more/11-devstart.svg', '/figma/cases-v2/more/12-crm.svg', '/figma/cases-v2/more/13-dw.svg',
    ], imageAlt: 'Logos de projetos e soluções digitais',
  },
  {
    id: 'inteligencia', title: 'Inteligência para evoluir', category: 'Inteligência Artificial',
    description: 'Dados e inteligência aplicados a decisões mais rápidas, automação de processos e novas possibilidades para a indústria.',
    tags: ['IA', 'Dados', 'Cloud'], visual: 'generic', image: '/figma/cases-v2/raw-4.png', imageAlt: 'Profissional em ambiente industrial',
  },
  {
    id: 'educacao-saude', title: 'SENAI Lab experience', category: 'EdTech & HealthTech',
    description: 'Ambiente imersivo de aprendizagem baseado na Metodologia SENAI, onde alunos interagem com docentes e colegas e colaboram por texto, voz e emojis.',
    tags: ['EdTech', 'Realidade Virtual', 'App'], visual: 'edtechLab', logo: '/figma/cases-v2/edtech-raw-1.png', image: '/figma/cases-v2/edtech-raw-2.png', imageAlt: 'Avatares e interfaces do SENAI Lab experience',
  },
  {
    id: 'dados', title: 'Habilita', category: 'Big Data & Analytics',
    description: 'Programa da FIESC que identifica gaps profissionais na indústria e apoia o diagnóstico e a criação de trilhas de aprendizagem mais eficazes.',
    tags: ['IA', 'Big Data', 'Analytics'], visual: 'habilita', background: '/figma/cases-v2/habilita-background.png', imageAlt: 'Profissional da indústria em frente a uma composição visual laranja',
  },
];

/** Category order is intentionally independent from the projects list so cards can be replaced one by one later. */
export const caseFilterCaseIds = ['educacao-saude', 'senai-lab', 'industria', 'dados', 'mobile'] as const;
