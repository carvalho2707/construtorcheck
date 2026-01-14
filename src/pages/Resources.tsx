import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  BookOpen,
  ExternalLink,
  Shield,
  Scale,
  FileText,
  AlertTriangle,
  CheckCircle,
  Phone,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CONSUMER_RESOURCES } from '@/utils/constants';

export function Resources() {
  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-cream-50 border-b border-sand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-2 rounded-editorial bg-olive-100">
              <BookOpen className="w-6 h-6 text-olive-600" />
            </div>
            <h1 className="font-display text-display-sm text-ink-900">
              Recursos para Consumidores
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-ink-500 max-w-2xl"
          >
            Informações úteis sobre os seus direitos enquanto consumidor e recursos
            para resolver problemas com empresas de construção em Portugal.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Quick Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-status-problems" />
              <h2 className="font-display text-xl font-semibold text-ink-900">
                O que fazer se tiver problemas com um construtor
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: 'Documente Tudo',
                  description: 'Tire fotografias dos problemas, guarde todas as comunicações (emails, mensagens, contratos) e mantenha um registo cronológico dos acontecimentos.',
                  icon: FileText,
                },
                {
                  step: 2,
                  title: 'Contacte a Empresa por Escrito',
                  description: 'Envie uma reclamação formal por escrito (email com confirmação de leitura ou carta registada) descrevendo os problemas e solicitando resolução com prazo definido.',
                  icon: Phone,
                },
                {
                  step: 3,
                  title: 'Use o Livro de Reclamações',
                  description: 'Se a empresa não responder satisfatoriamente, apresente uma queixa no Livro de Reclamações (físico ou online). Esta é uma obrigação legal da empresa.',
                  icon: BookOpen,
                },
                {
                  step: 4,
                  title: 'Recorra a Mediação/Arbitragem',
                  description: 'Se o problema persistir, contacte um Centro de Arbitragem de Conflitos de Consumo. É uma forma rápida e gratuita de resolver litígios.',
                  icon: Scale,
                },
                {
                  step: 5,
                  title: 'Considere Ação Legal',
                  description: 'Em último recurso, poderá ser necessário recorrer aos tribunais. Considere consultar um advogado especializado em direito da construção.',
                  icon: Shield,
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className={clsx(
                    'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                    'bg-terracotta-100 text-terracotta-600 font-display font-bold'
                  )}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink-800 mb-1">{item.title}</h3>
                    <p className="text-ink-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Consumer Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-6">
              <Scale className="w-5 h-5 text-olive-600" />
              <h2 className="font-display text-xl font-semibold text-ink-900">
                Os Seus Direitos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Garantia de Obras',
                  description: 'As obras de construção têm uma garantia legal de 5 anos para defeitos estruturais e 2 anos para outros defeitos.',
                },
                {
                  title: 'Orçamento Detalhado',
                  description: 'Tem direito a um orçamento por escrito antes de iniciar qualquer trabalho, com descrição detalhada dos materiais e custos.',
                },
                {
                  title: 'Alterações ao Contrato',
                  description: 'Qualquer alteração ao trabalho acordado deve ser feita por escrito e com o seu consentimento expresso.',
                },
                {
                  title: 'Prazo de Conclusão',
                  description: 'O construtor é obrigado a cumprir o prazo acordado. Atrasos injustificados podem dar direito a indemnização.',
                },
                {
                  title: 'Qualidade dos Materiais',
                  description: 'Os materiais utilizados devem corresponder ao especificado no orçamento. Substituições requerem autorização.',
                },
                {
                  title: 'Licenciamento',
                  description: 'Para obras que exijam licença, o construtor deve garantir que todos os procedimentos legais são cumpridos.',
                },
              ].map((right) => (
                <div key={right.title} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-status-recommended flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-ink-800 mb-1">{right.title}</h3>
                    <p className="text-sm text-ink-500">{right.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* External Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-6">
              <ExternalLink className="w-5 h-5 text-terracotta-600" />
              <h2 className="font-display text-xl font-semibold text-ink-900">
                Entidades de Apoio ao Consumidor
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONSUMER_RESOURCES.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    'flex items-start gap-3 p-4 rounded-editorial',
                    'border border-sand-200 bg-cream-50',
                    'hover:border-terracotta-300 hover:bg-terracotta-50',
                    'transition-colors duration-200 group'
                  )}
                >
                  <div className="p-2 rounded-editorial bg-sand-100 group-hover:bg-terracotta-100 transition-colors">
                    <Shield className="w-4 h-4 text-ink-500 group-hover:text-terracotta-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink-800 group-hover:text-terracotta-700 flex items-center gap-1">
                      {resource.name}
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </h3>
                    <p className="text-sm text-ink-500 mt-0.5">{resource.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-sand-100 rounded-editorial p-6 border border-sand-200"
        >
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-status-problems flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-ink-800 mb-2">Nota Importante</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                As informações apresentadas nesta página são de carácter geral e informativo.
                Para situações específicas, recomendamos a consulta de um advogado ou de
                entidades especializadas em defesa do consumidor. As leis e regulamentos
                podem sofrer alterações, pelo que é importante verificar sempre a legislação
                em vigor.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
