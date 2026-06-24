import Link from "next/link"

export default function AlertBar() {
  return (
    <div className="container pt-3">
      <div className="alert text-center alert-primary aviso">
        <p>
          <Link
            title="Palpites Jogo do Bicho"
            href="/palpites-jogo-do-bicho/"
          >
            <strong>Confira os palpites para o Jogo do Bicho!</strong>
          </Link>
        </p>
      </div>
    </div>
  )
}
