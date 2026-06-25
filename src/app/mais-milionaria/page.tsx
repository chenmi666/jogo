import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryResultCard from "@/components/LotteryResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import ArticleSchema from "@/components/ArticleSchema"
import { caixaLoterias } from "@/data/navigation"
import LiveLotteryResults from "@/components/LiveLotteryResults"
import { maisMilionariaResults } from "@/data/loterias/mais-milionaria"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Mais Milionária",
  description:
    "Resultado da Mais Milionária, confira os números sorteados, valor da premiação e ganhadores da loteria Mais Milionária da Caixa Loterias.",
  openGraph: {
    title: "Mais Milionária",
    description:
      "Resultado da Mais Milionária, confira os números sorteados, valor da premiação e ganhadores da loteria Mais Milionária da Caixa Loterias.",
  },
}

export default function MaisMilionariaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Mais Milionária", url: "/mais-milionaria/" },
        ]}
      />
      <ArticleSchema
        headline="Mais Milionária"
        description="Resultado da Mais Milionária, confira os números sorteados, valor da premiação e ganhadores."
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Mais Milionária", url: "/mais-milionaria/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1 className="titulo-paginas text-center">Mais Milionária</h1>
            <p>
              Resultado da Mais Milionária, confira os números sorteados, valor
              da premiação e ganhadores da loteria Mais Milionária da Caixa
              Loterias.
            </p>
            <p>
              Os últimos resultados da Mais Milionária são informados nesta
              página, confira os números sorteados e a quantidade de ganhadores
              bem como o valor pago em cada faixa de acerto.
            </p>
            <div id="quadrantes">
              <LiveLotteryResults initialData={maisMilionariaResults} slug="mais-milionaria" lotteryName="Mais Milionária" cssClass="maismilionaria" />
            </div>
            <p>
              A Mais Milionária é uma das loterias da Caixa Econômica Federal
              gerida pelo Governo Federal, os sorteios da Mais Milionária
              ocorrem na quarta-feira e sábado.
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
