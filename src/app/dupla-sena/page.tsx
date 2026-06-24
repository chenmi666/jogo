import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryResultCard from "@/components/LotteryResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import ArticleSchema from "@/components/ArticleSchema"
import { caixaLoterias } from "@/data/navigation"
import { duplaSenaResults } from "@/data/loterias/dupla-sena"

export const metadata: Metadata = {
  title: "Dupla Sena",
  description:
    "Resultado da Dupla Sena, confira os números sorteados, valor da premiação e ganhadores.",
  openGraph: {
    title: "Dupla Sena",
    description:
      "Resultado da Dupla Sena, confira os números sorteados, valor da premiação e ganhadores.",
  },
}

export default function DuplaSenaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Dupla Sena", url: "/dupla-sena/" },
        ]}
      />
      <ArticleSchema
        headline="Dupla Sena"
        description="Resultado da Dupla Sena, confira os números sorteados, valor da premiação e ganhadores."
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Dupla Sena", url: "/dupla-sena/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1 className="titulo-paginas text-center">Dupla Sena</h1>
            <p>
              Resultado da Dupla Sena, confira os números sorteados, valor da
              premiação e ganhadores.
            </p>
            <p>
              Os últimos resultados da Dupla Sena são informados nesta página.
            </p>
            <div id="quadrantes">
              {duplaSenaResults.map((result) => (
                <div key={result.id}>
                  <div className="espaco-menor" />
                  <LotteryResultCard
                    result={result}
                    lotteryName="Dupla Sena"
                    cssClass="duplasena"
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
