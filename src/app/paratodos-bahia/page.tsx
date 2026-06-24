import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import AnimalResultCard from "@/components/AnimalResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { bichoStates } from "@/data/navigation"
import { paratodosBahiaResults } from "@/data/jogo-do-bicho/paratodos-bahia"

export const metadata: Metadata = {
  title: "Resultado Deu no Poste Bahia",
  description: "Resultado do Deu no Poste da Bahia, sorteio do Jogo do Bicho da Bahia do primeiro ao décimo prêmio.",
  openGraph: {
    title: "Resultado Deu no Poste Bahia",
    description: "Resultado do Deu no Poste da Bahia, sorteio do Jogo do Bicho da Bahia do primeiro ao décimo prêmio.",
  },
}

export default function StatePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Bahia", url: "/paratodos-bahia/" }]} />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Bahia", url: "/paratodos-bahia/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-12 texto-paginas">
            <h1 className="titulo-paginas text-center">Resultado Deu no Poste Bahia</h1>
            <p>Resultado do Deu no Poste da Bahia, sorteio do Jogo do Bicho da Bahia do primeiro ao décimo prêmio.</p>
            <p>Confira o resultado do Jogo do Bicho da Bahia no site Deu no Poste, a milhar sorteada em cada faixa de premiação e o respectivo bicho.</p>
            <div id="quadrantes" className="row">
              {paratodosBahiaResults.map((result) => (
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
