import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { bichoStates } from "@/data/navigation"

export const metadata: Metadata = {
  title: "Palpites Jogo do Bicho Deu no Poste",
  description:
    "Confira os palpites do Jogo do Bicho Deu no Poste. Dicas e sugestões de animais e dezenas para fazer suas apostas.",
}

export default function PalpitesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          {
            name: "Palpites Jogo do Bicho",
            url: "/palpites-jogo-do-bicho/",
          },
        ]}
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Início", url: "/" }, { name: "Palpites Jogo do Bicho", url: "/palpites-jogo-do-bicho/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1>Palpites Jogo do Bicho Deu no Poste</h1>
            <p>
              Os palpites do Jogo do Bicho são sugestões baseadas em análises de
              resultados anteriores, tendências estatísticas e conhecimento
              tradicional. Eles servem como referência para quem deseja fazer
              suas apostas no Jogo do Bicho.
            </p>
            <p>
              É importante lembrar que os palpites não são garantia de acerto e
              não possuem fundamento científico. O Jogo do Bicho é uma atividade
              de entretenimento e os resultados são baseados em sorteios
              aleatórios. Nossas dicas são apenas sugestões e cada apostador
              deve usar seu próprio critério.
            </p>
            <p>
              Acompanhe diariamente os palpites atualizados e confira também as
              puxadas dos animais e a tabela completa do Jogo do Bicho para
              montar sua estratégia de jogo.
            </p>
            <h2>Aviso importante</h2>
            <p>
              O site Deu no Poste não incentiva o jogo excessivo ou o
              endividamento. Aposte com responsabilidade e apenas por
              entretenimento. O Jogo do Bicho é uma tradição cultural brasileira
              e deve ser apreciado como tal.
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
