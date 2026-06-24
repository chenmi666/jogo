import type { Metadata } from "next"
import AdBanner from "@/components/AdBanner"
import LotteryGrid from "@/components/LotteryGrid"
import BreadcrumbNav from "@/components/BreadcrumbNav"
import BreadcrumbSchema from "@/components/BreadcrumbSchema"
import { bichoStates } from "@/data/navigation"

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade do site Deu no Poste. Saiba como coletamos, usamos e protegemos suas informações pessoais.",
}

export default function PoliticaDePrivacidade() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Política de Privacidade", url: "/politica-de-privacidade/" },
        ]}
      />
      <AdBanner />
      <BreadcrumbNav items={[{ name: "Início", url: "/" }, { name: "Política de Privacidade", url: "/politica-de-privacidade/" }]} />
      <div className="container">
        <div className="espaco" />
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 texto-paginas">
            <h1>Política de Privacidade</h1>
            <p>
              Esta Política de Privacidade descreve como o site Deu no Poste
              coleta, usa e protege as informações pessoais dos usuários. Ao
              utilizar nosso site, você concorda com os termos descritos nesta
              política.
            </p>
            <h2>Informações que coletamos</h2>
            <p>
              Coletamos informações como endereço IP, tipo de navegador,
              páginas visitadas e tempo de navegação através de ferramentas de
              analytics como o Google Analytics. Não coletamos informações
              pessoais como nome, endereço ou telefone sem o seu consentimento
              explícito.
            </p>
            <h2>Cookies</h2>
            <p>
              Utilizamos cookies para melhorar a experiência do usuário, como
              lembrar preferências e analisar o tráfego do site. Você pode
              configurar seu navegador para recusar cookies, mas isso pode
              afetar algumas funcionalidades do site.
            </p>
            <h2>Serviços de terceiros</h2>
            <p>
              Utilizamos serviços de terceiros como Google Analytics e redes de
              anúncios que podem coletar informações sobre sua navegação. Esses
              serviços possuem suas próprias políticas de privacidade e não nos
              responsabilizamos por suas práticas.
            </p>
            <h2>Proteção de dados</h2>
            <p>
              Adotamos medidas de segurança para proteger as informações dos
              usuários contra acesso não autorizado, alteração, divulgação ou
              destruição. No entanto, nenhum método de transmissão pela internet
              é 100% seguro.
            </p>
            <h2>Direitos do usuário</h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem
              direito a solicitar acesso, correção, exclusão ou portabilidade
              dos seus dados pessoais. Para exercer esses direitos, entre em
              contato conosco através do e-mail contato@deunoposte.app.br.
            </p>
            <h2>Alterações nesta política</h2>
            <p>
              Esta política pode ser atualizada periodicamente. Recomendamos que
              os usuários revisem esta página regularmente para se manterem
              informados sobre eventuais mudanças.
            </p>
            <p>
              Última atualização: junho de 2026.
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
