import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

export function Terms() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-editorial bg-terracotta-100">
              <FileText className="w-6 h-6 text-terracotta-600" />
            </div>
            <h1 className="font-display text-display-sm text-ink-900">
              Termos de Utilização
            </h1>
          </div>

          <p className="text-ink-500 mb-8">
            Última atualização: Janeiro de 2025
          </p>

          {/* Content */}
          <div className="prose prose-ink max-w-none space-y-8">
            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                1. Aceitação dos Termos
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Ao aceder e utilizar a plataforma ConstrutorCheck, concorda em cumprir e ficar vinculado
                a estes Termos de Utilização. Se não concordar com qualquer parte destes termos,
                não deverá utilizar a nossa plataforma.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                2. Descrição do Serviço
              </h2>
              <p className="text-ink-600 leading-relaxed">
                A ConstrutorCheck é uma plataforma independente que permite aos consumidores partilhar
                e consultar avaliações sobre empresas de construção em Portugal. O nosso objetivo
                é promover a transparência e ajudar os consumidores a tomar decisões informadas.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                3. Registo e Conta
              </h2>
              <div className="text-ink-600 leading-relaxed space-y-3">
                <p>
                  Para submeter avaliações, deve criar uma conta fornecendo informações verdadeiras
                  e atualizadas. É responsável por manter a confidencialidade da sua conta e senha.
                </p>
                <p>
                  Reservamo-nos o direito de suspender ou encerrar contas que violem estes termos
                  ou que sejam utilizadas para fins fraudulentos.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                4. Diretrizes para Avaliações
              </h2>
              <div className="text-ink-600 leading-relaxed space-y-3">
                <p>Ao submeter uma avaliação, compromete-se a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Basear a sua avaliação em experiências reais e verificáveis</li>
                  <li>Ser honesto, justo e objetivo na sua descrição</li>
                  <li>Não incluir linguagem difamatória, obscena ou ofensiva</li>
                  <li>Não publicar informações falsas ou enganosas</li>
                  <li>Não incluir dados pessoais de terceiros sem consentimento</li>
                  <li>Respeitar os direitos de propriedade intelectual</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                5. Conteúdo Proibido
              </h2>
              <div className="text-ink-600 leading-relaxed space-y-3">
                <p>É estritamente proibido publicar conteúdo que:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Seja falso, fraudulento ou enganoso</li>
                  <li>Viole direitos de terceiros</li>
                  <li>Contenha spam, publicidade não autorizada ou conteúdo promocional</li>
                  <li>Incite à violência ou discriminação</li>
                  <li>Viole qualquer lei aplicável em Portugal ou na União Europeia</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                6. Moderação de Conteúdo
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Reservamo-nos o direito de moderar, editar ou remover qualquer conteúdo que viole
                estes termos, sem aviso prévio. As decisões de moderação são finais, embora os
                utilizadores possam contactar-nos para esclarecimentos.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                7. Propriedade Intelectual
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Ao submeter conteúdo na plataforma, concede à ConstrutorCheck uma licença não exclusiva,
                mundial e isenta de royalties para utilizar, reproduzir e exibir esse conteúdo no
                âmbito da operação da plataforma. Mantém todos os direitos sobre o seu conteúdo original.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                8. Limitação de Responsabilidade
              </h2>
              <div className="text-ink-600 leading-relaxed space-y-3">
                <p>
                  A ConstrutorCheck é uma plataforma de intermediação e não verifica a veracidade de
                  todas as avaliações publicadas. Não garantimos a precisão, integridade ou
                  qualidade do conteúdo submetido pelos utilizadores.
                </p>
                <p>
                  Não seremos responsáveis por quaisquer danos diretos, indiretos, incidentais
                  ou consequentes resultantes da utilização da plataforma ou da confiança em
                  avaliações publicadas.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                9. Direito de Resposta
              </h2>
              <p className="text-ink-600 leading-relaxed">
                As empresas avaliadas têm o direito de responder às avaliações publicadas sobre
                os seus serviços. As respostas devem seguir as mesmas diretrizes de conteúdo
                aplicáveis às avaliações.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                10. Alterações aos Termos
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Podemos atualizar estes Termos de Utilização periodicamente. Alterações
                significativas serão comunicadas através da plataforma. A continuação da
                utilização após alterações constitui aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                11. Lei Aplicável
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Estes termos são regidos pela lei portuguesa. Quaisquer disputas serão submetidas
                à jurisdição exclusiva dos tribunais portugueses.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                12. Contacto
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Para questões sobre estes Termos de Utilização, pode contactar-nos através do
                email disponível na plataforma.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
