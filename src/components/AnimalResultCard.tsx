import type { BichoResult } from "@/types"

export default function AnimalResultCard({
  result,
}: {
  result: BichoResult
}) {
  return (
    <div className="col-lg-4 col-md-6">
      <p className="chamada-tabela">{result.timeLabel}</p>
      <div className="caixa-tabela bixo">
        <div className="topo-tabela topo-tabela-titulos">
          <span className="sorteio">Sorteio {result.time}</span>
          <h2>
            <span className="titulo">{result.titulo}</span>
            <span className="texto-sorteio">
              {result.dayOfWeek} {result.date}
            </span>
          </h2>
        </div>
        <div className="conteudo-tabela">
          <div className="numeros-bicho">
            {result.prizes.map((prize, idx) => (
              <div key={idx} className="bicho-individual">
                <span className="numero-individual">{prize.position}º</span>
                <span className="milhar">{prize.milhar}</span>
                <small>
                  {prize.animal}
                  {prize.group ? ` (${prize.group})` : ""}
                </small>
              </div>
            ))}
            {result.extra?.map((item, i) =>
              item.type === "numbers" ? (
                <p key={i}><b style={{ fontSize: 20 }}>{item.label}: {item.values!.join("  ")}</b></p>
              ) : (
                <p key={i}><b style={{ fontSize: 20 }}>{item.text}</b></p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
