/**
 * Seed data script for ObraReview
 * Run with: npm run seed
 *
 * NOTE: This script requires Firebase Admin SDK or you can
 * copy the data below and add it manually via Firebase Console
 */

import { Timestamp } from 'firebase/firestore';

// Helper to generate timestamps in the past
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return Timestamp.fromDate(date);
};

// ============ COMPANIES ============

export const seedCompanies = [
  // Highly rated companies
  {
    name: 'Construções Almeida & Filhos',
    slug: 'construcoes-almeida-filhos',
    location: { district: 'Lisboa', city: 'Lisboa' },
    categories: ['construcao-nova', 'remodelacao', 'acabamentos'],
    avgRating: 4.7,
    ratingsBreakdown: {
      qualidadeTrabalho: 4.8,
      cumprimentoPrazos: 4.5,
      comunicacao: 4.7,
      resolucaoProblemas: 4.6,
      qualidadePreco: 4.6,
      profissionalismo: 4.9,
    },
    reviewsCount: 23,
    status: 'recomendado',
    createdAt: daysAgo(180),
    updatedAt: daysAgo(5),
  },
  {
    name: 'Renovar Portugal',
    slug: 'renovar-portugal',
    location: { district: 'Porto', city: 'Matosinhos' },
    categories: ['remodelacao', 'pintura', 'canalizacao', 'eletricidade'],
    avgRating: 4.5,
    ratingsBreakdown: {
      qualidadeTrabalho: 4.6,
      cumprimentoPrazos: 4.3,
      comunicacao: 4.5,
      resolucaoProblemas: 4.4,
      qualidadePreco: 4.7,
      profissionalismo: 4.5,
    },
    reviewsCount: 18,
    status: 'recomendado',
    createdAt: daysAgo(120),
    updatedAt: daysAgo(12),
  },

  // Mixed reviews companies
  {
    name: 'Obras Rápidas, Lda',
    slug: 'obras-rapidas-lda',
    location: { district: 'Setúbal', city: 'Almada' },
    categories: ['remodelacao', 'pintura', 'carpintaria'],
    avgRating: 3.2,
    ratingsBreakdown: {
      qualidadeTrabalho: 3.5,
      cumprimentoPrazos: 2.8,
      comunicacao: 3.0,
      resolucaoProblemas: 3.2,
      qualidadePreco: 3.5,
      profissionalismo: 3.2,
    },
    reviewsCount: 15,
    status: 'neutro',
    createdAt: daysAgo(200),
    updatedAt: daysAgo(20),
  },
  {
    name: 'Costa & Silva Construções',
    slug: 'costa-silva-construcoes',
    location: { district: 'Braga', city: 'Braga' },
    categories: ['construcao-nova', 'telhados', 'isolamento'],
    avgRating: 2.9,
    ratingsBreakdown: {
      qualidadeTrabalho: 3.2,
      cumprimentoPrazos: 2.5,
      comunicacao: 2.8,
      resolucaoProblemas: 2.7,
      qualidadePreco: 3.0,
      profissionalismo: 3.2,
    },
    reviewsCount: 11,
    status: 'neutro',
    createdAt: daysAgo(150),
    updatedAt: daysAgo(30),
  },

  // Poorly rated companies
  {
    name: 'Construções Fernandes',
    slug: 'construcoes-fernandes',
    location: { district: 'Lisboa', city: 'Sintra' },
    categories: ['construcao-nova', 'remodelacao', 'impermeabilizacao'],
    avgRating: 1.8,
    ratingsBreakdown: {
      qualidadeTrabalho: 2.0,
      cumprimentoPrazos: 1.5,
      comunicacao: 1.8,
      resolucaoProblemas: 1.6,
      qualidadePreco: 2.0,
      profissionalismo: 1.9,
    },
    reviewsCount: 8,
    status: 'com-problemas',
    createdAt: daysAgo(250),
    updatedAt: daysAgo(45),
  },
  {
    name: 'Martins Obras Express',
    slug: 'martins-obras-express',
    location: { district: 'Faro', city: 'Faro' },
    categories: ['remodelacao', 'canalizacao', 'eletricidade'],
    avgRating: 1.3,
    ratingsBreakdown: {
      qualidadeTrabalho: 1.5,
      cumprimentoPrazos: 1.0,
      comunicacao: 1.2,
      resolucaoProblemas: 1.3,
      qualidadePreco: 1.5,
      profissionalismo: 1.3,
    },
    reviewsCount: 6,
    status: 'evitar',
    createdAt: daysAgo(300),
    updatedAt: daysAgo(60),
  },
];

// ============ REVIEWS ============

