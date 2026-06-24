import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { puxadasBichos } from "@/data/puxadas-bichos"
import { bichoStates } from "@/data/navigation"

export const metadata: Metadata = {
  title: "Puxadas do Jogo do Bicho Deu no Poste",
  description:
    "Confira as puxadas do Jogo do Bicho Deu no Poste. Veja a tabela completa de puxadas de cada animal e entenda como funciona.",
}

export default function PuxadasPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Puxadas do Bicho", url: "/puxadas-jogo-do-bicho/" },
        ]}
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Início", url: "/" }, { name: "Puxadas do Bicho", url: "/puxadas-jogo-do-bicho/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1>Puxadas do Jogo do Bicho Deu no Poste</h1>
            <p>
              As puxadas do Jogo do Bicho são uma das estratégias mais usadas
              por apostadores para tentar prever os resultados. Cada animal
              possui uma lista de animais que ele "puxa", ou seja, que tendem a
              sair junto com ele com base em estatísticas e tradição.
            </p>
            <h2>
              Tabela de puxadas do Jogo do Bicho Deu no Poste!
            </h2>
            {puxadasBichos.map((entry, idx) => (
              <p key={idx}>
                <strong>
                  {entry.animal} PUXA: {entry.puxa}
                </strong>
              </p>
            ))}
            <h2>Como funcionam as puxadas do jogo do bicho?</h2>
            <p>
              As puxadas do Jogo do Bicho são baseadas na observação de padrões
              e na tradição do jogo. Cada animal está associado a outros animais
              que costumam aparecer nos sorteios em sequência ou no mesmo dia.
              Essas combinações são passadas entre gerações de apostadores e
              fazem parte da cultura do Jogo do Bicho.
            </p>
            <p>
              Embora não haja garantia de acerto, muitos jogadores utilizam as
              puxadas como referência na hora de fazer suas apostas,
              especialmente nos momentos de "deu no poste" quando o resultado
              acaba de sair.
            </p>
            <h3>Qual a origem das puxadas do bicho?</h3>
            <p>
              A origem das puxadas remonta aos primórdios do Jogo do Bicho no
              Rio de Janeiro, no final do século XIX. Os primeiros banqueiros e
              apostadores começaram a notar que determinados animais apareciam
              com mais frequência junto com outros, criando assim as primeiras
              tabelas de puxadas.
            </p>
            <p>
              Com o passar dos anos, essas associações foram sendo refinadas e
              hoje compõem um conhecimento tradicional que é consultado por
              milhares de apostadores todos os dias.
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
