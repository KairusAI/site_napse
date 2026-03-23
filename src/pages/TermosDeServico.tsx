import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/**
 * Termos de Serviço – NAPSE.
 * Condições gerais de uso do sistema de gestão clínica, integrações (WhatsApp, Google) e responsabilidades.
 */
export function TermosDeServico() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto p-6 pb-12 prose prose-slate">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary no-underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <div className="flex items-center gap-2">
            <img src="/assets/NAPSE-LogotipoPadrao.svg" alt="" className="h-16 w-16 shrink-0" aria-hidden />
          </div>
        </div>
        <h1 className="text-2xl font-bold font-display m-0 mb-2">Termos de Serviço</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Última atualização: fevereiro de 2025. Estes termos constituem o acordo entre você e o operador do NAPSE
          quanto ao uso da plataforma de gestão clínica, incluindo prontuários, agenda, pacientes, integrações com
          WhatsApp (Meta), e-mail (Gmail) e Google Calendar, e demais funcionalidades oferecidas.
        </p>

        <section>
          <h2>1. Aceitação dos termos</h2>
          <p>
            Ao acessar, registrar-se ou utilizar o NAPSE (“Plataforma” ou “Serviço”), você declara ter lido,
            compreendido e aceito integralmente estes Termos de Serviço (“Termos”). Se você estiver utilizando o
            Serviço em nome de uma clínica, consultório ou organização, você representa que possui autoridade para
            vincular essa entidade a estes Termos. O uso do Serviço implica aceitação da versão dos Termos vigente no
            momento do uso. Caso não concorde com qualquer disposição, não utilize o NAPSE.
          </p>
        </section>

        <section>
          <h2>2. Descrição do serviço</h2>
          <p>
            O NAPSE é uma plataforma de software como serviço (SaaS) voltada à gestão clínica, permitindo, entre
            outras funcionalidades: cadastro e gestão de pacientes; prontuários eletrônicos; agenda e agendamentos;
            gestão de documentos; atendimento e comunicação por WhatsApp (via integração com a Meta/WhatsApp Business
            API); envio e gestão de e-mails (via integração com Gmail/Google); sincronização de calendário (Google
            Calendar); CRM; marketing; tabela de preços; formulários; e ferramentas de produtividade e equipe. O
            escopo exato dos recursos pode variar conforme o plano contratado e as integrações ativadas pelo usuário.
          </p>
          <p>
            O Serviço é oferecido “como está” (as is), dentro dos níveis de disponibilidade e suporte informados no
            contrato ou na documentação do produto. Novas funcionalidades ou alterações podem ser introduzidas a
            critério do operador, com aviso quando aplicável.
          </p>
        </section>

        <section>
          <h2>3. Cadastro, conta e responsabilidade do usuário</h2>
          <ul>
            <li>
              <strong>Veracidade:</strong> Você é responsável por fornecer dados verdadeiros, completos e atualizados
              no cadastro e ao longo do uso. Informações falsas ou enganosas podem resultar em suspensão ou
              encerramento da conta.
            </li>
            <li>
              <strong>Segurança da conta:</strong> Você deve manter a confidencialidade das credenciais de acesso
              (senha, tokens de integração quando aplicável) e é responsável por todas as atividades realizadas em sua
              conta. Notifique-nos imediatamente em caso de uso não autorizado.
            </li>
            <li>
              <strong>Perfis e permissões:</strong> O administrador da conta (ex.: médico responsável) é responsável
              por definir perfis (médico, assistente, recepção etc.) e permissões de acesso, em conformidade com a lei
              e com as políticas internas da clínica.
            </li>
            <li>
              <strong>Uso por menores:</strong> O cadastro e uso do NAPSE são destinados a maiores de 18 anos ou
              representantes legais. Dados de menores podem constar em prontuários quando inseridos por profissionais
              ou responsáveis legais, em conformidade com a legislação.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Uso aceitável e conduta proibida</h2>
          <p>É proibido utilizar o NAPSE para:</p>
          <ul>
            <li>Praticar atos ilegais, fraudulentos ou que violem direitos de terceiros.</li>
            <li>Transmitir conteúdo ofensivo, difamatório, que incite violência ou discriminação, ou que viole
              privacidade ou sigilo profissional (ex.: quebra de sigilo médico quando aplicável).</li>
            <li>Enviar mensagens em massa não solicitadas (spam) via WhatsApp, e-mail ou outros canais integrados, em
              desacordo com as políticas da Meta, do Google e da legislação (ex.: Lei de Spam, regras da WhatsApp
              Business).</li>
            <li>Contornar limitações técnicas, fazer engenharia reversa, descompilar ou tentar extrair código ou
              lógica do Serviço, exceto quando expressamente permitido por lei.</li>
            <li>Utilizar bots, scripts ou automações não autorizadas que sobrecarreguem a infraestrutura ou violem
              termos de APIs de terceiros (Meta, Google).</li>
            <li>Repassar, revender ou sublicenciar o acesso ao Serviço de forma não prevista no contrato.</li>
            <li>Armazenar ou processar dados em desacordo com a LGPD, com o Código de Ética Médica (quando aplicável)
              e com as normas do Conselho Federal de Medicina (CFM) relativas a prontuário eletrônico e telemedicina,
              quando cabíveis.</li>
          </ul>
          <p>
            O descumprimento destas regras pode resultar em advertência, limitação de funcionalidades, suspensão ou
            rescisão da conta, além das medidas legais cabíveis.
          </p>
        </section>

        <section>
          <h2>5. Integrações com terceiros (WhatsApp, Google etc.)</h2>
          <p>
            O NAPSE permite integrações com serviços de terceiros, como WhatsApp (Meta), Gmail e Google
            Calendar. O uso dessas integrações está sujeito:
          </p>
          <ul>
            <li>
              <strong>Aos Termos e políticas dos terceiros:</strong> Ao conectar WhatsApp, Gmail ou Google Calendar,
              você também fica vinculado aos Termos de Uso e Políticas de Privacidade da Meta e do Google,
              respectivamente. É sua responsabilidade conhecê-los e cumpri-los (incluindo regras de template,
              janela de 24 horas e políticas de uso de API).
            </li>
            <li>
              <strong>À sua conta e custos:</strong> Você utiliza suas próprias contas (Meta/WhatsApp Business, Google).
              Custos adicionais cobrados por esses provedores (ex.: mensagens WhatsApp Business) são de sua
              responsabilidade.
            </li>
            <li>
              <strong>À disponibilidade dos terceiros:</strong> A disponibilidade e o funcionamento das integrações
              dependem dos serviços da Meta e do Google. Interrupções, alterações de API ou descontinuação por
              esses provedores podem afetar funcionalidades do NAPSE, sem que isso implique responsabilidade do
              operador do NAPSE por atos ou falhas desses terceiros.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Dados pessoais e privacidade</h2>
          <p>
            O tratamento de dados pessoais no âmbito do NAPSE é regido pela nossa{' '}
            <Link to="/politica-de-privacidade" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
            , que descreve quais dados são coletados, finalidades, bases legais, compartilhamento, retenção, segurança
            e direitos dos titulares (LGPD). Ao utilizar o Serviço, você concorda com essa política. Você é
            responsável por tratar os dados de pacientes e de outros titulares em conformidade com a LGPD, com o
            sigilo profissional e com as normas aplicáveis ao seu exercício profissional.
          </p>
        </section>

        <section>
          <h2>7. Propriedade intelectual</h2>
          <p>
            O NAPSE, incluindo interface, código, marcas, textos e materiais disponíveis na plataforma, é
            protegido por direitos de propriedade intelectual do operador ou de seus licenciadores. É concedida a você
            apenas uma licença limitada, não exclusiva, intransferível e revogável para usar o Serviço conforme estes
            Termos e o contrato aplicável. Você não adquire qualquer direito de propriedade sobre o software ou o
            conteúdo do Serviço. Os dados que você insere (ex.: prontuários, cadastros) permanecem de sua propriedade;
            o operador não os utiliza para outros fins além da prestação do Serviço e conforme a Política de
            Privacidade.
          </p>
        </section>

        <section>
          <h2>8. Pagamento, planos e renovação</h2>
          <p>
            Quando aplicável, planos pagos, preços, formas de pagamento, renovação e cancelamento são regidos pelo
            contrato ou pela página de assinatura disponível no momento da contratação. O não pagamento dentro do
            prazo pode resultar em suspensão ou encerramento do acesso. Reembolsos seguem a política comercial
            informada no contrato ou no site.
          </p>
        </section>

        <section>
          <h2>9. Limitação de responsabilidade</h2>
          <p>
            Na máxima extensão permitida pela lei aplicável:
          </p>
          <ul>
            <li>
              O NAPSE é oferecido como ferramenta de gestão e produtividade. O operador não presta serviços
              médicos, não emite pareceres clínicos e não se responsabiliza por decisões diagnósticas ou terapêuticas
              tomadas pelo usuário. A responsabilidade pelo exercício profissional e pelo conteúdo dos prontuários e
              atendimentos é exclusivamente do profissional de saúde e da clínica.
            </li>
            <li>
              O operador não se responsabiliza por danos indiretos, incidentais, especiais, consequenciais ou
              lucros cessantes decorrentes do uso ou da impossibilidade de uso do Serviço, incluindo falhas de
              terceiros (Meta, Google), interrupções de rede ou perda de dados não causada diretamente por falha
              grave comprovada do operador.
            </li>
            <li>
              A responsabilidade total do operador, quando cabível, limitar-se-á ao valor efetivamente pago pelo
              usuário nos doze meses anteriores ao evento que deu causa ao dano, salvo disposição legal em contrário
              ou dolo.
            </li>
          </ul>
        </section>

        <section>
          <h2>10. Indenização</h2>
          <p>
            Você concorda em indenizar e isentar o operador do NAPSE, suas afiliadas e representantes de
            reclamações, perdas, custas e despesas (incluindo honorários advocatícios razoáveis) decorrentes de: (i)
            uso do Serviço em violação a estes Termos ou à lei; (ii) conteúdo ou dados que você inserir ou transmitir
            pela plataforma; (iii) violação de direitos de terceiros; (iv) descumprimento de obrigações relativas a
            dados pessoais (LGPD) ou sigilo profissional. Esta obrigação permanece após o encerramento do uso do
            Serviço.
          </p>
        </section>

        <section>
          <h2>11. Rescisão e efeitos</h2>
          <p>
            O operador pode suspender ou encerrar o acesso ao NAPSE em caso de violação destes Termos, não
            pagamento quando aplicável, ou por decisão comercial, com aviso prévio quando razoável. Você pode encerrar
            sua conta e o uso do Serviço a qualquer momento, conforme procedimentos disponíveis no sistema ou pelo
            contato de suporte. Após o encerramento, o direito de uso cessa imediatamente. Políticas de retenção e
            exportação de dados após o encerramento constam na Política de Privacidade e, quando aplicável, no
            contrato.
          </p>
        </section>

        <section>
          <h2>12. Alterações nos termos</h2>
          <p>
            O operador pode alterar estes Termos periodicamente. Alterações relevantes serão comunicadas por meio do
            sistema, e-mail ou outro canal adequado. A data da “Última atualização” no topo desta página indica a
            versão vigente. O uso continuado do NAPSE após a publicação de alterações constitui aceitação dos
            novos Termos, na medida permitida pela lei. Se você não concordar com as alterações, deve deixar de
            utilizar o Serviço e encerrar sua conta.
          </p>
        </section>

        <section>
          <h2>13. Lei aplicável e foro</h2>
          <p>
            Estes Termos são regidos pelas leis da República Federativa do Brasil. Eventuais disputas serão submetidas
            ao foro da comarca do domicílio do usuário no Brasil, com renúncia a qualquer outro, por mais privilegiado
            que seja, salvo quando a lei impuser foro específico (ex.: direitos do consumidor).
          </p>
        </section>

        <section>
          <h2>14. Disposições gerais</h2>
          <ul>
            <li>
              <strong>Integralidade:</strong> Estes Termos, em conjunto com a Política de Privacidade e com o
              contrato ou oferta aplicável, constituem o acordo integral entre as partes em relação ao Serviço.
            </li>
            <li>
              <strong>Independentabilidade:</strong> Se qualquer disposição for considerada inválida ou inexequível, as
              demais permanecem em pleno vigor.
            </li>
            <li>
              <strong>Renúncia:</strong> A não exigência de cumprimento de qualquer cláusula não constitui renúncia
              ao direito de exigi-la no futuro.
            </li>
            <li>
              <strong>Comunicação:</strong> Notificações ao usuário podem ser feitas por e-mail cadastrado ou por
              aviso no sistema.
            </li>
          </ul>
        </section>

        <section>
          <h2>15. Contato</h2>
          <p>
            Para dúvidas sobre estes Termos, suporte técnico ou solicitações relacionadas ao Serviço, entre em contato
            pelo e-mail ou canal indicado nas configurações do aplicativo ou no site da operadora do NAPSE. Em
            caso de uso por clínica ou organização, o contato pode ser feito também através do administrador da conta.
          </p>
        </section>

        <p className="text-sm text-muted-foreground border-t pt-6 mt-8">
          Consulte também a{' '}
          <Link to="/politica-de-privacidade" className="text-primary hover:underline">
            Política de Privacidade
          </Link>
          {' '}do NAPSE.
        </p>

        <section>
          <h2>16. Referências a termos de terceiros</h2>
          <ul>
            <li>
              Meta / Facebook: <a href="https://www.facebook.com/terms.php" target="_blank" rel="noopener noreferrer">Termos do Facebook</a>
            </li>
            <li>
              WhatsApp: <a href="https://www.whatsapp.com/legal/terms-of-service" target="_blank" rel="noopener noreferrer">Termos de Serviço do WhatsApp</a>
            </li>
            <li>
              Google: <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Termos de Serviço do Google</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
