import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { bichoStates } from "@/data/navigation"

export const metadata: Metadata = {
  title: "Fale Conosco",
  description:
    "Entre em contato com o Deu no Poste. Tire suas dúvidas ou envie sugestões sobre o site de resultados do Jogo do Bicho.",
}

export default function FaleConosco() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Fale Conosco", url: "/fale-conosco/" },
        ]}
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Início", url: "/" }, { name: "Fale Conosco", url: "/fale-conosco/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1>Fale Conosco</h1>
            <p>
              Entre em contato conosco através do email:{" "}
              <strong>contato@deunoposteagora.com</strong>
            </p>
            <p>
              O site Deu no Poste é um portal informativo sobre resultados do
              Jogo do Bicho e Loterias da Caixa. Não realizamos apostas nem
              vendemos bilhetes. Todo o conteúdo é fornecido apenas para
              consulta e entretenimento.
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
