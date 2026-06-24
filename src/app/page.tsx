import type { Metadata } from "next"
import Link from "next/link"
import AdBanner from "@/components/AdBanner"
import AnimalResultCard from "@/components/AnimalResultCard"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { bichoStates, caixaLoterias } from "@/data/navigation"
import { rioDeJaneiroResults } from "@/data/jogo-do-bicho/rio-de-janeiro"

export const metadata: Metadata = {
  title: "Deu no Poste - Resultado Oficial Jogo do Bicho",
  description:
    "Resultado Deu no Poste de hoje, o site deunoposte.app.br foi criado com o objetivo do apostador conferir o resultado do Jogo do Bicho Deu no Poste do Rio de Janeiro de hoje e de ontem.",
}

const dailyResults = [
  { label: "Resultado Deu no Poste de terça-feira 23/06/26", href: "/resultado-deu-no-poste-de-terca-feira-230626/" },
  { label: "Resultado Deu no Poste de segunda-feira 22/06/26", href: "/resultado-deu-no-poste-de-segunda-feira-220626/" },
  { label: "Resultado Deu no Poste de domingo 21/06/26", href: "/resultado-deu-no-poste-de-domingo-210626/" },
  { label: "Resultado Deu no Poste de sábado 20/06/26", href: "/resultado-deu-no-poste-de-sabado-200626/" },
  { label: "Resultado Deu no Poste de sexta-feira 19/06/26", href: "/resultado-deu-no-poste-de-sexta-feira-190626/" },
  { label: "Resultado Deu no Poste de quinta-feira 18/06/26", href: "/resultado-deu-no-poste-de-quinta-feira-180626/" },
  { label: "Resultado Deu no Poste de quarta-feira 17/06/26", href: "/resultado-deu-no-poste-de-quarta-feira-170626/" },
  { label: "Resultado Deu no Poste de terça-feira 16/06/26", href: "/resultado-deu-no-poste-de-terca-feira-160626/" },
  { label: "Resultado Deu no Poste de segunda-feira 15/06/26", href: "/resultado-deu-no-poste-de-segunda-feira-150626/" },
]

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
              Resultado Deu no Poste de hoje, o site deunoposte.app.br foi criado com o objetivo do apostador conferir o resultado do Deu no Poste do Jogo do Bicho Oficial do Rio de Janeiro de hoje e de ontem, confira a milhar sorteada em cada faixa de premiação e o respectivo bicho. <strong>Selecione abaixo o horário da aposta e confira os números sorteados.</strong>
            </p>
            <p></p>
            <h3>
              <strong><Link title="Jogo do Bicho ao vivo" href="/jogo-do-bicho-ao-vivo/">Ao Vivo</Link></strong>
              &nbsp;&nbsp;&nbsp;
              <strong><Link title="Resultado RJ 9 horas PPT" href="/resultado-rj-9-horas-ppt/">9 horas</Link></strong>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <strong><Link title="resultado 11 horas Rio PTM" href="/resultado-rj-11-horas-ptm/">11 horas</Link></strong>
            </h3>
            <h3>
              <strong><Link title="resultado 14 horas rio PT" href="/resultado-rj-14-horas-pt/">14 horas</Link></strong>
              &nbsp;&nbsp;&nbsp;
              <strong><Link title="resultado 16 horas rio PTV" href="/resultado-rj-16-horas-ptv/">16 horas</Link></strong>
              &nbsp;&nbsp;&nbsp;
              <strong><Link title="resultado 18 horas Rio PTN" href="/resultado-rj-18-horas-ptn/">18 horas</Link></strong>
            </h3>
            <h3>
              <strong><Link title="Federal Deu no Poste" href="/resultado-federal-jogo-do-bicho/">Federal</Link></strong>
              &nbsp;&nbsp;&nbsp;
              <strong><Link title="Coruja deu no poste" href="/resultado-corujinha/">Coruja</Link></strong>
            </h3>
          </div>
        </div>
        <div className="row justify-content-center quadrantes-home">
          {rioDeJaneiroResults.map((result) => (
            <AnimalResultCard key={result.id} result={result} />
          ))}
        </div>
        <div id="resultado-por-dia"></div>
        <div className="espaco-menor"></div>
        <h5>Resultado Jogo do Bicho por dia</h5>
        <div className="carrega-noticias row row-noticias">
          {dailyResults.map((item) => (
            <div key={item.href} className="col-md-4">
              <div className="noticia-individual-listagem">
                <Link href={item.href}>
                  <h4>{item.label}</h4>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div id="resultado-banca"></div>
        <div className="espaco-menor"></div>
        <h5 className="text-center">Principais Bancas</h5>
        <div className="row justify-content-center">
          <div className="texto-simples text-center col-md-8">
            <p>
              Confira o resultado dos principais estados do Brasil no site <strong>deunoposte.app.br</strong>.
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
              Confira o resultado das Loterias da Caixa no site <strong>Deunoposte.app.br</strong>.
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
            <p>Com a modernidade o resultado do Jogo do Bicho Deu no Poste pode ser conferido na palma da mão, diretamente do seu celular o site deunoposte.app.br informa o resultado do Jogo do Bicho de hoje logo após a apuração.</p>
            <p>O resultado do Deu no Poste engloba os sorteios do Jogo do Bicho do Rio de Janeiro, inclui a apuração das 9h25, 11h25, 14h25, 18h25, 21h25 e da extração da Loteria Federal do Jogo do Bicho.</p>
            <p>O site deunoposte.app.br não possui vínculo com pessoas e empresas que realizam apostas, nossa plataforma apenas informa os resultados. Não realizamos nenhum tipo de aposta.</p>
          </div>
        </div>
        <div className="espaco"></div>
      </div>
    </>
  )
}
