import type { MetadataRoute } from "next"

const staticPages = [
  { url: "", priority: 1.0 },
  { url: "/mega-sena/", priority: 0.9 },
  { url: "/lotofacil/", priority: 0.9 },
  { url: "/mais-milionaria/", priority: 0.8 },
  { url: "/quina/", priority: 0.9 },
  { url: "/lotomania/", priority: 0.8 },
  { url: "/loteria-federal/", priority: 0.8 },
  { url: "/dupla-sena/", priority: 0.8 },
  { url: "/dia-de-sorte/", priority: 0.8 },
  { url: "/super-sete/", priority: 0.8 },
  { url: "/timemania/", priority: 0.8 },
  { url: "/rio-de-janeiro/", priority: 0.9 },
  { url: "/sao-paulo/", priority: 0.8 },
  { url: "/minas-gerais/", priority: 0.8 },
  { url: "/brasilia/", priority: 0.8 },
  { url: "/paratodos-bahia/", priority: 0.8 },
  { url: "/ceara/", priority: 0.8 },
  { url: "/goias/", priority: 0.8 },
  { url: "/paraiba/", priority: 0.8 },
  { url: "/parana/", priority: 0.8 },
  { url: "/pernambuco/", priority: 0.8 },
  { url: "/rio-grande-do-sul/", priority: 0.8 },
  { url: "/sergipe/", priority: 0.8 },
  { url: "/resultado-nacional/", priority: 0.8 },
  { url: "/puxadas-jogo-do-bicho/", priority: 0.7 },
  { url: "/tabela-jogo-do-bicho/", priority: 0.7 },
  { url: "/politica-de-privacidade/", priority: 0.3 },
  { url: "/termos-de-uso/", priority: 0.3 },
  { url: "/fale-conosco/", priority: 0.3 },
  { url: "/palpites-jogo-do-bicho/", priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://deunoposteagora.com"
  return staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.priority >= 0.9 ? "hourly" as const : "daily" as const,
    priority: page.priority,
  }))
}
