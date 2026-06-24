export default function ArticleSchema({
  headline,
  description,
  image,
}: {
  headline: string
  description: string
  image?: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image || "https://deunoposte.app.br/templates/img/logo-deu-no-poste.png",
    author: {
      "@type": "Organization",
      name: "Deu no Poste",
    },
    publisher: {
      "@type": "Organization",
      name: "Deu no Poste",
      logo: {
        "@type": "ImageObject",
        url: "https://deunoposte.app.br/templates/img/logo-deu-no-poste.png",
      },
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
