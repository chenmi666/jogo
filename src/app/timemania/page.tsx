import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryResultCard from "@/components/LotteryResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import ArticleSchema from "@/components/ArticleSchema"
import { caixaLoterias } from "@/data/navigation"
import LiveLotteryResults from "@/components/LiveLotteryResults"
import { timemaniaResults } from "@/data/loterias/timemania"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Timemania",
  description:
    "Resultado da Timemania, confira os números sorteados, valor da premiação e ganhadores da loteria Timemania da Caixa Loterias.",
  openGraph: {
    title: "Timemania",
    description:
      "Resultado da Timemania, confira os números sorteados, valor da premiação e ganhadores da loteria Timemania da Caixa Loterias.",
  },
}

export default function TimemaniaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Timemania", url: "/timemania/" },
        ]}
      />
      <ArticleSchema
        headline="Timemania"
        description="Resultado da Timemania, confira os números sorteados, valor da premiação e ganhadores."
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Timemania", url: "/timemania/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1 className="titulo-paginas text-center">Timemania</h1>
            <p>
              Resultado da Timemania, confira os números sorteados, valor da
              premiação e ganhadores da loteria Timemania da Caixa Loterias.
            </p>
            <p>
              Os últimos resultados da Timemania são informados nesta página,
              confira os números sorteados e a quantidade de ganhadores bem como
              o valor pago em cada faixa de acerto.
            </p>
            <div id="quadrantes">
              <LiveLotteryResults initialData={timemaniaResults} slug="timemania" lotteryName="Timemania" cssClass="timemania" />
            </div>
            <p>
              A Timemania é uma das loterias da Caixa Econômica Federal gerida
              pelo Governo Federal, os sorteios da Timemania ocorrem na
              terça-feira, quinta-feira e sábado.
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
