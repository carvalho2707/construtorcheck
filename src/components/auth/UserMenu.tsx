import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { User, LogOut, FileText, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/store/useStore';

export function UserMenu() {
  const { user, logout } = useAuth();
  const { addToast } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      addToast('success', 'Sessão terminada');
      setIsOpen(false);
    } catch {
      addToast('error', 'Erro ao terminar sessão');
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-2 px-3 py-2 rounded-editorial',
          'transition-colors duration-200',
          'hover:bg-cream-200',
          isOpen && 'bg-cream-200'
        )}
      >
        {/* Avatar */}
        <div className={clsx(
          'w-8 h-8 rounded-full flex items-center justify-center',
          'bg-terracotta-100 text-terracotta-600'
        )}>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="font-display font-semibold text-sm">
              {user.displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <span className="hidden sm:block text-sm font-medium text-ink-700 max-w-[120px] truncate">
          {user.displayName}
        </span>

        <ChevronDown className={clsx(
          'w-4 h-4 text-ink-400 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={clsx(
              'absolute right-0 mt-2 w-56 py-2',
              'bg-cream-50 rounded-editorial shadow-elevated',
              'border border-sand-200',
              'z-50'
            )}
          >
            {/* User info */}
            <div className="px-4 py-2 border-b border-sand-100">
              <p className="font-medium text-ink-800 truncate">{user.displayName}</p>
              <p className="text-sm text-ink-400 truncate">{user.email}</p>
            </div>

            {/* Menu items */}
            <div className="py-1">
              <Link
                to="/perfil"
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-2 text-sm text-ink-600',
                  'hover:bg-cream-100 hover:text-ink-800',
                  'transition-colors duration-150'
                )}
              >
                <User className="w-4 h-4" />
                O meu perfil
              </Link>
              <Link
                to="/minhas-avaliacoes"
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-2 text-sm text-ink-600',
                  'hover:bg-cream-100 hover:text-ink-800',
                  'transition-colors duration-150'
                )}
              >
                <FileText className="w-4 h-4" />
                As minhas avaliações
              </Link>
            </div>

            {/* Logout */}
            <div className="pt-1 border-t border-sand-100">
              <button
                onClick={handleLogout}
                className={clsx(
                  'flex items-center gap-3 w-full px-4 py-2 text-sm',
                  'text-status-avoid hover:bg-status-avoid/5',
                  'transition-colors duration-150'
                )}
              >
                <LogOut className="w-4 h-4" />
                Terminar sessão
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
