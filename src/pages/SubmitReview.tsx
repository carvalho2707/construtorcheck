import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  PenLine,
  ChevronLeft,
  Building2,
  Calendar,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { StarRatingInput } from '@/components/reviews/StarRating';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/store/useStore';
import { reviewFormSchema, type ReviewFormValues } from '@/utils/validation';
import { DISTRICTS, WORK_CATEGORIES, RATING_CATEGORIES, RECOMMENDATION_OPTIONS, LEGAL_DISCLAIMER } from '@/utils/constants';
import { createOrGetCompany, createReview, getCompanyBySlug } from '@/lib/firestore';
import { calculateOverallRating } from '@/utils/calculations';
import type { Company } from '@/types';

export function SubmitReview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { setLoginModalOpen, addToast } = useStore();

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      companyName: '',
      companyLocation: { district: '' as typeof DISTRICTS[number], city: '' },
      workType: [],
      ratings: {
        qualidadeTrabalho: 0,
        cumprimentoPrazos: 0,
        comunicacao: 0,
        resolucaoProblemas: 0,
        qualidadePreco: 0,
        profissionalismo: 0,
      },
      title: '',
      content: '',
      wouldRecommend: 'yes',
      isAnonymous: false,
    },
  });

  const watchContent = watch('content');
  const watchRatings = watch('ratings');

  // Load company from URL param
  useEffect(() => {
    const companySlug = searchParams.get('empresa');
    if (companySlug) {
      getCompanyBySlug(companySlug).then((company) => {
        if (company) {
          setSelectedCompany(company);
          setValue('companyName', company.name);
          setValue('companyLocation', company.location);
        }
      });
    }
  }, [searchParams, setValue]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      setLoginModalOpen(true);
    }
  }, [user, setLoginModalOpen]);

  const onSubmit = async (data: ReviewFormValues) => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create or get company
      const companyId = selectedCompany?.id || await createOrGetCompany(
        data.companyName,
        data.companyLocation,
        data.workType
      );

      // 2. Calculate overall rating
      const overallRating = calculateOverallRating(data.ratings);

      // 3. Create review
      await createReview({
        companyId,
        userId: user.id,
        userName: user.displayName,
        isAnonymous: data.isAnonymous,
        ratings: data.ratings,
        overallRating,
        title: data.title,
        content: data.content,
        workType: data.workType,
        serviceDate: Timestamp.fromDate(data.serviceDate),
        wouldRecommend: data.wouldRecommend,
        photos: [],
      });

      addToast('success', 'Avaliação publicada com sucesso!');
      navigate(selectedCompany ? `/empresa/${selectedCompany.slug}` : '/empresas');
    } catch (error) {
      console.error('Error submitting review:', error);
      addToast('error', 'Erro ao publicar avaliação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const districtOptions = DISTRICTS.map((d) => ({ value: d, label: d }));
  const categoryOptions = WORK_CATEGORIES.map((c) => ({ value: c.id, label: c.label }));

  const allRatingsProvided = Object.values(watchRatings).every((v) => v > 0);
  const contentLength = watchContent?.length || 0;

  if (!user) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <Card className="max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-terracotta-500 mx-auto mb-4" />
          <h2 className="font-display text-xl font-semibold text-ink-900 mb-2">
            Autenticação Necessária
          </h2>
          <p className="text-ink-500 mb-6">
            Precisa de iniciar sessão para escrever uma avaliação.
          </p>
          <Button onClick={() => setLoginModalOpen(true)}>
            Iniciar Sessão
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-cream-50 border-b border-sand-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700 mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-editorial bg-terracotta-100">
              <PenLine className="w-6 h-6 text-terracotta-600" />
            </div>
            <div>
              <h1 className="font-display text-display-xs text-ink-900">
                Escrever Avaliação
              </h1>
              {selectedCompany && (
                <p className="text-ink-500">sobre {selectedCompany.name}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Info */}
          {!selectedCompany && (
            <Card>
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="w-5 h-5 text-terracotta-600" />
                <h2 className="font-display text-lg font-semibold text-ink-900">
                  Informação da Empresa
                </h2>
              </div>

              <div className="space-y-4">
                <Input
                  label="Nome da Empresa"
                  placeholder="Ex: Construções Silva, Lda"
                  error={errors.companyName?.message}
                  {...register('companyName')}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Controller
                    name="companyLocation.district"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Distrito"
                        options={districtOptions}
                        placeholder="Selecione o distrito"
                        error={errors.companyLocation?.district?.message}
                        {...field}
                      />
                    )}
                  />

                  <Input
                    label="Cidade"
                    placeholder="Ex: Lisboa"
                    error={errors.companyLocation?.city?.message}
                    {...register('companyLocation.city')}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Work Type */}
          <Card>
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">
              Tipo de Trabalho
            </h2>
            <p className="text-sm text-ink-500 mb-4">
              Selecione os tipos de trabalho realizados (pode selecionar vários)
            </p>

            <Controller
              name="workType"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categoryOptions.map((category) => {
                    const isSelected = field.value.includes(category.value);
                    return (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            field.onChange(field.value.filter((v: string) => v !== category.value));
                          } else {
                            field.onChange([...field.value, category.value]);
                          }
                        }}
                        className={clsx(
                          'px-4 py-2.5 rounded-editorial border text-sm font-medium',
                          'transition-all duration-200',
                          isSelected
                            ? 'bg-terracotta-100 border-terracotta-300 text-terracotta-700'
                            : 'bg-cream-50 border-sand-200 text-ink-600 hover:border-sand-300'
                        )}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              )}
            />
            {errors.workType && (
              <p className="mt-2 text-sm text-status-avoid">{errors.workType.message}</p>
            )}
          </Card>

          {/* Ratings */}
          <Card>
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">
              Avaliação por Categoria
            </h2>
            <p className="text-sm text-ink-500 mb-6">
              Avalie cada aspecto do serviço de 1 a 5 estrelas
            </p>

            <div className="space-y-1">
              {RATING_CATEGORIES.map((category) => (
                <Controller
                  key={category.id}
                  name={`ratings.${category.id}` as `ratings.${typeof category.id}`}
                  control={control}
                  render={({ field }) => (
                    <StarRatingInput
                      label={category.label}
                      value={field.value}
                      onChange={field.onChange}
                      error={(errors.ratings?.[category.id as keyof typeof errors.ratings] as { message?: string } | undefined)?.message}
                    />
                  )}
                />
              ))}
            </div>

            {allRatingsProvided && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-olive-50 rounded-editorial border border-olive-200"
              >
                <div className="flex items-center gap-2 text-olive-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">
                    Média: {calculateOverallRating(watchRatings).toFixed(1)} estrelas
                  </span>
                </div>
              </motion.div>
            )}
          </Card>

          {/* Review Content */}
          <Card>
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">
              A Sua Avaliação
            </h2>

            <div className="space-y-4">
              <Input
                label="Título da Avaliação"
                placeholder="Resumo da sua experiência"
                error={errors.title?.message}
                {...register('title')}
              />

              <div>
                <label className="block text-sm font-medium text-ink-700 mb-2">
                  Descrição Detalhada
                </label>
                <textarea
                  className={clsx(
                    'w-full px-4 py-3 bg-cream-50 border rounded-editorial',
                    'text-ink-800 placeholder:text-ink-400',
                    'transition-all duration-200 min-h-[200px] resize-y',
                    'focus:outline-none focus:ring-2 focus:ring-offset-0',
                    errors.content
                      ? 'border-status-avoid focus:border-status-avoid focus:ring-status-avoid/20'
                      : 'border-sand-300 focus:border-terracotta-400 focus:ring-terracotta-400/20'
                  )}
                  placeholder="Descreva a sua experiência em detalhe. O que correu bem? O que poderia ter sido melhor? Recomendaria esta empresa?"
                  {...register('content')}
                />
                <div className="flex justify-between mt-1">
                  {errors.content ? (
                    <p className="text-sm text-status-avoid">{errors.content.message}</p>
                  ) : contentLength < 100 ? (
                    <p className="text-sm text-status-problems">
                      Faltam {100 - contentLength} caracteres
                    </p>
                  ) : (
                    <p className="text-sm text-status-recommended">
                      ✓ Mínimo atingido
                    </p>
                  )}
                  <p className={clsx(
                    'text-sm',
                    contentLength < 100 ? 'text-ink-400' : 'text-ink-500'
                  )}>
                    {contentLength.toLocaleString('pt-PT')} / 5.000
                  </p>
                </div>
              </div>

              <Controller
                name="serviceDate"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-2">
                      Data do Serviço
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                      <input
                        type="date"
                        className={clsx(
                          'w-full pl-12 pr-4 py-3 bg-cream-50 border rounded-editorial',
                          'text-ink-800',
                          'focus:outline-none focus:ring-2 focus:ring-offset-0',
                          errors.serviceDate
                            ? 'border-status-avoid'
                            : 'border-sand-300 focus:border-terracotta-400 focus:ring-terracotta-400/20'
                        )}
                        max={new Date().toISOString().split('T')[0]}
                        value={field.value ? field.value.toISOString().split('T')[0] : ''}
                        onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                      />
                    </div>
                    {errors.serviceDate && (
                      <p className="mt-1 text-sm text-status-avoid">{errors.serviceDate.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          </Card>

          {/* Recommendation */}
          <Card>
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">
              Recomendaria esta empresa?
            </h2>

            <Controller
              name="wouldRecommend"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-3">
                  {RECOMMENDATION_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => field.onChange(option.value)}
                      className={clsx(
                        'flex items-center gap-2 px-5 py-3 rounded-editorial border',
                        'text-sm font-medium transition-all duration-200',
                        field.value === option.value
                          ? option.value === 'yes'
                            ? 'bg-status-recommended/10 border-status-recommended text-status-recommended'
                            : option.value === 'no'
                            ? 'bg-status-avoid/10 border-status-avoid text-status-avoid'
                            : 'bg-status-problems/10 border-status-problems text-status-problems'
                          : 'bg-cream-50 border-sand-200 text-ink-600 hover:border-sand-300'
                      )}
                    >
                      <span className="text-lg">{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            />
          </Card>

          {/* Anonymous option */}
          <Card>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 rounded border-sand-300 text-terracotta-600 focus:ring-terracotta-400"
                {...register('isAnonymous')}
              />
              <div>
                <span className="font-medium text-ink-800">Publicar anonimamente</span>
                <p className="text-sm text-ink-500 mt-0.5">
                  O seu nome não será visível publicamente, mas a sua avaliação será verificada
                </p>
              </div>
            </label>
          </Card>

          {/* Disclaimer */}
          <div className="bg-sand-100 rounded-editorial p-4 border border-sand-200">
            <p className="text-xs text-ink-500 leading-relaxed">
              {LEGAL_DISCLAIMER}
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={!allRatingsProvided}
            >
              {isSubmitting ? 'A publicar...' : 'Publicar Avaliação'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
