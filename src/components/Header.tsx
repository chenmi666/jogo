"use client"
import Link from "next/link"
import Image from "next/image"
import Navigation from "./Navigation"

export default function Header() {
  return (
    <div className="navbar-top">
      <div className="container">
        <Link
          href="/"
          title="Deu no Poste - Resultado Oficial Jogo do Bicho"
        >
          <Image
            src="/templates/img/logo-deu-no-poste.png"
            alt="Deu no Poste - Resultado Oficial Jogo do Bicho"
            title="Deu no Poste - Resultado Oficial Jogo do Bicho"
            width={155}
            height={50}
            priority
          />
        </Link>
        <Navigation />

      </div>
    </div>
  )
}
