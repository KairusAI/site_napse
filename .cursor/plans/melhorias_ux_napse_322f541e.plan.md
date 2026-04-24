---
name: Melhorias UX NAPSE
overview: "Aplicar o plano de UX/UI (imagem) à landing NAPSE: WhatsApp com expectativas claras, hero com prova social, navegação mais escaneável, planos com comparação e CTAs, FAQ e rodapé mais completos, depoimentos filtráveis — usando variáveis de ambiente para WhatsApp e redes."
todos:
  - id: config-env
    content: Criar src/config/site.ts + .env.example (WhatsApp, redes, mensagem padrão) e helper wa.me
    status: completed
  - id: whatsapp-contact-fab
    content: "ContactSection: card WhatsApp (horário, CTA, mensagem) + FAB opcional se env definida"
    status: completed
  - id: hero-social-proof
    content: "HeroSection: faixa prova social/logos + CTA secundário #planos"
    status: completed
  - id: header-nav-groups
    content: "Header: submenus Produto/Confiança/Ajuda + rótulos mais claros; scroll spy intacto"
    status: completed
  - id: pricing-table-ctas
    content: "PricingSection: tabela comparativa + links <a> para #contato/WhatsApp por plano"
    status: completed
  - id: faq-objections-wa
    content: "FAQSection: novas perguntas + link WhatsApp no fechamento"
    status: completed
  - id: footer-complete
    content: "Footer: Sobre, Contato, redes condicionais, meios de pagamento"
    status: completed
  - id: testimonials-filters
    content: "TestimonialsSection: filtros por especialidade (role)"
    status: completed
  - id: onboarding-guarantee
    content: "SupportOnboardingSection: reforço garantia/teste alinhado ao FAQ (sem vídeo falso)"
    status: completed
isProject: false
---

# Plano: melhorias UX/UI no site NAPSE

