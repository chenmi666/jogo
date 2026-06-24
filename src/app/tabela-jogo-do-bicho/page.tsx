import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { tabelaBichos } from "@/data/tabela-bichos"
import { bichoStates } from "@/data/navigation"

export const metadata: Metadata = {
  title: "Tabela do Jogo do Bicho Deu no Poste",
  description:
    "Confira a tabela completa do Jogo do Bicho Deu no Poste com todos os 25 animais, seus grupos e dezenas correspondentes.",
}

export default function TabelaJogoDoBicho() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Tabela dos Bichos", url: "/tabela-jogo-do-bicho/" },
        ]}
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Início", url: "/" }, { name: "Tabela dos Bichos", url: "/tabela-jogo-do-bicho/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1>Tabela do Jogo do Bicho Deu no Poste</h1>
            <p>
              Conheça a tabela do Jogo do Bicho Deu no Poste, confira a lista
              dos animais com seus respectivos grupos e dezenas. A tabela do
              Jogo do Bicho é composta por 25 animais, cada um representando
              quatro dezenas.
            </p>
            <h2>O primeiro animal da tabela do Jogo do Bicho é o Avestruz!</h2>
            {tabelaBichos.map((animal) => (
              <div key={animal.group}>
                <p>
                  <strong>{animal.name}</strong>
                </p>
                <p>
                  grupo {animal.group} dezenas {animal.dezenas}
                </p>
                <hr />
              </div>
            ))}
            <h2>
              Cada animal da tabela do Jogo do Bicho representa quatro dezenas!
            </h2>
            <p>
              O Jogo do Bicho possui 25 animais, cada um associado a 4 dezenas,
              totalizando 100 dezenas (de 01 a 00). Por exemplo, o Avestruz
              (grupo 1) representa as dezenas 01, 02, 03 e 04. Já a Águia
              (grupo 2) representa 05, 06, 07 e 08, e assim sucessivamente até
              a Vaca (grupo 25) que representa 97, 98, 99 e 00.
            </p>
            <p>
              O Jogo do Bicho surgiu no Rio de Janeiro em 1892, criado pelo
              Barão João Batista Viana Drummond, com o objetivo de atrair
              visitantes para o Jardim Zoológico. Cada bilhete de entrada
              trazia a estampa de um animal, e os visitantes que acertassem o
              animal sorteado ganhavam um prêmio. Com o tempo, o jogo se
              popularizou e se espalhou por todo o Brasil.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="espaco" />
        <LotteryGrid items={bichoStates} />
      </div>
    </>
  )
}
