import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { LEGAL_DISCLAIMER, CONSUMER_RESOURCES } from '@/utils/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-cream-200 mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-editorial bg-terracotta-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-cream-50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2zm0 3.5L18 11v7h-2v-6H8v6H6v-7l6-5.5z" />
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-cream-50">
                ConstrutorCheck
              </span>
            </Link>
            <p className="text-sm text-cream-400 leading-relaxed">
              Plataforma independente de avaliações de empresas de construção em Portugal.
              Ajudamos consumidores a tomar decisões informadas.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-cream-50 mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-cream-400 hover:text-cream-50 transition-colors">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link to="/empresas" className="text-sm text-cream-400 hover:text-cream-50 transition-colors">
                  Pesquisar Empresas
                </Link>
              </li>
              <li>
                <Link to="/avaliar" className="text-sm text-cream-400 hover:text-cream-50 transition-colors">
                  Escrever Avaliação
                </Link>
              </li>
              <li>
                <Link to="/recursos" className="text-sm text-cream-400 hover:text-cream-50 transition-colors">
                  Recursos
                </Link>
              </li>
            </ul>
          </div>

          {/* Consumer Resources */}
          <div>
            <h4 className="font-display font-semibold text-cream-50 mb-4">Defesa do Consumidor</h4>
            <ul className="space-y-2">
              {CONSUMER_RESOURCES.slice(0, 4).map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cream-400 hover:text-cream-50 transition-colors inline-flex items-center gap-1"
                  >
                    {resource.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-cream-50 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/termos" className="text-sm text-cream-400 hover:text-cream-50 transition-colors">
                  Termos de Utilização
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-sm text-cream-400 hover:text-cream-50 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-sm text-cream-400 hover:text-cream-50 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-ink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-cream-500 leading-relaxed max-w-4xl">
            {LEGAL_DISCLAIMER}
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-ink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-cream-600 text-center">
            © {currentYear} ConstrutorCheck. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
