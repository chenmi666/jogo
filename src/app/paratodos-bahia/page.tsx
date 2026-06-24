import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import AnimalResultCard from "@/components/AnimalResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { bichoStates } from "@/data/navigation"
import LiveBichoResults from "@/components/LiveBichoResults"
import { paratodosBahiaResults } from "@/data/jogo-do-bicho/paratodos-bahia"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Paratodos Bahia Jogo do Bicho",
  description: "Resultado do Jogo do Bicho Paratodos Bahia, todos os sorteios do Deu no Poste da Bahia da banca Paratodos de hoje.",
  openGraph: {
    title: "Paratodos Bahia Jogo do Bicho",
    description: "Resultado do Jogo do Bicho Paratodos Bahia, todos os sorteios do Deu no Poste da Bahia da banca Paratodos de hoje.",
  },
}

export default function StatePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "ParaTodos Bahia", url: "/paratodos-bahia/" }]} />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "ParaTodos Bahia", url: "/paratodos-bahia/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-12 texto-paginas">
            <h1 className="titulo-paginas text-center">Paratodos Bahia Jogo do Bicho</h1>
            <p>Resultado do Jogo do Bicho Paratodos Bahia, todos os sorteios do Deu no Poste da Bahia da banca Paratodos de hoje.</p>
            <p>O site Deu no Poste publica nesta página o resultado do Jogo do Bicho Paratodos da Bahia, para conferir os números da banca ParaTodos Bahia.</p>
            <div id="quadrantes" className="row">
              <LiveBichoResults initialData={paratodosBahiaResults} slug="paratodos-bahia" />
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
