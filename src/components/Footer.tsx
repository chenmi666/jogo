import Link from "next/link"
import Image from "next/image"
import { footerLinks } from "@/data/navigation"

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-12 pb-md-3 text-center menu-rodape">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                title={link.label}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="col-12 text-center">
            <Link
              href="/"
              title="Deu no Poste - Resultado Oficial Jogo do Bicho"
            >
              <Image
                width={155}
                className="logo-rodape"
                src="/templates/img/logo-deu-no-poste.png"
                alt="Deu no Poste - Resultado Oficial Jogo do Bicho"
                title="Deu no Poste - Resultado Oficial Jogo do Bicho"
                height={50}
              />
            </Link>

          </div>
        </div>
      </div>
      <div className="container rodape-baixo text-center">
        <p style={{ marginBottom: 10 }}>
          Hospedado por{" "}
          <a rel="external" target="_blank" href="#">
            NunesHost
          </a>
        </p>
        <p>© 2024 - deunoposteagora.com. Todos os direitos reservados.</p>
        <a
          className="maya"
          rel="external"
          href="https://www.agenciamaya.com.br/"
          title="Criação de Sites e Marketing Digital - Agência Maya"
          target="_blank"
        >
          Criação de Sites e Marketing Digital - Agência Maya
        </a>
      </div>
    </footer>
  )
}