export const seedReviews = [
  // Reviews for Construções Almeida & Filhos (highly rated)
  {
    companySlug: 'construcoes-almeida-filhos',
    userName: 'Maria Santos',
    isAnonymous: false,
    ratings: {
      qualidadeTrabalho: 5,
      cumprimentoPrazos: 5,
      comunicacao: 5,
      resolucaoProblemas: 5,
      qualidadePreco: 5,
      profissionalismo: 5,
    },
    overallRating: 5.0,
    title: 'Excelente trabalho de remodelação!',
    content: 'Contratámos a Construções Almeida para remodelar a nossa cozinha e casa de banho. Desde o primeiro contacto até à conclusão da obra, tudo correu na perfeição. O Sr. Almeida foi sempre muito profissional, explicou tudo em detalhe e cumpriu rigorosamente o prazo acordado. A equipa foi muito cuidadosa e deixava tudo limpo no final de cada dia. O resultado final superou as nossas expectativas. Recomendo vivamente!',
    workType: ['remodelacao', 'acabamentos'],
    serviceDate: daysAgo(30),
    wouldRecommend: 'yes',
    photos: [],
    helpfulVotes: 12,
    reportCount: 0,
    companyResponse: {
      content: 'Muito obrigado pela sua avaliação, Maria! Foi um prazer trabalhar consigo e com a sua família. Estamos sempre disponíveis para futuros projetos.',
      respondedAt: daysAgo(28),
    },
    createdAt: daysAgo(30),
    updatedAt: daysAgo(28),
  },
  {
    companySlug: 'construcoes-almeida-filhos',
    userName: 'João Pereira',
    isAnonymous: false,
    ratings: {
      qualidadeTrabalho: 5,
      cumprimentoPrazos: 4,
      comunicacao: 5,
      resolucaoProblemas: 4,
      qualidadePreco: 4,
      profissionalismo: 5,
    },
    overallRating: 4.5,
    title: 'Muito satisfeito com a construção da moradia',
    content: 'Construíram a nossa moradia de raiz. O projeto foi complexo mas a equipa do Sr. Almeida mostrou-se sempre à altura. Houve um pequeno atraso de 2 semanas devido ao mau tempo, mas foi-nos comunicado atempadamente. A qualidade dos acabamentos é excelente e já passaram 2 anos sem qualquer problema. O preço foi justo para a qualidade oferecida.',
    workType: ['construcao-nova', 'acabamentos'],
    serviceDate: daysAgo(730),
    wouldRecommend: 'yes',
    photos: [],
    helpfulVotes: 8,
    reportCount: 0,
    companyResponse: null,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(60),
  },

  // Reviews for Construções Fernandes (problematic)
  {
    companySlug: 'construcoes-fernandes',
    userName: 'Anónimo',
    isAnonymous: true,
    ratings: {
      qualidadeTrabalho: 2,
      cumprimentoPrazos: 1,
      comunicacao: 2,
      resolucaoProblemas: 1,
      qualidadePreco: 2,
      profissionalismo: 2,
    },
    overallRating: 1.7,
    title: 'Obra inacabada e garantia não honrada',
    content: 'Contratei esta empresa para a remodelação completa de um apartamento. O orçamento inicial foi de 25.000€ mas acabou por custar quase 40.000€ devido a "imprevistos" que nunca foram devidamente explicados. A obra deveria demorar 3 meses e acabou por demorar 7. Pior ainda, passados 4 meses apareceram fissuras nas paredes e problemas de infiltração. Tentei contactar a empresa várias vezes mas nunca mais atenderam as minhas chamadas. Fui obrigado a contratar outra empresa para corrigir os problemas.',
    workType: ['remodelacao', 'impermeabilizacao'],
    serviceDate: daysAgo(180),
    wouldRecommend: 'no',
    photos: [],
    helpfulVotes: 25,
    reportCount: 0,
    companyResponse: null,
    createdAt: daysAgo(120),
    updatedAt: daysAgo(120),
  },
  {
    companySlug: 'construcoes-fernandes',
    userName: 'Ricardo Oliveira',
    isAnonymous: false,
    ratings: {
      qualidadeTrabalho: 2,
      cumprimentoPrazos: 2,
      comunicacao: 2,
      resolucaoProblemas: 2,
      qualidadePreco: 2,
      profissionalismo: 2,
    },
    overallRating: 2.0,
    title: 'Materiais de qualidade inferior ao acordado',
    content: 'Foram utilizados materiais de qualidade muito inferior aos especificados no orçamento. Apercebi-me disto quando vi as embalagens no lixo da obra. Quando confrontei o responsável, tentou minimizar a situação dizendo que "era a mesma coisa". Tive de insistir muito para que fossem substituídos alguns materiais mais críticos. No final, a obra ficou aceitável mas muito aquém do esperado.',
    workType: ['remodelacao'],
    serviceDate: daysAgo(240),
    wouldRecommend: 'no',
    photos: [],
    helpfulVotes: 18,
    reportCount: 0,
    companyResponse: null,
    createdAt: daysAgo(200),
    updatedAt: daysAgo(200),
  },

  // Reviews for Martins Obras Express (avoid)
  {
    companySlug: 'martins-obras-express',
    userName: 'Ana Rodrigues',
    isAnonymous: false,
    ratings: {
      qualidadeTrabalho: 1,
      cumprimentoPrazos: 1,
      comunicacao: 1,
      resolucaoProblemas: 1,
      qualidadePreco: 2,
      profissionalismo: 1,
    },
    overallRating: 1.2,
    title: 'EVITEM! Pesadelo total',
    content: 'Esta foi a pior experiência que já tive com qualquer empresa de construção. Contratei-os para um trabalho de canalização que deveria demorar 3 dias. Passaram 3 semanas e o trabalho estava ainda por terminar. A equipa aparecia quando queria, às vezes nem aparecia. Quando finalmente "terminaram", havia fugas por todo o lado. Chamadas não atendidas durante meses. Acabei por ter de ir a tribunal. EVITEM a todo o custo!',
    workType: ['canalizacao'],
    serviceDate: daysAgo(365),
    wouldRecommend: 'no',
    photos: [],
    helpfulVotes: 42,
    reportCount: 0,
    companyResponse: null,
    createdAt: daysAgo(300),
    updatedAt: daysAgo(300),
  },

  // Reviews for Obras Rápidas (mixed)
  {
    companySlug: 'obras-rapidas-lda',
    userName: 'Pedro Costa',
    isAnonymous: false,
    ratings: {
      qualidadeTrabalho: 4,
      cumprimentoPrazos: 2,
      comunicacao: 3,
      resolucaoProblemas: 3,
      qualidadePreco: 4,
      profissionalismo: 3,
    },
    overallRating: 3.2,
    title: 'Trabalho aceitável mas prazos impossíveis',
    content: 'O trabalho em si ficou bem feito, a pintura está uniforme e os remates estão bons. No entanto, a gestão de prazos é muito má. Disseram-me 1 semana e demorou quase 3. A comunicação também podia ser melhor - tive de ligar várias vezes para saber o estado da obra. Pelo preço que cobram, é uma opção aceitável se não tiver pressa.',
    workType: ['pintura'],
    serviceDate: daysAgo(90),
    wouldRecommend: 'with-reservations',
    photos: [],
    helpfulVotes: 7,
    reportCount: 0,
    companyResponse: null,
    createdAt: daysAgo(80),
    updatedAt: daysAgo(80),
  },

  // More reviews for Renovar Portugal
  {
    companySlug: 'renovar-portugal',
    userName: 'Sofia Martins',
    isAnonymous: false,
    ratings: {
      qualidadeTrabalho: 5,
      cumprimentoPrazos: 4,
      comunicacao: 5,
      resolucaoProblemas: 4,
      qualidadePreco: 5,
      profissionalismo: 5,
    },
    overallRating: 4.7,
    title: 'Remodelação de casa de banho impecável',
    content: 'Fizeram uma remodelação completa da casa de banho, incluindo canalização e eletricidade. O resultado é fantástico! A equipa foi sempre muito profissional e limpa. O único senão foi um pequeno atraso de 3 dias, mas avisaram com antecedência. O preço foi excelente para a qualidade do trabalho.',
    workType: ['remodelacao', 'canalizacao', 'eletricidade'],
    serviceDate: daysAgo(60),
    wouldRecommend: 'yes',
    photos: [],
    helpfulVotes: 15,
    reportCount: 0,
    companyResponse: null,
    createdAt: daysAgo(45),
    updatedAt: daysAgo(45),
  },
];

// ============ USERS ============

export const seedUsers = [
  {
    email: 'demo@obrareview.pt',
    displayName: 'Utilizador Demo',
    photoURL: null,
    createdAt: daysAgo(365),
    reviewsCount: 3,
  },
];

// ============ INSTRUCTIONS ============

console.log(`
================================================================================
ObraReview - Seed Data
================================================================================

To seed your Firebase database:

1. Go to Firebase Console > Firestore Database
2. Create the following collections manually:
   - companies
   - reviews
   - users
   - votes

3. For each company in seedCompanies above, create a document with those fields

4. For each review in seedReviews above:
   - First, find the companyId for the companySlug
   - Create a review document with that companyId
   - Add a fake oderId for the review

5. Alternatively, you can use Firebase Admin SDK to automate this process

================================================================================
Sample Company Document:
================================================================================
${JSON.stringify(seedCompanies[0], null, 2)}

================================================================================
Sample Review Document:
================================================================================
${JSON.stringify(seedReviews[0], null, 2)}

================================================================================
`);