Contexto: a home está montada em [`App.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\App.tsx) (Hero → TrustStrip → Pilares → … → FAQ → Contato). O plano da imagem foi adaptado ao produto **clínica / SaaS**, não a cursos genéricos. Você optou por **placeholders via `.env`** para WhatsApp e redes.

## 1. Configuração central (novo)

- Criar algo como [`src/config/site.ts`](c:\Users\jg\Documents\KAIRUS\site_napse\src\config\site.ts) (ou `env.ts`) que lê `import.meta.env.VITE_WHATSAPP_PHONE`, `VITE_WHATSAPP_MESSAGE`, `VITE_INSTAGRAM_URL`, etc., com fallbacks vazios ou comentados.
- Adicionar [`/.env.example`](c:\Users\jg\Documents\KAIRUS\site_napse\.env.example) documentando as chaves (sem segredos).
- Função utilitária `getWhatsAppUrl(optionalExtraText?)` para montar `https://wa.me/...` com `encodeURIComponent`.

## 2. Público-alvo — WhatsApp e FAQ

- **[`ContactSection.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\ContactSection.tsx)**  
  - Card **WhatsApp** com CTA do tipo “Falar com especialista no WhatsApp”, texto de **horário** (ex.: seg–sex, 8h–18h — ajustar ao que for verdadeiro) e **tempo de resposta** alinhado ao copy já usado (“até 24h” no e-mail).  
  - Link `wa.me` com mensagem pré-definida (da env).  
  - Manter o atalho para FAQ (`/#faq`) ao lado ou logo abaixo, como na imagem.

- **Botão flutuante (opcional mas forte impacto)**  
  - Componente leve (ex. `WhatsAppFloatingButton.tsx`) em [`MainLayout.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\layout\MainLayout.tsx) ou no fim de `HomePage`: só renderiza se `VITE_WHATSAPP_PHONE` estiver definido; `aria-label` e contraste ok.

## 3. Hero — prova social e CTA

- **[`HeroSection.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\HeroSection.tsx)**  
  - Linha curta de **prova social** abaixo do subtítulo: métricas coerentes com [`StatsSection.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\StatsSection.tsx) / copy de produto (ex.: “+X clínicas” só se tiver número real; caso contrário, frase qualitativa + logos).  
  - **Logos**: faixa compacta de parceiros/integrações (reutilizar SVGs já em `public/assets/icons/` onde fizer sentido, ou 3–4 placeholders neutros).  
  - CTA primário: manter roxo; opcional **CTA secundário** outline “Ver planos” → `#planos` para contraste de intenção (como no plano da imagem).

## 4. Navegação — menu mais claro

- **[`Header.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\layout\Header.tsx)**  
  - Reduzir itens soltos agrupando em **submenus** (desktop: hover ou click; mobile: acordeão dentro do drawer): por exemplo **Produto** (`#ecossistema`, `#integracoes`, `#plataforma`), **Confiança** (`#stats`, `#depoimentos`), **Ajuda** (`#faq`, `#suporte`), mantendo **Planos** e **Contato** de topo.  
  - Renomear rótulos para ação/leitura: ex. “Planos” → “Ver planos”, CTA header “Começar agora” → “Falar com especialista” ou manter “Começar agora” se for a marca — escolher **uma** linha e aplicar em desktop + mobile.  
  - Garantir que os `id` das secções e o **scroll spy** continuam consistentes (os `href` `#...` não podem quebrar).

## 5. Planos — autoatendimento

- **[`PricingSection.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\PricingSection.tsx)**  
  - Já existe “**Mais escolhido**” no plano `highlight` — reforçar copy “Melhor custo-benefício” se desejado.  
  - Botões hoje são `button` “Falar com especialista”: trocar por **`<a href={whatsapp ou #contato}>`** com query/hash opcional identificando o plano, ou dois botões: “Assinar / Começar” (contato) + texto secundário.  
  - **Tabela comparativa** abaixo dos cards (desktop) / lista empilhada (mobile): linhas = funcionalidades agregadas dos três planos; colunas = Essencial / Crescimento / Escala; check vazio conforme `plans` (pode exigir estender o tipo `Plan` com `featuresByKey` ou lista unificada de chaves).

## 6. Confiança — “Como funciona”, depoimentos, resultados

- **[`SupportOnboardingSection.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\SupportOnboardingSection.tsx)**  
  - Já tem passos com ícones — acrescentar **1 linha** de garantia (ex.: “14 dias para testar sem cartão”) alinhada ao FAQ existente; **vídeo** só como bloco opcional (embed ou “Em breve”) se houver URL — senão, omitir para não criar expectativa falsa.

- **[`TestimonialsSection.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\TestimonialsSection.tsx)**  
  - Chips de filtro por **especialidade** derivados do campo `role` (Cardiologia, Pediatria, etc.) + opção “Todas”; estado local filtra a lista ou subconjunto exibido.  
  - Vídeo: se não houver assets, não forçar; o plano da imagem fica “preparado” com comentário no código.

- **[`StatsSection.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\StatsSection.tsx)** ou vitrine  
  - Reforço visual leve: ícones ou mini-cards (sem inventar prints se não existirem); se houver imagens de app em [`AppShowcaseSection.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\AppShowcaseSection.tsx), uma frase de ligação “Veja na prática” pode remeter a `#plataforma`.

## 7. FAQ e fechamento

- **[`FAQSection.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\FAQSection.tsx)**  
  - Incluir 2–4 perguntas de **objeção**: experiência prévia, certificado (se aplicável ao produto — senão trocar por “conformidade / LGPD”), suporte humano, cancelamento.  
  - Rodapé do FAQ: além de “Fale conosco”, link **WhatsApp** (se env preenchido) com texto “Prefere o WhatsApp?”.

## 8. Footer

- **[`Footer.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\layout\Footer.tsx)**  
  - Coluna ou linha: **Sobre** (`/#ecossistema` ou página futura), **Contato** (`/#contato`), links legais já existentes.  
  - **Redes**: ícones Instagram / LinkedIn / YouTube só com `href` da env; se vazio, não renderizar o ícone.  
  - **Meios de pagamento**: faixa discreta com nomes ou SVGs genéricos (Pix, cartão) — copy honesta (“formas de pagamento negociadas no contato”) se não houver lista oficial.

## 9. Cruzamento com o plano interno “Responsividade e credibilidade”

- O [`responsividade_e_credibilidade_045ead9f.plan.md`](c:\Users\jg\Documents\KAIRUS\site_napse\.cursor\plans\responsividade_e_credibilidade_045ead9f.plan.md) menciona `@tailwindcss/typography` nas páginas legais e ajustes finos de header/pilares: **incluir no mesmo sprint** apenas se ainda não estiver feito (ver [`package.json`](c:\Users\jg\Documents\KAIRUS\site_napse\package.json) e [`PoliticaPrivacidade.tsx`](c:\Users\jg\Documents\KAIRUS\site_napse\src\pages\PoliticaPrivacidade.tsx)); caso contrário, deixar como follow-up separado para não misturar demais o diff.

## Ordem sugerida de implementação

1. `site.ts` + `.env.example` + util WhatsApp.  
2. ContactSection + FAB WhatsApp.  
3. Hero (prova social + logos + CTA secundário).  
4. Header (agrupamento + labels).  
5. Pricing (links reais + tabela).  
6. FAQ (novas perguntas + link WA).  
7. Footer (links + redes condicionais + pagamentos).  
8. Testimonials (filtros).  
9. SupportOnboarding / Stats (polimento copy + garantia).

## Validação

- Navegação: todos os `#ids` existem no DOM.  
- Sem número WhatsApp na env: não mostrar link quebrado; mostrar só e-mail/contato.  
- Lighthouse: contraste dos novos chips/botões.  
- Mobile: drawer com submenus utilizável com teclado.
