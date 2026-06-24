import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryResultCard from "@/components/LotteryResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import ArticleSchema from "@/components/ArticleSchema"
import { caixaLoterias } from "@/data/navigation"
import LiveLotteryResults from "@/components/LiveLotteryResults"
import { lotofacilResults } from "@/data/loterias/lotofacil"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Lotofácil",
  description:
    "Resultado da Lotofácil, confira os números sorteados, valor da premiação e ganhadores da Lotofácil da Caixa Loterias.",
  openGraph: {
    title: "Lotofácil",
    description:
      "Resultado da Lotofácil, confira os números sorteados, valor da premiação e ganhadores da Lotofácil da Caixa Loterias.",
  },
}

export default function LotofacilPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Lotofácil", url: "/lotofacil/" },
        ]}
      />
      <ArticleSchema
        headline="Lotofácil"
        description="Resultado da Lotofácil, confira os números sorteados, valor da premiação e ganhadores da Lotofácil da Caixa Loterias."
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Lotofácil", url: "/lotofacil/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1 className="titulo-paginas text-center">Lotofácil</h1>
            <p>
              Resultado da Lotofácil, confira os números sorteados, valor da
              premiação e ganhadores da Lotofácil da Caixa Loterias.
            </p>
            <p>
              Os últimos resultados da Lotofácil são informados nesta página,
              confira os números sorteados e a quantidade de ganhadores bem como
              o valor pago em cada faixa de acerto.
            </p>
            <div id="quadrantes">
              <LiveLotteryResults initialData={lotofacilResults} slug="lotofacil" lotteryName="Lotofácil" cssClass="lotofacil" />
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
