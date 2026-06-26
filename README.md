# Deu no Poste Agora — Resultado Oficial do Jogo do Bicho

**Versão 1.2.0** — validação de dados, auditoria, notificação de inicialização

Site de resultados de loterias brasileiras: Jogo do Bicho (Deu no Poste) e Loterias da Caixa (Mega Sena, Lotofácil, Quina, etc.).

**Domínio:** [deunoposteagora.com](https://deunoposteagora.com)

## Tecnologias

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Bootstrap 4 + CSS personalizado
- Deploy: Zeabur (auto-deploy via GitHub)
- Cheerio (scraper)

## Funcionalidades

- Resultados de 10 loterias Caixa + 13 estados do Jogo do Bicho
- Scraper automático: busca resultados do site original sob demanda
- Scheduler inteligente: agenda scraping conforme horário de cada sorteio
- Atualização em tempo real via cliente (LiveResults) + ISR (revalidate=300)
- Notificação Telegram: inicialização, sucesso e falha do scraping
- Validação de dados: Soma, milhares, grupo/animal consistency
- Auditoria automática: compara dados do site com o original (13 estados)
- Navegação com abas iOS-style (Jogo do Bicho / Loterias da Caixa)
- Breadcrumb visível em todas as páginas
- Dados estruturados (JSON-LD: BreadcrumbList, Article)
- Sitemap dinâmico (34 URLs)
- Google Analytics GA4
- Design responsivo Apple-flat
- PWA com manifest e ícones (192×192, 512×512)
- Super Sete com layout correto de colunas

### Cálculo do 7º prêmio (Multiplicação)

A página inicial exibe o resultado do Rio de Janeiro em formato compacto (7 itens):

| Prêmio | Fórmula |
|--------|---------|
| 1º–5º | Dados originais do sorteio |
| 6º (Soma) | Soma dos 5 milhares |
| 7º (Multiplicação) | `⌊p₁ × p₂ / 1000⌋ % 1000` |

Para sorteios **Federal 20 horas** (RS, MG, PR), usam-se os números completos de 5 dígitos da Loteria Federal como base.

## Estrutura

```
scripts/
├── scrape.mjs        # Scraper dos sites (--slug para incremental)
├── scheduler.mjs     # Agendador com janela de tolerância + Telegram
├── schedule.mjs      # Tabela de horários de todos os sorteios
├── audit.mjs         # Auditoria de dados (npm run audit)
└── start.mjs         # Inicia scheduler + next start juntos
src/
├── app/              # Páginas (Next.js App Router)
├── components/       # Componentes reutilizáveis
├── lib/
│   ├── data.ts       # Leitura centralizada do JSON (build-time, server)
│   └── bicho-utils.ts # Utilitários compartilhados (raw→BichoResult, compactOne)
├── data/             # Wrappers finos que leem do JSON
└── types/            # Tipos TypeScript
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Produção (com scheduler)

```bash
npm start
```

## Auditoria

```bash
npm run audit
```

Compara todos os 13 estados do Jogo do Bicho entre o site original e o espelho. Gera relatório em `public/data/audit-report.json`.

## Licença

Este é um projeto privado.
