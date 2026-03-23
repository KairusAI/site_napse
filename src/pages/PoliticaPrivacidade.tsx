import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/**
 * Política de Privacidade – NAPSE.
 * Atende requisitos para aprovação Meta (WhatsApp/Facebook Login) e Google (OAuth, Gmail API, Calendar API).
 * Cobrindo: dados gerais do sistema, WhatsApp (Meta), E-mail (Gmail), Calendário (Google Calendar).
 */
export function PoliticaPrivacidade() {
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
        <h1 className="text-2xl font-bold font-display m-0 mb-2">Política de Privacidade</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Última atualização: fevereiro de 2025. Esta política descreve como o NAPSE coleta, usa, armazena e protege
        os seus dados, incluindo os tratados por meio de integrações com Meta (WhatsApp), Google (Gmail e Google
        Calendar) e demais funcionalidades do sistema.
      </p>

      <section>
        <h2>1. Responsável pelo tratamento (Controlador)</h2>
        <p>
          O responsável pelo tratamento dos dados pessoais no âmbito do aplicativo NAPSE é a entidade que opera o
          serviço e com a qual você (clínica, profissional de saúde ou usuário) mantém relação contratual ou de uso.
          Para exercer os seus direitos ou esclarecer dúvidas sobre esta política, utilize o canal de contato indicado
          no final deste documento.
        </p>
      </section>

      <section>
        <h2>2. Escopo e fontes dos dados</h2>
        <p>
          Esta política aplica-se aos dados pessoais processados pelo NAPSE quando você utiliza o sistema,
          incluindo as funcionalidades de prontuários, agenda, pacientes, documentos, atendimento por WhatsApp, e-mail
          (Gmail) e calendário (Google Calendar). Os dados podem ser fornecidos diretamente por você, gerados pelo uso
          do sistema ou recebidos de terceiros (por exemplo, Meta e Google) no âmbito das integrações autorizadas por
          você.
        </p>
      </section>

      <section>
        <h2>3. Dados coletados e finalidades</h2>

        <h3>3.1 Dados gerais do sistema</h3>
        <ul>
          <li>
            <strong>Conta e perfil:</strong> nome, e-mail, foto (quando fornecida), função/cargo e permissões de acesso,
            para criação de conta, autenticação, gestão de equipe e controle de permissões.
          </li>
          <li>
            <strong>Pacientes e prontuários:</strong> nome, dados de contato, histórico clínico e demais informações
            inseridas nos prontuários e cadastros, para prestação dos serviços de gestão clínica.
          </li>
          <li>
            <strong>Documentos e agenda:</strong> informações vinculadas a documentos e agendamentos (incluindo dados de
            pacientes e profissionais), para organização da clínica e atendimento.
          </li>
          <li>
            <strong>Uso do sistema:</strong> logs de acesso, ações realizadas e endereço IP, para segurança, auditoria e
            melhoria do serviço, na medida do estritamente necessário.
          </li>
        </ul>

        <h3>3.2 Integração WhatsApp (Meta – WhatsApp Business API)</h3>
        <p>
          Quando a clínica vincula um número de WhatsApp ao NAPSE por meio da Meta (Facebook Login for Business /
          Embedded Signup e WhatsApp Cloud API), os seguintes dados podem ser processados:
        </p>
        <ul>
          <li>
            <strong>Identificadores da conta Meta/WhatsApp:</strong> ID da conta WhatsApp Business (WABA), ID do número
            de telefone, tokens de acesso e informações de perfil do negócio, para vincular o número ao sistema e
            permitir o envio e a recepção de mensagens.
          </li>
          <li>
            <strong>Conversas e mensagens:</strong> conteúdo das mensagens (texto e metadados), número e identificador do
            contato do paciente ou usuário que interage com o número da clínica, data/hora das mensagens e status de
            entrega, para exibição no sistema, histórico de atendimento e cumprimento da janela de 24 horas e regras da
            API do WhatsApp.
          </li>
          <li>
            <strong>Status de templates:</strong> status de aprovação ou rejeição de modelos de mensagem enviados à Meta,
            para sincronização e uso de templates aprovados.
          </li>
        </ul>
        <p>
          O processamento é realizado em conformidade com os Termos do WhatsApp Business e da Meta. Os dados de mensagens
          e contatos são utilizados exclusivamente para oferecer a funcionalidade de atendimento via WhatsApp dentro do
          NAPSE (envio, recebimento e exibição no painel da clínica). A Meta atua como processadora/terceira
          receptora nos termos das políticas e termos que você aceita ao usar os serviços da Meta. Para mais
          informações sobre como a Meta e o WhatsApp tratam dados, consulte a Política de Privacidade do WhatsApp e a
          Política de Dados da Meta.
        </p>

        <h3>3.3 Integração E-mail (Google – Gmail)</h3>
        <p>
          Quando você conecta uma conta Gmail ao NAPSE (OAuth 2.0 e Gmail API), o sistema pode acessar:
        </p>
        <ul>
          <li>
            <strong>Conta Google:</strong> endereço de e-mail e nome do perfil, para identificar a conta vinculada e
            exibir no sistema.
          </li>
          <li>
            <strong>E-mails e metadados:</strong> remetente, destinatário, assunto, data, identificadores de mensagens e
            threads e, quando necessário, o corpo das mensagens, para listar conversas, exibir conteúdo e enviar
            respostas por e-mail a partir do NAPSE.
          </li>
        </ul>
        <p>
          O uso dos dados do Gmail limita-se às finalidades descritas na tela de consentimento do Google (escopos
          solicitados) e à política do Google para APIs que acessam dados de usuário. O Google processa dados conforme
          sua própria Política de Privacidade. Recomendamos a leitura da Política de Privacidade do Google e dos
          termos das APIs do Google.
        </p>

        <h3>3.4 Integração Calendário (Google – Google Calendar)</h3>
        <p>
          Quando você conecta o Google Calendar ao NAPSE (OAuth 2.0 e Google Calendar API), o sistema pode
          acessar:
        </p>
        <ul>
          <li>
            <strong>Conta Google:</strong> e-mail e informações básicas do perfil associado ao calendário.
          </li>
          <li>
            <strong>Eventos e metadados:</strong> título, descrição, data/hora de início e fim, participantes,
            recorrência e demais metadados dos eventos dos calendários autorizados, para exibir a agenda, criar,
            editar e excluir eventos a partir do NAPSE.
          </li>
        </ul>
        <p>
          O uso é restrito à gestão de agenda integrada ao calendário do Google, conforme os escopos solicitados e a
          Política de Privacidade e os termos do Google.
        </p>

        <h3>3.5 Login com Google</h3>
        <p>
          Se você optar por “Continuar com Google” no login do NAPSE, serão utilizados o endereço de e-mail, o nome
          e a foto do perfil (quando disponíveis) da sua conta Google apenas para criar ou identificar a sua conta no
          sistema e para autenticação. O processamento obedece aos termos e à política de privacidade do Google.
        </p>

        <h3>3.6 Uso limitado e conformidade com políticas do Google</h3>
        <p>
          O uso de dados de usuário recebidos das APIs do Google (Gmail, Google Calendar) está em conformidade com a
          Política de Dados do Google para APIs, incluindo os requisitos de Limited Use. Não utilizamos esses dados para
          treinar modelos de IA generalizados nem para publicidade direcionada, retargeting ou venda a terceiros.
        </p>
      </section>

      <section>
        <h2>4. Base legal e finalidade</h2>
        <p>
          O tratamento dos dados tem como bases legais, conforme aplicável: execução de contrato ou de medidas
          pré-contratuais; consentimento (por exemplo, ao conectar WhatsApp, Gmail ou Google Calendar); legítimo
          interesse (segurança, auditoria, melhoria do serviço); e cumprimento de obrigação legal. Os dados são
          utilizados estritamente para as finalidades descritas nesta política e para as funcionalidades oferecidas
          pelo NAPSE.
        </p>
      </section>

      <section>
        <h2>5. Compartilhamento e terceiros</h2>
        <ul>
          <li>
            <strong>Meta (Facebook/WhatsApp):</strong> ao usar o WhatsApp pelo NAPSE, identificadores da conta,
            mensagens e metadados necessários ao serviço são processados em conjunto com a infraestrutura e as APIs da
            Meta. A Meta possui suas próprias políticas de privacidade e termos, que se aplicam aos dados que ela
            processa.
          </li>
          <li>
            <strong>Google (Gmail, Calendar, Login):</strong> ao conectar Gmail, Google Calendar ou fazer login com
            Google, os dados necessários são compartilhados com o Google conforme os escopos autorizados. O uso pelo
            Google rege-se pela Política de Privacidade do Google e pelos termos das APIs.
          </li>
          <li>
            <strong>Prestadores de serviço:</strong> podemos utilizar prestadores (hospedagem, e-mail transacional,
            suporte) que processam dados em nosso nome, sob contrato e em conformidade com a lei.
          </li>
          <li>
            <strong>Autoridade e lei:</strong> quando exigido por lei ou ordem judicial, os dados podem ser
            compartilhados com autoridades competentes.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Retenção e exclusão</h2>
        <p>
          Os dados são mantidos pelo tempo necessário para as finalidades descritas e para cumprimento de obrigações
          legais, regulatórias e contábeis. Após o encerramento da conta ou da vinculação de uma integração (por
          exemplo, desconexão do WhatsApp, Gmail ou Google Calendar), os dados associados podem ser anonimizados ou
          excluídos conforme a política interna e a legislação aplicável, salvo retenção obrigatória.
        </p>
      </section>

      <section>
        <h2>7. Segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, perda,
          alteração ou divulgação indevida, incluindo uso de conexões criptografadas (HTTPS), controle de acesso por
          perfil, armazenamento seguro de credenciais e tokens e práticas de desenvolvimento seguro. Os dados tratados
          por terceiros (Meta, Google) estão sujeitos também às políticas de segurança dessas empresas.
        </p>
      </section>

      <section>
        <h2>8. Seus direitos (LGPD e aplicável)</h2>
        <p>
          De acordo com a legislação aplicável (por exemplo, LGPD), você pode solicitar: confirmação da existência de
          tratamento; acesso aos dados; correção de dados incompletos ou desatualizados; anonimização, bloqueio ou
          eliminação de dados desnecessários ou tratados em desconformidade; portabilidade; revogação do consentimento
          (quando aplicável); e informações sobre compartilhamento. Para exercer esses direitos ou revogar o
          consentimento de uma integração (WhatsApp, Gmail, Calendar), utilize as opções disponíveis no sistema
          (por exemplo, desconectar a integração nas configurações) ou entre em contato conosco pelo canal indicado
          abaixo.
        </p>
      </section>

      <section>
        <h2>9. Cookies e tecnologias similares</h2>
        <p>
          O NAPSE pode utilizar cookies e tecnologias similares para autenticação, preferências de sessão e
          segurança. O uso é limitado ao estritamente necessário para o funcionamento do serviço. Você pode configurar
          o navegador para gerenciar ou bloquear cookies, observando que isso pode afetar algumas funcionalidades.
        </p>
      </section>

      <section>
        <h2>10. Menores</h2>
        <p>
          O sistema é voltado a profissionais e clínicas. Não coletamos intencionalmente dados de menores de 18 anos para
          criação de conta de usuário. Dados de menores podem constar em prontuários e cadastros de pacientes quando
          inseridos por profissionais ou responsáveis legais, em conformidade com a lei.
        </p>
      </section>

      <section>
        <h2>11. Alterações nesta política</h2>
        <p>
          Podemos atualizar esta política de privacidade periodicamente. Alterações relevantes serão comunicadas por
          meio do sistema ou por e-mail, quando apropriado. A data da “Última atualização” no topo desta página indica
          a versão mais recente. O uso continuado do NAPSE após a publicação de alterações constitui aceitação das
          novas condições, quando permitido pela lei.
        </p>
      </section>

      <section>
        <h2>12. Contato e canal de privacidade</h2>
        <p>
          Para questões sobre esta política, exercício de direitos de titular de dados ou revogação de integrações,
          entre em contato com o responsável pelo tratamento através do e-mail ou canal indicado nas configurações do
          aplicativo ou no site da operadora do NAPSE. Em caso de uso do sistema por uma clínica ou organização,
          o contato pode ser feito também através do administrador da sua conta.
        </p>
      </section>

      <section>
        <p className="text-sm text-muted-foreground border-t pt-6 mt-8">
          Consulte também os{' '}
          <Link to="/termos-de-servico" className="text-primary hover:underline">
            Termos de Serviço
          </Link>
          {' '}do NAPSE.
        </p>

        <h2>13. Referências a políticas de terceiros</h2>
        <ul>
          <li>
            Meta / Facebook: <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">Política de Privacidade da Meta</a>
          </li>
          <li>
            WhatsApp: <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Política de Privacidade do WhatsApp</a>
          </li>
          <li>
            Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidade do Google</a>
          </li>
        </ul>
      </section>
      </div>
    </div>
  )
}
