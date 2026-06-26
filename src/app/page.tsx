import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import LiveBichoResults from "@/components/LiveBichoResults"
import { bichoStates, caixaLoterias } from "@/data/navigation"
import { rioDeJaneiroResults } from "@/data/jogo-do-bicho/rio-de-janeiro"
import { compactBichoResult } from "@/lib/bicho-utils"

const latestDate = rioDeJaneiroResults.length > 0 ? rioDeJaneiroResults[0].date : ""
const latestResults = rioDeJaneiroResults.filter((r) => r.date === latestDate)
const rioDeJaneiroResultsCompact = latestResults.map((r) => ({
  ...compactBichoResult(r),
  titulo: "Deu no Poste Rio de Janeiro",
}))

export const revalidate = 300

export const metadata: Metadata = {
  title: "Deu no Poste - Resultado Oficial Jogo do Bicho",
  description:
    "Resultado Deu no Poste de hoje, o site deunoposteagora.com foi criado com o objetivo do apostador conferir o resultado do Jogo do Bicho Deu no Poste do Rio de Janeiro de hoje e de ontem.",
}

export default function Home() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }]} />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }]} />
      <div className="container">
        <div className="espaco"></div>
        <div className="row justify-content-center">
          <div className="texto-simples text-center col-md-8 links-home">
            <h1>Deu no Poste - Resultado Oficial Jogo do Bicho</h1>
            <p>
              Resultado Deu no Poste de hoje, o site deunoposteagora.com foi criado com o objetivo do apostador conferir o resultado do Deu no Poste do Jogo do Bicho Oficial do Rio de Janeiro de hoje e de ontem, confira a milhar sorteada em cada faixa de premiação e o respectivo bicho. <strong>Selecione abaixo o horário da aposta e confira os números sorteados.</strong>
            </p>

          </div>
        </div>
        <div className="row justify-content-center quadrantes-home">
          <LiveBichoResults initialData={rioDeJaneiroResultsCompact} slug="rio-de-janeiro" compact />
        </div>

        <div id="resultado-banca"></div>
        <div className="espaco-menor"></div>
        <h5 className="text-center">Principais Bancas</h5>
        <div className="row justify-content-center">
          <div className="texto-simples text-center col-md-8">
            <p>
              Confira o resultado dos principais estados do Brasil no site <strong>deunoposteagora.com</strong>.
            </p>
          </div>
          <div className="col-12">
            <LotteryGrid items={bichoStates} />
          </div>
        </div>
        <div id="resultado-loterias"></div>
        <div className="espaco-menor"></div>
        <div className="row justify-content-center">
          <div className="texto-simples col-md-8">
            <h5 className="text-center">Resultados das Loterias da Caixa</h5>
            <p className="text-center">
              Confira o resultado das Loterias da Caixa no site <strong>deunoposteagora.com</strong>.
            </p>
          </div>
          <div className="col-12">
            <LotteryGrid items={caixaLoterias} />
          </div>
        </div>
        <div className="espaco-menor"></div>
        <div className="row justify-content-center">
          <div className="texto-simples text-center col-md-8">
            <p>A expressão Deu no Poste está ligada ao jogo do bicho, o termo popular indica qual o resultado do jogo do bicho, já que antigamente o resultado era fixado em postes (principalmente postes de energia elétrica).</p>
            <p>Com a modernidade o resultado do Jogo do Bicho Deu no Poste pode ser conferido na palma da mão, diretamente do seu celular o site deunoposteagora.com informa o resultado do Jogo do Bicho de hoje logo após a apuração.</p>
            <p>O resultado do Deu no Poste engloba os sorteios do Jogo do Bicho do Rio de Janeiro, inclui a apuração das 9h25, 11h25, 14h25, 18h25, 21h25 e da extração da Loteria Federal do Jogo do Bicho.</p>
            <p>O site deunoposteagora.com não possui vínculo com pessoas e empresas que realizam apostas, nossa plataforma apenas informa os resultados. Não realizamos nenhum tipo de aposta.</p>
          </div>
        </div>
        <div className="espaco"></div>
      </div>
    </>
  )
}
