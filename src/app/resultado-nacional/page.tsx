import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import AnimalResultCard from "@/components/AnimalResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { bichoStates } from "@/data/navigation"
import LiveBichoResults from "@/components/LiveBichoResults"
import { resultadoNacionalResults } from "@/data/jogo-do-bicho/resultado-nacional"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Resultado Loteria Nacional",
  description: "Resultado da Loteria Nacional, confira os números sorteados e premiações.",
  openGraph: {
    title: "Resultado Loteria Nacional",
    description: "Resultado da Loteria Nacional, confira os números sorteados e premiações.",
  },
}

export default function ResultadoNacionalPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Loteria Nacional", url: "/resultado-nacional/" }]} />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Loteria Nacional", url: "/resultado-nacional/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-12 texto-paginas">
            <h1 className="titulo-paginas text-center">Resultado Loteria Nacional</h1>
            <p>Resultado da Loteria Nacional, confira os números sorteados e premiações.</p>
            <p>Confira o resultado da Loteria Nacional no site Deu no Poste.</p>
            <div id="quadrantes" className="row">
              <LiveBichoResults initialData={resultadoNacionalResults} slug="resultado-nacional" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <h4>Confira o resultado das principais Loterias no site Deu no Poste!!</h4>
        </div>
        <LotteryGrid items={bichoStates} />
        <div className="espaco-menor" />
      </div>
    </>
  )
}
