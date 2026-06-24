import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryResultCard from "@/components/LotteryResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import ArticleSchema from "@/components/ArticleSchema"
import { caixaLoterias } from "@/data/navigation"
import { federalResults } from "@/data/loterias/loteria-federal"

export const metadata: Metadata = {
  title: "Loteria Federal",
  description:
    "Resultado da Loteria Federal, confira os números sorteados, valor da premiação e ganhadores.",
  openGraph: {
    title: "Loteria Federal",
    description:
      "Resultado da Loteria Federal, confira os números sorteados, valor da premiação e ganhadores.",
  },
}

export default function LoteriaFederalPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Loteria Federal", url: "/loteria-federal/" },
        ]}
      />
      <ArticleSchema
        headline="Loteria Federal"
        description="Resultado da Loteria Federal, confira os números sorteados, valor da premiação e ganhadores."
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Loteria Federal", url: "/loteria-federal/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1 className="titulo-paginas text-center">Loteria Federal</h1>
            <p>
              Resultado da Loteria Federal, confira os números sorteados, valor
              da premiação e ganhadores.
            </p>
            <p>
              Os últimos resultados da Loteria Federal são informados nesta
              página.
            </p>
            <div id="quadrantes">
              {federalResults.map((result) => (
                <div key={result.id}>
                  <div className="espaco-menor" />
                  <LotteryResultCard
                    result={result}
                    lotteryName="Loteria Federal"
                    cssClass="federal"
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
