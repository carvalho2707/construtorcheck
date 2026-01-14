import { useSearchParams } from 'react-router-dom';
import { clsx } from 'clsx';
import { Filter, X } from 'lucide-react';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DISTRICTS, WORK_CATEGORIES, SORT_OPTIONS, STATUS_CONFIG } from '@/utils/constants';
import type { CompanyStatus } from '@/types';

interface CompanyFiltersProps {
  onFilterChange: (filters: {
    district?: string;
    category?: string;
    status?: CompanyStatus;
    sortBy: 'recent' | 'rating-high' | 'rating-low' | 'reviews';
  }) => void;
}

export function CompanyFilters({ onFilterChange }: CompanyFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentDistrict = searchParams.get('district') ?? '';
  const currentCategory = searchParams.get('category') ?? '';
  const currentStatus = (searchParams.get('status') ?? '') as CompanyStatus | '';
  const currentSort = (searchParams.get('sort') ?? 'recent') as typeof SORT_OPTIONS[number]['value'];

  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);

    onFilterChange({
      district: newParams.get('district') || undefined,
      category: newParams.get('category') || undefined,
      status: (newParams.get('status') as CompanyStatus) || undefined,
      sortBy: (newParams.get('sort') as 'recent') || 'recent',
    });
  };

  const clearFilters = () => {
    setSearchParams({});
    onFilterChange({ sortBy: 'recent' });
  };

  const hasActiveFilters = currentDistrict || currentCategory || currentStatus;

  const districtOptions = [
    { value: '', label: 'Todos os distritos' },
    ...DISTRICTS.map((d) => ({ value: d, label: d })),
  ];

  const categoryOptions = [
    { value: '', label: 'Todos os serviços' },
    ...WORK_CATEGORIES.map((c) => ({ value: c.id, label: c.label })),
  ];

  const statusOptions = [
    { value: '', label: 'Todos os estados' },
    ...Object.entries(STATUS_CONFIG).map(([key, config]) => ({
      value: key,
      label: config.label,
    })),
  ];

  const sortOptions = SORT_OPTIONS.map((o) => ({ value: o.value, label: o.label }));

  return (
    <div className="bg-cream-50 border border-sand-200 rounded-editorial p-4 lg:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-ink-500" />
        <h3 className="font-display font-semibold text-ink-800">Filtrar</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          options={districtOptions}
          value={currentDistrict}
          onChange={(e) => updateFilters('district', e.target.value)}
          placeholder="Distrito"
        />

        <Select
          options={categoryOptions}
          value={currentCategory}
          onChange={(e) => updateFilters('category', e.target.value)}
          placeholder="Serviço"
        />

        <Select
          options={statusOptions}
          value={currentStatus}
          onChange={(e) => updateFilters('status', e.target.value)}
          placeholder="Estado"
        />

        <Select
          options={sortOptions}
          value={currentSort}
          onChange={(e) => updateFilters('sort', e.target.value)}
        />
      </div>

      {/* Active filters */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-sand-200 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-ink-500">Filtros ativos:</span>

          {currentDistrict && (
            <Badge variant="info" size="md" className="gap-1">
              {currentDistrict}
              <button
                onClick={() => updateFilters('district', '')}
                className="ml-1 hover:text-status-avoid"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {currentCategory && (
            <Badge variant="info" size="md" className="gap-1">
              {WORK_CATEGORIES.find((c) => c.id === currentCategory)?.label}
              <button
                onClick={() => updateFilters('category', '')}
                className="ml-1 hover:text-status-avoid"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {currentStatus && (
            <Badge variant="info" size="md" className="gap-1">
              {STATUS_CONFIG[currentStatus].label}
              <button
                onClick={() => updateFilters('status', '')}
                className="ml-1 hover:text-status-avoid"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className={clsx(
              'ml-auto text-status-avoid hover:bg-status-avoid/10'
            )}
          >
            Limpar tudo
          </Button>
        </div>
      )}
    </div>
  );
}
