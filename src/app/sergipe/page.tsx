import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import AnimalResultCard from "@/components/AnimalResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { bichoStates } from "@/data/navigation"
import { sergipeResults } from "@/data/jogo-do-bicho/sergipe"

export const metadata: Metadata = {
  title: "Resultado Deu no Poste Sergipe",
  description: "Resultado do Deu no Poste de Sergipe, sorteio do Jogo do Bicho de Sergipe do primeiro ao décimo prêmio.",
  openGraph: {
    title: "Resultado Deu no Poste Sergipe",
    description: "Resultado do Deu no Poste de Sergipe, sorteio do Jogo do Bicho de Sergipe do primeiro ao décimo prêmio.",
  },
}

export default function StatePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Sergipe", url: "/sergipe/" }]} />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Sergipe", url: "/sergipe/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-12 texto-paginas">
            <h1 className="titulo-paginas text-center">Resultado Deu no Poste Sergipe</h1>
            <p>Resultado do Deu no Poste de Sergipe, sorteio do Jogo do Bicho de Sergipe do primeiro ao décimo prêmio.</p>
            <p>Confira o resultado do Jogo do Bicho de Sergipe no site Deu no Poste, a milhar sorteada em cada faixa de premiação e o respectivo bicho.</p>
            <div id="quadrantes" className="row">
              {sergipeResults.map((result) => (
                <AnimalResultCard key={result.id} result={result} />
              ))}
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
