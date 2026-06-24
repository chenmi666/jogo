# Deu no Poste — Resultado Oficial do Jogo do Bicho

**Versão 1.0.0** — com scraper automático

Site de resultados de loterias brasileiras: Jogo do Bicho (Deu no Poste) e Loterias da Caixa (Mega Sena, Lotofácil, Quina, etc.).

## Tecnologias

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Bootstrap 4 + CSS personalizado
- Deploy: Zeabur
- Cheerio (scraper)

## Funcionalidades

- Resultados de 10 loterias Caixa + 13 estados do Jogo do Bicho
- Scraper automático: busca resultados do site original sob demanda
- Scheduler inteligente: agenda scraping conforme horário de cada sorteio
- Atualização em tempo real via cliente (LiveResults) + ISR (revalidate=300)
- Notificação Telegram quando scraping falha após 10 tentativas
- Navegação com abas iOS-style (Jogo do Bicho / Loterias da Caixa)
- Breadcrumb visível em todas as páginas
- Dados estruturados (JSON-LD: BreadcrumbList, Article)
- Sitemap dinâmico (34 URLs)
- Google Analytics GA4
- Design responsivo Apple-flat

## Estrutura

```
scripts/
├── scrape.mjs        # Scraper dos sites (--slug para incremental)
├── scheduler.mjs     # Agendador com janela de tolerância
├── schedule.mjs      # Tabela de horários de todos os sorteios
└── start.mjs         # Inicia scheduler + next start juntos
src/
├── app/              # Páginas (Next.js App Router)
├── components/       # Componentes reutilizáveis
│   ├── LiveLotteryResults.tsx  # Polling cliente para loterias
│   └── LiveBichoResults.tsx    # Polling cliente para jogo do bicho
├── lib/
│   └── data.ts       # Leitura centralizada do JSON
├── data/             # Wrappers finos que leem do JSON
└── types/            # Tipos TypeScript
```

## Desenvolvimento

```bash
npm install
npm run scrape   # (opcional) força scraping manual
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build    # scrape + build estático
```

## Produção (com scheduler)

```bash
npm start        # inicia scheduler + servidor Next.js
```

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `TELEGRAM_BOT_TOKEN` | Token do bot do Telegram (alerta de falhas) |
| `TELEGRAM_CHAT_ID` | Chat ID para receber alertas |

## Licença

Este é um projeto privado.
