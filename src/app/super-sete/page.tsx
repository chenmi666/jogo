import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryResultCard from "@/components/LotteryResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import ArticleSchema from "@/components/ArticleSchema"
import { caixaLoterias } from "@/data/navigation"
import { superSeteResults } from "@/data/loterias/super-sete"

export const metadata: Metadata = {
  title: "Super Sete",
  description:
    "Resultado do Super Sete, confira os números sorteados, valor da premiação e ganhadores.",
  openGraph: {
    title: "Super Sete",
    description:
      "Resultado do Super Sete, confira os números sorteados, valor da premiação e ganhadores.",
  },
}

export default function SuperSetePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Super Sete", url: "/super-sete/" },
        ]}
      />
      <ArticleSchema
        headline="Super Sete"
        description="Resultado do Super Sete, confira os números sorteados, valor da premiação e ganhadores."
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Super Sete", url: "/super-sete/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1 className="titulo-paginas text-center">Super Sete</h1>
            <p>
              Resultado do Super Sete, confira os números sorteados, valor da
              premiação e ganhadores.
            </p>
            <p>
              Os últimos resultados do Super Sete são informados nesta página.
            </p>
            <div id="quadrantes">
              {superSeteResults.map((result) => (
                <div key={result.id}>
                  <div className="espaco-menor" />
                  <LotteryResultCard
                    result={result}
                    lotteryName="Super Sete"
                    cssClass="supersete"
                  />
                </div>
              ))}
            </div>
            <p>
              O site deunoposte.app.br não possui vínculo com pessoas e empresas
              que realizam apostas, nossa plataforma apenas informa os
              resultados. Não realizamos nenhum tipo de aposta.
            </p>
          </div>
        </div>
        <div className="espaco-menor" />
        <div className="text-center">
          <h4>
            Confira o resultado das principais Loterias no site Deu no Poste!!
          </h4>
        </div>
        <LotteryGrid items={caixaLoterias} />
        <div className="espaco-menor" />
      </div>
    </>
  )
}
