import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2 } from 'lucide-react';
import { CompanyList } from '@/components/companies/CompanyList';
import { CompanyFilters } from '@/components/companies/CompanyFilters';
import { CompanySearch } from '@/components/companies/CompanySearch';
import type { CompanyFilters as FiltersType, CompanyStatus } from '@/types';

export function Companies() {
  const [filters, setFilters] = useState<FiltersType>({ sortBy: 'recent' });

  const handleFilterChange = (newFilters: {
    district?: string;
    category?: string;
    status?: CompanyStatus;
    sortBy: 'recent' | 'rating-high' | 'rating-low' | 'reviews';
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-cream-50 border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-2 rounded-editorial bg-terracotta-100">
              <Building2 className="w-6 h-6 text-terracotta-600" />
            </div>
            <h1 className="font-display text-display-sm text-ink-900">
              Empresas de Construção
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-ink-500 max-w-2xl mb-8"
          >
            Pesquise e compare empresas de construção em Portugal. Veja avaliações
            de outros consumidores antes de contratar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-xl"
          >
            <CompanySearch placeholder="Pesquisar empresa por nome..." />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-8"
        >
          <CompanyFilters onFilterChange={handleFilterChange} />
        </motion.div>

        {/* List */}
        <CompanyList filters={filters} />
      </div>
    </div>
  );
}
