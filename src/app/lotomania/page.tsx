import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryResultCard from "@/components/LotteryResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import ArticleSchema from "@/components/ArticleSchema"
import { caixaLoterias } from "@/data/navigation"
import LiveLotteryResults from "@/components/LiveLotteryResults"
import { lotomaniaResults } from "@/data/loterias/lotomania"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Lotomania",
  description:
    "Resultado da Lotomania, confira os números sorteados, valor da premiação e ganhadores.",
  openGraph: {
    title: "Lotomania",
    description:
      "Resultado da Lotomania, confira os números sorteados, valor da premiação e ganhadores.",
  },
}

export default function LotomaniaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Lotomania", url: "/lotomania/" },
        ]}
      />
      <ArticleSchema
        headline="Lotomania"
        description="Resultado da Lotomania, confira os números sorteados, valor da premiação e ganhadores."
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Lotomania", url: "/lotomania/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1 className="titulo-paginas text-center">Lotomania</h1>
            <p>
              Resultado da Lotomania, confira os números sorteados, valor da
              premiação e ganhadores.
            </p>
            <p>
              Os últimos resultados da Lotomania são informados nesta página.
            </p>
            <div id="quadrantes">
              <LiveLotteryResults initialData={lotomaniaResults} slug="lotomania" lotteryName="Lotomania" cssClass="lotomania" />
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
