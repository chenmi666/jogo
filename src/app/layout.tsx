import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PopupAd from "@/components/PopupAd"
import GoogleAnalytics from "@/components/GoogleAnalytics"

export const metadata: Metadata = {
  title: {
    default: "Deu no Poste - Resultado Oficial Jogo do Bicho",
    template: "%s | Deu no Poste",
  },
  description:
    "Resultado Deu no Poste de hoje, confira o resultado do Jogo do Bicho Oficial do Rio de Janeiro e das Loterias da Caixa.",
  metadataBase: new URL("https://deunoposte.app.br"),
  icons: {
    icon: "/templates/img/favicon/favicon-32x32.png",
    apple: "/templates/img/favicon/apple-icon-180x180.png",
  },
  openGraph: {
    siteName: "Deu no Poste - Resultado Oficial Jogo do Bicho",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#0D47A1" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link
          rel="stylesheet"
          href="/templates/css/bootstrap.min.css"
          crossOrigin="anonymous"
        />
        <link
          href="/templates/css/estilo.css?v=1.32"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        <GoogleAnalytics />
        <Header />
        <div className="conteudo">{children}</div>
        <Footer />
        <PopupAd />
      </body>
    </html>
  )
}
