import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export function Privacy() {
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
            <div className="p-2 rounded-editorial bg-olive-100">
              <Shield className="w-6 h-6 text-olive-600" />
            </div>
            <h1 className="font-display text-display-sm text-ink-900">
              Política de Privacidade
            </h1>
          </div>

          <p className="text-ink-500 mb-8">
            Última atualização: Janeiro de 2025
          </p>

          {/* Content */}
          <div className="prose prose-ink max-w-none space-y-8">
            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                1. Introdução
              </h2>
              <p className="text-ink-600 leading-relaxed">
                A ConstrutorCheck está comprometida em proteger a sua privacidade. Esta Política de
                Privacidade explica como recolhemos, utilizamos, armazenamos e protegemos os seus
                dados pessoais, em conformidade com o Regulamento Geral sobre a Proteção de Dados
                (RGPD) e a legislação portuguesa aplicável.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                2. Responsável pelo Tratamento
              </h2>
              <p className="text-ink-600 leading-relaxed">
                A ConstrutorCheck é responsável pelo tratamento dos seus dados pessoais. Para questões
                relacionadas com privacidade, pode contactar-nos através dos canais disponíveis
                na plataforma.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                3. Dados que Recolhemos
              </h2>
              <div className="text-ink-600 leading-relaxed space-y-3">
                <p>Podemos recolher os seguintes tipos de dados:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Dados de registo:</strong> nome, endereço de email, fotografia de perfil
                    (opcional)
                  </li>
                  <li>
                    <strong>Dados de autenticação:</strong> informações de login através do Google
                    ou credenciais de email/senha
                  </li>
                  <li>
                    <strong>Conteúdo gerado:</strong> avaliações, classificações, fotografias e
                    comentários que submete
                  </li>
                  <li>
                    <strong>Dados de utilização:</strong> informações sobre como utiliza a
                    plataforma, páginas visitadas e interações
                  </li>
                  <li>
                    <strong>Dados técnicos:</strong> endereço IP, tipo de navegador, dispositivo
                    e sistema operativo
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                4. Finalidades do Tratamento
              </h2>
              <div className="text-ink-600 leading-relaxed space-y-3">
                <p>Utilizamos os seus dados para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Criar e gerir a sua conta de utilizador</li>
                  <li>Publicar e exibir as suas avaliações na plataforma</li>
                  <li>Comunicar consigo sobre a sua conta ou avaliações</li>
                  <li>Melhorar e personalizar a experiência na plataforma</li>
                  <li>Garantir a segurança e prevenir fraudes</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                5. Base Legal para o Tratamento
              </h2>
              <div className="text-ink-600 leading-relaxed space-y-3">
                <p>O tratamento dos seus dados baseia-se em:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Execução de contrato:</strong> para fornecer os serviços da plataforma
                  </li>
                  <li>
                    <strong>Consentimento:</strong> quando opta por funcionalidades específicas
                  </li>
                  <li>
                    <strong>Interesses legítimos:</strong> para melhorar os nossos serviços e
                    garantir a segurança
                  </li>
                  <li>
                    <strong>Obrigação legal:</strong> quando exigido por lei
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                6. Partilha de Dados
              </h2>
              <div className="text-ink-600 leading-relaxed space-y-3">
                <p>
                  Não vendemos os seus dados pessoais. Podemos partilhar dados com:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Prestadores de serviços:</strong> como serviços de alojamento (Firebase/Google Cloud)
                    que processam dados em nosso nome
                  </li>
                  <li>
                    <strong>Autoridades:</strong> quando exigido por lei ou para proteger direitos legais
                  </li>
                </ul>
                <p>
                  Os seus dados podem ser transferidos para servidores localizados fora da UE
                  (nomeadamente nos EUA, através do Google/Firebase). Estas transferências são
                  protegidas por cláusulas contratuais-tipo aprovadas pela Comissão Europeia.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                7. Retenção de Dados
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Mantemos os seus dados enquanto a sua conta estiver ativa ou conforme necessário
                para fornecer os nossos serviços. Se eliminar a sua conta, removeremos os seus
                dados pessoais, embora as avaliações possam permanecer de forma anonimizada.
                Alguns dados podem ser retidos por períodos mais longos para cumprir obrigações
                legais.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                8. Os Seus Direitos
              </h2>
              <div className="text-ink-600 leading-relaxed space-y-3">
                <p>Ao abrigo do RGPD, tem os seguintes direitos:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Acesso:</strong> solicitar uma cópia dos seus dados pessoais
                  </li>
                  <li>
                    <strong>Retificação:</strong> corrigir dados incorretos ou incompletos
                  </li>
                  <li>
                    <strong>Apagamento:</strong> solicitar a eliminação dos seus dados ("direito
                    a ser esquecido")
                  </li>
                  <li>
                    <strong>Limitação:</strong> restringir o tratamento dos seus dados
                  </li>
                  <li>
                    <strong>Portabilidade:</strong> receber os seus dados num formato estruturado
                  </li>
                  <li>
                    <strong>Oposição:</strong> opor-se ao tratamento dos seus dados
                  </li>
                  <li>
                    <strong>Retirada de consentimento:</strong> retirar o consentimento a qualquer
                    momento
                  </li>
                </ul>
                <p>
                  Para exercer estes direitos, contacte-nos através dos canais disponíveis na
                  plataforma.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                9. Segurança dos Dados
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Implementamos medidas técnicas e organizacionais adequadas para proteger os seus
                dados contra acesso não autorizado, alteração, divulgação ou destruição. Isto
                inclui encriptação, controlo de acesso e monitorização regular de segurança.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                10. Cookies e Tecnologias Semelhantes
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Utilizamos cookies e tecnologias semelhantes para autenticação, preferências e
                análise de utilização. Pode gerir as suas preferências de cookies através das
                definições do seu navegador. Note que desativar certos cookies pode afetar a
                funcionalidade da plataforma.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                11. Menores
              </h2>
              <p className="text-ink-600 leading-relaxed">
                A nossa plataforma não se destina a menores de 18 anos. Não recolhemos
                conscientemente dados de menores. Se tomarmos conhecimento de que recolhemos
                dados de um menor, tomaremos medidas para eliminar essa informação.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                12. Alterações a Esta Política
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Podemos atualizar esta Política de Privacidade periodicamente. Alterações
                significativas serão comunicadas através da plataforma ou por email. A data
                da última atualização encontra-se no início deste documento.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                13. Reclamações
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Se considerar que os seus direitos de proteção de dados foram violados, tem o
                direito de apresentar uma reclamação junto da Comissão Nacional de Proteção de
                Dados (CNPD) em Portugal, ou da autoridade de controlo do seu país de residência.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
                14. Contacto
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Para questões sobre esta Política de Privacidade ou sobre o tratamento dos seus
                dados pessoais, pode contactar-nos através do email disponível na plataforma.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
