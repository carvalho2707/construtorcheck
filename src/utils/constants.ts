export const DISTRICTS = [
  "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco",
  "Coimbra", "Évora", "Faro", "Guarda", "Leiria",
  "Lisboa", "Portalegre", "Porto", "Santarém", "Setúbal",
  "Viana do Castelo", "Vila Real", "Viseu",
  "Açores", "Madeira"
] as const;

export type District = typeof DISTRICTS[number];

export const WORK_CATEGORIES = [
  { id: "construcao-nova", label: "Construção Nova" },
  { id: "remodelacao", label: "Remodelação" },
  { id: "acabamentos", label: "Acabamentos" },
  { id: "canalizacao", label: "Canalização" },
  { id: "eletricidade", label: "Eletricidade" },
  { id: "pintura", label: "Pintura" },
  { id: "telhados", label: "Telhados e Coberturas" },
  { id: "isolamento", label: "Isolamento" },
  { id: "impermeabilizacao", label: "Impermeabilização" },
  { id: "carpintaria", label: "Carpintaria" },
  { id: "serralharia", label: "Serralharia" },
  { id: "piscinas", label: "Piscinas" },
  { id: "jardins", label: "Jardins e Exteriores" },
  { id: "demolicao", label: "Demolição" },
] as const;

export type WorkCategoryId = typeof WORK_CATEGORIES[number]['id'];

export const RATING_CATEGORIES = [
  { id: 'qualidadeTrabalho', label: 'Qualidade do Trabalho', shortLabel: 'Qualidade' },
  { id: 'cumprimentoPrazos', label: 'Cumprimento de Prazos', shortLabel: 'Prazos' },
  { id: 'comunicacao', label: 'Comunicação', shortLabel: 'Comunicação' },
  { id: 'resolucaoProblemas', label: 'Resolução de Problemas', shortLabel: 'Problemas' },
  { id: 'qualidadePreco', label: 'Relação Qualidade/Preço', shortLabel: 'Preço' },
  { id: 'profissionalismo', label: 'Profissionalismo', shortLabel: 'Profissional' },
] as const;

export type RatingCategoryId = typeof RATING_CATEGORIES[number]['id'];

export const STATUS_CONFIG = {
  'recomendado': {
    label: 'Recomendado',
    color: 'status-recommended',
    bgClass: 'bg-status-recommended',
    textClass: 'text-status-recommended',
    description: 'Avaliação média ≥ 4.0',
    minRating: 4.0,
  },
  'neutro': {
    label: 'Neutro',
    color: 'status-neutral',
    bgClass: 'bg-status-neutral',
    textClass: 'text-status-neutral',
    description: 'Avaliação média entre 2.5 e 4.0',
    minRating: 2.5,
  },
  'com-problemas': {
    label: 'Com Problemas',
    color: 'status-problems',
    bgClass: 'bg-status-problems',
    textClass: 'text-status-problems',
    description: 'Avaliação média entre 1.5 e 2.5',
    minRating: 1.5,
  },
  'evitar': {
    label: 'Evitar',
    color: 'status-avoid',
    bgClass: 'bg-status-avoid',
    textClass: 'text-status-avoid',
    description: 'Avaliação média < 1.5',
    minRating: 0,
  },
} as const;

export const RECOMMENDATION_OPTIONS = [
  { value: 'yes', label: 'Sim, recomendo', icon: '👍' },
  { value: 'no', label: 'Não recomendo', icon: '👎' },
  { value: 'with-reservations', label: 'Com reservas', icon: '🤔' },
] as const;

export const SORT_OPTIONS = [
  { value: 'recent', label: 'Mais Recentes' },
  { value: 'rating-high', label: 'Melhor Avaliação' },
  { value: 'rating-low', label: 'Pior Avaliação' },
  { value: 'reviews', label: 'Mais Avaliações' },
] as const;

export const LEGAL_DISCLAIMER = `As avaliações publicadas nesta plataforma representam as opiniões pessoais dos utilizadores. O ConstrutorCheck não verifica a veracidade das informações partilhadas e não se responsabiliza pelo conteúdo das avaliações. Recomendamos que as avaliações sejam factuais e baseadas em experiências reais.`;

export const CONSUMER_RESOURCES = [
  {
    name: 'DECO - Associação de Defesa do Consumidor',
    url: 'https://www.deco.proteste.pt/',
    description: 'Maior associação de defesa do consumidor em Portugal',
  },
  {
    name: 'Portal do Consumidor',
    url: 'https://www.consumidor.gov.pt/',
    description: 'Portal oficial do governo para consumidores',
  },
  {
    name: 'Centro de Arbitragem de Conflitos de Consumo',
    url: 'https://www.arbitragemdeconsumo.org/',
    description: 'Resolução alternativa de litígios de consumo',
  },
  {
    name: 'Livro de Reclamações Online',
    url: 'https://www.livroreclamacoes.pt/',
    description: 'Livro de reclamações eletrónico oficial',
  },
] as const;
