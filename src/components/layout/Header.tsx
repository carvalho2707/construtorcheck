import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { Menu, X, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/store/useStore';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/empresas', label: 'Empresas' },
  { href: '/recursos', label: 'Recursos' },
];

export function Header() {
  const location = useLocation();
  const { user, loading } = useAuth();
  const { setLoginModalOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  return (
    <header className={clsx(
      'sticky top-0 z-40',
      'bg-cream-100/95 backdrop-blur-sm',
      'border-b border-sand-200'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-editorial bg-gradient-to-br from-terracotta-500 to-terracotta-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <svg className="w-5 h-5 text-cream-50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2zm0 3.5L18 11v7h-2v-6H8v6H6v-7l6-5.5z" />
              </svg>
            </div>
            <span className="font-display text-lg sm:text-xl font-bold text-ink-900">
              Construtor<span className="text-terracotta-600">Check</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={clsx(
                    'px-4 py-2 text-sm font-medium rounded-editorial',
                    'transition-colors duration-200',
                    isActive
                      ? 'text-terracotta-600 bg-terracotta-50'
                      : 'text-ink-600 hover:text-ink-800 hover:bg-cream-200'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Write Review CTA */}
            {!isHomePage && (
              <Link to="/avaliar">
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<PenLine className="w-4 h-4" />}
                  className="hidden sm:inline-flex"
                >
                  Escrever Avaliação
                </Button>
              </Link>
            )}

            {/* Auth */}
            {!loading && (
              <>
                {user ? (
                  <UserMenu />
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setLoginModalOpen(true)}
                    className="hidden sm:inline-flex"
                  >
                    Entrar
                  </Button>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ink-600 hover:text-ink-800 hover:bg-cream-200 rounded-editorial"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="lg:hidden overflow-hidden border-t border-sand-200"
      >
        <nav className="px-4 py-4 space-y-1 bg-cream-50">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  'block px-4 py-3 text-base font-medium rounded-editorial',
                  'transition-colors duration-200',
                  isActive
                    ? 'text-terracotta-600 bg-terracotta-50'
                    : 'text-ink-600 hover:text-ink-800 hover:bg-cream-100'
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-sand-200 space-y-2">
            <Link
              to="/avaliar"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              <Button variant="primary" className="w-full">
                Escrever Avaliação
              </Button>
            </Link>

            {!user && (
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginModalOpen(true);
                }}
              >
                Entrar
              </Button>
            )}
          </div>
        </nav>
      </motion.div>
    </header>
  );
}
