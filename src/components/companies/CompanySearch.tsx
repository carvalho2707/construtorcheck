import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { Search, Loader2, MapPin, Building2 } from 'lucide-react';
import type { Company } from '@/types';
import { searchCompanies } from '@/lib/firestore';
import { StarRating } from '@/components/reviews/StarRating';
import { StatusBadge } from '@/components/ui/Badge';

interface CompanySearchProps {
  variant?: 'default' | 'hero';
  placeholder?: string;
  onSelect?: (company: Company) => void;
}

export function CompanySearch({
  variant = 'default',
  placeholder = 'Pesquisar empresas...',
  onSelect,
}: CompanySearchProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const companies = await searchCompanies(query);
        setResults(companies);
        setIsOpen(companies.length > 0 || query.length >= 2);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = useCallback((company: Company) => {
    if (onSelect) {
      onSelect(company);
    } else {
      navigate(`/empresa/${company.slug}`);
    }
    setQuery('');
    setIsOpen(false);
  }, [navigate, onSelect]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const isHero = variant === 'hero';

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className={clsx(
          'absolute left-4 top-1/2 -translate-y-1/2',
          isHero ? 'w-6 h-6 text-ink-400' : 'w-5 h-5 text-ink-400'
        )} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={clsx(
            'w-full bg-cream-50 border border-sand-300 text-ink-800',
            'placeholder:text-ink-400',
            'transition-all duration-200',
            'focus:outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-400/20',
            isHero
              ? 'pl-14 pr-6 py-5 text-lg rounded-editorial shadow-editorial'
              : 'pl-12 pr-4 py-3 text-base rounded-editorial'
          )}
        />
        {isLoading && (
          <Loader2 className={clsx(
            'absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-terracotta-500',
            isHero ? 'w-6 h-6' : 'w-5 h-5'
          )} />
        )}
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className={clsx(
              'absolute top-full left-0 right-0 mt-2 z-50',
              'bg-cream-50 border border-sand-200 rounded-editorial shadow-elevated',
              'max-h-[400px] overflow-y-auto'
            )}
          >
            {results.length > 0 ? (
              <ul className="py-2">
                {results.map((company, index) => (
                  <motion.li
                    key={company.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => handleSelect(company)}
                      className={clsx(
                        'w-full px-4 py-3 text-left',
                        'hover:bg-cream-100 transition-colors duration-150',
                        'flex items-center gap-4'
                      )}
                    >
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-editorial bg-terracotta-100 text-terracotta-600 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-ink-800 truncate">
                            {company.name}
                          </span>
                          <StatusBadge status={company.status} size="sm" showIcon={false} />
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-sm text-ink-400">
                            <MapPin className="w-3 h-3" />
                            {company.location.city}
                          </span>
                          <StarRating value={company.avgRating} readonly size="sm" />
                        </div>
                      </div>
                    </button>
                  </motion.li>
                ))}
              </ul>
            ) : query.length >= 2 && !isLoading ? (
              <div className="px-4 py-8 text-center">
                <p className="text-ink-500 mb-2">Nenhuma empresa encontrada</p>
                <p className="text-sm text-ink-400">
                  Não encontramos "{query}". Pode adicionar esta empresa ao escrever uma avaliação.
                </p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
