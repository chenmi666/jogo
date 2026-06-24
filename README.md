# Deu no Poste — Resultado Oficial do Jogo do Bicho

**Versão 1.0.0**

Site de resultados de loterias brasileiras: Jogo do Bicho (Deu no Poste) e Loterias da Caixa (Mega Sena, Lotofácil, Quina, etc.).

## Tecnologias

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Bootstrap 4 + CSS personalizado
- Deploy: Zeabur (output standalone)

## Funcionalidades

- Resultados estáticos de 10 loterias Caixa + 12 estados do Jogo do Bicho
- Navegação com abas iOS-style (Jogo do Bicho / Loterias da Caixa)
- Breadcrumb visível em todas as páginas
- Dados estruturados (JSON-LD: BreadcrumbList, Article)
- Sitemap dinâmico (29 URLs)
- Google Analytics GA4
- Design responsivo Apple-flat

## Estrutura

```
src/
├── app/            # Páginas (Next.js App Router)
│   ├── loteria-federal/
│   ├── mega-sena/
│   ├── ...         # 10 loterias + 12 estados + páginas informativas
│   └── sitemap.ts
├── components/     # Componentes reutilizáveis
├── data/           # Dados estáticos (resultados, navegação)
│   ├── loterias/
│   └── jogo-do-bicho/
└── types/          # Tipos TypeScript
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
npm start
```

## Licença

Este é um projeto privado.
