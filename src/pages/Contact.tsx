import { motion } from 'motion/react';
import { Mail, HelpCircle, AlertTriangle, Building2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const CONTACT_EMAIL = 'tiago.s.carvalho1992@gmail.com';

const contactOptions = [
  {
    icon: HelpCircle,
    title: 'Dúvida Geral',
    description: 'Tem uma questão sobre a plataforma ou como funciona?',
    subject: 'Dúvida sobre ConstrutorCheck',
  },
  {
    icon: AlertTriangle,
    title: 'Denunciar Conteúdo',
    description: 'Quer denunciar uma avaliação falsa ou conteúdo inadequado?',
    subject: 'Denúncia de conteúdo - ConstrutorCheck',
  },
  {
    icon: Building2,
    title: 'Sou Dono de Empresa',
    description: 'Representa uma empresa e pretende responder a avaliações?',
    subject: 'Contacto de empresa - ConstrutorCheck',
  },
  {
    icon: Mail,
    title: 'Outro Assunto',
    description: 'Sugestões, parcerias ou qualquer outro assunto.',
    subject: 'Contacto - ConstrutorCheck',
  },
];

export function Contact() {
  const createMailtoLink = (subject: string) => {
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-cream-50 border-b border-sand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-terracotta-100 mb-6">
              <Mail className="w-8 h-8 text-terracotta-600" />
            </div>
            <h1 className="font-display text-display-sm lg:text-display-md text-ink-900 mb-4">
              Contacte-nos
            </h1>
            <p className="text-lg text-ink-500 max-w-2xl mx-auto">
              Tem uma questão, sugestão ou precisa de ajuda? Escolha o assunto
              abaixo e envie-nos um email.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {contactOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              <a
                href={createMailtoLink(option.subject)}
                className="block h-full"
              >
                <Card className="p-6 h-full hover:shadow-elevated transition-shadow duration-200 group">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-editorial bg-terracotta-100 group-hover:bg-terracotta-200 transition-colors">
                      <option.icon className="w-5 h-5 text-terracotta-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-ink-900 mb-1 flex items-center gap-2">
                        {option.title}
                        <ExternalLink className="w-4 h-4 text-ink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-sm text-ink-500">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Direct Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Card className="inline-block p-6 bg-olive-50 border-olive-200">
            <p className="text-olive-700 mb-3">
              Ou envie um email diretamente para:
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2"
            >
              <Button variant="secondary" leftIcon={<Mail className="w-4 h-4" />}>
                {CONTACT_EMAIL}
              </Button>
            </a>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
