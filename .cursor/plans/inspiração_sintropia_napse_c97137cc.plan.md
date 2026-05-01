---
name: Inspiração Sintropia NAPSE
overview: Derivar, a partir de [Sintropia](https://sintropia.app/) padrões de header, movimento e transições; com prioridade explícita em largura e espaçamento homogéneos entre seções (max-w-site, padding horizontal partilhado, um único eixo de padding vertical, sem somar gap global + py duplicado).
todos:
  - id: define-rhythm
    content: Unificar largura (max-w-site + mx-auto + px) e espaçamento vertical (section-y) em todas as seções; remover gap-10/p duplicado em App.tsx; exceções documentadas (Hero, full-bleed)
    status: completed
  - id: header-options
    content: "Decidir: simplificar itens de topo (estilo Sintropia) vs manter grupos; aplicar no Header com mesmos #ids das âncoras"
    status: in_progress
  - id: motion-tokens
    content: "Extrair em utils ou consts: duração, delay stagger, ease compartilhado (Framer); alinhar GSAP só onde fizer efeito único"
    status: pending
  - id: reduced-motion
    content: Garantir fallback com useReducedMotion nas entradas principais
    status: pending
  - id: section-dividers
    content: "Opcional: reforçar corte/gradiente entre 2-3 pares de seções (ex. Trust -> Pillars, Stats -> Pricing) para leitura mais \\\"Sintropia\\\""
    status: pending
isProject: false
---

# Inspiração Sintropia para o site NAPSE

Referência analisada: [Sintropia — sistema para profissionais de saúde](https://sintropia.app/) (navegação, hierarquia de CTA, blocos de funcionalidades, números, suporte, segurança, preços, depoimentos, FAQ e rodapé — conforme a estrutura pública do site; não temos acesso ao repositório deles).

## O que o Sintropia “ensina” (padrões de produto, não de marca)

| Dimensão | Padrão observado | Aplicação à NAPSE |
|----------|------------------|-------------------|
| **Header** | Poucos itens de topo legíveis (ex.: Início, Depoimentos, Funcionalidades, Planos) + ação clara (ex.: Entrar) + menu mobile com mesma lógia | A NAPSE hoje concentra muita navegação em [Header.tsx](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\layout\Header.tsx) (grupos Produto / Confiança / Ajuda). A ideia não é copiar 4 links, e sim: **poucos rótulos no top-level**, acesso secundário por “Ver tudo” ou ancoras no footer, **CTA principal sempre visível** (Sintropia: “Experimente agora” + login). |
| **Espaçamento** | Blocos longos, respiro entre título, subtítulo, prova e CTA; seções de funcionalidade com título de seção repetido e ritmo previsível | **Requisito confirmado (pedido de produto):** largura das seções e espaçamento *entre* seções devem ser **similares** em toda a home. Hoje [App.tsx](c:\Users\jg\Documents\KAIRUS\site_napse\src\App.tsx) adiciona `gap-10` *e* `p-4 sm:p-6` ao contentor, enquanto cada secção (ex. [StatsSection](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\StatsSection.tsx) `py-20 sm:py-28`, [SupportOnboardingSection](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\SupportOnboardingSection.tsx) `py-20 lg:py-32`, [PricingSection](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\PricingSection.tsx) com escalas diferentes) define o seu `py` e `px` com misturas de `px-4`, `lg:px-6`, etc. O [tailwind](c:\Users\jg\Documents\KAIRUS\site_napse\tailwind.config.ts) já define `max-w-site: min(100rem, calc(100vw - 2rem))` — o trabalho é **impor o mesmo padrão de grelha**: conteúdo alinhado em `mx-auto w-full max-w-site` + **um único** conjunto de classes de padding horizontal (ex. `px-4 sm:px-6 lg:px-8`) e **um único eixo** de respiro vertical (ex. `section-y` = `py-16 sm:py-20 lg:py-24` ou o escalão que quiserem), **sem** somar `gap-10` entre secções. |
| **Movimento** | Sensação de “página viva” em scroll: blocos e números entram com leve atraso; cards e FAQ com micro-interação; vídeo/hero com foco em 1 ação + secundária (ex. “veja em ação”) | Já têm [Framer Motion](https://www.framer.com/motion/), Lenis em [MainLayout](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\layout\MainLayout.tsx), [GSAP](c:\Users\jg\Documents\KAIRUS\site_napse\package.json) em seções como [SupportOnboardingSection](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\SupportOnboardingSection.tsx). A inspiração é **padronizar** easing, duração (ex. `0.5–0.7s`), `viewport={{ once: true }}` e *stagger* leve em listas — em vez de cada ficheiro inventar uma curva. |
| **Transições** | Scroll suave entre âncoras; abrir/fechar FAQ; hover em cards e botões; mudança de seção de fundo clara (claro/escuro) | [Lenis](c:\Users\jg\Documents\KAIRUS\site_napse\src\hooks\useLenis.ts) já alinha o scroll. Reparar em: **hover** consistente (elevação/sombra), **acordeão** (FAQ) com altura/opacity, **transição de cor de fundo** entre TrustStrip / Hero e restantes seções. |

## Direções concretas (fases sugeridas)

### 1) Header, ao estilo “escaneável como Sintropia”

- **Opção A (menor mudança)**: manter ancoras, reduzir ruído visual: menos ícones por item no desktop, ou alinhar tamanhos/altura numa única pílula (já trabalharam isso no Header).
- **Opção B (mais alinhada ao Sintropia)**: 4–5 links planos (ex.: Solução, Integrações, Planos, Sobre/Resultados, Contato) + CTA; restantes links em [Footer](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\layout\Footer.tsx) / menu “Mais” num drawer.
- **CTA secundário**: no referencial, “Entrar” diferencia início de funil; na NAPSE, manter **Falar com especialista** (ou alinhar copy ao funil MRR).

### 2) Largura e espaçamento homogéneos (prioridade)

- **Largura:** tudo o que for “conteúdo de leitura” deve partir do mesmo contrato: `max-w-site` (já no [tailwind.config.ts](c:\Users\jg\Documents\KAIRUS\site_napse\tailwind.config.ts)) com `mx-auto w-full` e o **mesmo** `px-` em todas as secções (após auditoria, escolher *uma* escala, ex. `px-4 sm:px-6 lg:px-8`).
- **Espaçamento *entre* secções:** o intervalo percebido vem do **padding vertical** de cada secção, não de `gap` no contentor. Em [App.tsx](c:\Users\jg\Documents\KAIRUS\site_napse\src\App.tsx) **remover** o `flex flex-col gap-10` (e, se fizer sentido, o `p-4 sm:p-6` externo) para evitar “duplo respiro”; opcional: contentor = `w-full` sem padding, e cada `section` recebe o único `section-y` + o mesmo `px-`.
- **Classe utilitária (recomendado):** em [index.css](c:\Users\jg\Documents\KAIRUS\site_napse\src\index.css) (ou `extend` Tailwind) definir p.ex.:
  - `.section-shell` = `mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8` (largura + bordas horizontais alinhadas);
  - `.section-y` = um passo de escala (ex. `py-16 sm:py-20 lg:py-24`) usado de forma **única** no default; exceções pontuais (hero “altíssima”, CTA final com menos ar) anotados no fim do ficheiro ou com modificador (ex. `section-y--tight` / `--hero-only`).
- **Exceções:** [HeroSection](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\HeroSection.tsx) (full-bleed / grelha em 2 colunas) pode manter o seu layout interno, mas o **alinhamento horizontal do texto** deve continuar a respeitar a mesma “coluna lógica” `max-w-site` onde for possível, ou o breakpoint documentado. Secções de faixa contínua ([TrustStrip](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\TrustStrip.tsx)) podem manter 100% de fundo, com conteúdo interno em grelha `max-w-site` + mesmo `px-`.
- **Trabalho mecânico:** rever cada ficheiro em `src/components/sections/*.tsx` + `Footer` + blocos fora de `max-w-site` hoje, substituir combinações soltas de `px/py` por `section-shell` + `section-y` (ou o nome que se fixar) até o ritmo ficar “simétrico” no scroll.

### 3) Animações (inspiradas em “entrada + hierarquia”)

- **Entrada unificada**: título (opacity + y pequeno), sublinha, parágrafo, CTA (delay `0.05–0.15` entre camadas) — padrão já visto no Hero; replicar com variante em [PillarsSection](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\PillarsSection.tsx), [StatsSection](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\StatsSection.tsx), [PricingSection](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\PricingSection.tsx).
- **Stagger** em grelhas (cards, ícones): 4–6 itens com `delay: index * 0.04` (evitar atraso total > ~0,5s).
- **Números/estatística**: já têm contagem; opcional: **reduzir** animações duplicadas (GSAP + Framer) na mesma seção — uma só fonte de “truth”.

### 4) Transições (micro e macro)

- **Scroll**: manter integração header–Lenis (já usada no Header); testar se `scroll-margin-top` no `id` de cada seção bate com altura do header (evitar títulos cortados).
- **Interação**: botões e cards com `transition` e `active:scale-98` leve; FAQ com `layout` + altura (já em [FAQSection](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\FAQSection.tsx)).
- **Corte visual entre seções**: inspiração Sintropia — fundo alterna ou “faixa” separadora; na NAPSE, [TrustStrip](c:\Users\jg\Documents\KAIRUS\site_napse\src\components\sections\TrustStrip.tsx) já cria corte; opcional: **gradiente unificado** entre 2 seções consecutivas para leitura mais contínua.

## O que não fazer (evitar armadilha)

- **Não copiar conteúdo, assets ou marca** da Sintropia; só padrão de informação, hierarquia e movimento.
- **Não acrescentar biblioteca nova** se Framer + Lenis + GSAP já cobrirem; primeiro padronizar tokens e variantes.
- **Não sacrificar acessibilidade** por `prefers-reduced-motion`: respeitar `useReducedMotion` (Framer) em animações de entrada fortes.

## Resumo

O [Sintropia](https://sintropia.app/) funciona como referência de **hierarquia de menu curta, CTAs óbvios, seções gordas e ritmo de scroll com micro-movimentos consistentes**. O pedido explícito atual: **largura e espaçamento *entre* seções alinhados** (mesmo eixo de `px`, mesmo `max-w-site`, `section-y` único, sem `gap-10` em [App.tsx](c:\Users\jg\Documents\KAIRUS\site_napse\src\App.tsx) a duplicar o `py` das secções). Sobre isso, o “contrato” de classes utilitárias e a auditoria secção a secção passam a ser o **núcleo** do primeiro eixo de entrega. Em seguida, padronizar animações/headers fica o refinamento; simplificar o header (menos itens) continua **opcional**.
