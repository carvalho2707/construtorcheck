import { useState, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import type { Company, CompanyFilters } from '@/types';
import { CompanyCard } from './CompanyCard';
import { CompanyCardSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { getCompanies } from '@/lib/firestore';
import { useStore } from '@/store/useStore';
import { DocumentSnapshot } from 'firebase/firestore';

interface CompanyListProps {
  filters?: CompanyFilters;
}

export function CompanyList({ filters }: CompanyListProps) {
  const { companies, setCompanies, addCompanies, isLoadingCompanies, setIsLoadingCompanies } = useStore();
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCompanies = useCallback(async (isLoadMore = false) => {
    setIsLoadingCompanies(true);
    setError(null);

    try {
      const result = await getCompanies(
        filters,
        12,
        isLoadMore ? lastDoc ?? undefined : undefined
      );

      if (isLoadMore) {
        addCompanies(result.companies);
      } else {
        setCompanies(result.companies);
      }

      setLastDoc(result.lastDoc);
      setHasMore(result.hasMore);
    } catch (err) {
      console.error('Error loading companies:', err);
      setError('Erro ao carregar empresas. Verifique se a base de dados Firestore foi criada.');
      setCompanies([]);
    } finally {
      setIsLoadingCompanies(false);
      setInitialLoad(false);
    }
  }, [filters, lastDoc, setCompanies, addCompanies, setIsLoadingCompanies]);

  useEffect(() => {
    setLastDoc(null);
    loadCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.district, filters?.category, filters?.status, filters?.sortBy]);

  if (initialLoad && isLoadingCompanies) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CompanyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-status-avoid/5 rounded-editorial border border-status-avoid/20">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-status-avoid/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-status-avoid" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-ink-800 mb-2">
          Erro ao carregar
        </h3>
        <p className="text-ink-500 max-w-md mx-auto mb-4">
          {error}
        </p>
        <Button variant="secondary" onClick={() => loadCompanies()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="text-center py-16 bg-cream-50 rounded-editorial border border-sand-200">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-sand-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-sand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-ink-800 mb-2">
          Nenhuma empresa encontrada
        </h3>
        <p className="text-ink-500 max-w-md mx-auto">
          Não encontrámos empresas com os filtros selecionados. Tente ajustar os critérios de pesquisa.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company: Company, index: number) => (
          <CompanyCard key={company.id} company={company} index={index} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            variant="secondary"
            onClick={() => loadCompanies(true)}
            disabled={isLoadingCompanies}
            leftIcon={isLoadingCompanies ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
          >
            {isLoadingCompanies ? 'A carregar...' : 'Ver mais empresas'}
          </Button>
        </div>
      )}
    </div>
  );
}
