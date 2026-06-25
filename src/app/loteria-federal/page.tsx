import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryResultCard from "@/components/LotteryResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import ArticleSchema from "@/components/ArticleSchema"
import { caixaLoterias } from "@/data/navigation"
import LiveLotteryResults from "@/components/LiveLotteryResults"
import { federalResults } from "@/data/loterias/loteria-federal"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Loteria Federal",
  description:
    "Resultado da Loteria Federal, confira os números sorteados, valor da premiação da Loteria Federal das 19 horas da Caixa Loterias.",
  openGraph: {
    title: "Loteria Federal",
    description:
      "Resultado da Loteria Federal, confira os números sorteados, valor da premiação da Loteria Federal das 19 horas da Caixa Loterias.",
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
              da premiação da Loteria Federal das 19 horas da Caixa Loterias.
            </p>
            <p>
              Os últimos resultados da Loteria Federal são informados nesta
              página, confira os números sorteados do primeiro ao quinto prêmio
              da Federal da Caixa Loterias.
            </p>
            <div id="quadrantes">
              <LiveLotteryResults initialData={federalResults} slug="loteria-federal" lotteryName="Loteria Federal" cssClass="federal" />
            </div>
            <p>
              A Loteria Federal é uma das loterias da Caixa Econômica Federal
              gerida pelo Governo Federal, os sorteios ocorrem na quarta-feira e
              sábado.
            </p>
            <p>
              O site deunoposteagora.com não possui vínculo com pessoas e empresas
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
