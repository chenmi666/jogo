import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryResultCard from "@/components/LotteryResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import ArticleSchema from "@/components/ArticleSchema"
import { caixaLoterias } from "@/data/navigation"
import { megaSenaResults } from "@/data/loterias/mega-sena"

export const metadata: Metadata = {
  title: "Mega Sena",
  description:
    "Resultado da Mega Sena, confira os números sorteados, valor da premiação e ganhadores da loteria Mega Sena da Caixa Loterias.",
  openGraph: {
    title: "Mega Sena",
    description:
      "Resultado da Mega Sena, confira os números sorteados, valor da premiação e ganhadores da loteria Mega Sena da Caixa Loterias.",
  },
}

export default function MegaSenaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Mega Sena", url: "/mega-sena/" },
        ]}
      />
      <ArticleSchema
        headline="Mega Sena"
        description="Resultado da Mega Sena, confira os números sorteados, valor da premiação e ganhadores da loteria Mega Sena da Caixa Loterias."
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Mega Sena", url: "/mega-sena/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1 className="titulo-paginas text-center">Mega Sena</h1>
            <p>
              Resultado da Mega Sena, confira os números sorteados, valor da
              premiação e ganhadores da loteria Mega Sena da Caixa Loterias.
            </p>
            <p>
              Os últimos resultados da Mega Sena são informados nesta página,
              confira os números sorteados e a quantidade de ganhadores bem como
              o valor pago em cada faixa de acerto.
            </p>
            <div id="quadrantes">
              {megaSenaResults.map((result) => (
                <div key={result.id}>
                  <div className="espaco-menor" />
                  <LotteryResultCard
                    result={result}
                    lotteryName="Mega-sena"
                    cssClass="megasena"
                  />
                </div>
              ))}
            </div>
            <p>
              A Mega Sena é uma das loterias da Caixa Econômica Federal gerida
              pelo Governo Federal, normalmente os sorteios da Mega Sena ocorrem
              na terça-feira, quinta-feira e sábado.
            </p>
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
