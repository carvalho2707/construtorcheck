import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { ArrowRight, Shield, Building2, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CompanySearch } from '@/components/companies/CompanySearch';
import { CompanyCard } from '@/components/companies/CompanyCard';
import { CompanyCardSkeleton } from '@/components/ui/Skeleton';
import { getCompanies, getStats } from '@/lib/firestore';
import type { Company } from '@/types';

export function Home() {
  const [featuredCompanies, setFeaturedCompanies] = useState<Company[]>([]);
  const [recentCompanies, setRecentCompanies] = useState<Company[]>([]);
  const [stats, setStats] = useState({ companiesCount: 0, reviewsCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [featured, recent, statsData] = await Promise.all([
          getCompanies({ sortBy: 'rating-high' }, 3),
          getCompanies({ sortBy: 'recent' }, 6),
          getStats(),
        ]);

        setFeaturedCompanies(featured.companies);
        setRecentCompanies(recent.companies);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 paper-texture" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-terracotta-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-olive-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-olive-100 text-olive-700 rounded-full text-sm font-medium mb-6"
            >
              <Shield className="w-4 h-4" />
              Plataforma independente de avaliações
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-display-sm xs:text-display-md sm:text-display-lg lg:text-display-xl text-ink-900 text-balance mb-4 sm:mb-6"
            >
              Partilhe a sua experiência.{' '}
              <span className="text-terracotta-600">Proteja outros consumidores.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-ink-600 leading-relaxed mb-6 sm:mb-8 max-w-2xl"
            >
              Avalie empresas de construção em Portugal. Ajude outros a evitar construtores
              problemáticos e descubra profissionais de confiança.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-xl mb-8"
            >
              <CompanySearch
                variant="hero"
                placeholder="Pesquisar por nome de empresa..."
              />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col xs:flex-row gap-3 sm:gap-4"
            >
              <Link to="/avaliar" className="w-full xs:w-auto">
                <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />} className="w-full xs:w-auto">
                  Escrever Avaliação
                </Button>
              </Link>
              <Link to="/empresas" className="w-full xs:w-auto">
                <Button variant="secondary" size="lg" className="w-full xs:w-auto">
                  Ver Todas as Empresas
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          {(stats.companiesCount > 0 || stats.reviewsCount > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 lg:mt-24 grid grid-cols-2 gap-6 max-w-md"
          >
            {[
              { icon: Building2, value: stats.companiesCount, label: 'Empresas Avaliadas' },
              { icon: Star, value: stats.reviewsCount, label: 'Avaliações Publicadas' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={clsx(
                  'bg-cream-50/80 backdrop-blur-sm border border-sand-200',
                  'rounded-editorial p-6 text-center',
                  'stagger-' + (index + 1),
                  'animate-fade-in-up opacity-0'
                )}
                style={{ animationDelay: `${0.6 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <stat.icon className="w-6 h-6 text-terracotta-500 mx-auto mb-3" />
                <p className="font-display text-2xl lg:text-3xl font-bold text-ink-900">
                  {stat.value.toLocaleString('pt-PT')}
                </p>
                <p className="text-sm text-ink-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
          )}
        </div>
      </section>

      {/* Featured Companies */}
      {featuredCompanies.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream-50 border-y border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-display-sm text-ink-900 mb-2">
                  Empresas Recomendadas
                </h2>
                <p className="text-ink-500">
                  As empresas com melhor avaliação na plataforma
                </p>
              </div>
              <Link
                to="/empresas?sort=rating-high"
                className="hidden sm:flex items-center gap-1 text-terracotta-600 hover:text-terracotta-700 font-medium"
              >
                Ver todas
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <CompanyCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredCompanies.map((company, index) => (
                  <CompanyCard key={company.id} company={company} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Recent Activity */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-display-sm text-ink-900 mb-2">
                Atividade Recente
              </h2>
              <p className="text-ink-500">
                Empresas recentemente avaliadas pela comunidade
              </p>
            </div>
            <Link
              to="/empresas"
              className="hidden sm:flex items-center gap-1 text-terracotta-600 hover:text-terracotta-700 font-medium"
            >
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CompanyCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCompanies.map((company, index) => (
                <CompanyCard key={company.id} company={company} index={index} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/empresas">
              <Button variant="secondary">Ver todas as empresas</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-ink-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-terracotta-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-olive-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-display-md text-cream-50 mb-4"
          >
            Teve uma experiência com um construtor?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-cream-300 mb-8 max-w-2xl mx-auto"
          >
            A sua avaliação pode ajudar outros consumidores a tomar decisões informadas
            e evitar problemas semelhantes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/avaliar">
              <Button
                size="lg"
                className="bg-terracotta-500 hover:bg-terracotta-400"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Partilhar a Minha Experiência
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
