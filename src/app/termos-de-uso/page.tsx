import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { bichoStates } from "@/data/navigation"

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de Uso do site Deu no Poste. Condições gerais para utilização do portal de resultados do Jogo do Bicho.",
}

export default function TermosDeUso() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Termos de Uso", url: "/termos-de-uso/" },
        ]}
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Início", url: "/" }, { name: "Termos de Uso", url: "/termos-de-uso/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1>Termos de Uso</h1>
            <p>
              Ao acessar e utilizar o site Deu no Poste, você concorda com os
              termos e condições descritos abaixo. Se não concordar com qualquer
              parte destes termos, recomendamos que não utilize nosso site.
            </p>
            <h2>Informações do site</h2>
            <p>
              O Deu no Poste é um site informativo que disponibiliza resultados
              do Jogo do Bicho e das Loterias da Caixa. Não realizamos
              apostas, não vendemos bilhetes e não intermediamos jogos. Todo o
              conteúdo é fornecido apenas para fins de consulta e
              entretenimento.
            </p>
            <h2>Precisão das informações</h2>
            <p>
              Nos esforçamos para manter as informações atualizadas e precisas,
              mas não garantimos a exatidão, integridade ou atualidade dos
              dados. Os resultados oficiais devem ser consultados nas fontes
              oficiais.
            </p>
            <h2>Links para terceiros</h2>
            <p>
              Nosso site pode conter links para sites de terceiros. Não temos
              controle sobre o conteúdo ou práticas desses sites e não nos
              responsabilizamos por qualquer dano ou perda decorrente do uso
              desses links.
            </p>
            <h2>Propriedade intelectual</h2>
            <p>
              Todo o conteúdo do site, incluindo textos, imagens e logotipos, é
              protegido por leis de direitos autorais. É proibida a reprodução
              total ou parcial sem autorização prévia.
            </p>
            <h2>Limitação de responsabilidade</h2>
            <p>
              O Deu no Poste não se responsabiliza por perdas ou danos
              decorrentes do uso das informações disponibilizadas no site. O uso
              do conteúdo é de inteira responsabilidade do usuário.
            </p>
            <h2>Alterações nos termos</h2>
            <p>
              Reservamo-nos o direito de alterar estes termos a qualquer
              momento. As alterações entram em vigor imediatamente após a
              publicação no site. Recomendamos que os usuários revisem esta
              página periodicamente.
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
